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
  // Already inline exports
  {code: 'export interface Foo {}'},
  {code: 'export type Bar = string'},
  {code: 'export class Baz {}'},
  {code: 'export function qux() {}'},
  {code: 'export const x = 1'},

  // Re-exports from other modules
  {code: 'export { A } from "./module"'},
  {code: 'export type { B } from "./module"'},

  // Mixed: local + imported (can't fully inline)
  {
    code: dedent`
      import { B } from './module'
      export { A, B }
    `,
  },

  // Renamed exports
  {code: 'export { A as B }'},

  // Default exports
  {code: 'export default foo'},
]

const invalid = [
  // Interface
  {
    code: dedent`
      interface Foo {}
      export type { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    output: 'export interface Foo {}\n',
  },

  // Type alias
  {
    code: dedent`
      type Foo = string
      export type { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    output: 'export type Foo = string\n',
  },

  // Class
  {
    code: dedent`
      class Foo {}
      export { Foo }
    `,
    errors: [{messageId: 'preferInline'}],
    output: 'export class Foo {}\n',
  },

  // Function
  {
    code: dedent`
      function foo() {}
      export { foo }
    `,
    errors: [{messageId: 'preferInline'}],
    output: 'export function foo() {}\n',
  },

  // Const
  {
    code: dedent`
      const x = 1
      export { x }
    `,
    errors: [{messageId: 'preferInline'}],
    output: 'export const x = 1\n',
  },

  // Multiple declarations
  {
    code: dedent`
      interface A {}
      class B {}
      export { A, B }
    `,
    errors: [{messageId: 'preferInline'}],
    output: dedent`
      export interface A {}
      export class B {}
    `
      + '\n',
  },

  // Multiple type exports
  {
    code: dedent`
      interface C {}
      type D = string
      export type { C, D }
    `,
    errors: [{messageId: 'preferInline'}],
    output: dedent`
      export interface C {}
      export type D = string
    `
      + '\n',
  },
]

ruleTester.run('prefer-inline-export', rule, {
  valid,
  invalid,
})
