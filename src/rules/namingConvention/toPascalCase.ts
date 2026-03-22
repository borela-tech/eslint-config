import {toCamelCase} from './toCamelCase'

export function toPascalCase(name: string): string {
  const camelCase = toCamelCase(name)
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}
