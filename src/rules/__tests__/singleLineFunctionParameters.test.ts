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
  {code: 'function foo(bar) {}',
    name: 'single param'},
  {code: 'function foo(bar, baz) {}',
    name: 'two params'},
  {code: 'function foo(bar, baz, qux) {}',
    name: 'three params'},
  {code: 'const foo = (bar) => {}',
    name: 'arrow function single param'},
  {code: 'const foo = (bar, baz) => {}',
    name: 'arrow function two params'},
  {code: 'const foo = function(bar, baz) {}',
    name: 'function expression two params'},
  {code: dedent`
      function foo(
        barParameterWithLongNameHereNowAndForeverAAA,
        bazParameterWithLongNameHereNowAndForeverBBB,
      ) {}
    `,
  name: 'long params forced multiline'},
  {code: dedent`
      function foo(
        barParameterWithLongNameHereNowAndForeverAAA: VeryLongTypeNameHereAAA,
        bazParameterWithLongNameHereNowAndForeverBBB: VeryLongTypeNameHereBBB,
      ) {}
    `,
  name: 'long typed params forced multiline'},
  {code: dedent`
      function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHere(
        barParameterWithLongNameHereAAAAndEvenMoreTextHere: VeryLongTypeNameHereAAAAndEvenMore,
      ) {}
    `,
  name: 'long function name with long typed param'},
  {code: 'function foo() {}',
    name: 'no params'},
]

const invalid = [
  {
    code: dedent`
      function foo(
        bar,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    name: 'function single param multiline',
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
    name: 'function two params multiline',
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
    name: 'function three params multiline',
    output: 'function foo(bar, baz, qux) {}',
  },
  {
    code: dedent`
      const foo = function(
        bar,
      ) {}
    `,
    errors: [{messageId: 'singleLine'}],
    name: 'function expression single param multiline',
    output: 'const foo = function(bar) {}',
  },
  {
    code: dedent`
      type Fn = (
        foo: string,
      ) => void
    `,
    errors: [{messageId: 'singleLine'}],
    name: 'type Fn single typed param multiline',
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
    name: 'type Fn two typed params multiline',
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
    name: 'call signature single typed param multiline',
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
    name: 'interface method single typed param multiline',
    output: dedent`
      interface Foo {
        bar(a: string): void;
      }
    `,
  },
]

ruleTester.run('single-line-function-parameters', rule, {invalid,
  valid})
