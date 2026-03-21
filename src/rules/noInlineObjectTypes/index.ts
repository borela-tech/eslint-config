import {containsInlineObjectType} from './containsInlineObjectType'
import {getInlineTypeName} from './getInlineTypeName'
import {handleInlineType} from './handleInlineType'
import {isNestedTypeAnnotation} from './isNestedTypeAnnotation'
import {prepareFix} from './prepareFix'
import type {InlineTypeEntry} from './InlineTypeEntry'
import type {InlineTypeInfo} from './InlineTypeInfo'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const noInlineObjectTypes: TSESLint.RuleModule<
  MessageIds,
  []
> = {
  create(context) {
    const sourceCode = context.sourceCode
    const inlineTypes: InlineTypeEntry[] = []

    const listener = {
      TSTypeAnnotation(node: TSESTree.TSTypeAnnotation): void {
        if (isNestedTypeAnnotation(node))
          return

        const typeLiteral = containsInlineObjectType(node)
        if (!typeLiteral)
          return

        handleInlineType(node, typeLiteral, inlineTypes)
      },
    }

    return {
      ...listener,
      'Program:exit'(): void {
        if (inlineTypes.length === 0)
          return

        const usedNames = new Set<string>()

        const locations = [...new Set(inlineTypes.map(t => t.insertLocation))]
        for (const loc of locations) {
          const typesAtLocation = inlineTypes.filter(
            t => t.insertLocation === loc,
          )

          const typesForLocation: InlineTypeInfo[] = typesAtLocation.map(entry => {
            const name = getInlineTypeName(usedNames, [], entry.parameterName)
            return {
              name,
              parameterName: entry.parameterName,
              typeLiteral: entry.typeLiteral,
            }
          })

          const fixResult = prepareFix(
            sourceCode,
            typesForLocation,
          )

          context.report({
            fix(fixer) {
              const fixes: TSESLint.RuleFix[] = []

              for (const replacement of fixResult.replacements) {
                fixes.push(
                  fixer.replaceText(
                    replacement.typeLiteral,
                    replacement.name,
                  ),
                )
              }

              const isExported = typesAtLocation[0].isExported
              if (isExported && typesAtLocation[0].insertLocation.type === 'ExportNamedDeclaration') {
                fixes.push(
                  fixer.insertTextAfter(
                    typesAtLocation[0].insertLocation,
                    `\n${fixResult.interfaceBlock}`,
                  ),
                )
              } else {
                fixes.push(
                  fixer.insertTextBefore(
                    loc,
                    `${fixResult.interfaceBlock}\n`,
                  ),
                )
              }

              return fixes
            },
            messageId: 'inlineObjectType',
            node: typesAtLocation[0].annotationNode,
          })
        }
      },
    }
  },

  meta: {
    docs: {
      description: 'Disallow inline object type literals in type annotations.',
    },
    fixable: 'code',
    messages: {
      inlineObjectType:
        'Inline object types are not allowed. Use a named interface or type instead.',
    },
    schema: [],
    type: 'suggestion',
  },
}
