export type MessageId =
  | 'exceedsMaxLength'
  | 'multipleOnSameLine'

export const messageIds = {
  exceedsMaxLength: 'Refactor this function signature as it exceeds {{maxLength}} characters',
  multipleOnSameLine: 'Each parameter must be on its own line',
} as const
