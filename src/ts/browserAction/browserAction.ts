import { loadSettings } from "./loadSettings";
import { loadVersion } from "./loadVersion";

const isMobile = Boolean(/iPhone|Android.+Mobile/u.exec(navigator.userAgent));
if (isMobile) {
    document.body.classList.add("mobile");
}

void loadSettings();
loadVersion();
