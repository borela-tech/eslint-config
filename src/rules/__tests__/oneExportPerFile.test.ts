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
  {
    code: 'export const foo = 1',
    name: 'single export const',
  },
  {
    code: 'export default function foo() {}',
    name: 'default function export',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    name: 'const with named export',
  },
  {
    code: 'const foo = 1\nexport {foo as bar}',
    name: 'const with aliased export',
  },
  {
    code: 'const foo = 1\nconst bar = 2\nexport {foo, bar}',
    name: 'multiple consts with export',
  },
  {
    code: 'export const foo = 1',
    filename: '/test/index.ts',
    name: 'index.ts file exempt',
  },
  {
    code: 'export const foo = 1',
    filename: '/test/foo.test.ts',
    name: 'test file exempt',
  },
  {
    code: 'export const foo = 1',
    filename: '/test/foo.spec.ts',
    name: 'spec file exempt',
  },
]

const invalid = [
  {
    code: 'export const foo = 1\nexport const bar = 2',
    errors: [{
      data: {count: 2},
      messageId: 'tooManyExports',
    }],
    name: 'two export consts',
  },
  {
    code: 'export const foo = 1\nexport default function bar() {}',
    errors: [{
      data: {count: 2},
      messageId: 'tooManyExports',
    }],
    name: 'export const and default function',
  },
  {
    code: 'export default function foo() {}\nexport const bar = 1',
    errors: [{
      data: {count: 2},
      messageId: 'tooManyExports',
    }],
    name: 'default function and export const',
  },
  {
    code: 'export const foo = 1\nexport {bar} from "./bar"',
    errors: [{
      data: {count: 2},
      messageId: 'tooManyExports',
    }],
    name: 'export const and re-export',
  },
  {
    code: 'export {foo} from "./foo"\nexport {bar} from "./bar"',
    errors: [{
      data: {count: 2},
      messageId: 'tooManyExports',
    }],
    name: 'two re-exports',
  },
  {
    code: 'export const foo = 1\nexport const bar = 2\nexport const baz = 3',
    errors: [{
      data: {count: 3},
      messageId: 'tooManyExports',
    }],
    name: 'three export consts',
  },
]

ruleTester.run('one-export-per-file', rule, {invalid, valid})
