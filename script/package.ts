import { execSync } from "child_process";

console.log("Building...");
execSync("npm run build");

console.log("Packaging for Chrome...");
process.chdir("dist/chrome");
execSync(`npx web-ext build --artifacts-dir "../../web-ext-artifacts/manifestV3"`);

console.log("Packaging for Firefox...");
process.chdir("../firefox");
execSync(`npx web-ext build --artifacts-dir "../../web-ext-artifacts/manifestV2"`);
console.log("Done.");
