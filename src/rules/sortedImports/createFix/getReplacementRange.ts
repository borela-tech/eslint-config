import type {ImportDeclaration} from 'estree'
import type {Program} from 'estree'
import type {ReplacementRange} from './ReplacementRange'
import {findLastImportIndex} from './findLastImportIndex'

export function getReplacementRange(
  programBody: Program['body'],
  sourceCode: {getText: () => string},
): ReplacementRange {
  const fullText = sourceCode.getText()
  const lastIndex = findLastImportIndex(programBody)
  const firstImport = programBody[0] as ImportDeclaration
  const lastImport = programBody[lastIndex] as ImportDeclaration
  const start = firstImport.range![0]
  let end = lastImport.range![1]

  for (let i = end; i < fullText.length; i++) {
    const char = fullText[i]
    if (char === '\n' || char === ' ' || char === '\t')
      end++
    else
      break
  }

  return {start, end}
}
