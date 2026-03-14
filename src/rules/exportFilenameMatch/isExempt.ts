import path from 'node:path'

export function isExempt(filename: string): boolean {
  const basename = path.basename(filename)

  return (
    basename === 'index.ts'
    || basename.endsWith('.test.ts')
    || basename.endsWith('.spec.ts')
    || filename.includes('/rules/')
    || filename.includes('\\rules\\')
  )
}
