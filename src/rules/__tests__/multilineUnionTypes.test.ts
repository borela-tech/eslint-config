import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {multilineUnionTypes} from '../multilineUnionTypes'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = multilineUnionTypes as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const unionTypeValid = [
  {code: 'type A = B'},
  {
    code: dedent`
      type A = 
        | B
        | C
    `,
  },
  {
    code: dedent`
      export type A = 
        | B
        | C
        | D
    `,
  },
]

const unionTypeInvalid = [
  {
    code: 'type A = B | C | D',
    errors: [{messageId: 'singleLine'}],
    output: dedent`
      type A = 
        | B
        | C
        | D
    `,
  },
  {
    code: dedent`
      type A = B | 
        C | 
        D
    `,
    errors: [{messageId: 'missingPipes'}],
    output: dedent`
      type A = 
        | B
        | C
        | D
    `,
  },
  {
    code: 'type A = string | number | boolean',
    errors: [{messageId: 'singleLine'}],
    output: dedent`
      type A = 
        | string
        | number
        | boolean
    `,
  },
  {
    code: 'export type Foo = Bar | Baz',
    errors: [{messageId: 'singleLine'}],
    output: dedent`
      export type Foo = 
        | Bar
        | Baz
    `,
  },
]

ruleTester.run('multiline-union-types', rule, {
  valid: [
    ...unionTypeValid,
  ],
  invalid: [
    ...unionTypeInvalid,
  ],
})
