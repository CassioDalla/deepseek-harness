/** Token counts for the subagent token pill (`compact`) and dialog (`exact`). */

import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'

/** Locale seat of the `subagentTokens` namespace. */
export type SubagentTokensTranslate = TranslateNS<'subagentTokens'>

/** How one token count is rendered: rounded at a thousand scale, or digit-exact. */
export type TokenCountStyle = 'compact' | 'exact'

/** One compact reading, in the precision a human reads at that scale. */
function scaled(value: number): string {
  return value >= 100 ? String(Math.round(value)) : String(Math.round(value * 10) / 10)
}

/**
 * Render a token count in the style its surface needs.
 *
 * Compact reads 517 / 12.2K / 517K / 1.2M for the pill; exact spells every
 * digit with the locale's grouping separator for the dialog's reconciliation
 * rows.
 * @param value - non-negative token count.
 * @param style - `compact` for a scaled reading, `exact` for grouped digits.
 * @param t - `subagentTokens` locale seat.
 * @returns locale-owned display string.
 */
export function formatTokenCount(value: number, style: TokenCountStyle, t: SubagentTokensTranslate): string {
  if (style === 'exact') {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, t('number.groupSeparator'))
  }
  if (value >= 1_000_000) return t('number.million', { value: scaled(value / 1_000_000) })
  if (value >= 1_000) return t('number.thousand', { value: scaled(value / 1_000) })
  return String(value)
}
