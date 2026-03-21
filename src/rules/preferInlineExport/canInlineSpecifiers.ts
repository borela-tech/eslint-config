import {isValidExportSpecifier} from './isValidExportSpecifier'
import type {LocalDeclaration} from './LocalDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export function canInlineSpecifiers(
  specifiers: TSESTree.ExportSpecifier[],
  localDeclarations: Map<string, LocalDeclaration>,
): boolean {
  return specifiers.every(spec =>
    isValidExportSpecifier(spec, localDeclarations),
  )
}
