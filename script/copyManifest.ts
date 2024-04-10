import fs from "fs";

import packageJson from "../package.json";
import manifestV2 from "../src/manifest/v2.json";
import manifestV3 from "../src/manifest/v3.json";

const { version } = packageJson;

manifestV2.version = version;
const manifestV2Text = JSON.stringify(manifestV2, null, 4);
fs.writeFileSync("./dist/firefox/manifest.json", manifestV2Text);
console.log(`Generated manifest v2 file.`);

manifestV3.version = version;
const manifestV3Text = JSON.stringify(manifestV3, null, 4);
fs.writeFileSync("./dist/chrome/manifest.json", manifestV3Text);
console.log(`Generated manifest v3 file.`);
