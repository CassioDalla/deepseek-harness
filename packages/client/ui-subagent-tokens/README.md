---
description: "Subagent token roll-up for the Web GUI composer: the pill and dialog reporting what a viewed Session's subagent descendants billed, next to ui-chat's own usage pill; for users and maintainers of the composer stats row."
kind: "package-reference"
---

# @deepseek-ai/dsh-client-ui-subagent-tokens

English | [中文](README.zh.md)

## Summary

The Web GUI subagent token surface adds one pill to the composer dock that reports what the viewed Session's subagent descendants billed, with a dialog that reconciles their four provider buckets against the Session's own figure and the conversation tree's total. It is additive: ui-chat's own statistics pill keeps reporting the Session's own usage, and this pill appears only once its descendants have billed tokens. Every figure is a fold over the global session-list summaries plus the Session's own `tokenUsage` projection, so opening the pill costs no request.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Mount this plugin alongside `ui-chat` and `ui-conversation`; the pill then appears in the composer dock once the viewed Session's subagent descendants have billed tokens. A conversation that delegated nothing, or whose children have not billed yet, keeps the single ui-chat statistics row, so the surface never duplicates a figure and never reports an empty one.

### The pill and its dialog

The pill reads the descendants' combined billed tokens and their Session count, for example `3 subagents · 1.4K`. Clicking it opens a dialog with the Session's own total, the descendants' combined total, their separate uncached-input, cached-input, cache-write, and output buckets, and a closing `Total incl. subagents` row. The cache-write row appears only when a descendant actually wrote a cache entry, matching the own-Session block in ui-chat's dialog.

The buckets stay separate because a long child re-sends its prompt every step: its cached reads dominate the combined figure while costing a fraction of fresh input, so one number would read as spend when it is mostly volume.

### Reading the two pills together

The native pill answers "what did this Session bill" and the subagent pill answers "what did its children add"; the tree total is their sum and is stated explicitly by the dialog's closing row. Cache-hit share stays on the native pill because children may run other routes, so a hit rate aggregated over their prompts would describe no actual request.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

The plugin registers one entry into `conversation.composer.dock` — a session-scoped list slot declared by ui-conversation — under its own `subagentTokens` locale namespace, and needs only the `slots` and `locale` services. The component reads no injected business face: `useSessions` supplies the global `byId` summaries, `sessionId` roots the fold, and `useProjection('tokenUsage')` supplies the Session's own buckets, all from the framework standard seats.

The fold walks each summary's `parentId` while the current row is itself a subagent, stops at an absent or non-subagent ancestor, and keeps a seen-set so a corrupt parent cycle terminates instead of spinning. A descendant whose usage projection has not arrived yet still counts as a Session and adds no tokens, so the count never understates the tree while a child's projection is in flight.

The dialog is a trigger-anchored portal panel: ui-primitives supplies the viewport clamp and the outside-pointer dismissal, and the component owns the open state, the Escape listener, and the panel placement style.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

Read these pages when the two pills are not enough. They move from the composer row to the statistics it reads and the surfaces it sits beside.

- [ui-chat](../ui-chat/README.md) — owns the Session statistics pills, the token-usage dialog, and the `tokenUsage` / `sessionStats` projections.
- [ui-subagent](../ui-subagent/README.md) — the lineage tree that renders each descendant's own figures.
- [ui-conversation](../ui-conversation/README.md) — declares `conversation.composer.dock` and owns the composer.
- [Client package map](../README.md) — adjacent browser UI packages.

-----

<a id="model-experience"></a>
## Model Experience

None, as this package renders already-durable session summaries in the browser and registers no tool, prompt section, or session event.

#### KV Cache effect

None; the roll-up reads a projection the Host already published and writes no session event.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>


These limits define the current subagent token surface. They are current package constraints, not a comparison with a host-side roll-up.

- **Cumulative, not per-turn** — the pill sums every descendant the viewed Session ever created. A child Session is durable and continuable across turns, so no per-turn attribution of a descendant exists to display.
- **Descendants only in the pill** — the headline reports what the children added rather than the tree total, which the dialog's closing row states. Replacing ui-chat's own headline would require an extension point in that package.
- **Same weight across routes** — a descendant running a different provider or model is summed as raw tokens, exactly like the Session's own figure.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>

**Runtime invariant:** No companion is published. There is a single composer-dock registration whose disposal is proven by the browser-plugin spec; every displayed figure is a pure fold over framework-owned hook data, so no second observation can diverge from it.
