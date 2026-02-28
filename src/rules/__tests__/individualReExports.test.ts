import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {individualReExports} from '../individualReExports'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('individual-re-exports', individualReExports, {
  valid: [{
    code: "export {foo} from 'bar'",
  }, {
    code: "export {foo as bar} from 'baz'",
  }, {
    code: "export * from 'bar'",
  }, {
    code: "export default 'bar'",
  }, {
    code: 'export const foo = 1',
  }, {
    code: 'export function foo() {}',
  }, {
    code: 'export class Foo {}',
  }],
  invalid: [{
    code: "export type {foo, bar} from 'baz'",
    errors: [{messageId: 'individualReExports'}],
    output: dedent`
      export type {foo} from 'baz'
      export type {bar} from 'baz'
    `,
  }, {
    code: "export {foo, bar} from 'baz'",
    errors: [{messageId: 'individualReExports'}],
    output: dedent`
      export {foo} from 'baz'
      export {bar} from 'baz'
    `,
  }, {
    code: "export {foo, bar, baz} from 'qux'",
    errors: [{messageId: 'individualReExports'}],
    output: dedent`
      export {foo} from 'qux'
      export {bar} from 'qux'
      export {baz} from 'qux'
    `,
  }, {
    code: "export {foo as bar, baz as qux} from 'qux'",
    errors: [{messageId: 'individualReExports'}],
    output: dedent`
      export {foo as bar} from 'qux'
      export {baz as qux} from 'qux'
    `,
  }],
})
