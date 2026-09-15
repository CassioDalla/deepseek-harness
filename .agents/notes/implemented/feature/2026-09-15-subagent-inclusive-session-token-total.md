# Agent Note: Subagent-inclusive session token total

Status: implemented

English | [中文](2026-09-15-subagent-inclusive-session-token-total.zh.md)

## Problem

The composer's database pill reported only the viewed Session's own `tokenUsage` projection. Every subagent runs in its own Session with its own durable log, so the headline reading understated a delegating Session by exactly the work it delegated: the number a reader uses to judge what a conversation cost excluded the children, while the session-header lineage tree already showed each child's own figure. Reasoning tokens were never the gap — they ride inside `outputTokens` and are not accumulated again — so the missing piece was the roll-up, not the accounting.

## Decision

**The pill headline is the Session tree total.** [subagent-usage.ts](../../../../packages/client/ui-chat/src/client/chat/subagent-usage.ts) folds the session-list `byId` summaries: for every Session whose `origin === 'subagent'` ancestry chain reaches the root, at any depth, it sums the four disjoint provider buckets **while keeping them separate**. The walk stops at an absent or non-subagent ancestor and keeps a seen-set, so a broken parent pointer or a corrupt parent cycle terminates instead of spinning; a descendant whose usage projection has not arrived yet still counts as a Session and adds no tokens. [StatsPills.tsx](../../../../packages/client/ui-chat/src/client/chat/StatsPills.tsx) reads the `useSessions` standing seat and the slot's own `sessionId` — both derived from the standard shares, so no new injection and no host round-trip — and `UsagePill` adds the descendants' billed total to its headline aggregate.

**The dialog reconciles the figure, per bucket.** When at least one descendant exists, the token dialog gains a subagent block: a `Subagents (N)` row carrying the combined total, then the descendants' own `Subagent uncached input`, `Subagent cached input`, `Subagent output`, and a `Subagent cache write` row when that bucket is non-zero — the same always-present/absent-when-zero rule the own-Session block follows — closing with `Total incl. subagents`. Every row above the block stays the own-Session breakdown, so both the headline's origin and the split are readable. The buckets stay separate because a combined figure misleads in exactly the case this feature exists for: a long child re-sends its prompt every step, so cached reads dominate its total while costing a fraction of fresh input, and a single number reads as cost when it is mostly volume.

**Cache-hit share and the per-turn panel stay own-only.** Children may run other routes, so a hit rate aggregated over their prompts would describe no actual request; and a child Session is durable and continuable across turns, so no per-turn attribution of a descendant exists to display. This refines [Composer session stats](2026-09-07-composer-session-stats-pills.md), which owns the two-pill split and the dialog skin. No projection or wire contract changed, because the client already held every descendant summary.

## Alternatives considered

**One combined descendant total.** A single `Subagents (N)` figure was the first shape shipped, and it hides where the tokens went: a long child's total is overwhelmingly cached reads, which cost a fraction of fresh input, so the number reads as spend when it is mostly volume. Separating the buckets costs four rows in a dialog that is already behind a click.

**Roll-up rows in the dialog only, headline unchanged.** The headline is the figure read without clicking, and "what did this conversation tree consume" is what the pill exists to answer; leaving it at the own-Session figure would keep the original defect.

**Attribute descendants to the turn that spawned them.** Child Sessions are durable and resumable, and a continuable child can outlive or serve several turns, so a per-turn attribution would be invented rather than measured.

**One aggregate cache-hit ratio over own plus descendants.** That ratio would mix routes and prompts and describe no actual request; the own-route figure is the honest one.

**A host-side tree-total projection.** The summaries are already in the client and the fold is pure, so a projection would add a wire contract and a host computation for data the browser holds.

**Reuse `indexSubagentDescendants` from ui-subagent.** A feature plugin may not runtime-import another feature plugin's values (packages/client/AGENTS.md), and that helper counts descendants rather than summing tokens.

## Consequences

- `StatsPillsProps` derives `sessionId` and `useSessions` from `SessionStandardProps` and `GlobalStandardProps`; the three chat specs that render `StatsPills` directly now pass both stubs.
- The usage pill's existence stays gated on the Session's own billed activity, so a Session that billed nothing on its own shows no tree total even when descendants spent tokens.
- The helper sits under the existing `ui-chat/src/client/chat/*` coverage exemption; the chat-stats specs cover the per-bucket sum, depth, foreign trees, orphans, an absent child projection, and a parent cycle.
- A Session's durable descendants are summed regardless of which turn spawned them, so the tree total is cumulative over every child the viewed Session ever created, not just the current turn's.
- The replayed web snapshot suite is unchanged, including the subagent-conversation scenario, so no recorded golden needed re-recording.
