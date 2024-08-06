const { eslintConfigNoJSDoc } = require("@robot-inventor/eslint-config");

module.exports = [
    {
        ignores: [
            "**/*.guard.ts",
        ]
    },
    ...eslintConfigNoJSDoc
];
