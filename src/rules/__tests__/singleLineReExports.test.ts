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

ruleTester.run('single-line-re-exports', rule, {
  valid: [{
    code: "export {foo} from 'bar'",
  }, {
    code: "export * from 'bar'",
  }, {
    code: "export * as foo from 'bar'",
  }, {
    code: "export type {Foo} from 'bar'",
  }, {
    code: "export {a, b, c} from 'bar'",
  }, {
    // Local export, not a re-export
    code: dedent`
      export {
        foo,
      }
    `,
  }, {
    code: "export {foo} from 'bar' with {type: 'json'}",
  }],
  invalid: [{
    code: dedent`
      export {
        foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      export {foo} from 'bar'
    `,
  }, {
    code: dedent`
      export type {
        Foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      export type {Foo} from 'bar'
    `,
  }, {
    code: dedent`
      export {
        a,
        b,
        c,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      export {a, b, c} from 'bar'
    `,
  }, {
    code: `
      export {
        foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    output: `
      export {foo} from 'bar' with {type: 'json'}
    `,
  }, {
    code: dedent`
      export *
      from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      export * from 'bar'
    `,
  }, {
    code: dedent`
      export * as foo
      from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      export * as foo from 'bar'
    `,
  }],
})
