import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';
import jsdoc from "eslint-plugin-jsdoc";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    eslint.configs.all,
    jsdoc.configs["flat/recommended-typescript-error"],
    eslintConfigPrettier,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            jsdoc
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error"
        },
        rules: {
            "array-element-newline": [
                "error",
                "consistent"
            ],
            "curly": [
                "error",
                "multi-line"
            ],
            "function-call-argument-newline": [
                "error",
                "consistent"
            ],
            "lines-between-class-members": [
                "error",
                "always",
                {
                    "exceptAfterSingleLine": true
                }
            ],
            "max-len": [
                "error",
                {
                    "code": 120
                }
            ],
            "multiline-ternary": [
                "error",
                "always-multiline"
            ],
            "no-magic-numbers": [
                "error",
                {
                    "ignoreArrayIndexes": true
                }
            ],
            "no-ternary": "off",
            "no-void": [
                "error",
                {
                    "allowAsStatement": true
                }
            ],
            "object-curly-spacing": [
                "error",
                "always"
            ],
            "one-var": [
                "error",
                "never"
            ],
            "padded-blocks": [
                "error",
                "never"
            ],
            "quote-props": [
                "error",
                "consistent-as-needed"
            ],
            "space-before-function-paren": [
                "error",
                {
                    "anonymous": "always",
                    "asyncArrow": "always",
                    "named": "never"
                }
            ],
            "no-plusplus": "off",
            "no-extra-parens": [
                "error",
                "all",
                {
                    "nestedBinaryExpressions": false
                }
            ],
            "no-new": "off",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/explicit-member-accessibility": "error"
        }
    }
);
