const { execSync } = require("child_process");
const { WEB_EXT_IGNORE_FILES } = require("./settings.js");
const colors = require("colors/safe");

try {
    console.log("Building...");
    execSync("npm run build");

    console.log("Switching to manifest v2.");
    execSync("npm run switchManifest 2");
    console.log("Linting...");
    execSync(`npx web-ext lint --ignore-files ${WEB_EXT_IGNORE_FILES}`);

    console.log("Switching to manifest v3.");
    execSync("npm run switchManifest 3");
    console.log("Linting...");
    execSync(`npx web-ext lint --ignore-files ${WEB_EXT_IGNORE_FILES}`);
    console.log("Done.");
} catch (error) {
    console.error(colors.red(error.stdout.toString()));
    process.exit(1);
}
