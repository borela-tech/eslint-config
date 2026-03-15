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

const sideEffectValid = [
  {code: "import 'bar'"},
]

const sideEffectInvalid = [
  {
    code: dedent`
      import 'bbb'
      import 'aaa'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import 'aaa'
      import 'bbb'
    `,
  },
]

const namedValid = [
  {code: "import {foo} from 'bar'"},
  {code: "import {a, b, c} from 'bar'"},
  {
    code: dedent`
      import {a} from 'ccc'
      import {b} from 'aaa'
      import {c} from 'bbb'
    `,
  },
]

const namedInvalid = [
  {
    code: dedent`
      import {c, a, b} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      import {a, b, c} from 'bar'
    `,
  },
  {
    code: dedent`
      import {z, a} from 'bar'
    `,
    errors: [{messageId: 'sortedNames'}],
    output: dedent`
      import {a, z} from 'bar'
    `,
  },
  {
    code: dedent`
      import {existsSync} from 'fs'
      import {basename} from 'path'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import {basename} from 'path'
      import {existsSync} from 'fs'
    `,
  },
  {
    code: dedent`
      import {b} from 'b'
      const x = 1
      import {c} from 'c'
      import {a} from 'a'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import {b} from 'b'
      const x = 1
      import {a} from 'a'
      import {c} from 'c'
    `,
  },
  {
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
  },
]

const defaultValid = [
  {code: "import foo from 'bar'"},
]

const defaultInvalid = [
  {
    code: dedent`
      import foo from 'aaa'
      import bar from 'bbb'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import bar from 'bbb'
      import foo from 'aaa'
    `,
  },
]

const namespaceValid = [
  {code: "import * as fs from 'fs'"},
]

const namespaceInvalid = [
  {
    code: dedent`
      import * as path from 'path'
      import * as fs from 'fs'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import * as fs from 'fs'
      import * as path from 'path'
    `,
  },
]

const typeImportValid = [
  {code: "import type {Foo} from 'bar'"},
  {
    code: dedent`
      import type {X} from 'xxx'
      import type {Y} from 'yyy'
    `,
  },
  {
    code: dedent`
      import type * as ns from 'namespace'
      import type ts from 'typescript'
      import type {Maybe} from '@lib/Maybe'
    `,
  },
  {code: "import type foo from 'bar'"},
  {code: "import type * as ns from 'namespace'"},
]

const typeImportInvalid = [
  {
    code: dedent`
      import type {Y} from 'yyy'
      import type {X} from 'xxx'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import type {X} from 'xxx'
      import type {Y} from 'yyy'
    `,
  },
  {
    code: dedent`
      import type {z} from 'z'
      import type {a} from 'a'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import type {a} from 'a'
      import type {z} from 'z'
    `,
  },
  {
    code: dedent`
      import type foo from 'z'
      import type bar from 'a'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import type bar from 'a'
      import type foo from 'z'
    `,
  },
  {
    code: dedent`
      import type * as z from 'z'
      import type * as a from 'a'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import type * as a from 'a'
      import type * as z from 'z'
    `,
  },
  {
    code: dedent`
      import type {Foo} from 'bar'
      import {baz} from 'qux'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import {baz} from 'qux'
      import type {Foo} from 'bar'
    `,
  },
]

const groupOrderingInvalid = [
  {
    code: dedent`
      import foo from 'bar'
      import 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import 'baz'
      import foo from 'bar'
    `,
  },
  {
    code: dedent`
      import {a} from 'bar'
      import foo from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import foo from 'baz'
      import {a} from 'bar'
    `,
  },
  {
    code: dedent`
      import {b, a} from 'bar'
      import foo from 'baz'
    `,
    errors: [
      {messageId: 'sortedNames'},
      {messageId: 'wrongGroup'},
    ],
    output: dedent`
      import foo from 'baz'
      import {a, b} from 'bar'
    `,
  },
  {
    code: dedent`
      import {foo} from 'bar'
      import * as fs from 'fs'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import * as fs from 'fs'
      import {foo} from 'bar'
    `,
  },
  {
    code: dedent`
      import foo from 'bar'
      import * as fs from 'fs'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import * as fs from 'fs'
      import foo from 'bar'
    `,
  },
  {
    code: dedent`
      import type foo from 'bar'
      import foo2 from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import foo2 from 'baz'
      import type foo from 'bar'
    `,
  },
  {
    code: dedent`
      import type * as ns from 'bar'
      import * as ns2 from 'baz'
    `,
    errors: [{messageId: 'wrongGroup'}],
    output: dedent`
      import * as ns2 from 'baz'
      import type * as ns from 'bar'
    `,
  },
]

const mixedValid = [
  {code: ''},
  {code: 'const x = 1'},
  {
    code: dedent`
      import 'aaa'
      import 'bbb'
      import * as fs from 'fs'
      import * as path from 'path'
      import bar from 'bbb'
      import foo from 'aaa'
      import {a} from 'aaa'
      import {b} from 'bbb'
      import type {X} from 'xxx'
      import type {Y} from 'yyy'
    `,
  },
]

const mixedInvalid = [
  {
    code: dedent`
      import 'd'
      import 'c'
      import 'b'
      import 'a'
    `,
    errors: [
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import 'a'
      import 'b'
      import 'c'
      import 'd'
    `,
  },
  {
    code: dedent`
      import type {Z} from 'z'
      import * as Y from 'y'
      import {z} from 'z'
      import y from 'y'
      import 'sideEffectZ'
      import 'sideEffectA'
    `,
    errors: [
      {messageId: 'wrongGroup'},
      {messageId: 'wrongGroup'},
      {messageId: 'wrongGroup'},
      {messageId: 'wrongGroup'},
      {messageId: 'sortedImports'},
      {messageId: 'wrongGroup'},
      {messageId: 'sortedImports'},
    ],
    output: dedent`
      import 'sideEffectA'
      import 'sideEffectZ'
      import * as Y from 'y'
      import y from 'y'
      import {z} from 'z'
      import type {Z} from 'z'
    `,
  },
]

ruleTester.run('sorted-imports', rule, {
  invalid: [
    ...sideEffectInvalid,
    ...namedInvalid,
    ...defaultInvalid,
    ...namespaceInvalid,
    ...typeImportInvalid,
    ...groupOrderingInvalid,
    ...mixedInvalid,
  ],
  valid: [
    ...sideEffectValid,
    ...namedValid,
    ...defaultValid,
    ...namespaceValid,
    ...typeImportValid,
    ...mixedValid,
  ],
})
