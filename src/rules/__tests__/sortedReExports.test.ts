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

ruleTester.run('sorted-re-exports', rule, {
  valid: [{
    code: 'export const foo = 42',
  }, {
    code: 'export function bar() {}',
  }, {
    code: 'export {foo}',
  }, {
    code: "export {foo} from 'bar'",
  }, {
    code: "export * from 'bar'",
  }, {
    code: "export type {Foo} from 'bar'",
  }, {
    code: "export * as ns from 'bar'",
  }, {
    code: dedent`
      export * from 'aaa'
      export * as fs from 'fs'
      export * as path from 'path'
      export {a} from 'aaa'
      export {b} from 'bbb'
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  }, {
    code: dedent`
      export {a, b, c} from 'bar'
    `,
  }, {
    code: dedent`
      export const foo = 42
      export {bar} from 'baz'
    `,
  }, {
    code: dedent`
      function foo() {}
      export {foo}
      export * from 'bar'
    `,
  }, {
    code: dedent`
      export * from 'bbb'
      export {a} from 'aaa'
    `,
  }, {
    code: dedent`
      export const z = 1
      export {a} from 'bar'
      export function foo() {}
      export {b} from 'baz'
      export class Bar {}
    `,
  }, {
    code: dedent`
      export class Child extends Parent {}
      export class Parent {}
      export {child} from 'child-module'
    `,
  }, {
    code: dedent`
      export {a} from 'aaa'
      export const c = 3
      export {x} from 'xxx'
      export const b = 2
      export {z} from 'zzz'
    `,
  }, {
    code: '',
  }, {
    code: 'const x = 1',
  }],
  invalid: [{
    code: dedent`
      export {c, a, b} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      export {a, b, c} from 'bar'
    `,
  }, {
    code: dedent`
      export {b} from 'b'
      const x = 1
      export {c} from 'c'
      export {a} from 'a'
    `,
    errors: [{messageId: 'sortedReExports'}, {messageId: 'sortedReExports'}],
    output: dedent`
      export {b} from 'b'
      const x = 1
      export {a} from 'a'
      export {c} from 'c'
    `,
  }, {
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
  }, {
    code: dedent`
      export {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      export {a, z} from 'bar'
    `,
  }, {
    code: dedent`
      export * from 'bbb'
      export * from 'aaa'
    `,
    errors: [{messageId: 'sortedReExports'}, {messageId: 'sortedReExports'}],
    output: dedent`
      export * from 'aaa'
      export * from 'bbb'
    `,
  }, {
    code: dedent`
      export type {Y} from 'yyy'
      export type {X} from 'xxx'
    `,
    errors: [{messageId: 'sortedReExports'}, {messageId: 'sortedReExports'}],
    output: dedent`
      export type {X} from 'xxx'
      export type {Y} from 'yyy'
    `,
  }, {
    code: dedent`
      export {a} from 'bar'
      export * from 'aaa'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * from 'aaa'
      export {a} from 'bar'
    `,
  }, {
    code: dedent`
      export {b, a} from 'bar'
      export * from 'aaa'
    `,
    errors: [{messageId: 'sortedNames'}, {messageId: 'wrongGroup'}],
    output: dedent`
      export * from 'aaa'
      export {a, b} from 'bar'
    `,
  }, {
    code: dedent`
      export {existsSync} from 'fs'
      export {basename} from 'path'
    `,
    errors: [{messageId: 'sortedReExports'}, {messageId: 'sortedReExports'}],
    output: dedent`
      export {basename} from 'path'
      export {existsSync} from 'fs'
    `,
  }, {
    code: dedent`
      export * as path from 'path'
      export * as fs from 'fs'
    `,
    errors: [{messageId: 'sortedReExports'}, {messageId: 'sortedReExports'}],
    output: dedent`
      export * as fs from 'fs'
      export * as path from 'path'
    `,
  }, {
    code: dedent`
      export {foo} from 'bar'
      export * as fs from 'fs'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      export * as fs from 'fs'
      export {foo} from 'bar'
    `,
  }],
})
