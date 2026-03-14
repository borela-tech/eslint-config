import path from 'node:path'
import type {PathAlias} from './PathAlias'

export function resolveAliasToPath(
  importPath: string,
  aliases: PathAlias[],
) {
  for (const {alias, target, prefix} of aliases) {
    if (importPath === alias)
      return target

    if (importPath.startsWith(prefix)) {
      const rest = importPath.slice(prefix.length)
      return path.join(target, rest)
    }
  }

  return null
}
