import {baseConfigs} from './main/baseConfigs'
import {configFilesRules} from './main/configFilesRules'
import {customRules} from './main/customRules'
import {generalRules} from './main/generalRules'
import {ignores} from './main/ignores'
import {languageOptions} from './main/languageOptions'
import {perfectionistRules} from './main/perfectionistRules'
import {reactHooks} from './main/reactHooks'
import {stylisticRules} from './main/stylisticRules'
import {typescriptRules} from './main/typescriptRules'
import type {TSESLint} from '@typescript-eslint/utils'

export const CONFIG: TSESLint.FlatConfig.ConfigArray = [
  ignores,
  languageOptions,
  ...baseConfigs,
  reactHooks,
  customRules,
  generalRules,
  configFilesRules,
  stylisticRules,
  typescriptRules,
  perfectionistRules,
]
