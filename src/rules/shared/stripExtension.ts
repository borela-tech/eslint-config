import * as path from 'path'

export function stripExtension(filename: string): string {
  return path.basename(filename, path.extname(filename))
}
