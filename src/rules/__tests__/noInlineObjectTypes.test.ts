import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {noInlineObjectTypes} from '../noInlineObjectTypes'
import {RuleTester} from '@typescript-eslint/rule-tester'

const validNamedTypes = [{
  code: 'interface Foo { a: string }',
  name: 'standalone interface',
}, {
  code: 'function foo(x: Foo) {}',
  name: 'function using type',
}, {
  code: 'type Bar = Foo',
  name: 'type alias to type',
}, {
  code: 'function bar(): Bar { return { a: "" } }',
  name: 'function returning type',
}, {
  code: 'type Union = Foo | Bar',
  name: 'union type',
}, {
  code: 'type Intersection = Foo & Bar',
  name: 'intersection type',
}, {
  code: 'interface Foo { prop: Bar }',
  name: 'interface with typed property',
}, {
  code: 'let arr: Foo[]',
  name: 'array type',
}, {
  code: 'let map: Map<string, Foo>',
  name: 'generic type',
}] as const

// Inline literals nested inside interfaces are out of scope for this rule.
const validNestedInlineAllowed = [{
  code: 'interface Foo { prop: { a: string } }',
  name: 'interface with inline property allowed',
}] as const

const valid = [
  ...validNamedTypes,
  ...validNestedInlineAllowed,
] as const

const invalid = [{
  code: 'function foo(x: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'function param inline object',
  output: dedentAndStrip`
    interface X { a: string }
    function foo(x: X) {}
  `,
}, {
  code: 'function foo({ a, b }: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'destructured param inline object',
  output: dedentAndStrip`
    interface Options { a: string }
    function foo({ a, b }: Options) {}
  `,
}, {
  code: 'function foo(): { a: string } { return { a: "" } }',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'function return inline object',
  output: dedentAndStrip`
    interface Foo { a: string }
    function foo(): Foo { return { a: "" } }
  `,
}, {
  code: 'export function foo(x: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'exported function param inline object',
  output: dedentAndStrip`
    export function foo(x: X) {}
    interface X { a: string }
  `,
}, {
  code: 'let x: { a: string } = { a: "" }',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'variable inline object type',
  output: dedentAndStrip`
    interface InlineType { a: string }
    let x: InlineType = { a: "" }
  `,
}, {
  code: 'class Foo { bar(x: { a: string }): void {} }',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'class method param inline object',
  output: dedentAndStrip`
    interface X { a: string }
    class Foo { bar(x: X): void {} }
  `,
}, {
  code: dedentAndStrip`
    export abstract class ProbeBase extends Object {
      static create<M extends Object>(
        this: { readonly prototype: M },
      ): M {
        return null as unknown as M
      }
    }
  `,
  errors: [{messageId: 'inlineObjectType'}],
  name: 'this param inline object',
  output: dedentAndStrip`
    export abstract class ProbeBase extends Object {
      static create<M extends Object>(
        this: This,
      ): M {
        return null as unknown as M
      }
    }
    interface This { readonly prototype: M }
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('no-inline-object-types', noInlineObjectTypes, {invalid, valid})
