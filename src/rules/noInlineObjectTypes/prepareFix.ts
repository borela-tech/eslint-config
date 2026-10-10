import type {FixResult} from './FixResult'
import type {InlineTypeInfo} from './InlineTypeInfo'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function prepareFix(
  sourceCode: TSESLint.SourceCode,
  inlineTypes: InlineTypeInfo[],
): FixResult {
  const interfaceDeclarations = inlineTypes.map(
    info => buildInterfaceDeclaration(sourceCode, info),
  )

  const interfaceBlock = interfaceDeclarations.join('\n')

  const replacements = inlineTypes.map(
    ({name, typeLiteral, typeParameters}) => ({
      name: formatTypeName(name, typeParameters),
      typeLiteral,
    }),
  )

  return {
    firstUsageLocation: inlineTypes[0].typeLiteral,
    interfaceBlock,
    replacements,
  }
}

function buildInterfaceDeclaration(
  sourceCode: TSESLint.SourceCode,
  info: InlineTypeInfo,
): string {
  const typeText = sourceCode.getText(info.typeLiteral)
  const parameterTexts = info.typeParameters.map(
    param => sourceCode.getText(param),
  )
  const parameterList = parameterTexts.join(', ')
  if (parameterList === '')
    return `interface ${info.name} ${typeText}`
  return `interface ${info.name}<${parameterList}> ${typeText}`
}

function formatTypeName(
  name: string,
  typeParameters: TSESTree.TSTypeParameter[],
): string {
  const argumentList = typeParameters.map(param => param.name.name).join(', ')
  if (argumentList === '')
    return name
  return `${name}<${argumentList}>`
}
