import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {individualImports} from '../individualImports'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = individualImports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('individual-imports', rule, {
  valid: [{
    code: "import {foo} from 'bar'",
  }, {
    code: "import foo from 'bar'",
  }, {
    code: "import * as foo from 'bar'",
  }, {
    code: "import 'bar'",
  }],
  invalid: [{
    code: "import {foo, bar} from 'baz'",
    errors: [{messageId: 'individualImports'}],
    output: dedent`
      import {foo} from 'baz'
      import {bar} from 'baz'
    `,
  }, {
    code: "import {foo, bar, baz} from 'qux'",
    errors: [{messageId: 'individualImports'}],
    output: dedent`
      import {foo} from 'qux'
      import {bar} from 'qux'
      import {baz} from 'qux'
    `,
  }],
})
