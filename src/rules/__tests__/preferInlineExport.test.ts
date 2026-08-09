import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {preferInlineExport} from '../preferInlineExport'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'export interface Foo {}',
  name: 'inline interface export',
}, {
  code: 'export type Bar = string',
  name: 'inline type export',
}, {
  code: 'export class Baz {}',
  name: 'inline class export',
}, {
  code: 'export function qux() {}',
  name: 'inline function export',
}, {
  code: 'export const x = 1',
  name: 'inline const export',
}, {
  code: 'export { A } from "./module"',
  name: 're-export from module',
}, {
  code: 'export type { B } from "./module"',
  name: 'type re-export from module',
}, {
  code: dedentAndStrip`
    import { B } from './module'
    export { A, B }
  `,
  name: 'mixed local and imported',
}, {
  code: 'export { A as B }',
  name: 'renamed export',
}, {
  code: 'export default foo',
  name: 'default export',
}] as const

const invalid = [{
  code: dedentAndStrip`
    interface Foo {}
    export type { Foo }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'interface export should be inline',
  output: 'export interface Foo {}\n',
}, {
  code: dedentAndStrip`
    type Foo = string
    export type { Foo }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'type export should be inline',
  output: 'export type Foo = string\n',
}, {
  code: dedentAndStrip`
    class Foo {}
    export { Foo }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'class export should be inline',
  output: 'export class Foo {}\n',
}, {
  code: dedentAndStrip`
    function foo() {}
    export { foo }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'function export should be inline',
  output: 'export function foo() {}\n',
}, {
  code: dedentAndStrip`
    const x = 1
    export { x }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'const export should be inline',
  output: 'export const x = 1\n',
}, {
  code: dedentAndStrip`
    interface A {}
    class B {}
    export { A, B }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'multiple declarations should be inline',
  output: dedentAndStrip`
    export interface A {}
    export class B {}
  `
    + '\n',
}, {
  code: dedentAndStrip`
    interface C {}
    type D = string
    export type { C, D }
  `,
  errors: [{messageId: 'preferInline'}],
  name: 'multiple type declarations should be inline',
  output: dedentAndStrip`
    export interface C {}
    export type D = string
  `
    + '\n',
}] as const

const ruleTester = new RuleTester()
ruleTester.run('prefer-inline-export', preferInlineExport, {invalid, valid})
