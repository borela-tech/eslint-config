export type Options = [{
  maxLength?: number
}]

export const defaultOptions = {
  maxLength: 120,
} as const satisfies Options[0]
