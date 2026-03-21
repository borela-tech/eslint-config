import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {singleLineArrowFunctionParameters} from '../singleLineArrowFunctionParameters'
import type {Rule} from 'eslint'

const rule = singleLineArrowFunctionParameters as unknown as Rule.RuleModule
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
  {code: 'const fn = (x) => x'},
  {code: 'const fn = (x, y) => x + y'},
  {code: 'const fn = () => {}'},
]

const invalid = [
  {
    code: dedent`
      const fn = (
        x,
      ) => x
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const fn = (x) => x',
  },
  {
    code: dedent`
      const fn = (
        x,
        y,
      ) => x + y
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const fn = (x, y) => x + y',
  },
]

ruleTester.run('single-line-arrow-function-parameters', rule, {
  invalid,
  valid,
})
