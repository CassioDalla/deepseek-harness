// @vitest-environment jsdom
/**
 * SubagentTokens: an additive composer-dock pill over the session-list
 * summaries. The suite drives the component with framework-seat stubs and
 * asserts visible behavior — when the pill appears, what it reads, and what
 * its dialog reconciles. Node identity, not render counts, decides the
 * descendant fold.
 */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import type { SessionListState, SessionSummary } from '@deepseek-ai/dsh-api-session-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { TokenUsageProjection } from '@deepseek-ai/dsh-token-meter/client'
import { bindSnapshotSelector, makeTranslate } from '@deepseek-ai/dsh-client-test-runtime'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import { en as commonEn } from '@deepseek-ai/dsh-client-locale/src/locales/en.ts'
import { en } from '../src/client/locales.ts'
import { SubagentTokens, type SubagentTokensProps } from '../src/client/SubagentTokens.tsx'

const t = makeTranslate(en, commonEn)
const ROOT = 'root' as SessionId

/** The viewed Session's own usage: 100 uncached + 900 cached + 100 output. */
const OWN_USAGE: TokenUsageProjection = {
  uncachedInputTokens: 100,
  cacheReadTokens: 900,
  cacheWriteTokens: 0,
  outputTokens: 100,
}

/** One session-list row: required fields plus overrides. */
function summary(id: string, overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    id: id as SessionId, displayTitle: id, running: false, blank: false, updatedAt: 1, ...overrides,
  } as SessionSummary
}

/** A subagent row carrying its own usage projection. */
function child(id: string, usage: TokenUsageProjection): SessionSummary {
  return summary(id, { origin: 'subagent', parentId: ROOT, projectionValues: { tokenUsage: usage } })
}

const CHILD_ONE: SessionSummary = child('c1', {
  uncachedInputTokens: 10, cacheReadTokens: 100, cacheWriteTokens: 0, outputTokens: 90,
})
const CHILD_TWO: SessionSummary = child('c2', {
  uncachedInputTokens: 20, cacheReadTokens: 1_000, cacheWriteTokens: 5, outputTokens: 175,
})

/** Global sessions seat over a fixed `byId` table. */
function sessionsHook(rows: SessionSummary[]): SubagentTokensProps['useSessions'] {
  const byId: Record<string, SessionSummary> = {}
  for (const row of rows) byId[row.id] = row
  return bindSnapshotSelector(createSnapshotStore<SessionListState>({
    ids: rows.map(row => row.id),
    byId,
    phase: 'ready',
    subagentsByParent: {},
    jobsBySession: {},
  }))
}

/** Composed props for a driven render: seats stubbed, absent shares unread. */
function props(rows: SessionSummary[], values: Record<string, unknown>): SubagentTokensProps {
  return {
    sessionId: ROOT,
    useSessions: sessionsHook(rows),
    useProjection: (key: string) => values[key],
    t,
  } as unknown as SubagentTokensProps
}

/** Open the pill's dialog and return it. */
function openDialog(): HTMLElement {
  fireEvent.click(screen.getByRole('button'))
  return screen.getByRole('dialog', { name: 'Subagent token usage' })
}

/** Read one dialog row's value by its label. */
function rowValue(dialog: HTMLElement, label: string): string | null {
  return within(dialog).getByText(label).nextElementSibling?.textContent ?? null
}

afterEach(cleanup)

describe('SubagentTokens', () => {
  it('renders nothing without a billed descendant or without the own usage projection', () => {
    const noDescendants = render(<SubagentTokens {...props([summary('root')], { tokenUsage: OWN_USAGE })} />)
    expect(noDescendants.container.firstChild).toBeNull()
    cleanup()

    const unbilledDescendant = render(
      <SubagentTokens
        {...props(
          [child('c1', { uncachedInputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, outputTokens: 0 })],
          { tokenUsage: OWN_USAGE },
        )}
      />,
    )
    expect(unbilledDescendant.container.firstChild).toBeNull()
    cleanup()

    const absentOwnUsage = render(<SubagentTokens {...props([CHILD_ONE], {})} />)
    expect(absentOwnUsage.container.firstChild).toBeNull()
  })

  it('reads the descendants as one compact figure labelled with their count', () => {
    const single = render(<SubagentTokens {...props([CHILD_ONE], { tokenUsage: OWN_USAGE })} />)
    expect(screen.getByRole('button').textContent).toBe('1 subagent · 200')
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Subagent token usage: 200 tok')
    single.unmount()

    render(<SubagentTokens {...props([CHILD_ONE, CHILD_TWO], { tokenUsage: OWN_USAGE })} />)
    expect(screen.getByRole('button').textContent).toBe('2 subagents · 1.4K')
    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Subagent token usage: 1,400 tok')
  })

  it('reconciles the own figure, the descendant buckets, and the tree total in its dialog', () => {
    render(<SubagentTokens {...props([CHILD_ONE, CHILD_TWO], { tokenUsage: OWN_USAGE })} />)
    const dialog = openDialog()
    expect(rowValue(dialog, 'This session')).toBe('1,100 tok')
    expect(rowValue(dialog, 'Subagents (2)')).toBe('1,400 tok')
    expect(rowValue(dialog, 'Subagent uncached input')).toBe('30 tok')
    expect(rowValue(dialog, 'Subagent cached input')).toBe('1,100 tok')
    expect(rowValue(dialog, 'Subagent cache write')).toBe('5 tok')
    expect(rowValue(dialog, 'Subagent output')).toBe('265 tok')
    expect(rowValue(dialog, 'Total incl. subagents')).toBe('2,500 tok')
    // The heading carries the same tree total as the closing row.
    expect(within(dialog).getAllByText('2,500 tok')).toHaveLength(2)
  })

  it('drops the cache-write row for descendants that never wrote a cache entry', () => {
    render(<SubagentTokens {...props([CHILD_ONE], { tokenUsage: OWN_USAGE })} />)
    const dialog = openDialog()
    expect(within(dialog).queryByText('Subagent cache write')).toBeNull()
  })

  it('closes on Escape, on an outside pointer, and stays open for other keys', () => {
    render(<SubagentTokens {...props([CHILD_ONE], { tokenUsage: OWN_USAGE })} />)
    openDialog()
    fireEvent.keyDown(document, { key: 'a' })
    expect(screen.getByRole('dialog', { name: 'Subagent token usage' })).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'Subagent token usage' })).toBeNull()

    // Reopening keeps the toggle honest, and a pointer inside the pill leaves it open.
    fireEvent.click(screen.getByRole('button'))
    fireEvent.pointerDown(screen.getByRole('button'))
    expect(screen.getByRole('dialog', { name: 'Subagent token usage' })).toBeTruthy()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('dialog', { name: 'Subagent token usage' })).toBeNull()
  })
})
