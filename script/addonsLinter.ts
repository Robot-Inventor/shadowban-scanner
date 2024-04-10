import colors from "colors/safe";
import { execSync } from "child_process";
import linter from "addons-linter";

const main = async () => {
    const linterConfigFirefox: linter.Options = {
        config: {
            _: ["./dist/firefox/"],
            logLevel: process.env.VERBOSE ? "debug" : "fatal",
            shouldScanFile: (fileName, isDir) => {
                return true;
            }
        }
    };

    const linterConfigChrome: linter.Options = {
        config: {
            ...linterConfigFirefox.config,
            _: ["./dist/chrome/"],
            enableBackgroundServiceWorker: true
        }
    };

    const lintForFirefox = linter.createInstance(linterConfigFirefox);
    const lintForChrome = linter.createInstance(linterConfigChrome);

    console.log("Building...");
    execSync("npm run build");

    console.log("Linting for Firefox...");
    const firefoxResult = await lintForFirefox.run();
    if (firefoxResult.errors.length) {
        console.error(colors.red("Errors found when linting for Firefox."));
        process.exit(1);
    }

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
