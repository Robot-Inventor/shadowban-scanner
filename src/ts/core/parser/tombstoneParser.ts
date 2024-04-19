import { CellInnerDivProps } from "../../../types/core/reactProps/reactProps";
import { getReactProps } from "./utility";
import { isCellInnerDivProps } from "../../../types/core/reactProps/reactProps.guard";

class TombstoneParser {
    private readonly element: HTMLElement;

    public constructor(element: HTMLElement) {
        this.element = element;
    }

    public parse(): CellInnerDivProps {
        const props = getReactProps(this.element);
        if (!isCellInnerDivProps(props)) throw new Error("Type of props is invalid.");

        return props;
    }
}

export { TombstoneParser };
