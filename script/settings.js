const WEB_EXT_IGNORE_FILES = [
    "./src/",
    "./script/",
    "./node_modules/",
    "./package.json",
    "./package-lock.json",
    "./*.md",
    "./manifest/",
    "./web-ext-artifacts/",
    "./userScript/",
    "./renovate.json",
    "./tsconfig.json",
    "./webpack.config.js",
    "./doc/"
].map((path) => `"${path}"`).join(" ");

exports.WEB_EXT_IGNORE_FILES = WEB_EXT_IGNORE_FILES;
