import {dedent} from './dedent'
import {importsAndReExportsAtTop} from '../importsAndReExportsAtTop'
import {RuleTester} from '@typescript-eslint/rule-tester'

const importsAtTopValid = [{
  code: dedent`
    import {a} from 'aaa'
    export {a} from 'aaa'
    const c = 1
  `,
  name: 'import then re-export then code',
}, {
  code: dedent`
    import {a} from 'aaa'
    import {b} from 'bbb'
    export {c} from 'ccc'
  `,
  name: 'imports then re-export',
}, {
  code: dedent`
    import {a} from 'aaa'
    const c = 1
    function foo() {}
  `,
  name: 'import then code',
}, {
  code: dedent`
    export {a} from 'aaa'
    export * from 'bbb'
    const c = 1
  `,
  name: 're-exports then code',
}, {
  code: dedent`
    const c = 1
    function foo() {}
  `,
  name: 'just code no imports',
}, {
  code: dedent`
    import {a} from 'aaa'
  `,
  name: 'single import',
}, {
  code: dedent`
    export {a} from 'aaa'
  `,
  name: 'single re-export',
}, {
  code: '',
  name: 'empty',
}] as const

const importsAtTopInvalid = [{
  code: dedent`
    export {z} from 'zzz'
    const c = 1
    import {a} from 'aaa'
    function foo() {}
    export {b} from 'bbb'
  `,
  errors: [{messageId: 'importsAndReExportsAtTop'}],
  name: 'multiple issues out of order',
  output: dedent`
    import {a} from 'aaa'
    export {z} from 'zzz'
    export {b} from 'bbb'
    const c = 1
    function foo() {}
  `,
}, {
  code: dedent`
    const a = 1
    import {b} from 'bbb'
    export {c} from 'ccc'
  `,
  errors: [{messageId: 'importsAndReExportsAtTop'}],
  name: 'code before import',
  output: dedent`
    import {b} from 'bbb'
    export {c} from 'ccc'
    const a = 1
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run('imports-and-re-exports-at-top', importsAndReExportsAtTop, {
  invalid: [
    ...importsAtTopInvalid,
  ],
  valid: [
    ...importsAtTopValid,
  ],
})
