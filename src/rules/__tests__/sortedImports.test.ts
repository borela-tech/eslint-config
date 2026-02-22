import typescript from 'typescript-eslint'
import {RuleTester} from 'eslint'
import {sortedImports} from '../sortedImports'
import {dedent} from './dedent'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('sorted-imports', sortedImports, {
  valid: [{
    code: "import {foo} from 'bar'",
  }, {
    code: "import foo from 'bar'",
  }, {
    code: "import 'bar'",
  }, {
    code: dedent`
      import 'aaa'
      import 'bbb'
      import bar from 'bbb'
      import foo from 'aaa'
      import {a} from 'aaa'
      import {b} from 'bbb'
    `,
  }, {
    code: dedent`
      import {a} from 'ccc'
      import {b} from 'aaa'
      import {c} from 'bbb'
    `,
  }, {
    code: dedent`
      import {a, b, c} from 'bar'
    `,
  }, {
    code: '',
  }, {
    code: 'const x = 1',
  }],
  invalid: [{
    code: dedent`
      import {c, a, b} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      import { a, b, c } from 'bar'
    `,
  }, {
    code: dedent`
      import {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      import { a, z } from 'bar'
    `,
  }, {
    code: dedent`
      import foo from 'aaa'
      import bar from 'bbb'
    `,
    errors: [{messageId: 'sortedImports'}, {messageId: 'sortedImports'}],
    output: dedent`
      import bar from 'bbb'
      import foo from 'aaa'
    `,
  }, {
    code: dedent`
      import 'bbb'
      import 'aaa'
    `,
    errors: [{messageId: 'sortedImports'}, {messageId: 'sortedImports'}],
    output: dedent`
      import 'aaa'
      import 'bbb'
    `,
  }, {
    code: dedent`
      import foo from 'bar'
      import 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import 'baz'
      import foo from 'bar'
    `,
  }, {
    code: dedent`
      import {a} from 'bar'
      import foo from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import foo from 'baz'
      import {a} from 'bar'
    `,
  }, {
    code: dedent`
      import {b, a} from 'bar'
      import foo from 'baz'
    `,
    errors: [{messageId: 'sortedNames'}, {messageId: 'wrongGroup'}],
    output: dedent`
      import foo from 'baz'
      import { a, b } from 'bar'
    `,
  }],
})
