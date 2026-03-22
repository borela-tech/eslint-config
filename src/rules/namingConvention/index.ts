import {checkClass} from './checkClass'
import {checkNamedEntity} from './checkNamedEntity'
import {checkVariableDeclarator} from './checkVariableDeclarator'
import {getFunctionName} from './getFunctionName'
import {getReturnTypeText} from './getReturnTypeText'
import {isExempt} from './isExempt'
import {isReactComponent} from './isReactComponent'
import {messageIds} from './messageIds'
import {reportComponentViolation} from './reportComponentViolation'
import {reportFunctionViolation} from './reportFunctionViolation'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export const namingConvention: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()
    return {
      ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression): void {
        checkFunction(node, node.parent)
      },

      ClassDeclaration(node: TSESTree.ClassDeclaration): void {
        checkClass(node.id, context)
      },

      ClassExpression(node: TSESTree.ClassExpression): void {
        checkClass(node.id, context)
      },

      FunctionDeclaration(node: TSESTree.FunctionDeclaration): void {
        checkFunction(node)
      },

      FunctionExpression(node: TSESTree.FunctionExpression): void {
        checkFunction(node, node.parent)
      },

      TSEnumDeclaration(node: TSESTree.TSEnumDeclaration): void {
        checkNamedEntity(
          node.id.name,
          node.id,
          'Enum',
          context,
        )
      },

      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
        checkNamedEntity(
          node.id.name,
          node.id,
          'Interface',
          context,
        )
      },

      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration): void {
        if (node.id.type !== 'Identifier')
          return

        checkNamedEntity(
          node.id.name,
          node.id,
          'Type',
          context,
        )
      },

      VariableDeclarator(node: TSESTree.VariableDeclarator): void {
        if (node.id.type !== 'Identifier')
          return

        checkVariableDeclarator(node, context)
      },
    }

    function checkFunction(
      node: TSESTree.FunctionDeclaration,
      parent?: TSESTree.Node,
    ): void
    function checkFunction(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression,
      parent: TSESTree.Node | undefined,
    ): void
    function checkFunction(
      node:
        | TSESTree.ArrowFunctionExpression
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression,
      parent?: TSESTree.Node,
    ): void {
      const name = getFunctionName(node, parent)

      if (!name || isExempt(name))
        return

      const returnTypeText = getReturnTypeText(sourceCode, node)
      const isComponent = isReactComponent(returnTypeText)

      if (isComponent)
        reportComponentViolation(node, parent, name, context)
      else
        reportFunctionViolation(node, parent, name, context)
    }
  },
  meta: {
    docs: {
      description: 'Enforce consistent naming conventions.',
    },
    fixable: 'code',
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
