# Shadowban Scanner

[![Node.js CI (build)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml) [![Node.js CI (lint)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml) [![Node.js CI (format)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml)

![Shadowban Scanner의 로고](doc/image/logo.svg)

[Read in English](README.md) | [日本語で読む](README_ja.md) | [以繁體字閱讀](README_zh_tw.md)

Twitter의 Shadowban을 감지하는 확장 기능입니다.

※이 문서는 인공지능을 사용하여 일본어에서 한국어로 번역되었습니다. 부자연스러운 점이 있다면 보고해주세요.

## 설치

<p align="center">
<a href="https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/"><img src="./doc/image/badge/chrome.svg" height="75px"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl"><img src="./doc/image/badge/edge.svg" height="75px"></a>
<a href="https://addons.mozilla.org/firefox/addon/shadowban-scanner/"><img src="./doc/image/badge/firefox.svg" height="75px"></a>
</p>

### 사용자 스크립트

사용자 스크립트 버전에서는 설정을 변경할 수 없습니다. 자세한 사용자 정의가 필요한 경우 브라우저 확장 기능 버전을 사용해주세요.

- [English](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/en.user.js)
- [日本語](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ja.user.js)
- [한국어](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ko.user.js)
- [繁體字](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/zh_TW.user.js)

## 기능

- 계정 단위의 Shadowban과 민감한 플래그를 감지합니다
- 프로필 미디어(아이콘과 헤더 이미지)의 민감 정보 플래그를 검출합니다
- 트윗 단위의 민감 정보 플래그를 감지합니다
- 트윗의 연령 제한을 감지합니다

![계정 단위의 쉐도우밴 감지 스크린샷](doc/image/screenshot2_ko.png)

![트윗 단위의 쉐도우밴 감지 스크린샷](doc/image/screenshot1_ko.png)

## 정확도

계정 단위의 Shadowban 검출은 다른 많은 도구와 마찬가지로 가짜 양성 또는 가짜 음성이 발생할 수 있습니다. 반면에 트윗 단위의 민감 플래그와 연령 제한은 거의 완벽하게 검출할 수 있습니다. 따라서 Shadowban Scanner를 통해 계정이나 트윗의 상태를 지속적으로 확인하면서 다른 도구들도 함께 사용하는 것을 권장합니다.

## 검출 방법

탐지 방법 및 기술적 세부사항은 다음 문서를 참조하십시오.

- [How Shadowban Scanner Works and About Shadowban (English)](./doc/en/about-shadowban.md)
- [Technical Information on Shadowban Scanner (Japanese)](./doc/en/technical-information.md)

## Privacy Policy

<!-- PRIVACY_POLICY_TEXT_START -->
<!-- THIS SECTION IS GENERATED FROM _locales/ko/messages.json. DO NOT EDIT MANUALLY -->

As a rule, this extension performs all processing on the user's computer. No data is transmitted to an external server. It also does not access Twitter's internal API by obtaining the user's credentials without permission, as is the case with some extensions. Web pages not bundled in this extension are subject to their own terms of use and privacy policies.

<!-- PRIVACY_POLICY_TEXT_END -->

Note that the user script version retrieves images from [https://abs-0.twimg.com/](https://abs-0.twimg.com/) in order to display emojis.

## License

This extension is released under the MIT License.

However, the badge images of each extension store are not subject to the MIT license, and instead are subject to their own branding guidelines and licenses.

## Adding Language Localization

To add a new language, see the [Localization Guide (English)](doc/localization.md).

## Development

### Manifest

To generate a Manifest file or change the version, run the following command. ``<manifestVersion>`` can be 2 or 3. Also, the ``version`` field in the Manifest file will be the value of the ``version`` field in ``package.json``.

```console
npm run switchManifest <manifestVersion>
```

### Build

```console
npm run build
```

### Package

```console
npm run package
```

## Release Procedure

See [doc/release-procedure.md](doc/release-procedure.md).
