import { ParserBase } from "./parserBase";
import type { UserProps } from "../../@types/core/reactProps/reactProps";
import { isProfileReactPropsData } from "../../@types/core/reactProps/reactProps.guard";

/**
 * React props of the user profile.
 */
class ProfileParser extends ParserBase {
    /**
     * Get the React props of the user profile.
     * @returns React props of the user profile
     */
    public parse(): UserProps {
        const reactProps = this.getProps();
        if (!isProfileReactPropsData(reactProps)) throw new Error("Type of reactProps is invalid.");

        return reactProps.children[1].props.user;
    }
}

export { ProfileParser };
