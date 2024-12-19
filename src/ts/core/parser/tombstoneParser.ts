import {
    type CellInnerDivProps,
    type TombstoneGrandchildProps,
    isCellInnerDivProps,
    isTombstoneGrandchildProps
} from "../../../types/core/reactProps/reactProps";
import { getReactProps } from "./utility";

class TombstoneParser {
    private readonly element: HTMLElement;

    public constructor(element: HTMLElement) {
        this.element = element;
    }

    public parse(): [CellInnerDivProps, TombstoneGrandchildProps] {
        const cellInnerDivProps = getReactProps(this.element);
        if (!isCellInnerDivProps(cellInnerDivProps)) throw new Error("Type of props is invalid.");

        const grandchild = this.element.querySelector<HTMLElement>("div > div");
        if (!grandchild) throw new Error("Failed to get the tombstone's grandchild element.");

        const grandchildProps = getReactProps(grandchild);
        if (!isTombstoneGrandchildProps(grandchildProps)) throw new Error("Type of grandchild props is invalid.");

        return [cellInnerDivProps, grandchildProps];
    }
}

export { TombstoneParser };
