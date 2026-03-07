import {formatAttributes} from './formatAttributes'
import {formatSpecifiers} from './formatSpecifiers'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createFix(
  fixer: TSESLint.RuleFixer,
  declaration: TSESTree.ImportDeclaration,
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const source = declaration.source.value
  const prefix = declaration.importKind === 'type' ? 'import type ' : 'import '
  const specifiers = formatSpecifiers(declaration, sourceCode)
  const attributes = formatAttributes(declaration.attributes)

  if (specifiers === '') {
    const result = `${prefix}'${source}'${attributes}`
    return fixer.replaceText(declaration, result)
  }

  const result = `${prefix}${specifiers} from '${source}'${attributes}`
  return fixer.replaceText(declaration, result)
}
