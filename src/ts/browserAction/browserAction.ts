import { loadSettings } from "./loadSettings";
import { loadVersion } from "./loadVersion";

void loadSettings();
loadVersion();

// DELETE THIS WHEN THE NEXT VERSION OF V3.0
// eslint-disable-next-line max-statements
const adjustMessageWidth = () => {
    const fieldset = document.querySelector("fieldset");
    const information = document.querySelector<HTMLElement>("#information");
    if (!information) throw new Error("information is null");

    const fieldsetWidth = fieldset?.offsetWidth;
    information.style.width = `${fieldsetWidth}px`;

    const additionalPermissionsRequired = document.querySelector<HTMLElement>("#additional-permissions-required");
    if (!additionalPermissionsRequired) throw new Error("span is null");
    const unableToUpdate = document.querySelector<HTMLElement>("#unable-to-update");
    if (!unableToUpdate) throw new Error("span is null");

    const date = new Date();
    // eslint-disable-next-line no-magic-numbers
    const year = date.getFullYear();
    // eslint-disable-next-line no-magic-numbers
    if (year > 2023) {
        additionalPermissionsRequired.style.display = "none";
        unableToUpdate.style.display = "block";
    }
};

adjustMessageWidth();
// Re-get the width because the width that Firefox can get at script execution time is not accurate.
// eslint-disable-next-line no-magic-numbers
setTimeout(adjustMessageWidth, 500);
