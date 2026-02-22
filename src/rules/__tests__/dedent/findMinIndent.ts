import {countLeadingSpaces} from './countLeadingSpaces'

export function findMinIndent(lines: string[]): number {
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)
  const indents = nonEmptyLines.map(line => countLeadingSpaces(line))
  return Math.min(...indents)
}
