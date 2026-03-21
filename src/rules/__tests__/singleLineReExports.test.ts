import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {singleLineReExports} from '../singleLineReExports'
import type {Rule} from 'eslint'

const rule = singleLineReExports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const singleLineValid = [
  {
    code: "export {foo} from 'bar'",
    name: 'named re-export',
  },
  {
    code: "export * from 'bar'",
    name: 'all re-export',
  },
  {
    code: "export * as foo from 'bar'",
    name: 'namespace re-export',
  },
  {
    code: "export type {Foo} from 'bar'",
    name: 'type re-export',
  },
  {
    code: "export {a, b, c} from 'bar'",
    name: 'multiple named re-exports',
  },
  {
    code: dedent`
      export {
        foo,
      }
    `,
    name: 'wrapped named re-export',
  },
  {
    code: "export {foo} from 'bar' with {type: 'json'}",
    name: 'named re-export with assertion',
  },
]

const multilineInvalid = [
  {
    code: dedent`
      export {
        foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'named re-export multiline',
    output: dedent`
      export {foo} from 'bar'
    `,
  },
  {
    code: dedent`
      export type {
        Foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'type re-export multiline',
    output: dedent`
      export type {Foo} from 'bar'
    `,
  },
  {
    code: dedent`
      export {
        a,
        b,
        c,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'multiple named re-exports multiline',
    output: dedent`
      export {a, b, c} from 'bar'
    `,
  },
  {
    code: `
      export {
        foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    name: 'named re-export multiline with assertion',
    output: `
      export {foo} from 'bar' with {type: 'json'}
    `,
  },
  {
    code: dedent`
      export *
      from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'all re-export multiline',
    output: dedent`
      export * from 'bar'
    `,
  },
  {
    code: dedent`
      export * as foo
      from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'namespace re-export multiline',
    output: dedent`
      export * as foo from 'bar'
    `,
  },
]

ruleTester.run('single-line-re-exports', rule, {
  invalid: [
    ...multilineInvalid,
  ],
  valid: [
    ...singleLineValid,
  ],
})
