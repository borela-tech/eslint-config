import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {singleLineFunctionParameters} from '../singleLineFunctionParameters'
import type {Rule} from 'eslint'

const rule = singleLineFunctionParameters as unknown as Rule.RuleModule
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
  {code: 'function foo(bar) {}'},
  {code: 'function foo(bar, baz) {}'},
  {code: 'function foo(bar, baz, qux) {}'},
  {code: 'const foo = (bar) => {}'},
  {code: 'const foo = (bar, baz) => {}'},
  {code: 'const foo = function(bar, baz) {}'},
  {
    code: dedent`
      function foo(
        barParameterWithLongNameHereNowAndForeverAAA,
        bazParameterWithLongNameHereNowAndForeverBBB,
      ) {}
    `,
  },
  {
    code: dedent`
      function foo(
        barParameterWithLongNameHereNowAndForeverAAA: VeryLongTypeNameHereAAA,
        bazParameterWithLongNameHereNowAndForeverBBB: VeryLongTypeNameHereBBB,
      ) {}
    `,
  },
  {
    code: dedent`
      function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHere(
        barParameterWithLongNameHereAAAAndEvenMoreTextHere: VeryLongTypeNameHereAAAAndEvenMore,
      ) {}
    `,
  },
  {code: 'function foo() {}'},
]

const invalid = [
  {
    code: dedent`
      function foo(
        bar,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'function foo(bar) {}',
  },
  {
    code: dedent`
      function foo(
        bar,
        baz,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'function foo(bar, baz) {}',
  },
  {
    code: dedent`
      function foo(
        bar,
        baz,
        qux,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'function foo(bar, baz, qux) {}',
  },
  {
    code: dedent`
      const foo = function(
        bar,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'const foo = function(bar) {}',
  },
  {
    code: dedent`
      type Fn = (
        foo: string,
      ) => void
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'type Fn = (foo: string) => void',
  },
  {
    code: dedent`
      type Fn = (
        foo: string,
        bar: number,
      ) => void
    `,
    errors: [{messageId: 'singleLine'}],
    output: 'type Fn = (foo: string, bar: number) => void',
  },
  {
    code: dedent`
      type Fn = {
        (
          foo: string,
        ): void;
      }
    `,
    errors: [{messageId: 'singleLine'}],
    output: dedent`
      type Fn = {
        (foo: string): void;
      }
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
    errors: [{messageId: 'singleLine'}],
    output: dedent`
      interface Foo {
        bar(a: string): void;
      }
    `,
  },
]

ruleTester.run('single-line-function-parameters', rule, {
  invalid,
  valid,
})
