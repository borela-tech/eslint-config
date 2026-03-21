import {arrayItemsLineBreak} from '../arrayItemsLineBreak'
import {dedent} from './dedent'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: 'const a = [item]',
  name: 'single item',
}, {
  code: 'const a = [foo, bar]',
  name: 'two items under limit',
}, {
  code: 'const a = [foo, bar, baz]',
  name: 'three items under limit',
}, {
  code: dedent`
    const a = [
      foo,
      bar,
    ]
  `,
  name: 'already multiline',
}, {
  code: 'const a = []',
  name: 'empty array',
}, {
  code: 'const a = [veryLongItemNameOne, veryLongItemNameTwo]',
  name: 'two items with custom maxLength',
  options: [{maxLength: 60}],
}, {
  code: 'const a = [item1, item2, item3, item4]',
  name: 'four items under default limit',
}] as const

const invalid = [{
  code: 'const veryLongArrayNameHere = [veryLongItemNameOne, veryLongItemNameTwo, veryLongItemNameThree]',
  errors: [{messageId: 'arrayItemsOnNewLine'}],
  name: 'long array over limit',
  output: dedent`
    const veryLongArrayNameHere = [
      veryLongItemNameOne,
      veryLongItemNameTwo,
      veryLongItemNameThree,
    ]
  `,
}, {
  code: 'const someArrayHere = [veryLongItemNameOne, veryLongItemNameTwo, veryLongItemNameThree]',
  errors: [{messageId: 'arrayItemsOnNewLine'}],
  name: 'array with shorter name but long items',
  output: dedent`
    const someArrayHere = [
      veryLongItemNameOne,
      veryLongItemNameTwo,
      veryLongItemNameThree,
    ]
  `,
}, {
  code: 'const a = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10]',
  errors: [{messageId: 'arrayItemsOnNewLine'}],
  name: 'many items exceeding default limit',
  output: dedent`
    const a = [
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      item7,
      item8,
      item9,
      item10,
    ]
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'array-items-line-break',
  arrayItemsLineBreak,
  {invalid, valid},
)
