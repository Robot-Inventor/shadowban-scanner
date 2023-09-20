const { execSync } = require("child_process");
const { WEB_EXT_IGNORE_FILES } = require("./settings.js");

console.log("Building...");
execSync("npm run build");

console.log("Switching to manifest v2.");
execSync("npm run switchManifest 2");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV2" --ignore-files ${WEB_EXT_IGNORE_FILES}`);

console.log("Switching to manifest v3.");
execSync("npm run switchManifest 3");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV3" --ignore-files ${WEB_EXT_IGNORE_FILES}`);
console.log("Done.");
