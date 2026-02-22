export function countLeadingSpaces(line: string): number {
  const match = line.match(/^(\s*)/)
  return match ? match[1].length : 0
}
