import type enTranslation from "../../_locales/en/messages.json";
import typia from "typia";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type TranslationFunction = (messageName: TranslationKey, substitutions?: string | string[] | undefined) => string;

// eslint-disable-next-line no-magic-numbers
type TranslationSubstitutions = Parameters<TranslationFunction>[1];

const isTranslationSubstitutions = typia.createIs<TranslationSubstitutions>();

export { type TranslationData, type TranslationKey, type TranslationFunction, isTranslationSubstitutions };
