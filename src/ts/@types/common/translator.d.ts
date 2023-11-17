import enTranslation from "../../../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type TranslationFunction = (messageName: TranslationKey, substitutions?: string | string[] | undefined) => string;
/** @see {isTranslationSubstitutions} ts-auto-guard:type-guard */
// eslint-disable-next-line no-magic-numbers
type TranslationSubstitutions = Parameters<TranslationFunction>[1];

export { TranslationData, TranslationKey, TranslationFunction, TranslationSubstitutions };
