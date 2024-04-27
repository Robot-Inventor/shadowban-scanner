const CopyFilePlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const translationJa = require("./src/translations/ja.json");
const translationEn = require("./src/translations/en.json");

module.exports = {
    mode: "production",
    entry: {
        "js/script.js": "./src/ts/script.ts"
    },
    output: {
        filename: "[name]",
        clean: true
    },
    devServer: {
        static: {
            directory: "./dist"
        },
        port: 8080,
        client: {
            overlay: false,
            progress: true
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
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
                    context: "./src/css/",
                    from: "**/*",
                    to: "./css/"
                },
                {
                    context: "./public/",
                    from: "**/*",
                    to: "./"
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "./index.html",
            ...translationJa
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "./ja/index.html",
            ...translationJa
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "./en/index.html",
            ...translationEn
        })
    ]
};
