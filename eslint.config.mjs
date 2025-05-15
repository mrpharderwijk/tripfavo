import eslintConfig from '@mrpharderwijk/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  ...compat.config({
    extends: ['eslint:recommended', "next/core-web-vitals"],
  }),
  {
    ignores: ['**/dist', '**/*.config.mjs', '**/lib/__generated'],
  },
  ...eslintConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooksPlugin,
      'react': reactPlugin,
      'prettier': prettierPlugin,
    },
    settings: {
      next: {
        rootDir: '.',
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
      '@next/next/inline-script-id': 'error',
      '@next/next/next-script-for-ga': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

export default config;
