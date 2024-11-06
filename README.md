# Shadowban Scanner Official Website

This is the official website for the Shadowban Scanner project. The website is hosted on Cloudflare Pages and is available at [shadowban-scanner.roboin.io](https://shadowban-scanner.roboin.io/).

<p align="center">
<a href="https://www.buymeacoffee.com/keita_roboin" target="_blank" rel="noopener noreferrer"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=keita_roboin&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

## Translations

The website is available in multiple languages. The translations are stored in the `src/translations` directory. To add a new translation, follow these steps:

1. Create a new file in the `src/translations` directory with the name of the language code (e.g., `en.json` for English).
2. Add the translation strings to the file in the following format:

    ```json
    {
      "key": "value"
    }
    ```

3. Import the translation file in the `src/ts/script.ts` file and add it to the `resources` object and the `supportedLngs` array in the `i18next.init` function:

    ```javascript
    import translationEn from "../translations/en.json";
    import translationJa from "../translations/ja.json";

    // ...

    void i18next.use(LanguageDetector).init({
        // ...
        resources: {
            en: translationEn,
            ja: translationJa
        },
        supportedLngs: ["en", "ja"]
    });
    ```

4. Add a new language to the `rspack.config.ts` file in the `HtmlWebpackPlugin` configuration:

    ```javascript
    import translationJa from "./src/translations/ja.json" with { type: "json" };
    import translationEn from "./src/translations/en.json" with { type: "json" };

    const isProduction = process.env.NODE_ENV === "production";
    const config = defineConfig({
        // ...
        plugins: [
            //...
            new HtmlWebpackPlugin({
                template: "./src/html/index.html",
                filename: "./index.html",
                ...translationJa
            }),
            new HtmlWebpackPlugin({
                template: "./src/html/index.html",
                filename: "./ja/index.html",
                ...translationJa
            }),
            new HtmlWebpackPlugin({
                template: "./src/html/index.html",
                filename: "./en/index.html",
                ...translationEn
            })
        ]
    });

    export default config;
    ```

5. Add a new language to the `src/html/index.html` file:

    ```html
    <link rel="alternate" hreflang="en" href="https://shadowban-scanner.roboin.io/en/" />
    <link rel="alternate" hreflang="ja" href="https://shadowban-scanner.roboin.io/ja/" />
    <link rel="alternate" hreflang="x-default" href="https://shadowban-scanner.roboin.io/" />
    <!-- ... -->
    <div id="language_switcher">
        <span class="material-symbols-outlined">language</span>
        <select id="language_switcher-select">
            <option value="ja">日本語</option>
            <option value="en">English</option>
        </select>
    </div>
    ```

6. Submit a pull request with the changes and the maintainer will add the translated images to the website.

## Development

The website is built using webpack. To start the development server, run the following commands:

```bash
npm install
npm run dev
```

The website will be available at [http://localhost:8080](http://localhost:8080).

## Deployment

The website is automatically deployed to Cloudflare Pages when changes are pushed to the `gh-pages` branch.
