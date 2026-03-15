import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {interfacePropertyLineBreak} from '../interfacePropertyLineBreak'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = interfacePropertyLineBreak as unknown as Rule.RuleModule
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
    code: 'interface Foo { bar: string }',
  },
  {
    code: 'interface Foo { bar: string, baz: number }',
  },
  {
    code: 'interface Foo { bar: string, baz: number, qux: boolean }',
  },
  {
    code: 'interface Foo {\n  bar: string\n}',
  },
  {
    code: 'interface Foo {\n  bar: string,\n  baz: number\n}',
  },
  {
    code: 'interface Foo { bar: string }',
    options: [{maxLength: 30}],
  },
  {
    code: 'interface Foo extends Bar { bar: string }',
  },
  {
    code: 'interface Foo extends Bar { bar: string }',
    options: [{maxLength: 50}],
  },
  {
    code: 'interface Foo { bar(): void }',
  },
  {
    code: 'interface Foo { get bar(): string }',
  },
  {
    code: 'interface Foo { set bar(value: string) }',
  },
  {
    code: dedent`
      interface Foo {
        bar: { a: string, b: number, c: boolean }
        baz: { d: string, e: number, f: boolean }
      }
    `,
    options: [{maxLength: 50}],
  },
]

const invalid = [
  {
    code: 'interface FooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux { bar: string, baz: number }',
    errors: [{messageId: 'multipleOnSameLine'}],
    options: [{maxLength: 60}],
    output: dedent`
      interface FooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux {
        bar: string,
        baz: number
      }
    `,
  },
  {
    code: 'interface Foo { bar: string, baz: number, qux: boolean }',
    errors: [{messageId: 'multipleOnSameLine'}],
    options: [{maxLength: 40}],
    output: dedent`
      interface Foo {
        bar: string,
        baz: number,
        qux: boolean
      }
    `,
  },
  {
    code: 'interface Foo { bar: string }',
    errors: [{messageId: 'exceedsMaxLength'}],
    options: [{maxLength: 20}],
  },
  {
    code: 'interface Foo { bar: { a: string, b: number, c: boolean, d: boolean } }',
    errors: [{messageId: 'exceedsMaxLength'}],
    options: [{maxLength: 50}],
  },
  {
    code: dedent`
      interface Foo {
        bar: { a: string, b: number, c: boolean, d: boolean }
        baz: { e: string, f: number, g: boolean, h: boolean }
      }
    `,
    errors: [
      {line: 2, messageId: 'exceedsMaxLength'},
      {line: 3, messageId: 'exceedsMaxLength'},
    ],
    options: [{maxLength: 50}],
    output: dedent`
      interface Foo {
        bar: {
          a: string
          b: number
          c: boolean
          d: boolean
        }
        baz: {
          e: string
          f: number
          g: boolean
          h: boolean
        }
      }
    `,
  },
]

ruleTester.run('interface-property-line-break', rule, {
  invalid,
  valid,
})
