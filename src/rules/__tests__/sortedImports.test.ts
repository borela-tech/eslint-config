import {dedent} from './dedent'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {sortedImports} from '../sortedImports'

const sideEffectValid = [{
  code: "import 'bar'",
  name: 'side effect import',
}] as const

const sideEffectInvalid = [{
  code: dedent`
    import 'bbb'
    import 'aaa'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'side effects out of order',
  output: dedent`
    import 'aaa'
    import 'bbb'
  `,
}] as const

const namedValid = [{
  code: "import {foo} from 'bar'",
  name: 'single named import',
}, {
  code: "import {a, b, c} from 'bar'",
  name: 'multiple named imports sorted',
}, {
  code: dedent`
    import {a} from 'ccc'
    import {b} from 'aaa'
    import {c} from 'bbb'
  `,
  name: 'named imports from multiple modules sorted',
}] as const

const namedInvalid = [{
  code: dedent`
    import {c, a, b} from 'bar'
  `,
  errors: [{messageId: 'sortedNames'}],
  name: 'named imports unsorted within braces',
  output: dedent`
    import {a, b, c} from 'bar'
  `,
}, {
  code: dedent`
    import {z, a} from 'bar'
  `,
  errors: [{messageId: 'sortedNames'}],
  name: 'named imports unsorted with z and a',
  output: dedent`
    import {a, z} from 'bar'
  `,
}, {
  code: dedent`
    import {existsSync} from 'fs'
    import {basename} from 'path'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'named imports from different modules out of order',
  output: dedent`
    import {basename} from 'path'
    import {existsSync} from 'fs'
  `,
}, {
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
  name: 'named imports unsorted after code',
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
  name: 'multiple groups of named imports unsorted',
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
}] as const

const defaultValid = [{
  code: "import foo from 'bar'",
  name: 'default import',
}] as const

const defaultInvalid = [{
  code: dedent`
    import foo from 'aaa'
    import bar from 'bbb'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'default imports out of order',
  output: dedent`
    import bar from 'bbb'
    import foo from 'aaa'
  `,
}] as const

const namespaceValid = [{
  code: "import * as fs from 'fs'",
  name: 'namespace import',
}] as const

const namespaceInvalid = [{
  code: dedent`
    import * as path from 'path'
    import * as fs from 'fs'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'namespace imports out of order',
  output: dedent`
    import * as fs from 'fs'
    import * as path from 'path'
  `,
}] as const

const typeImportValid = [{
  code: "import type {Foo} from 'bar'",
  name: 'type import named',
}, {
  code: dedent`
    import type {X} from 'xxx'
    import type {Y} from 'yyy'
  `,
  name: 'type imports sorted',
}, {
  code: dedent`
    import type * as ns from 'namespace'
    import type ts from 'typescript'
    import type {Maybe} from '@lib/Maybe'
  `,
  name: 'mixed type imports sorted',
}, {
  code: "import type foo from 'bar'",
  name: 'type import default',
}, {
  code: "import type * as ns from 'namespace'",
  name: 'type import namespace',
}] as const

const typeImportInvalid = [{
  code: dedent`
    import type {Y} from 'yyy'
    import type {X} from 'xxx'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'type imports out of order',
  output: dedent`
    import type {X} from 'xxx'
    import type {Y} from 'yyy'
  `,
}, {
  code: dedent`
    import type {z} from 'z'
    import type {a} from 'a'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'type imports out of order z then a',
  output: dedent`
    import type {a} from 'a'
    import type {z} from 'z'
  `,
}, {
  code: dedent`
    import type foo from 'z'
    import type bar from 'a'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'type default imports out of order',
  output: dedent`
    import type bar from 'a'
    import type foo from 'z'
  `,
}, {
  code: dedent`
    import type * as z from 'z'
    import type * as a from 'a'
  `,
  errors: [
    {messageId: 'sortedImports'},
    {messageId: 'sortedImports'},
  ],
  name: 'type namespace imports out of order',
  output: dedent`
    import type * as a from 'a'
    import type * as z from 'z'
  `,
}, {
  code: dedent`
    import type {Foo} from 'bar'
    import {baz} from 'qux'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type import after value import wrong group',
  output: dedent`
    import {baz} from 'qux'
    import type {Foo} from 'bar'
  `,
}] as const

const groupOrderingInvalid = [{
  code: dedent`
    import foo from 'bar'
    import 'baz'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'default import before side effect',
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
  name: 'named import before default import',
  output: dedent`
    import foo from 'baz'
    import {a} from 'bar'
  `,
}, {
  code: dedent`
    import {b, a} from 'bar'
    import foo from 'baz'
  `,
  errors: [
    {messageId: 'sortedNames'},
    {messageId: 'wrongGroup'},
  ],
  name: 'named unsorted and wrong group',
  output: dedent`
    import foo from 'baz'
    import {a, b} from 'bar'
  `,
}, {
  code: dedent`
    import {foo} from 'bar'
    import * as fs from 'fs'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'named import before namespace import',
  output: dedent`
    import * as fs from 'fs'
    import {foo} from 'bar'
  `,
}, {
  code: dedent`
    import foo from 'bar'
    import * as fs from 'fs'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'default import before namespace import',
  output: dedent`
    import * as fs from 'fs'
    import foo from 'bar'
  `,
}, {
  code: dedent`
    import type foo from 'bar'
    import foo2 from 'baz'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type default import before value default import',
  output: dedent`
    import foo2 from 'baz'
    import type foo from 'bar'
  `,
}, {
  code: dedent`
    import type * as ns from 'bar'
    import * as ns2 from 'baz'
  `,
  errors: [{messageId: 'wrongGroup'}],
  name: 'type namespace import before value namespace import',
  output: dedent`
    import * as ns2 from 'baz'
    import type * as ns from 'bar'
  `,
}] as const

const mixedValid = [{
  code: '',
  name: 'empty',
}, {
  code: 'const x = 1',
  name: 'just code',
}, {
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
  name: 'all groups properly sorted',
}] as const

const mixedInvalid = [{
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
  name: 'side effects unsorted',
  output: dedent`
    import 'a'
    import 'b'
    import 'c'
    import 'd'
  `,
}, {
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
  name: 'all groups wrong order and unsorted',
  output: dedent`
    import 'sideEffectA'
    import 'sideEffectZ'
    import * as Y from 'y'
    import y from 'y'
    import {z} from 'z'
    import type {Z} from 'z'
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('sorted-imports', sortedImports, {
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
