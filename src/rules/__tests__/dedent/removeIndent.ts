export function removeIndent(lines: string[], indentSize: number): string {
  return lines.map(line => line.slice(indentSize)).join('\n')
}
