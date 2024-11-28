import { CopyRspackPlugin, CssExtractRspackPlugin, HtmlRspackPlugin } from "@rspack/core";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { defineConfig } from "@rspack/cli";
import translationJa from "./src/translations/ja.json" with { type: "json" };
import translationEn from "./src/translations/en.json" with { type: "json" };

const isProduction = process.env.NODE_ENV === "production";
const config = defineConfig({
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    entry: {
        "js/script.js": "./src/ts/script.ts",
        "js/redirect.js": "./src/ts/redirect.ts"
    },
    output: {
        filename: (pathData) => `js/${pathData.chunk?.name}.js?${pathData.contentHash}`,
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
            },
            {
                test: /\.css$/i,
                use: [CssExtractRspackPlugin.loader, "css-loader"],
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
                    context: "./public/",
                    from: "**/*",
                    to: "./"
                }
            ]
        }),
        new CssExtractRspackPlugin({
            runtime: false,
            filename: (pathData) => `css/${pathData.chunk?.name}.css?${pathData.contentHash}`
        }),
        new HtmlRspackPlugin({
            template: "./src/html/index.html",
            filename: "./index.html",
            minify: true,
            chunks: ["js/script.js"],
            templateParameters: {
                ...translationJa
            }
        }),
        new HtmlRspackPlugin({
            template: "./src/html/index.html",
            filename: "./ja/index.html",
            minify: true,
            chunks: ["js/script.js"],
            templateParameters: {
                ...translationJa
            }
        }),
        new HtmlRspackPlugin({
            template: "./src/html/index.html",
            filename: "./en/index.html",
            minify: true,
            chunks: ["js/script.js"],
            templateParameters: {
                ...translationEn
            }
        }),
        new HtmlRspackPlugin({
            template: "./src/html/download/index.html",
            filename: "./download/index.html",
            minify: true,
            chunks: ["js/redirect.js"]
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
});

export default config;
