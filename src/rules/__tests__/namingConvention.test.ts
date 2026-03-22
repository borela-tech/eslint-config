import {namingConvention} from '../namingConvention'
import {RuleTester} from '@typescript-eslint/rule-tester'

const validFunctions = [{
  code: 'function myFunction() {}',
  name: 'function camelCase',
}, {
  code: 'const handleClick = () => {}',
  name: 'arrow function camelCase',
}, {
  code: 'const processData = function() {}',
  name: 'function expression camelCase',
}] as const

const validReactComponents = [{
  code: 'const MyComponent = (): ReactElement => null',
  name: 'arrow component PascalCase',
}, {
  code: 'function MyButton(): JSX.Element { return null; }',
  name: 'function component PascalCase',
}, {
  code: 'const Card = (): ReactNode => null',
  name: 'component with ReactNode',
}] as const

const validTypes = [{
  code: 'type UserData = { name: string }',
  name: 'type PascalCase',
}, {
  code: 'type ApiResponse<T> = { data: T }',
  name: 'generic type PascalCase',
}] as const

const validInterfaces = [{
  code: 'interface IUser {}',
  name: 'interface PascalCase',
}, {
  code: 'interface ConfigOptions {}',
  name: 'interface with Options',
}] as const

const validEnums = [{
  code: 'enum StatusCode { Active, Inactive }',
  name: 'enum PascalCase',
}, {
  code: 'enum UserRole { Admin, User }',
  name: 'enum with values',
}] as const

const validClasses = [{
  code: 'class UserService {}',
  name: 'class PascalCase',
}, {
  code: 'class EventEmitter {}',
  name: 'class with Emitter',
}] as const

const validVariables = [{
  code: 'let userName = "John"',
  name: 'let camelCase',
}, {
  code: 'var isActive = true',
  name: 'var camelCase',
}] as const

const validConstants = [{
  code: 'const maxCount = 100',
  name: 'const camelCase',
}, {
  code: 'const MAX_RETRY = 3',
  name: 'const UPPER_CASE',
}, {
  code: 'const API_KEY = "secret"',
  name: 'const API_KEY',
}] as const

const validExempt = [{
  code: 'const _unused = 1',
  name: 'exempt const with underscore',
}, {
  code: 'function _unusedFunction() {}',
  name: 'exempt function with underscore',
}, {
  code: 'const _myVar = 2',
  name: 'exempt const _myVar',
}] as const

const validLowercase = [{
  code: 'const maxretry = 3',
  name: 'lowercase is valid camelCase',
}, {
  code: 'let myvariable = 5',
  name: 'lowercase variable',
}] as const

const invalidFunctions = [{
  code: 'function MyFunction() {}',
  errors: [{messageId: 'notCamelCase'}],
  name: 'function PascalCase should be camelCase',
  output: 'function myFunction() {}',
}, {
  code: 'const ProcessData = () => {}',
  errors: [{messageId: 'notCamelCase'}],
  name: 'arrow PascalCase should be camelCase',
  output: 'const processData = () => {}',
}] as const

const invalidComponents = [{
  code: 'const myComponent = (): ReactElement => null',
  errors: [{messageId: 'notPascalCase'}],
  name: 'component camelCase should be PascalCase',
  output: 'const MyComponent = (): ReactElement => null',
}, {
  code: 'function myButton(): JSX.Element { return null; }',
  errors: [{messageId: 'notPascalCase'}],
  name: 'function component camelCase should be PascalCase',
  output: 'function MyButton(): JSX.Element { return null; }',
}] as const

const invalidTypes = [{
  code: 'type userData = { name: string }',
  errors: [{messageId: 'notPascalCase'}],
  name: 'type camelCase should be PascalCase',
  output: 'type UserData = { name: string }',
}, {
  code: 'interface iConfig {}',
  errors: [{messageId: 'notPascalCase'}],
  name: 'interface camelCase should be PascalCase',
  output: 'interface IConfig {}',
}, {
  code: 'enum statusCode { Active, Inactive }',
  errors: [{messageId: 'notPascalCase'}],
  name: 'enum camelCase should be PascalCase',
  output: 'enum StatusCode { Active, Inactive }',
}, {
  code: 'class userService {}',
  errors: [{messageId: 'notPascalCase'}],
  name: 'class camelCase should be PascalCase',
  output: 'class UserService {}',
}] as const

const invalidVariables = [{
  code: 'let UserName = "John"',
  errors: [{messageId: 'notCamelCase'}],
  name: 'let PascalCase should be camelCase',
  output: 'let userName = "John"',
}, {
  code: 'let user_name = "John"',
  errors: [{messageId: 'notCamelCase'}],
  name: 'let snake_case should be camelCase',
  output: 'let userName = "John"',
}] as const

const ruleTester = new RuleTester()
ruleTester.run('naming-convention', namingConvention, {
  invalid: [
    ...invalidFunctions,
    ...invalidComponents,
    ...invalidTypes,
    ...invalidVariables,
  ],
  valid: [
    ...validFunctions,
    ...validReactComponents,
    ...validTypes,
    ...validInterfaces,
    ...validEnums,
    ...validClasses,
    ...validVariables,
    ...validConstants,
    ...validExempt,
    ...validLowercase,
  ],
})
