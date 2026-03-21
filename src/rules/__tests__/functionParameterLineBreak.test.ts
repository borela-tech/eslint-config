import typescript from 'typescript-eslint'
import {dedent} from './dedent'
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
  {
    code: dedent`
      type Fn = (
        foo: string,
        bar: number,
      ) => void
    `,
  },
  {
    code: dedent`
      interface Foo {
        bar(
          a: string,
        ): void;
      }
    `,
  },
]

const invalid = [
  {
    code: 'function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(bar, baz) {}',
    errors: [{messageId: 'multipleOnSameLine'}],
    options: [{maxLength: 70}],
    output: dedent`
      function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(
        bar,
        baz
      ) {}
    `,
  },
  {
    code: 'function fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar) {}',
    errors: [{messageId: 'exceedsMaxLength'}],
    options: [{maxLength: 50}],
  },
  {
    code: 'type Fn = (fooParameterName: string, barParameterName: number) => void',
    errors: [{messageId: 'multipleOnSameLine'}],
    options: [{maxLength: 60}],
    output: dedent`
      type Fn = (
        fooParameterName: string,
        barParameterName: number
      ) => void
    `,
  },
  {
    code: dedent`
      interface Foo {
        bar(aVeryVeryVeryLongParameterName: string, bVeryVeryLongParameterName: number): void;
      }
    `,
    errors: [{messageId: 'multipleOnSameLine'}],
    options: [{maxLength: 80}],
    output: 'interface Foo {\n  bar(\n  aVeryVeryVeryLongParameterName: string,\n  bVeryVeryLongParameterName: number\n): void;\n}',
  },
]

ruleTester.run('function-parameter-line-break', rule, {
  invalid,
  valid,
})
