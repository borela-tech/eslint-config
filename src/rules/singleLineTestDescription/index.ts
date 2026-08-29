import {defaultOptions} from './defaultOptions'
import {getLineLength} from '../shared/getLineLength'
import {getParens} from '../shared/getParens'
import {isJestTestCall} from '../shared/isJestTestCall'
import {isValidParens} from '../shared/isValidParens'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

function getCalleeName(node: TSESTree.CallExpression): string {
  const callee = node.callee as TSESTree.Expression

  if (callee.type === 'Identifier')
    return callee.name

  if (callee.type === 'MemberExpression') {
    const object = (callee as TSESTree.MemberExpression).object as TSESTree.Identifier
    const property = (callee as TSESTree.MemberExpression).property as TSESTree.Identifier
    if (object?.name && property?.name)
      return `${object.name}.${property.name}`
    return 'test'
  }

  if (callee.type === 'CallExpression') {
    const inner = (callee as TSESTree.CallExpression).callee as TSESTree.MemberExpression
    if (inner?.type === 'MemberExpression') {
      const object = (inner as TSESTree.MemberExpression).object as TSESTree.Identifier
      if (object?.name)
        return `${object.name}.each`
    }
    return 'test'
  }

  return 'test'
}

function isStringLike(node: TSESTree.Node): boolean {
  if (node.type === 'Literal' && typeof (node as TSESTree.Literal).value === 'string')
    return true

  if (node.type === 'TemplateLiteral' && (node as TSESTree.TemplateLiteral).quasis.length === 1)
    return true

  return false
}

function checkCall(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.CallExpression,
): void {
  if (!isJestTestCall(node))
    return

  const args = node.arguments as TSESTree.Node[]
  if (args.length === 0)
    return

  const firstArg = args[0]
  if (!isStringLike(firstArg))
    return

  const parens = getParens(sourceCode, args)
  if (!isValidParens(parens))
    return

  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength
  const callee = getCalleeName(node)

  const firstLine = parens.openingParen.loc.start.line

  // Jest calls should have all arguments on the same line as the opening paren.
  // This distinguishes `it('desc', () => {` with multiline body (valid) from
  // `it(\n  'desc',\n  () => {})` (invalid).
  const isMultilineArgs = args.some(arg => arg.loc.start.line !== firstLine)
  if (isMultilineArgs) {
    context.report({
      data: {
        callee,
        maxLength: String(maxLength),
      },
      loc: {
        end: parens.closingParen.loc.end,
        start: parens.openingParen.loc.start,
      },
      messageId: 'multiline',
      node,
    })
    return
  }

  const lineLength = getLineLength(sourceCode, firstLine)
  if (lineLength > maxLength) {
    context.report({
      data: {
        callee,
        length: String(lineLength),
        maxLength: String(maxLength),
      },
      loc: {
        end: {
          column: lineLength,
          line: firstLine,
        },
        start: {
          column: 0,
          line: firstLine,
        },
      },
      messageId: 'exceedsMaxLength',
      node,
    })
  }
}

export const singleLineTestDescription: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      CallExpression(node): void {
        checkCall(sourceCode, context, node)
      },

      OptionalCallExpression(node): void {
        checkCall(sourceCode, context, node as TSESTree.CallExpression)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce Jest test descriptions to fit on a single line - hint to shorten description instead of breaking call across lines.',
    },
    messages: messageIds,
    schema: [{
      additionalProperties: false,
      properties: {
        maxLength: {
          type: 'number',
        },
      },
      type: 'object',
    }],
    type: 'layout',
  },
}
