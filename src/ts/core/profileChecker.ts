import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { MessageDataGenerator } from "../messageDataGenerator";
import { ProfileParser } from "./parser/profileParser";
import { PropsAnalyzer } from "./propsAnalyzer";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";

/**
 * Check the user profile.
 */
class ProfileChecker {
    private readonly userName: HTMLElement;
    private readonly options: Settings;
    private readonly onMessageCallback: () => void;

    /**
     * Check the user profile.
     * @param userNameElement element of the user name
     */
    constructor(userNameElement: HTMLElement, options: Settings, onMessageCallback: () => void) {
        this.userName = userNameElement;
        this.options = options;
        this.onMessageCallback = onMessageCallback;
    }

    /**
     * Run the profile checker.
     */
    run(): void {
        this.userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");

        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (!this.options.enableForOtherUsersProfiles && !isCurrentUsersProfile) return;

        const profileAnalyzer = PropsAnalyzer.analyzeProfileProps(new ProfileParser(this.userName).parse());
        if (!profileAnalyzer.user.shadowbanned && !this.options.showMessagesInUnproblematicProfiles) return;

        const messageData = MessageDataGenerator.generateForProfile(profileAnalyzer, this.onMessageCallback);
        const sbsMessageWrapper = new SbsMessageWrapper(messageData);

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ||
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");

        sbsMessageWrapper.insertAdjacentElement(bioOrUserName, "afterend");
    }
}

export { ProfileChecker };
