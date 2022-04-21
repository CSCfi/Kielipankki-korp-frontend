/** @format */

/**
 * function to set default values if parameters have been left out of config.js
 */
export function setDefaultConfigValues() {
    if (!settings.hitsPerPageValues) {
        settings.hitsPerPageValues = [25, 50, 75, 100]
    }
    if (!settings.hitsPerPageDefault) {
        settings.hitsPerPageDefault = settings.hitsPerPageValues[0]
    }
    if (!settings.groupStatistics) {
        settings.groupStatistics = []
    }
    if (! settings.backendURLMaxLength) {
        // The default maximum URI length for Apache is 8190 but keep
        // some safety margin
        settings.backendURLMaxLength = 8100
    }
    if (! settings.defaultTranslationLanguages) {
        // The codes of languages from which Korp tries to get
        // translations for locale keys and attribute values if none
        // found in the UI language (before defaulting to the raw
        // translation key); by default, do not try any other
        // languages but use the translation key immediately.
        settings.defaultTranslationLanguages = []
    }
}
