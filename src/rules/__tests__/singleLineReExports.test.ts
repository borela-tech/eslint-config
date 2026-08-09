import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {singleLineReExports} from '../singleLineReExports'

const singleLineValid = [{
  code: "export {foo} from 'bar'",
  name: 'named re-export',
}, {
  code: "export * from 'bar'",
  name: 'all re-export',
}, {
  code: "export * as foo from 'bar'",
  name: 'namespace re-export',
}, {
  code: "export type {Foo} from 'bar'",
  name: 'type re-export',
}, {
  code: "export {a, b, c} from 'bar'",
  name: 'multiple named re-exports',
}, {
  code: dedentAndStrip`
    export {
      foo,
    }
  `,
  name: 'wrapped named re-export',
}, {
  code: "export {foo} from 'bar' with {type: 'json'}",
  name: 'named re-export with assertion',
}] as const

const multilineInvalid = [{
  code: dedentAndStrip`
    export {
      foo,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'named re-export multiline',
  output: dedentAndStrip`
    export {foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export type {
      Foo,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'type re-export multiline',
  output: dedentAndStrip`
    export type {Foo} from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export {
      a,
      b,
      c,
    } from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'multiple named re-exports multiline',
  output: dedentAndStrip`
    export {a, b, c} from 'bar'
  `,
}, {
  code: `
      export {
        foo,
      } from 'bar' with {type: 'json'}
    `,
  errors: [{messageId: 'multiline'}],
  name: 'named re-export multiline with assertion',
  output: `
      export {foo} from 'bar' with {type: 'json'}
    `,
}, {
  code: dedentAndStrip`
    export *
    from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'all re-export multiline',
  output: dedentAndStrip`
    export * from 'bar'
  `,
}, {
  code: dedentAndStrip`
    export * as foo
    from 'bar'
  `,
  errors: [{messageId: 'multiline'}],
  name: 'namespace re-export multiline',
  output: dedentAndStrip`
    export * as foo from 'bar'
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('single-line-re-exports', singleLineReExports, {
  invalid: [
    ...multilineInvalid,
  ],
  valid: [
    ...singleLineValid,
  ],
})
