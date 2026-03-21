import type {ArrowFunctionParens} from './ArrowFunctionParens'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function calculateCollapsedLength(
  sourceCode: TSESLint.SourceCode,
  openingParen: ArrowFunctionParens['openingParen'],
  collapsedParams: string,
  returnType: TSESTree.TSTypeAnnotation | undefined,
): number {
  let returnTypeText = ''
  if (returnType)
    returnTypeText = sourceCode.getText(returnType)

  const allLines = sourceCode.getText().split('\n')
  const closingLine = allLines[openingParen.loc.start.line - 1]
  const textAfterClosingParen = closingLine.slice(openingParen.loc.start.column)

  return openingParen.loc.start.column + collapsedParams.length + returnTypeText.length + textAfterClosingParen.length
}
