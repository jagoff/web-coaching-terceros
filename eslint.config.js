import js from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettier,
    },
    rules: {
      // TypeScript rules (solo las disponibles)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // Prettier integration
      'prettier/prettier': 'error',
      
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'prefer-const': 'off', // Using TypeScript version
      'no-var': 'error',
      'no-unused-vars': 'off', // Using TypeScript version
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'comma-spacing': 'error',
      'key-spacing': 'error',
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
    },
  },
  {
    files: ['**/*.js'],
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
      '*.bundle.js',
      'public/**',
      '.git/**',
      '.vscode/**',
      '.idea/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'next.config.ts',
      'tailwind.config.*',
      'postcss.config.*',
      'playwright.config.*',
      'vitest.config.*',
      'scripts/**',
      'test/**',
      'tests/**',
    ],
  },
  prettierConfig,
];
