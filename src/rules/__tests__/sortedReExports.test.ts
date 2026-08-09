import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {sortedReExports} from '../sortedReExports'

const localExportValid = [{
  code: 'export const foo = 42',
  name: 'export const',
}, {
  code: 'export function bar() {}',
  name: 'export function',
}, {
  code: 'export {foo}',
  name: 'local re-export',
}, {
  code: dedentAndStrip`
    export const foo = 42
    export {bar} from 'baz'
  `,
  name: 'local export then re-export',
}, {
  code: dedentAndStrip`
    function foo() {}
    export {foo}
    export * from 'bar'
  `,
  name: 'local then re-export all',
}, {
  code: dedentAndStrip`
    export const z = 1
    export {a} from 'bar'
    export function foo() {}
    export {b} from 'baz'
    export class Bar {}
  `,
  name: 'mixed exports sorted',
}, {
  code: dedentAndStrip`
    export class Child extends Parent {}
    export class Parent {}
    export {child} from 'child-module'
  `,
  name: 'class before re-export',
}, {
  code: dedentAndStrip`
    export {a} from 'aaa'
    export const c = 3
    export {x} from 'xxx'
    export const b = 2
    export {z} from 'zzz'
  `,
  name: 'alternating exports sorted',
}, {
  code: '',
  name: 'empty',
}, {
  code: 'const x = 1',
  name: 'just code',
}] as const

const namedReExportValid = [{
  code: "export {foo} from 'bar'",
  name: 'single named re-export',
}, {
  code: dedentAndStrip`
    export {a, b, c} from 'bar'
  `,
  name: 'multiple named re-exports sorted',
}] as const

const namedReExportInvalid = [{
  code: dedentAndStrip`
    export {c, a, b} from 'bar'
  `,
  errors: [{messageId: 'sortedNames'}],
  name: 'named re-exports unsorted within braces',
  output: dedentAndStrip`
    export {a, b, c} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export {z, a} from 'bar'
  `,
  errors: [{messageId: 'sortedNames'}],
  name: 'named re-exports unsorted z then a',
  output: dedentAndStrip`
    export {a, z} from 'bar'
  `,
}, {
  code: dedentAndStrip`
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
  output: dedentAndStrip`
    export {b} from 'b'
    const x = 1
    export {a} from 'a'
    export {c} from 'c'
  `,
}, {
  code: dedentAndStrip`
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
  output: dedentAndStrip`
    export {a} from 'a'
    export {b} from 'b'
    const x = 1
    export {c} from 'c'
    export {d} from 'd'
    const y = 2
    export {e} from 'e'
    export {f} from 'f'
  `,
}, {
  code: dedentAndStrip`
    export {existsSync} from 'fs'
    export {basename} from 'path'
  `,
  errors: [
    {messageId: 'sortedReExports'},
    {messageId: 'sortedReExports'},
  ],
  name: 'named re-exports out of order',
  output: dedentAndStrip`
    export {basename} from 'path'
    export {existsSync} from 'fs'
  `,
}] as const

const allReExportValid = [{
  code: "export * from 'bar'",
  name: 'all re-export',
}, {
  code: dedentAndStrip`
    export * from 'aaa'
    export * as fs from 'fs'
    export * as path from 'path'
    export {a} from 'aaa'
    export {b} from 'bbb'
    export type {X} from 'xxx'
    export type {Y} from 'yyy'
  `,
  name: 'all types of re-exports sorted',
}, {
  code: dedentAndStrip`
    export * from 'bbb'
    export {a} from 'aaa'
  `,
  name: 'all re-export before named',
}] as const

const allReExportInvalid = [{
  code: dedentAndStrip`
    export * from 'bbb'
    export * from 'aaa'
  `,
  errors: [
    {messageId: 'sortedReExports'},
    {messageId: 'sortedReExports'},
  ],
  name: 'all re-exports out of order',
  output: dedentAndStrip`
    export * from 'aaa'
    export * from 'bbb'
  `,
}] as const

const namespaceReExportValid = [{
  code: "export * as ns from 'bar'",
  name: 'namespace re-export',
}] as const

const namespaceReExportInvalid = [{
  code: dedentAndStrip`
    export * as path from 'path'
    export * as fs from 'fs'
  `,
  errors: [
    {messageId: 'sortedReExports'},
    {messageId: 'sortedReExports'},
  ],
  name: 'namespace re-exports out of order',
  output: dedentAndStrip`
    export * as fs from 'fs'
    export * as path from 'path'
  `,
}] as const

const typeReExportValid = [{
  code: "export type {Foo} from 'bar'",
  name: 'type re-export',
}, {
  code: dedentAndStrip`
    export type {X} from 'xxx'
    export type {Y} from 'yyy'
  `,
  name: 'type re-exports sorted',
}] as const

const typeReExportInvalid = [{
  code: dedentAndStrip`
    export type {Y} from 'yyy'
    export type {X} from 'xxx'
  `,
  errors: [
    {messageId: 'sortedReExports'},
    {messageId: 'sortedReExports'},
  ],
  name: 'type re-exports out of order',
  output: dedentAndStrip`
    export type {X} from 'xxx'
    export type {Y} from 'yyy'
  `,
}] as const

const groupOrderingInvalid = [{
  code: dedentAndStrip`
    export {a} from 'bar'
    export * from 'aaa'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'named before all re-export',
  output: dedentAndStrip`
    export * from 'aaa'
    export {a} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export {b, a} from 'bar'
    export * from 'aaa'
  `,
  errors: [
    {messageId: 'sortedNames'},
    {messageId: 'wrongGroup'},
  ],
  name: 'named unsorted and wrong group',
  output: dedentAndStrip`
    export * from 'aaa'
    export {a, b} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export {foo} from 'bar'
    export * as fs from 'fs'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'named before namespace re-export',
  output: dedentAndStrip`
    export * as fs from 'fs'
    export {foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export type {Foo} from 'bar'
    export {baz} from 'qux'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type before value named re-export',
  output: dedentAndStrip`
    export {baz} from 'qux'
    export type {Foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export type {Foo} from 'bar'
    export * from 'baz'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type before all re-export',
  output: dedentAndStrip`
    export * from 'baz'
    export type {Foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export type {Foo} from 'bar'
    export * as ns from 'baz'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type before namespace re-export',
  output: dedentAndStrip`
    export * as ns from 'baz'
    export type {Foo} from 'bar'
  `,
}] as const

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
