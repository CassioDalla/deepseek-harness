/**
 * Subagent token roll-up for the composer dock.
 *
 * A Session's own usage projection answers "what did this conversation bill",
 * never "what did this conversation tree bill": every subagent runs in its own
 * Session with its own durable log. The global session-list seat already holds
 * each descendant's summary (with its own tokenUsage projection), so the tree
 * total is a pure fold over those summaries — no host round-trip, and the
 * lineage tree's per-child figures stay the authoritative detail view.
 */

import type { SessionSummary } from '@deepseek-ai/dsh-api-session-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

/**
 * Summed contribution of one Session's subagent descendants.
 *
 * The four provider buckets stay separate so the dialog can show what a child
 * actually spent: a long child re-sends its prompt every step, so cached reads
 * dominate any combined figure while costing a fraction of fresh input.
 * Reasoning is already inside `outputTokens`, so it is counted exactly once.
 */
export interface SubagentUsageTotals {
  /** Descendant Sessions, at any depth, whose ancestry chain reaches the root. */
  readonly sessions: number
  /** Descendants' uncached prompt tokens. */
  readonly uncachedInputTokens: number
  /** Descendants' cached prompt reads. */
  readonly cacheReadTokens: number
  /** Descendants' prompt-cache writes. */
  readonly cacheWriteTokens: number
  /** Descendants' output tokens. */
  readonly outputTokens: number
  /** Sum of the four buckets above. */
  readonly tokens: number
}

/** No reachable descendant: nothing to add to the root's own figure. */
const NO_DESCENDANTS: SubagentUsageTotals = {
  sessions: 0,
  uncachedInputTokens: 0,
  cacheReadTokens: 0,
  cacheWriteTokens: 0,
  outputTokens: 0,
  tokens: 0,
}

/**
 * Whether one Session's ancestry chain reaches the root.
 *
 * The walk follows `parentId` while the current Session is itself a subagent,
 * stops at an absent (broken) or non-subagent ancestor, and keeps a seen-set so
 * a corrupt parent cycle terminates instead of spinning.
 * @param rootSessionId - Session whose tree is being totalled.
 * @param descendant - candidate subagent Session.
 * @param summaries - Session summaries keyed by id.
 * @returns true when the chain reaches the root.
 */
function descendsFrom(
  rootSessionId: SessionId,
  descendant: SessionSummary,
  summaries: Readonly<Record<SessionId, SessionSummary>>,
): boolean {
  const seen = new Set<SessionId>()
  let current: SessionSummary | undefined = descendant
  while (current?.origin === 'subagent' && current.parentId !== undefined && !seen.has(current.id)) {
    seen.add(current.id)
    if (current.parentId === rootSessionId) return true
    current = summaries[current.parentId]
  }
  return false
}

/**
 * Roll up token usage over every subagent descendant of one Session.
 *
 * A descendant whose usage projection has not arrived yet still counts as a
 * Session and adds no tokens, so the count never understates the tree while a
 * child's projection is in flight.
 * @param rootSessionId - Session whose totals are displayed; undefined before a selection.
 * @param summaries - `useSessions` store `byId` summaries.
 * @returns descendant Session count and the four summed billing buckets.
 */
export function subagentUsageTotals(
  rootSessionId: SessionId | undefined,
  summaries: Readonly<Record<SessionId, SessionSummary>>,
): SubagentUsageTotals {
  if (rootSessionId === undefined) return NO_DESCENDANTS
  let sessions = 0
  let uncachedInputTokens = 0
  let cacheReadTokens = 0
  let cacheWriteTokens = 0
  let outputTokens = 0
  for (const summary of Object.values(summaries)) {
    if (summary.origin !== 'subagent') continue
    if (!descendsFrom(rootSessionId, summary, summaries)) continue
    sessions += 1
    const usage = summary.projectionValues?.tokenUsage
    if (usage === undefined) continue
    uncachedInputTokens += usage.uncachedInputTokens
    cacheReadTokens += usage.cacheReadTokens
    cacheWriteTokens += usage.cacheWriteTokens
    outputTokens += usage.outputTokens
  }
  return {
    sessions,
    uncachedInputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    outputTokens,
    tokens: uncachedInputTokens + cacheReadTokens + cacheWriteTokens + outputTokens,
  }
}
