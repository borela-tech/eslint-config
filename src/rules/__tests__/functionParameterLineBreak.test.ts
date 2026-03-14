import typescript from 'typescript-eslint'
import {functionParameterLineBreak} from '../functionParameterLineBreak'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = functionParameterLineBreak as unknown as Rule.RuleModule
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
    code: 'function foo(bar) {}',
  },
  {
    code: 'function foo(bar, baz) {}',
  },
  {
    code: 'function foo(bar, baz, qux) {}',
  },
  {
    code: 'function foo(\n  bar,\n  baz\n) {}',
  },
  {
    code: 'const foo = (bar) => {}',
  },
  {
    code: 'const foo = (bar, baz) => {}',
  },
  {
    code: 'const foo = function(bar, baz) {}',
  },
  {
    code: 'function foo(bar) {}',
    options: [{maxLength: 21}],
  },
  {
    code: 'function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(bar, baz) {}',
    options: [{maxLength: 85}],
  },
]

const invalid = [
  {
    code: 'function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(bar, baz) {}',
    options: [{maxLength: 70}],
    errors: [{messageId: 'multipleOnSameLine'}],
    output: `function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(
  bar,
  baz
) {}`,
  },
  {
    code: 'function fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar) {}',
    options: [{maxLength: 50}],
    errors: [{messageId: 'exceedsMaxLength'}],
  },
]

ruleTester.run('function-parameter-line-break', rule, {
  valid,
  invalid,
})
