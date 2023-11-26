/**
 * ReactProps class.
 */
class ParserBase {
    private readonly element: Element;
    private readonly reactPropsName: string;

    /**
     * Parse the React props.
     * @param element element to parse
     */
    constructor(element: Element) {
        this.element = element;
        [this.reactPropsName] = Object.getOwnPropertyNames(element).filter((name) => name.startsWith("__reactProps$"));
    }

    /**
     * Get the React props.
     * @returns React props
     */
    get(): unknown {
        // @ts-expect-error this.reactPropsName is a property name of this.element
        return this.element[this.reactPropsName];
    }
}

export { ParserBase };
