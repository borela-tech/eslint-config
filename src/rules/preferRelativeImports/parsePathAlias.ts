import path from 'node:path'
import type {CompilerOptions} from 'typescript'

export function parsePathAlias(
  pattern: string,
  target: string,
  compilerOptions: CompilerOptions,
) {
  const alias = pattern.replace('/*', '')
  if (!alias)
    return null

  const targetPath = target.replace('/*', '')
  let resolvedTarget = targetPath

  if (targetPath.startsWith('./')) {
    const configFile = compilerOptions.configFilePath
    if (configFile) {
      const parentDirectory = path.dirname(configFile as string)
      resolvedTarget = path.resolve(parentDirectory, targetPath)
    }
  }

  return {
    alias,
    prefix: alias + '/',
    target: resolvedTarget,
  }
}
