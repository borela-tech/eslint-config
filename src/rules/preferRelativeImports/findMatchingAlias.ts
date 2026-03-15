import path from 'node:path'
import type {PathAlias} from './PathAlias'

export function findMatchingAlias(
  targetPath: string,
  aliases: PathAlias[],
) {
  const normalizedTarget = path.normalize(targetPath)

  for (const {alias, prefix, target} of aliases) {
    const normalizedAliasTarget = path.normalize(target)

    if (normalizedTarget.startsWith(normalizedAliasTarget + path.sep)) {
      const rest = normalizedTarget.slice(
        (normalizedAliasTarget + path.sep).length,
      )
      return prefix + rest
    }

    if (normalizedTarget === normalizedAliasTarget)
      return alias
  }

  return null
}
