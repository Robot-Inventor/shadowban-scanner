import "../components/sbsMessage";
import { SHADOW_TRANSLATION_ATTRIBUTE } from "../common/constants";
// eslint-disable-next-line no-duplicate-imports
import type { SbsMessageDetails } from "../components/sbsMessage";
import { TranslationKey } from "../../types/common/translator";
import type { Tweet } from "twi-ext";

interface SbsMessageWrapperOptionsForTweets {
    type: "tweet";

    tweet: Tweet;
    summary: TranslationKey;
    details: SbsMessageDetails;
    notes: TranslationKey[];

    isAlert: boolean;
    isFocal: boolean;
    isExpanded: boolean;
    isTweetButtonShown: boolean;
    isNoteShown: boolean;

    tweetText: string;

    onRenderedCallback?: () => void;
}

interface SbsMessageWrapperOptionsForProfiles {
    type: "profile";

    summary: TranslationKey;
    isAlert: boolean;
    onRenderedCallback?: () => void;
}

class SbsMessageWrapper {
    // eslint-disable-next-line no-magic-numbers
    private readonly ASYNC_QUERY_TIMEOUT_MS = 750;

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

        if (options.type === "tweet") {
            if (!options.tweet) throw new Error("Tweet data is missing");
            this.tweet = options.tweet;
            sbsMessage.details = options.details;
            sbsMessage.notes = options.notes;
            sbsMessage.isFocalMode = options.isFocal;
            sbsMessage.isExpanded = options.isExpanded;
            sbsMessage.isTweetButtonShown = options.isTweetButtonShown;
            sbsMessage.isNoteShown = options.isNoteShown;

            this.tweetText = options.tweetText;
        } else {
            sbsMessage.isExpanded = true;
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
        if (!(this.tweet && this.tweetText)) {
            throw new Error("Tweet button clicked without source tweet");
        }

        void this.tweet.quoteTweet(this.tweetText, this.ASYNC_QUERY_TIMEOUT_MS);
    }

    public insertAdjacentElement(target: Element, position: InsertPosition): void {
        target.insertAdjacentElement(position, this.sbsMessage);
    }
}

export { SbsMessageWrapperOptionsForTweets, SbsMessageWrapperOptionsForProfiles, SbsMessageWrapper };
