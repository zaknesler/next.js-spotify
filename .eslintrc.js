module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },
  extends: ['next/core-web-vitals', 'prettier', 'plugin:import/recommended'],
  plugins: ['react', '@next/eslint-plugin-next', 'prettier', 'unused-imports'],
  rules: {
    'import/default': ['error'],
    'import/first': ['error', 'absolute-first'],
    'import/named': ['error'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-unresolved': ['error'],
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['internal', 'parent', 'index'],
          'sibling',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
