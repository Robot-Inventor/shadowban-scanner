import path from "path";

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
].map((file) => path.normalize(file));

export { WEB_EXT_IGNORE_FILES };
