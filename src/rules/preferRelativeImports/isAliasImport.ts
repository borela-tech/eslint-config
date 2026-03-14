import type {PathAlias} from './PathAlias'

export function isAliasImport(
  importPath: string,
  aliases: PathAlias[],
) {
  for (const {alias} of aliases) {
    if (importPath === alias || importPath.startsWith(alias + '/'))
      return true
  }
  return false
}
