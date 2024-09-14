# Localization Guide

## Translating the UI

1. Create a new file: `./src/_locales/<languageCode>/messages.json`.
2. Copy the contents of an existing translation file.
3. Translate the text.

## Creating a User Script

1. Create a new file: `./src/ts/userScript/<languageCode>.user.ts`.
2. Copy the contents of an existing script.
3. Update the import path to reference the translated file.

## Translating Screenshots (Optional)

> [!NOTE]
> Translated screenshots are provided by the maintainer [@Robot-Inventor](https://github.com/Robot-Inventor).

1. Update the screenshots to match the UI translation.

## Translating Documentation (Optional)

1. Create a new file: `./README_<languageCode>.md`.
2. Copy the contents of the existing README file.
3. Translate the text.
4. Replace the screenshots with the translated versions.
5. Add a link to the new language's README in the README files of other languages.
6. Add a link to the new language's user script in all README files.

## Translating the Website (Optional)

For more information, see the [gh-pages branch](https://github.com/Robot-Inventor/shadowban-scanner/tree/gh-pages).
