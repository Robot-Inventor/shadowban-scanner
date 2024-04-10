import { execSync } from "child_process";

console.log("Building...");
execSync("npm run build");

console.log("Packaging...");
process.chdir("chrome");
execSync(`npx web-ext build --artifacts-dir "../web-ext-artifacts/manifestV2"`);

console.log("Packaging...");
process.chdir("../firefox");
execSync(`npx web-ext build --artifacts-dir "../web-ext-artifacts/manifestV3"`);
console.log("Done.");
