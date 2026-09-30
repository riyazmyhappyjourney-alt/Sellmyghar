import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/app/**/*.{ts,tsx}',
      'src/App.tsx',
      'src/main.tsx',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*server*', '**/server/**', '../*server*/**', '../*/server/**'],
              message: 'ARCHITECTURAL BOUNDARY VIOLATION: Client components cannot import from server-only modules (/src/server). Use API routes (/api/*) or shared core types.',
            },
            {
              group: [
                'crypto', 'node:crypto',
                'pg', 'node:pg',
                'net', 'node:net',
                'fs', 'node:fs',
                'path', 'node:path',
                'child_process', 'node:child_process',
                'os', 'node:os'
              ],
              message: 'ARCHITECTURAL BOUNDARY VIOLATION: Client components cannot import Node.js server built-ins.',
            },
          ],
        },
      ],
    },
  },
];
