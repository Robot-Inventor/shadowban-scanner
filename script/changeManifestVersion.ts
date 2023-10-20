import fs from "fs";

import packageJson from "../package.json";
import manifestV2 from "../manifest/v2.json";
import manifestV3 from "../manifest/v3.json";

const { version } = packageJson;
const arg = process.argv[2];

if (arg == "2") {
    manifestV2.version = version;
    const manifestText = JSON.stringify(manifestV2, null, 4);
    fs.writeFileSync("./manifest.json", manifestText);
    console.log(`Switched to manifest v${arg}.`);
} else if (arg == "3") {
    manifestV3.version = version;
    const manifestText = JSON.stringify(manifestV3, null, 4);
    fs.writeFileSync("./manifest.json", manifestText);
    console.log(`Switched to manifest v${arg}.`);
} else {
    throw new Error("Invalid argument. Manifest version must be 2 or 3.");
}
