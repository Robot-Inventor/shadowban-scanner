import { Translator } from "./common/translator";
import browser from "webextension-polyfill";

const translator = new Translator((key) => browser.i18n.getMessage(key), browser.runtime.getURL("dist/image/"));
translator.translateElements();
