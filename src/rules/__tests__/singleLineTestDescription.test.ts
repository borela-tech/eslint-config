import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'
import {singleLineTestDescription} from '../singleLineTestDescription'

const valid = [{
  code: "it('short desc', () => {})",
  name: 'it short single line',
}, {
  code: "test('short', () => {})",
  name: 'test short',
}, {
  code: "describe('short', () => {})",
  name: 'describe short',
}, {
  code: "it.only('short', () => {})",
  name: 'it.only',
}, {
  code: "test.skip('short', () => {})",
  name: 'test.skip',
}, {
  code: "describe.only('short', () => {})",
  name: 'describe.only',
}, {
  code: "it.each([[1, 2]])('short %d', () => {})",
  name: 'it.each',
}, {
  code: "describe.each([[1]])('short', () => {})",
  name: 'describe.each',
}, {
  code: "foo('very long string that would exceed max length if it were a jest test but is not jest', () => {})",
  name: 'non-jest long call ignored',
  options: [{maxLength: 60}],
}, {
  code: 'it(variableDesc, () => {})',
  name: 'dynamic description ignored',
  options: [{maxLength: 10}],
}, {
  code: 'it(`short`, () => {})',
  name: 'template literal short',
}, {
  code: dedentAndStrip`
    it('short', () => {
      expect(1).toBe(1)
    })
  `,
  name: 'multiline body but single line call',
}] as const

const invalid = [{
  code: "it('throws when a different field is registered under an existing key', () => {})",
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'it long desc exceeds maxLength single line',
  options: [{maxLength: 60}],
}, {
  code: "describe('a very long description that definitely exceeds the eighty character limit for sure', () => {})",
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'describe long single line',
}, {
  code: dedentAndStrip`
    it(
      'throws when a different field is registered under an existing key',
      () => {}
    )
  `,
  errors: [{messageId: 'multiline'}],
  name: 'it multiline must be single line',
  options: [{maxLength: 80}],
}, {
  code: dedentAndStrip`
    describe('field model', () => {
      it(
        'throws when a different field is registered under an existing key',
        () => {
        expect(1).toBe(1)
      })
    })
  `,
  errors: [{messageId: 'multiline'}],
  name: 'multiline jest call from previous auto-fix',
  options: [{maxLength: 60}],
}, {
  code: "it.only('a very long description that exceeds max length for only modifier case here', () => {})",
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'it.only long',
  options: [{maxLength: 60}],
}, {
  code: "test.skip('a very long description that exceeds max length for skip modifier', () => {})",
  errors: [{messageId: 'exceedsMaxLength'}],
  name: 'test.skip long',
  options: [{maxLength: 60}],
}, {
  code: dedentAndStrip`
    it.each([[1]])(
      'a very long description that should be single line',
      () => {}
    )
  `,
  errors: [{messageId: 'multiline'}],
  name: 'it.each multiline',
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'single-line-test-description',
  singleLineTestDescription,
  {invalid, valid},
)
