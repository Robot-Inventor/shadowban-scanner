import { CHECKED_DATA_ATTRIBUTE } from "../common/constants";
import { Message } from "./message";
import { MessageSummary } from "./messageSummary";
import { ProfileReactProps } from "./reactProps/profileReactProps";
import { Settings } from "../@types/common/settings";

/**
 * Check the user profile.
 */
class ProfileChecker {
    private readonly userName: Element;
    private readonly options: Settings;

    /**
     * Check the user profile.
     * @param userNameElement element of the user name
     */
    constructor(userNameElement: Element, options: Settings) {
        this.userName = userNameElement;
        this.options = options;
    }

    /**
     * Run the profile checker.
     */
    // eslint-disable-next-line max-statements
    run() {
        const isCurrentUsersProfile = Boolean(document.querySelector("[data-testid='editProfileButton']"));
        if (!this.options.enableForOtherUsersProfiles && !isCurrentUsersProfile) return;

        this.userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");
        const reactProps = new ProfileReactProps(this.userName).get();
        const isUserPossiblySensitive = Boolean(reactProps.user.possibly_sensitive);

        const message = new Message(MessageSummary.fromAccountStatus(isUserPossiblySensitive));
        message.isAlert = isUserPossiblySensitive;
        message.expand();

        const bioOrUserName =
            document.querySelector("[data-testid='UserDescription']") ||
            document.querySelector("[data-testid='UserName']");
        if (!bioOrUserName) throw new Error("Failed to get user description of profile");
        bioOrUserName.insertAdjacentElement("afterend", message.getContainer());
    }
}

export { ProfileChecker };
