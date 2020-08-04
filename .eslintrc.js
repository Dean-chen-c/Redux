module.exports = {
  extends: ['alloy', 'alloy/react', 'react-app'],
  plugins: ['react-hooks'],
  rules: {
    'no-invalid-this': 'off',
    'no-unused-vars': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
