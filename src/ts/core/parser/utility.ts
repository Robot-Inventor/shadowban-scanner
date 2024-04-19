/**
 * Get the React props.
 * @param element element to parse
 * @returns React props
 */
const getReactProps = (element: Element): unknown => {
    const reactPropsName = Object.getOwnPropertyNames(element).filter((name) => name.startsWith("__reactProps$"));
    // @ts-expect-error this.reactPropsName is a property name of this.element
    return element[reactPropsName];
};

export { getReactProps };
