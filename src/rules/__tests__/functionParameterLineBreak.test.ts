import {dedent} from './dedent'
import {functionParameterLineBreak} from '../functionParameterLineBreak'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'function foo(bar) {}',
  name: 'single param',
}, {
  code: 'function foo(bar, baz) {}',
  name: 'two params',
}, {
  code: 'function foo(bar, baz, qux) {}',
  name: 'three params',
}, {
  code: 'function foo(\n  bar,\n  baz\n) {}',
  name: 'already multiline',
}, {
  code: 'const foo = (bar) => {}',
  name: 'arrow single param',
}, {
  code: 'const foo = (bar, baz) => {}',
  name: 'arrow two params',
}, {
  code: 'const foo = function(bar, baz) {}',
  name: 'function expression two params',
}, {
  code: 'function foo(bar) {}',
  name: 'single param fits maxLength',
  options: [{maxLength: 21}],
}, {
  code: 'function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(bar, baz) {}',
  name: 'long name fits maxLength',
  options: [{maxLength: 85}],
}, {
  code: dedent`
      type Fn = (
        foo: string,
        bar: number,
      ) => void
    `,
  name: 'type Fn multiline',
}, {
  code: dedent`
      interface Foo {
        bar(
          a: string,
        ): void;
      }
    `,
  name: 'interface method multiline',
}] as const

const invalid = [{
  code: 'function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(bar, baz) {}',
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'long name two params same line',
  options: [{maxLength: 70}],
  output: dedent`
      function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNow(
        bar,
        baz
      ) {}
    `,
}, {
  code: 'function fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar) {}',
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'single param exceeds maxLength',
  options: [{maxLength: 50}],
}, {
  code: 'type Fn = (fooParameterName: string, barParameterName: number) => void',
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'type Fn two long params same line',
  options: [{maxLength: 60}],
  output: dedent`
      type Fn = (
        fooParameterName: string,
        barParameterName: number
      ) => void
    `,
}, {
  code: dedent`
      interface Foo {
        bar(aVeryVeryVeryLongParameterName: string, bVeryVeryLongParameterName: number): void;
      }
    `,
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'interface method two long params same line',
  options: [{maxLength: 80}],
  output: 'interface Foo {\n  bar(\n  aVeryVeryVeryLongParameterName: string,\n  bVeryVeryLongParameterName: number\n): void;\n}',
}, {
  code: dedent`
      function foo(
        barVeryVeryVeryVeryVeryVeryVeryVeryVeryLong, bazVeryVeryVeryVeryVeryVeryVeryVeryVeryLong
      ) {}
    `,
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'function multiline but params same line',
  options: [{maxLength: 70}],
  output: dedent`
      function foo(
        barVeryVeryVeryVeryVeryVeryVeryVeryVeryLong,
        bazVeryVeryVeryVeryVeryVeryVeryVeryVeryLong
      ) {}
    `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'function-parameter-line-break',
  functionParameterLineBreak,
  {invalid, valid},
)
