/** subagent-usage: the tree fold over session-list summaries. */
import { describe, expect, it } from 'vitest'
import type { SessionSummary } from '@deepseek-ai/dsh-api-session-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { TokenUsageProjection } from '@deepseek-ai/dsh-token-meter/client'
import { subagentUsageTotals } from '../src/client/subagent-usage.ts'

const sid = (id: string): SessionId => id as SessionId

/** One session-list row: required fields plus overrides. */
function summary(id: string, overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    id: sid(id), displayTitle: id, running: false, blank: false, updatedAt: 1, ...overrides,
  } as SessionSummary
}

/** One session's usage projection value. */
function usage(
  uncachedInputTokens: number,
  cacheReadTokens: number,
  cacheWriteTokens: number,
  outputTokens: number,
): TokenUsageProjection {
  return { uncachedInputTokens, cacheReadTokens, cacheWriteTokens, outputTokens }
}

/** A subagent row carrying its own usage projection. */
function child(
  id: string,
  parentId: string,
  value: TokenUsageProjection | undefined,
  overrides: Partial<SessionSummary> = {},
): SessionSummary {
  return summary(id, {
    origin: 'subagent',
    parentId: sid(parentId),
    ...value === undefined ? {} : { projectionValues: { tokenUsage: value } },
    ...overrides,
  })
}

/** Keyed `byId` table from rows. */
function table(rows: SessionSummary[]): Record<SessionId, SessionSummary> {
  const byId: Record<string, SessionSummary> = {}
  for (const row of rows) byId[row.id] = row
  return byId
}

describe('subagentUsageTotals', () => {
  it('reports no descendants before a Session is selected', () => {
    expect(subagentUsageTotals(undefined, table([child('c1', 'root', usage(1, 2, 3, 4))])))
      .toEqual({
        sessions: 0,
        uncachedInputTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        outputTokens: 0,
        tokens: 0,
      })
  })

  it('sums every descendant at any depth and keeps the four buckets separate', () => {
    const totals = subagentUsageTotals(sid('root'), table([
      summary('root'),
      child('c1', 'root', usage(10, 100, 1, 20)),
      child('c2', 'c1', usage(1, 200, 0, 2)),
      summary('unrelated'),
    ]))
    expect(totals).toEqual({
      sessions: 2,
      uncachedInputTokens: 11,
      cacheReadTokens: 300,
      cacheWriteTokens: 1,
      outputTokens: 22,
      tokens: 334,
    })
  })

  it('excludes foreign trees, non-subagent rows, and orphans with a broken chain', () => {
    const totals = subagentUsageTotals(sid('root'), table([
      child('c1', 'other', usage(10, 0, 0, 0)),
      // Origin says subagent but the parent chain stops at an absent row.
      child('orphan', 'gone', usage(20, 0, 0, 0)),
      // A non-subagent row whose parentId claims the root is not a descendant.
      summary('sibling', { parentId: sid('root') }),
      child('nested-orphan', 'orphan', usage(30, 0, 0, 0)),
    ]))
    expect(totals.sessions).toBe(0)
    expect(totals.tokens).toBe(0)
  })

  it('terminates on a corrupt parent cycle without counting it', () => {
    const totals = subagentUsageTotals(sid('root'), table([
      child('a', 'b', usage(10, 0, 0, 0)),
      child('b', 'a', usage(20, 0, 0, 0)),
      child('self', 'self', usage(30, 0, 0, 0)),
    ]))
    expect(totals.sessions).toBe(0)
    expect(totals.tokens).toBe(0)
  })

  it('counts a descendant whose usage projection has not arrived yet', () => {
    const totals = subagentUsageTotals(sid('root'), table([
      child('c1', 'root', undefined),
    ]))
    expect(totals).toEqual({
      sessions: 1,
      uncachedInputTokens: 0,
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
      outputTokens: 0,
      tokens: 0,
    })
  })
})
