// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  [
    globalIgnores(['dist', 'node_modules', '*.config.js', '*.config.ts']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        prettierConfig
      ],
      plugins: {
        prettier: prettier
      },
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn'
      },
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser
      }
    }
  ],
  storybook.configs['flat/recommended']
)
