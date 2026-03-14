import type {PathAlias} from './PathAlias'

export function isExternalImport(
  importPath: string,
  aliases: PathAlias[],
) {
  if (importPath.startsWith('./'))
    return false

  if (importPath.startsWith('../'))
    return false

  for (const {prefix} of aliases) {
    if (importPath.startsWith(prefix))
      return false

    if (importPath === aliases.find(a => a.alias === importPath)?.alias)
      return false
  }

  return true
}
