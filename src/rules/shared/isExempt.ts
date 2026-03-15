import path from 'node:path'

function stripExtension(filename: string): string {
  return path.basename(filename, path.extname(filename))
}

export function isExempt(filename: string): boolean {
  const name = stripExtension(filename)

  return (
    name === 'index'
    || name.endsWith('.test')
    || name.endsWith('.spec')
    || name.endsWith('.config')
  )
}
