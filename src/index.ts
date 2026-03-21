import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import typescript from 'typescript-eslint'
import {customRules} from './main/customRules'
import {generalRules} from './main/generalRules'
import {ignores} from './main/ignores'
import {languageOptions} from './main/languageOptions'
import {perfectionistRules} from './main/perfectionistRules'
import {reactHooks} from './main/reactHooks'
import {stylisticRules} from './main/stylisticRules'
import {typescriptRules} from './main/typescriptRules'
import {unicornRules} from './main/unicornRules'
import type {TSESLint} from '@typescript-eslint/utils'

export const config: TSESLint.FlatConfig.ConfigArray = [
  ignores,
  languageOptions,
  //////////////////////////////////////////////////////////////////////////////
  eslint.configs.recommended,
  react.configs.flat.recommended,
  stylistic.configs.recommended,
  ...typescript.configs.recommended,
  ...typescript.configs.stylistic,
  //////////////////////////////////////////////////////////////////////////////
  customRules,
  generalRules,
  perfectionistRules,
  reactHooks,
  stylisticRules,
  typescriptRules,
  unicornRules,
]
