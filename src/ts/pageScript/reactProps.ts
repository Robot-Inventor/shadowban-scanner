class ReactProps {
    private readonly element: Element;
    private readonly reactPropsName: string;

    constructor(element: Element) {
        this.element = element;
        this.reactPropsName = Object.getOwnPropertyNames(element).filter((n) => n.startsWith("__reactProps$"))[0];
    }

    get() {
        // @ts-expect-error
        return this.element[this.reactPropsName].children[1].props;
    }
}

class TweetReactProps {
    private readonly tweet: Element;

    constructor(tweet: Element) {
        this.tweet = tweet;
    }

    get() {
        const reactProps = new ReactProps(this.tweet).get();
        return reactProps.retweetWithCommentLink.state.quotedStatus;
    }
}

class ProfileReactProps {
    private readonly userName: Element;

    constructor(userNameElement: Element) {
        this.userName = userNameElement;
    }

    get() {
        const reactProps = new ReactProps(this.userName).get();
        // @ts-expect-error
        return this.userName[reactProps].children[1].props;
    }
}

export { TweetReactProps, ProfileReactProps };
