export type MessageId =
  | 'exceedsMaxLength'
  | 'multipleOnSameLine'

export const messageIds = {
  exceedsMaxLength: 'Refactor this function call as it exceeds {{maxLength}} characters',
  multipleOnSameLine: 'Each argument must be on its own line',
} as const
