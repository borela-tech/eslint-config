import path from 'node:path'

export function getRelativePath(
  fromPath: string,
  toPath: string,
) {
  const fromDir = path.dirname(fromPath)
  const normalizedFrom = path.normalize(fromDir)
  const normalizedTo = path.normalize(toPath)

  const relative = path.relative(normalizedFrom, normalizedTo)
  if (relative.startsWith('..'))
    return null

  return './' + relative
}
