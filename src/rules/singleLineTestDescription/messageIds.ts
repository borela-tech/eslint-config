import type {MessageId} from './MessageId'

export const messageIds: Record<MessageId, string> = {
  exceedsMaxLength: 'Shorten test description so that {{callee}} call fits on one line ({{length}} > {{maxLength}})',
  multiline: 'Test description must be on a single line. Shorten description to keep {{callee}} call within {{maxLength}} characters instead of breaking across lines',
}
