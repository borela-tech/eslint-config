import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {preferInlineExport} from '../preferInlineExport'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = preferInlineExport as unknown as Rule.RuleModule
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
  {code: 'export interface Foo {}',
    name: 'inline interface export'},
  {code: 'export type Bar = string',
    name: 'inline type export'},
  {code: 'export class Baz {}',
    name: 'inline class export'},
  {code: 'export function qux() {}',
    name: 'inline function export'},
  {code: 'export const x = 1',
    name: 'inline const export'},

  {code: 'export { A } from "./module"',
    name: 're-export from module'},
  {code: 'export type { B } from "./module"',
    name: 'type re-export from module'},

  {code: dedent`
      import { B } from './module'
      export { A, B }
    `,
  name: 'mixed local and imported'},

  {code: 'export { A as B }',
    name: 'renamed export'},

  {code: 'export default foo',
    name: 'default export'},
]

const invalid = [
  {
    code: dedent`
      interface Foo {}
      export type { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'interface export should be inline',
    output: 'export interface Foo {}\n',
  },

  {
    code: dedent`
      type Foo = string
      export type { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'type export should be inline',
    output: 'export type Foo = string\n',
  },

  {
    code: dedent`
      class Foo {}
      export { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'class export should be inline',
    output: 'export class Foo {}\n',
  },

  {
    code: dedent`
      function foo() {}
      export { foo }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'function export should be inline',
    output: 'export function foo() {}\n',
  },

  {
    code: dedent`
      const x = 1
      export { x }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'const export should be inline',
    output: 'export const x = 1\n',
  },

  {
    code: dedent`
      interface A {}
      class B {}
      export { A, B }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'multiple declarations should be inline',
    output: dedent`
      export interface A {}
      export class B {}
    `
      + '\n',
  },

  {
    code: dedent`
      interface C {}
      type D = string
      export type { C, D }
    `,
    errors: [{messageId: 'preferInline'}],
    name: 'multiple type declarations should be inline',
    output: dedent`
      export interface C {}
      export type D = string
    `
      + '\n',
  },
]

ruleTester.run('prefer-inline-export', rule, {invalid, valid})
