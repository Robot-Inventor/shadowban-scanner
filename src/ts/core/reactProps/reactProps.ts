class ReactProps {
    private readonly element: Element;
    private readonly reactPropsName: string;

    constructor(element: Element) {
        this.element = element;
        [this.reactPropsName] = Object.getOwnPropertyNames(element).filter((name) => name.startsWith("__reactProps$"));
    }

    get(): unknown {
        // @ts-expect-error this.reactPropsName is a property name of this.element
        return this.element[this.reactPropsName];
    }
}

export { ReactProps };
