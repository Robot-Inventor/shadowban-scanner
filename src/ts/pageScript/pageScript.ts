import { Core } from "../core";
import { EVENT_GENERATOR_ID } from "./settings";

const eventGenerator = document.createElement("div");
eventGenerator.id = EVENT_GENERATOR_ID;
document.body.appendChild(eventGenerator);

const dispatchMessageEvent = () => {
    eventGenerator.dispatchEvent(new CustomEvent("newMessage"));
};

new Core(dispatchMessageEvent);
