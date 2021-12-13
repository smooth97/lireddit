module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'next',
        'next/core-web-vitals',
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    ignorePatterns: ['src/generated/**'],
    rules: {
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': 'error',
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        'no-undef': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'warn',
        '@typescript-eslint/prefer-enum-initializers': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/ban-types': [
            'error', {
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true,
            },
        ],
        'import/extensions': [
            'error', 'ignorePackages', {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/named': 'warn',
        'import/order': [
            'error', {
                pathGroups: [
                    {
                        pattern: 'src/**',
                        group: 'internal',
                    },
                ],
            },
        ],
        'import/prefer-default-export': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-alert': 'off',
        'no-console': ['error', {allow: ['warn', 'error']}],
        'no-restricted-globals': [
            'error', {
                name: 'isFinite',
                message:
                    'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
            }, {
                name: 'isNaN',
                message:
                    'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
            },
            {
                name: 'Date',
                message:
                    'Use Luxon DateTime instead',
            },
        ],
        'quote-props': ['error', 'consistent-as-needed'],
        'react/jsx-curly-spacing': [
            'error', {
                when: 'always',
                objectLiterals: 'never',
                children: true,
            },
        ],
        'react/jsx-filename-extension': [
            'error', {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                paths: ['.'],
            },
        },
    },
};
