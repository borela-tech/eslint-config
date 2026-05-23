import * as path from 'path'

export function isFilenameExempt(filename: string): boolean {
  const name = path.basename(filename, path.extname(filename))
  return (
    name === 'index'
    || name.endsWith('.test')
    || name.endsWith('.spec')
    || name.endsWith('.config')
    || name.endsWith('.stories')
    || name.endsWith('.model')
  )
}
