import { isOSSLicenses } from "./@types/ossLicenses.guard";

// eslint-disable-next-line max-statements
const main = async () => {
    const target = document.getElementById("third-party-licenses");
    if (!target) {
        throw new Error("Missing target element");
    }

    const response = await fetch("../json/oss-licenses.json");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const OSSLicenses = await response.json();
    if (!isOSSLicenses(OSSLicenses)) throw new Error("Invalid JSON");

    const fragment = document.createDocumentFragment();
    for (const license of OSSLicenses) {
        const h3 = document.createElement("h3");
        fragment.appendChild(h3);

        const link = document.createElement("a");
        link.href = license.repository;
        link.textContent = license.name;
        h3.appendChild(link);

        const licenseTextOuter = document.createElement("p");
        fragment.appendChild(licenseTextOuter);

        const licenseTextInner = document.createElement("pre");
        licenseTextInner.textContent = license.licenseText;
        licenseTextOuter.appendChild(licenseTextInner);
    }
    target.appendChild(fragment);
};

void main();
