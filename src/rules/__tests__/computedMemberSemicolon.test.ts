import {computedMemberSemicolon} from '../computedMemberSemicolon'
import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: dedentAndStrip`
    class Foo {
      constructor() {}

      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
  name: 'leading semicolon after constructor',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
  name: 'leading semicolon after field with trailing semicolon',
}, {
  code: dedentAndStrip`
    class Foo {
      ;* [Symbol.iterator](): Iterator<number> {
        yield 1
      }
    }
  `,
  name: 'generator with leading semicolon as first member',
}, {
  code: dedentAndStrip`
    class Foo {
      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }

      ;[Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  name: 'consecutive computed members with leading semicolons',
}, {
  code: dedentAndStrip`
    class Foo {
      get length(): number {
        return 0
      }

      ;[Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  name: 'leading semicolon after accessor',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}

      ;[Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  name: 'leading semicolon after method',
}, {
  code: dedentAndStrip`
    class Foo {
      declare State: unknown;

      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
  name: 'declare field with trailing semicolon before computed member',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __items: number[] = []
    }
  `,
  name: 'field without computed member after it',
}, {
  code: dedentAndStrip`
    class Foo {
      ;[Symbol.iterator](): Iterator<number> { return this[Symbol.iterator]() }
      a = 1
    }
  `,
  name: 'field after computed member',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}
    }
  `,
  name: 'no computed members',
}] as const

const invalid = [{
  code: dedentAndStrip`
    class Foo {
      protected __items: number[]

      [Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
  errors: [
    {messageId: 'missingFieldSemicolon'},
    {messageId: 'missingLeadingSemicolon'},
  ],
  name: 'no semicolons around computed member',
  output: dedentAndStrip`
    class Foo {
      protected __items: number[];

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      protected __items: number[] = []

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
  errors: [
    {messageId: 'missingFieldSemicolon'},
  ],
  name: 'field without semicolon before computed member',
  output: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      [Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
  errors: [
    {messageId: 'missingLeadingSemicolon'},
  ],
  name: 'computed member without leading semicolon after field',
  output: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      constructor() {}

      [Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
  errors: [
    {messageId: 'missingLeadingSemicolon'},
  ],
  name: 'computed member after constructor without semicolon',
  output: dedentAndStrip`
    class Foo {
      constructor() {}

      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      constructor() {}

      * [Symbol.iterator](): Iterator<number> {
        yield 1
      }
    }
  `,
  errors: [
    {messageId: 'missingLeadingSemicolon'},
  ],
  name: 'generator computed member without semicolon',
  output: dedentAndStrip`
    class Foo {
      constructor() {}

      ;* [Symbol.iterator](): Iterator<number> {
        yield 1
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      declare State: unknown

      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
  errors: [
    {messageId: 'missingFieldSemicolon'},
  ],
  name: 'declare field without semicolon before computed member',
  output: dedentAndStrip`
    class Foo {
      declare State: unknown;

      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }

      [Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  errors: [
    {messageId: 'missingLeadingSemicolon'},
  ],
  name: 'computed member after computed member without semicolon',
  output: dedentAndStrip`
    class Foo {
      ;[Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }

      ;[Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'computed-member-semicolon',
  computedMemberSemicolon,
  {invalid, valid},
)
