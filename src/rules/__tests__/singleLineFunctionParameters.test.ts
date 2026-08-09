import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {singleLineFunctionParameters} from '../singleLineFunctionParameters'

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
  code: 'const foo = (bar) => {}',
  name: 'arrow function single param',
}, {
  code: 'const foo = (bar, baz) => {}',
  name: 'arrow function two params',
}, {
  code: 'const foo = function(bar, baz) {}',
  name: 'function expression two params',
}, {
  code: dedentAndStrip`
    function foo(
      barParameterWithLongNameHereNowAndForeverAAA,
      bazParameterWithLongNameHereNowAndForeverBBB,
    ) {}
  `,
  name: 'long params forced multiline',
}, {
  code: dedentAndStrip`
    function foo(
      barParameterWithLongNameHereNowAndForeverAAA: VeryLongTypeNameHereAAA,
      bazParameterWithLongNameHereNowAndForeverBBB: VeryLongTypeNameHereBBB,
    ) {}
  `,
  name: 'long typed params forced multiline',
}, {
  code: dedentAndStrip`
    function fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHere(
      barParameterWithLongNameHereAAAAndEvenMoreTextHere: VeryLongTypeNameHereAAAAndEvenMore,
    ) {}
  `,
  name: 'long function name with long typed param',
}, {
  code: 'function foo() {}',
  name: 'no params',
}] as const

const invalid = [{
  code: dedentAndStrip`
    function foo(
      bar,
    ) {}
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'function single param multiline',
  output: 'function foo(bar) {}',
}, {
  code: dedentAndStrip`
    function foo(
      bar,
      baz,
    ) {}
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'function two params multiline',
  output: 'function foo(bar, baz) {}',
}, {
  code: dedentAndStrip`
    function foo(
      bar,
      baz,
      qux,
    ) {}
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'function three params multiline',
  output: 'function foo(bar, baz, qux) {}',
}, {
  code: dedentAndStrip`
    const foo = function(
      bar,
    ) {}
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'function expression single param multiline',
  output: 'const foo = function(bar) {}',
}, {
  code: dedentAndStrip`
    type Fn = (
      foo: string,
    ) => void
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'type Fn single typed param multiline',
  output: 'type Fn = (foo: string) => void',
}, {
  code: dedentAndStrip`
    type Fn = (
      foo: string,
      bar: number,
    ) => void
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'type Fn two typed params multiline',
  output: 'type Fn = (foo: string, bar: number) => void',
}, {
  code: dedentAndStrip`
    type Fn = {
      (
        foo: string,
      ): void;
    }
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'call signature single typed param multiline',
  output: dedentAndStrip`
    type Fn = {
      (foo: string): void;
    }
  `,
}, {
  code: dedentAndStrip`
    interface Foo {
      bar(
        a: string,
      ): void;
    }
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'interface method single typed param multiline',
  output: dedentAndStrip`
    interface Foo {
      bar(a: string): void;
    }
  `,
}, {
  code: dedentAndStrip`
    function test({
      bar,
      foo,
    }: TestParameters) {
      console.log(foo, bar)
    }
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'destructured param multiline',
  output: dedentAndStrip`
    function test({bar, foo}: TestParameters) {
      console.log(foo, bar)
    }
  `,
}, {
  code: dedentAndStrip`
    function test([
      bar,
      foo,
    ]: TestParameters) {
      console.log(foo, bar)
    }
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'array destructured param multiline',
  output: dedentAndStrip`
    function test([bar, foo]: TestParameters) {
      console.log(foo, bar)
    }
  `,
}, {
  code: dedentAndStrip`
    function test({
      bar,
    }: {
      bar: string,
    }) {
      console.log(bar)
    }
  `,
  errors: [{messageId: 'singleLine'}],
  name: 'destructured param with multiline type annotation',
  output: dedentAndStrip`
    function test({bar}: {bar: string}) {
      console.log(bar)
    }
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'single-line-function-parameters',
  singleLineFunctionParameters,
  {invalid, valid},
)
