import { CellInnerDivProps } from "../../../types/core/reactProps/reactProps";
import { ParserBase } from "./parserBase";
import { isCellInnerDivProps } from "../../../types/core/reactProps/reactProps.guard";

class TombstoneParser extends ParserBase {
    public parse(): CellInnerDivProps {
        const props = this.getProps();
        if (!isCellInnerDivProps(props)) throw new Error("Type of props is invalid.");

        return props;
    }
}

export { TombstoneParser };
