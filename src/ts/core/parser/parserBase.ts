/**
 * ReactProps class.
 */
class ParserBase {
    public readonly sourceElement: HTMLElement;
    private readonly reactPropsName: string;

    /**
     * Parse the React props.
     * @param element element to parse
     */
    constructor(element: HTMLElement) {
        this.sourceElement = element;
        [this.reactPropsName] = Object.getOwnPropertyNames(element).filter((name) => name.startsWith("__reactProps$"));
    }

    /**
     * Get the React props.
     * @returns React props
     */
    protected getProps(element: Element = this.sourceElement): unknown {
        // @ts-expect-error this.reactPropsName is a property name of this.element
        return element[this.reactPropsName];
    }
}

export { ParserBase };
