// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import regexp from 'eslint-plugin-regexp'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  [
    globalIgnores([
      'dist',
      'node_modules',
      '*.config.js',
      '*.config.ts',
      'storybook-static/**',
      '.jest/**',
      '.storybook/**',
      'e2e/**',
      'vitest.shims.d.ts'
    ]),
    {
      files: ['**/*.{ts,tsx}'],
      ignores: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        prettierConfig
      ],
      plugins: {
        prettier: prettier,
        'jsx-a11y': jsxA11y,
        regexp: regexp
      },
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-require-imports': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'regexp/no-dupe-characters-character-class': 'error',
        'regexp/strict': 'error'
      },
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname
        }
      }
    },
    {
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        prettierConfig
      ],
      plugins: {
        prettier: prettier,
        'jsx-a11y': jsxA11y,
        regexp: regexp
      },
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-require-imports': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'regexp/no-dupe-characters-character-class': 'error',
        'regexp/strict': 'error'
      },
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname
        }
      }
    }
  ],
  storybook.configs['flat/recommended']
)
