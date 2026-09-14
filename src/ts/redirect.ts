import { detectBrowser, getExtensionStoreLink } from "./util";

const redirect = async (): Promise<void> => {
    location.href = getExtensionStoreLink(await detectBrowser());
};

void redirect();
