export const messageIds = {
  tooManyExports:
    'Only one export is allowed per file. Found {{count}} exports.',
} as const

export type MessageId = keyof typeof messageIds
