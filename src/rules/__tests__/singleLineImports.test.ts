import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {singleLineImports} from '../singleLineImports'

const singleLineValid = [{
  code: "import {foo} from 'bar'",
  name: 'named import',
}, {
  code: "import foo from 'bar'",
  name: 'default import',
}, {
  code: "import * as foo from 'bar'",
  name: 'namespace import',
}, {
  code: "import 'bar'",
  name: 'side effect import',
}, {
  code: "import type {Foo} from 'bar'",
  name: 'type import',
}, {
  code: "import foo, {bar} from 'baz'",
  name: 'default and named import',
}, {
  code: "import {a, b, c} from 'bar'",
  name: 'multiple named imports',
}, {
  code: "import {foo} from 'bar' with {type: 'json'}",
  name: 'named import with assertion',
}, {
  code: "import type {Foo} from 'bar' with {type: 'json'}",
  name: 'type import with assertion',
}] as const

const multilineInvalid = [{
  code: dedentAndStrip`
    import {
      foo,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'named import multiline',
  output: dedentAndStrip`
    import {foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    import type {
      Foo,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'type import multiline',
  output: dedentAndStrip`
    import type {Foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    import {
      a,
      b,
      c,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'multiple named imports multiline',
  output: dedentAndStrip`
    import {a, b, c} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    import foo, {
      bar,
    } from 'baz'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'default and named import multiline',
  output: dedentAndStrip`
    import foo, {bar} from 'baz'
  `,
}, {
  code: dedentAndStrip`
    import
      foo
      from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'default import multiline separate lines',
  output: dedentAndStrip`
    import foo from 'bar'
  `,
}, {
  code: dedentAndStrip`
    import * as foo
      from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'namespace import multiline',
  output: dedentAndStrip`
    import * as foo from 'bar'
  `,
}, {
  code: dedentAndStrip`
    import
      'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'side effect import multiline',
  output: dedentAndStrip`
    import 'bar'
  `,
}, {
  code: dedentAndStrip`
    import {
      foo,
    } from 'bar' with {type: 'json'}
  `,
  errors: [{messageId: 'multiline'}],
  name: 'named import multiline with assertion',
  output: dedentAndStrip`
    import {foo} from 'bar' with {type: 'json'}
  `,
}, {
  code: dedentAndStrip`
    import type {
      Foo,
    } from 'bar' with {type: 'json'}
  `,
  errors: [{messageId: 'multiline'}],
  name: 'type import multiline with assertion',
  output: dedentAndStrip`
    import type {Foo} from 'bar' with {type: 'json'}
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('single-line-imports', singleLineImports, {
  invalid: [
    ...multilineInvalid,
  ],
  valid: [
    ...singleLineValid,
  ],
})
