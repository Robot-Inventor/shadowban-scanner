const { execSync } = require("child_process");
const glob = require("glob");
const fs = require("fs");
const packagejson = require("../package.json");
const path = require("path");

console.log("Building...");
execSync("npx webpack");

console.log("Adding userScript comments...");
const userScriptFiles = glob.sync("./userScript/*.user.js");

for (const userScript of userScriptFiles) {
    const scriptString = fs.readFileSync(userScript);
    const userScriptComment = `
// ==UserScript==
// @name         Shadowban Scanner (${path.basename(userScript, ".user.js")})
// @namespace    https://github.com/Robot-Inventor/shadowban-scanner/
// @version      ${packagejson.version}
// @description  A browser extension that detects shadowbans on Twitter.
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
