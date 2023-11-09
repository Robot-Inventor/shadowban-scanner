import { execSync } from "child_process";
import { glob } from "glob";
import fs from "fs";
import packagejson from "../package.json";
import path from "path";
import colors from "colors/safe";

try {
    console.log("Generating type guards...");
    execSync("npx ts-auto-guard ./src/ts/@types/**/*.ts");

    console.log("Building...");
    execSync("npx webpack");
} catch (error) {
    // @ts-expect-error
    console.error(colors.red(error.stdout.toString()));
    process.exit(1);
}

console.log("Updating privacy policy...");
execSync("npx ts-node ./script/updatePrivacyPolicy.ts");

console.log("Adding userScript comments...");
const userScriptFiles = glob.sync("./userScript/*.user.js");

for (const userScript of userScriptFiles) {
    const scriptString = fs.readFileSync(userScript, "utf-8");
    const languageCode = path.basename(userScript, ".user.js");
    const formattedLanguageCode = languageCode.toLowerCase().replace("_", "-");
    const languageName =
        new Intl.DisplayNames([formattedLanguageCode], { type: "language" }).of(formattedLanguageCode) ||
        formattedLanguageCode;
    const localizedMessages = fs.readFileSync(`./_locales/${languageCode}/messages.json`, "utf-8");
    const userScriptComment = `
// ==UserScript==
// @name         Shadowban Scanner (${languageName})
// @namespace    https://github.com/Robot-Inventor/shadowban-scanner/
// @version      ${packagejson.version}
// @description  ${JSON.parse(localizedMessages)["manifest_description"]["message"]}
// @author       Robot-Inventor (ろぼいん / @keita_roboin)
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @icon         https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/src/image/icon128.png
// @downloadURL  https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/${userScript.replaceAll(
        "\\",
        "/"
    )}
// @updateURL    https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/${userScript.replaceAll(
        "\\",
        "/"
    )}
// @grant        none
// ==/UserScript==
`.trim();
    const newScriptString = userScriptComment + "\n\n" + scriptString;
    fs.writeFileSync(userScript, newScriptString);
}
