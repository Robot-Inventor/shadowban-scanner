import { i18n, runtime } from "webextension-polyfill";
import { Translator } from "./common/translator";

const translator = new Translator((key) => i18n.getMessage(key), runtime.getURL("image/"));
translator.translateElements();
