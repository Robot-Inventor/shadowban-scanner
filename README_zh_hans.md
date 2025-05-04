# Shadowban Scanner

[![Node.js CI (build)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml) [![Node.js CI (lint)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml) [![Node.js CI (format)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml)

![Shadowban Scanner 的标志](doc/image/logo.svg)

[Read in English](README.md) | [日本語で読む](README_ja.md) | [한국어로 읽기](README_ko.md) | [以繁體字閱讀](README_zh_tw.md)
这是一个用于检测 Twitter Shadowban 的浏览器扩展。

<p align="center">
<a href="https://www.buymeacoffee.com/keita_roboin"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=keita_roboin&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

## 安装

<p align="center">
<a href="https://chromewebstore.google.com/detail/enlganfikppbjhabhkkilafmkhifadjd"><img src="./doc/image/badge/chrome.svg" height="75px"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/kfeecmboomhggeeceipnbbdjmhjoccbl"><img src="./doc/image/badge/edge.svg" height="75px"></a>
<a href="https://addons.mozilla.org/firefox/addon/{8fee6fa8-6d95-4b9e-9c51-324c207fabff}/"><img src="./doc/image/badge/firefox.svg" height="75px"></a>
</p>

### 用户脚本

在脚本版本中，无法进行设置变更。如需自定义设置，请使用扩展。

- [English](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/en.user.js)
- [日本語](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ja.user.js)
- [한국어](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ko.user.js)
- [繁体中文](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/zh_TW.user.js)
- [简体中文](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/zh_Hans.user.js)

## 功能

- 检测账户级别的 Shadowban 和敏感内容标记  
- 检查个人资料的媒体（头像或头图）上的敏感内容标记  
- 检测账户因法律原因而导致的国家/地区屏蔽情况  
- 检测推文级别的敏感内容标记  
- 检测推文上的年龄限制  
- 在设置为隐藏的推文中增加查看按钮  

![账户级别 Shadowban 检测截图](doc/image/screenshot2_zh_hans.png)

![推文级别 Shadowban 检测截图](doc/image/screenshot1_zh_hans.png)

![被隐藏推文截图](doc/image/screenshot3_zh_hans.png)

## 精准度

对于账户级别的 Shadowban 检查，与其他许多工具一样，可能会出现误判。但针对推文级别的敏感内容标记和年龄限制标记，本扩展几乎能够完美地给出正确结果。因此，建议您在使用 Shadowban Scanner 确认账户和推文状态的同时，也使用其他工具辅助检查。

## 检查方法

检查方法和技术细节请参考以下说明：

- [How Shadowban Scanner Works and About Shadowban (English)](./doc/en/about-shadowban.md)
- [Technical Information on Shadowban Scanner (English)](./doc/en/technical-information.md)

## Privacy Policy

<!-- PRIVACY_POLICY_TEXT_START -->
<!-- THIS SECTION IS GENERATED FROM ./src/_locales/zh_HANS/messages.json. DO NOT EDIT MANUALLY -->

此扩展原则上会在用户的电脑上处理所有数据，不会将数据发送到外部服务器，此扩展亦不会在未经用户许可的情况下使用登录凭证访问 Twitter/X 的内部 API。对于此扩展没有对应的网页，将适用各自的使用条款和隐私政策。

<!-- PRIVACY_POLICY_TEXT_END -->

Note that the user script version retrieves images from [https://abs-0.twimg.com/](https://abs-0.twimg.com/) in order to display emojis.

## License

This extension is released under the MIT License.

However, the badge images of each extension store are not subject to the MIT license, and instead are subject to their own branding guidelines and licenses.

## Contributing

To change the code or improve documentation and translations, see the [Contributing Guide](CONTRIBUTING.md).

## Release Procedure

See [doc/release-procedure.md](doc/release-procedure.md).
