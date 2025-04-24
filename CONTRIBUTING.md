# Contributing to the project

We welcome contributions to this project. Contributing is not just about writing source code; it can also include improving documentation, translations, or reporting bugs.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an [Issue](https://github.com/Robot-Inventor/shadowban-scanner/issues). Before creating an issue, make sure a similar problem hasn’t already been reported. Including the following information can help resolve the issue more quickly:

- A specific description of the problem
- Expected behavior
- Steps to reproduce the issue
- Browser type, version, and extension version

### Submitting a Pull Request

To modify the source code or improve documentation and translations, please submit a pull request.

For detailed information on translations, please refer to the [Localization Guide](doc/localization.md).

Note that not all pull requests will be merged.

If you plan to create a pull request to add a feature, please create an issue first. Discussing it with the maintainers in the issue can reduce the chances of your pull request being rejected.

Changes that may violate user privacy, or result in user accounts being locked or suspended, will not be accepted. This includes, but is not limited to, accessing Twitter's internal APIs or connecting to external services.

This project uses Node.js and npm. To develop, follow these steps:

1. Clone the repository
2. Run `npm install`

Additionally, this project provides the following commands:

- `npm run build`: Run the build process
- `npm run dev`: Monitor file changes and auto-build
- `npm run lint`: Check code style
- `npm run format`: Format the code style
- `npm run package`: Create a package (ZIP file) of the extension

Before submitting a pull request, please ensure the following:

- [ ] Have you run the format command?
- [ ] Are there no errors from linting?
- [ ] Can it build without errors?

After verifying the checklist above, submit your pull request with a clear description of the changes.
