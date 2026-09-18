// @vitest-environment jsdom
/**
 * ui-subagent-tokens browser half on a real cordis Context with a stub slots
 * service and locale runtime: the plugin contributes one composer-dock entry
 * behind its own locale namespace, and the registration leaves with the plugin
 * fiber (HMR safety). The node half stays inert.
 */
import { Context } from '@deepseek-ai/cordis'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup } from '@testing-library/react'
import { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import { LocaleRuntime } from '@deepseek-ai/dsh-client-locale/client'
import { SubagentTokens } from '../src/client/SubagentTokens.tsx'
import { apply, inject } from '../src/client/index.ts'
import { apply as nodeApply } from '../src/index.ts'

/** Boot the plugin over a stub slots service and a real locale runtime. */
async function bench() {
  const ctx = new Context()
  await ctx.plugin(SlotRegistry).await()
  ctx.slots.register({
    name: 'root',
    children: { 'conversation.composer.dock': { kind: 'list', scope: 'session' } },
  } as never, (() => null) as never)
  ctx.provide('locale', new LocaleRuntime(ctx))
  const fiber = ctx.plugin({ inject: [...inject], apply })
  return {
    ctx,
    fiber,
    entry: () => ctx.slots.entries('conversation.composer.dock')[0],
  }
}

afterEach(cleanup)

describe('ui-subagent-tokens browser plugin', () => {
  it('declares the services it binds', () => {
    expect(inject).toEqual(['slots', 'locale'])
  })

  it('registers the pill in the composer dock behind its own locale namespace', async () => {
    const b = await bench()
    await b.fiber.await()
    expect(b.entry()?.component).toBe(SubagentTokens)
    expect(b.entry()?.options).toMatchObject({ id: 'subagent-tokens', order: 1 })
    expect(b.entry()?.locale).toBe('subagentTokens')
  })

  it('drops the dock entry when the plugin fiber unloads (HMR safety)', async () => {
    const b = await bench()
    await b.fiber.await()
    expect(b.entry()).toBeDefined()
    await b.fiber.dispose()
    expect(b.entry()).toBeUndefined()
  })
})

describe('ui-subagent-tokens node half', () => {
  it('the node apply is an inert loader seat', () => {
    expect(() => { nodeApply() }).not.toThrow()
  })
})
