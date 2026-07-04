import * as path from 'path'

const EXEMPT_FILENAMES = new Set(['index'])
const EXEMPT_SUFFIXES = [
  '.config',
  '.spec',
  '.storybook/main',
  '.stories',
  '.test',
]

export function isFileExempt(filePath: string): boolean {
  const ext = path.extname(filePath)
  const pathWithoutExt = filePath.slice(0, -ext.length)
  const normalizedPath = pathWithoutExt.replaceAll('\\', '/')
  const baseName = path.basename(normalizedPath)
  return EXEMPT_FILENAMES.has(baseName)
    || EXEMPT_SUFFIXES.some(suffix => normalizedPath.endsWith(suffix))
}
