import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { MessageSummary } from "./messageSummary";
import { ProfileReactProps } from "./parser/profileReactProps";
import { SbsMessageWrapper } from "./sbsMessageWrapper";
import { Settings } from "../@types/common/settings";

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
        const reactProps = new ProfileReactProps(this.userName).get();
        const isUserPossiblySensitive =
            Boolean(reactProps.user.possibly_sensitive) ||
            Boolean(
                ["sensitive_media", "offensive_profile_content"].includes(reactProps.user.profile_interstitial_type)
            );

        if (!isUserPossiblySensitive && !this.options.showMessagesInUnproblematicProfiles) return;

        const sbsMessageWrapper = new SbsMessageWrapper({
            isAlert: isUserPossiblySensitive,
            onRenderedCallback: this.onMessageCallback,
            summary: MessageSummary.fromAccountStatus(isUserPossiblySensitive),

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
