import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import typescript from 'typescript-eslint'

export const baseConfigs = [
  eslint.configs.recommended,
  react.configs.flat.recommended,
  stylistic.configs.recommended,
  ...typescript.configs.recommended,
  ...typescript.configs.stylistic,
]
