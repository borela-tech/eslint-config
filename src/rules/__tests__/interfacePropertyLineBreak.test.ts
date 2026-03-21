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
    name: 'single property',
  },
  {
    code: 'interface Foo { bar: string, baz: number }',
    name: 'two properties',
  },
  {
    code: 'interface Foo { bar: string, baz: number, qux: boolean }',
    name: 'three properties',
  },
  {
    code: 'interface Foo {\n  bar: string\n}',
    name: 'single property multiline',
  },
  {
    code: 'interface Foo {\n  bar: string,\n  baz: number\n}',
    name: 'two properties multiline',
  },
  {
    code: 'interface Foo { bar: string }',
    name: 'single property with custom maxLength',
    options: [{maxLength: 30}],
  },
  {
    code: 'interface Foo extends Bar { bar: string }',
    name: 'extends clause',
  },
  {
    code: 'interface Foo extends Bar { bar: string }',
    name: 'extends with custom maxLength',
    options: [{maxLength: 50}],
  },
  {
    code: 'interface Foo { bar(): void }',
    name: 'method signature',
  },
  {
    code: 'interface Foo { get bar(): string }',
    name: 'getter signature',
  },
  {
    code: 'interface Foo { set bar(value: string) }',
    name: 'setter signature',
  },
  {
    code: dedent`
      interface Foo {
        bar: { a: string, b: number, c: boolean }
        baz: { d: string, e: number, f: boolean }
      }
    `,
    name: 'nested objects multiline',
    options: [{maxLength: 50}],
  },
]

const invalid = [
  {
    code: 'interface FooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux { bar: string, baz: number }',
    errors: [{messageId: 'multipleOnSameLine'}],
    name: 'long name two props same line',
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
    name: 'three props exceeds maxLength',
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
    name: 'single prop exceeds maxLength',
    options: [{maxLength: 20}],
  },
  {
    code: 'interface Foo { bar: { a: string, b: number, c: boolean, d: boolean } }',
    errors: [{messageId: 'exceedsMaxLength'}],
    name: 'nested object exceeds maxLength',
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
      {
        line: 2,
        messageId: 'exceedsMaxLength',
      },
      {
        line: 3,
        messageId: 'exceedsMaxLength',
      },
    ],
    name: 'two nested objects exceed maxLength',
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

ruleTester.run('interface-property-line-break', rule, {invalid, valid})
