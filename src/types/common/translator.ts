import { createIs } from "typia";
import type enTranslation from "../../_locales/en/messages.json";

type TranslationData = typeof enTranslation;
type TranslationKey = keyof TranslationData;
type TranslationFunction = (messageName: TranslationKey, substitutions?: string | string[]) => string;

// oxlint-disable-next-line no-magic-numbers
type TranslationSubstitutions = Parameters<TranslationFunction>[1];

const isTranslationSubstitutions = createIs<TranslationSubstitutions>();

export { type TranslationData, type TranslationKey, type TranslationFunction, isTranslationSubstitutions };
