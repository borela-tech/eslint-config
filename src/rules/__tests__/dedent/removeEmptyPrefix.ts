export function removeEmptyPrefix(lines: string[]): string[] {
  const copy = [...lines]
  while (copy.length > 0 && copy[0].trim() === '')
    copy.shift()
  return copy
}
