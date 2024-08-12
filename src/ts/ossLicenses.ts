import { additionalLicenses } from "./additional-licenses";
import { isOSSLicenses } from "../types/ossLicenses.guard";

const normalizeRepositoryLink = (repository: string): string => {
    if (repository.startsWith("git+")) {
        return repository.replace(/^git\+/u, "");
    }

    if (!/^https?:\/\//u.exec(repository)) {
        return `https://github.com/${repository}`;
    }

    return repository;
};

// eslint-disable-next-line max-statements
const main = async (): Promise<void> => {
    const target = document.getElementById("third-party-licenses");
    if (!target) {
        throw new Error("Missing target element");
    }

    const response = await fetch("../json/oss-licenses.json");
    const OSSLicenses = (await response.json()) as unknown;
    if (!isOSSLicenses(OSSLicenses)) throw new Error("Invalid JSON");

    const fragment = document.createDocumentFragment();

    for (const license of [...OSSLicenses, ...additionalLicenses]) {
        const itemOuter = document.createElement("div");
        itemOuter.className = "license-item-outer";
        fragment.appendChild(itemOuter);

        const h2 = document.createElement("h2");
        itemOuter.appendChild(h2);

        const link = document.createElement("a");
        link.href = normalizeRepositoryLink(license.repository);
        link.target = "_blank";
        link.textContent = license.name;
        h2.appendChild(link);

        const licenseTextOuter = document.createElement("p");
        itemOuter.appendChild(licenseTextOuter);

        const licenseTextInner = document.createElement("pre");
        licenseTextInner.textContent = license.licenseText;
        licenseTextOuter.appendChild(licenseTextInner);
    }

    target.appendChild(fragment);
};

void main();
