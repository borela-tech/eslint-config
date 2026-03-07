import {formatAttributes} from '../singleLineImports/formatAttributes'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'

export function createFix(
  fixer: TSESLint.RuleFixer,
  declaration: ReExportDeclaration,
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const source = declaration.source!.value

  if (declaration.type === 'ExportAllDeclaration') {
    const exported = declaration.exported
      ? `* as ${sourceCode.getText(declaration.exported)}`
      : '*'
    const attributes = formatAttributes(declaration.attributes)
    const result = `export ${exported} from '${source}'${attributes}`
    return fixer.replaceText(declaration, result)
  }

  const prefix = declaration.exportKind === 'type' ? 'export type ' : 'export '
  const specifiers = declaration.specifiers.map(
    s => sourceCode.getText(s),
  ).join(', ')
  const attributes = formatAttributes(declaration.attributes)
  const result = `${prefix}{${specifiers}} from '${source}'${attributes}`

  return fixer.replaceText(declaration, result)
}
