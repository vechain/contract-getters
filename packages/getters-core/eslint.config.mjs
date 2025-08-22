import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**'],
    },
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir:
                    '/Users/victor.emanuel/Desktop/Vechain/contract-getters/packages/getters-core',
                project: './tsconfig.json',
            },
        },
    },
    // Main configuration
    {
        extends: [...tseslint.configs.recommended],
        files: ['src/**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
            'eslint-comments/no-unused-disable': 'off',
            'import/no-anonymous-default-export': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
);
