import { execSync } from "child_process";
import { WEB_EXT_IGNORE_FILES } from "./settings";

const IGNORE_FILES_STRING = WEB_EXT_IGNORE_FILES.map((path) => `"${path}"`).join(" ");

console.log("Building...");
execSync("npm run build");

console.log("Switching to manifest v2.");
execSync("npm run switchManifest 2");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV2" --ignore-files ${IGNORE_FILES_STRING}`);

console.log("Switching to manifest v3.");
execSync("npm run switchManifest 3");
console.log("Packaging...");
execSync(`npx web-ext build --artifacts-dir "./web-ext-artifacts/manifestV3" --ignore-files ${IGNORE_FILES_STRING}`);
console.log("Done.");
