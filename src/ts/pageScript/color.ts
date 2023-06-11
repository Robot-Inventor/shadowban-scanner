declare const colorCodeNominality: unique symbol;
type ColorCode = string & { [colorCodeNominality]: never };

class Color {
    constructor() {}

    get textColor(): ColorCode {
        const userName = document.querySelector(
            "[data-testid='User-Name'] div:first-child span, [data-testid='UserName'] div:first-child span"
        );
        if (!userName) throw new Error("Failed to get user name span of tweet");
        const { color } = getComputedStyle(userName);
        return color as ColorCode;
    }
}

export { ColorCode, Color };
