import typescript from 'typescript-eslint'
import {dedent} from './dedent'
import {RuleTester} from 'eslint'
import {sortedImports} from '../sortedImports'
import type {Rule} from 'eslint'

const rule = sortedImports as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

ruleTester.run('sorted-imports', rule, {
  valid: [{
    code: "import {foo} from 'bar'",
  }, {
    code: "import foo from 'bar'",
  }, {
    code: "import 'bar'",
  }, {
    code: "import type {Foo} from 'bar'",
  }, {
    code: dedent`
      import 'aaa'
      import 'bbb'
      import bar from 'bbb'
      import foo from 'aaa'
      import {a} from 'aaa'
      import {b} from 'bbb'
      import type {X} from 'xxx'
      import type {Y} from 'yyy'
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
      import {a, b, c} from 'bar'
    `,
  }, {
    code: dedent`
      import {b} from 'b'
      const x = 1
      import {c} from 'c'
      import {a} from 'a'
    `,
    errors: [{messageId: 'sortedImports'}, {messageId: 'sortedImports'}],
    output: dedent`
      import {b} from 'b'
      const x = 1
      import {a} from 'a'
      import {c} from 'c'
    `,
  }, {
    code: dedent`
      import {b} from 'b'
      import {a} from 'a'
      const x = 1
      import {d} from 'd'
      import {c} from 'c'
      const y = 2
      import {f} from 'f'
      import {e} from 'e'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import {a} from 'a'
      import {b} from 'b'
      const x = 1
      import {c} from 'c'
      import {d} from 'd'
      const y = 2
      import {e} from 'e'
      import {f} from 'f'
    `,
  }, {
    code: dedent`
      import {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      import {a, z} from 'bar'
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
      import {a, b} from 'bar'
    `,
  }, {
    code: dedent`
      import type {Y} from 'yyy'
      import type {X} from 'xxx'
    `,
    errors: [{messageId: 'sortedImports'}, {messageId: 'sortedImports'}],
    output: dedent`
      import type {X} from 'xxx'
      import type {Y} from 'yyy'
    `,
  }, {
    code: dedent`
      import type {Foo} from 'bar'
      import {baz} from 'qux'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import {baz} from 'qux'
      import type {Foo} from 'bar'
    `,
  }, {
    code: dedent`
      import {existsSync} from 'fs'
      import {basename} from 'path'
    `,
    errors: [{messageId: 'sortedImports'}, {messageId: 'sortedImports'}],
    output: dedent`
      import {basename} from 'path'
      import {existsSync} from 'fs'
    `,
  }],
})
