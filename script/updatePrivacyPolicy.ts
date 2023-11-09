import { glob } from "glob";
import fs from "fs";

const files = glob.sync("./README*.md");

for (const file of files) {
    const readmeText = fs.readFileSync(file, "utf8");
    const languageCode = file.replace(/README_?/, "").replace(".md", "") || "en";

    const privacyPolicyText = JSON.parse(fs.readFileSync(`./_locales/${languageCode}/messages.json`, "utf8"))
        .privacyPolicyText.message;

    const newPrivacyPolicySection = `
<!-- PRIVACY_POLICY_TEXT_START -->
<!-- THIS SECTION IS GENERATED FROM _locales/${languageCode}/messages.json. DO NOT EDIT MANUALLY -->

${privacyPolicyText}

<!-- PRIVACY_POLICY_TEXT_END -->
`.trim();

    const updatedReadmeText = readmeText.replace(
        /<!-- PRIVACY_POLICY_TEXT_START -->[\s\S]+<!-- PRIVACY_POLICY_TEXT_END -->/m,
        newPrivacyPolicySection
    );

    fs.writeFileSync(file, updatedReadmeText);
}
