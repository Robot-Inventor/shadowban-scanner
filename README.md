# Shadowban Scanner

[![Node.js CI (build)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml) [![Node.js CI (lint)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml) [![Node.js CI (format)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml)

![Shadowban Scanner's logo](doc/image/logo.svg)

[日本語で読む](README_ja.md) | [한국어로 읽기](README_ko.md) | [以繁體字閱讀](README_zh_tw.md)

A browser extension that detects shadowbans on Twitter.

<p align="center">
<a href="https://www.buymeacoffee.com/keita_roboin"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=keita_roboin&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

## Installation

<p align="center">
<a href="https://chromewebstore.google.com/detail/enlganfikppbjhabhkkilafmkhifadjd"><img src="./doc/image/badge/chrome.svg" height="75px"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/kfeecmboomhggeeceipnbbdjmhjoccbl"><img src="./doc/image/badge/edge.svg" height="75px"></a>
<a href="https://addons.mozilla.org/firefox/addon/{8fee6fa8-6d95-4b9e-9c51-324c207fabff}/"><img src="./doc/image/badge/firefox.svg" height="75px"></a>
</p>

### User Scripts

The settings cannot be changed in the user script version. If you need detailed customization, please use the Browser Extensions version.

- [English](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/en.user.js)
- [日本語](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ja.user.js)
- [한국어](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ko.user.js)
- [繁體中文](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/zh_TW.user.js)

## Features

- Detects shadowbans and sensitive flags per account
- Detects sensitive flags for profile media (icon and header image)
- Detects countries that block accounts for legal reasons
- Detects sensitive flags per tweet
- Detects age restrictions on tweets
- Adds buttons to show hidden tweets

![Screenshot of per-account shadowban detection](doc/image/screenshot2_en.png)

![Screenshot of per-tweet shadowban detection](doc/image/screenshot1_en.png)

![Screenshot of a hidden tweet](doc/image/screenshot3_en.png)

## Accuracy

When it comes to detecting shadowbans on an account level, like many other tools, there can be instances of false positives and false negatives. However, when it comes to detecting sensitive flags and age restrictions on a tweet level, it can be almost perfectly accurate. Therefore, it is recommended to use Shadowban Scanner to continuously monitor the status of your account and tweets, while also utilizing other tools alongside it.

## Detection Methods

For more information on detection methods and technical details, please refer to the following documents.

- [How Shadowban Scanner Works and About Shadowban](./doc/en/about-shadowban.md)
- [Technical Information on Shadowban Scanner (Japanese)](./doc/en/technical-information.md)

## Privacy Policy

<!-- PRIVACY_POLICY_TEXT_START -->
<!-- THIS SECTION IS GENERATED FROM ./src/_locales/en/messages.json. DO NOT EDIT MANUALLY -->

As a rule, this extension performs all processing on the user's computer. No data is transmitted to external servers. It also does not access Twitter's internal API by obtaining user credentials without permission, as seen with some other extensions. Any web pages not included in this extension are subject to their own terms of use and privacy policies.

<!-- PRIVACY_POLICY_TEXT_END -->

Note that the user script version retrieves images from [https://abs-0.twimg.com/](https://abs-0.twimg.com/) in order to display emojis.

## License

This extension is released under the MIT License.

However, the badge images of each extension store are not subject to the MIT license, and instead are subject to their own branding guidelines and licenses.

## Contributing

To change the code or improve documentation and translations, see the [Contributing Guide](CONTRIBUTING.md).

## Release Procedure

See [doc/release-procedure.md](doc/release-procedure.md).
