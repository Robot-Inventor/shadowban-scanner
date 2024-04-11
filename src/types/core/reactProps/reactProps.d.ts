type ProfileInterstitialType = "" | "sensitive_media" | "fake_account" | "offensive_profile_content" | "timeout";
interface UserProps {
    possibly_sensitive?: boolean | null;
    screen_name: string;
    profile_interstitial_type: ProfileInterstitialType;
    withheld_in_countries: string[];
}

/** @see {isCellInnerDivProps} ts-auto-guard:type-guard */
interface CellInnerDivProps {
    children: {
        _owner?: {
            key: string;
        };
    };
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
                user: UserProps;
            };
        }
    ];
}
