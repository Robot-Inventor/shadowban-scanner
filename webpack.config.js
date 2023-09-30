const glob = require("glob");
const path = require("path");
const CopyFilePlugin = require("copy-webpack-plugin");

const userScripts = glob.sync("./src/ts/userScript/*.user.ts");
const userScriptEntries = {};
for (const userScript of userScripts) {
    const key = `../userScript/${path.basename(userScript, ".ts")}.js`;
    userScriptEntries[key] = `./${userScript}`;
}

module.exports = {
    mode: "production",
    entry: {
        "./js/browserAction.js": "./src/ts/browserAction.ts",
        "./js/contentScript.js": "./src/ts/contentScript.ts",
        "./js/pageScript.js": "./src/ts/pageScript.ts",
        ...userScriptEntries
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
                    from: "./src/css/",
                    to: "./css/[name][ext]"
                },
                {
                    from: "./src/html/",
                    to: "./html/[name][ext]"
                },
                {
                    from: "./src/image/",
                    to: "./image/[name][ext]"
                },
                {
                    from: "./src/polyfill/",
                    to: "./polyfill/[name][ext]"
                }
            ]
        })
    ]
};