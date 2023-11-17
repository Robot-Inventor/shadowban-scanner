/*
 * Generated type guards for "translator.d.ts".
 * WARNING: Do not manually change this file.
 */
import { TranslationSubstitutions } from "./translator";

export function isTranslationSubstitutions(obj: unknown): obj is TranslationSubstitutions {
    const typedObj = obj as TranslationSubstitutions
    return (
        (typeof typedObj === "undefined" ||
            typeof typedObj === "string" ||
            Array.isArray(typedObj) &&
            typedObj.every((e: any) =>
                typeof e === "string"
            ))
    )
}
