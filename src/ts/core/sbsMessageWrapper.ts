// eslint-disable-next-line import-x/no-unassigned-import
import "../components/sbsMessage";
import { SHADOW_TRANSLATION_ATTRIBUTE } from "../common/constants";
// eslint-disable-next-line no-duplicate-imports
import type { SbsMessageDetails } from "../components/sbsMessage";
import type { TranslationKey } from "../../types/common/translator";
import type { Tweet } from "twi-ext";

interface SbsMessageWrapperOptionsBase {
    summary: TranslationKey;
    details: SbsMessageDetails;
    notes: TranslationKey[];

    isAlert: boolean;
    isExpanded: boolean;
    isTweetButtonShown: boolean;
    isNoteShown: boolean;

    tweetText: string;

    onRenderedCallback?: () => void;
}

interface SbsMessageWrapperOptionsForTweets extends SbsMessageWrapperOptionsBase {
    type: "tweet";
    tweet: Tweet;
}

interface SbsMessageWrapperOptionsForProfiles extends SbsMessageWrapperOptionsBase {
    type: "profile";
}

class SbsMessageWrapper {
    private readonly sbsMessage: HTMLElement;
    private readonly tweet: Tweet | null = null;
    private readonly tweetText?: string;

    // eslint-disable-next-line max-statements
    public constructor(options: SbsMessageWrapperOptionsForTweets | SbsMessageWrapperOptionsForProfiles) {
        const sbsMessage = document.createElement("sbs-message");

        sbsMessage.textColor = SbsMessageWrapper.getTextColor();
        sbsMessage.summary = options.summary;
        sbsMessage.isAlert = options.isAlert;
        sbsMessage.onRenderedCallback = options.onRenderedCallback;

        sbsMessage.details = options.details;
        sbsMessage.notes = options.notes;
        sbsMessage.isExpanded = options.isExpanded;
        sbsMessage.isTweetButtonShown = options.isTweetButtonShown;
        sbsMessage.isNoteShown = options.isNoteShown;

        this.tweetText = options.tweetText;

        if (options.type === "tweet") {
            this.tweet = options.tweet;
            sbsMessage.isFocalMode = options.tweet.metadata.isFocalMode;
        }

        sbsMessage.setAttribute(SHADOW_TRANSLATION_ATTRIBUTE, "");
        sbsMessage.addEventListener("tweetButtonClick", this.onTweetButtonClick.bind(this));
        this.sbsMessage = sbsMessage;
    }

    /**
     * Get the text color of the tweet.
     * @returns text color of the tweet
     */
    private static getTextColor(): `rgb(${number}, ${number}, ${number})` {
        const TEXT_SELECTOR = [
            "[data-testid='User-Name'] div:first-child span",
            "[data-testid='UserName'] div:first-child span"
        ].join(",");

        const text = document.querySelector(TEXT_SELECTOR);
        if (!text) throw new Error("Failed to get user name span of tweet");

        const { color } = getComputedStyle(text);
        return color as `rgb(${number}, ${number}, ${number})`;
    }

    private onTweetButtonClick(): void {
        // TODO: プロフィールの検証結果をツイートする機能を追加する
        if (!(this.tweet && this.tweetText)) {
            throw new Error("Tweet button clicked without source tweet");
        }

        void this.tweet.quoteTweet(this.tweetText);
    }

    public insertAdjacentElement(target: Element, position: InsertPosition): void {
        target.insertAdjacentElement(position, this.sbsMessage);
    }
}

export { type SbsMessageWrapperOptionsForTweets, type SbsMessageWrapperOptionsForProfiles, SbsMessageWrapper };
