import type { OSSLicenses } from "../types/ossLicenses";

const twemojiLicense: OSSLicenses[number] = {
    license: "CC-BY 4.0",
    licenseText: `
Twemoji is licensed under the CC-BY 4.0.

https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS`.trim(),
    name: "twemoji",
    repository: "https://github.com/twitter/twemoji"
} as const;

const additionalLicenses: OSSLicenses = [twemojiLicense];

export { additionalLicenses };
