import type {TSESLint} from '@typescript-eslint/utils'

export const ignores: TSESLint.FlatConfig.Config = {
  ignores: [
    'src/graphql/sdk.ts',
    '**/node_modules/**',
    '**/dist/**',
  ],
}
