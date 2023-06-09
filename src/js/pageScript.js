(function () {
    "use strict";

    const CHECKED_DATA_ATTRIBUTE = "data-shadowban-checked";

    const eventGenerator = document.createElement("div");
    eventGenerator.id = "shadowban-scanner-event-generator";
    document.body.appendChild(eventGenerator);

    const dispatchEvent = () => {
        eventGenerator.dispatchEvent(new CustomEvent("newMessage"));
    };

    const createMessageElement = (type, messageType, color) => {
        const div = document.createElement("div");
        div.classList.add("shadowban-scanner-message");
        div.dataset.messageType = messageType;
        div.style.color = color;

        if (type === "tweet") {
            const pre = document.createElement("pre");
            pre.style.display = "none";
            div.appendChild(pre);

            const button = document.createElement("button");
            button.addEventListener("click", () => {
                pre.style.display = "block";
                button.remove();
            });
            div.appendChild(button);
        }

        return div;
    };

    const checkTweet = () => {
        const tweet = document.querySelector(`[data-testid="tweet"]:not([${CHECKED_DATA_ATTRIBUTE}]`);
        if (!tweet) return;

        tweet.setAttribute(CHECKED_DATA_ATTRIBUTE, true);
        const menuBar = tweet.querySelector("div[role='group'][id]");

        const reactPropsName = Object.getOwnPropertyNames(menuBar).filter((n) => n.startsWith("__reactProps$"))[0];
        const isUserPossiblySensitive = Boolean(menuBar[reactPropsName].children[1].props.retweetWithCommentLink.state.quotedStatus.user.possibly_sensitive);
        const isTweetPossiblySensitive = Boolean(menuBar[reactPropsName].children[1].props.retweetWithCommentLink.state.quotedStatus.possibly_sensitive);
        const isTweetPossiblySensitiveEditable = Boolean(menuBar[reactPropsName].children[1].props.retweetWithCommentLink.state.quotedStatus.possibly_sensitive_editable);

        const userName = tweet.querySelector("[data-testid='User-Name']");
        const { color } = getComputedStyle(userName.querySelector("[data-testid='User-Name'] > div:first-child span"));
        const div = createMessageElement("tweet", "", color);

        if (isUserPossiblySensitive && !isTweetPossiblySensitive) {
            div.dataset.messageType = "accountShadowbanned";
        } else if (isUserPossiblySensitive && isTweetPossiblySensitive) {
            if (isTweetPossiblySensitiveEditable) {
                div.dataset.messageType = "accountShadowbannedAndTweetFlaggedAsSensitive";
            } else {
                div.dataset.messageType = "accountAndTweetShadowbanned";
            }
        } else if (isTweetPossiblySensitive && isTweetPossiblySensitiveEditable) {
            div.dataset.messageType = "tweetFlaggedAsSensitive";
        } else if (isTweetPossiblySensitive && !isTweetPossiblySensitiveEditable) {
            div.dataset.messageType = "tweetShadowbanned";
        } else {
            div.dataset.messageType = "tweetNoProblem";
            div.classList.add("shadowban-scanner-message-no-problem");
        }

        menuBar.insertAdjacentElement("beforebegin", div);
        dispatchEvent();
    }

    const checkProfile = () => {
        const userName = document.querySelector(`:not([data-testid="tweet"]) [data-testid="UserName"]:not([${CHECKED_DATA_ATTRIBUTE}])`);
        if (!userName) return;

        userName.setAttribute(CHECKED_DATA_ATTRIBUTE, true);
        const reactPropsName = Object.getOwnPropertyNames(userName).filter((n) => n.startsWith("__reactProps$"))[0];
        const isUserPossiblySensitive = Boolean(userName[reactPropsName].children[1].props.user.possibly_sensitive);
        if (!isUserPossiblySensitive) return;

        const { color } = getComputedStyle(userName.querySelector("div:first-child span"));

        const div = createMessageElement("account", "accountShadowbanned", color);
        document.querySelector("[data-testid='UserDescription']").insertAdjacentElement("afterend", div);
        dispatchEvent();
    };

    const timelineObserver = new MutationObserver(() => {
        checkTweet();
        checkProfile();
    });

    const loadingObserver = new MutationObserver(() => {
        const main = document.querySelector("main");
        if (!main) return;

        loadingObserver.disconnect();
        timelineObserver.observe(main, { subtree: true, childList: true });
    });
    loadingObserver.observe(document.body, { subtree: true, childList: true });
})();
