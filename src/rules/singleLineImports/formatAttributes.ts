import type {TSESTree} from '@typescript-eslint/types'

export function formatAttributes(
  attributes: readonly TSESTree.ImportAttribute[],
): string {
  if (attributes.length === 0)
    return ''

  const formatted = attributes.map(
    attr => {
      const key = attr.key.type === 'Identifier'
        ? attr.key.name
        : attr.key.value
      const value = attr.value.value
      return `${key}: '${value}'`
    },
  ).join(', ')

  return ` with {${formatted}}`
}
