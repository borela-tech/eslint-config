import {braceStyleObjectLiteral} from '../braceStyleObjectLiteral'
import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'const x = {}',
  name: 'empty object',
}, {
  code: 'const x = {foo, bar}',
  name: 'single line shorthand',
}, {
  code: 'const x = {foo: 1}',
  name: 'single line key-value',
}, {
  code: 'const x = {foo: 1, bar: 2}',
  name: 'single line multiple key-value',
}, {
  code: dedentAndStrip`
    const x = {
      foo: 1,
      bar: 2,
    }
  `,
  name: 'multi-line with braces on own lines',
}, {
  code: dedentAndStrip`
    const arr = [
      {
        foo: 1,
      },
    ]
  `,
  name: 'object in array',
}, {
  code: dedentAndStrip`
    const obj = {
      outer: {
        inner: 1,
      },
    }
  `,
  name: 'nested objects valid',
}, {
  code: dedentAndStrip`
    const obj = {
      foo,
      bar,
    }
  `,
  name: 'multi-line shorthand',
}]

const invalid = [{
  code: dedentAndStrip`
    const x = {foo,
      bar: 2}
  `,
  errors: [
    {messageId: 'braceOnPropertyLine'},
    {messageId: 'braceOnPropertyLine'},
  ],
  name: 'brace on property line - shorthand then key-value',
  output: dedentAndStrip`
    const x = {
    foo,
      bar: 2,
      }
  `,
}, {
  code: dedentAndStrip`
    const x = {foo: 1,
      bar: 2}
  `,
  errors: [
    {messageId: 'braceOnPropertyLine'},
    {messageId: 'braceOnPropertyLine'},
  ],
  name: 'brace on property line - key-value',
  output: dedentAndStrip`
    const x = {
    foo: 1,
      bar: 2,
      }
  `,
}, {
  code: dedentAndStrip`
    const x = {
      foo: 1,
      bar: 2}
  `,
  errors: [{messageId: 'braceOnPropertyLine'}],
  name: 'closing brace on property line',
  output: dedentAndStrip`
    const x = {
      foo: 1,
      bar: 2,
      }
  `,
}, {
  code: dedentAndStrip`
    const x = {foo,
      bar}
  `,
  errors: [
    {messageId: 'braceOnPropertyLine'},
    {messageId: 'braceOnPropertyLine'},
  ],
  name: 'shorthand properties multi-line',
  output: dedentAndStrip`
    const x = {
    foo,
      bar,
      }
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'brace-style-object-literal',
  braceStyleObjectLiteral,
  {invalid, valid},
)
