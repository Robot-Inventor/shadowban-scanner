// Type definitions for addons-linter 6.15
// Project: https://github.com/mozilla/addons-linter#readme
// Definitions by: Robot-Inventor <https://github.com/Robot-Inventor>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "addons-linter" {
    type Options = {
        config: {
            /**
             * This mimics the first command line argument from yargs, which should be the directory to the extension.
             */
            _: string[];

            /**
             * The log-level to generate.
             */
            logLevel: "fatal" | "error" | "warn" | "info" | "debug" | "trace";

            /**
             * Treat warnings as errors.
             */
            warningsAsErrors?: boolean;

            /**
             * The type of output to generate.
             */
            output?: "json" | "text" | "none";

            /**
             * Output only metadata as JSON.
             */
            metadata?: boolean;

            /**
             * Prettify JSON output.
             */
            pretty?: boolean;

            /**
             * Show stacktraces when errors are thrown.
             */
            stack?: boolean;

            /**
             * Disable colorful shell output.
             */
            boring?: boolean;

            /**
             * Treat the input file (or directory) as a privileged extension.
             */
            privileged?: boolean;

            /**
             * Disable messages related to hosting on addons.mozilla.org.
             */
            selfHosted?: boolean;

            /**
             * Enable MV3 background service worker support.
             */
            enableBackgroundServiceWorker?: boolean;

            /**
             * Set a custom minimum allowed value for the manifest_version property
             */
            minManifestVersion?: number;

            /**
             * Set a custom maximum allowed value for the manifest_version property
             */
            maxManifestVersion?: number;

            /**
             * Disable list of comma separated eslint rules.
             */
            disableLinterRules?: string;

            /**
             * Disable the auto-close feature when linting XPI files.
             */
            disableXpiAutoclose?: boolean;
        } & (
            | {
                  // Either shouldScanFile or scanFile must be specified

                  /**
                   * Exclude files
                   */
                  shouldScanFile: (fileOrDirName: string, isDir: boolean) => boolean;
              }
            | {
                  /**
                   * Scan a selected file.
                   */
                  scanFile: string[];
              }
        );

        /**
         * This prevent the linter to exit the nodejs application.
         */
        runAsBinary?: boolean;
    };

    type Result = {
        count: number;

        summary: {
            errors: number;
            notices: number;
            warnings: number;
        };

        metadata: Record<string, unknown>;

        scanFile: string[];

        errors: {
            _type: "error";
            code: string;
            message: string;
            description: string;
            file: string;
        }[];

        notices: {
            _type: "notice";
            code: string;
            message: string;
            description: string;
            file: string;
        }[];

        warnings: {
            _type: "warning";
            code: string;
            message: string;
            description: string;
            file: string;
        }[];
    };

    type Linter = {
        run: () => Promise<Result>;
    };

    export function createInstance(options: Options): Linter;
}
