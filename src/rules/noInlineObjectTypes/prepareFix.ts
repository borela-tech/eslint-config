import type {FixResult} from './FixResult'
import type {InlineTypeInfo} from './InlineTypeInfo'
import type {TSESLint} from '@typescript-eslint/utils'

export function prepareFix(
  sourceCode: TSESLint.SourceCode,
  inlineTypes: InlineTypeInfo[],
): FixResult {
  const interfaceDeclarations = inlineTypes.map(({name, typeLiteral}) => {
    const typeText = sourceCode.getText(typeLiteral)
    return `interface ${name} ${typeText}`
  })

  const interfaceBlock = interfaceDeclarations.join('\n')

  const replacements = inlineTypes.map(
    ({name, typeLiteral}) => ({name, typeLiteral}),
  )

  return {
    firstUsageLocation: inlineTypes[0].typeLiteral,
    interfaceBlock,
    replacements,
  }
}
