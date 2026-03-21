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

const singleLineValid = [
  {code: "import {foo} from 'bar'",
    name: 'named import'},
  {code: "import foo from 'bar'",
    name: 'default import'},
  {code: "import * as foo from 'bar'",
    name: 'namespace import'},
  {code: "import 'bar'",
    name: 'side effect import'},
  {code: "import type {Foo} from 'bar'",
    name: 'type import'},
  {code: "import foo, {bar} from 'baz'",
    name: 'default and named import'},
  {code: "import {a, b, c} from 'bar'",
    name: 'multiple named imports'},
  {code: "import {foo} from 'bar' with {type: 'json'}",
    name: 'named import with assertion'},
  {code: "import type {Foo} from 'bar' with {type: 'json'}",
    name: 'type import with assertion'},
]

const multilineInvalid = [
  {
    code: dedent`
      import {
        foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'named import multiline',
    output: dedent`
      import {foo} from 'bar'
    `,
  },
  {
    code: dedent`
      import type {
        Foo,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'type import multiline',
    output: dedent`
      import type {Foo} from 'bar'
    `,
  },
  {
    code: dedent`
      import {
        a,
        b,
        c,
      } from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'multiple named imports multiline',
    output: dedent`
      import {a, b, c} from 'bar'
    `,
  },
  {
    code: dedent`
      import foo, {
        bar,
      } from 'baz'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'default and named import multiline',
    output: dedent`
      import foo, {bar} from 'baz'
    `,
  },
  {
    code: dedent`
      import
        foo
        from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'default import multiline separate lines',
    output: dedent`
      import foo from 'bar'
    `,
  },
  {
    code: dedent`
      import * as foo
        from 'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'namespace import multiline',
    output: dedent`
      import * as foo from 'bar'
    `,
  },
  {
    code: dedent`
      import
        'bar'
    `,
    errors: [{messageId: 'multiline'}],
    name: 'side effect import multiline',
    output: dedent`
      import 'bar'
    `,
  },
  {
    code: dedent`
      import {
        foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    name: 'named import multiline with assertion',
    output: dedent`
      import {foo} from 'bar' with {type: 'json'}
    `,
  },
  {
    code: dedent`
      import type {
        Foo,
      } from 'bar' with {type: 'json'}
    `,
    errors: [{messageId: 'multiline'}],
    name: 'type import multiline with assertion',
    output: dedent`
      import type {Foo} from 'bar' with {type: 'json'}
    `,
  },
]

ruleTester.run('single-line-imports', rule, {invalid: [
  ...multilineInvalid,
],
valid: [
  ...singleLineValid,
]})
