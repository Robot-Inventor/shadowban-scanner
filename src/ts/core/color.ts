// eslint-disable-next-line init-declarations
declare const colorCodeNominality: unique symbol;
type ColorCode = string & { [colorCodeNominality]: never };

class Color {
    static get textColor(): ColorCode {
        const USER_NAME_SELECTOR =
            "[data-testid='User-Name'] div:first-child span, [data-testid='UserName'] div:first-child span";

        const userName = document.querySelector(USER_NAME_SELECTOR);
        if (!userName) throw new Error("Failed to get user name span of tweet");

        const { color } = getComputedStyle(userName);
        return color as ColorCode;
    }
}

export { ColorCode, Color };
