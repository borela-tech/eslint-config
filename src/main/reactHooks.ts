import rule from 'eslint-plugin-react-hooks'
import type {TSESLint} from '@typescript-eslint/utils'

export const reactHooks: TSESLint.FlatConfig.Config = {
  plugins: {
    'react-hooks': rule,
  },
  rules: rule.configs.recommended.rules,
}
