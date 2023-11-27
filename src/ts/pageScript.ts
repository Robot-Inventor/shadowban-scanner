import { EVENT_GENERATOR_ID, EVENT_GENERATOR_SETTINGS_ATTRIBUTE } from "./common/constants";
import { Core } from "./core/core";
import { isSettings } from "./@types/common/settings.guard";

const eventGenerator = document.getElementById(EVENT_GENERATOR_ID);
if (!eventGenerator) throw new Error("Event generator not found");

const settingsString = eventGenerator.getAttribute(EVENT_GENERATOR_SETTINGS_ATTRIBUTE);
if (!settingsString) throw new Error("Settings not found");
const settings: unknown = JSON.parse(settingsString);
if (!isSettings(settings)) throw new Error("Invalid settings");

const dispatchMessageEvent = (): void => {
    eventGenerator.dispatchEvent(new CustomEvent("newMessage"));
};

new Core(settings, dispatchMessageEvent);
