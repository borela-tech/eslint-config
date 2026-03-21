import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {objectPropertyLineBreak} from '../objectPropertyLineBreak'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = objectPropertyLineBreak as unknown as Rule.RuleModule
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
  {code: 'const a = {b: 1}',
    name: 'single property'},
  {code: 'const a = {foo}',
    name: 'single shorthand'},
  {code: 'const a = {foo, bar, baz}',
    name: 'multiple shorthand under limit'},
  {code: 'const a = {}',
    name: 'empty object'},
  {
    code: dedent`
      const a = {
        foo: foo,
        bar: bar,
      }
    `,
    name: 'multiline with normal properties',
  },
  {
    code: dedent`
      const a = {
        foo: foo,
        bar: bar,
        baz: baz,
        lol: lol,
      }
    `,
    name: 'multiline long with normal properties',
  },
]

const invalid = [
  {
    code: 'const a = {foo, bar: bar}',
    errors: [{messageId: 'mixedPropertiesNotAllowed'}],
    name: 'mixed shorthand and normal',
    output: 'const a = {\n  foo,\n  bar: bar,\n}',
  },
  {
    code: 'const a = {foo: foo, bar: bar}',
    errors: [{messageId: 'mixedPropertiesNotAllowed'}],
    name: 'normal properties can collapse',
    output: 'const a = {foo, bar}',
  },
  {
    code: dedent`
      const a = {
        foo,
        bar,
      }
    `,
    errors: [{messageId: 'multilineCanBeSingleLine'}],
    name: 'multiline shorthand can collapse',
    output: 'const a = {foo, bar}',
  },
]

ruleTester.run('object-property-line-break', rule, {invalid, valid})
