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
    if (! settings.languageNames) {
        // Names of UI languages in the languages themselves, as shown
        // in the language menu, so they need not be localized
        settings.languageNames = {
            "sv": "Svenska",
            "en": "English",
        }
    }
    if (! settings.handleUnavailableCorpora) {
        // A corpus defined in the configuration but not found by the
        // backend causes an error that stops loading Korp
        settings.handleUnavailableCorpora = "fatal"
    }
    if (! settings.modeSwitchRestoreParamsExclude) {
        // By default, do not restore the UI language from the saved
        // parameters when switching modes but keep the active
        // language. This has effect only if
        // settings.modeSwitchRestoreParams == true.
        settings.modeSwitchRestoreParamsExclude = ["lang"]
    }
    if (! settings.defaultLanguage) {
        // Swedish as the default UI language
        settings.defaultLanguage = "sv"
    }
    if (! settings.locales) {
        // Locales corresponding to UI languages
        settings.locales = {
            sv: "sv-SE",
            en: "gb-EN",
        }
    }
    if (! settings.defaultTranslationLanguages) {
        // The codes of languages from which Korp tries to get
        // translations for locale keys and attribute values if none
        // found in the UI language (before defaulting to the raw
        // translation key); by default, do not try any other
        // languages but use the translation key immediately.
        settings.defaultTranslationLanguages = []
    }
    if (! settings.downloadSendResultMaxSize) {
        // The maximum query result size (as JSON characters, not
        // URL-encoded) to send to the KWIC download script; for
        // larger results, send only the query parameters for the
        // download script to re-perform the query. By default, always
        // do the latter. When sending the query result, an updated
        // korp_download.cgi is needed to produce the same result as
        // when sending the query parameters.
        settings.downloadSendResultMaxSize = 0
    }
}
