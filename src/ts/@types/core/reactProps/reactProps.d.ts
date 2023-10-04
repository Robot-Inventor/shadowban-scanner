interface BasicTweetProps {
    possibly_sensitive?: boolean | null;
    possibly_sensitive_editable?: boolean | null;
    permalink: string;
    user: {
        possibly_sensitive?: boolean | null;
        screen_name: string;
        profile_interstitial_type: "" | "sensitive_media" | "fake_account" | "offensive_profile_content" | "timeout";
    };
}

/** @see {isMenuBarReactPropsData} ts-auto-guard:type-guard */
export interface menubarReactProps {
    children: [
        unknown,
        {
            props: {
                retweetWithCommentLink: {
                    state: {
                        quotedStatus: BasicTweetProps;
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
                                                            loggedInUser: {
                                                                screen_name: string;
                                                            };
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
