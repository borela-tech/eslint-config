import typescript from 'typescript-eslint'
import {dedent} from './dedent'
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
  {code: 'foo(bar)',
    name: 'single arg'},
  {code: 'foo(bar, baz)',
    name: 'two args'},
  {code: 'foo(bar, baz, qux)',
    name: 'three args'},
  {code: 'foo(\n  bar,\n  baz\n)',
    name: 'already multiline'},
  {code: 'obj.foo(bar)',
    name: 'method call single arg'},
  {code: 'obj.foo(bar, baz)',
    name: 'method call two args'},
  {code: 'foo?.(bar)',
    name: 'optional call single arg'},
  {
    code: 'foo(bar)',
    name: 'with custom maxLength',
    options: [{maxLength: 11}],
  },
  {
    code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
    name: 'long call fits within maxLength',
    options: [{maxLength: 85}],
  },
]

const invalid = [
  {
    code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
    errors: [{messageId: 'multipleOnSameLine'}],
    name: 'long call two args same line',
    options: [{maxLength: 79}],
    output: dedent`
      fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(
        bar,
        baz
      )
    `,
  },
  {
    code: 'fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar)',
    errors: [{messageId: 'exceedsMaxLength'}],
    name: 'single arg exceeds maxLength',
    options: [{maxLength: 50}],
  },
  {
    code: dedent`
      foo(
        barVeryVeryVeryVeryVeryVeryVeryLong, bazVeryVeryVeryVeryVeryVeryVeryLong
      )
    `,
    errors: [{messageId: 'multipleOnSameLine'}],
    name: 'multiline but args same line',
    options: [{maxLength: 60}],
    output: dedent`
      foo(
        barVeryVeryVeryVeryVeryVeryVeryLong,
        bazVeryVeryVeryVeryVeryVeryVeryLong
      )
    `,
  },
]

ruleTester.run('function-call-argument-line-break', rule, {invalid,
  valid})
