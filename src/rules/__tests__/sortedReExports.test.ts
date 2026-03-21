import {dedent} from './dedent'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {sortedReExports} from '../sortedReExports'

const localExportValid = [
  {
    code: 'export const foo = 42',
    name: 'export const',
  },
  {
    code: 'export function bar() {}',
    name: 'export function',
  },
  {
    code: 'export {foo}',
    name: 'local re-export',
  },
  {
    code: dedent`
      export const foo = 42
      export {bar} from 'baz'
    `,
    name: 'local export then re-export',
  },
  {
    code: dedent`
      function foo() {}
      export {foo}
      export * from 'bar'
    `,
    name: 'local then re-export all',
  },
  {
    code: dedent`
      export const z = 1
      export {a} from 'bar'
      export function foo() {}
      export {b} from 'baz'
      export class Bar {}
    `,
    name: 'mixed exports sorted',
  },
  {
    code: dedent`
      export class Child extends Parent {}
      export class Parent {}
      export {child} from 'child-module'
    `,
    name: 'class before re-export',
  },
  {
    code: dedent`
      export {a} from 'aaa'
      export const c = 3
      export {x} from 'xxx'
      export const b = 2
      export {z} from 'zzz'
    `,
    name: 'alternating exports sorted',
  },
  {
    code: '',
    name: 'empty',
  },
  {
    code: 'const x = 1',
    name: 'just code',
  },
] as const

const namedReExportValid = [
  {
    code: "export {foo} from 'bar'",
    name: 'single named re-export',
  },
  {
    code: dedent`
      export {a, b, c} from 'bar'
    `,
    name: 'multiple named re-exports sorted',
  },
] as const

const namedReExportInvalid = [
  {
    code: dedent`
      export {c, a, b} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    name: 'named re-exports unsorted within braces',
    output: dedent`
      export {a, b, c} from 'bar'
    `,
  },
  {
    code: dedent`
      export {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    name: 'named re-exports unsorted z then a',
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
    name: 'named re-exports unsorted after code',
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
    name: 'multiple groups of named re-exports unsorted',
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
    name: 'named re-exports out of order',
    output: dedent`
      export {basename} from 'path'
      export {existsSync} from 'fs'
    `,
  },
] as const

const allReExportValid = [
  {
    code: "export * from 'bar'",
    name: 'all re-export',
  },
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
    name: 'all types of re-exports sorted',
  },
  {
    code: dedent`
      export * from 'bbb'
      export {a} from 'aaa'
    `,
    name: 'all re-export before named',
  },
] as const

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
    name: 'all re-exports out of order',
    output: dedent`
      export * from 'aaa'
      export * from 'bbb'
    `,
  },
] as const

const namespaceReExportValid = [
  {
    code: "export * as ns from 'bar'",
    name: 'namespace re-export',
  },
] as const

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
    name: 'namespace re-exports out of order',
    output: dedent`
      export * as fs from 'fs'
      export * as path from 'path'
    `,
  },
] as const

const typeReExportValid = [
  {
    code: "export type {Foo} from 'bar'",
    name: 'type re-export',
  },
  {
    code: dedent`
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
    name: 'type re-exports sorted',
  },
] as const

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
    name: 'type re-exports out of order',
    output: dedent`
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  },
] as const

const groupOrderingInvalid = [
  {
    code: dedent`
      export {a} from 'bar'
      export * from 'aaa'
    `,
    errors: [{messageId: 'wrongGroup'}],
    name: 'named before all re-export',
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
    name: 'named unsorted and wrong group',
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
    name: 'named before namespace re-export',
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
    name: 'type before value named re-export',
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
    name: 'type before all re-export',
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
    name: 'type before namespace re-export',
    output: dedent`
      export * as ns from 'baz'
      export type {Foo} from 'bar'
    `,
  },
] as const

const ruleTester = new RuleTester()
ruleTester.run('sorted-re-exports', sortedReExports, {
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
