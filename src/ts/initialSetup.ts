import { INSTRUCTION_URL, TRANSLATION_ATTRIBUTE } from "./common/constants";
import { i18n, runtime, storage, tabs } from "webextension-polyfill";
import type { Settings } from "../types/common/settings";
import { Translator } from "./common/translator";

interface InitialSetupItem {
    options: Array<{
        default: boolean;
        icon: string;
        label: string;
        value: boolean;
    }>;
    settingsKey: keyof Settings;
}

const INITIAL_SETUP_ITEMS = [
    {
        options: [
            {
                default: false,
                icon: "../image/done_all.svg",
                label: "displayForAllTweetsAndAccounts",
                value: true
            },
            {
                default: true,
                icon: "../image/report.svg",
                label: "displayOnlyForProblematicTweets",
                value: false
            }
        ],
        settingsKey: "showMessagesInUnproblematicTweets"
    },
    {
        options: [
            {
                default: false,
                icon: "../image/person.svg",
                label: "displayOnlyInYourOwnTweets",
                value: false
            },
            {
                default: true,
                icon: "../image/group.svg",
                label: "displayInAllUsersTweets",
                value: true
            }
        ],
        settingsKey: "enableForOtherUsersTweets"
    }
] satisfies InitialSetupItem[];

const removeButtons = (buttonsOuter: Element): void => {
    while (buttonsOuter.firstChild) {
        buttonsOuter.removeChild(buttonsOuter.firstChild);
    }
};

const createButton = (label: string, icon: string): HTMLButtonElement => {
    const button = document.createElement("button");
    button.classList.add("settings-button-item");

    const labelSpan = document.createElement("span");
    labelSpan.setAttribute(TRANSLATION_ATTRIBUTE, label);
    button.appendChild(labelSpan);

    const iconImg = document.createElement("img");
    iconImg.src = icon;
    button.appendChild(iconImg);

    return button;
};

const insertButtons = (buttonsOuter: Element, translator: Translator, setupItem: InitialSetupItem): void => {
    removeButtons(buttonsOuter);

    for (const option of setupItem.options) {
        const button = createButton(option.label, option.icon);
        if (option.default) {
            button.classList.add("selected");
        }

        button.dataset.settingsKey = setupItem.settingsKey;
        button.dataset.settingsValue = option.value.toString();

        button.addEventListener("click", () => {
            document.querySelectorAll(".settings-button-item").forEach((element) => {
                element.classList.remove("selected");
            });
            button.classList.add("selected");
        });

        buttonsOuter.appendChild(button);
    }

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
    const [currentTab] = activeTabs;
    if (!currentTab.id) throw new Error("no current tab");
    void tabs.remove(currentTab.id);
};

const showCompletionMessage = (buttonsOuter: Element, translator: Translator): void => {
    removeButtons(buttonsOuter);
    updateInstructionToCompletionMessage(translator);

    const openUsagesPageButton = createButton("open", "../image/open_in_new.svg");
    openUsagesPageButton.addEventListener("click", () => {
        void closeCurrentTab();
        const isJapanese = i18n.getUILanguage().toLowerCase().startsWith("ja");
        void tabs.create({
            url: INSTRUCTION_URL[isJapanese ? "ja" : "en"]
        });
    });

    const exitButton = createButton("exitWithoutOpening", "../image/close.svg");
    exitButton.addEventListener("click", () => {
        void closeCurrentTab();
    });

    buttonsOuter.appendChild(exitButton);
    buttonsOuter.appendChild(openUsagesPageButton);
    translator.translateElements();
};

// eslint-disable-next-line max-statements
const main = (): void => {
    const buttonsOuter = document.querySelector("#settings-buttons");
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
        const selectedButton = document.querySelector<HTMLButtonElement>(".settings-button-item.selected");
        if (!selectedButton) throw new Error("no selected button");
        const { settingsKey } = selectedButton.dataset;
        const { settingsValue } = selectedButton.dataset;
        if (!settingsKey || !settingsValue) throw new Error("no settingsKey or settingsValue");
        void storage.local.set({ [settingsKey]: settingsValue === "true" });

        // eslint-disable-next-line no-magic-numbers
        if (setupItemIndex < INITIAL_SETUP_ITEMS.length - 1) {
            setupItemIndex++;
            insertButtons(buttonsOuter, translator, INITIAL_SETUP_ITEMS[setupItemIndex]);
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
            insertButtons(buttonsOuter, translator, INITIAL_SETUP_ITEMS[setupItemIndex]);
            updateNavigationButtonsStatus(backButton, nextButton, setupItemIndex, INITIAL_SETUP_ITEMS.length);
        }

        // eslint-disable-next-line no-magic-numbers
        if (setupItemIndex === INITIAL_SETUP_ITEMS.length - 1) {
            updateInstructionToOptionSelectionMessage(translator);
        }
    });
};

main();
