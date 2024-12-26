// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/button/filled-button";
// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/button/text-button";
// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/radio/radio";
// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/list/list";
// eslint-disable-next-line import-x/no-unassigned-import
import "@material/web/list/list-item";
import { INSTRUCTION_URL, TRANSLATION_ATTRIBUTE } from "./common/constants";
import { type NonEmptyArray, isNonEmptyArray } from "@robot-inventor/ts-utils";
import { i18n, runtime, tabs } from "webextension-polyfill";
// eslint-disable-next-line no-duplicate-imports
import type { MdListItem } from "@material/web/list/list-item";
// eslint-disable-next-line no-duplicate-imports
import type { MdRadio } from "@material/web/radio/radio";
import type { Settings } from "../types/common/settings";
import { Translator } from "./common/translator";
// eslint-disable-next-line import-x/max-dependencies
import { writeSettingsToStorage } from "./common/settings";

interface InitialSetupItem {
    options: Array<{
        isDefault: boolean;
        label: string;
        value: boolean;
    }>;
    settingsKey: keyof Settings;
}

const INITIAL_SETUP_ITEMS = [
    {
        options: [
            {
                isDefault: false,
                label: "displayForAllTweetsAndAccounts",
                value: true
            },
            {
                isDefault: true,
                label: "displayOnlyForProblematicTweets",
                value: false
            }
        ],
        settingsKey: "showMessagesInUnproblematicTweets"
    },
    {
        options: [
            {
                isDefault: false,
                label: "displayOnlyInYourOwnTweets",
                value: false
            },
            {
                isDefault: true,
                label: "displayInAllUsersTweets",
                value: true
            }
        ],
        settingsKey: "enableForOtherUsersTweets"
    }
] satisfies NonEmptyArray<InitialSetupItem>;

const removeButtons = (buttonsOuter: Element): void => {
    while (buttonsOuter.firstChild) {
        buttonsOuter.removeChild(buttonsOuter.firstChild);
    }
};

// eslint-disable-next-line max-statements
const createButton = (value: string, label: string, name: string): { outer: MdListItem; button: MdRadio } => {
    const outer = document.createElement("md-list-item");
    outer.classList.add("settings-button-item");
    const id = `settings-button-${label}`;

    const button = document.createElement("md-radio");
    button.value = value;
    button.slot = "start";
    button.id = id;
    button.name = name;
    outer.appendChild(button);

    const labelElement = document.createElement("label");
    labelElement.htmlFor = id;
    labelElement.slot = "headline";
    labelElement.setAttribute(TRANSLATION_ATTRIBUTE, label);
    outer.appendChild(labelElement);

    return { button, outer } as const;
};

// eslint-disable-next-line max-statements
const insertButtons = (buttonsOuter: Element, translator: Translator, setupItem: InitialSetupItem): void => {
    removeButtons(buttonsOuter);

    const mdList = document.createElement("md-list");

    for (const option of setupItem.options) {
        const settingsItem = createButton(option.value.toString(), option.label, setupItem.settingsKey);
        if (option.isDefault) {
            settingsItem.button.checked = true;
        }

        settingsItem.button.dataset["settingsKey"] = setupItem.settingsKey;
        settingsItem.button.dataset["settingsValue"] = option.value.toString();

        mdList.appendChild(settingsItem.outer);
    }

    buttonsOuter.appendChild(mdList);
    translator.translateElements();
};

const updateNavigationButtonsStatus = (
    backButton: HTMLButtonElement,
    nextButton: HTMLButtonElement,
    setupItemIndex: number,
    setupItemsLength: number
    // eslint-disable-next-line max-params
): void => {
    // eslint-disable-next-line no-magic-numbers
    backButton.disabled = setupItemIndex === 0;
    nextButton.disabled = setupItemIndex === setupItemsLength;
};

const updateInstructionToOptionSelectionMessage = (translator: Translator): void => {
    const instruction = document.querySelector("#instruction");
    if (!instruction) throw new Error("no #instruction");

    instruction.setAttribute(TRANSLATION_ATTRIBUTE, "pleaseSelectOneOfThem");
    translator.translateElements();
};

const updateInstructionToCompletionMessage = (translator: Translator): void => {
    const instruction = document.querySelector("#instruction");
    if (!instruction) throw new Error("no #instruction");

    instruction.setAttribute(TRANSLATION_ATTRIBUTE, "initialSetupCompleted");
    translator.translateElements();
};

const closeCurrentTab = async (): Promise<void> => {
    const activeTabs = await tabs.query({ active: true, currentWindow: true });
    if (!isNonEmptyArray(activeTabs)) return;

    const [currentTab] = activeTabs;
    if (!currentTab.id) throw new Error("no current tab");

    void tabs.remove(currentTab.id);
};

// eslint-disable-next-line max-statements
const showCompletionMessage = (buttonsOuter: Element, translator: Translator): void => {
    removeButtons(buttonsOuter);
    updateInstructionToCompletionMessage(translator);

    const mdList = document.createElement("md-list");

    const openUsagesPageButton = createButton("open", "open", "openUsagesPage");
    openUsagesPageButton.button.addEventListener("click", () => {
        void closeCurrentTab();
        const isJapanese = i18n.getUILanguage().toLowerCase().startsWith("ja");
        void tabs.create({
            url: INSTRUCTION_URL[isJapanese ? "ja" : "en"]
        });
    });

    const exitButton = createButton("exitWithoutOpening", "exitWithoutOpening", "openUsagesPage");
    exitButton.button.addEventListener("click", () => {
        void closeCurrentTab();
    });

    mdList.appendChild(exitButton.outer);
    mdList.appendChild(openUsagesPageButton.outer);
    buttonsOuter.appendChild(mdList);

    translator.translateElements();
};

// eslint-disable-next-line max-statements, max-lines-per-function
const main = (): void => {
    const buttonsOuter = document.querySelector<HTMLFormElement>("#settings-buttons");
    if (!buttonsOuter) throw new Error("no #settings-buttons");

    const backButton = document.querySelector<HTMLButtonElement>("#back-button");
    if (!backButton) throw new Error("no #back-button");

    const nextButton = document.querySelector<HTMLButtonElement>("#next-button");
    if (!nextButton) throw new Error("no #next-button");

    const translator = new Translator(
        (messageName, substitutions) => i18n.getMessage(messageName, substitutions),
        runtime.getURL("image/")
    );
    translator.translateElements();

    let setupItemIndex = 0;
    insertButtons(buttonsOuter, translator, INITIAL_SETUP_ITEMS[0]);
    backButton.disabled = true;

    // eslint-disable-next-line max-statements
    nextButton.addEventListener("click", () => {
        const [formData] = Array.from(new FormData(buttonsOuter));
        if (!formData) throw new Error("no formData");

        const [settingsKey, settingsValue] = formData;
        if (!settingsKey || !settingsValue) throw new Error("no settingsKey or settingsValue");
        void writeSettingsToStorage({ [settingsKey]: settingsValue === "true" });

        // eslint-disable-next-line no-magic-numbers
        if (setupItemIndex < INITIAL_SETUP_ITEMS.length - 1) {
            setupItemIndex++;
            const setupItem = INITIAL_SETUP_ITEMS[setupItemIndex];
            if (!setupItem) throw new Error("no setupItem");
            insertButtons(buttonsOuter, translator, setupItem);
        } else {
            setupItemIndex++;
            showCompletionMessage(buttonsOuter, translator);
        }
        updateNavigationButtonsStatus(backButton, nextButton, setupItemIndex, INITIAL_SETUP_ITEMS.length);
    });

    backButton.addEventListener("click", () => {
        // eslint-disable-next-line no-magic-numbers
        if (setupItemIndex > 0) {
            setupItemIndex--;
            const setupItem = INITIAL_SETUP_ITEMS[setupItemIndex];
            if (!setupItem) throw new Error("no setupItem");
            insertButtons(buttonsOuter, translator, setupItem);
            updateNavigationButtonsStatus(backButton, nextButton, setupItemIndex, INITIAL_SETUP_ITEMS.length);
        }

        // eslint-disable-next-line no-magic-numbers
        if (setupItemIndex === INITIAL_SETUP_ITEMS.length - 1) {
            updateInstructionToOptionSelectionMessage(translator);
        }
    });
};

main();
