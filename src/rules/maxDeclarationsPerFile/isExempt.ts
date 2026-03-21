import path from 'node:path'

export function isExempt(filename: string): boolean {
  const name = path.basename(filename, path.extname(filename))
  return name.endsWith('.test') || name.endsWith('.spec') || name.endsWith('.config')
}
