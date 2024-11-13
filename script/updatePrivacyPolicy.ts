import fs from "fs";
import { glob } from "glob";
import { isPlainObject } from "@robot-inventor/ts-utils";

const START_MARKER = "<!-- PRIVACY_POLICY_TEXT_START -->";
const END_MARKER = "<!-- PRIVACY_POLICY_TEXT_END -->";

// eslint-disable-next-line no-console
console.log("Updating privacy policy...");
const files = glob.sync("./README*.md");

for (const file of files) {
    const readmeText = fs.readFileSync(file, "utf8");
    const languageCode = file.replace(/README_?/u, "").replace(".md", "") || "en";
    // eslint-disable-next-line prefer-named-capture-group
    const messagePath = `./src/_locales/${languageCode.replace(/(_\w+)/u, (match) => match.toUpperCase())}/messages.json`;

    const parsedMessages: unknown = JSON.parse(fs.readFileSync(messagePath, "utf8"));
    if (
        !isPlainObject(parsedMessages) ||
        !isPlainObject(parsedMessages.privacyPolicyText) ||
        typeof parsedMessages.privacyPolicyText.message !== "string"
    ) {
        throw new Error(`Privacy policy text not found in ${messagePath}`);
    }
    const privacyPolicyText = parsedMessages.privacyPolicyText.message;

    const newPrivacyPolicySection = `
${START_MARKER}
<!-- THIS SECTION IS GENERATED FROM ${messagePath}. DO NOT EDIT MANUALLY -->

${privacyPolicyText}

${END_MARKER}
`.trim();

    const updatedReadmeText = readmeText.replace(
        new RegExp(`${START_MARKER}[\\s\\S]+${END_MARKER}`, "mu"),
        newPrivacyPolicySection
    );

    fs.writeFileSync(file, updatedReadmeText);
}

// eslint-disable-next-line no-console
console.log("Updated privacy policy");
