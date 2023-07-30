import { ReactProps } from "./reactProps";
import { isProfileReactPropsData } from "../../@types/core/reactProps/reactProps.guard";

class ProfileReactProps {
    private readonly userName: Element;

    constructor(userNameElement: Element) {
        this.userName = userNameElement;
    }

    get() {
        const reactProps = new ReactProps(this.userName).get();
        if (!isProfileReactPropsData(reactProps)) throw new Error("Type of reactProps is invalid.");
        return reactProps.children[1].props;
    }
}

export { ProfileReactProps };
