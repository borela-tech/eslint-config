import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

type MessageIds = 'preferInline'

interface LocalDeclaration {
  name: string
  node: TSESTree.Node
}

export const preferInlineExport: TSESLint.RuleModule<MessageIds, []> = {
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

  create(context) {
    const localDeclarations = new Map<string, LocalDeclaration>()

    function getDeclarationName(
      node: TSESTree.Node,
    ): string | null {
      const nodeType = node.type

      if (
        nodeType === 'TSInterfaceDeclaration'
        || nodeType === 'TSTypeAliasDeclaration'
        || nodeType === 'ClassDeclaration'
        || nodeType === 'FunctionDeclaration'
      ) {
        const id = (node as TSESTree.FunctionDeclaration).id
          ?? (node as TSESTree.ClassDeclaration).id
          ?? (node as TSESTree.TSTypeAliasDeclaration).id
          ?? (node as TSESTree.TSInterfaceDeclaration).id
        return id?.name ?? null
      }

      if (nodeType === 'VariableDeclaration') {
        const declarations = (node as TSESTree.VariableDeclaration)
          .declarations
        if (declarations.length === 1) {
          const id = declarations[0].id
          if (id.type === 'Identifier') {
            return id.name
          }
        }
      }

      return null
    }

    function visitDeclaration(node: TSESTree.Node) {
      const name = getDeclarationName(node)
      if (name) {
        localDeclarations.set(name, {name, node})
      }
    }

    return {
      TSInterfaceDeclaration: visitDeclaration,
      TSTypeAliasDeclaration: visitDeclaration,
      ClassDeclaration: visitDeclaration,
      FunctionDeclaration: visitDeclaration,
      VariableDeclaration: visitDeclaration,

      ExportNamedDeclaration(node) {
        if (node.source) {
          return
        }

        if (!node.specifiers || node.specifiers.length === 0) {
          return
        }

        const canInline = node.specifiers.every(specifier => {
          if (specifier.type !== 'ExportSpecifier') {
            return false
          }

          if (
            specifier.local.type !== 'Identifier'
            || specifier.exported.type !== 'Identifier'
          ) {
            return false
          }

          if (specifier.local.name !== specifier.exported.name) {
            return false
          }

          return localDeclarations.has(specifier.local.name)
        })

        if (canInline && node.specifiers.length > 0) {
          context.report({
            node,
            messageId: 'preferInline',
            fix(fixer) {
              const fixes: ReturnType<typeof fixer.insertTextBefore>[] = []

              for (const specifier of node.specifiers) {
                if (specifier.type !== 'ExportSpecifier') {
                  continue
                }

                if (specifier.local.type !== 'Identifier') {
                  continue
                }

                const name = specifier.local.name
                const decl = localDeclarations.get(name)
                if (decl) {
                  fixes.push(fixer.insertTextBefore(decl.node, 'export '))
                }
              }

              fixes.push(fixer.remove(node))

              return fixes
            },
          })
        }
      },
    }
  },
}
