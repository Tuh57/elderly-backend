module.exports = {
  root: true,
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    semi: [0],
    'react/no-unstable-nested-components': ['off'],
    '@typescript-eslint/prefer-optional-chain': ['off']
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'] // Specify it only for TypeScript files
      }
    }
  ],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true
  }
  // endOfLine: 'auto',
};
