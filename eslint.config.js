import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-useless-escape': 'off',
      'no-unused-expressions': 'off',
      'no-case-declarations': 'off',
    },
  },
  {
    ignores: [
      'scripts/**',
      'tests/**',
      'playwright-report/**',
      'test-results/**',
      '.next/**',
      'node_modules/**',
      'out/**',
      'components/experimental/**',
    ],
  },
]
