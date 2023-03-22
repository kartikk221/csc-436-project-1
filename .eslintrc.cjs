module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      ignorePatterns: ['.test.jsx', '.test.js'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always']
      }
    }
  ],
  plugins: ['react']
};
