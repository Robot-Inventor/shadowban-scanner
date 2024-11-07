import { execSync } from "child_process";

// eslint-disable-next-line no-console
console.log("Building...");
execSync("npm run build");

// eslint-disable-next-line no-console
console.log("Packaging for Chrome...");
execSync(
    `npx web-ext build --source-dir "./dist/chrome/" --artifacts-dir "./web-ext-artifacts/manifestV3" --filename "{short_name}-{version}-manifestV3.zip"`
);

// eslint-disable-next-line no-console
console.log("Packaging for Firefox...");
execSync(
    `npx web-ext build --source-dir "./dist/firefox/" --artifacts-dir "./web-ext-artifacts/manifestV2" --filename "{short_name}-{version}-manifestV2.zip"`
);
// eslint-disable-next-line no-console
console.log("Done.");
