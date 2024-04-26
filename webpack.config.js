const CopyFilePlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        "js/script.js": "./src/js/script.js",
        "js/en/script.js": "./src/js/en/script.js"
    },
    output: {
        filename: "[name]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyFilePlugin({
            patterns: [
                {
                    context: "./src/html/",
                    from: "**/*",
                    to: "./"
                },
                {
                    context: "./src/css/",
                    from: "**/*",
                    to: "./css/"
                },
                {
                    context: "./src/js/",
                    from: "**/*",
                    to: "./js/"
                }
            ]
        })
    ]
};
