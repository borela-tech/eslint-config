import {dedent} from './dedent'
import {objectPropertyLineBreak} from '../objectPropertyLineBreak'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'const a = {b: 1}',
  name: 'single property',
}, {
  code: 'const a = {foo}',
  name: 'single shorthand',
}, {
  code: 'const a = {foo, bar, baz}',
  name: 'multiple shorthand under limit',
}, {
  code: 'const a = {}',
  name: 'empty object',
}, {
  code: dedent`
      const a = {
        foo: foo,
        bar: bar,
      }
    `,
  name: 'multiline with normal properties',
}, {
  code: dedent`
      const a = {
        foo: foo,
        bar: bar,
        baz: baz,
        lol: lol,
      }
    `,
  name: 'multiline long with normal properties',
}] as const

const invalid = [{
  code: 'const a = {foo, bar: bar}',
  errors: [{messageId: 'mixedPropertiesNotAllowed'}],
  name: 'mixed shorthand and normal',
  output: 'const a = {\n  foo,\n  bar: bar,\n}',
}, {
  code: 'const a = {foo: foo, bar: bar}',
  errors: [{messageId: 'mixedPropertiesNotAllowed'}],
  name: 'normal properties can collapse',
  output: 'const a = {foo, bar}',
}, {
  code: dedent`
      const a = {
        foo,
        bar,
      }
    `,
  errors: [{messageId: 'multilineCanBeSingleLine'}],
  name: 'multiline shorthand can collapse',
  output: 'const a = {foo, bar}',
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'object-property-line-break',
  objectPropertyLineBreak,
  {invalid, valid},
)
