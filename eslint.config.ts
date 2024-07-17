module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    rules: {
      'prettier/prettier': 'error', 
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-non-null-assertion': ['error'],
      '@typescript-eslint/no-empty-function': ['warn', { 'allow': ['arrowFunctions'] }],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'variableLike',
          'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
          'leadingUnderscore': 'allow',
        },
        {
          'selector': 'parameter',
          'format': ['camelCase'],
          'leadingUnderscore': 'allow',
        },
        {
          'selector': 'memberLike',
          'modifiers': ['private'],
          'format': ['camelCase'],
          'leadingUnderscore': 'require',
        },
        {
          'selector': 'typeLike',
          'format': ['PascalCase'],
        },
      ],
    },
  };
  