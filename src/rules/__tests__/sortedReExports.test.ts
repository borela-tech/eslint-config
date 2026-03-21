import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {sortedReExports} from '../sortedReExports'
import type {Rule} from 'eslint'

const rule = sortedReExports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const localExportValid = [
  {code: 'export const foo = 42'},
  {code: 'export function bar() {}'},
  {code: 'export {foo}'},
  {
    code: dedent`
      export const foo = 42
      export {bar} from 'baz'
    `,
  },
  {
    code: dedent`
      function foo() {}
      export {foo}
      export * from 'bar'
    `,
  },
  {
    code: dedent`
      export const z = 1
      export {a} from 'bar'
      export function foo() {}
      export {b} from 'baz'
      export class Bar {}
    `,
  },
  {
    code: dedent`
      export class Child extends Parent {}
      export class Parent {}
      export {child} from 'child-module'
    `,
  },
  {
    code: dedent`
      export {a} from 'aaa'
      export const c = 3
      export {x} from 'xxx'
      export const b = 2
      export {z} from 'zzz'
    `,
  },
  {code: ''},
  {code: 'const x = 1'},
]

const namedReExportValid = [
  {code: "export {foo} from 'bar'"},
  {
    code: dedent`
      export {a, b, c} from 'bar'
    `,
  },
]

const namedReExportInvalid = [
  {
    code: dedent`
      export {c, a, b} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      export {a, b, c} from 'bar'
    `,
  },
  {
    code: dedent`
      export {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      export {a, z} from 'bar'
    `,
  },
  {
    code: dedent`
      export {b} from 'b'
      const x = 1
      export {c} from 'c'
      export {a} from 'a'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export {b} from 'b'
      const x = 1
      export {a} from 'a'
      export {c} from 'c'
    `,
  },
  {
    code: dedent`
      export {b} from 'b'
      export {a} from 'a'
      const x = 1
      export {d} from 'd'
      export {c} from 'c'
      const y = 2
      export {f} from 'f'
      export {e} from 'e'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export {a} from 'a'
      export {b} from 'b'
      const x = 1
      export {c} from 'c'
      export {d} from 'd'
      const y = 2
      export {e} from 'e'
      export {f} from 'f'
    `,
  },
  {
    code: dedent`
      export {existsSync} from 'fs'
      export {basename} from 'path'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export {basename} from 'path'
      export {existsSync} from 'fs'
    `,
  },
]

const allReExportValid = [
  {code: "export * from 'bar'"},
  {
    code: dedent`
      export * from 'aaa'
      export * as fs from 'fs'
      export * as path from 'path'
      export {a} from 'aaa'
      export {b} from 'bbb'
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  },
  {
    code: dedent`
      export * from 'bbb'
      export {a} from 'aaa'
    `,
  },
]

const allReExportInvalid = [
  {
    code: dedent`
      export * from 'bbb'
      export * from 'aaa'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export * from 'aaa'
      export * from 'bbb'
    `,
  },
]

const namespaceReExportValid = [
  {code: "export * as ns from 'bar'"},
]

const namespaceReExportInvalid = [
  {
    code: dedent`
      export * as path from 'path'
      export * as fs from 'fs'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export * as fs from 'fs'
      export * as path from 'path'
    `,
  },
]

const typeReExportValid = [
  {code: "export type {Foo} from 'bar'"},
  {
    code: dedent`
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  },
]

const typeReExportInvalid = [
  {
    code: dedent`
      export type {Y} from 'yyy'
      export type {X} from 'xxx'
    `,
    errors: [
      {messageId: 'sortedReExports'},
      {messageId: 'sortedReExports'},
    ],
    output: dedent`
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  },
]

const groupOrderingInvalid = [
  {
    code: dedent`
      export {a} from 'bar'
      export * from 'aaa'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * from 'aaa'
      export {a} from 'bar'
    `,
  },
  {
    code: dedent`
      export {b, a} from 'bar'
      export * from 'aaa'
    `,
    errors: [
      {messageId: 'sortedNames'},
      {messageId: 'wrongGroup'},
    ],
    output: dedent`
      export * from 'aaa'
      export {a, b} from 'bar'
    `,
  },
  {
    code: dedent`
      export {foo} from 'bar'
      export * as fs from 'fs'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * as fs from 'fs'
      export {foo} from 'bar'
    `,
  },
  {
    code: dedent`
      export type {Foo} from 'bar'
      export {baz} from 'qux'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export {baz} from 'qux'
      export type {Foo} from 'bar'
    `,
  },
  {
    code: dedent`
      export type {Foo} from 'bar'
      export * from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * from 'baz'
      export type {Foo} from 'bar'
    `,
  },
  {
    code: dedent`
      export type {Foo} from 'bar'
      export * as ns from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * as ns from 'baz'
      export type {Foo} from 'bar'
    `,
  },
]

ruleTester.run('sorted-re-exports', rule, {
  invalid: [
    ...namedReExportInvalid,
    ...allReExportInvalid,
    ...namespaceReExportInvalid,
    ...typeReExportInvalid,
    ...groupOrderingInvalid,
  ],
  valid: [
    ...localExportValid,
    ...namedReExportValid,
    ...allReExportValid,
    ...namespaceReExportValid,
    ...typeReExportValid,
  ],
})
