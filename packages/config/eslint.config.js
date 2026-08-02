import js from '@eslint/js';
import onlyWarn from 'eslint-plugin-only-warn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'only-warn': onlyWarn,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.next',
      '*.config.*',
      '**/src/generated/**',
    ],
  },
);
