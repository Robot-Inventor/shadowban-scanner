import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { ProfileParser } from "./parser/profileParser";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";
import { TranslationKeyProvider } from "./translationKeyProvider";

/**
 * Check the user profile.
 */
class ProfileChecker {
    private readonly userName: Element;
    private readonly options: Settings;
    private readonly onMessageCallback: () => void;

    /**
     * Check the user profile.
     * @param userNameElement element of the user name
     */
    constructor(userNameElement: Element, options: Settings, onMessageCallback: () => void) {
        this.userName = userNameElement;
        this.options = options;
        this.onMessageCallback = onMessageCallback;
    }

    /**
     * Run the profile checker.
     */
    run() {
        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (!this.options.enableForOtherUsersProfiles && !isCurrentUsersProfile) return;

        this.userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");
        const profileAnalyzer = PropsAnalyzer.analyzeProfileProps(new ProfileParser(this.userName).parse());

        if (!profileAnalyzer.user.shadowbanned && !this.options.showMessagesInUnproblematicProfiles) return;

        const translations = TranslationKeyProvider.fromProfileAnalyzer(profileAnalyzer);

        const sbsMessageWrapper = new SbsMessageWrapper({
            ...translations,
            isAlert: profileAnalyzer.user.shadowbanned,
            onRenderedCallback: this.onMessageCallback,

            type: "profile"
        });

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ||
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");

        sbsMessageWrapper.insertAdjacentElement(bioOrUserName, "afterend");
    }
}

export { ProfileChecker };
