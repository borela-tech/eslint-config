import type {MessageId} from './MessageId'

export const messageIds: Record<MessageId, string> = {
  exceedsMaxLength: 'Interface line exceeds {{maxLength}} characters',
  multipleOnSameLine: 'Interface members should each be on their own line when line exceeds {{maxLength}} characters',
}
