import { WEB_EXT_IGNORE_FILES } from "./settings";
import colors from "colors/safe";
import { execSync } from "child_process";
import linter from "addons-linter";
import path from "path";

const main = async () => {
    const linterConfigFirefox: linter.Options = {
        config: {
            _: ["./"],
            logLevel: process.env.VERBOSE ? "debug" : "fatal",
            shouldScanFile: (fileName, isDir) => {
                if (!fileName) return true;

                const normalizedFileName = isDir ? path.normalize(`${fileName}/`) : path.normalize(fileName);

                return !WEB_EXT_IGNORE_FILES.includes(normalizedFileName);
            }
        }
    };

    const linterConfigChrome: linter.Options = {
        config: {
            ...linterConfigFirefox.config,
            enableBackgroundServiceWorker: true
        }
    };

    const lintForFirefox = linter.createInstance(linterConfigFirefox);
    const lintForChrome = linter.createInstance(linterConfigChrome);

    console.log("Building...");
    execSync("npm run build");

    console.log("Switching to manifest v2.");
    execSync("npm run switchManifest 2");

    console.log("Linting for Firefox...");
    const firefoxResult = await lintForFirefox.run();
    if (firefoxResult.errors.length) {
        console.error(colors.red("Errors found when linting for Firefox."));
        process.exit(1);
    }

    console.log("Switching to manifest v3.");
    execSync("npm run switchManifest 3");

    console.log("Linting for Chrome...");
    const chromeResult = await lintForChrome.run();
    if (chromeResult.errors.length) {
        console.error(colors.red("Errors found when linting for Chrome."));
        process.exit(1);
    }

    console.log("Done.");
};

try {
    void main();
} catch (error) {
    // @ts-expect-error
    console.error(colors.red(error.stdout.toString()));
    process.exit(1);
}
