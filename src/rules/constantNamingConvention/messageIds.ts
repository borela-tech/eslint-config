import type {MessageId} from './MessageId'

export const messageIds: Record<MessageId, string> = {
  camelCase: 'Variable "{{name}}" must be camelCase',
  upperCase: 'Constant "{{name}}" must be UPPER_CASE',
}
