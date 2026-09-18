/**
 * Subagent token roll-up plugin, browser half: one composer-dock pill over the
 * global session-list summaries plus the Session's own `tokenUsage` projection.
 * The contribution is additive — ui-chat's own stats pill keeps reporting the
 * Session's own usage, and this entry appears only while descendants exist.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the Conversation service and the composer-dock slot declaration.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: pulls the renderer-owned slots service.
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Type-only: pulls the Session standard seats this entry reads (sessionId, useProjection).
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import { SubagentTokens } from './SubagentTokens.tsx'
import { en, NS, zh } from './locales.ts'

/** Required services for the composer-dock contribution and its copy. */
export const inject = ['slots', 'locale']

/**
 * Client plugin body: register the subagent token pill in the composer dock.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-subagent-tokens: dictionaries')
  ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
    name: 'conversation.composer.dock',
    id: 'subagent-tokens',
    order: 1,
    locale: NS,
  }, SubagentTokens))
}
