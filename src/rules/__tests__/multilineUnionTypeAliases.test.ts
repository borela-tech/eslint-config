import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {multilineUnionTypeAliases} from '../multilineUnionTypeAliases'
import {RuleTester} from '@typescript-eslint/rule-tester'

const unionTypeValid = [{
  code: 'type A = B',
  name: 'simple type alias',
}, {
  code: dedentAndStrip`
    type A = 
      | B
      | C
  `,
  name: 'union type multiline',
}, {
  code: dedentAndStrip`
    export type A = 
      | B
      | C
      | D
  `,
  name: 'export union type multiline',
}, {
  code: 'let foo: A | B | C',
  name: 'union type in variable',
}, {
  code: 'function foo(a: A | B | C) {}',
  name: 'union type in param',
}, {
  code: 'interface Foo { prop: A | B | C }',
  name: 'union type in interface prop',
}] as const

const unionTypeInvalid = [{
  code: 'type A = B | C | D',
  errors: [{messageId: 'singleLine'}],
  name: 'union type single line',
  output: dedentAndStrip`
    type A = 
      | B
      | C
      | D
  `,
}, {
  code: dedentAndStrip`
    type A = B | 
      C | 
      D
  `,
  errors: [{messageId: 'missingPipes'}],
  name: 'union type missing leading pipes',
  output: dedentAndStrip`
    type A = 
      | B
      | C
      | D
  `,
}, {
  code: 'type A = string | number | boolean',
  errors: [{messageId: 'singleLine'}],
  name: 'union of primitives single line',
  output: dedentAndStrip`
    type A = 
      | string
      | number
      | boolean
  `,
}, {
  code: 'export type Foo = Bar | Baz',
  errors: [{messageId: 'singleLine'}],
  name: 'export union type single line',
  output: dedentAndStrip`
    export type Foo = 
      | Bar
      | Baz
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('multiline-union-type-aliases', multilineUnionTypeAliases, {
  invalid: [
    ...unionTypeInvalid,
  ],
  valid: [
    ...unionTypeValid,
  ],
})
