import type { ProfileParser } from "./parser/profileParser";
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
        permalink: string;
        possiblySensitive: boolean;
        searchability: "searchable" | "unsearchable" | "possiblyUnsearchable";
    };
}

class PropsAnalyzer {
    public static analyzeProfileProps(props: ReturnType<ProfileParser["parse"]>): ProfileAnalysisResult {
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

    public static analyzeTweetProps(props: ReturnType<TweetParser["parse"]>): TweetAnalysisResult {
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
            tweet: {
                ageRestriction,
                permalink: props.permalink,
                possiblySensitive,
                searchability
            }
        };
    }
}

export { TweetAnalysisResult, PropsAnalyzer };
