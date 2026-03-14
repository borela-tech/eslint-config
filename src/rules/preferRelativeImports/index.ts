import {getFilePath} from './getFilePath'
import {getProgram} from './getProgram'
import {handleExportNamedDeclaration} from './handleExportNamedDeclaration'
import {handleImportDeclaration} from './handleImportDeclaration'
import {parsePathAliases} from './parsePathAliases'
import {resolveBaseUrl} from './resolveBaseUrl'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const preferRelativeImports: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    docs: {
      description:
        'Enforce relative imports for same/child directories and path aliases for parent directories',
    },
    fixable: 'code',
    messages: {
      preferAliasForParent:
        'Use path alias instead of relative parent import. Expected `{{expected}}` instead of `{{actual}}`.',
      preferRelativeForSibling:
        'Use relative import for same-directory modules. Expected `{{expected}}` instead of `{{actual}}`.',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    const program = getProgram(context)
    if (!program) return {}

    const compilerOptions = program.getCompilerOptions()
    const baseUrl = resolveBaseUrl(compilerOptions)
    if (!baseUrl) return {}

    const aliases = parsePathAliases(compilerOptions)

    return {
      ImportDeclaration(node) {
        const filePath = getFilePath(context)
        handleImportDeclaration(node, context, filePath, aliases)
      },
      ExportNamedDeclaration(node) {
        const filePath = getFilePath(context)
        handleExportNamedDeclaration(node, context, filePath, aliases)
      },
    }
  },
}
