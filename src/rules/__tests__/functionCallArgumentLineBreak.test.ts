import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {functionCallArgumentLineBreak} from '../functionCallArgumentLineBreak'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'foo(bar)',
  name: 'single arg',
}, {
  code: 'foo(bar, baz)',
  name: 'two args',
}, {
  code: 'foo(bar, baz, qux)',
  name: 'three args',
}, {
  code: dedentAndStrip`
    foo(
      bar,
      baz
    )
  `,
  name: 'already multiline',
}, {
  code: 'obj.foo(bar)',
  name: 'method call single arg',
}, {
  code: 'obj.foo(bar, baz)',
  name: 'method call two args',
}, {
  code: 'foo?.(bar)',
  name: 'optional call single arg',
}, {
  code: 'foo(bar)',
  name: 'with custom maxLength',
  options: [{maxLength: 11}],
}, {
  code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
  name: 'long call fits within maxLength',
  options: [{maxLength: 85}],
}, {
  code: dedentAndStrip`
    describe('field model', () => {
      it('throws when a different field is registered under an existing key', () => {
        expect(1).toBe(1)
      })
    })
  `,
  name: 'jest test call ignored - handled by single-line-test-description',
  options: [{maxLength: 60}],
}, {
  code: "it('short desc', () => {})",
  name: 'jest it short desc',
  options: [{maxLength: 60}],
}, {
  code: "test('short', () => {})",
  name: 'jest test short desc',
}, {
  code: "describe('short', () => {})",
  name: 'jest describe short desc',
}, {
  code: "it.only('short', () => {})",
  name: 'jest it.only short desc',
}, {
  code: "test.skip('short', () => {})",
  name: 'jest test.skip short desc',
}] as const

const invalid = [{
  code: 'fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(bar, baz)',
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'long call two args same line',
  options: [{maxLength: 79}],
  output: dedentAndStrip`
    fooWithVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameHereNowTestCallExpr(
      bar,
      baz
    )
  `,
}, {
  code: 'fooBarBazQuxQuxBarBazQuxQuxBarBazQuxBarBazQuux(bar)',
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'single arg exceeds maxLength',
  options: [{maxLength: 50}],
}, {
  code: dedentAndStrip`
    foo(
      barVeryVeryVeryVeryVeryVeryVeryLong, bazVeryVeryVeryVeryVeryVeryVeryLong
    )
  `,
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'multiline but args same line',
  options: [{maxLength: 60}],
  output: dedentAndStrip`
    foo(
      barVeryVeryVeryVeryVeryVeryVeryLong,
      bazVeryVeryVeryVeryVeryVeryVeryLong
    )
  `,
}, {
  code: dedentAndStrip`
    import {x} from './x'

    foo(
      barVeryVeryVeryVeryVeryVeryVeryLong, bazVeryVeryVeryVeryVeryVeryVeryLong
    )
  `,
  errors: [{messageId: 'multipleOnSameLine'}],
  name: 'multiline but args same line with import at top of file',
  options: [{maxLength: 60}],
  output: dedentAndStrip`
    import {x} from './x'

    foo(
      barVeryVeryVeryVeryVeryVeryVeryLong,
      bazVeryVeryVeryVeryVeryVeryVeryLong
    )
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'function-call-argument-line-break',
  functionCallArgumentLineBreak,
  {invalid, valid},
)
