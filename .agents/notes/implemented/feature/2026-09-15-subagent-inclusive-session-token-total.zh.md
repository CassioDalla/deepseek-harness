# Agent Note: 会话 token 总量包含子代理

Status: implemented

[English](2026-09-15-subagent-inclusive-session-token-total.md) | 中文

## Problem

输入框下方的数据库 pill 只报告当前会话自身的 `tokenUsage` 投影。每个子代理都跑在自己的会话里、拥有自己独立的持久日志，因此这个头条读数恰好少算了该会话委派出去的那部分工作：读者用来判断一次对话花了多少的数字不含子会话，而会话头部的血缘树早已逐个显示每个子会话自身的数字。推理 token 从来不是缺口——它们就在 `outputTokens` 里，不会被重复累加——所以缺的是汇总，而不是记账。

## Decision

**pill 的头条读数是会话树总量。** [subagent-usage.ts](../../../../packages/client/ui-chat/src/client/chat/subagent-usage.ts) 折叠会话列表 `byId` 中的摘要：对每个 `origin === 'subagent'` 且祖先链能上溯到根会话的会话（任意深度），累加四个互不重叠的 provider 桶**并保持它们彼此分开**。上溯在遇到缺失或非子代理的祖先时停止，并保留 seen 集合，因此断掉的父指针或损坏的父级环会终止而不是空转；用量投影尚未到达的子会话仍计为一个会话，只是不加 token。[StatsPills.tsx](../../../../packages/client/ui-chat/src/client/chat/StatsPills.tsx) 读取 `useSessions` 常驻座位和插槽自身的 `sessionId`——两者都由标准 props 派生，因此不需要新的注入，也没有宿主往返——`UsagePill` 把子会话的计费总量加进它的头条合计。

**弹窗按桶对账。** 只要存在至少一个子会话，token 弹窗就多出一段子代理区块：先是一行 `Subagents (N)` 给出合并总量，随后是子会话各自的 `Subagent uncached input`、`Subagent cached input`、`Subagent output`，以及该桶非零时出现的 `Subagent cache write`——与当前会话区块"始终存在／为零即省略"的规则一致——最后以 `Total incl. subagents` 收束。区块之上的各行仍是当前会话自身的拆分，所以头条数字的来源与拆分都始终可读。之所以保持分桶，是因为合并数字恰恰会在本功能存在的那个场景里误导：长跑的子会话每一步都重发自己的 prompt，缓存读取因此主导它的总量，而其单价只是新输入的一小部分——一个合并数字读起来像开销，实际主要是体量。

**缓存命中率与 per-turn 面板保持只算自身。** 子会话可能跑在别的路由上，把它们的 prompt 汇成一个命中率将不描述任何一次真实请求；而子会话是持久且可跨轮次续跑的，因此并不存在可展示的"某个子会话属于某一轮"。本决议细化[输入框下的会话统计](2026-09-07-composer-session-stats-pills.zh.md)——两 pill 的划分与弹窗皮肤由该文拥有。投影与 wire 约定都没有变化，因为客户端本就持有每个子会话的摘要。

## Alternatives considered

**合并成一个子会话总量。** 单一 `Subagents (N)` 数字是最初落地的形态，它掩盖了 token 的去向：长跑子会话的总量绝大部分是缓存读取，而缓存读取的单价只是新输入的一小部分，于是这个数字读起来像花费，实际主要是体量。分桶的代价只是在一个本就藏在点击之后的弹窗里多出四行。

**只在弹窗加汇总行、头条不动。** 头条是不点击就会读到的数字，而"这棵会话树消耗了多少"正是这个 pill 存在的意义；把它留在自身会话的数字上等于保留原来的缺陷。

**把子会话归到派生它的那一轮。** 子会话持久且可续跑，可续跑的子会话能跨越或服务多轮，因此按轮归属是编造而非测量。

**自身加子会话合成一个缓存命中率。** 该比值会混合不同路由与不同 prompt，不描述任何真实请求；只算自身路由的数字才是诚实的。

**在宿主侧新增会话树总量投影。** 摘要已在客户端，折叠又是纯函数，新增投影等于为浏览器已持有的数据再加一份 wire 约定和宿主计算。

**复用 ui-subagent 的 `indexSubagentDescendants`。** 功能插件不得运行时导入另一个功能插件的值（packages/client/AGENTS.md），且该 helper 只统计子会话数量，不累加 token。

## Consequences

- `StatsPillsProps` 从 `SessionStandardProps` 与 `GlobalStandardProps` 派生 `sessionId` 和 `useSessions`；三个直接渲染 `StatsPills` 的 chat 用例现在都传入这两个桩。
- 用量 pill 是否出现仍取决于当前会话自身的计费活动，因此自身零计费的会话即使子会话花了 token 也不显示树总量。
- 该 helper 落在既有的 `ui-chat/src/client/chat/*` 覆盖率豁免范围内；chat-stats 用例覆盖逐桶求和、深度、外部树、孤儿、子会话投影缺失和父级环。
- 会话的持久子会话无论由哪一轮派生都会被累加，因此树总量是该会话曾创建过的全部子会话的累计值，而不只是当前这一轮的。
- web 快照回放套件无变化，包括 subagent-conversation 场景，因此没有 golden 需要重新录制。
