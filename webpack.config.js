const glob = require("glob");
const path = require("path");
const { exec } = require("child_process");
const chokidar = require("chokidar");
const CopyFilePlugin = require("copy-webpack-plugin");
const LicensePlugin = require("webpack-license-plugin");

const userScripts = glob.sync("./src/ts/userScript/*.user.ts");
const userScriptEntries = {};
for (const userScript of userScripts) {
    const key = `../userScript/${path.basename(userScript, ".ts")}.js`;
    userScriptEntries[key] = `./${userScript}`;
}

class RunCommandsPlugin {
    generateTypeGuards(callback) {
        console.log("Generating type guards...");
        exec("npx ts-auto-guard ./src/types/**/*.ts", (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${err}`);
            } else {
                console.log(stdout);
                if (callback) {
                    callback();
                }
            }
        });
    }

    apply(compiler) {
        let watcher;
        let isWatchMode = false;

        compiler.hooks.beforeCompile.tapAsync("RunCommandsPlugin", (params, callback) => {
            if (isWatchMode) {
                callback();
                return;
            }

            this.generateTypeGuards(callback);
        });

        compiler.hooks.watchRun.tapAsync("RunCommandsPlugin", (params, callback) => {
            isWatchMode = true;
            if (!watcher) {
                watcher = chokidar.watch("src/types/**/*.d.ts");

                watcher.on("change", (path) => {
                    console.log(`Type definition file changed: ${path}`);
                    this.generateTypeGuards();
                });

                this.generateTypeGuards(callback);
            } else {
                callback();
            }
        });

        compiler.hooks.afterEmit.tapAsync("RunCommandsPlugin", (compilation, callback) => {
            exec("npx ts-node ./script/updatePrivacyPolicy.ts", (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error: ${err}`);
                } else {
                    console.log(stdout);
                }
            });

            exec("npx ts-node ./script/addUserScriptsComment.ts", (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error: ${err}`);
                } else {
                    console.log(stdout);
                }
                callback();
            });
        });
    }
}

module.exports = {
    mode: "production",
    entry: {
        "./js/browserAction.js": "./src/ts/browserAction/browserAction.ts",
        "./js/contentScript.js": "./src/ts/contentScript.ts",
        "./js/pageScript.js": "./src/ts/pageScript.ts",
        "./js/background.js": "./src/ts/background.ts",
        "./js/ossLicenses.js": "./src/ts/ossLicenses.ts",
        "./js/privacyPolicy.js": "./src/ts/privacyPolicy.ts",
        "./js/initialSetup.js": "./src/ts/initialSetup.ts",
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
    watchOptions: {
        ignored: /src\/types\/.*(?<!\.d\.ts)$/,
    },
    plugins: [
        new RunCommandsPlugin(),
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