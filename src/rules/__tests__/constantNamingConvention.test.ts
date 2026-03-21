import typescript from 'typescript-eslint'
import {RuleTester} from 'eslint'
import {constantNamingConvention} from '../constantNamingConvention'
import type {Rule} from 'eslint'

const rule = constantNamingConvention as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const valid = [
  {code: 'let foo = 1'},
  {code: 'let bar = "hello"'},
  {code: 'const MAX = 100'},
  {code: 'const API_URL = "https://api.example.com"'},
  {code: 'const config = {}'},
  {code: 'const items = []'},
  {code: 'const handleClick = () => { }'},
]

const invalid = [
  {
    code: 'const max = 100',
    errors: [{messageId: 'upperCase'}],
  },
  {
    code: 'const API = {}',
    errors: [{messageId: 'camelCase'}],
  },
  {
    code: 'let Foo = 1',
    errors: [{messageId: 'camelCase'}],
  },
]

ruleTester.run('constant-naming-convention', rule, {
  invalid,
  valid,
})
