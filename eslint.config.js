import prettier from 'eslint-config-prettier';

export default [
    {
        ignores: ['test-results/', 'playwright-report/', 'blob-report/', 'playwright/.cache/'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
    prettier,
];
