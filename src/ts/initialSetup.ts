import { Settings } from "./@types/common/settings";
import browser from "webextension-polyfill";

type InitialSetupItem = {
    options: {
        icon: string;
        label: string;
        value: boolean;
    }[];
    settingsKey: keyof Settings;
};

const INITIAL_SETUP_ITEMS = [
    {
        options: [
            {
                icon: "../image/done_all.svg",
                label: "すべてのツイートとアカウントに検査結果を表示",
                value: true
            },
            {
                icon: "../image/report.svg",
                label: "問題のあるツイートとアカウントにだけ検査結果を表示",
                value: false
            }
        ],
        settingsKey: "showMessagesInUnproblematicTweets"
    }
    // TODO: Support `enableForOtherUsersTweets`
] satisfies InitialSetupItem[];

// eslint-disable-next-line max-statements
const insertButtons = (buttonsOuter: Element, setupItem: InitialSetupItem) => {
    while (buttonsOuter.firstChild) {
        buttonsOuter.removeChild(buttonsOuter.firstChild);
    }

    for (const option of setupItem.options) {
        const button = document.createElement("button");
        button.classList.add("settings-button-item");

        const label = document.createElement("span");
        label.textContent = option.label;
        button.appendChild(label);

        const icon = document.createElement("img");
        icon.src = option.icon;
        button.appendChild(icon);

        button.addEventListener("click", () => {
            console.log("clicked", setupItem.settingsKey, option.value);
            void browser.storage.local.set({ [setupItem.settingsKey]: option.value });
        });

        buttonsOuter.appendChild(button);
    }
};

const buttonsOuter = document.querySelector("#settings-buttons");
if (!buttonsOuter) {
    throw new Error("no #settings-buttons");
}
insertButtons(buttonsOuter, INITIAL_SETUP_ITEMS[0]);
