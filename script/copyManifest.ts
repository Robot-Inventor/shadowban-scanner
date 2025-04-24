import fs from "fs";

import manifestV2 from "../src/manifest/v2.json" with { type: "json" };
import manifestV3 from "../src/manifest/v3.json" with { type: "json" };
import packageJson from "../package.json" with { type: "json" };

const { version } = packageJson;

const JSON_INDENT = 4;

manifestV2.version = version;
const manifestV2Text = JSON.stringify(manifestV2, null, JSON_INDENT);
fs.writeFileSync("./dist/firefox/manifest.json", manifestV2Text);
// eslint-disable-next-line no-console
console.log(`Generated manifest v2 file.`);

manifestV3.version = version;
const manifestV3Text = JSON.stringify(manifestV3, null, JSON_INDENT);
fs.writeFileSync("./dist/chrome/manifest.json", manifestV3Text);
// eslint-disable-next-line no-console
console.log(`Generated manifest v3 file.`);
