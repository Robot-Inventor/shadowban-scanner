import { glob } from "glob";
import fs from "fs";

const START_MARKER = "<!-- PRIVACY_POLICY_TEXT_START -->";
const END_MARKER = "<!-- PRIVACY_POLICY_TEXT_END -->";

console.log("Updating privacy policy...");
const files = glob.sync("./README*.md");

for (const file of files) {
    const readmeText = fs.readFileSync(file, "utf8");
    const languageCode = file.replace(/README_?/, "").replace(".md", "") || "en";
    const messagePath = `./_locales/${languageCode.replace(/(_\w+)/, (match) => match.toUpperCase())}/messages.json`;
    const privacyPolicyText = JSON.parse(fs.readFileSync(messagePath, "utf8")).privacyPolicyText.message;

    const newPrivacyPolicySection = `
${START_MARKER}
<!-- THIS SECTION IS GENERATED FROM ${messagePath}. DO NOT EDIT MANUALLY -->

${privacyPolicyText}

${END_MARKER}
`.trim();

    const updatedReadmeText = readmeText.replace(
        new RegExp(`${START_MARKER}[\\s\\S]+${END_MARKER}`, "m"),
        newPrivacyPolicySection
    );

    fs.writeFileSync(file, updatedReadmeText);
}

console.log("Done!");
