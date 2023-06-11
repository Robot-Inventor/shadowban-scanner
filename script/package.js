const { execSync } = require("child_process");

const IGNORE_FILES = '"./src/" "./script/" "./node_modules/" "package.json" "package-lock.json" "./*.md" "./manifest/" "./web-ext-artifacts/"';

console.log("Building...");
execSync("npm run build");

console.log("Switching to manifest v2.");
execSync("node ./script/changeManifestVersion.js 2");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV2" --ignore-files ${IGNORE_FILES}`);

console.log("Switching to manifest v3.");
execSync("node ./script/changeManifestVersion.js 3");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV3" --ignore-files ${IGNORE_FILES}`);
console.log("Done.");
