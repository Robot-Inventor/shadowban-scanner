import { execSync } from "child_process";

console.log("Building...");
execSync("npm run build");

console.log("Packaging for Chrome...");
execSync(
    `npx web-ext build --source-dir "./dist/chrome/" --artifacts-dir "./web-ext-artifacts/manifestV3" --filename "{short_name}-{version}-manifestV3.zip"`
);

console.log("Packaging for Firefox...");
execSync(
    `npx web-ext build --source-dir "./dist/firefox/" --artifacts-dir "./web-ext-artifacts/manifestV2" --filename "{short_name}-{version}-manifestV2.zip"`
);
console.log("Done.");
