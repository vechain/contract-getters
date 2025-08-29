import tseslint from 'typescript-eslint';

export default tseslint.config({
    ignores: ['dist/**'],
    extends: [...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
        'eslint-comments/no-unused-disable': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
    },
});
