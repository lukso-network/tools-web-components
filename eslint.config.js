import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import litPlugin from 'eslint-plugin-lit'
import prettierConfig from 'eslint-config-prettier'
import storybookPlugin from 'eslint-plugin-storybook'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'package/**',
      'templates/**',
      'eslint.config.js',
      '**/*.json',
      'storybook-static/**',
      '.work/**',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.js', '*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
      globals: {
        browser: true,
        node: true,
        es6: true,
        webextensions: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      lit: litPlugin,
      storybook: storybookPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
        },
      },
      'import/parser': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...litPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'index'],
            ['sibling', 'parent', 'internal'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
        },
      ],
      'lit/attribute-value-entities': 'off',
    },
  },
  {
    files: ['*.cjs', '*.mjs', './package/**/*.{cjs,js}', './dist/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2020,
    },
    rules: {
      complexity: 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-empty-function': 0,
    },
  },
]
