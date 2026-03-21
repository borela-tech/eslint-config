import {braceStyleObjectLiteral} from '../braceStyleObjectLiteral'
import {dedent} from './dedent'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [
  {
    code: 'const x = {}',
    name: 'empty object',
  },
  {
    code: 'const x = {foo, bar}',
    name: 'single line shorthand',
  },
  {
    code: 'const x = {foo: 1}',
    name: 'single line key-value',
  },
  {
    code: 'const x = {foo: 1, bar: 2}',
    name: 'single line multiple key-value',
  },
  {
    code: dedent`
      const x = {
        foo: 1,
        bar: 2,
      }
    `,
    name: 'multi-line with braces on own lines',
  },
  {
    code: dedent`
      const arr = [
        {
          foo: 1,
        },
      ]
    `,
    name: 'object in array',
  },
  {
    code: dedent`
      const obj = {
        outer: {
          inner: 1,
        },
      }
    `,
    name: 'nested objects valid',
  },
  {
    code: dedent`
      const obj = {
        foo,
        bar,
      }
    `,
    name: 'multi-line shorthand',
  },
]

const invalid = [
  {
    code: 'const x = {foo,\n  bar: 2}',
    errors: [
      {messageId: 'braceOnPropertyLine'},
      {messageId: 'braceOnPropertyLine'},
    ],
    name: 'brace on property line - shorthand then key-value',
    output: 'const x = {\nfoo,\n  bar: 2,\n  }',
  },
  {
    code: 'const x = {foo: 1,\n  bar: 2}',
    errors: [
      {messageId: 'braceOnPropertyLine'},
      {messageId: 'braceOnPropertyLine'},
    ],
    name: 'brace on property line - key-value',
    output: 'const x = {\nfoo: 1,\n  bar: 2,\n  }',
  },
  {
    code: 'const x = {\n  foo: 1,\n  bar: 2}',
    errors: [{messageId: 'braceOnPropertyLine'}],
    name: 'closing brace on property line',
    output: 'const x = {\n  foo: 1,\n  bar: 2,\n  }',
  },
  {
    code: 'const x = {foo,\n  bar}',
    errors: [
      {messageId: 'braceOnPropertyLine'},
      {messageId: 'braceOnPropertyLine'},
    ],
    name: 'shorthand properties multi-line',
    output: 'const x = {\nfoo,\n  bar,\n  }',
  },
] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'brace-style-object-literal',
  braceStyleObjectLiteral,
  {invalid, valid},
)
