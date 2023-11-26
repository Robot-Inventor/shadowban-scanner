import { ReactProps } from "./reactProps";
import { isProfileReactPropsData } from "../../@types/core/reactProps/reactProps.guard";

/**
 * React props of the user profile.
 */
class ProfileReactProps {
    private readonly userName: Element;

    /**
     * Parse the React props of the user profile.
     * @param userNameElement element of the user name
     */
    constructor(userNameElement: Element) {
        this.userName = userNameElement;
    }

    /**
     * Get the React props of the user profile.
     * @returns React props of the user profile
     */
    get() {
        const reactProps = new ReactProps(this.userName).get();
        if (!isProfileReactPropsData(reactProps)) throw new Error("Type of reactProps is invalid.");
        return reactProps.children[1].props;
    }
}

export { ProfileReactProps };
