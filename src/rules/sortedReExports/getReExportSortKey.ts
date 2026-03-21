import {categorizeReExport} from './categorizeReExport'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function getReExportSortKey(declaration: ReExportDeclaration): string {
  const group = categorizeReExport(declaration)

  if (declaration.type === 'ExportAllDeclaration') {
    if (group === 're-export-namespace') {
      if (declaration.exported?.type === 'Identifier')
        return `*${declaration.exported.name}`
    }
    return declaration.source.value
  }

  const specifier = declaration.specifiers[0]
  if (!specifier)
    return ''

  return specifier.local.type === 'Identifier'
    ? specifier.local.name
    : specifier.local.value
}
