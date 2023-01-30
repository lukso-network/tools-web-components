module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    webextensions: true,
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
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:json/recommended',
    'plugin:lit/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-debugger': 2,
    'no-unused-vars': 'off', // Using the ts rule above instead.
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
    'lit/attribute-value-entities': 'off', // to allow using Tailwind selectors in arbitrary variants
  },
  overrides: [
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
        './*.{mjs,cjs}',
        './*.js',
        './*.json',
        './.eslintrc.cjs',
        './dist/**/*.js',
      ],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
}
