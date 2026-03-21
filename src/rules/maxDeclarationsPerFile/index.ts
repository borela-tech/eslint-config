import {collectVariableDeclarators} from './collectVariableDeclarators'
import {handleClassDeclaration} from './handleClassDeclaration'
import {handleFunctionDeclaration} from './handleFunctionDeclaration'
import {handleTSDeclareFunction} from './handleTSDeclareFunction'
import {handleTSEnumDeclaration} from './handleTSEnumDeclaration'
import {handleTSInterfaceDeclaration} from './handleTSInterfaceDeclaration'
import {handleTSTypeAliasDeclaration} from './handleTSTypeAliasDeclaration'
import {isExempt} from './isExempt'
import {isExportedDeclaration} from './isExportedDeclaration'
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
        handleClassDeclaration(node, functions)
      },

      FunctionDeclaration(node) {
        handleFunctionDeclaration(node, functions)
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
        handleTSDeclareFunction(node, functions)
      },

      TSEnumDeclaration(node) {
        handleTSEnumDeclaration(node, types)
      },

      TSInterfaceDeclaration(node) {
        handleTSInterfaceDeclaration(node, types)
      },

      TSTypeAliasDeclaration(node) {
        handleTSTypeAliasDeclaration(node, types)
      },

      VariableDeclaration(node) {
        if (!isTopLevel(node))
          return

        const parent = node.parent

        if (!isExportedDeclaration(parent) && !node.declare)
          return

        collectVariableDeclarators(node, types)
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
