/** token-format: compact and digit-exact token counts. */
import { describe, expect, it } from 'vitest'
import { makeTranslate } from '@deepseek-ai/dsh-client-test-runtime'
import { en as commonEn } from '@deepseek-ai/dsh-client-locale/src/locales/en.ts'
import { en } from '../src/client/locales.ts'
import { formatTokenCount, type SubagentTokensTranslate } from '../src/client/token-format.ts'

const t: SubagentTokensTranslate = makeTranslate(en, commonEn)
const compact = (value: number): string => formatTokenCount(value, 'compact', t)
const exact = (value: number): string => formatTokenCount(value, 'exact', t)

describe('formatTokenCount compact', () => {
  it('keeps counts below a thousand exact', () => {
    expect(compact(0)).toBe('0')
    expect(compact(517)).toBe('517')
    expect(compact(999)).toBe('999')
  })

  it('scales thousands with one decimal below a hundred units', () => {
    expect(compact(1_000)).toBe('1K')
    expect(compact(12_200)).toBe('12.2K')
  })

  it('rounds to whole units once the scaled value reaches a hundred', () => {
    expect(compact(517_000)).toBe('517K')
    expect(compact(999_999)).toBe('1000K')
  })

  it('scales millions the same way', () => {
    expect(compact(1_200_000)).toBe('1.2M')
    expect(compact(999_000_000)).toBe('999M')
  })
})

describe('formatTokenCount exact', () => {
  it('groups digits by three with the locale separator', () => {
    expect(exact(0)).toBe('0')
    expect(exact(999)).toBe('999')
    expect(exact(1_234)).toBe('1,234')
    expect(exact(1_234_567)).toBe('1,234,567')
  })
})
