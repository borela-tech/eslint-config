export function removeEmptySuffix(lines: string[]): string[] {
  const copy = [...lines]
  while (copy.length > 0 && copy[copy.length - 1].trim() === '')
    copy.pop()
  return copy
}
