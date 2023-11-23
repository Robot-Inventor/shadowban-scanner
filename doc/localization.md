# Localization Guide

## UI Translation

1. Create ``./_locales/<languageCode>/messages.json``.
2. Copy the contents of the existing translation file.
3. Translate the text.

## User Script Creation

1. Create ``./src/ts/userScript/<languageCode>.user.ts``.
2. Copy the existing code.
3. Rewrite the import source of the translation file.

## Translation of Screenshots

> [!NOTE]
> Translated versions of the screenshots are created by maintainer [@Robot-Inventor](https://github.com/Robot-Inventor).

1. Translate the screenshots to match the UI translation.

## Document Translation

1. Create ``./README_<languageCode>.md``.
2. Copy the contents of the existing README file.
3. Translate the text.
4. Replace the screenshots with the translated versions.
5. Add a link to the new language's README in the README files of other languages.
6. Add a link to the new language's user script in all README files.
