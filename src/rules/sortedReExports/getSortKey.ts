import {categorizeReExport} from './categorizeReExport'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function getSortKey(
  declaration: ReExportDeclaration,
): string {
  if (declaration.type === 'ExportAllDeclaration')
    return declaration.source.value

  const specifier = declaration.specifiers[0]
  if (!specifier)
    return ''

  return specifier.local.type === 'Identifier'
    ? specifier.local.name
    : specifier.local.value
}
