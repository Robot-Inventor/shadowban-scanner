import { eslintConfigNoJSDoc } from "@robot-inventor/eslint-config";

export default [
    {
        ignores: [
            "**/*.guard.ts",
        ]
    },
    ...eslintConfigNoJSDoc
];
