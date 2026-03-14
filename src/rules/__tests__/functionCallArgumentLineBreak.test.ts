import typescript from 'typescript-eslint'
import {functionCallArgumentLineBreak} from '../functionCallArgumentLineBreak'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = functionCallArgumentLineBreak as unknown as Rule.RuleModule
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
    code: 'foo(bar)',
  },
  {
    code: 'foo(bar, baz)',
  },
  {
    code: 'foo(bar, baz, qux)',
  },
  {
    code: 'foo(\n  bar,\n  baz\n)',
  },
  {
    code: 'obj.foo(bar)',
  },
  {
    code: 'obj.foo(bar, baz)',
  },
  {
    code: 'foo?.(bar)',
  },
  {
    code: 'foo(bar)',
    options: [{maxLength: 11}],
  },
  {
    code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
    options: [{maxLength: 85}],
  },
]

const invalid = [
  {
    code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
    options: [{maxLength: 80}],
    errors: [{messageId: 'multipleOnSameLine'}],
    output: `fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(
  bar,
  baz
)`,
  },
  {
    code: 'fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar)',
    options: [{maxLength: 50}],
    errors: [{messageId: 'exceedsMaxLength'}],
  },
]

ruleTester.run('function-call-argument-line-break', rule, {
  valid,
  invalid,
})
