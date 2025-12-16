const { defineConfig } = require('eslint/config')
const globals = require('globals')
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat')
const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const espree = require('espree')
const js = require('@eslint/js')
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.webextensions,
      },

      parser: tsParser,
      sourceType: 'module',

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          './tsconfig.json',
          './tsconfig.eslint.json',
          './.storybook/tsconfig.json',
        ],
      },
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

    extends: fixupConfigRules(
      compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:lit/recommended',
        'prettier',
        'plugin:storybook/recommended'
      )
    ),

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-debugger': 2,
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
    files: ['**/dist/**/*'],

    rules: {
      complexity: 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-empty-function': 0,
    },
  },
  {
    files: [
      './*.{mjs,cjs,js}',
      './package/*.{mjs,cjs,js}',
      './.eslintrc.cjs',
      './dist/**/*.js',
    ],

    languageOptions: {
      parser: espree,
      ecmaVersion: 2020,
      parserOptions: {},
    },

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      '**/templates/',
      '**/dist/**',
      '**/node_modules/**',
      '**/package/dist/**',
      '**/package/tools/**',
      'storybook-static/**',
      '.work/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '.yarn/**',
      '**/*.css.map',
      '**/*.d.ts.map',
      '**/*.json',
      'scripts/**/*.js',
      'scripts/**/*.cjs',
    ],
  },
])
