import typescript from 'typescript-eslint'
import {RuleTester} from 'eslint'
import {individualImports} from '../individualImports'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('individual-imports', individualImports, {
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
    output: "import {foo} from 'baz'\nimport {bar} from 'baz'",
  }, {
    code: "import {foo, bar, baz} from 'qux'",
    errors: [{messageId: 'individualImports'}],
    output: "import {foo} from 'qux'\nimport {bar} from 'qux'\nimport {baz} from 'qux'",
  }],
})
