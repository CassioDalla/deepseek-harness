# Agent Note: Subagent token roll-up as an additive client plugin

Status: implemented

English | [中文](2026-09-18-subagent-token-rollup-plugin.zh.md)

## Problem

A Session's own `tokenUsage` projection answers what that Session billed, never what the conversation tree billed: every subagent runs in its own Session with its own durable log. The composer's database pill therefore understated a delegating Session by exactly the work it delegated, while the session-header lineage tree already showed each child's own figure.

## Decision

The roll-up ships as its own client plugin, `@deepseek-ai/dsh-client-ui-subagent-tokens`, contributing one additive entry to the `conversation.composer.dock` list that ui-conversation declares. `ui-chat` is unchanged: its statistics pill keeps reporting the Session's own figure, and removing the plugin's row from `packages/bundle/web-app/cordis.patch.yml` removes the surface. This refines [Composer session stats](2026-09-07-composer-session-stats-pills.md), which owns the dock's two-pill split and the shared stat-dialog skin; both remain as that note ships them.

The pill reports the descendants' combined billed tokens labelled with their Session count, and renders only once that total is non-zero — the same activity gate ui-chat's own pill uses, so a Session whose children have not billed yet keeps one reading rather than a second one showing nothing. Its dialog reconciles four figures — the Session's own total, the descendants' combined total, their separate uncached-input, cached-input, cache-write, and output buckets, and a closing `Total incl. subagents` row. The fold walks `parentId` from each `origin: 'subagent'` summary while the current row is itself a subagent, stops at an absent or non-subagent ancestor, and keeps a seen-set so a corrupt parent cycle terminates. A descendant whose usage projection has not arrived yet still counts as a Session and adds no tokens.

The plugin declares only the `slots` and `locale` services and carries no inject face: `useSessions` supplies the global summary table, `sessionId` roots the walk, and `useProjection('tokenUsage')` supplies the Session's own buckets, all from the framework standard seats. Cache-hit share stays on ui-chat's pill, because children may run other routes and a hit rate aggregated over their prompts would describe no actual request.

## Alternatives considered

**Change ui-chat's pill headline to the tree total.** The original implementation of this capability lived inside `StatsPills`, which made the reading correct but made the feature removable only by editing the core component and its dialog markup. A plugin that must patch the package it decorates is not a plugin.

**Declare an extension point in ui-chat for detail rows and an additive headline delta.** This preserves the exact original reading, but it still edits `ui-chat` and introduces a seam with a single consumer. The composer dock is already a list slot, so the additive pill needs no core change at all.

**Give the pill the tree total as its headline.** The neighbouring pill states the Session's own figure, so a third number that is their sum repeats what a reader can already see and hides the increment only this plugin knows.

**Provide a roll-up hook from ui-chat through `ctx.uiSession.provide()`.** A component cannot consume a member a plugin declares without depending on that plugin, and a global standard prop for one entry's private data is exactly what the client rules reject.

**Compute the roll-up on the Host as a projection.** The browser already holds every descendant summary, so a projection would add a wire contract and host computation for data the client owns.

## Consequences

- A delegating Session shows two pills: ui-chat's own figure and this plugin's descendant figure. The tree total appears in the dialog, not in a headline.
- The descendant reading is cumulative over every child the viewed Session ever created, not per turn; a durable, continuable child has no per-turn attribution to display.
- The shipped Web bundle enables the row, so the surface is on by default and switched off by deleting that one row.
- Nothing model-visible changes: no session event, projection, wire contract, or prompt text, so recorded session snapshots and the SDK projections are unaffected.
- The recorded Web scenarios that delegate to dormant children — whose Sessions bill nothing — keep their recorded aria goldens, because the activity gate keeps the pill unmounted there.
- Package `src/client/*` is inside the per-file coverage gate; the node half is an inert loader seat covered by the browser-plugin spec.
