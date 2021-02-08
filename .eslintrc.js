module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:vue/recommended', 'standard'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        indent: ['error', 4],
        'import/prefer-default-export': 'off',
        'vue/no-v-html': 'off',
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    normal: 'any'
                }
            }
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true
            }
        ],
        'no-plusplus': 'off',
        'linebreak-style': 0,
        semi: [2, 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'always',
                asyncArrow: 'always'
            }
        ]
    }
};
