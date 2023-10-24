/*
 * Generated type guards for "ossLicenses.d.ts".
 * WARNING: Do not manually change this file.
 */
import { OSSLicenses } from "./ossLicenses";

export function isOSSLicenses(obj: unknown): obj is OSSLicenses {
    const typedObj = obj as OSSLicenses
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["name"] === "string" &&
            (typeof e["version"] === "undefined" ||
                typeof e["version"] === "string") &&
            typeof e["repository"] === "string" &&
            (typeof e["source"] === "undefined" ||
                typeof e["source"] === "string") &&
            typeof e["license"] === "string" &&
            typeof e["licenseText"] === "string"
        )
    )
}
