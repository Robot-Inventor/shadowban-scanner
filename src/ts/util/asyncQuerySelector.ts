/**
 * Get element by selector.
 * @param selector selector
 * @param parentElement parent element
 * @returns result
 */
const asyncQuerySelector = async (
    selector: string,
    parentElement: Element | Document = document
): Promise<HTMLElement> => {
    const promise = new Promise<HTMLElement>((resolve, reject) => {
        const TIMEOUT_MS = 500;

        const initialResult = parentElement.querySelector<HTMLElement>(selector);
        if (initialResult) {
            resolve(initialResult);
            return;
        }

        let timeout: NodeJS.Timeout | null = null;

        const observer = new MutationObserver(() => {
            const element = parentElement.querySelector<HTMLElement>(selector);
            if (!element) return;

            observer.disconnect();
            if (timeout) {
                clearTimeout(timeout);
            }
            resolve(element);
        });

        timeout = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Failed to get ${selector}`));
        }, TIMEOUT_MS);

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });
    });

    return promise;
};

export { asyncQuerySelector };
