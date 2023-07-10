import {
    isMenuBarReactPropsData,
    isProfileReactPropsData,
    isTweetOuterReactPropsData,
    isFocalTweetOuterReactPropsData
} from "./reactProps.guard";

/** @see {isMenuBarReactPropsData} ts-auto-guard:type-guard */
export interface MenuBarReactPropsData {
    children: [
        unknown,
        {
            props: {
                retweetWithCommentLink: {
                    state: {
                        quotedStatus: TweetReactPropsData;
                    };
                };
            };
        }
    ];
}

/** @see {isTweetOuterReactPropsData} ts-auto-guard:type-guard */
export interface TweetOuterReactPropsData {
    children: [
        [
            unknown,
            {
                props: {
                    children: [
                        {
                            props: {
                                children: [
                                    unknown,
                                    {
                                        props: {
                                            children: [
                                                unknown,
                                                [
                                                    unknown,
                                                    unknown,
                                                    {
                                                        props: {
                                                            children: [
                                                                unknown,
                                                                {
                                                                    props: {
                                                                        loggedInUser: {
                                                                            screen_name: string;
                                                                        };
                                                                    };
                                                                }
                                                            ];
                                                        };
                                                    }
                                                ]
                                            ];
                                        };
                                    }
                                ];
                            };
                        }
                    ];
                };
            }
        ]
    ];
}

/** @see {isFocalTweetOuterReactPropsData} ts-auto-guard:type-guard */
export interface FocalTweetOuterReactPropsData {
    children: [
        [
            unknown,
            {
                props: {
                    children: [
                        {
                            props: {
                                children: [
                                    unknown,
                                    unknown,
                                    {
                                        props: {
                                            children: [
                                                unknown,
                                                unknown,
                                                unknown,
                                                unknown,
                                                unknown,
                                                unknown,
                                                {
                                                    props: {
                                                        loggedInUser: {
                                                            screen_name: string;
                                                        };
                                                    };
                                                }
                                            ];
                                        };
                                    }
                                ];
                            };
                        }
                    ];
                };
            }
        ]
    ];
}

interface TweetReactPropsData {
    possibly_sensitive?: boolean | null;
    possibly_sensitive_editable?: boolean | null;
    user: {
        possibly_sensitive?: boolean | null;
        screen_name: string;
    };
}

/** @see {isProfileReactPropsData} ts-auto-guard:type-guard */
export interface ProfileReactPropsData {
    children: [
        unknown,
        {
            props: {
                user: {
                    possibly_sensitive: boolean | null;
                };
            };
        }
    ];
}

class ReactProps {
    private readonly element: Element;
    private readonly reactPropsName: string;

    constructor(element: Element) {
        this.element = element;
        this.reactPropsName = Object.getOwnPropertyNames(element).filter((n) => n.startsWith("__reactProps$"))[0];
    }

    get(): unknown {
        // @ts-expect-error
        return this.element[this.reactPropsName];
    }
}

class TweetReactProps {
    private readonly tweet: Element;
    private readonly menuBar: Element;

    constructor(tweet: Element, menuBar: Element) {
        this.tweet = tweet;
        this.menuBar = menuBar;
    }

    get(): TweetReactPropsData {
        const menuBarReactProps = new ReactProps(this.menuBar).get();
        if (!isMenuBarReactPropsData(menuBarReactProps)) throw new Error("Type of menuBarReactProps is invalid.");
        return menuBarReactProps.children[1].props.retweetWithCommentLink.state.quotedStatus;
    }

    get isTweetByCurrentUser(): boolean {
        const tweetAuthorScreenName = this.get().user.screen_name;

        const tweetReactProps = new ReactProps(this.tweet).get();
        let currentUserScreenName = "";
        if (isTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[1].props.children[1][2].props
                    .children[1].props.loggedInUser.screen_name;
        } else if (isFocalTweetOuterReactPropsData(tweetReactProps)) {
            currentUserScreenName =
                tweetReactProps.children[0][1].props.children[0].props.children[2].props.children[6].props.loggedInUser
                    .screen_name;
        } else {
            throw new Error("Type of tweetReactProps is invalid.");
        }

        return tweetAuthorScreenName === currentUserScreenName;
    }
}

class ProfileReactProps {
    private readonly userName: Element;

    constructor(userNameElement: Element) {
        this.userName = userNameElement;
    }

    get() {
        const reactProps = new ReactProps(this.userName).get();
        if (!isProfileReactPropsData(reactProps)) throw new Error("Type of reactProps is invalid.");
        return reactProps.children[1].props;
    }
}

export { TweetReactProps, ProfileReactProps };
