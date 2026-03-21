import {isExempt} from './isExempt'
import {isTopLevel} from './isTopLevel'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const maxDeclarationsPerFile: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const filename = context.filename

    if (isExempt(filename))
      return {}

    const functions = new Set<string>()
    const types = new Set<string>()

    return {
      ClassDeclaration(node) {
        if (isTopLevel(node) && node.id?.name)
          functions.add(node.id.name)
      },

      FunctionDeclaration(node) {
        if (isTopLevel(node) && node.id?.name)
          functions.add(node.id.name)
      },

      'Program:exit'(_programNode) {
        const totalDeclarations = functions.size + types.size

        if (totalDeclarations > 1) {
          context.report({
            data: {
              count: totalDeclarations,
              functions: functions.size,
              types: types.size,
            },
            messageId: 'tooManyDeclarations',
            node: _programNode,
          })
        }
      },

      TSDeclareFunction(node) {
        if (isTopLevel(node) && node.id?.name)
          functions.add(node.id.name)
      },

      TSEnumDeclaration(node) {
        if (isTopLevel(node) && node.id?.name)
          types.add(node.id.name)
      },

      TSInterfaceDeclaration(node) {
        if (isTopLevel(node) && node.id?.name)
          types.add(node.id.name)
      },

      TSTypeAliasDeclaration(node) {
        if (isTopLevel(node) && node.id?.name)
          types.add(node.id.name)
      },

      VariableDeclaration(node) {
        if (!isTopLevel(node))
          return
        const parent = node.parent
        const isReExport = parent?.type === 'ExportNamedDeclaration'
          && parent.source !== null
        if (isReExport)
          return
        const isExported = parent?.type === 'ExportNamedDeclaration'
        if (!isExported && !node.declare)
          return
        for (const declarator of node.declarations) {
          if (declarator.id.type === 'Identifier' && declarator.id.name)
            types.add(declarator.id.name)
        }
      },

      'VariableDeclaration > VariableDeclarator > ArrowFunctionExpression'(
        _node: TSESTree.Node,
      ) {
        if (!isTopLevel(_node.parent?.parent as TSESTree.Node))
          return
        const declarator = _node.parent as TSESTree.VariableDeclarator
        if (declarator.id.type === 'Identifier' && declarator.id.name)
          functions.add(declarator.id.name)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce single top-level declaration per file',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
