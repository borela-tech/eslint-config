import {dedent} from './dedent'
import {noInlineObjectTypes} from '../noInlineObjectTypes'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
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
  code: 'interface Foo { prop: { a: string } }',
  name: 'interface with inline property allowed',
}, {
  code: 'let arr: Foo[]',
  name: 'array type',
}, {
  code: 'let map: Map<string, Foo>',
  name: 'generic type',
}] as const

const invalid = [{
  code: 'function foo(x: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'function param inline object',
  output: dedent`
      interface X { a: string }
      function foo(x: X) {}
    `,
}, {
  code: 'function foo({ a, b }: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'destructured param inline object',
  output: dedent`
      interface Options { a: string }
      function foo({ a, b }: Options) {}
    `,
}, {
  code: 'function foo(): { a: string } { return { a: "" } }',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'function return inline object',
  output: dedent`
      interface Foo { a: string }
      function foo(): Foo { return { a: "" } }
    `,
}, {
  code: 'export function foo(x: { a: string }) {}',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'exported function param inline object',
  output: dedent`
      export function foo(x: X) {}
      interface X { a: string }
    `,
}, {
  code: 'let x: { a: string } = { a: "" }',
  errors: [{messageId: 'inlineObjectType'}],
  name: 'variable inline object type',
  output: dedent`
      interface InlineType { a: string }
      let x: InlineType = { a: "" }
    `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('no-inline-object-types', noInlineObjectTypes, {invalid, valid})
