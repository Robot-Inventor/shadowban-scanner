import fs from "fs";
import { glob } from "glob";
import { isPlainObject } from "@robot-inventor/ts-utils";
import packagejson from "../package.json";
import path from "path";

// eslint-disable-next-line no-console
console.log("Adding userScript comments...");
const userScriptFiles = glob.sync("./userScript/*.user.js");

for (const userScript of userScriptFiles) {
    const scriptString = fs.readFileSync(userScript, "utf-8");

    const languageCode = path.basename(userScript, ".user.js");
    const formattedLanguageCode = languageCode.toLowerCase().replace("_", "-");
    const languageName =
        new Intl.DisplayNames([formattedLanguageCode], { type: "language" }).of(formattedLanguageCode) ??
        formattedLanguageCode;

    const localizedMessages: unknown = JSON.parse(
        fs.readFileSync(`./src/_locales/${languageCode}/messages.json`, "utf-8")
    );
    if (
        !isPlainObject(localizedMessages) ||
        !isPlainObject(localizedMessages.manifest_description) ||
        typeof localizedMessages.manifest_description.message !== "string"
    ) {
        throw new Error(`Invalid localized messages for ${languageCode}`);
    }

    const userScriptComment = `
// ==UserScript==
// @name         Shadowban Scanner (${languageName})
// @namespace    https://github.com/Robot-Inventor/shadowban-scanner/
// @version      ${packagejson.version}
// @description  ${localizedMessages.manifest_description.message}
// @author       Robot-Inventor (ろぼいん / @keita_roboin)
// @match        https://*.twitter.com/*
// @match        https://*.x.com/*
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
    const newScriptString = `${userScriptComment}\n\n${scriptString}`;
    fs.writeFileSync(userScript, newScriptString);
}

// eslint-disable-next-line no-console
console.log("Done!");
