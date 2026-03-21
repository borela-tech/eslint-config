import path from 'node:path'

export function isExempt(filename: string): boolean {
  const name = path.basename(filename, path.extname(filename))
  const isTest = name.endsWith('.test')
  const isSpec = name.endsWith('.spec')
  const isConfig = name.endsWith('.config')
  return isTest || isSpec || isConfig
}
