import {formatNamedReExport} from './formatNamedReExport'
import {isNamedReExport} from '../isNamedReExport'
import {reExportGroupOrder} from '../ReExportGroupOrder'
import type {CategorizedReExport} from '../CategorizedReExport'
import type {ReExportGroup} from '../ReExportGroup'

export function buildSortedCode(
  grouped: Record<ReExportGroup, CategorizedReExport[]>,
  sourceCode: {getText: (node?: unknown) => string},
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
