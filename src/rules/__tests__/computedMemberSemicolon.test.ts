import {computedMemberSemicolon} from '../computedMemberSemicolon'
import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      [Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
  name: 'field with trailing semicolon before computed member',
}, {
  code: dedentAndStrip`
    class Foo {
      constructor() {}

      [Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
      }
    }
  `,
  name: 'computed member after constructor',
}, {
  code: dedentAndStrip`
    class Foo {
      * [Symbol.iterator](): Iterator<number> {
        yield 1
      }
    }
  `,
  name: 'generator computed member as first member',
}, {
  code: dedentAndStrip`
    class Foo {
      get length(): number {
        return 0
      }

      [Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  name: 'computed member after accessor',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}

      [Symbol.toPrimitive](): string {
        return ''
      }
    }
  `,
  name: 'computed member after method',
}, {
  code: dedentAndStrip`
    class Foo {
      declare State: unknown;

      [Symbol.iterator](): Iterator<number> {
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
      [Symbol.iterator](): Iterator<number> { return this[Symbol.iterator]() }
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
  ],
  name: 'field without semicolon before computed member',
  output: dedentAndStrip`
    class Foo {
      protected __items: number[];

      [Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
      }
    }
  `,
}, {
  code: dedentAndStrip`
    class Foo {
      declare State: unknown

      [Symbol.iterator](): Iterator<number> {
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

      [Symbol.iterator](): Iterator<number> {
        return this[Symbol.iterator]()
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
  name: 'field without semicolon before computed member with leading semicolon',
  output: dedentAndStrip`
    class Foo {
      protected __items: number[] = [];

      ;[Symbol.iterator](): Iterator<number> {
        return this.__items[Symbol.iterator]()
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
