---
description: "Web GUI composer 的子代理 token 汇总：在 ui-chat 自身的用量 pill 旁，显示所查看会话的子代理后代计费量的 pill 与对话框；供 composer 统计行的用户与维护者阅读。"
kind: "package-reference"
---

# @deepseek-ai/dsh-client-ui-subagent-tokens

[English](README.md) | 中文

## 概述

Web GUI 的子代理 token 界面在 composer dock 中新增一个 pill，显示所查看会话的子代理后代计费了多少 token，并提供一个对话框，把子代理的四个 provider 桶与会话自身数字以及整棵会话树的总量对齐。它是增量式的：ui-chat 自身的统计 pill 继续报告会话自身的用量，而本 pill 只在后代已经产生计费 token 后出现。所有数字都是对全局会话列表摘要加上会话自身 `tokenUsage` 投影的纯折叠，因此打开 pill 不产生任何请求。

## 目录

- [使用本包](#use-this-package)
- [理解实现](#understand-the-implementation)
- [进一步探索](#further-exploration)
- [模型体验](#model-experience)
- [已知限制与延期工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

把本插件与 `ui-chat`、`ui-conversation` 一起挂载；一旦所查看会话的子代理后代产生了计费 token，pill 就会出现在 composer dock 中。没有委派任何子代理、或子代理尚未产生计费的会话，依旧只有 ui-chat 的一行统计，因此本界面绝不会重复显示同一个数字，也不会显示空读数。

### pill 与它的对话框

pill 读取后代的合计计费 token 及其会话数量，例如 `3 个子代理 · 1.4K`。点击后会打开对话框，其中列出会话自身总量、后代合计、各自独立的未缓存输入、缓存读取、缓存写入与输出桶，并以 `合计（含子代理）` 行收尾。缓存写入行只在后代确实写入过缓存条目时出现，与 ui-chat 对话框中会话自身的分块规则一致。

保持分桶是因为长时间运行的子代理每一步都会重发提示词：它的缓存读取在合计中占主导，但成本只是新输入的一小部分，单个数字会让人把它读成支出，而实际上主要是体量。

### 两个 pill 一起读

原生 pill 回答“这个会话计费了多少”，子代理 pill 回答“它的子代理增加了多少”；会话树总量是两者之和，由对话框的收尾行明确给出。缓存命中率仍留在原生 pill 上，因为子代理可能走其他路由，用它们的提示词聚合出的命中率描述不了任何真实请求。

-----

<a id="understand-the-implementation"></a>
## 理解实现

<details>
<summary>实现细节——点击展开</summary>

插件向 `conversation.composer.dock`（ui-conversation 声明的会话级 list slot）注册一个条目，挂在它自己的 `subagentTokens` locale 命名空间下，只依赖 `slots` 与 `locale` 两个服务。组件不读取任何注入的业务面：`useSessions` 提供全局 `byId` 摘要，`sessionId` 作为折叠的根，`useProjection('tokenUsage')` 提供会话自身的桶，全部来自框架标准席位。

折叠会沿每条摘要的 `parentId` 上溯，前提是当前行本身是子代理；遇到缺失或非子代理的祖先即停止，并保留 seen 集合，使损坏的父指针环能够终止而不是空转。用量投影尚未到达的后代仍计入会话数量且不加 token，因此子代理投影在途时数量也不会低估整棵树。

对话框是锚定在触发元素上的 portal 面板：ui-primitives 提供视口钳制与外部指针关闭，组件自己持有打开状态、Escape 监听与面板定位样式。

</details>

-----

<a id="further-exploration"></a>
## 进一步探索

当两个 pill 不够用时阅读以下页面。它们从 composer 行进入它所读取的统计与它旁边的界面。

- [ui-chat](../ui-chat/README.zh.md)——拥有会话统计 pill、token 用量对话框以及 `tokenUsage` / `sessionStats` 投影。
- [ui-subagent](../ui-subagent/README.zh.md)——渲染每个后代自身数字的谱系树。
- [ui-conversation](../ui-conversation/README.zh.md)——声明 `conversation.composer.dock` 并拥有 composer。
- [客户端包映射](../README.zh.md)——相邻的浏览器 UI 包。

-----

<a id="model-experience"></a>
## 模型体验

无，因为本包在浏览器中渲染已持久化的会话摘要，不注册任何工具、提示词段落或会话事件。

#### KV Cache 影响

无；该汇总读取 Host 已发布的投影，不写入会话事件。

## 已知限制与延期工作

<a id="known-limitations-and-deferred-work"></a>


这些限制界定了当前子代理 token 界面。它们是当前包约束，不是与宿主侧汇总的对比。

- **累计而非按轮次**——pill 汇总所查看会话创建过的每个后代。子代理会话是持久的、可跨轮次继续的，因此不存在可显示的后代按轮次归因。
- **pill 中只有后代数字**——标题报告的是子代理新增的部分而非会话树总量，后者由对话框收尾行给出。要替换 ui-chat 自身的标题，需要在该包中增加扩展点。
- **跨路由按同一权重计算**——使用其他 provider 或模型的子代理与父会话自身数字一样，按原始 token 相加。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>

**运行时不变式：** 不发布伴生入口。插件只注册一个 composer dock 条目，其释放已由 browser-plugin 用例证明；所有显示的数字都是对框架钩子数据的纯折叠，因此不存在会与之背离的第二个观测点。
