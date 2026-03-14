import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export type SourceCode = TSESLint.RuleContext<MessageIds, []>['sourceCode']
