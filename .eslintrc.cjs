module.exports = {
    extends: ["@it-incubator/eslint-config", "plugin:storybook/recommended"],
    rules: {
        'import/no-unresolved': 'off',
        'perfectionist/sort-objects': 'off',
        'perfectionist/sort-object-types': 'off',
        'perfectionist/sort-jsx-props': 'off',

    },
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
};
