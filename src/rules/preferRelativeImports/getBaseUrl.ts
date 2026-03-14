import type {CompilerOptions} from 'typescript'

export function getBaseUrl(
  compilerOptions: CompilerOptions,
  configFilePath?: string,
) {
  const baseUrl = compilerOptions.baseUrl
  if (baseUrl)
    return baseUrl

  const paths = compilerOptions.paths
  if (paths && Object.keys(paths).length > 0 && configFilePath)
    return undefined

  return undefined
}
