import type { Linter } from 'eslint'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import eslintJs from '@eslint/js'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

const customGlobals = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
      ...globals.node,
      vi: true,
      describe: true,
      it: true,
      expect: true,
    },
  },
}

export default [
  eslintJs.configs.recommended,
  customGlobals,
  // prettier,
  {
    ignores: ['**/dist', '**/*.config.mjs', '**/generated', '.next', 'node_modules', '.react-email', '.husky', '.vscode', 'analyze', '**/components/ui', '**/*.test.ts', '**/*.test.tsx'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
      'react-hooks': eslintPluginReactHooks,
      '@typescript-eslint': tsPlugin as any,
    },
    rules: {
      endOfLine: 'off',
      'no-console': [0],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'error',

      /**
       * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
       */
      // '@typescript-eslint/explicit-function-return-type': 'warn',

      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          semi: false,
          singleQuote: true,
          endOfLine: 'auto',
          bracketSpacing: true,
        },
      ],

      /**
       * https://github.com/sweepline/eslint-plugin-unused-imports
       */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * https://github.com/lydell/eslint-plugin-simple-import-sort
       */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\w', '^@\\w'], // external deps
            ['^\\.\\./', '^\\./'], // local dependencies
            ['^\\./(.*)module.scss$'], // css always last
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
] satisfies Linter.Config[]
