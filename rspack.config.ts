import { type Compiler, CopyRspackPlugin, type CopyRspackPluginOptions } from "@rspack/core";
import LicensePlugin from "webpack-license-plugin";
import { defineConfig } from "@rspack/cli";
import { exec } from "child_process";
import { glob } from "glob";
import path from "path";
import { watch } from "chokidar";

const userScripts = glob.sync("./src/ts/userScript/*.user.ts");
const userScriptEntries: Record<string, string> = {};
for (const userScript of userScripts) {
    const key = `../userScript/${path.basename(userScript, ".ts")}.js`;
    userScriptEntries[key] = `./${userScript}`;
}

class RunCommandsPlugin {
    private readonly env: Record<string, unknown>;

    public constructor(env: Record<string, unknown>) {
        this.env = env;
    }

    public static generateTypeGuards(callback?: () => void): void {
        // eslint-disable-next-line no-console
        console.log("Generating type guards...");
        exec("npx ts-auto-guard ./src/types/**/*.ts", (err, stdout) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(`Error: ${err.message}`);
            } else {
                // eslint-disable-next-line no-console
                console.log(stdout);
                if (callback) {
                    callback();
                }
            }
        });
    }

    public static updateManifest(): void {
        exec("npx tsx ./script/copyManifest.ts", (err, stdout) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(`Error: ${err.message}`);
            } else {
                // eslint-disable-next-line no-console
                console.log(stdout);
            }
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public apply(compiler: Compiler): void {
        let typeWatcher: null | ReturnType<typeof watch> = null;
        let manifestWatcher: null | ReturnType<typeof watch> = null;
        let isWatchMode = false;

        compiler.hooks.beforeCompile.tapAsync("RunCommandsPlugin", (_params, callback) => {
            if (isWatchMode) {
                callback();
                return;
            }

            RunCommandsPlugin.generateTypeGuards(callback);
        });

        compiler.hooks.watchRun.tapAsync("RunCommandsPlugin", (_params, callback) => {
            isWatchMode = true;
            if (!manifestWatcher || !typeWatcher) {
                manifestWatcher = watch("src/manifest/", {
                    ignored: (pathString, stats) => Boolean(stats && stats.isFile() && !pathString.endsWith(".json"))
                });
                manifestWatcher.on("change", (pathString: string) => {
                    // eslint-disable-next-line no-console
                    console.log(`Manifest file changed: ${pathString}`);
                    RunCommandsPlugin.updateManifest();
                });

                RunCommandsPlugin.updateManifest();

                typeWatcher = watch("src/types/", {
                    ignored: (pathString, stats) => Boolean(stats && stats.isFile() && !pathString.endsWith(".d.ts"))
                });

                typeWatcher.on("change", (pathString: string) => {
                    // eslint-disable-next-line no-console
                    console.log(`Type definition file changed: ${pathString}`);
                    RunCommandsPlugin.generateTypeGuards();
                });

                RunCommandsPlugin.generateTypeGuards(callback);
            } else {
                callback();
            }
        });

        compiler.hooks.afterEmit.tapAsync("RunCommandsPlugin", (_compilation, callback) => {
            RunCommandsPlugin.updateManifest();

            exec("npx tsx ./script/updatePrivacyPolicy.ts", (err, stdout) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.error(`Error: ${err.message}`);
                } else {
                    // eslint-disable-next-line no-console
                    console.log(stdout);
                }
            });

            if (this.env.updateUserScripts) {
                exec("npx tsx ./script/addUserScriptsComment.ts", (err, stdout) => {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.error(`Error: ${err.message}`);
                    } else {
                        // eslint-disable-next-line no-console
                        console.log(stdout);
                    }
                    callback();
                });
            } else {
                callback();
            }
        });
    }
}

const scripts = {
    "js/background.js": "./src/ts/background.ts",
    "js/browserAction.js": "./src/ts/browserAction/browserAction.ts",
    "js/contentScript.js": "./src/ts/contentScript.ts",
    "js/initialSetup.js": "./src/ts/initialSetup.ts",
    "js/ossLicenses.js": "./src/ts/ossLicenses.ts",
    "js/pageScript.js": "./src/ts/pageScript.ts",
    "js/privacyPolicy.js": "./src/ts/privacyPolicy.ts"
} as const;

const chromeScripts: Record<string, string> = {};
for (const key in scripts) {
    if (Object.hasOwn(scripts, key)) {
        chromeScripts[`./chrome/${key}`] = scripts[key as keyof typeof scripts];
    }
}

const firefoxScripts: Record<string, string> = {};
for (const key in scripts) {
    if (Object.hasOwn(scripts, key)) {
        firefoxScripts[`./firefox/${key}`] = scripts[key as keyof typeof scripts];
    }
}

const copyTargets = [
    {
        from: "./src/css/",
        to: "css/[name][ext]"
    },
    {
        from: "./src/html/",
        to: "html/[name][ext]"
    },
    {
        from: "./src/image/",
        to: "image/[name][ext]"
    },
    {
        from: "LICENSE",
        to: ""
    },
    {
        context: "./src/_locales/",
        from: "**/*",
        to: "_locales/"
    }
] as const;

const chromeCopyTargets: CopyRspackPluginOptions["patterns"] = [];
for (const target of copyTargets) {
    chromeCopyTargets.push({
        ...target,
        to: `./chrome/${target.to}`
    });
}

const firefoxCopyTargets: CopyRspackPluginOptions["patterns"] = [];
for (const target of copyTargets) {
    firefoxCopyTargets.push({
        ...target,
        to: `./firefox/${target.to}`
    });
}

const unacceptableLicenseTest = (licenseIdentifier: string): boolean => {
    const acceptableLicenses: readonly string[] = ["BSD-3-Clause", "Apache-2.0", "MIT", "0BSD", "MPL-2.0"];
    return !acceptableLicenses.includes(licenseIdentifier);
};

const isProduction = process.env.NODE_ENV === "production";
/* eslint-disable sort-keys */
// eslint-disable-next-line max-lines-per-function
const config = defineConfig((env) => ({
    mode: "production",
    devtool: isProduction ? false : "source-map",
    entry: {
        ...chromeScripts,
        ...firefoxScripts,
        ...(env.updateUserScripts ? userScriptEntries : {})
    },
    output: {
        filename: "[name]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/u,
                exclude: [/node_modules/u],
                loader: "builtin:swc-loader",
                options: {
                    // Ref: https://github.com/lit/lit/issues/4580#issuecomment-1996733777
                    jsc: {
                        parser: {
                            syntax: "typescript",
                            decorators: true
                        },
                        keepClassNames: true,
                        transform: {
                            legacyDecorator: true,
                            useDefineForClassFields: false
                        }
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.css$/u,
                use: ["style-loader", "css-loader"],
                type: "javascript/auto"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    watchOptions: {
        ignored: /src\/types\/.*(?<!\.d\.ts)$/u
    },
    plugins: [
        new RunCommandsPlugin(env),
        new CopyRspackPlugin({
            patterns: [...chromeCopyTargets, ...firefoxCopyTargets]
        }),
        new LicensePlugin({
            outputFilename: "./chrome/json/oss-licenses.json",
            unacceptableLicenseTest,
            includeNoticeText: true
        }),
        new LicensePlugin({
            outputFilename: "./firefox/json/oss-licenses.json",
            unacceptableLicenseTest,
            includeNoticeText: true
        })
    ]
}));
/* eslint-enable sort-keys */

export default config;
