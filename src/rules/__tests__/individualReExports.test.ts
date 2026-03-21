import {dedent} from './dedent'
import {individualReExports} from '../individualReExports'
import {RuleTester} from '@typescript-eslint/rule-tester'

const singleReExportValid = [
  {
    code: "export {foo} from 'bar'",
    name: 'single named re-export',
  },
  {
    code: "export {foo as bar} from 'baz'",
    name: 'aliased named re-export',
  },
  {
    code: "export * from 'bar'",
    name: 'all re-export',
  },
  {
    code: "export default 'bar'",
    name: 'default export',
  },
  {
    code: 'export const foo = 1',
    name: 'export const',
  },
  {
    code: 'export function foo() {}',
    name: 'export function',
  },
  {
    code: 'export class Foo {}',
    name: 'export class',
  },
] as const

const multipleReExportInvalid = [
  {
    code: "export type {foo, bar} from 'baz'",
    errors: [{messageId: 'individualReExports'}],
    name: 'two type re-exports',
    output: dedent`
      export type {foo} from 'baz'
      export type {bar} from 'baz'
    `,
  },
  {
    code: "export {foo, bar} from 'baz'",
    errors: [{messageId: 'individualReExports'}],
    name: 'two named re-exports',
    output: dedent`
      export {foo} from 'baz'
      export {bar} from 'baz'
    `,
  },
  {
    code: "export {foo, bar, baz} from 'qux'",
    errors: [{messageId: 'individualReExports'}],
    name: 'three named re-exports',
    output: dedent`
      export {foo} from 'qux'
      export {bar} from 'qux'
      export {baz} from 'qux'
    `,
  },
  {
    code: "export {foo as bar, baz as qux} from 'qux'",
    errors: [{messageId: 'individualReExports'}],
    name: 'two aliased re-exports',
    output: dedent`
      export {foo as bar} from 'qux'
      export {baz as qux} from 'qux'
    `,
  },
] as const

const ruleTester = new RuleTester()
ruleTester.run('individual-re-exports', individualReExports, {
  invalid: [
    ...multipleReExportInvalid,
  ],
  valid: [
    ...singleReExportValid,
  ],
})
