import typescript from 'typescript-eslint'
import {oneExportPerFile} from '../oneExportPerFile'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = oneExportPerFile as unknown as Rule.RuleModule
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
  {code: 'export const foo = 1'},
  {code: 'export default function foo() {}'},
  {code: 'const foo = 1\nexport {foo}'},
  {code: 'const foo = 1\nexport {foo as bar}'},
  {code: 'const foo = 1\nconst bar = 2\nexport {foo, bar}'},
  {
    code: 'export const foo = 1',
    filename: '/test/index.ts',
  },
  {
    code: 'export const foo = 1',
    filename: '/test/foo.test.ts',
  },
  {
    code: 'export const foo = 1',
    filename: '/test/foo.spec.ts',
  },
]

const invalid = [
  {
    code: 'export const foo = 1\nexport const bar = 2',
    errors: [{messageId: 'tooManyExports', data: {count: 2}}],
  },
  {
    code: 'export const foo = 1\nexport default function bar() {}',
    errors: [{messageId: 'tooManyExports', data: {count: 2}}],
  },
  {
    code: 'export default function foo() {}\nexport const bar = 1',
    errors: [{messageId: 'tooManyExports', data: {count: 2}}],
  },
  {
    code: 'export const foo = 1\nexport {bar} from "./bar"',
    errors: [{messageId: 'tooManyExports', data: {count: 2}}],
  },
  {
    code: 'export {foo} from "./foo"\nexport {bar} from "./bar"',
    errors: [{messageId: 'tooManyExports', data: {count: 2}}],
  },
  {
    code: 'export const foo = 1\nexport const bar = 2\nexport const baz = 3',
    errors: [{messageId: 'tooManyExports', data: {count: 3}}],
  },
]

ruleTester.run('one-export-per-file', rule, {
  valid: valid.map(c => ({...c})),
  invalid: invalid.map(c => ({...c})),
})
