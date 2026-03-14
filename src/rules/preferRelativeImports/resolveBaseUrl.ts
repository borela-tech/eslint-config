import path from 'node:path'
import type {CompilerOptions} from 'typescript'

export function resolveBaseUrl(compilerOptions: CompilerOptions) {
  const baseUrl = compilerOptions.baseUrl
  if (baseUrl)
    return baseUrl

  const paths = compilerOptions.paths
  if (paths && Object.keys(paths).length > 0) {
    const configFile = compilerOptions.configFilePath
    if (configFile)
      return path.dirname(configFile as string)
  }

  return undefined
}
