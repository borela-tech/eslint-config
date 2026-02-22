import type {ImportSpecifier} from 'estree'

export function getSpecifierName(specifier: ImportSpecifier): string {
  return specifier.imported.type === 'Identifier'
    ? specifier.imported.name
    : String(specifier.imported.value)
}
