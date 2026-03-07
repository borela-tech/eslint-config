import {formatNamedReExport} from './formatNamedReExport'
import {isNamedReExport} from '../isNamedReExport'
import {reExportGroupOrder} from '../ReExportGroupOrder'
import type {CategorizedReExport} from '../CategorizedReExport'
import type {ReExportGroup} from '../ReExportGroup'
import type {TSESLint} from '@typescript-eslint/utils'

export function buildSortedCode(
  grouped: Record<ReExportGroup, CategorizedReExport[]>,
  sourceCode: TSESLint.SourceCode,
): string[] {
  const sortedCode: string[] = []

  for (const group of reExportGroupOrder) {
    for (const item of grouped[group]) {
      if (isNamedReExport(item)) {
        sortedCode.push(
          formatNamedReExport(
            item.declaration,
            sourceCode,
          ),
        )
      } else
        sortedCode.push(sourceCode.getText(item.declaration))
    }
  }

  return sortedCode
}
