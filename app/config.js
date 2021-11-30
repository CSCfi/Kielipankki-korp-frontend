
var isLab = window.isLab || false;

var isProductionServer = (
    window.location.hostname.indexOf(".csc.fi") != -1
        || window.location.hostname == "195.148.22.239");
var isProductionServerTest =
    (isProductionServer
     && (window.location.pathname.indexOf("test/") != -1
         || window.location.pathname.indexOf("test-") != -1));
var isProductionServerBeta =
    (isProductionServer && (window.location.pathname.indexOf("beta") != -1
                            || window.location.pathname.indexOf("lab") != -1
                            || window.location.pathname.indexOf("-jn5") != -1));
var isProductionServerOld =
    (isProductionServer && window.location.pathname.indexOf("old/") != -1);
settings.isPublicServer = (window.location.hostname != "localhost");

c.log("Production server:", isProductionServer);

var baseURL = (window.location.protocol + "//" + window.location.hostname
               + window.location.pathname);

settings.autocomplete = true;
settings.mapEnabled = true;
settings.hitsPerPageDefault = 25
settings.hitsPerPageValues = [25,50,75,100,500,1000]
// If settings.show_related_words is not defined, it is considered
// true.
settings.show_related_words = false;
settings.name_classification = false;
// Enable the option to restrict search context in the simple search
settings.simple_search_restrict_context = true;

// The lemgram service to use for autocompletion. If not specified,
// use Språkbanken's Karp. (Jyrki Niemi 2015-12-04)
settings.lemgramService = "FIN-CLARIN";
// The number of lemgrams to show in autocompletion (for the
// FIN-CLARIN lemgram service).
settings.autocompleteLemgramCount = 15;

// Specify how to handle corpora defined in the configuration but not
// found by the backend. Supported values are:
// - "none" or "fatal": no handling: an undefined corpus causes an
//   error that stops loading Korp; the default if no value specified;
// - "error": error on the console;
// - "warn": warning on the console; and
// - "log": normal log message on the console.
// Handling unavailable corpora results in a somewhat slower startup
// of Korp, currently at most about half a second. One option would
// be to enable it only for development environments, so that the
// production environment would have a slightly faster startup.
// (Jyrki Niemi 2017-12-13)
settings.handleUnavailableCorpora = "warn";

// If true, give a more detailed result error message in addition to
// "An error occurred". (Jyrki Niemi 2018-01-29)
settings.resultErrorDetails = true;

// Show the corpus hash parameter in the URL even when all corpora
// accessible to the user are selected, so that a Korp URL without the
// corpus parameter is unambiguous. (Jyrki Niemi 2018-02-05)
settings.showAllCorporaInHash = true;

settings.textDateAllowBareYears = true;

// Encode list-valued parameters for korp.cgi by extracting common
// prefixes. If not defined, considered false. (Jyrki Niemi
// 2017-09-29)
settings.encodeListParams = true;

// Compress query parameters to the backend to a single params_gz
// parameter. If not defined, considered false. (Jyrki Niemi
// 2018-02-02)
settings.compressBackendParams = true;
// Options for compressing backend query parameters
settings.compressBackendParamsOpts = {
    // The minimum length of the corpus parameter for which the whole
    // parameter list is compressed (default: 2000)
    corpus_min_length: 2000,
    // Also compress the parameter "command", which is by default left
    // outside params_gz for slightly easier frontend debugging
    // (default: false)
    compressed_command: false,
};

settings.enableBackendKwicDownload = true
settings.enableFrontendKwicDownload = false

// Enable passing additional information (UI language, search mode) to
// the backend for writing the backend log. If not defined, considered
// false. (Jyrki Niemi 2017-12-14)
settings.addBackendLogInfo = true;

settings.downloadFormats = [
    "annot",
    "annot_xls",
    "ref",
    "ref_xls",
    "sentences",
    "sentences_xls",
    "sentences_kwic",
    "sentences_kwic_xls",
    "text",
    "json",
    "nooj",
];
if (! isProductionServer) {
    settings.downloadFormats.push("vrt");
}

// Selection lists for physical formats, depending on the logical
// format: "formats" lists the formats (one of those in
// settings.downloadFormatParamsPhysical), "selected" is the selected
// one, initially the default.
// settings.downloadFormatParams[format].physical_formats needs to
// refer to physical_formats properties so that the object references
// are shared between different formats, for the selection to preserve
// the selected format in each physical format selection list even
// when changing the logical format back and forth. (Jyrki Niemi
// 2016-09-26)
physical_formats = {
    table: {
        formats: ["xls", "csv", "tsv", "html_table"],
        selected: "xls",
    },
    text: {
        formats: ["text_utf8", "html"],
        selected: "text_utf8",
    },
};

settings.downloadFormatParams = {
    "*": {
        structs: "+"
    },
    "annot": {
        format: "tokens",
        attrs: "+,-lex",
        match_marker: "***",
        physical_formats: physical_formats.table,
    },
    "annot_xls": {
        format: "tokens,xls",
        format_suffix: ".xls",
        attrs: "+,-lex",
        match_marker: "***",
        physical_formats: physical_formats.table,
    },
    "ref": {
        format: "bibref",
        physical_formats: physical_formats.table,
    },
    "ref_xls": {
        format: "bibref,xls",
        format_suffix: ".xls",
        physical_formats: physical_formats.table,
    },
    "sentences": {
        format: "sentences",
        subformat: "lemmas-resultinfo",
        physical_formats: physical_formats.table,
    },
    "sentences_xls": {
        format: "sentences,xls",
        format_suffix: ".xls",
        subformat: "lemmas-resultinfo",
        physical_formats: physical_formats.table,
    },
    // As "sentences", but match tokens and context tokens in separate
    // columns
    "sentences_kwic": {
        format: "sentences",
        subformat: "lemmas-resultinfo,lemmas-kwic",
        physical_formats: physical_formats.table,
    },
    "sentences_kwic_xls": {
        format: "sentences,xls",
        format_suffix: ".xls",
        subformat: "lemmas-resultinfo,lemmas-kwic",
        physical_formats: physical_formats.table,
    },
    "nooj": {
        attrs: "+"
    },
    "vrt": {
        attrs: "+"
    },
    "text": {
        format: "text",
        subformat: "sentences-bare",
        structs: "",
        physical_formats: physical_formats.text,
    },
};

settings.downloadFormatParamsPhysical = {
    "xls": {
        format_suffix: ",xls",
    },
    "csv": {
        format_suffix: ",csv",
    },
    "tsv": {
        format_suffix: ",tsv",
    },
    "text_utf8": {
    },
    "html": {
        format_suffix: ",html",
    },
    "html_table": {
        format_suffix: ",html_table",
    },
};


// Korp backend URL
// Always use the backend at korp.csc.fi
settings.korpBackendURL = "https://korp.csc.fi/korp/api8";
// // Alternatively, use the backend on the same site as the frontend
// settings.korpBackendURL =
//    window.location.protocol + "//" + window.location.hostname + "/korp/api8";
// console.log("korpBackendURL: '" + settings.korpBackendURL + "'")
settings.downloadCgiScript = "https://korp.csc.fi/cgi-bin/korp/korp_download.cgi";

// The main Korp and Korp Labs URL for the links in the cog menu
settings.korpUrl = {
    "main": (isProductionServer ? "/korp/" : "/korp/"),
    "lab": (isProductionServer ? "/korplab/" : "/korplab/")
};

settings.urnResolver = "http://urn.fi/";
settings.corpus_cite_base_url = "http://www.kielipankki.fi/viittaus/?key=";

// Set advanced_search_within to false to disable the within selection
// in the advanced search. If the value is undefined, assume true.
// (Jyrki Niemi 2015-09-24)
settings.advanced_search_within = true;

settings.languages = ["fi", "sv", "en"];
// Names of UI languages in the languages themselves, as shown in the
// language menu, so they need not be localized
settings.languageNames = {
    "fi": "Suomi",
    "sv": "Svenska",
    "en": "English",
}
settings.defaultLanguage = "fi";

// If a localization key does not have a translation in some language,
// use the translation in the first language in
// settings.defaultTranslations that has a translation, or the
// localization key itself if the language is "KEY" (makes sense only
// as the last element of the list, since the key is always present).
// (Jyrki Niemi 2016-04-28)
settings.defaultTranslations = ["en", "KEY"];

// Locales corresponding to languages (Jyrki Niemi 2016-02-16)
settings.locales = {
    "sv": "sv-SE",
    "en": "gb-EN",
    "fi": "fi-FI",
};

// for extended search dropdown, can be 'union' or 'intersection'
settings.wordAttributeSelector = "union";
settings.structAttributeSelector = "union";

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduceWordAttributeSelector = "intersection";
settings.reduceStructAttributeSelector = "intersection";

settings.groupStatistics = [];

settings.filterSelection = "intersection"

settings.newsDeskUrl =
    window.location.protocol + "//" + window.location.hostname + "/"
    + window.location.pathname + "news/json/korp"
    + ((isProductionServerBeta || isLab) ? "beta" : "") + "news.json";

// authenticationType: "basic", "shibboleth" or "none"
settings.authenticationType = (isProductionServer ? "shibboleth" : "basic");

// Shibboleth login URL
settings.getShibbolethLoginURL = function (encodedURL) {
    return ((isProductionServer
             ? "/shibboleth-ds/index.html?"
             : "http://localhost/redirect.html?") +
            encodedURL)
}

// Shibboleth logout URL
settings.getShibbolethLogoutURL = function (encodedURL) {
    return (isProductionServer
            ? "/Shibboleth.sso/Logout?return=" + encodedURL
            : decodeURIComponent(encodedURL))
}


// Login and logout URLs to use with Shibboleth authentication if
// authenticationType == "shibboleth". Compress the hash parameters of
// the return URL to make exceeding the Apache URL length limit less
// likely.
// for eduGAIN / CSC Account:
settings.shibbolethLoginUrl = function (href) {
    return ("/shibboleth-ds/index.html?"
            + encodeURIComponent(util.compressUrlHashParams(
                (href || window.location.href) + "&shib_logged_in")));
};
settings.shibbolethLogoutUrl = function (href) {
    return ("/Shibboleth.sso/Logout?return="
            + encodeURIComponent(
                util.compressUrlHashParams(href || window.location.href)));
}

// Return a direct URL to the application of a corpus in Language Bank
// Rights based on lbr_id (an URN, either complete or without the
// common prefix "urn:nbn:fi:lb-"). if lbr_id is falsey, return the
// URL of the LBR main page.
settings.make_direct_LBR_URL = function (lbr_id) {
    console.log ("make_direct_LBR_URL", lbr_id);
    if (lbr_id) {
        return ("https://www.kielipankki.fi/lbr3/"
                + (lbr_id.slice(0, 3) != "urn" ? "urn:nbn:fi:lb-" : "")
                + lbr_id);
    } else {
        return "https://lbr.csc.fi";
    }
};


// The supported corpus extra info items, typically links. If you add
// a new item X, also remember to add corresponding translations for
// the link text to locale-??.json with the key "corpus_X".
settings.corpusExtraInfoItems = [
    "credits",
    "subcorpus_of",
    "pid",
    "cite",
    "licence",
    "infopage",
    "urn",
    "homepage",
    "iprholder",
    "compiler",
    "download",
];

// The extra info (usually links) to be shown in the corpus info popup
// of the corpus chooser and the KWIC results sidebar.
settings.corpusExtraInfo = {
    infoPopup: settings.corpusExtraInfoItems,
    sidebar: [
        "credits",
        "subcorpus_of",
        "pid",
        "cite",
        "licence",
        "infopage",
        "urn",
        "download",
    ]
};

// Special handling for specified corpus extra info items: property
// names refer to info item names (keys) and their values are
// functions called by util.formatCorpusExtraInfo, with two arguments:
// - corpusObj: corpus configuration
// - label: the HTML generated for the label of the info item
// The functions should return an object for creating a link, with at
// least the property "url" or "text" (or both) and possibly "label"
// and "tooltip", or undefined if the default handling should be
// tried.
settings.makeCorpusExtraInfoItem = {
    subcorpus_of: function (corpusObj, label) {
        if (corpusObj.logicalCorpus
            && corpusObj.logicalCorpus.title != corpusObj.title) {
            return {
                text: corpusObj.logicalCorpus.title,
                label: label,
            };
        }
    },
    pid: function (corpusObj, label) {
        // If the PID of a corpus is not specified explicitly, use
        // the metadata URN.
        var pid = ((corpusObj.pid ? corpusObj.pid.urn : null)
                   || corpusObj.pid_urn
                   || (corpusObj.metadata ? corpusObj.metadata.urn : null)
                   || corpusObj.metadata_urn);
        if (pid) {
            return {
                url: util.makeUrnUrl(pid),
                // Prevent breaking the URN at the hyphen by using
                // white-space: nowrap.
                text: ('<span style="white-space: nowrap;">' + pid +
                       '</span>'),
                label: label,
            };
        }
    },
    cite: function (corpusObj, label) {
        if (settings.corpus_cite_base_url) {
            // If cite_id is explicitly null or "", omit the citation link
            if (corpusObj.cite_id === null || corpusObj.cite_id == "") {
                return
            }
            // Use the metadata URN as the default cite id; fall back
            // to cite_id if no metadata URN is found
            let citeId = (
                (corpusObj.pid && corpusObj.pid.urn)
                    || corpusObj.pid_urn
                    || (corpusObj.metadata && corpusObj.metadata.urn)
                    || corpusObj.metadata_urn
                    || corpusObj.cite_id);
            if (citeId) {
                return {
                    // Using ng-href would require using Angular $compile,
                    // but how could we use it here or where should it be
                    // called?
                    // http://stackoverflow.com/questions/11771513/angularjs-jquery-how-to-get-dynamic-content-working-in-angularjs
                    // url: settings.corpus_cite_base_url + citeId +
                    //      '&lang={{lang}}'
                    // This does not change the lang parameter in the
                    // corpus info popup, although it works in the sidebar.
                    url: (settings.corpus_cite_base_url
                          + citeId + "&lang=" + window.lang),
                    text: label,
                };
            }
        }
    },
    urn: function (corpusObj, label) {
        if (corpusObj.urn) {
            return {
                url: util.makeUrnUrl(corpusObj.urn),
                text: label,
            };
        }
    },
    homepage: function (corpusObj, label) {
        if (! ("homepage" in corpusObj) && corpusObj.url) {
            // Assume that the top-level property "url" refers to the
            // home page of the corpus (unless the there is a property
            // "homepage").
            return {
                url: corpusObj.url,
                text: label,
            };
        }
    },
};


settings.wordPictureMaxWords = 30;

settings.wordpictureTagset = {
    // supported pos-tags
    verb: "vb",

    noun: "nn",
    adjective: "jj",
    adverb: "ab",
    // preposition: "pp",

    // dependency releations
    subject: "ss",
    object: "obj",
    adverbial: "adv",
    // preposition_rel: "pa",
    pre_modifier: "at",
    post_modifier: "et",
    adverbial2: "aa"
}


settings.wordPictureConf = {
    verb: [[
        {rel: "subject", css_class: "color_blue"},
        "_",
        {rel: "object", css_class: "color_purple"},
        {rel: "adverbial", css_class: "color_green"}
    ]],
    noun: [
        [ // {rel: "preposition_rel", css_class: "color_yellow", field_reverse: true},
         {rel: "pre_modifier", css_class: "color_azure"},
         "_",
         {rel: "post_modifier", css_class: "color_red"}],

        ["_", {rel: "subject", css_class: "color_blue", field_reverse: true, alt_label: "vb"}],
        [{rel: "object", css_class: "color_purple", field_reverse: true, alt_label: "vb"}, "_"]
    ],
    adjective: [
        ["_", {rel: "pre_modifier", css_class: "color_yellow", field_reverse: true}],
        [{rel: "adverbial2", css_class: "color_purple"}, "_"]
    ],
    adverb: [
        ["_", {rel: "adverbial", css_class: "color_yellow", field_reverse: true}],
        ["_", {rel: "adverbial2", css_class: "color_purple", field_reverse: true}]
    ],
    // preposition: [["_", {rel: "preposition_rel", css_class: "color_green"}]]

}


// The positional attribute in which to find place names, typically
// word or lemma
settings.placenameAttr = "lemma";
// Additional CQP attribute constraints for place names: different
// annotations for a proper name in different corpora. The value below
// is the one used by Språkbanken's Korp for Swedish (and other?)
// corpora, so it should be overridden in the configuration of
// individual modes as appropriate.
settings.placenameConstraint = "pos='PM' | pos='NNP' | pos='NNPS'";;


// Configure the grouping of name categories in name
// classification results.
settings.name_groups = [
    {label: "person", regex: "EnamexPrs.*"},
    {label: "place", regex: "EnamexLoc.*"},
    {label: "organization", regex: "EnamexOrg.*"},
    {label: "other", regex: "(Nu|Ti)mex.*"},
];
settings.name_group_max_names = 30;


settings.visibleModes = 6
settings.modeConfig = [
    {
        localekey: "modern_texts",
        mode: "default"
    },
    {
        localekey: "swedish_texts",
        mode: "swedish"
    },
    {
        localekey: "other_languages_texts",
        mode: "other_languages"
    },
    {
        localekey: "parallel_texts",
        mode: "parallel",
        parallel: true,
    }
];

// Namespace for corpus configuration templates
settings.templ = {};
// Namespace for extra corpus info used in multiple corpora
settings.corpusinfo = {};

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

// settings.primaryColor = "#DDE9FF";
// CHECK if having the same colour as the primary and the light one
// causes problems somewhere. (Jyrki Niemi 2017-12-01)
settings.primaryColor = "#CAD2E6";
settings.primaryLight = "#CAD2E6";

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

settings.defaultWithin = {
    "sentence": "sentence"
};
// TODO: Move these to modes/common.js
settings.spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};
settings.spcWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph",
    "clause": "clause",
};
settings.scWithin = {
    "sentence": "sentence",
    "clause": "clause",
};
settings.sentLinkContext = {
    "1 sentence": "1 sentence",
    "1 link": "1 link"
};
settings.sentLinkWithin = {
    "sentence": "sentence",
    "link": "link"
};

// Corpus id alias mapping: aliases as property keys and actual corpus
// ids as values. (Jyrki Niemi 2015-04-23)
settings.corpus_aliases = {};

// Functions to configure "short URLs": if the function
// settings.short_url_config[shorturl] exists, it is executed whenever
// the last part of the URL path name component is shorturl. The
// functions typically set preselected corpora and perhaps the mode,
// but they may also disable corpora and modes. Note that if you
// disable some corpora, currently the time graph in the corpus
// selector is still shown as if all the corpora were enabled. (Jyrki
// Niemi 2016-05-09)
settings.short_url_config = {};

// Default attribute display order in the sidebar. The missing
// attributes are shown after the specified ones in the order
// JavaScript iterates over the attribute properties. The
// specifications may also be regular expressions: the matching
// attributes are shown in the JavaScript property iteration order.
// The defaults can be overridden in the property
// sidebar_display_order of corpus settings. (Jyrki Niemi 2015-08-27)
//
// As of version 5.0.6, Språkbanken's Korp has similar functionality
// implemented via the property "order" of attribute definitions. The
// orders here are converted to "order" properties, but maybe we
// should eventually migrate to having the "order" properties in the
// attribute definitions. (Jyrki Niemi 2017-10-20)
settings.default_sidebar_display_order = {
    attributes: [
        "lemma",
        "lemmacomp",
        "pos",
        "posset",
        "lex",
        "saldo",
        "variants",
        "msd",
        "deprel",
    ],
    struct_attributes: [
        /^text_/,
        /^chapter_/,
        /^speech_/,
        /^paragraph_/,
        /^sentence_/,
        /^clause_/,
    ]
};

// The properties in settings.corpusFeatures.FEAT are added to corpus
// configurations (with recursive $.extend) whose property "features"
// (an array) contains "FEAT". (Jyrki Niemi 2016-10-18)
settings.corpusFeatures = {};

// for optimization purposes
settings.cqpPrio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

// Initial map centre: latitude, longitude and zoom level
settings.mapCenter = {
    // A geographical centre of Finland
    lat: 64.180708,
    lng: 25.803222,
    zoom: 4
};
// The function with which to calculate the initial map centre, using
// only the "zoom" property from settings.mapCenter
settings.calculateMapCenter = "centerPoint"


settings.readingModeField = "sentence_id"

// settings.lemgramComplete is used to override the default Karp-based
// lemgram completion. If specified, it should be an object containing
// two functions:
// - makeHTTPArgs (wf, resources, corporaIDs, httpArgs) ->
//     { method: ..., url: ..., params: ... }
//   Create HTTP arguments for the lemgram completion call based on the
//   given arguments.
//   Arguments:
//   - wf: the word form (prefix) to complete
//   - resources: completion resources to use (need not be used)
//   - corporaIDs: ids of selected corpora
//   - httpArgs: default HTTP arguments object containing method, url
//     and params
//   Return value: HTTP arguments object containing method, url and params
// - makeLemgramList (data) -> [lemgram]
//   Extract lemgrams from data returned by the lemgram completion call.
//   Return value: list (array) of lemgrams as strings
settings.lemgramComplete = {
    makeHTTPArgs: function (wf, resources, corporaIDs, httpArgs) {
        httpArgs.url = settings.korpBackendURL + "/lemgram_complete"
        httpArgs.params = {
            wf: wf,
            corpus: corporaIDs.join(",").toUpperCase(),
        }
        return httpArgs
    },
    makeLemgramList: function (data) {
        return data.lemgrams
    },
}

// Corpus folder property names not to be treated as corpus ids, in
// addition to "title", "contents" and "description"
settings.corpusfolderNonSubfolderProperties = ["info"]

// Function ((name: string) -> boolean) testing if the property named
// name of a folder is a subfolder; if undefined or null, test for
// non-inclusion in settings.corpusfolderNonSubfolderProperties in
// addition to "title", "contents" and "description"
settings.isSubfolderPropertyName = null

// If settings.allowNoPreselectedCorpora is true, an empty
// settings.preselectedCorpora array results in no corpora
// preselected, instead of preselecting all unrestricted corpora
settings.allowNoPreselectedCorpora = true

// A regular expression matching the names of positional attributes
// with an underscore, so that they will not be handled as structural
// attributes in statistics_config; if undefined or null, no
// positional attribute name contains an underscore.
// TODO: Generate the list dynamically based on corpora.
settings.posAttrNamesWithUnderscore =
    /^((word|lemma|pos|msd|dephead|deprel|ref)_.*|(clean|other|sketchy)_note)$/

// Formatting functions for corpus and corpus folder titles in the
// corpus chooser
settings.formatCorpusChooserItem = {
    // Italicize folders that are collections of corpora, not single
    // corpora or collections of subcorpora (as suggested by Mietta
    // Lennes)
    corpusCollection: (title, folder) => `<i>${title}</i>`,
    // // Bold titles for top folders of corpora and stand-alone corpora
    // // (corpora with no subcorpora)
    // standaloneCorpus: (title, corpus) => `<b>${title}</b>`,
    // corpusWithSubcorpora: (title, folder) => `<b>${title}</b>`,
}
