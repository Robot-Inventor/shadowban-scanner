# How Shadowban Scanner Works and About Shadowban

This is a brief description of how Shadowban Scanner works and shadowbans. For more details on the determination method and technical information, please refer to [here (Japanese)](./technical-information.md).

This document was translated from [Japanese](../ja/about-shadowban.md) to English by AI. Please let me know if there are any unnatural points.

## What Is a Shadowban?

There are two definitions for shadowbanning. The first one is the commonly used definition, which refers to the phenomenon where tweets become less likely to appear in search results or recommendations, or may not appear at all.

The second definition is the official one by Twitter, which involves making tweets invisible to everyone except the author, effectively hiding them from public view. You can find more details about this on Twitter's official blog.

- [Twitter's Official Blog on Shadowbanning](https://blog.twitter.com/en_us/topics/company/2018/Setting-the-record-straight-on-shadow-banning)

In this official blog, Twitter claims that it is not shadowbanning under the official Twitter definition, but does not deny that it is shadowbanning under the general definition.

With the commonly used definition of shadowbanning, you can still view the tweets if you access the user's profile.

This does not align with Twitter's official definition of making tweets "undiscoverable to everyone" and it corresponds to the statement in the official blog that says, "you may have to do more work to find them, like go directly to their profile."

Therefore, Twitter does not officially engage in shadowbanning as per their definition, but they indirectly acknowledge the existence of the commonly used definition of shadowbanning. It is believed that shadowbans under the commonly used definition align with what Twitter refers to as "ranking."

From here on, this document will use the commonly used definition for shadowbanning (referred to as Twitter's ranking).

## What is Sensitivity Assessment?

Apart from shadowbanning, Twitter also has a feature known as "Sensitivity Assessment."

When Twitter identifies a tweet or an account as sensitive, it adds a sensitivity flag. This can result in them being less prominently featured in recommendations or search results, or even not being displayed at all.

Twitter's sensitivity assessment is determined globally, and sometimes it may seem counterintuitive.

There are two types of sensitivity assessments for tweets and accounts:

### Sensitivity Assessment for Tweets

For tweets, sensitivity assessment comes in two levels: mild and severe.

Mild sensitivity assessment for tweets will make them not appear in the search results of users who have the "Hide sensitive content" option enabled, regardless of their settings.

Severe sensitivity assessment will make tweets not appear in search results, regardless of settings, and they may have age restrictions applied. With age restrictions, underage users or non-logged-in users won't be able to view them.

### Sensitivity Assessment for Accounts

In the assessment of an account's sensitivity, tweets may become less visible or entirely hidden in search results in both of the two scenarios.

The only (possibly) distinction lies in the ability to modify the setting "Mark media you post as having material that may be sensitive."

It appears that when icons or header images are categorized as sensitive, you lose the ability to modify this setting.

## Differences Between Shadowban and Sensitivity Assessment

Shadowbanning and sensitivity assessment are distinct concepts. However, many accounts that are shadowbanned have an account-level sensitivity flag applied.

Shadowban Scanner determines the likelihood of shadowbanning by detecting account-level sensitivity flags. This method is **not 100% accurate and can produce false positives or false negatives**.

There are more accurate methods for detecting shadowbanning, but Shadowban Scanner currently employs this approach for privacy and security reasons.

While continuously monitoring account status with Shadowban Scanner, it is **recommended to use other tools and websites as needed**.

If the Shadowban Scanner determines that the account has been shadowbanned even though it has not actually been shadowbanned, there is a possibility that the account has not been shadowbanned, but has been determined to be a sensitive account.
