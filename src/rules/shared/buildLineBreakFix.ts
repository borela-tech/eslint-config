import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

interface ParenToken {
  loc: TSESTree.SourceLocation
  range: [number, number]
  value: string
}

export function buildLineBreakFix(
  sourceCode: TSESLint.SourceCode,
  fixer: TSESLint.RuleFixer,
  nodesOnLine: TSESTree.Node[],
  openingParen: ParenToken,
  line: number,
): null | TSESLint.RuleFix[] {
  if (nodesOnLine.length < 2)
    return null

  const parenLine = sourceCode.getLines()[openingParen.loc.start.line - 1]
  const indent = `${parenLine.match(/^[\t ]*/)?.[0] ?? ''}  `
  const fixes: TSESLint.RuleFix[] = []

  if (openingParen.loc.start.line === line) {
    fixes.push(fixer.replaceTextRange(
      [openingParen.range[1], nodesOnLine[0].range[0]],
      `\n${indent}`,
    ))
  }

  for (const [index, node] of nodesOnLine.slice(0, -1).entries()) {
    const comma = sourceCode.getTokenAfter(
      node,
      token => token.value === ',',
    )
    const nextNode = nodesOnLine[index + 1]

    if (comma) {
      fixes.push(fixer.replaceTextRange(
        [comma.range[1], nextNode.range[0]],
        `\n${indent}`,
      ))
    }
  }

  return fixes
}
