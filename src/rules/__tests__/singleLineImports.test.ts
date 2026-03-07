import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {singleLineImports} from '../singleLineImports'
import type {Rule} from 'eslint'

const rule = singleLineImports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('single-line-imports', rule, {
  valid: [{
    code: "import {foo} from 'bar'",
  }, {
    code: "import foo from 'bar'",
  }, {
    code: "import * as foo from 'bar'",
  }, {
    code: "import 'bar'",
  }, {
    code: "import type {Foo} from 'bar'",
  }, {
    code: "import foo, {bar} from 'baz'",
  }, {
    code: "import {a, b, c} from 'bar'",
  }, {
    code: "import {foo} from 'bar' with {type: 'json'}",
  }, {
    code: "import type {Foo} from 'bar' with {type: 'json'}",
  }],
  invalid: [{
    code: dedent`
      import {
        foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import {foo} from 'bar'
    `,
  }, {
    code: dedent`
      import type {
        Foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import type {Foo} from 'bar'
    `,
  }, {
    code: dedent`
      import {
        a,
        b,
        c,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import {a, b, c} from 'bar'
    `,
  }, {
    code: dedent`
      import foo, {
        bar,
      } from 'baz'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import foo, {bar} from 'baz'
    `,
  }, {
    code: dedent`
      import
        foo
        from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import foo from 'bar'
    `,
  }, {
    code: dedent`
      import * as foo
        from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import * as foo from 'bar'
    `,
  }, {
    code: dedent`
      import
        'bar'
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import 'bar'
    `,
  }, {
    code: dedent`
      import {
        foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import {foo} from 'bar' with {type: 'json'}
    `,
  }, {
    code: dedent`
      import type {
        Foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    output: dedent`
      import type {Foo} from 'bar' with {type: 'json'}
    `,
  }],
})
