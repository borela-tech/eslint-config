import {findMinIndent} from './findMinIndent'
import {interpolate} from './interpolate'
import {removeEmptyPrefix} from './removeEmptyPrefix'
import {removeEmptySuffix} from './removeEmptySuffix'
import {removeIndent} from './removeIndent'

export function dedent(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const raw = interpolate(strings, values)
  const lines = raw.split('\n')
  const withoutPrefix = removeEmptyPrefix(lines)
  const trimmed = removeEmptySuffix(withoutPrefix)
  const indentSize = findMinIndent(trimmed)
  return removeIndent(trimmed, indentSize)
}
