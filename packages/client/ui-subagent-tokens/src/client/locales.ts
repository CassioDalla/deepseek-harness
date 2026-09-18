/** `subagentTokens` namespace dictionaries. */

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The subagent token pill's copy. */
    subagentTokens: SubagentTokensKey
  }
}

/** Dictionary namespace owned by this plugin. */
export const NS = 'subagentTokens'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'number.groupSeparator': ',',
  'pill.one': '{count} 个子代理 · {tokens}',
  'pill.other': '{count} 个子代理 · {tokens}',
  'pill.aria': '子代理 token 用量：{tokens}',
  'dialog.title': '子代理 token 用量',
  'dialog.own': '本会话',
  'dialog.subagents': '子代理（{count}）',
  'dialog.input': '子代理未缓存输入',
  'dialog.cacheRead': '子代理缓存读取',
  'dialog.cacheWrite': '子代理缓存写入',
  'dialog.output': '子代理输出',
  'dialog.total': '合计（含子代理）',
  'dialog.count': '{count} tok',
} as const

/** English dictionary, key-identical to the Chinese source of truth. */
export const en: Record<SubagentTokensKey, string> = {
  'number.groupSeparator': ',',
  'pill.one': '{count} subagent · {tokens}',
  'pill.other': '{count} subagents · {tokens}',
  'pill.aria': 'Subagent token usage: {tokens}',
  'dialog.title': 'Subagent token usage',
  'dialog.own': 'This session',
  'dialog.subagents': 'Subagents ({count})',
  'dialog.input': 'Subagent uncached input',
  'dialog.cacheRead': 'Subagent cached input',
  'dialog.cacheWrite': 'Subagent cache write',
  'dialog.output': 'Subagent output',
  'dialog.total': 'Total incl. subagents',
  'dialog.count': '{count} tok',
}

/** Key domain of the `subagentTokens` namespace (zh is the source of truth). */
export type SubagentTokensKey = keyof typeof zh
