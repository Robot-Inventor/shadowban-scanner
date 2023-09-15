import { CHECKED_DATA_ATTRIBUTE, NO_PROBLEM_CLASS_NAME } from "../common/constants";
import { Color } from "./color";
import { MessageElement } from "./messageElement";
import { MessageSummary } from "./messageSummary";
import { ProfileReactProps } from "./reactProps/profileReactProps";

class ProfileChecker {
    private readonly userName: Element;

    constructor(userNameElement: Element) {
        this.userName = userNameElement;
    }

    run() {
        this.userName.setAttribute(CHECKED_DATA_ATTRIBUTE, "true");
        const reactProps = new ProfileReactProps(this.userName).get();
        const isUserPossiblySensitive = Boolean(reactProps.user.possibly_sensitive);

        const color = Color.textColor;

        const messageElement = new MessageElement(
            {
                type: "account",
                // eslint-disable-next-line sort-keys
                summary: MessageSummary.fromAccountStatus(isUserPossiblySensitive)
            },
            color
        );
        if (!isUserPossiblySensitive) {
            messageElement.element.classList.add(NO_PROBLEM_CLASS_NAME);
        }
        const userDescription = document.querySelector("[data-testid='UserDescription']");
        if (!userDescription) throw new Error("Failed to get user description of profile");
        userDescription.insertAdjacentElement("afterend", messageElement.element);
    }
}

export { ProfileChecker };
