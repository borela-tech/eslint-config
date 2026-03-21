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
  {
    code: 'const fn = (x) => x',
    name: 'single param with parens',
  },
  {
    code: 'const fn = (x, y) => x + y',
    name: 'two params with parens',
  },
  {
    code: 'const fn = () => {}',
    name: 'no params',
  },
  {
    code: 'const fn = param => param',
    name: 'single param without parens',
  },
  {
    code: 'const fn = node => node.value',
    name: 'single param without parens identifier',
  },
  {
    code: dedent`
    const fn = (
      param => param
    )
  `,
    name: 'wrapped single param without parens',
  },
  {
    code: 'const fn = (): void => {}',
    name: 'with void return type',
  },
  {
    code: 'const fn = (): string => "str"',
    name: 'with string return type',
  },
  {
    code: 'fn(() => {})',
    name: 'nested empty arrow',
  },
  {
    code: 'const fn = (): void => (param => param)',
    name: 'nested arrow with return type',
  },
  {
    code: dedent`
      fn((a, b) => a + b)
    `,
    name: 'nested arrow two params',
  },
  {
    code: dedent`
      context.report({
        fix: fixer => fixer.replaceText(node, "")
      })
    `,
    name: 'callback with fixer param',
  },
  {
    code: dedent`
      const fn = (
        veryLongParameterNameThatExceedsLimit,
        anotherVeryLongParameterNameThatExceeds,
      ) => veryLongParameterNameThatExceedsLimit + anotherVeryLongParameterNameThatExceeds
    `,
    name: 'two long params forced multiline',
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
    name: 'eight params forced multiline',
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
    name: 'single param multiline closing paren',
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
    name: 'two params multiline closing paren',
    output: 'const fn = (x, y) => x + y',
  },
  {
    code: dedent`
      const fn = (
        param) => param
    `,
    errors: [{messageId: 'singleLine'}],
    name: 'single param multiline missing closing paren',
    output: 'const fn = (param) => param',
  },
  {
    code: dedent`
      const fn = (
        param
      ) => param
    `,
    errors: [{messageId: 'singleLine'}],
    name: 'single param multiline separate lines',
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
    name: 'two params multiline',
    output: 'const fn = (a, b) => a + b',
  },
]

ruleTester.run('single-line-arrow-function-parameters', rule, {invalid, valid})
