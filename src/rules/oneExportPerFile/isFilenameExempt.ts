import * as path from 'path'

const EXEMPT_SUFFIXES = ['.config', '.model', '.spec', '.stories', '.test']

export function isFilenameExempt(filename: string): boolean {
  const name = path.basename(filename, path.extname(filename))
  const hasExemptSuffix = EXEMPT_SUFFIXES.some(suffix => name.endsWith(suffix))
  return name === 'index' || hasExemptSuffix
}
