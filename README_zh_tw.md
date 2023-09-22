# Shadowban Scanner

[![Node.js CI (build)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/build.yml) [![Node.js CI (lint)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/lint.yml) [![Node.js CI (format)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml/badge.svg)](https://github.com/Robot-Inventor/shadowban-scanner/actions/workflows/format.yml)

![Shadowban Scanner的標誌](doc/image/logo.svg)

[Read in English](README.md) | [日本語で読む](README_ja.md) | [한국어로 읽기](README_ko.md)

這是一個用於檢測Twitter的Shadowban的擴充功能。

※此文档经由人工智能将日语翻译为繁体字。如有不自然之处，请及时报告。

## 安裝

- [Chrome](https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl)
- [Firefox](https://addons.mozilla.org/firefox/addon/shadowban-scanner/)

### 使用者腳本

使用者腳本版中，無法進行設定變更。如需進行詳細客製化，請使用瀏覽器擴充功能版。

- [English](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/en.user.js)
- [日本語](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ja.user.js)
- [한국어](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/ko.user.js)
- [繁體字](https://raw.githubusercontent.com/Robot-Inventor/shadowban-scanner/main/userScript/zh_TW.user.js)

## 功能

- 偵測帳戶層級的Shadowban和敏感標誌
- 檢測個人檔案的媒體（圖示與標頭圖片）敏感性標籤
- 偵測推文層級的敏感標籤
- 偵測推文的年齡限制

![帳戶層級Shadowban偵測的截圖](doc/image/screenshot2_zh_tw.png)

![推文層級Shadowban偵測的截圖](doc/image/screenshot1_zh_tw.png)

## 精確性

就帳號層級的shadowban檢測而言，與其他許多工具一樣，可能會發生偽陽性或偽陰性的情況。然而，針對推文層級的敏感標記和年齡限制，我們幾乎可以完美地進行檢測。因此，建議您在使用Shadowban Scanner持續確認帳號和推文的狀態之餘，也同時使用其他工具。

## 檢測方法

檢測方法和技術細節請參考以下文檔：

- [How Shadowban Scanner Works and About Shadowban (English)](./doc/en/about-shadowban.md)
- [Technical Information on Shadowban Scanner (Japanese)](./doc/en/technical-information.md)

## 隐私政策

此擴展功能會在使用者的電腦上執行所有處理。數據不會被傳送到外部伺服器。而且，不會執行像某些擴展功能中觀察到的未經許可地獲取使用者認證資訊並訪問Twitter內部API的處理。

## 许可证

该扩展程序采用MIT许可证发布。

## 添加語言本地化

請參考[翻譯指南（英文）](doc/localization.md)以添加新語言。

## 開発

### Manifest

請執行以下指令以生成 Manifest 檔案或更改版本。您可以將 ``<manifestVersion>`` 設定為 2 或 3。此外，Manifest 檔案中的 ``version`` 欄位將使用 ``package.json`` 中的 ``version`` 欄位值。

```console
npm run switchManifest <manifestVersion>
```

### 建置

```console
npm run build
```

### 封裝

```console
npm run package
```
