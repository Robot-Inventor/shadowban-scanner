import { CopyRspackPlugin } from "@rspack/core";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { defineConfig } from "@rspack/cli";
import translationJa from "./src/translations/ja.json" with { type: "json" };
import translationEn from "./src/translations/en.json" with { type: "json" };

const isProduction = process.env.NODE_ENV === "production";
const config = defineConfig({
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
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
                test: /\.ts$/u,
                exclude: [/node_modules/u],
                loader: "builtin:swc-loader",
                options: {
                    jsc: {
                        parser: {
                            syntax: "typescript"
                        }
                    }
                },
                type: "javascript/auto"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyRspackPlugin({
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
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
});

export default config;
