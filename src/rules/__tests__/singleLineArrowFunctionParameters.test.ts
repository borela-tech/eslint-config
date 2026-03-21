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
  {code: 'const fn = param => param'},
  {code: 'const fn = node => node.value'},
  {code: dedent`
    const fn = (
      param => param
    )
  `},
  {code: 'const fn = (): void => {}'},
  {code: 'const fn = (): string => "str"'},
  {code: 'fn(() => {})'},
  {code: 'const fn = (): void => (param => param)'},
  {
    code: dedent`
      fn((a, b) => a + b)
    `,
  },
  {
    code: dedent`
      context.report({
        fix: fixer => fixer.replaceText(node, "")
      })
    `,
  },
  {
    code: dedent`
      const fn = (
        veryLongParameterNameThatExceedsLimit,
        anotherVeryLongParameterNameThatExceeds,
      ) => veryLongParameterNameThatExceedsLimit + anotherVeryLongParameterNameThatExceeds
    `,
  },
  {
    code: dedent`
      const fn = (
        param1,
        param2,
        param3,
        param4,
        param5,
        param6,
        param7,
        param8,
      ) => param1 + param2 + param3 + param4 + param5 + param6 + param7 + param8
    `,
    options: [{maxLength: 70}],
  },
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
  {
    code: dedent`
      const fn = (
        param) => param
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const fn = (param) => param',
  },
  {
    code: dedent`
      const fn = (
        param
      ) => param
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const fn = (param) => param',
  },
  {
    code: dedent`
      const fn = (
        a,
        b,
      ) => a + b
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const fn = (a, b) => a + b',
  },
]

ruleTester.run('single-line-arrow-function-parameters', rule, {
  invalid,
  valid,
})
