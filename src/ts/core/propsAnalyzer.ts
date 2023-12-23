import { CellInnerDivProps, UserProps } from "../@types/core/reactProps/reactProps";
import type { TweetParser } from "./parser/tweetParser";

interface ProfileAnalysisResult {
    user: {
        sensitiveMediaInProfile: boolean;
        shadowbanned: boolean;
        withheldInCountries: string[];
    };
}

interface TweetAnalysisResult extends ProfileAnalysisResult {
    tweet: {
        ageRestriction: boolean;
        possiblySensitive: boolean;
        searchability: "searchable" | "unsearchable" | "possiblyUnsearchable";
    };

    meta: {
        sourceTweetPermalink: string;
        isFocal: boolean;
        isTweetByCurrentUser: boolean;
        sourceTweet: HTMLElement;
        menuBar: HTMLElement;
    };
}

class PropsAnalyzer {
    public static analyzeProfileProps(props: UserProps): ProfileAnalysisResult {
        const possiblySensitive = Boolean(props.possibly_sensitive);
        const sensitiveMediaInProfile = Boolean(
            ["sensitive_media", "offensive_profile_content"].includes(props.profile_interstitial_type)
        );
        const withheldInCountries = props.withheld_in_countries;
        const shadowbanned = possiblySensitive || sensitiveMediaInProfile;

        return {
            user: {
                sensitiveMediaInProfile,
                shadowbanned,
                withheldInCountries
            }
        };
    }

    public static analyzeTweetProps(parser: TweetParser): TweetAnalysisResult {
        const props = parser.parse();

        const userAnalysisResult = PropsAnalyzer.analyzeProfileProps(props.user);
        const possiblySensitive = Boolean(props.possibly_sensitive);
        // Ref: https://github.com/Robot-Inventor/shadowban-scanner/issues/16
        const possiblySensitiveEditable = !(props.possibly_sensitive_editable === false);

        const ageRestriction = possiblySensitive && !possiblySensitiveEditable;

        let searchability: TweetAnalysisResult["tweet"]["searchability"] = "searchable";

        if (ageRestriction || userAnalysisResult.user.shadowbanned) {
            searchability = "unsearchable";
        } else if (possiblySensitive) {
            searchability = "possiblyUnsearchable";
        }

        return {
            ...userAnalysisResult,

            meta: {
                isFocal: parser.isFocal,
                isTweetByCurrentUser: parser.isTweetByCurrentUser,
                menuBar: parser.getMenuBar(),
                sourceTweet: parser.sourceElement,
                sourceTweetPermalink: props.permalink
            },

            tweet: {
                ageRestriction,
                possiblySensitive,
                searchability
            }
        };
    }

    public static analyzeTombstoneProps(props: CellInnerDivProps): string {
        // eslint-disable-next-line no-underscore-dangle
        const { key } = props.children._owner;
        // Extract tweet ID from `conversationthread-${string}-tweet-${string}`
        // eslint-disable-next-line prefer-destructuring
        const tweetId = key.split("-")[3];
        return tweetId;
    }
}

export { ProfileAnalysisResult, TweetAnalysisResult, PropsAnalyzer };
