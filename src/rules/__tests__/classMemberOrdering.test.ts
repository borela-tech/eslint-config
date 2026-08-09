import {classMemberOrdering} from '../classMemberOrdering'
import {dedentAndStrip} from '@borela-tech/ts-toolbox'
import {RuleTester} from '@typescript-eslint/rule-tester'

const valid = [{
  code: dedentAndStrip`
    export class Inventory extends Store {
      declare State: InventoryState
      declare StateValue: number[]

      protected __itemFactory: ItemFactory
      protected __items: number[] = []

      constructor(options: InventoryOptions) {
        super(options)
      }

      ;* [Symbol.iterator](): Iterator<number> {
        yield
      }

      ;[Symbol.toPrimitive](): string {
        return ''
      }

      get childErrors(): readonly string[] {
        return []
      }

      get length(): number {
        return 0
      }

      at(index: number) {
        return null
      }

      clear() {}

      getState(): unknown {
        return null
      }

      protected get valueForValidation(): unknown {
        return this
      }

      protected afterRefresh() {}

      protected disposeItems() {}

      protected __elementValue() {}

      protected onChildChange = () => {}

      protected onUpdate() {}

      protected refreshScheduled = schedule(() => {})
    }
  `,
  name: 'Inventory-like class',
}, {
  code: dedentAndStrip`
    export class Catalog extends Store {
      declare Actions: unknown
      declare Fields: unknown
      declare State: unknown
      declare StateValue: unknown

      protected __actions: Record<string, Action> = {}
      protected __actionsList: Action[] = []
      protected __fields: Record<string, Item> = {}
      protected __fieldsList: Item[] = [];

      [Symbol.iterator](): Iterator<[string, Item]> {
        return Object.entries(this.__fields)[Symbol.iterator]()
      }

      get actions(): unknown {
        return {}
      }

      get fields(): unknown {
        return {}
      }

      boundRefresh = async () => {}

      static create(): Catalog {
        return new Catalog()
      }

      getState(): unknown {
        return null
      }

      patch(): this {
        return this
      }

      protected get valueForValidation(): unknown {
        return this
      }

      protected afterRefresh() {}

      protected disposeItems() {}

      protected onUpdate() {}

      protected registerField() {}
    }
  `,
  name: 'Catalog-like class',
}, {
  code: dedentAndStrip`
    export abstract class Store {
      declare State: unknown
      declare StateValue: unknown

      protected __disposed = false
      protected __options: StoreOptions
      protected __stateCache?: unknown
      protected __subscribers = new Map()

      constructor(options: StoreOptions = {}) {
        this.__options = options
      }

      get refreshDebounceTime(): number {
        return 0
      }

      get subscribers() {
        return this.__subscribers
      }

      boundGetState = () => this.getState()

      boundRefresh = () => this.refresh()

      dispose(): void {}

      abstract getState(): unknown

      notifySubscribers() {}

      protected afterRefresh() {}

      protected disposeItems() {}

      protected onUpdate() {}

      protected refreshScheduled = schedule(() => {})
    }
  `,
  name: 'Store-like class',
}, {
  code: dedentAndStrip`
    class Foo {
      public a = 1
      protected __b = 2
      private __c = 3

      constructor() {}
    }
  `,
  name: 'fields grouped by visibility',
}, {
  code: dedentAndStrip`
    class Foo {
      protected a = 1
      protected __b = 2
    }
  `,
  name: 'protected fields sorted ignoring __ prefix',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __b = 2
      private __a = 1
    }
  `,
  name: 'private group after protected group',
}, {
  code: dedentAndStrip`
    class Foo {
      constructor()
      constructor(x: number) {}
    }
  `,
  name: 'constructor overloads',
}, {
  code: dedentAndStrip`
    class Foo {
      filter<S>(p: (x: S) => boolean): S[]
      filter(p: (x: unknown) => boolean): unknown[] { return [] }
    }
  `,
  name: 'method overloads',
}, {
  code: dedentAndStrip`
    class Foo {
      get value() { return 1 }
      set value(v: number) {}
    }
  `,
  name: 'get before set',
}, {
  code: dedentAndStrip`
    class Foo {
      get readOnly() { return false }
      set readOnly(value: boolean) {}
      get warnings() { return [] }
    }
  `,
  name: 'accessor after get/set pair',
}, {
  code: dedentAndStrip`
    class Foo {
      ;[Symbol.iterator](): Iterator<number> { return this[Symbol.iterator]() }
      get length() { return 0 }
    }
  `,
  name: 'symbol before accessor',
}, {
  code: dedentAndStrip`
    class Foo {
      at(i: number) { return i }
      static clear() {}
    }
  `,
  name: 'static method sorted among public methods',
}, {
  code: dedentAndStrip`
    class Foo {
      bar() {}
      onChildChange = () => {}
      zebra() {}
    }
  `,
  name: 'arrow property sorted among methods',
}, {
  code: dedentAndStrip`
    abstract class Foo {
      abstract get value(): number
      abstract patch(v: number): void
    }
  `,
  name: 'abstract members in own visibility',
}, {
  code: dedentAndStrip`
    class Foo {
      protected after() {}
      private zebra() {}
    }
  `,
  name: 'private group after protected group',
}, {
  code: dedentAndStrip`
    class Foo {
      protected disposeOutbound() {}
      protected __elementValue() {}
    }
  `,
  name: 'protected methods sorted ignoring __ prefix',
}, {
  code: dedentAndStrip`
    class Foo {
      [key: string]: number

      foo() {}
    }
  `,
  name: 'index signature ignored',
}, {
  code: dedentAndStrip`
    class Foo {
      static {
        foo = 1
      }

      foo() {}
    }
  `,
  name: 'static block ignored',
}, {
  code: dedentAndStrip`
    interface Foo {
      bar(): void
      a: number
    }
  `,
  name: 'interfaces unaffected',
}, {
  code: dedentAndStrip`
    class Foo {
      [Symbol.for("x")] = 2
      a = 1
    }
  `,
  name: 'computed field before regular field',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}
      static factory = () => {}
      zebra() {}
    }
  `,
  name: 'static arrow property sorted among public methods',
}, {
  code: 'class Foo {}',
  name: 'empty class',
}] as const

const invalid = [{
  code: dedentAndStrip`
    class Foo {
      constructor() {}
      protected __items: number[] = []
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'field after constructor',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __b = 2
      public a = 1
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'public field after protected field',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __itemFactory: ItemFactory
      protected __container: number[] = []
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'protected fields not sorted alphabetically',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}
      get length() { return 0 }
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'method before accessor',
}, {
  code: dedentAndStrip`
    class Foo {
      at() {}
      ;[Symbol.iterator](): Iterator<number> { return this[Symbol.iterator]() }
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'symbol after method',
}, {
  code: dedentAndStrip`
    class Foo {
      set value(v: number) {}
      get value() { return 1 }
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'set before get',
}, {
  code: dedentAndStrip`
    class Foo {
      protected after() {}
      zebra() {}
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'public method after protected method',
}, {
  code: dedentAndStrip`
    class Foo {
      constructor() {}
      a = 1
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'constructor before field',
}, {
  code: dedentAndStrip`
    class Foo {
      a = 1
      declare State: unknown
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'type declaration after field',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __elementValue() {}
      protected disposeOutbound() {}
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'protected methods not sorted ignoring __ prefix',
}, {
  code: dedentAndStrip`
    class Foo {
      zebra() {}
      at() {}
      banana() {}
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'multiple methods out of order',
}, {
  code: dedentAndStrip`
    class Foo {
      onChildChange = () => {}
      afterRefresh() {}
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'arrow property out of order',
}, {
  code: dedentAndStrip`
    class Foo {
      protected afterRefresh() {}
      protected get valueForValidation() { return this }
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'protected method before protected accessor',
}, {
  code: dedentAndStrip`
    class Foo {
      private zebra() {}
      protected at() {}
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'protected method after private method',
}, {
  code: dedentAndStrip`
    class Foo {
      a = 1;
      [Symbol.for("x")] = 2
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'computed field after regular field',
}, {
  code: dedentAndStrip`
    class Foo {
      protected __a = 1
      b = 2
    }
  `,
  errors: [
    {messageId: 'memberOutOfOrder'},
  ],
  name: 'public field after protected field',
}] as const

const ruleTester = new RuleTester()
ruleTester.run(
  'class-member-ordering',
  classMemberOrdering,
  {invalid, valid},
)
