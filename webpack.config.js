const glob = require("glob");
const path = require("path");
const CopyFilePlugin = require("copy-webpack-plugin");
const LicensePlugin = require("webpack-license-plugin");

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
        "./js/background.js": "./src/ts/background.ts",
        "./js/ossLicenses.js": "./src/ts/ossLicenses.ts",
        "./js/privacyPolicy.js": "./src/ts/privacyPolicy.ts",
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
                }
            ]
        }),
        new LicensePlugin(
            {
                outputFilename: "./json/oss-licenses.json",
                unacceptableLicenseTest: (licenseIdentifier) => {
                    const acceptableLicenses = ["BSD-3-Clause", "Apache-2.0", "MIT", "0BSD", "MPL-2.0"];
                    return !acceptableLicenses.includes(licenseIdentifier);
                }
            }
        )
    ]
};