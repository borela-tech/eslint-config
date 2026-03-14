import {parsePathAlias} from './parsePathAlias'
import type {CompilerOptions} from 'typescript'
import type {PathAlias} from './PathAlias'

export function parsePathAliases(
  compilerOptions: CompilerOptions,
) {
  const paths = compilerOptions.paths ?? {}
  const aliases: PathAlias[] = []

  for (const [pattern, targets] of Object.entries(paths)) {
    const target = (targets as string[])[0]
    if (!target)
      continue

    const parsed = parsePathAlias(pattern, target, compilerOptions)
    if (parsed)
      aliases.push(parsed)
  }

  return aliases
}
