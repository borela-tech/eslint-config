import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {individualReExports} from '../individualReExports'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = individualReExports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const singleReExportValid = [
  {code: "export {foo} from 'bar'",
    name: 'single named re-export'},
  {code: "export {foo as bar} from 'baz'",
    name: 'aliased named re-export'},
  {code: "export * from 'bar'",
    name: 'all re-export'},
  {code: "export default 'bar'",
    name: 'default export'},
  {code: 'export const foo = 1',
    name: 'export const'},
  {code: 'export function foo() {}',
    name: 'export function'},
  {code: 'export class Foo {}',
    name: 'export class'},
]

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
]

ruleTester.run('individual-re-exports', rule, {invalid: [
  ...multipleReExportInvalid,
],
valid: [
  ...singleReExportValid,
]})
