const webpack = require("webpack");
const CopyFilePlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        "./js/browserAction.js": "./src/ts/browserAction.ts",
        "./js/contentScript.js": "./src/ts/contentScript.ts",
        "./js/pageScript.js": "./src/ts/pageScript/pageScript.ts"
    },
    output: {
        filename: "[name]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyFilePlugin({
            patterns: [
                {
                    to: "./**/*",
                    from: "./src/css/",
                    to: "./css/[name][ext]"
                },
                {
                    to: "./**/*",
                    from: "./src/html/",
                    to: "./html/[name][ext]"
                },
                {
                    from: "./**/*",
                    context: "./src/image/",
                    to: "./image/[name][ext]"
                },
                {
                    from: "./**/*",
                    context: "./src/polyfill/",
                    to: "./polyfill/[name][ext]"
                }
            ]
        })
    ]
};