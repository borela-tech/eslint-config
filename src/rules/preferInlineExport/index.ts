import {canInlineSpecifiers} from './canInlineSpecifiers'
import {getDeclarationName} from './getDeclarationName'
import {isExportableDeclaration} from './isExportableDeclaration'
import type {LocalDeclaration} from './LocalDeclaration'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export const preferInlineExport: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    const FooBar = new Map<string, LocalDeclaration>()

    function visitDeclaration(node: TSESTree.Node): void {
      if (!isExportableDeclaration(node))
        return

      const name = getDeclarationName(node)
      if (name)
        FooBar.set(name, {name, node})
    }

    return {
      ClassDeclaration: visitDeclaration,
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        if (node.source)
          return

        if (!node.specifiers || node.specifiers.length === 0)
          return

        if (!canInlineSpecifiers(node.specifiers, FooBar))
          return

        context.report({
          fix(fixer) {
            const fixes: ReturnType<typeof fixer.insertTextBefore>[] = []

            for (const specifier of node.specifiers) {
              const name = (specifier.local as TSESTree.Identifier).name
              const decl = FooBar.get(name)
              if (decl)
                fixes.push(fixer.insertTextBefore(decl.node, 'export '))
            }

            fixes.push(fixer.remove(node))

            return fixes
          },
          messageId: 'preferInline',
          node,
        })
      },
      FunctionDeclaration: visitDeclaration,
      TSInterfaceDeclaration: visitDeclaration,
      TSTypeAliasDeclaration: visitDeclaration,
      VariableDeclaration: visitDeclaration,
    }
  },

  meta: {
    docs: {
      description:
        'Enforce using inline export syntax instead of separate export statements',
    },
    fixable: 'code',
    messages: {
      preferInline:
        'Use inline export instead of separate export statement',
    },
    schema: [],
    type: 'suggestion',
  },
}
