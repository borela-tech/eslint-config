import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {multilineUnionTypeAliases} from '../multilineUnionTypeAliases'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = multilineUnionTypeAliases as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const unionTypeValid = [
  {code: 'type A = B',
    name: 'simple type alias'},
  {code: dedent`
      type A = 
        | B
        | C
    `,
  name: 'union type multiline'},
  {code: dedent`
      export type A = 
        | B
        | C
        | D
    `,
  name: 'export union type multiline'},
  {code: 'let foo: A | B | C',
    name: 'union type in variable'},
  {code: 'function foo(a: A | B | C) {}',
    name: 'union type in param'},
  {code: 'interface Foo { prop: A | B | C }',
    name: 'union type in interface prop'},
]

const unionTypeInvalid = [
  {
    code: 'type A = B | C | D',
    errors: [{messageId: 'singleLine'}],
    name: 'union type single line',
    output: dedent`
      type A = 
        | B
        | C
        | D
    `,
  },
  {
    code: dedent`
      type A = B | 
        C | 
        D
    `,
    errors: [{messageId: 'missingPipes'}],
    name: 'union type missing leading pipes',
    output: dedent`
      type A = 
        | B
        | C
        | D
    `,
  },
  {
    code: 'type A = string | number | boolean',
    errors: [{messageId: 'singleLine'}],
    name: 'union of primitives single line',
    output: dedent`
      type A = 
        | string
        | number
        | boolean
    `,
  },
  {
    code: 'export type Foo = Bar | Baz',
    errors: [{messageId: 'singleLine'}],
    name: 'export union type single line',
    output: dedent`
      export type Foo = 
        | Bar
        | Baz
    `,
  },
]

ruleTester.run('multiline-union-type-aliases', rule, {invalid: [
  ...unionTypeInvalid,
],
valid: [
  ...unionTypeValid,
]})
