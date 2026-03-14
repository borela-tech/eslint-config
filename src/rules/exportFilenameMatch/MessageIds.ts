export const messageIds = {
  filenameMismatch:
    "Filename must match the exported name: expected '{{filename}}', found '{{exportName}}'.",
} as const

export type MessageId = keyof typeof messageIds
