module.exports = {
  extends: ['sanity/typescript', 'sanity/react', 'prettier'],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.config.ts',
    '*.config.js',
    'v2-incompatible.js',
  ],
  rules: {
    'react/jsx-no-bind': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
