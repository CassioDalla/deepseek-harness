/**
 * Subagent token pill: one composer-dock entry reporting what a Session's
 * subagent descendants billed, with a dialog that reconciles their four
 * provider buckets against the Session's own figure and the tree total.
 *
 * The value is additive to ui-chat's own database pill, which keeps reporting
 * the Session's own usage: this entry renders only once its descendants have
 * billed tokens, so a delegating conversation grows a second reading instead of
 * a duplicate one. Every figure rides the global session-list summaries plus
 * the `tokenUsage` projection — no request of its own.
 */

import {
  memo, useEffect, useMemo, useRef, useState, type CSSProperties, type MutableRefObject,
} from 'react'
import { createPortal } from 'react-dom'
import {
  IconBranchOutline16, useAnchoredPosition, useDismissOnOutsidePointer,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: declares the composer-dock slot this entry contributes to.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: declares the Session standard seats (sessionId, useProjection).
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
// Type-only: merges the `tokenUsage` key into SessionProjectionMap for useProjection.
import type { TokenUsageProjection } from '@deepseek-ai/dsh-token-meter/client'
import { subagentUsageTotals, type SubagentUsageTotals } from './subagent-usage.ts'
import { formatTokenCount, type SubagentTokensTranslate } from './token-format.ts'
import css from './SubagentTokens.module.css'

/** Viewport margin the panel placement clamp keeps. */
const PANEL_MARGIN = 12

/** Distance between the pill's top edge and the panel's bottom. */
const PANEL_GAP = 8

/**
 * Unplaced portal panel: hidden but laid out so the clamp measures real
 * dimensions before the panel paints.
 */
const MEASURE_STYLE: CSSProperties = { visibility: 'hidden', left: 0, top: 0 }

/** Props: the composer dock's standard seats plus this entry's locale seat. */
export type SubagentTokensProps =
  & PropsRuntime<'conversation.composer.dock'>
  & PropsLocale<'subagentTokens'>

/**
 * Sum the four disjoint provider billing buckets.
 * @param usage - one Session's token-usage projection value.
 * @returns billed tokens across prompt input and output.
 */
function billedTotal(usage: TokenUsageProjection): number {
  return usage.uncachedInputTokens + usage.cacheReadTokens + usage.cacheWriteTokens + usage.outputTokens
}

/** One dialog row value: digit-exact tokens with the locale's unit. */
function exactCount(value: number, t: SubagentTokensTranslate): string {
  return t('dialog.count', { count: formatTokenCount(value, 'exact', t) })
}

/** Open state, refs, and clamped placement for the pill's dialog. */
interface TokensDialogSeat {
  open: boolean
  setOpen: (open: boolean) => void
  rootRef: MutableRefObject<HTMLSpanElement | null>
  panelRef: MutableRefObject<HTMLDivElement | null>
  pos: CSSProperties | null
}

/**
 * One trigger-anchored dialog seat: open state, viewport-clamped placement
 * above the pill, outside-pointer close, and Escape close while open.
 * @returns the seat; spread `pos ?? MEASURE_STYLE` onto the portaled panel.
 */
function useTokensDialog(): TokensDialogSeat {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const pos = useAnchoredPosition({
    open,
    anchorRef: rootRef,
    panelRef,
    side: 'top',
    gap: PANEL_GAP,
    margin: PANEL_MARGIN,
  })
  useDismissOnOutsidePointer(rootRef, open, setOpen, panelRef)
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown) }
  }, [open])
  return { open, setOpen, rootRef, panelRef, pos }
}

function TokensPill({ usage, subagents, t }: {
  usage: TokenUsageProjection
  subagents: SubagentUsageTotals
  t: SubagentTokensTranslate
}) {
  const { open, setOpen, rootRef, panelRef, pos } = useTokensDialog()
  const label = t(subagents.sessions === 1 ? 'pill.one' : 'pill.other', {
    count: subagents.sessions,
    tokens: formatTokenCount(subagents.tokens, 'compact', t),
  })
  const treeTotal = billedTotal(usage) + subagents.tokens
  return (
    <span ref={rootRef} className={css.anchor}>
      <button
        type="button"
        className={css.pill}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t('pill.aria', { tokens: exactCount(subagents.tokens, t) })}
        onClick={() => { setOpen(!open) }}
      >
        <IconBranchOutline16 />
        <span className={css.label}>{label}</span>
      </button>
      {open && createPortal(
        <div
          ref={panelRef}
          className={css.panel}
          role="dialog"
          aria-label={t('dialog.title')}
          style={pos ?? MEASURE_STYLE}
        >
          <div className={css.title}>
            <span className={css.titleLabel}>
              <IconBranchOutline16 />
              {t('dialog.title')}
            </span>
            <span className={css.titleValue}>{exactCount(treeTotal, t)}</span>
          </div>
          <div className={css.titleRule} aria-hidden />
          <dl className={css.details}>
            <dt>{t('dialog.own')}</dt>
            <dd>{exactCount(billedTotal(usage), t)}</dd>
            <dt>{t('dialog.subagents', { count: subagents.sessions })}</dt>
            <dd>{exactCount(subagents.tokens, t)}</dd>
            <dt>{t('dialog.input')}</dt>
            <dd>{exactCount(subagents.uncachedInputTokens, t)}</dd>
            <dt>{t('dialog.cacheRead')}</dt>
            <dd>{exactCount(subagents.cacheReadTokens, t)}</dd>
            {subagents.cacheWriteTokens !== 0 && (
              <>
                <dt>{t('dialog.cacheWrite')}</dt>
                <dd>{exactCount(subagents.cacheWriteTokens, t)}</dd>
              </>
            )}
            <dt>{t('dialog.output')}</dt>
            <dd>{exactCount(subagents.outputTokens, t)}</dd>
            <dt>{t('dialog.total')}</dt>
            <dd>{exactCount(treeTotal, t)}</dd>
          </dl>
        </div>,
        document.body,
      )}
    </span>
  )
}

export const SubagentTokens = memo(function SubagentTokens({
  sessionId, useSessions, useProjection, t,
}: SubagentTokensProps) {
  // Descendant summaries carry each subagent's own usage projection, so the
  // roll-up costs one fold and no request; the lineage tree renders the same
  // per-child figures as the authoritative detail view.
  const summaries = useSessions(store => store.byId)
  const usage = useProjection('tokenUsage')
  const subagents = useMemo(
    () => subagentUsageTotals(sessionId, summaries),
    [sessionId, summaries],
  )
  // Nothing to add when the descendants billed nothing, and no reconciliation
  // is possible without the Session's own projection; ui-chat's pill already
  // carries the Session's own figure in both states.
  if (usage === undefined || subagents.tokens === 0) return null
  return <TokensPill usage={usage} subagents={subagents} t={t} />
})
