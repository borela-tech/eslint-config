import path from 'node:path'
import {findMatchingAlias} from './findMatchingAlias'
import {getRelativePath} from './getRelativePath'
import {isAliasImport} from './isAliasImport'
import {isExternalImport} from './isExternalImport'
import {isParentImport} from './isParentImport'
import {resolveAliasToPath} from './resolveAliasToPath'
import type {MessageIds} from './MessageIds'
import type {PathAlias} from './PathAlias'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function handleImportDeclaration(
  node: TSESTree.ImportDeclaration,
  context: TSESLint.RuleContext<MessageIds, []>,
  filePath: string,
  aliases: PathAlias[],
): void {
  const importPath = node.source.value

  if (isExternalImport(importPath, aliases))
    return

  const targetPath = path.resolve(path.dirname(filePath), importPath)

  if (isParentImport(importPath)) {
    const aliasPath = findMatchingAlias(targetPath, aliases)
    if (!aliasPath)
      return

    context.report({
      node: node.source,
      messageId: 'preferAliasForParent',
      data: {
        expected: aliasPath,
        actual: importPath,
      },
      fix(fixer) {
        return fixer.replaceText(node.source, `'${aliasPath}'`)
      },
    })
  }

  if (isAliasImport(importPath, aliases)) {
    const resolvedPath = resolveAliasToPath(importPath, aliases)
    if (!resolvedPath)
      return

    const relativePath = getRelativePath(filePath, resolvedPath)
    if (!relativePath)
      return

    context.report({
      node: node.source,
      messageId: 'preferRelativeForSibling',
      data: {
        expected: relativePath,
        actual: importPath,
      },
      fix(fixer) {
        return fixer.replaceText(node.source, `'${relativePath}'`)
      },
    })
  }
}
