import * as path from 'path'

const EXEMPT_SUFFIXES = ['.config', '.model', '.spec', '.stories', '.test']

export function isExempt(filename: string): boolean {
  const name = path.basename(filename, path.extname(filename))
  return EXEMPT_SUFFIXES.some(suffix => name.endsWith(suffix))
}
