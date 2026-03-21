import typescript from 'typescript-eslint'
import {exportFilenameMatch} from '../exportFilenameMatch'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = exportFilenameMatch as unknown as Rule.RuleModule
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
    filename: '/test/foo.ts',
    name: 'const matches filename',
  },
  {
    code: 'export function bar() {}',
    filename: '/test/bar.ts',
    name: 'function matches filename',
  },
  {
    code: 'export class Baz {}',
    filename: '/test/Baz.ts',
    name: 'class matches filename',
  },
  {
    code: 'export type Foo = string',
    filename: '/test/Foo.ts',
    name: 'type matches filename',
  },
  {
    code: 'export interface Bar {}',
    filename: '/test/Bar.ts',
    name: 'interface matches filename',
  },
  {
    code: 'export type FooBar = string',
    filename: '/test/FooBar.ts',
    name: 'type matches PascalCase filename',
  },
  {
    code: 'const foo = 1\nconst bar = 2\nexport {foo, bar}',
    filename: '/test/someFile.ts',
    name: 'multiple exports any filename',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/index.ts',
    name: 'index file exempt',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/foo.test.ts',
    name: 'test file exempt',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/foo.spec.ts',
    name: 'spec file exempt',
  },
  {
    code: 'const foo = 1',
    filename: '/test/anyFile.ts',
    name: 'no export any filename',
  },
]

const invalid = [
  {
    code: 'export const helper = 1',
    errors: [
      {
        data: {
          currentName: 'utils.ts',
          expectedName: 'helper.ts',
        },
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/utils.ts',
    name: 'const name mismatch',
  },
  {
    code: 'export function myFunction() {}',
    errors: [
      {
        data: {
          currentName: 'something.ts',
          expectedName: 'myFunction.ts',
        },
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/something.ts',
    name: 'function name mismatch',
  },
  {
    code: 'export type FooBar = string',
    errors: [
      {
        data: {
          currentName: 'fooBar.ts',
          expectedName: 'FooBar.ts',
        },
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/fooBar.ts',
    name: 'type name case mismatch',
  },
]

ruleTester.run('export-filename-match', rule, {invalid, valid})
