const { execSync } = require("child_process");
const glob = require("glob");
const fs = require("fs");
const packagejson = require("../package.json");
const path = require("path");

console.log("Generating type guards...");
execSync("npx ts-auto-guard ./src/ts/core/reactProps.ts");

console.log("Building...");
execSync("npx webpack");

console.log("Adding userScript comments...");
const userScriptFiles = glob.sync("./userScript/*.user.js");

for (const userScript of userScriptFiles) {
    const scriptString = fs.readFileSync(userScript, "utf-8");
    const languageCode = path.basename(userScript, ".user.js");
    const localizedMessages = fs.readFileSync(`./_locales/${languageCode}/messages.json`, "utf-8");
    const userScriptComment = `
// ==UserScript==
// @name         Shadowban Scanner (${languageCode})
// @namespace    https://github.com/Robot-Inventor/shadowban-scanner/
// @version      ${packagejson.version}
// @description  ${JSON.parse(localizedMessages)["manifest_description"]["message"]}
// @author       Robot-Inventor (ろぼいん / @keita_roboin)
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @icon         https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/src/image/icon128.png
// @downloadURL  https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/${userScript.replace("\\", "/")}
// @updateURL    https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/${userScript.replace("\\", "/")}
// @grant        none
// ==/UserScript==
`.trim();
    const newScriptString = userScriptComment + "\n\n" + scriptString;
    fs.writeFileSync(userScript, newScriptString);
}
