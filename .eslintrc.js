const commonRules = {
  'class-methods-use-this': 0,
  'no-underscore-dangle': 0,
  'lines-between-class-members': 0,
  'import/prefer-default-export': 0,
  'no-void': 0,
  'arrow-body-style': 0,
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'no-param-reassign': 1,
  'no-restricted-properties': 1,
  'prefer-destructuring': 'warn',
  'prefer-exponentiation-operator': 'warn',
  'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  'react/react-in-jsx-scope': 0,
  'react/no-unused-class-component-methods': 0,
};

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      impliedStrict: true,
    },
    sourceType: 'module',
  },
  globals: {
    window: true,
  },
  rules: {
    ...commonRules,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        ...commonRules,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/lines-between-class-members': 0,
        '@typescript-eslint/explicit-function-return-type': 'warn',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    },
  },
};
