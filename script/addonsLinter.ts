import * as colors from "colors/safe";
import { type Options as LinterOptions, createInstance } from "addons-linter";
import { execSync } from "child_process";

const ERROR_EXIT_CODE = 1;

// eslint-disable-next-line max-statements
const main = async (): Promise<void> => {
    const linterConfigFirefox: LinterOptions = {
        config: {
            // eslint-disable-next-line id-length
            _: ["./dist/firefox/"],
            logLevel: process.env["VERBOSE"] ? "debug" : "fatal",
            shouldScanFile: () => true
        }
    };

    const linterConfigChrome: LinterOptions = {
        config: {
            ...linterConfigFirefox.config,
            // eslint-disable-next-line id-length
            _: ["./dist/chrome/"],
            enableBackgroundServiceWorker: true
        }
    };

    const lintForFirefox = createInstance(linterConfigFirefox);
    const lintForChrome = createInstance(linterConfigChrome);

    // eslint-disable-next-line no-console
    console.log("Building...");
    execSync("npm run build");

    // eslint-disable-next-line no-console
    console.log("Linting for Firefox...");
    const firefoxResult = await lintForFirefox.run();
    if (firefoxResult.errors.length) {
        // eslint-disable-next-line no-console
        console.error(colors.red("Errors found when linting for Firefox."));
        process.exit(ERROR_EXIT_CODE);
    }

    // eslint-disable-next-line no-console
    console.log("Linting for Chrome...");
    const chromeResult = await lintForChrome.run();
    if (chromeResult.errors.length) {
        // eslint-disable-next-line no-console
        console.error(colors.red("Errors found when linting for Chrome."));
        process.exit(ERROR_EXIT_CODE);
    }

    // eslint-disable-next-line no-console
    console.log("Done.");
};

try {
    void main();
} catch (error) {
    // @ts-expect-error error is not an instance of Error
    // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    console.error(colors.red(error.stdout.toString()));
    process.exit(ERROR_EXIT_CODE);
}
