import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {noInlineObjectTypeParameters} from '../noInlineObjectTypeParameters'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = noInlineObjectTypeParameters as unknown as Rule.RuleModule
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
  {code: 'interface Foo { a: string }'},
  {code: 'function foo(x: Foo) {}'},
  {code: 'type Bar = Foo'},
  {code: 'function bar(): Bar { return { a: "" } }'},
  {code: 'type Union = Foo | Bar'},
  {code: 'type Intersection = Foo & Bar'},
  {code: 'interface Foo { prop: Bar }'},
  {code: 'let arr: Foo[]'},
  {code: 'let map: Map<string, Foo>'},
]

const invalid = [
  {
    code: 'function foo(x: { a: string }) {}',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      interface InlineType { a: string }
      function foo(x: InlineType) {}
    `,
  },
  {
    code: 'export function foo(x: { a: string }) {}',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      export function foo(x: InlineType) {}
      interface InlineType { a: string }
    `,
  },
  {
    code: 'function bar(): { a: string } { return { a: "" } }',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      interface InlineType { a: string }
      function bar(): InlineType { return { a: "" } }
    `,
  },
  {
    code: 'let x: { a: string } = { a: "" }',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      interface InlineType { a: string }
      let x: InlineType = { a: "" }
    `,
  },
  {
    code: 'interface Foo { prop: { a: string } }',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      interface InlineType { a: string }
      interface Foo { prop: InlineType }
    `,
  },
  {
    code: 'type Bar = { a: string }',
    errors: [{messageId: 'inlineObjectType'}],
    output: dedent`
      interface InlineType { a: string }
      type Bar = InlineType
    `,
  },
]

ruleTester.run('no-inline-object-type-parameters', rule, {
  valid,
  invalid,
})
