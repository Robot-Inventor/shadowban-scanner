import type { CellInnerDivProps, TombstoneGrandchildProps } from "../../types/core/reactProps/reactProps";
import type { TweetParser } from "./parser/tweetParser";
import type { UserProps } from "twi-ext";

interface ProfileAnalysisResult {
    user: {
        hasAnyProblem: boolean;
        sensitiveMediaInProfile: boolean;
        screenName: string;
        shadowbanned: boolean;
        withheldInCountries: string[];
        isLoggedInUser: boolean;
    };
}

interface TweetAnalysisResult extends ProfileAnalysisResult {
    tweet: {
        ageRestriction: boolean;
        hasAnyProblem: boolean;
        possiblySensitive: boolean;
        searchability: "searchable" | "unsearchable" | "possiblyUnsearchable";
    };
}

const analyzeProfileProps = (props: UserProps): ProfileAnalysisResult => {
    const possiblySensitive = Boolean(props.possibly_sensitive);
    const sensitiveMediaInProfile = Boolean(
        ["sensitive_media", "offensive_profile_content"].includes(props.profile_interstitial_type)
    );
    const withheldInCountries = props.withheld_in_countries;
    const shadowbanned = possiblySensitive || sensitiveMediaInProfile;

    return {
        user: {
            // eslint-disable-next-line no-magic-numbers
            hasAnyProblem: shadowbanned || withheldInCountries.length > 0,
            isLoggedInUser: Boolean(document.querySelector('[data-testid="editProfileButton"')),
            screenName: props.screen_name,
            sensitiveMediaInProfile,
            shadowbanned,
            withheldInCountries
        }
    };
};

const analyzeTweetProps = (parser: TweetParser): TweetAnalysisResult => {
    const props = parser.parse();

    const userAnalysisResult = analyzeProfileProps(props.user);
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

        tweet: {
            ageRestriction,
            hasAnyProblem: searchability !== "searchable" || userAnalysisResult.user.hasAnyProblem,
            possiblySensitive,
            searchability
        }
    };
};

const analyzeTombstoneProps = (props: [CellInnerDivProps, TombstoneGrandchildProps]): string | undefined => {
    const [cellInnerDivProps, grandchildProps] = props;

    // eslint-disable-next-line no-underscore-dangle, no-undefined
    if (!cellInnerDivProps.children._owner) return undefined;

    // eslint-disable-next-line no-undefined
    if (grandchildProps.children[0].props.entry.conversationPosition.showReplyContext) return undefined;

    // eslint-disable-next-line no-underscore-dangle
    const { key } = cellInnerDivProps.children._owner;
    // Extract tweet ID from `conversationthread-${string}-tweet-${string}`
    // eslint-disable-next-line prefer-destructuring
    const tweetId = key.split("-")[3];
    return tweetId;
};

export {
    type ProfileAnalysisResult,
    type TweetAnalysisResult,
    analyzeProfileProps,
    analyzeTweetProps,
    analyzeTombstoneProps
};
