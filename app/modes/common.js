settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense' text-in-field='textInField'/>";

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

var liteOptions = {
    "is": "=",
    "is_not": "!="
}
var setOptions = {
    "is": "contains",
    "is_not": "not contains"
};
var probabilitySetOptions = {
    "is": "highest_rank",
    "is_not": "not_highest_rank",
    "contains": "rank_contains",
    "contains_not": "not_rank_contains",
};

var defaultContext = {
    "1 sentence": "1 sentence"
};

var spContext = {
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
};
var spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};

var spcWithin = {
    "clause": "clause",
    "sentence": "sentence",
    "paragraph": "paragraph"
};


settings.corpusFeatures.paragraphs = {
    within: spWithin,
    context: spContext,
};


// Recurring corpus licence information (name + URL)
settings.licenceinfo = {
    CC0: {
        name: "CC ZERO (CC0) (CLARIN PUB)",
        description: "Public Domain Dedication",
        url: "http://creativecommons.org/publicdomain/zero/1.0/",
    },
    CC_BY: {
        name: "CC BY (CLARIN PUB)",
        description: "Creative Commons Attribution",
        url: "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_30: {
        name: "CC BY 3.0 (CLARIN PUB)",
        description: "Creative Commons Attribution 3.0",
        url: "https://creativecommons.org/licenses/by/3.0/",
    },
    CC_BY_40: {
        name: "CC BY 4.0 (CLARIN PUB)",
        description: "Creative Commons Attribution",
        url: "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_NC: {
        name: "CC BY-NC (CLARIN PUB)",
        description: "Creative Commons Attribution-NonCommercial",
        url: "https://creativecommons.org/licenses/by-nc/4.0/",
    },
    CC_BY_ND: {
        name: "CC BY-ND (CLARIN PUB)",
        description: "Creative Commons Attribution-NoDerivatives",
        url: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    CC_BY_ND_40: {
        name: "CC BY-ND 4.0 (CLARIN PUB)",
        description: "Creative Commons Attribution-NoDerivatives 4.0",
        url: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    CC_BY_NC_ND: {
        name: "CC BY-NC-ND (CLARIN PUB)",
        description: "Creative Commons Attribution-NonCommercial-NoDerivatives",
        url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    CC_BY_NC_ND_40: {
        name: "CC BY-NC-ND 4.0 (CLARIN PUB)",
        description: "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0",
        url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    CC_BY_SA_30: {
        name: "CC BY-SA 3.0 (CLARIN PUB)",
        description: "Creative Commons Attribution-ShareAlike",
        url: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    EUPL_11: {
        name: "EUPL v1.1 (CLARIN PUB)",
        description: "European Union Public Licence, version 1.1",
        url: "http://ec.europa.eu/idabc/en/document/7774.html",
        // An alternative URL:
        // url: "https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11",
    },
    ParFinRus_2016_fi: {
        name: "CLARIN RES +NC +INF +ND 1.0",
        urn: "urn:nbn:fi:lb-2017020611",
    },
    ParFinRus_2016_en: {
        name: "CLARIN RES +NC +INF +ND 1.0",
        urn: "urn:nbn:fi:lb-2017020612",
    },
    ACA_NC: {
        name: "CLARIN ACA +NC",
        description: "CLARIN ACA (Academic) End-User License 1.0, Non-commercial",
        url: "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/ClarinEulaAca?NC=1",
    },
    Ylenews_sv_en: {
        name: "CLARIN ACA +NC 1.0",
        urn: "urn:nbn:fi:lb-2019120401",
    },
};


// Attribute value translations

var transl = {};

transl.yesno = {
    "yes": {
        "en": "yes",
        "fi": "kyllä",
        "sv": "ja",
    },
    "no": {
        "en": "no",
        "fi": "ei",
        "sv": "nej",
    },
};

transl.lang = {
    // Alternative codes are included for some languages: e.g. deu =
    // ger, ell = gre, nld = dut
    "deu": {
        "en": "German",
        "fi": "saksa",
        "sv": "tyska",
    },
    "dut": {
        "en": "Dutch",
        "fi": "hollanti",
        "sv": "nederländska",
    },
    "ell": {
        "en": "Greek",
        "fi": "kreikka",
        "sv": "grekiska",
    },
    "eng": {
        "en": "English",
        "fi": "englanti",
        "sv": "engelska",
    },
    "est": {
        "en": "Estonian",
        "fi": "viro",
        "sv": "estniska",
    },
    "fin": {
        "en": "Finnish",
        "fi": "suomi",
        "sv": "finska",
    },
    "fra": {
        "en": "French",
        "fi": "ranska",
        "sv": "franska",
    },
    "fre": {
        "en": "French",
        "fi": "ranska",
        "sv": "franska",
    },
    "ger": {
        "en": "German",
        "fi": "saksa",
        "sv": "tyska",
    },
    "gre": {
        "en": "Greek",
        "fi": "kreikka",
        "sv": "grekiska",
    },
    "heb": {
        "en": "Hebrew",
        "fi": "heprea",
        "sv": "hebreiska",
    },
    "hun": {
        "en": "Hungarian",
        "fi": "unkari",
        "sv": "ungerska",
    },
    "izh": {
        // "en": "izh",
        "fi": "inkeroinen",
        // "sv": "izh",
    },
    "kca": {
        // "en": "kca",
        "fi": "hanti",
        // "sv": "kca",
    },
    "kpv": {
        "en": "Komi-Zyrian",
        "fi": "komisyrjääni",
        "sv": "komi",
    },
    "lat": {
        "en": "Latin",
        "fi": "latina",
        "sv": "latin",
    },
    "mdf": {
        "en": "Moksha",
        "fi": "mokša",
        "sv": "moksja",
    },
    "mns": {
        // "en": "mns",
        "fi": "mansi",
        // "sv": "mns",
    },
    "mrj": {
        // "en": "mrj",
        "fi": "länsimari",
        // "sv": "mrj",
    },
    "myv": {
        "en": "Erzya",
        "fi": "ersä",
        "sv": "erzia",
    },
    "nld": {
        "en": "Dutch",
        "fi": "hollanti",
        "sv": "nederländska",
    },
    "nor": {
        "en": "Norwegian",
        "fi": "norja",
        "sv": "norska",
    },
    "rus": {
        "en": "Russian",
        "fi": "venäjä",
        "sv": "ryska",
    },
    "sel": {
        // "en": "sel",
        "fi": "selkuppi",
        // "sv": "sel",
    },
    "sjd": {
        // "en": "sjd",
        "fi": "kiltinänsaame",
        // "sv": "sjd",
    },
    "sms": {
        // "en": "sms",
        "fi": "koltansaame",
        // "sv": "sms",
    },
    "spa": {
        "en": "Spanish",
        "fi": "espanja",
        "sv": "spanska",
    },
    "swe": {
        "en": "Swedish",
        "fi": "ruotsi",
        "sv": "svenska",
    },
    "vep": {
        // "en": "vep",
        "fi": "vepsä",
        // "sv": "vep",
    },
    "yrk": {
        // "en": "yrk",
        "fi": "tundranenetsi",
        // "sv": "yrk",
    },
};

// TODO: Use a single set of language name translations, mapping
// attribute values to three-letter language codes
transl.langEuroParl = {
    "bg": {
        // "en": "bg",
        "fi": "bulgaria",
        // "sv": "bg",
    },
    "cs": {
        // "en": "cs",
        "fi": "tšekki",
        // "sv": "cs",
    },
    "da": {
        // "en": "da",
        "fi": "tanska",
        // "sv": "da",
    },
    "de": {
        // "en": "de",
        "fi": "saksa",
        // "sv": "de",
    },
    "el": {
        // "en": "el",
        "fi": "kreikka",
        // "sv": "el",
    },
    "en": {
        // "en": "en",
        "fi": "englanti",
        // "sv": "en",
    },
    "es": {
        // "en": "es",
        "fi": "espanja",
        // "sv": "es",
    },
    "et": {
        // "en": "et",
        "fi": "viro",
        // "sv": "et",
    },
    "eu": {
        // "en": "eu",
        "fi": "baski",
        // "sv": "eu",
    },
    "fi": {
        // "en": "fi",
        "fi": "suomi",
        // "sv": "fi",
    },
    "fr": {
        // "en": "fr",
        "fi": "ranska",
        // "sv": "fr",
    },
    "ga": {
        // "en": "ga",
        "fi": "iiri",
        // "sv": "ga",
    },
    "hu": {
        // "en": "hu",
        "fi": "unkari",
        // "sv": "hu",
    },
    "it": {
        // "en": "it",
        "fi": "italia",
        // "sv": "it",
    },
    "lt": {
        // "en": "lt",
        "fi": "liettua",
        // "sv": "lt",
    },
    "lv": {
        // "en": "lv",
        "fi": "latvia",
        // "sv": "lv",
    },
    "mt": {
        // "en": "mt",
        "fi": "malta",
        // "sv": "mt",
    },
    "nl": {
        // "en": "nl",
        "fi": "hollanti",
        // "sv": "nl",
    },
    "pl": {
        // "en": "pl",
        "fi": "puola",
        // "sv": "pl",
    },
    "pt": {
        // "en": "pt",
        "fi": "portugali",
        // "sv": "pt",
    },
    "ro": {
        // "en": "ro",
        "fi": "romania",
        // "sv": "ro",
    },
    "sk": {
        // "en": "sk",
        "fi": "slovakki",
        // "sv": "sk",
    },
    "sl": {
        // "en": "sl",
        "fi": "sloveeni",
        // "sv": "sl",
    },
    "sv": {
        // "en": "sv",
        "fi": "ruotsi",
        // "sv": "sv",
    },
    "und": {
        // "en": "und",
        "fi": "tuntematon",
        // "sv": "und",
    },
};

transl.pos = {
    "A": {
        "en": "adjective",
        "fi": "adjektiivi",
        "sv": "adjektiv",
    },
    "AB": {
        "en": "adverb",
        "fi": "adverbi",
        "sv": "adverb",
    },
    "ABBR": {
        // "en": "ABBR",
        "fi": "lyhenne",
        // "sv": "ABBR",
    },
    "ADJ": {
        "en": "adjective",
        "fi": "adjektiivi",
        // "sv": "ADJ",
    },
    "ADP": {
        "en": "adposition",
        "fi": "adpositio",
        // "sv": "ADP",
    },
    "ADV": {
        "en": "adverb",
        "fi": "adverbi",
        "sv": "adverb",
    },
    "AN": {
        // "en": "AN",
        "fi": "adjektiivi tai substantiivi",
        // "sv": "AN",
    },
    "Abbr": {
        "en": "abbreviation",
        "fi": "lyhenne",
        // "sv": "Abbr",
    },
    "AdA": {
        // "en": "AdA",
        "fi": "ad-adjektiivi",
        // "sv": "AdA",
    },
    "Adj": {
        // "en": "Adj",
        "fi": "adjektiivi",
        // "sv": "Adj",
    },
    "AdjNoun": {
        // "en": "AdjNoun",
        "fi": "adjektiivi/substantiivi",
        // "sv": "AdjNoun",
    },
    "Adp": {
        "en": "adposition",
        "fi": "adpositio",
        "sv": "adposition",
    },
    "Adv": {
        "en": "adverb",
        "fi": "adverbi",
        "sv": "adverb",
    },
    "AgPrc": {
        // "en": "AgPrc",
        "fi": "agenttipartisiippi",
        // "sv": "AgPrc",
    },
    "Art": {
        // "en": "Art",
        "fi": "artikkeli",
        // "sv": "Art",
    },
    "Aux": {
        "en": "auxiliary verb",
        "fi": "apuverbi",
        // "sv": "Aux",
    },
    "C": {
        "en": "conjunction",
        "fi": "konjunktio",
        "sv": "konjunktion",
    },
    "CC": {
        "en": "coordinating conjunction",
        "fi": "rinnastuskonjunktio",
        "sv": "samordnande konjunktion",
    },
    "CCONJ": {
        "en": "coordinating conjunction",
        "fi": "rinnastuskonjunktio",
        // "sv": "CCONJ",
    },
    "CS": {
        "en": "subordinating conjunction",
        "fi": "alistuskonjunktio",
        "sv": "underordnande konjunktion",
    },
    "Cmpr": {
        // "en": "Cmpr",
        "fi": "vertailukonjunktio",
        // "sv": "Cmpr",
    },
    "Code": {
        // "en": "Code",
        "fi": "koodi",
        // "sv": "Code",
    },
    "CompPart": {
        // "en": "CompPart",
        "fi": "yhdyssanan osa",
        // "sv": "CompPart",
    },
    "Con": {
        "en": "conjunction",
        "fi": "konjunktio",
        // "sv": "Con",
    },
    "Conj": {
        // "en": "Conj",
        "fi": "konjunktio",
        // "sv": "Conj",
    },
    "D": {
        // "en": "D",
        "fi": "johdos",
        // "sv": "D",
    },
    "DET": {
        "en": "determiner",
        "fi": "determineri",
        "sv": "determinerare",
    },
    "DL": {
        "en": "punctuation",
        "fi": "välimerkki",
        "sv": "interpunktion",
    },
    "DT": {
        "en": "determiner",
        "fi": "determineri",
        "sv": "determinerare",
    },
    "DaUs": {
        // "en": "DaUs",
        "fi": "adjektiivin -us-johdos",
        // "sv": "DaUs",
    },
    "DaUus": {
        // "en": "DaUus",
        "fi": "adjektiivin -uus-johdos",
        // "sv": "DaUus",
    },
    "DnInen": {
        // "en": "DnInen",
        "fi": "substantiivin -inen-johdos",
        // "sv": "DnInen",
    },
    "DnLlinen": {
        // "en": "DnLlinen",
        "fi": "substantiivin -llinen-johdos",
        // "sv": "DnLlinen",
    },
    "DnTon": {
        // "en": "DnTon",
        "fi": "substantiivin -ton-johdos",
        // "sv": "DnTon",
    },
    "DvMa": {
        // "en": "DvMa",
        "fi": "verbin -ma-johdos",
        // "sv": "DvMa",
    },
    "DvTta": {
        // "en": "DvTta",
        "fi": "verbin -tta-johdos",
        // "sv": "DvTta",
    },
    "E": {
        "en": "e",
        "fi": "e",
        "sv": "e",
    },
    "EN": {
        // "en": "EN",
        "fi": "partisiipin perfekti",
        // "sv": "EN",
    },
    "EX": {
        // "en": "EX",
        "fi": "there (is/are)",
        // "sv": "EX",
    },
    "Foreign": {
        "en": "foreign word",
        "fi": "vierassana",
        "sv": "utländskt ord",
    },
    "Forgn": {
        // "en": "Forgn",
        "fi": "vierassana",
        // "sv": "Forgn",
    },
    "Gerund": {
        // "en": "Gerund",
        "fi": "gerundi",
        // "sv": "Gerund",
    },
    "HA": {
        "en": "interrogative/relative adverb",
        "fi": "kysymys- tai relatiiviadverbi",
        "sv": "frågande/relativt adverb",
    },
    "HD": {
        "en": "interrogative/relative determiner",
        "fi": "kysymys- tai relatiividetermineri",
        "sv": "frågande/relativ determinerare",
    },
    "HP": {
        "en": "interrogative/relative pronoun",
        "fi": "kysymys- tai relatiivipronomini",
        "sv": "frågande/relativt pronomen",
    },
    "HS": {
        "en": "interrogative/relative possessive",
        "fi": "kysymys- tai relatiivipossessiivipronomini",
        "sv": "frågande/relativt possesivt pronomen",
    },
    "Heur": {
        // "en": "Heur",
        "fi": "heuristinen",
        // "sv": "Heur",
    },
    "IE": {
        "en": "infinitive marker",
        "fi": "infinitiivin merkitsin",
        "sv": "infinitivmärke",
    },
    "IN": {
        "en": "interjection",
        "fi": "interjektio",
        "sv": "interjektion",
    },
    "INFMARK": {
        // "en": "INFMARK",
        "fi": "infinitiivin merkitsin",
        // "sv": "INFMARK",
    },
    "ING": {
        // "en": "ING",
        "fi": "-ing",
        // "sv": "ING",
    },
    "INTJ": {
        "en": "interjection",
        "fi": "interjektio",
        // "sv": "INTJ",
    },
    "Interj": {
        "en": "interjection",
        "fi": "interjektio",
        "sv": "interjektion",
    },
    "JJ": {
        "en": "adjective",
        "fi": "adjektiivi",
        "sv": "adjektiv",
    },
    "KN": {
        "en": "conjunction",
        "fi": "konjunktio",
        "sv": "konjunktion",
    },
    "MAD": {
        "en": "punctuation",
        "fi": "välimerkki",
        "sv": "interpunktion",
    },
    "MID": {
        "en": "punctuation",
        "fi": "välimerkki",
        "sv": "interpunktion",
    },
    "MID|MAD|PAD": {
        "en": "punctuation",
        // "fi": "MID|MAD|PAD",
        "sv": "interpunktion",
    },
    "N": {
        "en": "noun",
        "fi": "substantiivi",
        "sv": "substantiv",
    },
    "NEG-PART": {
        // "en": "NEG-PART",
        "fi": "kieltopartikkeli",
        // "sv": "NEG-PART",
    },
    "NN": {
        "en": "noun",
        "fi": "substantiivi",
        "sv": "substantiv",
    },
    "NOUN": {
        "en": "noun",
        "fi": "substantiivi",
        // "sv": "NOUN",
    },
    "NUM": {
        "en": "numeral",
        "fi": "numeraali",
        "sv": "numeral",
    },
    "NegPrc": {
        // "en": "NegPrc",
        "fi": "kieltopartisiippi",
        // "sv": "NegPrc",
    },
    "NonTWOL": {
        // "en": "NonTWOL",
        "fi": "tunnistamaton",
        // "sv": "NonTWOL",
    },
    "Noun": {
        // "en": "Noun",
        "fi": "substantiivi",
        // "sv": "Noun",
    },
    "NounNoun": {
        // "en": "NounNoun",
        "fi": "substantiivi/substantiivi",
        // "sv": "NounNoun",
    },
    "Num": {
        "en": "numeral",
        "fi": "numeraali",
        "sv": "numeral",
    },
    "Numeral": {
        // "en": "Numeral",
        "fi": "numeraali",
        // "sv": "Numeral",
    },
    "Other": {
        "en": "other",
        "fi": "muu",
        // "sv": "Other",
    },
    "P": {
        // "en": "P",
        "fi": "P",
        // "sv": "P",
    },
    "PAD": {
        "en": "punctuation",
        "fi": "välimerkki",
        "sv": "interpunktion",
    },
    "PART": {
        "en": "particle",
        "fi": "partikkeli",
        // "sv": "PART",
    },
    "PC": {
        "en": "participle",
        "fi": "partisiippi",
        "sv": "particip",
    },
    "PL": {
        "en": "particle",
        "fi": "partikkeli",
        "sv": "partikel",
    },
    "PM": {
        "en": "proper noun",
        "fi": "erisnimi",
        "sv": "egennamn",
    },
    "PN": {
        "en": "pronoun",
        "fi": "pronomini",
        "sv": "pronomen",
    },
    "POST": {
        "en": "postposition",
        "fi": "postpositio",
        // "sv": "POST",
    },
    "PP": {
        "en": "preposition",
        "fi": "prepositio",
        "sv": "preposition",
    },
    "PREP": {
        "en": "preposition",
        "fi": "prepositio",
        "sv": "preposition",
    },
    "PRON": {
        "en": "pronoun",
        "fi": "pronomini",
        "sv": "pronomen",
    },
    "PROPN": {
        "en": "proper noun",
        "fi": "erisnimi",
        // "sv": "PROPN",
    },
    "PS": {
        "en": "possessive",
        "fi": "possessiivipronomini",
        "sv": "possessivt pronomen",
    },
    "PUNCT": {
        "en": "punctuation mark",
        "fi": "välimerkki",
        // "sv": "PUNCT",
    },
    "Part": {
        // "en": "Part",
        "fi": "partisiippi",
        // "sv": "Part",
    },
    "Particle": {
        // "en": "Particle",
        "fi": "partikkeli",
        // "sv": "Particle",
    },
    "Pcp1": {
        // "en": "Pcp1",
        "fi": "1. partisiippi",
        // "sv": "Pcp1",
    },
    "Pcp2": {
        // "en": "Pcp2",
        "fi": "2. partisiippi",
        // "sv": "Pcp2",
    },
    "Post": {
        // "en": "Post",
        "fi": "postpositio",
        // "sv": "Post",
    },
    "Pp": {
        // "en": "Pp",
        "fi": "adpositio",
        // "sv": "Pp",
    },
    "Predicative": {
        // "en": "Predicative",
        "fi": "predikatiivi",
        // "sv": "Predicative",
    },
    "Prep": {
        // "en": "Prep",
        "fi": "prepositio",
        // "sv": "Prep",
    },
    "Preposition": {
        // "en": "Preposition",
        "fi": "prepositio",
        // "sv": "Preposition",
    },
    "PrfPrc": {
        // "en": "PrfPrc",
        "fi": "partisiipin perfekti",
        // "sv": "PrfPrc",
    },
    "Pron": {
        "en": "pronoun",
        "fi": "pronomini",
        "sv": "pronomen",
    },
    "Prop": {
        // "en": "Prop",
        "fi": "erisnimi",
        // "sv": "Prop",
    },
    "PrsPrc": {
        // "en": "PrsPrc",
        "fi": "partisiipin preesens",
        // "sv": "PrsPrc",
    },
    "Pun": {
        "en": "punctuation",
        "fi": "välimerkki",
        // "sv": "Pun",
    },
    "Punct": {
        "en": "punctuation",
        "fi": "välimerkki",
        "sv": "interpunktion",
    },
    "REL": {
        // "en": "REL",
        "fi": "relatiivipronomini",
        // "sv": "REL",
    },
    "RG": {
        "en": "cardinal number",
        "fi": "perusluku",
        "sv": "grundtal",
    },
    "RO": {
        "en": "ordinal number",
        "fi": "järjestysluku",
        "sv": "ordningstal",
    },
    "ReflPron": {
        // "en": "ReflPron",
        "fi": "refleksiivipronomini",
        // "sv": "ReflPron",
    },
    "Rel": {
        // "en": "Rel",
        "fi": "relatiivipronomini",
        // "sv": "Rel",
    },
    "SCONJ": {
        "en": "subordinating conjunction",
        "fi": "alistuskonjunktio",
        // "sv": "SCONJ",
    },
    "SN": {
        "en": "subjunction",
        "fi": "alistuskonjunktio",
        "sv": "subjunktion",
    },
    "SYM": {
        "en": "symbol",
        "fi": "symboli",
        // "sv": "SYM",
    },
    "Symb": {
        "en": "symbol",
        "fi": "symboli",
        "sv": "symbol",
    },
    "TrunCo": {
        // "en": "TrunCo",
        "fi": "yhdyssanan osa",
        // "sv": "TrunCo",
    },
    "UNK": {
        // "en": "UNK",
        "fi": "tuntematon",
        // "sv": "UNK",
    },
    "UNKNOWN": {
        "en": "unknown",
        "fi": "analysoimaton",
        "sv": "oanalyserat",
    },
    "UO": {
        "en": "foreign word",
        "fi": "vierassana",
        "sv": "utländskt ord",
    },
    "Unknown": {
        "en": "unknown",
        "fi": "tunnistamaton",
        // "sv": "Unknown",
    },
    "Unkwn": {
        // "en": "Unkwn",
        "fi": "tunnistamaton",
        // "sv": "Unkwn",
    },
    "V": {
        "en": "verb",
        "fi": "verbi",
        "sv": "verb",
    },
    "VB": {
        "en": "verb",
        "fi": "verbi",
        "sv": "verb",
    },
    "VERB": {
        "en": "verb",
        "fi": "verbi",
        // "sv": "VERB",
    },
    "Verb": {
        // "en": "Verb",
        "fi": "verbi",
        // "sv": "Verb",
    },
    "X": {
        "en": "other",
        "fi": "muu",
        // "sv": "X",
    },
    "[NON-TWOL]": {
        // "en": "[NON-TWOL]",
        "fi": "tunnistamaton",
        // "sv": "[NON-TWOL]",
    },
    "a": {
        // "en": "a",
        "fi": "adjektiivi",
        // "sv": "a",
    },
    "a:pron": {
        // "en": "a:pron",
        "fi": "adjektiivi: muu pronominaalinen",
        // "sv": "a:pron",
    },
    "a:pron:dem": {
        // "en": "a:pron:dem",
        "fi": "adjektiivi: demonstratiivinen",
        // "sv": "a:pron:dem",
    },
    "a:pron:int": {
        // "en": "a:pron:int",
        "fi": "adjektiivi: interrogatiivinen",
        // "sv": "a:pron:int",
    },
    "a:pron:rel": {
        // "en": "a:pron:rel",
        "fi": "adjektiivi: relatiivinen",
        // "sv": "a:pron:rel",
    },
    "adv": {
        // "en": "adv",
        "fi": "adverbi",
        // "sv": "adv",
    },
    "adv:pron": {
        // "en": "adv:pron",
        "fi": "adverbi: muu pronominaalinen",
        // "sv": "adv:pron",
    },
    "adv:pron:dem": {
        // "en": "adv:pron:dem",
        "fi": "adverbi: demonstratiivinen",
        // "sv": "adv:pron:dem",
    },
    "adv:pron:int": {
        // "en": "adv:pron:int",
        "fi": "adverbi: interrogatiivinen",
        // "sv": "adv:pron:int",
    },
    "adv:pron:rel": {
        // "en": "adv:pron:rel",
        "fi": "adverbi: relatiivinen",
        // "sv": "adv:pron:rel",
    },
    "adv:q": {
        // "en": "adv:q",
        "fi": "adverbi: paljon-tyyppi",
        // "sv": "adv:q",
    },
    "byu_GAP": {
        "en": "deleted",
        // "fi": "byu_GAP",
        // "sv": "byu_GAP",
    },
    "byu_a": {
        "en": "non-standard article “ze”",
        // "fi": "byu_a",
        // "sv": "byu_a",
    },
    "byu_appge": {
        "en": "possessive pronoun, pre-nominal",
        // "fi": "byu_appge",
        // "sv": "byu_appge",
    },
    "byu_at": {
        "en": "article",
        // "fi": "byu_at",
        // "sv": "byu_at",
    },
    "byu_at1": {
        "en": "singular article",
        // "fi": "byu_at1",
        // "sv": "byu_at1",
    },
    "byu_bcl": {
        "en": "before-clause marker",
        // "fi": "byu_bcl",
        // "sv": "byu_bcl",
    },
    "byu_c": {
        "en": "conjunction “cept”",
        // "fi": "byu_c",
        // "sv": "byu_c",
    },
    "byu_cc": {
        "en": "coordinating conjunction",
        // "fi": "byu_cc",
        // "sv": "byu_cc",
    },
    "byu_ccb": {
        "en": "adversative coordinating conjunction",
        // "fi": "byu_ccb",
        // "sv": "byu_ccb",
    },
    "byu_cs": {
        "en": "subordinating conjunction",
        // "fi": "byu_cs",
        // "sv": "byu_cs",
    },
    "byu_csa": {
        "en": "as (as conjunction)",
        // "fi": "byu_csa",
        // "sv": "byu_csa",
    },
    "byu_csn": {
        "en": "than (as conjunction)",
        // "fi": "byu_csn",
        // "sv": "byu_csn",
    },
    "byu_cst": {
        "en": "that (as conjunction)",
        // "fi": "byu_cst",
        // "sv": "byu_cst",
    },
    "byu_csw": {
        "en": "whether (as conjunction)",
        // "fi": "byu_csw",
        // "sv": "byu_csw",
    },
    "byu_d": {
        "en": "“an-other”",
        // "fi": "byu_d",
        // "sv": "byu_d",
    },
    "byu_da": {
        "en": "after-determiner or post-determiner capable of pronominal function",
        // "fi": "byu_da",
        // "sv": "byu_da",
    },
    "byu_da1": {
        "en": "singular after-determiner",
        // "fi": "byu_da1",
        // "sv": "byu_da1",
    },
    "byu_da2": {
        "en": "plural after-determiner",
        // "fi": "byu_da2",
        // "sv": "byu_da2",
    },
    "byu_dar": {
        "en": "comparative after-determiner",
        // "fi": "byu_dar",
        // "sv": "byu_dar",
    },
    "byu_dat": {
        "en": "superlative after-determiner",
        // "fi": "byu_dat",
        // "sv": "byu_dat",
    },
    "byu_db": {
        "en": "before determiner or pre-determiner capable of pronominal function",
        // "fi": "byu_db",
        // "sv": "byu_db",
    },
    "byu_db2": {
        "en": "plural before-determiner",
        // "fi": "byu_db2",
        // "sv": "byu_db2",
    },
    "byu_dd": {
        "en": "determiner (capable of pronominal function)",
        // "fi": "byu_dd",
        // "sv": "byu_dd",
    },
    "byu_dd1": {
        "en": "singular determiner",
        // "fi": "byu_dd1",
        // "sv": "byu_dd1",
    },
    "byu_dd2": {
        "en": "plural determiner",
        // "fi": "byu_dd2",
        // "sv": "byu_dd2",
    },
    "byu_ddq": {
        "en": "wh-determiner",
        // "fi": "byu_ddq",
        // "sv": "byu_ddq",
    },
    "byu_ddqge": {
        "en": "wh-determiner, genitive",
        // "fi": "byu_ddqge",
        // "sv": "byu_ddqge",
    },
    "byu_ddqv": {
        "en": "wh-ever determiner",
        // "fi": "byu_ddqv",
        // "sv": "byu_ddqv",
    },
    "byu_ex": {
        "en": "existential there",
        // "fi": "byu_ex",
        // "sv": "byu_ex",
    },
    "byu_f": {
        "en": "foreign article or preposition",
        // "fi": "byu_f",
        // "sv": "byu_f",
    },
    "byu_fo": {
        "en": "formula",
        // "fi": "byu_fo",
        // "sv": "byu_fo",
    },
    "byu_fu": {
        "en": "unclassified word",
        // "fi": "byu_fu",
        // "sv": "byu_fu",
    },
    "byu_fw": {
        "en": "foreign word",
        // "fi": "byu_fw",
        // "sv": "byu_fw",
    },
    "byu_ge": {
        "en": "germanic genitive marker",
        // "fi": "byu_ge",
        // "sv": "byu_ge",
    },
    "byu_i": {
        "en": "non-standard preposition “uv”",
        // "fi": "byu_i",
        // "sv": "byu_i",
    },
    "byu_if": {
        "en": "for (as preposition)",
        // "fi": "byu_if",
        // "sv": "byu_if",
    },
    "byu_ii": {
        "en": "general preposition",
        // "fi": "byu_ii",
        // "sv": "byu_ii",
    },
    "byu_io": {
        "en": "of (as preposition)",
        // "fi": "byu_io",
        // "sv": "byu_io",
    },
    "byu_iw": {
        "en": "with, without (as prepositions)",
        // "fi": "byu_iw",
        // "sv": "byu_iw",
    },
    "byu_j": {
        "en": "other adjective",
        // "fi": "byu_j",
        // "sv": "byu_j",
    },
    "byu_jj": {
        "en": "general adjective",
        // "fi": "byu_jj",
        // "sv": "byu_jj",
    },
    "byu_jjr": {
        "en": "general comparative adjective",
        // "fi": "byu_jjr",
        // "sv": "byu_jjr",
    },
    "byu_jjt": {
        "en": "general superlative adjective",
        // "fi": "byu_jjt",
        // "sv": "byu_jjt",
    },
    "byu_jk": {
        "en": "catenative adjective",
        // "fi": "byu_jk",
        // "sv": "byu_jk",
    },
    "byu_m": {
        "en": "other number",
        // "fi": "byu_m",
        // "sv": "byu_m",
    },
    "byu_m#": {
        "en": "number with unit",
        // "fi": "byu_m#",
        // "sv": "byu_m#",
    },
    "byu_m$": {
        "en": "number with currency symbol",
        // "fi": "byu_m$",
        // "sv": "byu_m$",
    },
    "byu_m1": {
        "en": "number (“million”, “billion”)",
        // "fi": "byu_m1",
        // "sv": "byu_m1",
    },
    "byu_mc": {
        "en": "cardinal number, neutral for number",
        // "fi": "byu_mc",
        // "sv": "byu_mc",
    },
    "byu_mc1": {
        "en": "singular cardinal number",
        // "fi": "byu_mc1",
        // "sv": "byu_mc1",
    },
    "byu_mc2": {
        "en": "plural cardinal number",
        // "fi": "byu_mc2",
        // "sv": "byu_mc2",
    },
    "byu_mcge": {
        "en": "genitive cardinal number, neutral for number",
        // "fi": "byu_mcge",
        // "sv": "byu_mcge",
    },
    "byu_mcmc": {
        "en": "hyphenated number",
        // "fi": "byu_mcmc",
        // "sv": "byu_mcmc",
    },
    "byu_md": {
        "en": "ordinal number",
        // "fi": "byu_md",
        // "sv": "byu_md",
    },
    "byu_mf": {
        "en": "fraction,neutral for number",
        // "fi": "byu_mf",
        // "sv": "byu_mf",
    },
    "byu_n": {
        "en": "other noun",
        // "fi": "byu_n",
        // "sv": "byu_n",
    },
    "byu_nd1": {
        "en": "singular noun of direction",
        // "fi": "byu_nd1",
        // "sv": "byu_nd1",
    },
    "byu_nn": {
        "en": "common noun, neutral for number",
        // "fi": "byu_nn",
        // "sv": "byu_nn",
    },
    "byu_nn1": {
        "en": "singular common noun",
        // "fi": "byu_nn1",
        // "sv": "byu_nn1",
    },
    "byu_nn2": {
        "en": "plural common noun",
        // "fi": "byu_nn2",
        // "sv": "byu_nn2",
    },
    "byu_nna": {
        "en": "following noun of title",
        // "fi": "byu_nna",
        // "sv": "byu_nna",
    },
    "byu_nnb": {
        "en": "preceding noun of title",
        // "fi": "byu_nnb",
        // "sv": "byu_nnb",
    },
    "byu_nnl1": {
        "en": "singular locative noun",
        // "fi": "byu_nnl1",
        // "sv": "byu_nnl1",
    },
    "byu_nnl2": {
        "en": "plural locative noun",
        // "fi": "byu_nnl2",
        // "sv": "byu_nnl2",
    },
    "byu_nno": {
        "en": "numeral noun, neutral for number",
        // "fi": "byu_nno",
        // "sv": "byu_nno",
    },
    "byu_nno2": {
        "en": "numeral noun, plural",
        // "fi": "byu_nno2",
        // "sv": "byu_nno2",
    },
    "byu_nnt1": {
        "en": "temporal noun, singular",
        // "fi": "byu_nnt1",
        // "sv": "byu_nnt1",
    },
    "byu_nnt2": {
        "en": "temporal noun, plural",
        // "fi": "byu_nnt2",
        // "sv": "byu_nnt2",
    },
    "byu_nnu": {
        "en": "unit of measurement, neutral for number",
        // "fi": "byu_nnu",
        // "sv": "byu_nnu",
    },
    "byu_nnu1": {
        "en": "singular unit of measurement",
        // "fi": "byu_nnu1",
        // "sv": "byu_nnu1",
    },
    "byu_nnu2": {
        "en": "plural unit of measurement",
        // "fi": "byu_nnu2",
        // "sv": "byu_nnu2",
    },
    "byu_np": {
        "en": "proper noun, neutral for number",
        // "fi": "byu_np",
        // "sv": "byu_np",
    },
    "byu_np1": {
        "en": "singular proper noun",
        // "fi": "byu_np1",
        // "sv": "byu_np1",
    },
    "byu_np2": {
        "en": "plural proper noun",
        // "fi": "byu_np2",
        // "sv": "byu_np2",
    },
    "byu_npd1": {
        "en": "singular weekday noun",
        // "fi": "byu_npd1",
        // "sv": "byu_npd1",
    },
    "byu_npd2": {
        "en": "plural weekday noun",
        // "fi": "byu_npd2",
        // "sv": "byu_npd2",
    },
    "byu_npm1": {
        "en": "singular month noun",
        // "fi": "byu_npm1",
        // "sv": "byu_npm1",
    },
    "byu_npm2": {
        "en": "plural month noun",
        // "fi": "byu_npm2",
        // "sv": "byu_npm2",
    },
    "byu_npx": {
        "en": "other proper noun",
        // "fi": "byu_npx",
        // "sv": "byu_npx",
    },
    "byu_null": {
        "en": "word containing symbols",
        // "fi": "byu_null",
        // "sv": "byu_null",
    },
    "byu_p": {
        "en": "other pronoun",
        // "fi": "byu_p",
        // "sv": "byu_p",
    },
    "byu_pn": {
        "en": "indefinite pronoun, neutral for number",
        // "fi": "byu_pn",
        // "sv": "byu_pn",
    },
    "byu_pn1": {
        "en": "indefinite pronoun, singular",
        // "fi": "byu_pn1",
        // "sv": "byu_pn1",
    },
    "byu_pnqo": {
        "en": "objective wh-pronoun",
        // "fi": "byu_pnqo",
        // "sv": "byu_pnqo",
    },
    "byu_pnqs": {
        "en": "subjective wh-pronoun",
        // "fi": "byu_pnqs",
        // "sv": "byu_pnqs",
    },
    "byu_pnqv": {
        "en": "wh-ever pronoun",
        // "fi": "byu_pnqv",
        // "sv": "byu_pnqv",
    },
    "byu_pnx1": {
        "en": "reflexive indefinite pronoun",
        // "fi": "byu_pnx1",
        // "sv": "byu_pnx1",
    },
    "byu_ppge": {
        "en": "nominal possessive personal pronoun",
        // "fi": "byu_ppge",
        // "sv": "byu_ppge",
    },
    "byu_pph1": {
        "en": "3rd person singular neuter personal pronoun",
        // "fi": "byu_pph1",
        // "sv": "byu_pph1",
    },
    "byu_ppho1": {
        "en": "3rd person singular objective personal pronoun",
        // "fi": "byu_ppho1",
        // "sv": "byu_ppho1",
    },
    "byu_ppho2": {
        "en": "3rd person plural objective personal pronoun",
        // "fi": "byu_ppho2",
        // "sv": "byu_ppho2",
    },
    "byu_pphs1": {
        "en": "3rd person singular subjective personal pronoun",
        // "fi": "byu_pphs1",
        // "sv": "byu_pphs1",
    },
    "byu_pphs2": {
        "en": "3rd person plural subjective personal pronoun",
        // "fi": "byu_pphs2",
        // "sv": "byu_pphs2",
    },
    "byu_ppio1": {
        "en": "1st person singular objective personal pronoun",
        // "fi": "byu_ppio1",
        // "sv": "byu_ppio1",
    },
    "byu_ppio2": {
        "en": "1st person plural objective personal pronoun",
        // "fi": "byu_ppio2",
        // "sv": "byu_ppio2",
    },
    "byu_ppis1": {
        "en": "1st person singular subjective personal pronoun",
        // "fi": "byu_ppis1",
        // "sv": "byu_ppis1",
    },
    "byu_ppis2": {
        "en": "1st person plural subjective personal pronoun",
        // "fi": "byu_ppis2",
        // "sv": "byu_ppis2",
    },
    "byu_ppx1": {
        "en": "singular reflexive personal pronoun",
        // "fi": "byu_ppx1",
        // "sv": "byu_ppx1",
    },
    "byu_ppx2": {
        "en": "plural reflexive personal pronoun",
        // "fi": "byu_ppx2",
        // "sv": "byu_ppx2",
    },
    "byu_ppy": {
        "en": "2nd person personal pronoun",
        // "fi": "byu_ppy",
        // "sv": "byu_ppy",
    },
    "byu_ra": {
        "en": "adverb, after nominal head",
        // "fi": "byu_ra",
        // "sv": "byu_ra",
    },
    "byu_rex": {
        "en": "adverb introducing appositional constructions",
        // "fi": "byu_rex",
        // "sv": "byu_rex",
    },
    "byu_rg": {
        "en": "degree adverb",
        // "fi": "byu_rg",
        // "sv": "byu_rg",
    },
    "byu_rgq": {
        "en": "wh- degree adverb",
        // "fi": "byu_rgq",
        // "sv": "byu_rgq",
    },
    "byu_rgqv": {
        "en": "wh-ever degree adverb",
        // "fi": "byu_rgqv",
        // "sv": "byu_rgqv",
    },
    "byu_rgr": {
        "en": "comparative degree adverb",
        // "fi": "byu_rgr",
        // "sv": "byu_rgr",
    },
    "byu_rgt": {
        "en": "superlative degree adverb",
        // "fi": "byu_rgt",
        // "sv": "byu_rgt",
    },
    "byu_rl": {
        "en": "locative adverb",
        // "fi": "byu_rl",
        // "sv": "byu_rl",
    },
    "byu_rp": {
        "en": "prepositional adverb, particle",
        // "fi": "byu_rp",
        // "sv": "byu_rp",
    },
    "byu_rpk": {
        "en": "prepositional adverb, catenative",
        // "fi": "byu_rpk",
        // "sv": "byu_rpk",
    },
    "byu_rr": {
        "en": "general adverb",
        // "fi": "byu_rr",
        // "sv": "byu_rr",
    },
    "byu_rrq": {
        "en": "wh- general adverb",
        // "fi": "byu_rrq",
        // "sv": "byu_rrq",
    },
    "byu_rrqv": {
        "en": "wh-ever general adverb",
        // "fi": "byu_rrqv",
        // "sv": "byu_rrqv",
    },
    "byu_rrr": {
        "en": "comparative general adverb",
        // "fi": "byu_rrr",
        // "sv": "byu_rrr",
    },
    "byu_rrt": {
        "en": "superlative general adverb",
        // "fi": "byu_rrt",
        // "sv": "byu_rrt",
    },
    "byu_rt": {
        "en": "quasi-nominal adverb of time",
        // "fi": "byu_rt",
        // "sv": "byu_rt",
    },
    "byu_to": {
        "en": "infinitive marker",
        // "fi": "byu_to",
        // "sv": "byu_to",
    },
    "byu_uh": {
        "en": "interjection",
        // "fi": "byu_uh",
        // "sv": "byu_uh",
    },
    "byu_v": {
        "en": "other verb form",
        // "fi": "byu_v",
        // "sv": "byu_v",
    },
    "byu_vb0": {
        "en": "be, base form (finite i.e. imperative, subjunctive)",
        // "fi": "byu_vb0",
        // "sv": "byu_vb0",
    },
    "byu_vbdr": {
        "en": "were",
        // "fi": "byu_vbdr",
        // "sv": "byu_vbdr",
    },
    "byu_vbdz": {
        "en": "was",
        // "fi": "byu_vbdz",
        // "sv": "byu_vbdz",
    },
    "byu_vbg": {
        "en": "being",
        // "fi": "byu_vbg",
        // "sv": "byu_vbg",
    },
    "byu_vbi": {
        "en": "be, infinitive",
        // "fi": "byu_vbi",
        // "sv": "byu_vbi",
    },
    "byu_vbm": {
        "en": "am",
        // "fi": "byu_vbm",
        // "sv": "byu_vbm",
    },
    "byu_vbn": {
        "en": "been",
        // "fi": "byu_vbn",
        // "sv": "byu_vbn",
    },
    "byu_vbr": {
        "en": "are",
        // "fi": "byu_vbr",
        // "sv": "byu_vbr",
    },
    "byu_vbz": {
        "en": "is",
        // "fi": "byu_vbz",
        // "sv": "byu_vbz",
    },
    "byu_vd": {
        "en": "don, dons",
        // "fi": "byu_vd",
        // "sv": "byu_vd",
    },
    "byu_vd0": {
        "en": "do, base form (finite)",
        // "fi": "byu_vd0",
        // "sv": "byu_vd0",
    },
    "byu_vdd": {
        "en": "did",
        // "fi": "byu_vdd",
        // "sv": "byu_vdd",
    },
    "byu_vdg": {
        "en": "doing",
        // "fi": "byu_vdg",
        // "sv": "byu_vdg",
    },
    "byu_vdi": {
        "en": "do, infinitive",
        // "fi": "byu_vdi",
        // "sv": "byu_vdi",
    },
    "byu_vdn": {
        "en": "done",
        // "fi": "byu_vdn",
        // "sv": "byu_vdn",
    },
    "byu_vdz": {
        "en": "does",
        // "fi": "byu_vdz",
        // "sv": "byu_vdz",
    },
    "byu_vh0": {
        "en": "have, base form (finite)",
        // "fi": "byu_vh0",
        // "sv": "byu_vh0",
    },
    "byu_vhd": {
        "en": "had (past tense)",
        // "fi": "byu_vhd",
        // "sv": "byu_vhd",
    },
    "byu_vhg": {
        "en": "having",
        // "fi": "byu_vhg",
        // "sv": "byu_vhg",
    },
    "byu_vhi": {
        "en": "have, infinitive",
        // "fi": "byu_vhi",
        // "sv": "byu_vhi",
    },
    "byu_vhn": {
        "en": "had (past participle)",
        // "fi": "byu_vhn",
        // "sv": "byu_vhn",
    },
    "byu_vhz": {
        "en": "has",
        // "fi": "byu_vhz",
        // "sv": "byu_vhz",
    },
    "byu_vm": {
        "en": "modal auxiliary",
        // "fi": "byu_vm",
        // "sv": "byu_vm",
    },
    "byu_vmk": {
        "en": "modal catenative",
        // "fi": "byu_vmk",
        // "sv": "byu_vmk",
    },
    "byu_vv0": {
        "en": "base form of lexical verb",
        // "fi": "byu_vv0",
        // "sv": "byu_vv0",
    },
    "byu_vvd": {
        "en": "past tense of lexical verb",
        // "fi": "byu_vvd",
        // "sv": "byu_vvd",
    },
    "byu_vvg": {
        "en": "-ing participle of lexical verb",
        // "fi": "byu_vvg",
        // "sv": "byu_vvg",
    },
    "byu_vvgk": {
        "en": "-ing participle catenative",
        // "fi": "byu_vvgk",
        // "sv": "byu_vvgk",
    },
    "byu_vvi": {
        "en": "infinitive",
        // "fi": "byu_vvi",
        // "sv": "byu_vvi",
    },
    "byu_vvn": {
        "en": "past participle of lexical verb",
        // "fi": "byu_vvn",
        // "sv": "byu_vvn",
    },
    "byu_vvnk": {
        "en": "past participle catenative",
        // "fi": "byu_vvnk",
        // "sv": "byu_vvnk",
    },
    "byu_vvz": {
        "en": "-s form of lexical verb",
        // "fi": "byu_vvz",
        // "sv": "byu_vvz",
    },
    "byu_x": {
        "en": "other word (x)",
        // "fi": "byu_x",
        // "sv": "byu_x",
    },
    "byu_xx": {
        "en": "not, n't",
        // "fi": "byu_xx",
        // "sv": "byu_xx",
    },
    "byu_xxy": {
        "en": "no or not with hyphen",
        // "fi": "byu_xxy",
        // "sv": "byu_xxy",
    },
    "byu_y0": {
        "en": "punctuation (literal)",
        // "fi": "byu_y0",
        // "sv": "byu_y0",
    },
    "byu_z": {
        "en": "other word (z)",
        // "fi": "byu_z",
        // "sv": "byu_z",
    },
    "byu_z'": {
        "en": "word possibly missing an apostrophe",
        // "fi": "byu_z'",
        // "sv": "byu_z'",
    },
    "byu_zz": {
        "en": "other word (zz)",
        // "fi": "byu_zz",
        // "sv": "byu_zz",
    },
    "byu_zz1": {
        "en": "singular letter of the alphabet",
        // "fi": "byu_zz1",
        // "sv": "byu_zz1",
    },
    "byu_zz2": {
        "en": "plural letter of the alphabet",
        // "fi": "byu_zz2",
        // "sv": "byu_zz2",
    },
    "byu_zzc": {
        "en": "transcript metainformation @(...)",
        // "fi": "byu_zzc",
        // "sv": "byu_zzc",
    },
    "byu_zzq": {
        "en": "transcript metainformation @!...",
        // "fi": "byu_zzq",
        // "sv": "byu_zzq",
    },
    "cnj": {
        // "en": "cnj",
        "fi": "konjunktio",
        // "sv": "cnj",
    },
    "cnj:coord": {
        // "en": "cnj:coord",
        "fi": "konjunktio: rinnastus-",
        // "sv": "cnj:coord",
    },
    "cnj:rel": {
        // "en": "cnj:rel",
        "fi": "konjunktio: relatiivi-",
        // "sv": "cnj:rel",
    },
    "cnj:sub": {
        // "en": "cnj:sub",
        "fi": "konjunktio: alistus-",
        // "sv": "cnj:sub",
    },
    "intj": {
        // "en": "intj",
        "fi": "interjektio",
        // "sv": "intj",
    },
    "muu": {
        // "en": "muu",
        "fi": "muu",
        // "sv": "muu",
    },
    "n": {
        // "en": "n",
        "fi": "substantiivi: ei erisnimi",
        // "sv": "n",
    },
    "n:prop": {
        // "en": "n:prop",
        "fi": "substantiivi: erisnimi, ei henkilön-",
        // "sv": "n:prop",
    },
    "n:prop:any": {
        // "en": "n:prop:any",
        "fi": "substantiivi: erisnimi",
        // "sv": "n:prop:any",
    },
    "n:prop:pname": {
        // "en": "n:prop:pname",
        "fi": "substantiivi: henkilönnimi",
        // "sv": "n:prop:pname",
    },
    "neg": {
        // "en": "neg",
        "fi": "kieltosana ”ei”, ”älä”",
        // "sv": "neg",
    },
    "null": {
        // "en": "null",
        "fi": "tyhjä",
        // "sv": "null",
    },
    "num": {
        // "en": "num",
        "fi": "numeraali",
        // "sv": "num",
    },
    "num:card": {
        // "en": "num:card",
        "fi": "numeraali: perusluku",
        // "sv": "num:card",
    },
    "num:murto": {
        // "en": "num:murto",
        "fi": "numeraali: murtoluku",
        // "sv": "num:murto",
    },
    "num:ord": {
        // "en": "num:ord",
        "fi": "numeraali: järjestysluku",
        // "sv": "num:ord",
    },
    "num:ord_pron": {
        // "en": "num:ord_pron",
        "fi": "pronomini/numeraali ”toinen”",
        // "sv": "num:ord_pron",
    },
    "orig": {
        "en": "part of speech (original)",
        "fi": "sanaluokka (siivoamaton)",
        // "sv": "orig",
    },
    "p:post": {
        // "en": "p:post",
        "fi": "postpositio",
        // "sv": "p:post",
    },
    "p:pre": {
        // "en": "p:pre",
        "fi": "prepositio",
        // "sv": "p:pre",
    },
    "pron": {
        // "en": "pron",
        "fi": "pronomini ”se”, ”ne”",
        // "sv": "pron",
    },
    "pron:any": {
        // "en": "pron:any",
        "fi": "pronomini",
        // "sv": "pron:any",
    },
    "pron:dem": {
        // "en": "pron:dem",
        "fi": "pronomini: demonstratiivi-",
        // "sv": "pron:dem",
    },
    "pron:int": {
        // "en": "pron:int",
        "fi": "pronomini: interrogatiivi-",
        // "sv": "pron:int",
    },
    "pron:pers": {
        // "en": "pron:pers",
        "fi": "pronomini ”hän”, ”he”",
        // "sv": "pron:pers",
    },
    "pron:pers12": {
        // "en": "pron:pers12",
        "fi": "pronomini: 1. tai 2. persoona",
        // "sv": "pron:pers12",
    },
    "pron:ref": {
        // "en": "pron:ref",
        "fi": "pronomini: refleksiivi-",
        // "sv": "pron:ref",
    },
    "pron:rel": {
        // "en": "pron:rel",
        "fi": "pronomini: relatiivi-",
        // "sv": "pron:rel",
    },
    "pun": {
        // "en": "pun",
        "fi": "välimerkki",
        // "sv": "pun",
    },
    "punct": {
        // "en": "punct",
        "fi": "välimerkki",
        // "sv": "punct",
    },
    "q": {
        // "en": "q",
        "fi": "pronomini: kvanttori-",
        // "sv": "q",
    },
    "v": {
        // "en": "v",
        "fi": "verbi",
        // "sv": "v",
    },
};

transl.deprel = {
    "++": {
        "en": "Coordinating conjunction",
        "fi": "Rinnastuskonjunktio",
        "sv": "Samordnande konjunktion",
    },
    "+A": {
        "en": "Conjunctional adverbial",
        "fi": "Konjunktiivinen adverbi",
        "sv": "Konjuktionellt adverb",
    },
    "+F": {
        "en": "Coordination at main clause level",
        "fi": "Rinnastus päälauseen tasolla",
        "sv": "Koordination på huvudsatsnivå",
    },
    "AA": {
        "en": "Other adverbial",
        "fi": "Muu adverbiaali",
        "sv": "Annat adverbial",
    },
    "AG": {
        "en": "Agent",
        "fi": "Agentti",
        "sv": "Agent",
    },
    "AN": {
        "en": "Apposition",
        "fi": "Appositio",
        "sv": "Apposition",
    },
    "AT": {
        "en": "Nominal (adjectival) pre-modifier",
        "fi": "Nominietumäärite (adjektiivi)",
        "sv": "Framförställt attribut",
    },
    "CA": {
        "en": "Contrastive adverbial",
        "fi": "Kontrastiivinen adverbiaali",
        "sv": "Kontrastivt adverbial",
    },
    "CJ": {
        "en": "Conjunct (in coordinate structure)",
        "fi": "Konjunkti rinnastusrakenteessa",
        "sv": "Samordnat led",
    },
    "DB": {
        "en": "Doubled function",
        "fi": "Kaksoisfunktio",
        "sv": "Dubbel funktion",
    },
    "DT": {
        "en": "Determiner",
        "fi": "Determineri",
        "sv": "Determinerare, bestämningsord",
    },
    "EF": {
        "en": "Relative clause in cleft",
        "fi": "Relatiivisivulause",
        "sv": "Relativ bisats",
    },
    "EO": {
        "en": "Logical object",
        "fi": "Looginen objekti",
        "sv": "Egentligt objekt",
    },
    "ES": {
        "en": "Logical subject",
        "fi": "Looginen subjekti",
        "sv": "Egentligt subjekt",
    },
    "ET": {
        "en": "Other nominal post-modifier",
        "fi": "Muu nominaalijälkimäärite",
        "sv": "Efterställd bestämning",
    },
    "FO": {
        "en": "Dummy object",
        "fi": "Muodollinen objekti",
        "sv": "Formellt objekt",
    },
    "FP": {
        "en": "Free subjective predicative complement",
        "fi": "Vapaa subjektiivinen predikatiivi",
        "sv": "Fritt subjektivt predikativ (predikatsfyllnad)",
    },
    "FS": {
        "en": "Dummy subject",
        "fi": "Muodollinen subjekti",
        "sv": "Formellt subjekt",
    },
    "FV": {
        "en": "Finite predicate verb",
        "fi": "Finiittinen predikaattiverbi",
        "sv": "Finit verb, predikatsverb",
    },
    "HD": {
        "en": "Head",
        "fi": "Pää",
        "sv": "Huvud",
    },
    "I?": {
        "en": "Question mark",
        "fi": "Kysymysmerkki",
        "sv": "Frågetecken",
    },
    "IC": {
        "en": "Quotation mark",
        "fi": "Lainausmerkki",
        "sv": "Citattecken",
    },
    "IF": {
        "en": "Infinitive verb phrase minus infinitive marker",
        "fi": "Infinitiivilauseke, ilman infinitiivin merkitsintä",
        "sv": "Infinitivfras, utom infinitivmärke",
    },
    "IG": {
        "en": "Other punctuation mark",
        "fi": "Muu välimerkki",
        "sv": "Övrig interpunktion",
    },
    "IK": {
        "en": "Comma",
        "fi": "Pilkku",
        "sv": "Kommatecken",
    },
    "IM": {
        "en": "Infinitive marker",
        "fi": "Infinitiivin merkitsin",
        "sv": "Infinitivmärke",
    },
    "IO": {
        "en": "Indirect object",
        "fi": "Epäsuora objekti",
        "sv": "Indirekt objekt (dativobjekt)",
    },
    "IP": {
        "en": "Period",
        "fi": "Piste",
        "sv": "Punkt",
    },
    "IQ": {
        "en": "Colon",
        "fi": "Kaksoispiste",
        "sv": "Kolon",
    },
    "IR": {
        "en": "Parenthesis",
        "fi": "Sulje",
        "sv": "Parentes",
    },
    "IS": {
        "en": "Semicolon",
        "fi": "Puolipiste",
        "sv": "Semikolon",
    },
    "IT": {
        "en": "Dash",
        "fi": "Ajatusviiva tai yhdysmerkki",
        "sv": "Divis, bindestreck",
    },
    "IU": {
        "en": "Exclamation mark",
        "fi": "Huutomerkki",
        "sv": "Utropstecken",
    },
    "IV": {
        "en": "Nonfinite verb",
        "fi": "Ei-finiittinen verbi",
        "sv": "Infinit verb",
    },
    "JC": {
        "en": "Second quotation mark",
        "fi": "Toinen lainausmerkki",
        "sv": "Citattecken 2",
    },
    "JG": {
        "en": "Second (other) punctuation mark",
        "fi": "Toinen (muu) välimerkki",
        "sv": "Övrig interpunktion 2",
    },
    "JR": {
        "en": "Second parenthesis",
        "fi": "Toinen sulje",
        "sv": "Parentes 2",
    },
    "JT": {
        "en": "Second dash",
        "fi": "Toinen ajatusviiva tai yhdysmerkki",
        "sv": "Divis 2, bindestreck 2",
    },
    "KA": {
        "en": "Comparative adverbial",
        "fi": "Vertailuadverbiaali",
        "sv": "Komparativt adverbial",
    },
    "MA": {
        "en": "Attitude adverbial",
        "fi": "Lauseadverbiaali",
        "sv": "Satsadverbial",
    },
    "MS": {
        "en": "Macrosyntagm",
        "fi": "Makrosyntagma",
        "sv": "Makrosyntagm",
    },
    "NA": {
        "en": "Negation adverbial",
        "fi": "Kieltoadverbiaali",
        "sv": "Negerande adverbial",
    },
    "OA": {
        "en": "Object adverbial",
        "fi": "Objektiadverbiaali (prepositio-objekti)",
        "sv": "Objektsadverbial (prepositionsobjekt)",
    },
    "OO": {
        "en": "Direct object",
        "fi": "Suora objekti (akkusatiiviobjekti)",
        "sv": "Direkt objekt (ackusativobjekt)",
    },
    "OP": {
        "en": "Object predicative",
        "fi": "Objektipredikatiivi",
        "sv": "Objektspredikativ (objektiv predikatsfyllnad)",
    },
    "PA": {
        "en": "Complement of preposition",
        "fi": "Preposition komplementti",
        "sv": "Prepositions komplement",
    },
    "PL": {
        "en": "Verb particle",
        "fi": "Verbin partikkeli",
        "sv": "Verbpartikel",
    },
    "PR": {
        "en": "Preposition",
        "fi": "Prepositio",
        "sv": "Preposition",
    },
    "PT": {
        "en": "Predicative attribute",
        "fi": "Predikatiiviattribuutti",
        "sv": "Predikativt attribut",
    },
    "RA": {
        "en": "Place adverbial",
        "fi": "Paikan adverbiaali",
        "sv": "Platsadverbial",
    },
    "ROOT": {
        "en": "Root",
        "fi": "pää",
        "sv": "Rot",
    },
    "SP": {
        "en": "Subjective predicative complement",
        "fi": "Subjektiivipredikatiivi",
        "sv": "Subjektspredikativ (subjektiv predikatsfyllnad)",
    },
    "SS": {
        "en": "Other subject",
        "fi": "Muu subjekti",
        "sv": "Subjekt (övrigt subjekt)",
    },
    "TA": {
        "en": "Time adverbial",
        "fi": "Ajan adverbiaali",
        "sv": "Tidsadverbial",
    },
    "TT": {
        "en": "Address phrase",
        "fi": "Puhuttelufraasi",
        "sv": "Tilltalsfras",
    },
    "UA": {
        "en": "Subordinate clause minus subordinating conjunction",
        "fi": "Sivulause, ilman alistuskonjunktiota",
        "sv": "Underordnad sats (bisats), utom subjunktion",
    },
    "UK": {
        "en": "Subordinating conjunction",
        "fi": "Alistuskonjunktio",
        "sv": "Subjunktion",
    },
    "VA": {
        "en": "Notifying adverbial",
        "fi": "Korrelatiiviadverbiaali",
        "sv": "Korrelativt adverbial",
    },
    "VG": {
        "en": "Verb group",
        "fi": "Verbiryhmä",
        "sv": "Verbgrupp",
    },
    "VO": {
        "en": "Infinitive object complement",
        "fi": "Infinitiiviobjekti",
        "sv": "Objekt med infinitiv",
    },
    "VS": {
        "en": "Infinitive subject complement",
        "fi": "Infinitiivisubjekti",
        "sv": "Subjekt med infinitiv",
    },
    "XA": {
        "en": "Expressions like 'så att säga' (so to speak)",
        "fi": "Ilmaukset kuten ”så att säga” (niin sanotusti)",
        "sv": "Uttryck som ”så att säga”",
    },
    "XF": {
        "en": "Fundament phrase",
        "fi": "Fundamenttilauseke",
        "sv": "Fundamentsfras",
    },
    "XT": {
        "en": "Expressions like 'så kallad' (so called)",
        "fi": "Ilmaukset kuten ”så kallad” (niin sanottu)",
        "sv": "Uttryck som ”så kallad”",
    },
    "XX": {
        "en": "Unclassifiable grammatical function",
        "fi": "Luokittelematon kieliopillinen funktio",
        "sv": "Oklassificerbar satsfunktion",
    },
    "YY": {
        "en": "Interjection phrase",
        "fi": "Huudahdus",
        "sv": "Interjektionsfras",
    },
    "_": {
        "en": "unspecified",
        "fi": "muu",
        // "sv": "_",
    },
    "acl": {
        // "en": "acl",
        "fi": "clausal modifier of noun (adjectival clause)",
        // "sv": "acl",
    },
    "acl:relcl": {
        "en": "clausal modifier of noun (adjectival clause): relative clause modifier",
        "fi": "clausal modifier of noun (adjectival clause): relative clause modifier",
        "sv": "clausal modifier of noun (adjectival clause): relative clause modifier",
    },
    "acomp": {
        "en": "adjectival complement",
        "fi": "adjektiivikomplementti",
        // "sv": "acomp",
    },
    "adpos": {
        "en": "adposition",
        "fi": "adpositio",
        // "sv": "adpos",
    },
    "advcl": {
        "en": "adverbial clause modifier",
        "fi": "adverbiaalinen lauseenmääre",
        // "sv": "advcl",
    },
    "advl": {
        "en": "adverbial",
        "fi": "adverbiaali",
        // "sv": "advl",
    },
    "advmod": {
        "en": "adverb modifier",
        "fi": "adverbimääre",
        // "sv": "advmod",
    },
    "amod": {
        "en": "adjectival modifier",
        "fi": "adjektiivimääre",
        // "sv": "amod",
    },
    "appos": {
        "en": "apposition",
        "fi": "appositio",
        // "sv": "appos",
    },
    "arg": {
        "en": "argument",
        "fi": "argumentti",
        // "sv": "arg",
    },
    "attr": {
        "en": "attribute",
        "fi": "attribuutti",
        // "sv": "attr",
    },
    "aux": {
        "en": "auxiliary verb",
        "fi": "apuverbi",
        // "sv": "aux",
    },
    "aux:pass": {
        "en": "auxiliary: passive",
        "fi": "auxiliary: passive",
        "sv": "auxiliary: passive",
    },
    "auxpass": {
        "en": "passive auxiliary",
        "fi": "passiivin apuverbi",
        // "sv": "auxpass",
    },
    "case": {
        "en": "case marking",
        "fi": "case marking",
        "sv": "case marking",
    },
    "cc": {
        "en": "coordinating conjunction",
        "fi": "rinnastuskonjunktio",
        // "sv": "cc",
    },
    "cc:preconj": {
        "en": "coordinating conjunction: preconjuction",
        "fi": "coordinating conjunction: preconjuction",
        "sv": "coordinating conjunction: preconjuction",
    },
    "ccomp": {
        "en": "clausal complement",
        "fi": "lausekomplementti",
        // "sv": "ccomp",
    },
    "clf": {
        "en": "classifier",
        "fi": "classifier",
        "sv": "classifier",
    },
    "comp": {
        "en": "complement",
        "fi": "komplementti",
        // "sv": "comp",
    },
    "compar": {
        "en": "comparative",
        "fi": "komparatiivi",
        // "sv": "compar",
    },
    "comparator": {
        "en": "comparative conjunction",
        "fi": "vertailukonjunktio",
        // "sv": "comparator",
    },
    "complm": {
        "en": "complementizer",
        "fi": "komplementoija",
        // "sv": "complm",
    },
    "compound": {
        "en": "compound",
        "fi": "sanaliitto",
        // "sv": "compound",
    },
    "compound:nn": {
        "en": "compound: noun",
        "fi": "compound: noun",
        "sv": "compound: noun",
    },
    "compound:prt": {
        "en": "compound: phrasal verb particle",
        "fi": "compound: phrasal verb particle",
        "sv": "compound: phrasal verb particle",
    },
    "conj": {
        "en": "coordination",
        "fi": "rinnastus",
        // "sv": "conj",
    },
    "conjunct": {
        "en": "conjunct",
        "fi": "konjunkti",
        // "sv": "conjunct",
    },
    "cop": {
        "en": "copula",
        "fi": "kopula",
        // "sv": "cop",
    },
    "cop:own": {
        // "en": "cop:own",
        "fi": "kopula (omistus)",
        // "sv": "cop:own",
    },
    "cop_own": {
        "en": "copula (own)",
        // "fi": "cop_own",
        // "sv": "cop_own",
    },
    "csubj": {
        "en": "clausal subject",
        "fi": "lausesubjekti",
        // "sv": "csubj",
    },
    "csubj-cop": {
        "en": "clausal copular subject",
        "fi": "kopulan lausesubjekti",
        // "sv": "csubj-cop",
    },
    "csubj:cop": {
        "en": "clausal subject: copular",
        "fi": "clausal subject: copular",
        "sv": "clausal subject: copular",
    },
    "dep": {
        "en": "dependent",
        "fi": "dependentti",
        // "sv": "dep",
    },
    "det": {
        "en": "determiner",
        "fi": "determineri",
        // "sv": "det",
    },
    "discourse": {
        "en": "discourse element",
        "fi": "diskurssielementti",
        // "sv": "discourse",
    },
    "dislocated": {
        "en": "dislocated elements",
        "fi": "dislocated elements",
        "sv": "dislocated elements",
    },
    "dobj": {
        "en": "direct object",
        "fi": "suora objekti",
        // "sv": "dobj",
    },
    "ellipsis": {
        "en": "ellipsis of a head word",
        "fi": "pääsanan ellipsi",
        // "sv": "ellipsis",
    },
    "expl": {
        "en": "expletive",
        "fi": "expletive",
        "sv": "expletive",
    },
    "fixed": {
        // "en": "fixed",
        "fi": "kiinteä monisanainen ilmaus",
        // "sv": "fixed",
    },
    "fixed_mwe": {
        "en": "fixed multiword expression",
        // "fi": "fixed_mwe",
        // "sv": "fixed_mwe",
    },
    "flat": {
        // "en": "flat",
        "fi": "puolikiinteä monisanainen ilmaus",
        // "sv": "flat",
    },
    "flat:foreign": {
        // "en": "flat:foreign",
        "fi": "puolikiinteä monisanainen ilmaus (vierasperäinen)",
        // "sv": "flat:foreign",
    },
    "flat:name": {
        // "en": "flat:name",
        "fi": "puolikiinteä monisanainen ilmaus (nimi)",
        // "sv": "flat:name",
    },
    "flat_mwe": {
        "en": "flat multiword expression",
        // "fi": "flat_mwe",
        // "sv": "flat_mwe",
    },
    "flat_mwe_foreign": {
        "en": "flat multiword expression (foreign)",
        // "fi": "flat_mwe_foreign",
        // "sv": "flat_mwe_foreign",
    },
    "flat_mwe_name": {
        "en": "flat multiword expression (name)",
        // "fi": "flat_mwe_name",
        // "sv": "flat_mwe_name",
    },
    "gobj": {
        "en": "genitive object (of a noun)",
        "fi": "genetiiviobjekti (substantiivin)",
        // "sv": "gobj",
    },
    "goeswith": {
        "en": "goes with",
        "fi": "irrallinen yhdysosa",
        // "sv": "goeswith",
    },
    "gsubj": {
        "en": "genitive subject (of a noun)",
        "fi": "genetiivisubjekti (substantiivin)",
        // "sv": "gsubj",
    },
    "iccomp": {
        "en": "infinite clausal complement",
        "fi": "infiniittinen lausekomplementti",
        // "sv": "iccomp",
    },
    "idiom": {
        "en": "idiom",
        "fi": "idiomi",
        // "sv": "idiom",
    },
    "infmod": {
        "en": "infinitive modifier",
        "fi": "infinitiivimääre",
        // "sv": "infmod",
    },
    "intj": {
        "en": "interjection",
        "fi": "interjektio",
        // "sv": "intj",
    },
    "iobj": {
        "en": "indirect object",
        "fi": "indirect object",
        "sv": "indirect object",
    },
    "list": {
        "en": "list",
        "fi": "list",
        "sv": "list",
    },
    "main": {
        "en": "main verb",
        "fi": "pääverbi",
        // "sv": "main",
    },
    "mark": {
        "en": "marker",
        "fi": "merkitsin",
        // "sv": "mark",
    },
    "mod": {
        "en": "modifier",
        "fi": "määre",
        // "sv": "mod",
    },
    "modal": {
        "en": "modal verb",
        "fi": "modaaliverbi",
        // "sv": "modal",
    },
    "mwe": {
        "en": "multi-word expression",
        "fi": "monisanainen ilmaus",
        // "sv": "mwe",
    },
    "name": {
        "en": "multi-word named entity",
        "fi": "monisanainen nimi",
        // "sv": "name",
    },
    "neg": {
        "en": "negation marker",
        "fi": "kieltosana",
        // "sv": "neg",
    },
    "nmod": {
        "en": "nominal modifier",
        "fi": "nominal modifier",
        "sv": "nominal modifier",
    },
    "nmod:gobj": {
        "en": "nominal modifier: genitive object",
        "fi": "nominal modifier: genitive object",
        "sv": "nominal modifier: genitive object",
    },
    "nmod:gsubj": {
        "en": "nominal modifier: genitive subject",
        "fi": "nominal modifier: genitive subject",
        "sv": "nominal modifier: genitive subject",
    },
    "nmod:poss": {
        "en": "nominal modifier: possessive",
        "fi": "nominal modifier: possessive",
        "sv": "nominal modifier: possessive",
    },
    "nn": {
        "en": "noun compound modifier",
        "fi": "yhdyssubstantiivimääre",
        // "sv": "nn",
    },
    "nommod": {
        "en": "nominal modifier",
        "fi": "nominaalimääre",
        // "sv": "nommod",
    },
    "nommod-own": {
        "en": "nominal modifier (owner in a possessive clause)",
        "fi": "nominaalimääre: omistaja",
        // "sv": "nommod-own",
    },
    "nsubj": {
        "en": "nominal subject",
        "fi": "nominaalisubjekti",
        // "sv": "nsubj",
    },
    "nsubj-cop": {
        "en": "nominal copular subject",
        "fi": "kopulan nominaalisubjekti",
        // "sv": "nsubj-cop",
    },
    "nsubj:cop": {
        "en": "nominal subject: copular",
        "fi": "nominal subject: copular",
        "sv": "nominal subject: copular",
    },
    "num": {
        "en": "numeral modifier",
        "fi": "numeraalimääre",
        // "sv": "num",
    },
    "number": {
        "en": "numerical expression",
        "fi": "numeroilmaus",
        // "sv": "number",
    },
    "nummod": {
        "en": "numeric modifier",
        "fi": "numeric modifier",
        "sv": "numeric modifier",
    },
    "obj": {
        "en": "object",
        "fi": "objekti",
        // "sv": "obj",
    },
    "obl": {
        "en": "oblique nominal",
        "fi": "oblique nominal",
        // "sv": "obl",
    },
    "orphan": {
        "en": "orphan",
        "fi": "orphan",
        // "sv": "orphan",
    },
    "parataxis": {
        "en": "parataxis",
        "fi": "parataksi",
        // "sv": "parataxis",
    },
    "partmod": {
        "en": "participal modifier",
        "fi": "partisiippimääre",
        // "sv": "partmod",
    },
    "phrm": {
        "en": "phrase marker",
        "fi": "lausekemerkitsin",
        // "sv": "phrm",
    },
    "phrv": {
        "en": "phrasal verb",
        "fi": "fraasiverbi",
        // "sv": "phrv",
    },
    "poss": {
        "en": "genitive modifier",
        "fi": "genetiivimääre",
        // "sv": "poss",
    },
    "preconj": {
        "en": "preconjunction",
        "fi": "prekonjunktio",
        // "sv": "preconj",
    },
    "prt": {
        "en": "phrasal particle",
        "fi": "fraasipartikkeli",
        // "sv": "prt",
    },
    "punct": {
        "en": "punctuation",
        "fi": "välimerkki",
        // "sv": "punct",
    },
    "quantmod": {
        "en": "quantification modifier",
        "fi": "kvanttorimääre",
        // "sv": "quantmod",
    },
    "rcmod": {
        "en": "relative clause modifier",
        "fi": "relatiivilausemääre",
        // "sv": "rcmod",
    },
    "rel": {
        "en": "relativizer, relative word",
        "fi": "relatiivisana",
        // "sv": "rel",
    },
    "remnant": {
        "en": "ellipsis remnant",
        "fi": "ellipsin jäännös",
        // "sv": "remnant",
    },
    "reparandum": {
        "en": "overriden disfluency",
        "fi": "overriden disfluency",
        "sv": "overriden disfluency",
    },
    "root": {
        "en": "root",
        "fi": "root",
        "sv": "root",
    },
    "scomp": {
        "en": "subject complement",
        "fi": "subjektin komplementti",
        // "sv": "scomp",
    },
    "subj": {
        "en": "subject",
        "fi": "subjekti",
        // "sv": "subj",
    },
    "voc": {
        "en": "vocative",
        "fi": "vokatiivi",
        // "sv": "voc",
    },
    "vocative": {
        "en": "vocative",
        "fi": "vocative",
        "sv": "vocative",
    },
    "xcomp": {
        "en": "open clausal complement",
        "fi": "avoin lausekomplementti",
        // "sv": "xcomp",
    },
    "xcomp:ds": {
        "en": "clausal complement (different subject)",
        "fi": "lausekomplementti (eri subjekti)",
        // "sv": "xcomp:ds",
    },
    "xsubj": {
        "en": "external subject",
        "fi": "ulkoinen subjekti",
        // "sv": "xsubj",
    },
    "xsubj-cop": {
        "en": "external copular subject",
        "fi": "kopulan ulkoinen subjekti",
        // "sv": "xsubj-cop",
    },
};

neTypeTranslation = {
    "EVN": {
        "en": "event name",
        "fi": "tapahtuman nimi",
        "sv": "händelsenamn",
    },
    "EVT": {
        "en": "event name",
        "fi": "tapahtuman nimi",
        "sv": "händelsenamn",
    },
    "LOC": {
        "en": "location name",
        "fi": "paikannimi",
        "sv": "platsnamn",
    },
    "MSR": {
        "en": "measure name",
        "fi": "mitta",
        "sv": "måttnamn",
    },
    "OBJ": {
        "en": "product name",
        "fi": "tavaran nimi",
        "sv": "objektnamn",
    },
    "ORG": {
        "en": "organization name",
        "fi": "organisaation nimi",
        "sv": "organisationsnamn",
    },
    "PRO": {
        // "en": "PRO",
        "fi": "tuotteen nimi",
        "sv": "produktnamn",
    },
    "PRS": {
        "en": "person name",
        "fi": "henkilönnimi",
        "sv": "personnamm",
    },
    "TME": {
        "en": "time",
        "fi": "aika",
        "sv": "tid",
    },
    "WRK": {
        "en": "work or art name",
        "fi": "teoksen nimi",
        "sv": "verks- eller konstnamn",
    },
};

neSubtypeTranslation = {
    "AGE": {
        "en": "age",
        "fi": "ikä",
        "sv": "ålder",
    },
    "ANM": {
        "en": "animal/pet/mythical beasts",
        "fi": "eläin",
        "sv": "djur/husdjur/mytiskt odjur",
    },
    "AST": {
        "en": "astronomical",
        "fi": "tähtitieteellinen",
        "sv": "astronomisk",
    },
    "ATH": {
        "en": "athletic",
        "fi": "urheiluseura tai joukkue",
        "sv": "atletisk",
    },
    "ATL": {
        "en": "athletic",
        "fi": "urheilu-",
        "sv": "atletisk",
    },
    "CLC": {
        "en": "tribe/dynasty/ethnical or race name",
        "fi": "heimo, dynastia tai etnisyys",
        "sv": "stam/dynasti/etniskt namn",
    },
    "CLT": {
        "en": "cultural",
        "fi": "kulttuuri-",
        "sv": "kulturell",
    },
    "CLU": {
        "en": "cultural",
        "fi": "kulttuuri-",
        "sv": "kulturell",
    },
    "CMP": {
        "en": "computer product/telephony",
        "fi": "tietokone- tai puhelintuote",
        "sv": "datorprodukt/telefoni",
    },
    "CMU": {
        "en": "computer unit",
        "fi": "tietotekniikan yksikkö",
        "sv": "datorenhet",
    },
    "CRP": {
        "en": "corporation/organization",
        "fi": "yritys tai yhdistys",
        "sv": "företag/organisation",
    },
    "CUR": {
        "en": "currency",
        "fi": "valuutta",
        "sv": "valuta",
    },
    "CVU": {
        "en": "capacity/volume",
        "fi": "kapasiteetti tai tilavuus",
        "sv": "kapacitet/volym",
    },
    "DAT": {
        "en": "date",
        "fi": "päiväys",
        "sv": "datum",
    },
    "DEN": {
        "en": "density",
        "fi": "tiheys",
        "sv": "densitet",
    },
    "DSG": {
        "en": "dosage",
        "fi": "annos",
        "sv": "dosering",
    },
    "DST": {
        "en": "distance",
        "fi": "matka",
        "sv": "avstånd",
    },
    "EDU": {
        "en": "educational",
        "fi": "oppilaitos",
        "sv": "utbildning",
    },
    "FIN": {
        "en": "financial",
        "fi": "finanssi-",
        "sv": "finansiell",
    },
    "FNC": {
        "en": "facility entity",
        "fi": "fasiliteetti",
        "sv": "facilitetsentitet",
    },
    "FRQ": {
        "en": "frequency",
        "fi": "taajuus",
        "sv": "frekvens",
    },
    "FWP": {
        "en": "food/beverage",
        "fi": "ruoka tai juoma",
        "sv": "mat/dryck",
    },
    "GPL": {
        "en": "geographical/geological",
        "fi": "maantieteellinen",
        "sv": "geografisk/geologisk",
    },
    "HPL": {
        "en": "historical/political",
        "fi": "historiallinen tai poliittinen",
        "sv": "historisk/politisk",
    },
    "HRM": {
        "en": "time",
        "fi": "kellonaika",
        "sv": "klockslag",
    },
    "HUM": {
        "en": "human being/fictional human character",
        "fi": "ihminen",
        "sv": "människa/fiktiv mänsklig karaktär",
    },
    "IDX": {
        "en": "index",
        "fi": "indeksi",
        "sv": "index",
    },
    "INX": {
        "en": "index",
        "fi": "indeksi",
        "sv": "index",
    },
    "LST": {
        "en": "list",
        "fi": "luettelo",
        "sv": "lista",
    },
    "MDC": {
        "en": "medical",
        "fi": "lääketieteellinen",
        "sv": "medicinsk",
    },
    "MSU": {
        "en": "metric surface unit",
        "fi": "pinta-ala",
        "sv": "ytmått",
    },
    "MTH": {
        "en": "saint/apostle/god/mythical name/humanoid",
        "fi": "myyttinen",
        "sv": "helgon/apostel/gud/mytiskt namm/humanoid",
    },
    "MYT": {
        "en": "saint/apostle/god/mythical name/humanoid",
        "fi": "myyttinen",
        "sv": "helgon/apostel/gud/mytiskt namm/humanoid",
    },
    "PER": {
        "en": "period",
        "fi": "ajanjakso",
        "sv": "period",
    },
    "PLT": {
        "en": "political",
        "fi": "poliittinen",
        "sv": "politisk",
    },
    "PPL": {
        "en": "geo-social-political entity",
        "fi": "geopoliittinen",
        "sv": "geo-social-politisk entitet",
    },
    "PRC": {
        "en": "percent",
        "fi": "prosentti",
        "sv": "procent",
    },
    "PRD": {
        "en": "product/artefact/flower/plant",
        "fi": "tuote, artefakti tai kasvi",
        "sv": "produkt/artefakt/växt",
    },
    "PRJ": {
        "en": "project/agreement/initiative",
        "fi": "hanke, sopimus tai aloite",
        "sv": "projekt/överenskommelse/initiativ",
    },
    "PRZ": {
        "en": "prize/scholarship/honour",
        "fi": "palkinto tai apuraha",
        "sv": "pris/stipendium/utmärkelse",
    },
    "PSS": {
        "en": "pressure",
        "fi": "paine",
        "sv": "tryck",
    },
    "RLG": {
        "en": "religious",
        "fi": "uskonnollinen",
        "sv": "religiös",
    },
    "RTV": {
        "en": "radio/tv-programs",
        "fi": "radio- tai tv-ohjelma",
        "sv": "radio/tv-program",
    },
    "SPD": {
        "en": "speed",
        "fi": "nopeus",
        "sv": "hastighet",
    },
    "STR": {
        "en": "street/road/postal address",
        "fi": "katu, tie tai postiosoite",
        "sv": "gata/väg/postadress",
    },
    "TIT": {
        "en": "title",
        "fi": "titteli",
        "sv": "titel",
    },
    "TMP": {
        "en": "temperature",
        "fi": "lämpötila",
        "sv": "temperatur",
    },
    "TRN": {
        "en": "transportation",
        "fi": "liikenne",
        "sv": "transport",
    },
    "TVR": {
        "en": "media",
        "fi": "media",
        "sv": "media",
    },
    "VHA": {
        "en": "air/space vehicle",
        "fi": "ilma- tai avaruusalus",
        "sv": "luft-/rymdfarkost",
    },
    "VHG": {
        "en": "land vehicle",
        "fi": "maa-alus",
        "sv": "fordon",
    },
    "VHW": {
        "en": "water vehicle",
        "fi": "vesialus",
        "sv": "fartyg",
    },
    "VLM": {
        "en": "volume",
        "fi": "tilavuus",
        "sv": "volym",
    },
    "WAE": {
        "en": "opera/theater play/symphony",
        "fi": "näytelmä tai musiikkiteos",
        "sv": "opera/teaterpjäs/symfoni",
    },
    "WAO": {
        "en": "physical work or art",
        "fi": "taideteos",
        "sv": "fysiskt verk eller konst",
    },
    "WEB": {
        "en": "web",
        "fi": "WWW",
        "sv": "webb",
    },
    "WMD": {
        "en": "written media",
        "fi": "kirjoitettu",
        "sv": "skriven media",
    },
    "WMU": {
        "en": "weight or mass unit",
        "fi": "paino",
        "sv": "vikt- eller massaenhet",
    },
    "WRT": {
        "en": "written material",
        "fi": "kirjallinen",
        "sv": "skrivet material",
    },
    "WTH": {
        "en": "natural",
        "fi": "luonnon",
        "sv": "natur",
    },
    "XXX": {
        "en": "other",
        "fi": "muu",
        "sv": "annat",
    },
};

transl.sentenceType = {
    "dateline": {
        // "en": "dateline",
        "fi": "päiväys",
        // "sv": "dateline",
    },
    "head": {
        // "en": "head",
        "fi": "otsikko",
        // "sv": "head",
    },
    "heading": {
        // "en": "heading",
        "fi": "otsikko",
        // "sv": "heading",
    },
    "opening": {
        // "en": "opening",
        "fi": "aloitus",
        // "sv": "opening",
    },
    "p": {
        // "en": "p",
        "fi": "kappale",
        // "sv": "p",
    },
    "sentence": {
        // "en": "sentence",
        "fi": "virke",
        // "sv": "sentence",
    },
    "signed": {
        // "en": "signed",
        "fi": "allekirjoitus",
        // "sv": "signed",
    },
};

transl.paragraphType = {
    "author": {
        // "en": "author",
        "fi": "tekijä",
        // "sv": "author",
    },
    "byline": {
        // "en": "byline",
        "fi": "kirjoittaja (byline)",
        // "sv": "byline",
    },
    "caption": {
        // "en": "caption",
        "fi": "kuvateksti",
        // "sv": "caption",
    },
    "closer": {
        // "en": "closer",
        "fi": "lopetus",
        // "sv": "closer",
    },
    "date": {
        // "en": "date",
        "fi": "päiväys",
        // "sv": "date",
    },
    "empty": {
        "en": "empty",
        "fi": "tyhjä",
        // "sv": "empty",
    },
    "head": {
        // "en": "head",
        "fi": "otsikko",
        // "sv": "head",
    },
    "heading": {
        "en": "heading",
        "fi": "otsikko",
        // "sv": "heading",
    },
    "hi": {
        // "en": "hi",
        "fi": "korostus",
        // "sv": "hi",
    },
    "interviewee": {
        // "en": "interviewee",
        "fi": "haastateltava",
        // "sv": "interviewee",
    },
    "interviewer": {
        // "en": "interviewer",
        "fi": "haastattelija",
        // "sv": "interviewer",
    },
    "name": {
        // "en": "name",
        "fi": "nimi",
        // "sv": "name",
    },
    "noninterviewee": {
        // "en": "noninterviewee",
        "fi": "ei-haastateltava (analysoimaton)",
        // "sv": "noninterviewee",
    },
    "num": {
        // "en": "num",
        "fi": "numero",
        // "sv": "num",
    },
    "opener": {
        // "en": "opener",
        "fi": "aloitus",
        // "sv": "opener",
    },
    "p": {
        // "en": "p",
        "fi": "kappale",
        // "sv": "p",
    },
    "paragraph": {
        "en": "paragraph",
        "fi": "kappale",
        // "sv": "paragraph",
    },
    "paragraph/heading": {
        "en": "paragraph or heading",
        "fi": "kappale tai otsikko",
        // "sv": "paragraph/heading",
    },
    "q": {
        // "en": "q",
        "fi": "teksti lainausmerkeissä",
        // "sv": "q",
    },
    "quote": {
        // "en": "quote",
        "fi": "lainaus",
        // "sv": "quote",
    },
    "rs": {
        // "en": "rs",
        "fi": "nimi tai muu viittaus",
        // "sv": "rs",
    },
    "sentence": {
        "en": "sentence",
        "fi": "virke",
        // "sv": "sentence",
    },
    "signed": {
        // "en": "signed",
        "fi": "allekirjoitus",
        // "sv": "signed",
    },
};

// For Yle news
// TODO: Combine this with paragraph and sentence type translations
transl.textPart = {
    "byline": {
        "en": "byline",
        "fi": "kirjoittaja (byline)",
        "sv": "byline",
    },
    "caption": {
        "en": "caption",
        "fi": "kuvateksti",
        "sv": "bildtext",
    },
    "heading": {
        "en": "heading",
        "fi": "otsikko",
        "sv": "rubrik",
    },
    "heading_alt": {
        "en": "alternative text for heading image",
        "fi": "otsikkokuvan seliteteksti",
        "sv": "alternativ text för rubrikbild",
    },
    "heading_caption": {
        "en": "caption for heading image",
        "fi": "otsikkokuvan kuvateksti",
        "sv": "bildtext för rubrikbild",
    },
    "headline": {
        "en": "headline",
        "fi": "pääotsikko",
        "sv": "huvudrubrik",
    },
    "image": {
        "en": "image",
        "fi": "kuva",
        "sv": "bild",
    },
    "image_alt": {
        "en": "alternative text for image",
        "fi": "kuvan seliteteksti",
        "sv": "alternativ bildtext",
    },
    "lead": {
        "en": "lead paragraph",
        "fi": "ingressi",
        "sv": "ingress",
    },
    "quote": {
        "en": "quotation",
        "fi": "lainaus",
        "sv": "citat",
    },
    "short_summary": {
        "en": "short summary",
        "fi": "lyhyt tiivistelmä",
        "sv": "kort sammanfattning",
    },
    "summary": {
        "en": "summary",
        "fi": "tiivistelmä",
        "sv": "sammanfattning",
    },
    "text": {
        "en": "text",
        "fi": "teksti",
        "sv": "text",
    },
};

transl.sex = {
    "female": {
        "en": "female",
        "fi": "nainen",
        "sv": "kvinna",
    },
    "male": {
        "en": "male",
        "fi": "mies",
        "sv": "man",
    },
    "other": {
        "en": "other",
        "fi": "muu",
        "sv": "annat",
    },
    "unknown": {
        "en": "unknown",
        "fi": "tuntematon",
        "sv": "okänd",
    },
};

// TODO: Incorporate translations for other genre attributes
transl.genre = {
    "academic": {
        "en": "academic",
        "fi": "tieteellinen teksti",
        // "sv": "academic",
    },
    "biography": {
        "en": "biography",
        // "fi": "biography",
        // "sv": "biography",
    },
    "blog": {
        "en": "blog",
        "fi": "blogi",
        // "sv": "blog",
    },
    "fiction": {
        "en": "fiction",
        "fi": "kaunokirjallisuus",
        // "sv": "fiction",
    },
    "general": {
        "en": "general",
        "fi": "yleinen",
        // "sv": "general",
    },
    "newspaper": {
        "en": "newspaper",
        "fi": "sanomalehti",
        // "sv": "newspaper",
    },
    "non-fiction_book": {
        "en": "non-fiction book",
        "fi": "tietokirjallisuus",
        // "sv": "non-fiction_book",
    },
    "novel": {
        "en": "novel",
        // "fi": "novel",
        // "sv": "novel",
    },
    "popular_magazine": {
        "en": "popular magazine",
        "fi": "aikakauslehti",
        // "sv": "popular_magazine",
    },
    "spoken": {
        "en": "spoken",
        "fi": "puhe",
        // "sv": "spoken",
    },
    "story": {
        "en": "story",
        // "fi": "story",
        // "sv": "story",
    },
};

// For Semfinlex asd
transl.parlStatuteType = {
    "": {
        // "en": "",
        "fi": "ei tiedossa",
        "sv": "",
    },
    "asetus": {
        // "en": "asetus",
        "fi": "asetus",
        "sv": "förordning",
    },
    "ilmoitus": {
        // "en": "ilmoitus",
        "fi": "ilmoitus",
        "sv": "meddelande",
    },
    "kaari": {
        // "en": "kaari",
        "fi": "kaari",
        "sv": "balk",
    },
    "kirje": {
        // "en": "kirje",
        "fi": "kirje",
        "sv": "brev",
    },
    "kuulutus": {
        // "en": "kuulutus",
        "fi": "kuulutus",
        "sv": "kungörelse",
    },
    "laki": {
        // "en": "laki",
        "fi": "laki",
        "sv": "lag",
    },
    "luettelo": {
        // "en": "luettelo",
        "fi": "luettelo",
        "sv": "förteckning",
    },
    "paatos": {
        // "en": "paatos",
        "fi": "päätös",
        "sv": "beslut",
    },
    "tyojarjestys": {
        // "en": "tyojarjestys",
        "fi": "työjärjestys",
        "sv": "arbetsordning",
    },
};


var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

attrs.pos = {
    label: "pos",
    dataset: {
        "AB": "AB",
        "MID|MAD|PAD": "DL",
        "DT": "DT",
        "HA": "HA",
        "HD": "HD",
        "HP": "HP",
        "HS": "HS",
        "IE": "IE",
        "IN": "IN",
        "JJ": "JJ",
        "KN": "KN",
        "NN": "NN",
        "PC": "PC",
        "PL": "PL",
        "PM": "PM",
        "PN": "PN",
        "PP": "PP",
        "PS": "PS",
        "RG": "RG",
        "RO": "RO",
        "SN": "SN",
        "UO": "UO",
        "VB": "VB"
    },
    translation: transl.pos,
    opts: liteOptions,
    extendedComponent: "datasetSelect",
    escape: false,
    order: 0,
};

attrs.msd_sv = {
    label: "msd",
    opts: settings.defaultOptions,
    extendedTemplate: '<input ng-model="input" class="arg_value" escaper ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    extendedController: function($scope, $uibModal) {
        var modal = null;

        $scope.onIconClick = function() {
            var msdHTML = settings.markup.msd;
            modal = $uibModal.open({
                template: '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="' + msdHTML + '"></div>' +
                            '</div>',
                scope: $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.input = val;
            modal.close();
        }
    }
};
attrs.baseform_sv = {
    label: "baseform",
    type: "set",
    opts: settings.defaultOptions,
    extendedTemplate: "<input ng-model='model' >",
    order: 1
};
attrs.lemgram = {
    label: "lemgram",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' typeahead-close-callback='checkForError(valueSelected)' text-in-field='textInField'/>"
                        + "<span ng-if='valueError' style='color: red; position: relative; top: 3px; margin-left: 6px'>{{'choose_lemgram' | loc:lang}}</span>",
    extendedController: function($scope) {
        $scope.valueError = false;

        $scope.checkForError = function(valueSelected) {
            $scope.valueError = !valueSelected;
        }
    },
    order: 2
};
attrs.saldo = {
    label: "saldo",
    type: "set",
    opts: setOptions,
    stringify: function(saldo) {
        return util.saldoToString(saldo, true);
    },
    externalSearch: "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|sense|equals|<%= val %>",
    internalSearch: true,
    extendedTemplate: settings.senseAutoComplete,
    order: 3
};
attrs.dephead = {
    label: "dephead",
    displayType: "hidden"
};
attrs.dephead_ud1 = {
    label: "dephead_ud1",
    displayType: "hidden"
};
attrs.deprel = {
    label: "deprel",
    extendedComponent: "datasetSelect",
    dataset: {
        "++": "++",
        "+A": "+A",
        "+F": "+F",
        "AA": "AA",
        "AG": "AG",
        "AN": "AN",
        "AT": "AT",
        "CA": "CA",
        "DB": "DB",
        "DT": "DT",
        "EF": "EF",
        "EO": "EO",
        "ES": "ES",
        "ET": "ET",
        "FO": "FO",
        "FP": "FP",
        "FS": "FS",
        "FV": "FV",
        "I?": "I?",
        "IC": "IC",
        "IG": "IG",
        "IK": "IK",
        "IM": "IM",
        "IO": "IO",
        "IP": "IP",
        "IQ": "IQ",
        "IR": "IR",
        "IS": "IS",
        "IT": "IT",
        "IU": "IU",
        "IV": "IV",
        "JC": "JC",
        "JG": "JG",
        "JR": "JR",
        "JT": "JT",
        "KA": "KA",
        "MA": "MA",
        "MS": "MS",
        "NA": "NA",
        "OA": "OA",
        "OO": "OO",
        "OP": "OP",
        "PL": "PL",
        "PR": "PR",
        "PT": "PT",
        "RA": "RA",
        "SP": "SP",
        "SS": "SS",
        "TA": "TA",
        "TT": "TT",
        "UK": "UK",
        "VA": "VA",
        "VO": "VO",
        "VS": "VS",
        "XA": "XA",
        "XF": "XF",
        "XT": "XT",
        "XX": "XX",
        "YY": "YY",
        "CJ": "CJ",
        "HD": "HD",
        "IF": "IF",
        "PA": "PA",
        "UA": "UA",
        "VG": "VG",
        "ROOT": "ROOT"
    },
    translation: transl.deprel,
    opts: liteOptions
};
attrs.prefix = {
    label: "prefix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix' text-in-field='textInField'/>"
};
attrs.suffix = {
    label: "suffix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix' text-in-field='textInField'/>"
};
attrs.ref = {
    label: "ref",
    displayType: "hidden"
};
attrs.link = {
    label: "sentence_link"
};
attrs.ne_ex = {
    label: "ne_expr",
    extendedComponent: "datasetSelect",
    isStructAttr: true,
    dataset: [
       "ENAMEX",
       "TIMEX",
       "NUMEX",
    ],
    translation: {
        "ENAMEX": {
            "en": "name expression",
            "fi": "nimi-ilmaus",
            "sv": "namnuttryck",
        },
        "NUMEX": {
            "en": "numerical expression",
            "fi": "numeroilmaus",
            "sv": "numeriskt uttryck",
        },
        "TIMEX": {
            "en": "time expression",
            "fi": "ajanilmaus",
            "sv": "tidsuttryck",
        },
    },
};
attrs.ne_type = {
    label: "ne_type",
    extendedComponent: "datasetSelect",
    isStructAttr: true,
    dataset: [
       "LOC",
       "PRS",
       "ORG",
       "EVN",
       "WRK",
       "OBJ",
       "MSR",
       "TME"
    ],
    translation: neTypeTranslation,
};
attrs.ne_subtype = {
    label: "ne_subtype",
    extendedComponent: "datasetSelect",
    isStructAttr: true,
    dataset: [
        "AST",
        "GPL",
        "PPL",
        "FNC",
        "STR",
        "HUM",
        "MTH",
        "ANM",
        "CLC",
        "FIN",
        "ATH",
        "CLT",
        "PLT",
        "TVR",
        "EDU",
        "TRN",
        "CRP",
        "HPL",
        "WTH",
        "CLU",
        "ATL",
        "RLG",
        "WRT",
        "RTV",
        "WAO",
        "PRJ",
        "WMD",
        "WAE",
        "MDC",
        "FWP",
        "CMP",
        "VHA",
        "VHG",
        "VHW",
        "PRZ",
        "PRD",
        "VLM",
        "TMP",
        "INX",
        "DST",
        "PRC",
        "CUR",
        "DEN",
        "DSG",
        "SPD",
        "FRQ",
        "AGE",
        "MSU",
        "WMU",
        "CMU",
        "WEB",
        "PSS",
        "CVU",
        "IDX",
        "LST",
        "DAT",
        "PER"
    ],
    translation: neSubtypeTranslation,
    stringify: function(val) {
        lString = util.getLocaleStringUndefined("ne_subtype_" + val)
        return lString || val;
    }
};
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true
};
sattrs.date = {
    label: "date"
};
sattrs.date_iso = {
    label: "date_iso"
};
sattrs.time = {
    label: "time"
};
sattrs.datetime = {
    label: "timestamp",
};

settings.commonStructTypes = {
    date_interval: {
        label: "date_interval",
        hideSidebar: "true",
        hideCompare: "true",
        hideStatistics: "true",
        opts: false,
        // FIXME: The localized values of "date_from" and "date_to"
        // are not changed immediately when changing the interface
        // language, but only after e.g. switching the search
        // attribute. How could that be made work? But neither are the
        // month and day-of-week names in the date picker itself
        // localized immediately. (Jyrki Niemi 2017-11-02)
        extendedTemplate: '<div class="date_interval_arg_type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> {{"date_from" | loc:lang}} </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> {{"date_to" | loc:lang}} </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
        extendedController: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                var cl, getTime, getYear, ref, ref1, ref2, s, updateIntervals;
                s = $scope;
                cl = settings.corpusListing;

                updateIntervals = function() {
                    var from, moments, ref, ref1, to;
                    moments = cl.getMomentInterval();
                    if (moments.length) {
                        return ref = _.invokeMap(moments, "toDate"), s.minDate = ref[0], s.maxDate = ref[1], ref;
                    } else {
                        ref1 = cl.getTimeInterval(), from = ref1[0], to = ref1[1];
                        s.minDate = moment(from.toString(), "YYYY").toDate();
                        return s.maxDate = moment(to.toString(), "YYYY").toDate();
                    }
                };

                s.$on("corpuschooserchange", function() {
                  return updateIntervals();
                });

                updateIntervals();

                s.from_click = function(event) {
                  event.originalEvent.preventDefault();
                  return event.originalEvent.stopPropagation();
                };

                getYear = function(val) {
                  return moment(val.toString(), "YYYYMMDD").toDate();
                };

                getTime = function(val) {
                  return moment(val.toString(), "HHmmss").toDate();
                };

                if (!s.model) {
                    s.from_date = s.minDate;
                    s.to_date = s.maxDate;
                    ref = _.invokeMap(cl.getMomentInterval(), "toDate"), s.from_time = ref[0], s.to_time = ref[1];
                } else if (s.model.length === 4) {
                    ref1 = _.map(s.model.slice(0, 3), getYear), s.from_date = ref1[0], s.to_date = ref1[1];
                    ref2 = _.map(s.model.slice(2), getTime), s.from_time = ref2[0], s.to_time = ref2[1];
                }
                return s.$watchGroup(["combined", "combined2"], function(arg) {
                    var combined, combined2;
                    combined = arg[0], combined2 = arg[1];
                    return s.model = [moment(s.from_date).format("YYYYMMDD"), moment(s.to_date).format("YYYYMMDD"), moment(s.from_time).format("HHmmss"), moment(s.to_time).format("HHmmss")];
                });
            }
        ]
    }
};


/*
 * Definitions specific to (or modified for) Kielipankki corpora
 */


var attrlist = {};   // List of positional attributes
var sattrlist = {};  // List of structural attributes

// TODO: Replace the corpus- or annotation-specific translationKeys in
// pos and deprel attributes with the generic pos_ and deprel_, so
// that the translations need not be specified twice in the
// translations files.

attrs.pos_ftb2 = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "A": "A",
        "Abbr": "Abbr",
        "Adp": "Adp",
        "Adv": "Adv",
        "CC": "CC",
        "Con": "Con",
        "CS": "CS",
        "Interj": "Interj",
        "N": "N",
        "Num": "Num",
        "POST": "POST",
        "Pron": "Pron",
        "Pun": "Pun",
        "V": "V"
    },
    translation: transl.pos,
};

attrs.ner_tags = {
    label: "ner_tags",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "_": "_",
        // CQP gave an error if the values ended in /? instead of
        // [/]?.
        "/?EnamexLocGpl[/]?": "EnamexLocGpl",
        "/?EnamexLocPpl[/]?": "EnamexLocPpl",
        "/?EnamexLocStr[/]?": "EnamexLocStr",
        "/?EnamexLocXxx[/]?": "EnamexLocXxx",
        "/?EnamexOrgAth[/]?": "EnamexOrgAth",
        "/?EnamexOrgClt[/]?": "EnamexOrgClt",
        "/?EnamexOrgCrp[/]?": "EnamexOrgCrp",
        "/?EnamexOrgEdu[/]?": "EnamexOrgEdu",
        "/?EnamexOrgPlt[/]?": "EnamexOrgPlt",
        "/?EnamexOrgTvr[/]?": "EnamexOrgTvr",
        "/?EnamexPrsHum[/]?": "EnamexPrsHum",
        "/?EnamexPrsTit[/]?": "EnamexPrsTit",
        "/?NumexMsrCur[/]?": "NumexMsrCur",
        "/?NumexMsrXxx[/]?": "NumexMsrXxx",
        "/?TimexTmeDat[/]?": "TimexTmeDat",
    },
    translation: {
        "/EnamexLocGpl": {
            "en": "location: geographical",
            "fi": "paikka: maantieteellinen",
            // "sv": "/EnamexLocGpl",
        },
        "/EnamexLocPpl": {
            "en": "location: geopolitical",
            "fi": "paikka: geopoliittinen",
            // "sv": "/EnamexLocPpl",
        },
        "/EnamexLocStr": {
            "en": "placa: street",
            "fi": "paikka: katu tai tie",
            // "sv": "/EnamexLocStr",
        },
        "/EnamexLocXxx": {
            "en": "location: other",
            "fi": "paikka: muu",
            // "sv": "/EnamexLocXxx",
        },
        "/EnamexOrgAth": {
            "en": "organization: sports",
            "fi": "organisaatio: urheilu",
            // "sv": "/EnamexOrgAth",
        },
        "/EnamexOrgClt": {
            "en": "organization: arts and culture",
            "fi": "organisaatio: taide ja musiikki",
            // "sv": "/EnamexOrgClt",
        },
        "/EnamexOrgCrp": {
            "en": "organization: company or association",
            "fi": "organisaatio: yritys tai yhdistys",
            // "sv": "/EnamexOrgCrp",
        },
        "/EnamexOrgEdu": {
            "en": "organization: education",
            "fi": "organisaatio: koulutus",
            // "sv": "/EnamexOrgEdu",
        },
        "/EnamexOrgPlt": {
            "en": "organization: political",
            "fi": "organisaatio: poliittinen",
            // "sv": "/EnamexOrgPlt",
        },
        "/EnamexOrgTvr": {
            "en": "organization: tv or radio",
            "fi": "organisaatio: tv ja radio",
            // "sv": "/EnamexOrgTvr",
        },
        "/EnamexPrsHum": {
            // "en": "/EnamexPrsHum",
            "fi": "henkilö: henkilönimi",
            // "sv": "/EnamexPrsHum",
        },
        "/EnamexPrsTit": {
            "en": "person: titlt",
            "fi": "henkilö: arvonimi",
            // "sv": "/EnamexPrsTit",
        },
        "/NumexMsrCur": {
            "en": "number: currency",
            "fi": "numero: rahayksikkö",
            // "sv": "/NumexMsrCur",
        },
        "/NumexMsrXxx": {
            "en": "number: unit",
            "fi": "numero: muu yksikkö",
            // "sv": "/NumexMsrXxx",
        },
        "/TimexTmeDat": {
            "en": "time: date or time",
            "fi": "aika: ajanmääre",
            // "sv": "/TimexTmeDat",
        },
        "EnamexLocGpl": {
            "en": "location: geographical",
            "fi": "paikka: maantieteellinen",
            // "sv": "EnamexLocGpl",
        },
        "EnamexLocGpl/": {
            "en": "location: geographical",
            "fi": "paikka: maantieteellinen",
            // "sv": "EnamexLocGpl/",
        },
        "EnamexLocPpl": {
            "en": "location: geopolitical",
            "fi": "paikka: geopoliittinen",
            // "sv": "EnamexLocPpl",
        },
        "EnamexLocPpl/": {
            "en": "location: geopolitical",
            "fi": "paikka: geopoliittinen",
            // "sv": "EnamexLocPpl/",
        },
        "EnamexLocStr": {
            "en": "placa: street",
            "fi": "paikka: katu tai tie",
            // "sv": "EnamexLocStr",
        },
        "EnamexLocStr/": {
            "en": "placa: street",
            "fi": "paikka: katu tai tie",
            // "sv": "EnamexLocStr/",
        },
        "EnamexLocXxx": {
            "en": "location: other",
            "fi": "paikka: muu",
            // "sv": "EnamexLocXxx",
        },
        "EnamexLocXxx/": {
            "en": "location: other",
            "fi": "paikka: muu",
            // "sv": "EnamexLocXxx/",
        },
        "EnamexOrgAth": {
            "en": "organization: sports",
            "fi": "organisaatio: urheilu",
            // "sv": "EnamexOrgAth",
        },
        "EnamexOrgAth/": {
            "en": "organization: sports",
            "fi": "organisaatio: urheilu",
            // "sv": "EnamexOrgAth/",
        },
        "EnamexOrgClt": {
            "en": "organization: arts and culture",
            "fi": "organisaatio: taide ja musiikki",
            // "sv": "EnamexOrgClt",
        },
        "EnamexOrgClt/": {
            "en": "organization: arts and culture",
            "fi": "organisaatio: taide ja musiikki",
            // "sv": "EnamexOrgClt/",
        },
        "EnamexOrgCrp": {
            "en": "organization: company or association",
            "fi": "organisaatio: yritys tai yhdistys",
            // "sv": "EnamexOrgCrp",
        },
        "EnamexOrgCrp/": {
            "en": "organization: company or association",
            "fi": "organisaatio: yritys tai yhdistys",
            // "sv": "EnamexOrgCrp/",
        },
        "EnamexOrgEdu": {
            "en": "organization: education",
            "fi": "organisaatio: koulutus",
            // "sv": "EnamexOrgEdu",
        },
        "EnamexOrgEdu/": {
            "en": "organization: education",
            "fi": "organisaatio: koulutus",
            // "sv": "EnamexOrgEdu/",
        },
        "EnamexOrgPlt": {
            "en": "organization: political",
            "fi": "organisaatio: poliittinen",
            // "sv": "EnamexOrgPlt",
        },
        "EnamexOrgPlt/": {
            "en": "organization: political",
            "fi": "organisaatio: poliittinen",
            // "sv": "EnamexOrgPlt/",
        },
        "EnamexOrgTvr": {
            "en": "organization: tv or radio",
            "fi": "organisaatio: tv ja radio",
            // "sv": "EnamexOrgTvr",
        },
        "EnamexOrgTvr/": {
            "en": "organization: tv or radio",
            "fi": "organisaatio: tv ja radio",
            // "sv": "EnamexOrgTvr/",
        },
        "EnamexPrsHum": {
            "en": "person: person name",
            "fi": "henkilö: henkilönimi",
            // "sv": "EnamexPrsHum",
        },
        "EnamexPrsHum/": {
            // "en": "EnamexPrsHum/",
            "fi": "henkilö: henkilönimi",
            // "sv": "EnamexPrsHum/",
        },
        "EnamexPrsTit": {
            "en": "person: titlt",
            "fi": "henkilö: arvonimi",
            // "sv": "EnamexPrsTit",
        },
        "EnamexPrsTit/": {
            "en": "person: titlt",
            "fi": "henkilö: arvonimi",
            // "sv": "EnamexPrsTit/",
        },
        "NumexMsrCur": {
            "en": "number: currency",
            "fi": "numero: rahayksikkö",
            // "sv": "NumexMsrCur",
        },
        "NumexMsrCur/": {
            "en": "number: currency",
            "fi": "numero: rahayksikkö",
            // "sv": "NumexMsrCur/",
        },
        "NumexMsrXxx": {
            "en": "number: unit",
            "fi": "numero: muu yksikkö",
            // "sv": "NumexMsrXxx",
        },
        "NumexMsrXxx/": {
            "en": "number: unit",
            "fi": "numero: muu yksikkö",
            // "sv": "NumexMsrXxx/",
        },
        "TimexTmeDat": {
            "en": "time: date or time",
            "fi": "aika: ajanmääre",
            // "sv": "TimexTmeDat",
        },
        "TimexTmeDat/": {
            "en": "time: date or time",
            "fi": "aika: ajanmääre",
            // "sv": "TimexTmeDat/",
        },
        "_": {
            "en": "unidentified",
            "fi": "tunnistamaton",
            // "sv": "_",
        },
    },
};

attrs.namecat_omorfi = {
    label: "name_category_omorfi",
    type: "set",
    displayType: "select",
    opts: setOptions,
    dataset: [
        "ARTWORK",
        "CULTGRP",
        "FIRST",
        "GEO",
        "LAST",
        "MISC",
        "ORG",
        "PRODUCT",
        "_",
    ],
    translation: {
        "": {
            "en": "not a name",
            // "fi": "",
            "sv": "inget namn",
        },
        "ARTWORK": {
            "en": "artwork",
            "fi": "taideteos",
            "sv": "konstverk",
        },
        "CULTGRP": {
            "en": "culture group",
            "fi": "kulttuuriryhmä",
            "sv": "kulturgrupp",
        },
        "FIRST": {
            "en": "first name",
            "fi": "etunimi",
            "sv": "förnamn",
        },
        "GEO": {
            "en": "geographical name",
            "fi": "maantieteellinen nimi",
            "sv": "geographical name",
        },
        "LAST": {
            "en": "last name",
            "fi": "sukunimi",
            "sv": "efternamn",
        },
        "MISC": {
            "en": "other name",
            "fi": "muu nimi",
            "sv": "annat namn",
        },
        "ORG": {
            "en": "organization",
            "fi": "organisaatio",
            "sv": "organisation",
        },
        "PRODUCT": {
            "en": "product",
            "fi": "tuote",
            "sv": "produkt",
        },
        "_": {
            // "en": "_",
            "fi": "ei nimi",
            // "sv": "_",
        },
    },
};

attrs.pos_ftb31 = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "A": "A",
        "Abbr": "Abbr",
        "Adp": "Adp",
        "Adv": "Adv",
        "AgPrc": "AgPrc",
        "CC": "CC",
        "CS": "CS",
        "Forgn": "Forgn",
        "Interj": "Interj",
        "N": "N",
        "NegPrc": "NegPrc",
        "Num": "Num",
        "PrfPrc": "PrfPrc",
        "Pron": "Pron",
        "PrsPrc": "PrsPrc",
        "Punct": "Punct",
        "TrunCo": "TrunCo",
        "Unkwn": "Unkwn",
        "V": "V"
    },
    translation: transl.pos,
};

attrs.pos_kotus = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        // Some of the following POS codes might be coding errors in
        // the corpora (usually very few occurrences): CMPR, D, DA-US,
        // DA-UUS, DN-INEN, DN-LLINEN, DN-TON, DV-MA (?), DV-TTA,
        // FORGN, INTJ, P, PROP, REL, null (empty)
        "A": "A",
        "ABBR": "Abbr",
        "AD-A": "AdA",
        "ADV": "Adv",
        "A/N": "AN",
        "C": "Con",
        "CMPR": "Cmpr",
        "D": "D",
        "DA-US": "DaUs",
        "DA-UUS": "DaUus",
        "DN-INEN": "DnInen",
        "DN-LLINEN": "DnLlinen",
        "DN-TON": "DnTon",
        "DV-MA": "DvMa",
        "DV-TTA": "DvTta",
        "FORGN": "Forgn",
        "INTJ": "Interj",
        "N": "N",
        "NUM": "Num",
        "P": "P",
        "PCP1": "Pcp1",
        "PCP2": "Pcp2",
        "PP": "Pp",
        "PRON": "Pron",
        "PROP": "Prop",
        "PSP": "Post",
        "PUNCT": "Punct",
        "REFL/PRON": "ReflPron",
        "REL": "Rel",
        "#UNKNOWN": "Unknown",
        "V": "V",
        // null corresponds to an __UNDEF__ value in CWB, resulting
        // from an empty value in the VRT file.
        "null": "null"
    },
    translation: transl.pos,
};

attrs.pos_mulcold_fi = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "A": "A",
        "Abbr": "Abbr",
        "ADV": "Adv",
        "Aux": "Aux",
        "CC": "CC",
        "CS": "CS",
        "Heur": "Heur",
        "N": "N",
        "NUM": "Num",
        "POST": "Post",
        "PREP": "Prep",
        "PRON": "Pron",
        "pun": "Punct",
        "UNKNOWN": "UNKNOWN",
        "V": "V"
    },
    translation: transl.pos,
};

attrs.pos_mulcold_ru = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "Adj": "Adj",
        "Adv": "Adv",
        "Conj": "Conj",
        "Gerund": "Gerund",
        "Interj": "Interj",
        "Noun": "Noun",
        "Numeral": "Numeral",
        "Part": "Part",
        "Particle": "Particle",
        "Predicative": "Predicative",
        "Preposition": "Preposition",
        "Pron": "Pron",
        "pun": "Punct",
        "UNKNOWN": "UNKNOWN",
        "Verb": "Verb"
    },
    translation: transl.pos,
};

attrs.pos_mulcold_en = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "A": "A",
        "ABBR": "ABBR",
        "ADV": "ADV",
        "CC": "CC",
        "CS": "CS",
        "DET": "DET",
        "EN": "EN",
        "Ex": "EX",
        "INFMARK": "INFMARK",
        "ING": "ING",
        "N": "N",
        "NEG-PART": "NEG-PART",
        "NUM": "NUM",
        "PREP": "PREP",
        "PRON": "PRON",
        "pun": "Punct",
        "Rel": "REL",
        "UNKNOWN": "UNKNOWN",
        "V": "V"
    },
    translation: transl.pos,
};

attrs.pos_mulcold_sv = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    // TODO: Map to generic keys for PoS translations
    dataset: {
        "A": "A",
        "ADV": "ADV",
        "CC": "CC",
        "CS": "CS",
        "DET": "DET",
        "N": "N",
        "NUM": "NUM",
        "PREP": "PREP",
        "PRON": "PRON",
        "pun": "Punct",
        "UNKNOWN": "UNKNOWN",
        "V": "V"
    },
    translation: transl.pos,
};

attrs.pos_uta_ru = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "-": "Punct",
        ",": "Punct",
        ":": "Punct",
        "'": "Punct",
        "\"": "Punct",
        "A": "A",
        "C": "C",
        "I": "Interj",
        "M": "Num",
        "N": "N",
        "P": "Pron",
        "Q": "Particle",
        "R": "Adv",
        "S": "Prep",
        "V": "V",
    },
    translation: transl.pos,
};

attrs.pos_ud2_universal = {
    label: "pos",
    displayType: "select",
    dataset: {
        "ADJ": "A",
        "ADP": "Adp",
        "ADV": "Adv",
        "AUX": "Aux",
        "CCONJ": "CC",
        "DET": "DT",
        "INTJ": "Interj",
        "NOUN": "N",
        "NUM": "Num",
        "PART": "PL",
        "PRON": "Pron",
        "PROPN": "Prop",
        "PUNCT": "Punct",
        "SCONJ": "CS",
        "SYM": "Symb",
        "VERB": "V",
        "X": "Other",
    },
    translation: transl.pos,
};

attrs.pos_ud2_fi = {
    label: "pos",
    displayType: "select",
    dataset: {
        "A": "A",
        "Adp": "Adp",
        "Adv": "Adv",
        "C": "C",
        "Foreign": "Foreign",
        "Interj": "Interj",
        "N": "N",
        "Num": "Num",
        "Pron": "Pron",
        "Punct": "Punct",
        "Symb": "Symb",
        "V": "V",
    },
    translation: transl.pos,
};

attrs.pos_ud_fi = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "ADJ": "A",
        "ADP": "Adp",
        "ADV": "Adv",
        "AUX": "Aux",
        "CONJ": "C",
        "INTJ": "Interj",
        "NOUN": "N",
        "NUM": "Num",
        "PRON": "Pron",
        "PROPN": "Prop",
        "PUNCT": "Punct",
        "SCONJ": "CS",
        "SYM": "Symb",
        "VERB": "V",
        "X": "Other",
    },
    translation: transl.pos,
};

attrs.pos_ud_fi_ud1 = JSON.parse(JSON.stringify(attrs.pos_ud_fi));
attrs.pos_ud_fi_ud1.label = "pos_ud1";
attrs.pos_ud_fi_ud1.order = 13;

attrs.pos_klk = {
    label: "pos",
    displayType: "select",
    extendedComponent: "datasetSelect",
    escape: false,
    opts: liteOptions,
    dataset: {
        "": "",
        "A": "A",
        "Adp": "Adp",
        "Adv": "Adv",
        "C": "C",
        "Foreign": "Foreign",
        "Interj": "Interj",
        "N": "N",
        "Num": "Num",
        "Pron": "Pron",
        "Punct": "Punct",
        "Symb": "Symb",
        "V": "V"
    },
    translation: transl.pos,
};
attrs.pos_klk_ordered = JSON.parse(JSON.stringify(attrs.pos_klk));
attrs.pos_klk_ordered.order = 18;

// TextMorfo parts of speech, used in FTC
attrs.pos_textmorfo = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "-|null": "Unknown",
        "Abbrev": "Abbr",
        "Adjective": "Adj",
        "Adjective-Noun|Adjective-No": "AdjNoun",
        "Adverb": "Adv",
        "Code": "Code",
        "CompPart": "CompPart",
        "Conjunction": "Conj",
        "Delimiter": "Punct",
        "Interjection": "Interj",
        "Noun": "Noun",
        "Noun-Noun": "NounNoun",
        "Numeral": "Num",
        "Preposition": "Prep",
        "Pronoun": "Pron",
        "Proper": "Prop",
        "Verb": "Verb",
    },
    translation: transl.pos,
};

// SWECG parts of speech, used in FSTC and Svenska Parole
attrs.pos_swecg = {
    label: "pos",
    displayType: "select",
    opts: liteOptions,
    localize: false,
    dataset: [
        "A",
        "ABBR",
        "ADV",
        "ADV/PREP",
        "A/N",
        "CC",
        "CLB",
        "DEF",
        "DER/-het",
        "DER/-nde",
        "DET",
        "GEN",
        "INDEF",
        "INFMARK",
        "INTERJ",
        "N",
        "NOM",
        "NUM",
        "PRB",
        "PREP",
        "PREPADV",
        "PRON",
        "SC",
        "UTRNEU",
        "V",
    ],
};


attrs.msd = {
    label: "msd",
    opts: settings.defaultOptions,
    // Add a <wbr> tag after each vertical bar to allow breaking the
    // line there in the sidebar, while retaining the ability to copy
    // and paste to a further search expression (unlike if we added a
    // zero-width space U+200B).
    stringify: function(val) {
        return val.replace(/\|/g, "|<wbr>");
    }
};
attrs.msd_ordered = JSON.parse(JSON.stringify(attrs.msd));
attrs.msd_ordered.order = 17;
attrs.msd_ud1 = JSON.parse(JSON.stringify(attrs.msd));
attrs.msd_ud1.label = "msd_ud1";
attrs.msd_ud1.order = 12;
attrs.baseform = {
    label: "baseform",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions,
    stats_cqp: "cqpPlainWordAttr",
    stats_stringify: "stringifyPlainWordAttr",
};
attrs.baseform_ordered = JSON.parse(JSON.stringify(attrs.baseform));
attrs.baseform_ordered.order = 20;
attrs.baseform_ud1 = JSON.parse(JSON.stringify(attrs.baseform));
attrs.baseform_ud1.label = "baseform_ud1";
attrs.baseform_ud1.order = 15;
attrs.baseform_ftb2 = {
    label: "baseform",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions
};
attrs.baseform_compound = {
    label: "baseform_compound",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions
};
attrs.baseform_compound_ordered = JSON.parse(JSON.stringify(attrs.baseform_compound));
attrs.baseform_compound_ordered.order = 19;
attrs.baseform_compound_ud1_ordered = {
    label: "baseform_compound_ud1",
    order: 14,
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions
};
attrs.lemgram_hidden = {
    label: "lemgram",
    type: "set",    // Seems to work only if this is "set" even if "hidden"
    displayType: "hidden",
};
attrs.deprel_ftb2 = {
    label: "deprel",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "advl": "advl",
        "attr": "attr",
        "aux": "aux",
        "comp": "comp",
        "conjunct": "conjunct",
        "idiom": "idiom",
        "main": "main",
        "mod": "mod",
        "modal": "modal",
        "obj": "obj",
        "phrm": "phrm",
        "phrv": "phrv",
        "scomp": "scomp",
        "subj": "subj",
        "voc": "voc",
        "_": "_",
    },
    translation: transl.deprel,
};
attrs.deprel_tdt = {
    label: "deprel",
    // displayType: "select",
    extendedComponent: "datasetSelect",
    opts: liteOptions,
    dataset: {
        "_": "_",
        "acomp": "acomp",
        "adpos": "adpos",
        "advcl": "advcl",
        "advmod": "advmod",
        "amod": "amod",
        "appos": "appos",
        "arg": "arg",
        "aux": "aux",
        "auxpass": "auxpass",
        "cc": "cc",
        "ccomp": "ccomp",
        "comp": "comp",
        "compar": "compar",
        "comparator": "comparator",
        "complm": "complm",
        "conj": "conj",
        "cop": "cop",
        "csubj": "csubj",
        "csubj-cop": "csubj-cop",
        "dep": "dep",
        "det": "det",
        "dobj": "dobj",
        "ellipsis": "ellipsis",
        "gobj": "gobj",
        "gsubj": "gsubj",
        "iccomp": "iccomp",
        "infmod": "infmod",
        "intj": "intj",
        "mark": "mark",
        "mod": "mod",
        "name": "name",
        "neg": "neg",
        "nn": "nn",
        "nommod": "nommod",
        "nommod-own": "nommod-own",
        "nsubj": "nsubj",
        "nsubj-cop": "nsubj-cop",
        "num": "num",
        "number": "number",
        "parataxis": "parataxis",
        "partmod": "partmod",
        "poss": "poss",
        "preconj": "preconj",
        "prt": "prt",
        "punct": "punct",
        "quantmod": "quantmod",
        "rcmod": "rcmod",
        "rel": "rel",
        "ROOT": "ROOT",
        "subj": "subj",
        "voc": "voc",
        "xcomp": "xcomp",
        "xsubj": "xsubj",
        "xsubj-cop": "xsubj-cop"
    },
    translation: transl.deprel,
};
attrs.deprel_tdt_ordered = JSON.parse(JSON.stringify(attrs.deprel_tdt));
attrs.deprel_tdt_ordered.order = 16;
attrs.deprel_ud2 = {
    label: "deprel",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "acl": "acl",
        "acl:relcl": "acl:relcl",
        "advcl": "advcl",
        "advmod": "advmod",
        "amod": "amod",
        "appos": "appos",
        "aux": "aux",
        "aux:pass": "aux:pass",
        "case": "case",
        "cc": "cc",
        "ccomp": "ccomp",
        "cc:preconj": "cc:preconj",
        "compound": "compound",
        "compound:nn": "compound:nn",
        "compound:prt": "compound:prt",
        "conj": "conj",
        "cop": "cop",
        "cop:own": "cop:own",
        "csubj": "csubj",
        "csubj:cop": "csubj:cop",
        "dep": "dep",
        "det": "det",
        "discourse": "discourse",
        "fixed": "fixed",
        "flat": "flat",
        "flat:foreign": "flat:foreign",
        "flat:name": "flat:name",
        "goeswith": "goeswith",
        "mark": "mark",
        "nmod": "nmod",
        "nmod:gobj": "nmod:gobj",
        "nmod:gsubj": "nmod:gsubj",
        "nmod:poss": "nmod:poss",
        "nsubj": "nsubj",
        "nsubj:cop": "nsubj:cop",
        "nummod": "nummod",
        "obj": "obj",
        "obl": "obl",
        "orphan": "orphan",
        "parataxis": "parataxis",
        "punct": "punct",
        "root": "root",
        "vocative": "vocative",
        "xcomp": "xcomp",
        "xcomp:ds": "xcomp:ds",
    },
    translation: transl.deprel,
};
attrs.deprel_ud_fi = {
    label: "deprel",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "_": "_",
        "acl": "acl",
        "acl:relcl": "rcmod",
        "advcl": "advcl",
        "advmod": "advmod",
        "amod": "amod",
        "appos": "appos",
        "aux": "aux",
        "auxpass": "auxpass",
        "case": "adpos",
        "cc": "cc",
        "ccomp": "ccomp",
        "cc:preconj": "preconj",
        "compound": "compound",
        "compound:nn": "nn",
        "compound:prt": "prt",
        "conj": "conj",
        "cop": "cop",
        "csubj": "csubj",
        "csubj:cop": "csubj-cop",
        "dep": "dep",
        "det": "det",
        "discourse": "discourse",
        "dobj": "dobj",
        "goeswith": "goeswith",
        "mark": "mark",
        "mwe": "mwe",
        "name": "name",
        "neg": "neg",
        "nmod": "nommod",
        "nmod:gobj": "gobj",
        "nmod:gsubj": "gsubj",
        "nmod:own": "nommod-own",
        "nmod:poss": "poss",
        "nsubj": "nsubj",
        "nsubj:cop": "nsubj-cop",
        "nummod": "num",
        "parataxis": "parataxis",
        "punct": "punct",
        "remnant": "remnant",
        "rel": "rel",
        "root": "ROOT",
        "vocative": "voc",
        "xcomp": "xcomp",
        "xcomp:ds": "xcomp:ds",
    },
    translation: transl.deprel,
};
attrs.deprel_ud_fi_ud1 = JSON.parse(JSON.stringify(attrs.deprel_ud_fi));
attrs.deprel_ud_fi_ud1.label = "deprel_ud1";
attrs.deprel_ud_fi_ud1.order = 11;
attrs.deprel_uta_ru = {
    label: "deprel",
    displayType: "select",
    localize: false,
    opts: liteOptions,
    dataset: [
        "1-компл",
        "1-несобст-компл",
        "2-компл",
        "2-несобст-компл",
        "3-компл",
        "3-несобст-компл",
        "4-компл",
        "5-компл",
        "PUNC",
        "ROOT",
        "fictit",
        "агент",
        "аддит",
        "аналит",
        "аппоз",
        "аппрокс-колич",
        "атриб",
        "вводн",
        "вспом",
        "дат-субъект",
        "дистанц",
        "длительн",
        "изъясн",
        "инф-союзн",
        "квазиагент",
        "колич-вспом",
        "колич-копред",
        "колич-огран",
        "количест",
        "ком-сочин",
        "компл-аппоз",
        "композ",
        "композ-аппоз",
        "кратн",
        "кратно-длительн",
        "неакт-компл",
        "несобст-агент",
        "ном-аппоз",
        "нум-аппоз",
        "об-аппоз",
        "об-копр",
        "обст",
        "обст-тавт",
        "огранич",
        "оп-аппоз",
        "оп-опред",
        "опред",
        "пасс-анал",
        "подч-союзн",
        "предик",
        "предл",
        "презентат",
        "примыкат",
        "присвяз",
        "пролепт",
        "разъяснит",
        "распред",
        "релят",
        "сент-предик",
        "сент-соч",
        "соотнос",
        "соч-союзн",
        "сочин",
        "сравн-союзн",
        "сравнит",
        "суб-копр",
        "суб-обст",
        "уточн",
        "эксплет",
        "электив",
        "эллипт",
    ],
};

attrs.text = {
    label: "text"
};
attrs.spoken = {
    label: "spoken",
    opts: settings.defaultOptions
};
attrs.origword = {
    label: "word_orig",
    opts: settings.defaultOptions
};
attrs.tildeword = {
    label: "word_tilde",
    opts: settings.defaultOptions
};
attrs.complword = {
    label: "word_completed",
    opts: settings.defaultOptions
};
attrs.id_hidden = {
    label: "id",
    displayType: "hidden",
    opts: settings.defaultOptions
};
attrs.ambiguous_lemma = {
    label: "ambiguous_lemma",
    type: "set",
    opts: setOptions
};
attrs.ambiguous_pos = {
    label: "ambiguous_pos",
    type: "set",
    opts: setOptions
};
attrs.ambiguous_msd = {
    label: "ambiguous_msd",
    type: "set",
    opts: setOptions
};

var mulcold_pos_langs = ["fi", "ru", "en", "sv"];
for (var i = 0; i < mulcold_pos_langs.length; i++) {
    var lang = mulcold_pos_langs[i];
    attrs["ambiguous_pos_mulcold_" + lang] = $.extend(
        true, {}, attrs["pos_mulcold_" + lang], attrs.ambiguous_pos);
}
// delete mulcold_pos_langs;

attrs.wordtype = {
    label: "type",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "text": "text",
        "to": "to",
        "from": "from",
        "comment": "comment",
        "subject": "subject"
    },
    translation: {
        "comment": {
            // "en": "comment",
            "fi": "transkriboijan kommentti",
            "sv": "lärares komment",
        },
        "from": {
            // "en": "from",
            "fi": "lähettäjä",
            "sv": "ansändare",
        },
        "subject": {
            // "en": "subject",
            "fi": "aihe",
            "sv": "subjekt",
        },
        "text": {
            // "en": "text",
            "fi": "leipäteksti",
            "sv": "text",
        },
        "to": {
            // "en": "to",
            "fi": "vastaanottaja",
            "sv": "adressat",
        },
    },
};

// Name attributes for corpora tagged with (Fi)NER.
//
// The attributes ne_* are intra-sentence structural attributes that
// are shown in Korp as token attributes, shown only for the tokens
// within an ne structure (isStructAttr: true). This approach is
// borrowed from Språkbanken but with a couple of additional
// attributes.

// FiNER name types
attrs.ne_type_fi = {
    label: "ne_type",
    displayType: "select",
    isStructAttr: true,
    dataset: [
        "LOC",
        "PRS",
        "ORG",
        "EVT",
        // "WRK",
        // "OBJ",
        "PRO",
        "MSR",
        "TME"
    ],
    translation: neTypeTranslation,
};
// FiNER name subtypes
attrs.ne_subtype_fi = {
    label: "ne_subtype",
    displayType: "select",
    isStructAttr: true,
    dataset: [
        "ANM",
        "AST",
        "ATH",
        "CLT",
        "CRP",
        "CUR",
        "DAT",
        "EDU",
        "FIN",
        "FNC",
        "GPL",
        "HRM",
        "HUM",
        "MYT",
        "PLT",
        "PPL",
        "STR",
        "TIT",
        "TVR",
        "XXX",
    ],
    translation: neSubtypeTranslation,
};
// FiNER full name types: expression category, type, subtype
attrs.ne_fulltype_fi = {
    label: "ne_fulltype",
    displayType: "select",
    isStructAttr: true,
    dataset: [
        "EnamexEvtXxx",
        "EnamexProXxx",
        "EnamexPrsAnm",
        "EnamexPrsHum",
        "EnamexPrsMyt",
        "EnamexPrsTit",
        "EnamexLocXxx",
        "EnamexLocGpl",
        "EnamexLocPpl",
        "EnamexLocStr",
        "EnamexLocFnc",
        "EnamexLocAst",
        "EnamexOrgAth",
        "EnamexOrgClt",
        "EnamexOrgCrp",
        "EnamexOrgEdu",
        "EnamexOrgFin",
        "EnamexOrgPlt",
        "EnamexOrgTvr",
        "NumexMsrCur",
        "NumexMsrXxx",
        "TimexTmeDat",
        "TimexTmeHrm",
    ],
    translation: {
        "EnamexEvtXxx": {
            "en": "event",
            "fi": "tapahtuma",
            "sv": "händelse",
        },
        "EnamexLocAst": {
            "en": "astronomical",
            "fi": "tähtitieteellinen",
            "sv": "astronomisk",
        },
        "EnamexLocFnc": {
            "en": "facility",
            "fi": "fasiliteetti",
            "sv": "facilitetsentitet",
        },
        "EnamexLocGpl": {
            "en": "geographical",
            "fi": "maantieteellinen",
            "sv": "geografisk",
        },
        "EnamexLocPpl": {
            "en": "geopolitical",
            "fi": "geopoliittinen",
            "sv": "geopolitisk",
        },
        "EnamexLocStr": {
            "en": "street or road",
            "fi": "katu tai tie",
            "sv": "gata eller väg",
        },
        "EnamexLocXxx": {
            "en": "other location",
            "fi": "muu paikka",
            "sv": "annan plats",
        },
        "EnamexOrgAth": {
            "en": "sports club",
            "fi": "urheiluseura tai joukkue",
            "sv": "idrottsklubb",
        },
        "EnamexOrgClt": {
            "en": "cultural organization",
            "fi": "kulttuuriorganisaatio",
            "sv": "kulturorganisation",
        },
        "EnamexOrgCrp": {
            "en": "company or society",
            "fi": "yritys tai yhdistys",
            "sv": "bolag eller förening",
        },
        "EnamexOrgEdu": {
            "en": "educational institution",
            "fi": "oppilaitos",
            "sv": "utbildningsinstitution",
        },
        "EnamexOrgFin": {
            "en": "financial organization",
            "fi": "finanssiorganisaatio",
            "sv": "finansiell organisation",
        },
        "EnamexOrgPlt": {
            "en": "political party",
            "fi": "puolue",
            "sv": "parti",
        },
        "EnamexOrgTvr": {
            "en": "mass media",
            "fi": "media",
            "sv": "massmedia",
        },
        "EnamexProXxx": {
            "en": "product",
            "fi": "tuote",
            "sv": "produkt",
        },
        "EnamexPrsAnm": {
            "en": "animal",
            "fi": "eläin",
            "sv": "djur",
        },
        "EnamexPrsHum": {
            "en": "person",
            "fi": "henkilö",
            "sv": "person",
        },
        "EnamexPrsMyt": {
            "en": "mythical",
            "fi": "myyttinen olento",
            "sv": "mytisk",
        },
        "EnamexPrsTit": {
            "en": "title",
            "fi": "titteli",
            "sv": "titel",
        },
        "NumexMsrCur": {
            "en": "money expression",
            "fi": "rahailmaus",
            "sv": "pengar",
        },
        "NumexMsrXxx": {
            "en": "other numeric expression",
            "fi": "muu numeroilmaus",
            "sv": "annat numeriskt uttryck",
        },
        "TimexTmeDat": {
            "en": "temporal expression",
            "fi": "ajanilmaus",
            "sv": "tidsuttryck",
        },
        "TimexTmeHrm": {
            "en": "time",
            "fi": "kellonaika",
            "sv": "klockslag",
        },
        "omorfi_": {
            "en": "not a name",
            // "fi": "omorfi_",
            "sv": "inget namn",
        },
        "omorfi_ARTWORK": {
            "en": "artwork",
            "fi": "taideteos",
            "sv": "konstverk",
        },
        "omorfi_CULTGRP": {
            "en": "culture group",
            "fi": "kulttuuriryhmä",
            "sv": "kulturgrupp",
        },
        "omorfi_FIRST": {
            "en": "first name",
            "fi": "etunimi",
            "sv": "förnamn",
        },
        "omorfi_GEO": {
            "en": "geographical name",
            "fi": "maantieteellinen nimi",
            "sv": "geographical name",
        },
        "omorfi_LAST": {
            "en": "last name",
            "fi": "sukunimi",
            "sv": "efternamn",
        },
        "omorfi_MISC": {
            "en": "other name",
            "fi": "muu nimi",
            "sv": "annat namn",
        },
        "omorfi_ORG": {
            "en": "organization",
            "fi": "organisaatio",
            "sv": "organisation",
        },
        "omorfi_PRODUCT": {
            "en": "product",
            "fi": "tuote",
            "sv": "produkt",
        },
        "omorfi__": {
            // "en": "omorfi__",
            "fi": "ei nimi",
            // "sv": "omorfi__",
        },
    },
};
// The name (tokens) within the ne structure
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true,
};
// If the name is a place name, it is repeated here. This attribute
// can represent place name information obtained from NER, POS tags or
// metadata, as indicated by ne_placename_source below.
attrs.ne_placename = {
    label: "ne_placename",
    isStructAttr: true,
};
// The source of the place name information.
attrs.ne_placename_source = {
    label: "ne_placename_source",
    displayType: "select",
    isStructAttr: true,
    dataset: [
        "ner",
        "pos",
        "meta",
    ],
    translation: {
        "meta": {
            "en": "metadata",
            "fi": "kuvailutiedot",
            "sv": "metadata",
        },
        "ner": {
            "en": "named-entity recognizer",
            "fi": "nimientunnistin",
            "sv": "namnigenkännare",
        },
        "pos": {
            "en": "parser or POS tagger",
            "fi": "jäsennin",
            "sv": "parser eller ordklasstaggare",
        },
    },
};
// The raw (Fi)NER tag as a positional attriute
attrs.ner_rawtag = {
    label: "ner_tag_raw",
    displayType: "hidden",
};
// The B-I-O status of token as a positional attribute: Beginning a
// name, Inside a name and Outside a name
attrs.ner_bio = {
    label: "ner_bio",
    displayType: "select",
    dataset: [
        "B",
        "I",
        "O",
    ],
    translation: {
        "B": {
            "en": "beginning (B)",
            "fi": "alussa (B)",
            "sv": "början (B)",
        },
        "I": {
            "en": "inside (I)",
            "fi": "sisällä (I)",
            "sv": "innanför (I)",
        },
        "O": {
            "en": "outside (O)",
            "fi": "ulkopuolella (O)",
            "sv": "utanför (O)",
        },
    },
};

// Common name attributes for (Fi)NER-tagged corpora

attrlist.standard = {
    lemma: attrs.baseform,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt,
    ref: attrs.ref,
    nertag: attrs.ner_tags
};

attrlist.finer = {
    ne_name: attrs.ne_name,
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type_fi,
    ne_subtype: attrs.ne_subtype_fi,
    ne_fulltype: attrs.ne_fulltype_fi,
    ne_placename: attrs.ne_placename,
    ne_placename_source: attrs.ne_placename_source,
    nertag: attrs.ner_rawtag,
    nerbio: attrs.ner_bio,
};

attrlist.ud2_fi = {
    ref: attrs.ref,
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_ud2_universal,
    xpos: { label: "", displayType: "hidden" },
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_ud2,
    deps: { label: "", displayType: "hidden" },
    misc: { label: "", displayType: "hidden" },
};

attrlist.ud2_en = attrlist.ud2_fi;

settings.corpusFeatures.finer = {
    attributes: attrlist.finer,
};

// An attribute not to be shown in Korp but included for documentation
// purposes.
attrs.hidden = {
    displayType: "hidden",
};
sattrs.hidden = attrs.hidden;

sattrs.text_title = {
    label: "title"
};
sattrs.title = sattrs.text_title;
sattrs.text_distributor = {
    label: "text_distributor",
    displayType: "hidden"
};
sattrs.text_source = {
    label: "text_source"
};

sattrs.text_published = {
    label: "text_pubdate2"
};
sattrs.publisher = {
    label: "publisher"
};

sattrs.author = {
    label: "author"
};
sattrs.author_birthyear = {
    label: "author_birthyear"
};
sattrs.author_deathyear = {
    label: "author_deathyear"
};


sattrs.sex = {
    label: "sex",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "f": "female",
        "m": "male",
        "x": "other",
        "u": "unknown",
    },
    translation: transl.sex,
};

sattrs.author_name_type = {
    label: "author_name_type",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "candidate id": "candidate_id",
    },
    translation: {
        "candidate_id": {
            "en": "candidate id",
            "fi": "kokelaan tunniste",
            "sv": "abiturientsignum",
        },
    },
};


sattrs.publ_year = {
    label: "year_published"
};

sattrs.fulltext_url = {
    label: "fulltext_url",
    type: "url"
};
sattrs.original_url = {
    label: "original_url",
    type: "url"
};
sattrs.context_url = {
    label: "context_url",
    type: "url"
};

// Options for URL attributes to be shown as separate links in the
// search result sidebar; to be used as the value of attribute
// property url_opts.
sattrs.link_url_opts = {
    // Show the the link in a separate link section
    inLinkSection: true,
    // Hide the URL and use the attribute label as the link text
    hideUrl: true,
    // Open the link in a new window (or tab)
    newWindow: true,
};

sattrs.link_fulltext = {
    label: "show_fulltext",
    type: "url",
    urlOpts: sattrs.link_url_opts
};
sattrs.link_original = {
    label: "show_original",
    type: "url",
    urlOpts: sattrs.link_url_opts
};
sattrs.link_fulltext_context = {
    label: "show_fulltext_context",
    type: "url",
    urlOpts: sattrs.link_url_opts
};
sattrs.link_prefixed = function (label, url_prefix) {
    return {
        label: label,
        type: "url",
        urlOpts: sattrs.link_url_opts,
        url_prefix: url_prefix
    };
};
sattrs.link_show_video_prefixed = function (url_prefix) {
    return sattrs.link_prefixed("show_video", url_prefix);
};
sattrs.link_show_video_annex = sattrs.link_prefixed(
    "show_video_in_lat",
    "https://lat.csc.fi/ds/annex/runLoader?viewType=timeline&");

sattrs.link_gutenberg = {
    label: "show_gutenberg",
    type: "url",
    urlOpts: sattrs.link_url_opts
};

sattrs.text_link_gutenberg = {
    label: "show_gutenberg_text",
    type: "url",
    urlOpts: sattrs.link_url_opts
};

sattrs.sentence_type = {
    label: "sentence_type",
    displayType: "select",
    // No translations for this key (2021-09-15)
    // translationKey: "klassikot_",
    dataset: {
        "text": "text",
        "head": "head",
        "stanza": "stanza",
        "speaker": "speaker",
        "stage": "stage"
    },
};


sattrs.sentence_id_hidden = {
    label: "sentence_id",
    displayType: "hidden"
};
sattrs.sentence_id = {
    label: "sentence_id"
};
sattrs.sentence_n = {
    label: "sentence_n"
};
sattrs.paragraph_id_hidden = {
    label: "paragraph_id",
    displayType: "hidden"
};
sattrs.paragraph_id = {
    label: "paragraph_id"
};

sattrs.text_time = {
    label: "text_time"
};

sattrs.paragraph_type = {
    label: "paragraph_type"
};

sattrs.chapter_num = {
    label: "chapter_num"
};

sattrs.part_num = {
    label: "part_num"
};

// Text genre values specifically for Mikhail Mikhailov's (UTA)
// corpora (MULCOLD, FiRuLex, ParFin, ParRus)
sattrs.mikhailov_text_genre = {
    label: "text_genre",
    displayType: "select",
    opts: liteOptions,
    dataset: {
        "fiction": "fiction",
        "law": "law",
    },
    // TODO: Add these to transl.genre
    translation: {
        "fiction": {
            "en": "fiction",
            "fi": "kaunokirjallisuus",
            "sv": "skönlitteratur",
        },
        "law": {
            "en": "legal text",
            "fi": "lakiteksti",
            "sv": "juridisk text",
        },
    },
};

sattrs.text_author = {
    label: "author"
};

sattrs.article_author = {
    label: "article_author"
};

sattrs.text_producers = {
    label: "text_producers"
};

sattrs.text_ebook_id = {
    label: "text_ebook_id"
};

sattrs.text_translator = {
    label: "text_translator"
};

sattrs.text_publ_place = {
    label: "publication_place"
};

sattrs.filename = {
    label: "file_name"
};

sattrs.work_title = {
    label: "work_title",
};

sattrs.year = {
    label: "year"
};

sattrs.month = {
    label: "month"
};

sattrs.day_of_month = {
    label: "day"
};

/* KFSCP --- */

sattrs.text_pubdate = {
    label: "publication_date"
};

sattrs.text_publisher = {
    label: "publisher"
};





/* E-thesis */

sattrlist.ethesis = {
    text_title: {
        label: "text_title"
    },
    text_date_orig: {
        label: "original_date"
    },
    text_year: {
        label: "text_year"
    },
    text_keywords: {
        label: "text_keywords"
    },
    text_faculty: {
        label: "text_faculty"
    },
    text_subject: {
        label: "text_subject"
    },
    text_type: {
        label: "text_dissertationtype"
    },
    text_url: {
        label: "text_abslink",
        type: "url",
        urlOpts: sattrs.link_url_opts
    }
};


attrlist.parsed_sv = {
    lemma: attrs.baseform,
    pos: attrs.pos,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref
};

attrlist.parsed_sv_lemmaset = {
    lemma: attrs.baseform_sv,
    pos: attrs.pos,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref
};

// Common positional attributes for corpora parsed with the Turku
// Dependency Treebank parser (with lemgrams and lemmas without
// compound boundaries added)
attrlist.parsed_tdt = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden,
};

attrlist.parsed_tdt_ud1 = {
    ref: attrs.ref,
    lemma: attrs.baseform_ordered, // order: 20
    lemmacomp: attrs.baseform_compound_ordered, // order: 19
    pos: attrs.pos_klk_ordered, // order: 18
    msd: attrs.msd_ordered, // order: 17
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt_ordered, // order: 16
    lemma_ud1: attrs.baseform_ud1, // order: 15
    lemmacomp_ud1: attrs.baseform_compound_ud1_ordered, // order: 14
    pos_ud1: attrs.pos_ud_fi_ud1, // order: 13
    msd_ud1: attrs.msd_ud1, // order: 12
    dephead_ud1: attrs.dephead_ud1,
    deprel_ud1: attrs.deprel_ud_fi_ud1, // order: 11
    lex: attrs.lemgram_hidden,
};

settings.corpusFeatures.parsed_tdt = {
    attributes: attrlist.parsed_tdt,
};

// The same but without dependency attributes
attrlist.parsed_tdt_nodep = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    lex: attrs.lemgram_hidden,
};

settings.corpusFeatures.parsed_tdt_nodep = {
    attributes: attrlist.parsed_tdt_nodep,
};

// Corpora parsed with TDT and run through FiNER
attrlist.parsed_tdt_ner =
    $.extend({}, attrlist.parsed_tdt, {
        nertag: attrs.ner_tags
    });


settings.corpusFeatures.spaces = {
    attributes: {
        spaces: {
            label: "whitespace_related_to_token",
        },
    },
};


// KLK structural attributes, for both Finnish and Swedish
sattrlist.klk = {
    text_label: {
        // The label has the prefix klk_ because it might not have the
        // same meaning as "label" in some other contexts.
        label: "klk_label",
    },
    text_publ_title: {
        label: "publication",
    },
    /*
    text_publ_part: {
        label: "part",
    },
    */
    text_publ_id: {
        label: "issn",
    },
    text_issue_date: {
        label: "date",
    },
    text_issue_no: {
        label: "issue_num",
    },
    text_issue_title: {
        label: "issue_title",
    },
    /*
    text_part_name: {
        label: "part_name",
    },
    */
    text_elec_date: {
        label: "digitization_date",
    },
    text_language: {
        label: "lang",
        displayType: "select",
        extendedComponent: "datasetSelect",
        escape: false,
        opts: liteOptions,
        dataset: {
            "fi": "fin",
            "sv": "swe",
            "et": "est",
        },
        translation: transl.lang,
    },
    /*
    text_page_id: {
        label: "page_id",
        opts: settings.defaultOptions,
    },
    */
    text_page_no: {
        label: "page_num",
    },
    text_sentcount: {
        label: "sentence_count",
        displayType: "hidden",
    },
    text_tokencount: {
        label: "token_count",
        displayType: "hidden",
    },
    text_img_url: {
        label: "image_url",
        type: "url",
        displayType: "hidden",
    },
    text_publ_type: {
        label: "publication_type",
        displayType: "select",
        extendedComponent: "datasetSelect",
        escape: false,
        opts: liteOptions,
        dataset: {
            "aikakausi": "journal",
            "sanomalehti": "newspaper"
        },
        translation: {
            "journal": {
                "en": "journal",
                "fi": "aikakauslehti",
                "sv": "tidskrift",
            },
            "newspaper": {
                "en": "newspaper",
                "fi": "sanomalehti",
                "sv": "tidning",
            },
        },
    },
    paragraph_id: {
        label: "paragraph_id",
        displayType: "hidden",
    },
    sentence_id: sattrs.sentence_id_hidden
};

sattrlist.klk2 = $.extend(
    {},
    sattrlist.klk,
    {
        text_date: sattrs.date_iso,
        text_filename_orig: {
            label: "filename_orig",
        },
        text_filename_metadata: {
            label: "filename_metadata",
        },
        text_add_version: {
            label: "added_in_version",
            displayType: "select",
            opts: liteOptions,
            dataset: [
                "1",
                "2",
            ],
            extendedComponent: "datasetSelect",
            escape: false,
        },
    }
);
// Change the label of text_issue_date, as text_date is in ISO format
sattrlist.klk2.text_issue_date.label = "issue_date";


// KLK page image links used for both Finnish and Swedish
sattrlist.klk_pagelinks = {
    text_binding_id: {
        displayType: "hidden"
    },
    text_page_image_url: {
        label: "show_page_image",
        type: "url",
        urlOpts: sattrs.link_url_opts,
        synthetic: true,
        stringify_synthetic: function (token_data) {
            return funcs.make_klk_page_image_url(token_data, 0);
        }
    },
    text_page_image_context_url: {
        label: "show_page_image_context",
        type: "url",
        urlOpts: sattrs.link_url_opts,
        synthetic: true,
        stringify_synthetic: function (token_data) {
            return funcs.make_klk_page_image_url(token_data, 2);
        }
    },
    text_download_pdf_url: {
        label: "download_publ_pdf",
        type: "url",
        urlOpts: sattrs.link_url_opts,
        synthetic: true,
        stringify_synthetic: function (token_data) {
            return funcs.make_klk_url_base(token_data) + "/pdf";
        }
    },
};


// MULCOLD

attrlist.mulcold_fi = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_mulcold_fi,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_fi,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_ru = {
    lemma: attrs.baseform,
    pos: attrs.pos_mulcold_ru,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_ru,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_en = {
    lemma: attrs.baseform,
    pos: attrs.pos_mulcold_en,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_en,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_sv = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_mulcold_sv,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_sv,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_de = {
};

sattrlist.mulcold = {
    align_text_code: {
        label: "text_id"
    },
    align_text_author: {
        label: "author"
    },
    align_text_title: {
        label: "title"
    },
    align_text_typeoftext: {
        label: "text_type"
    },
    align_text_genre: sattrs.mikhailov_text_genre,
    align_text_period: {
        label: "year"
    },
    align_text_publisher: {
        label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

settings.corpusinfo.mulcold = {
    urn: "urn:nbn:fi:lb-201405277",
    metadata_urn: "urn:nbn:fi:lb-201405278",
    licence: settings.licenceinfo.CC_BY_ND,
    homepage_url: "https://mustikka.uta.fi/",
};


// FiRuLex

sattrlist.legal = {
    text_code: {
        label: "text_id"
    },
    text_author: {
        label: "author"
    },
    text_title: {
        label: "title"
    },
    text_typeoftext: {
        label: "text_type"
    },
    text_genre: sattrs.mikhailov_text_genre,
    text_period: {
        label: "text_period"
    },
    text_publisher: {
        label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

settings.corpusinfo.firulex = {
    urn: "urn:nbn:fi:lb-201407162",
    metadata_urn: "urn:nbn:fi:lb-201407161",
    licence: settings.licenceinfo.CC_BY_ND,
    homepage_url: "https://mustikka.uta.fi/",
};


/* ParFin common */

settings.corpusinfo.parfin = {
    urn: "urn:nbn:fi:lb-2015050506",
    metadata_urn: "urn:nbn:fi:lb-2014052710",
    lbr_id: "urn:nbn:fi:lb-2014052710",
    licence: {
        name: "CLARIN RES +NC +PLAN +INF",
        urn: "urn:nbn:fi:lb-2015041306",
    },
    homepage_url: "https://mustikka.uta.fi/",
};

sattrlist.parfin_base = {
    link_text_code: {
        label: "text_id"
    },
    link_txtnumber: {
        label: "text_number"
    },
    link_text_author: {
        label: "author"
    },
    link_text_title: {
        label: "title"
    },
    link_text_typeoftext: {
        label: "text_type"
    },
    link_text_genre: sattrs.mikhailov_text_genre,
    link_text_period: {
        label: "year"
    },
    link_text_publisher: {
        label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

sattrlist.parfin_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Haahtela Joel",
                "Hotakainen Kari",
                "Konkka Anita",
                "Krohn Leena",
                "Lassila Maiju",
                "Lehtolainen Leena",
                "Mäkelä Hannu",
                "Oksanen Sofi",
                "Rimminen Mikko",
                "Sillanpää Frans Emil",
                "Sinisalo Johanna",
                "Tuuri Antti",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
            displayType: "select",
            dataset: [
                "Djafarova Taissia",
                "Džafarova-Viitala Taisja",
                "Ioffe Eleonora",
                "Melnik Tatjana",
                "Muravin Gennadi, Kamenskaja J",
                "Muravin, Gennadi",
                "Priležajev Ivan",
                "Sidorova Anna",
                "Sidorova Anna, Tinovitskaja Jevgenija",
                "Tinovitskaja Evgenija",
                "Uretskij Ilja",
                "Virolainen Laura A.",
                "Zoštšenko Mihail",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Ennen päivänlaskua ei voi",
                "Ensimmäinen murhani",
                "Harmin paikka",
                "Hullun taivaassa",
                "Ihmisen vaatteissa",
                "Ihmiset suviyössä",
                "Joki virtaa läpi kaupungin",
                "Juoksuhaudantie",
                "Kuparisydän",
                "Pekka Peloton",
                "Perhoskerääjä",
                "Puhdistus",
                "Pussikaljaromaani",
                "Sfinksi vai robotti",
                "Tulitikkuja lainaamassa",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: {
                "Kansa": "Kansa",
                "Otava": "Otava",
                "[Tt]ammi": "Tammi",
                "Teos": "Teos",
                "WSOY": "WSOY",
            },
            localize: false,
            opts: liteOptions,
        },
    }
);

sattrlist.parfin_ru = $.extend(
    true, {}, sattrlist.parfin_fi,
    {
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Бесстрашный Пекка  В одежде человека",
                "В одежде человека",
                "В сумасшедших небесах",
                "До заката нельзя",
                "За спичками",
                "Змеи в раю",
                "Люди в летней ночи",
                "Медное сердце",
                "Мое первое убийство",
                "Очищение",
                "Река течет через город",
                "Роман с пивом",
                "Собиратель бабочек",
                "Сфинкс или робот  В одежде человека",
                "Улица окопная",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "Азбука-классика",
                "Амфора",
                "Астрель",
                "Государственное издательство художественной литературы",
                "Едиториал УРСС",
                "КомКнига",
                "Лимбус Пресс, Издательство К. Тублина",
                "Самокат",
                "Текст",
                "Художественная литература",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

attrlist.parfin_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parfin_ru = $.extend(
    true, {}, attrlist.mulcold_ru);


/* ParRus common */

attrlist.parrus_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parrus_ru = $.extend(
    true, {}, attrlist.mulcold_ru);

sattrlist.parrus_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Бабель И.",
                "Бакланов Г.",
                "Булгаков М.А.",
                "Гоголь Н.В.",
                "Горький М.",
                "Достоевский Ф.М.",
                "Дудинцев В.",
                "Зощенко М.",
                "Лермонтов М.Ю.",
                "Лесков Н.",
                "Маринина А.",
                "Пушкин А.С.",
                "Семенов Ю.",
                "Толстой Л.Н.",
                "Трифонов Ю.",
                "Троепольский Г.",
                "Тургенев И.С.",
                "Фадеев А.",
                "Чехов А.П.",
                "Шолохов М.А.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
            displayType: "select",
            dataset: [
                "Adrian E.",
                "Adrian, Esa",
                "Ahava, Juho, Hameen-anttila, Vaino",
                "Anhava M.",
                "Heino U.-L.",
                "Heino, Ulla-Liisa",
                "Hollo J.A.",
                "Hollo, Juho Anselmi",
                "Iranto L.",
                "Juhani Konkka",
                "Kallama, Valto",
                "Konkka J.",
                "Konkka, Juhani",
                "Koskinen M.",
                "Kuukasjärvi Olli",
                "Losowitch K.",
                "Mitrošin A.",
                "Orlov Vappu",
                "Pienimäki N.",
                "Pyykkö L.",
                "Pyykkö Lea",
                "Viitanen Liisa",
                "null",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Aateliskoti",
                "Aatelisneiti talonpoikaistyttönä / Laukaus ja y. m. kertomuksia.",
                "Agafja / Valitut novelit 1.",
                "Aikamme sankari",
                "Albionin tytär / Valitut novellit 1.",
                "Alustava tilinpäätös",
                "Anna Karenina",
                "Aristokraatti / Kireähermoista väkeä.",
                "Asemanhoitaja / Romaanit ja kertomukset.",
                "Bim mustakorva",
                "Ei onnistunut! / Valitut novellit 1.",
                "Elämän pikkuseikka / Valitut novellit 1.",
                "Griša / Valitut novellit 1.",
                "Haaveita / Valitut novelit 1.",
                "Hammaskirurgi / Valitut novellit 1.",
                "Herra salaneuvos / Valitut novellit 1.",
                "Hevosenkaltainen sukunimi / Valitut novelit 1.",
                "Hiljaa virtaa Don",
                "Huvila-asukkaita / Valitut novelit 1.",
                "Häät kenraalin kera / Valitut novellit 1.",
                "Ilkeä poika / Valitut novellit 1.",
                "Isergil-muori",
                "Isä-kulta / Valitut novellit 1.",
                "Jeesuksen synti",
                "Kaikesta täytyy maksaa",
                "Kalliita kielitunteja / Valitut novellit 1.",
                "Kameleontti / Valitut novellit 1.",
                "Kapteenintytär / Romaanit ja kertomukset.",
                "Karamazovin veljekset",
                "Karkuri / Valitut novellit 1.",
                "Karviaismarjoja / Suuret kertomukset 2.",
                "Kauhunyö / Valitut novellit 1.",
                "Keittäjätär menee naimisiin / Valitut novelit 1.",
                "Kellariloukko",
                "Kerjäläinen / Valittuja kertomuksia ja novelleja 1.",
                "Kevään seitsemäntoista hetkeä",
                "Kireähermoista väkeä / Kireähermoista väkeä.",
                "Kirje isoisälle / Valitut novellit 1.",
                "Koiran sydän",
                "Kostaja / Valitut novellit 1.",
                "Kuningas / Odessalaisia ja muita novelleja",
                "Kunnon saksalainen / Valitut novellit 1.",
                "Kuolema ja vähän rakkautta",
                "Kuorotyttö / Valitut novellit 1.",
                "Lapsia / Valitut novellit 1.",
                "Laukaus / Laukaus ja y. m. kertomuksia.",
                "Liikaa suolaa / Valitut novellit 1.",
                "Lumimyrsky / Romaanit ja kertomukset.",
                "Lumottu vaeltaja",
                "Made / Valettuja kertomuksia ja novellija 1.",
                "Makar Tšudra",
                "Nainen ja sylikoira / Suuret kertomukset 2.",
                "Noita / Valitut novellit 1.",
                "Näyttelijän lähtö / Valitut novelit 1.",
                "Onnenpoika / Valitut novellit 1.",
                "Onnettomuus / Valitut novellit 1.",
                "Onni / Suuret kertomukset 1.",
                "Osterit / Valitut novellit 1.",
                "Pahantekijä / Valitut novellit 1.",
                "Paksukainen ja ohukainen / Valitut novellit 1.",
                "Patarouva / Romaanit ja kertomukset.",
                "Perheen isä / Valitut novellit 1.",
                "Pimeässä / Valitut novellit 1.",
                "Poikia / Valitut novelit 1.",
                "Pyry",
                "Päällysviitta / Valitut teokset. 1.",
                "Rakkaus / Valitut novellit 1.",
                "Rikos ja rangaistus",
                "Romaani bassoviulusta / Valitut novellit 1.",
                "Rotkossa / Suuret kertomukset 2.",
                "Ruumisarkuntekijä / Romaanit ja kertomukset.",
                "Saatana saapuu Moskovaan",
                "Seireeni / Valitut novellit 1.",
                "Surkea tapaus / Valitut novellit 1.",
                "Suru / Valitut novellit 1.",
                "Synnyinmaan puolesta",
                "Taiteen tuote / Valitut novellit 1.",
                "Taiteilijan tarina / Suuret kertomukset 1.",
                "Talo rantakadulla",
                "Talonpoikia / Suuret kertomukset 2.",
                "Tapaus yöllä / Kireähermoista väkeä.",
                "Tarpeettomia ihmisiä / Valitut novellit 1.",
                "Teatteriromaani",
                "Tuho",
                "Tuttu mies / Valitut novellit 1.",
                "Tšelkaš",
                "Valkeat vaatteet",
                "Vanhuus/ Valitut novellit 1.",
                "Virkamiehen kuolema / Valitut novellit 1.",
                "Yö ennen oikeudenkäyntiä  / Valitut novellit 1.",
                "Yö hautausmaalla / Valitut novellit 1.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "Gummerus",
                "Helsinki",
                "Kansankulttuuri",
                "Karisto",
                "Otava",
                "SN-kirjat",
                "Tammi",
                "WSOY",
                "null",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

sattrlist.parrus_ru = $.extend(
    true, {}, sattrlist.parfin_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Бабель И.",
                "Бакланов Г.",
                "Булгаков М.А.",
                "Гоголь Н.В.",
                "Горький М.",
                "Достоевский Ф.М.",
                "Дудинцев В.",
                "Зощенко М.",
                "Лермонтов М.Ю.",
                "Лесков Н.",
                "Маринина А.",
                "Пушкин А.С.",
                "Семенов Ю.",
                "Толстой Л.Н.",
                "Трифонов Ю.",
                "Троепольский Г.",
                "Тургенев И.С.",
                "Фадеев А.",
                "Чехов А.П.",
                "Шолохов М.А.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
            displayType: "select",
            dataset: [
                "Adrian, Esa",
                "Ahava Juho, Hämeen-Anttila Väinö",
                "Anhava, Martti",
                "Heino, Ulla-Liisa",
                "Hollo, Juho Anselmi",
                "Iranto, Lidia",
                "Konkka, Juhani",
                "Koskinen, Marja",
                "Kuukasjärvi, Olli",
                "Losowitch, Katja",
                "Mitrošin, A.",
                "Pesonen, Pekka Alarik",
                "Pienimäki, Natalia",
                "Pyykkö Lea",
                "Viitanen, Liisa",
                "null",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Агафья / Собр. соч. в 15 тт.",
                "Актерская гибель / Собр. соч. в 15 тт.",
                "Анна Каренина",
                "Аристократка",
                "Барышня-крестьянка",
                "Беглец / Собр. соч. в 15 тт.",
                "Белые одежды",
                "Белый Бим черное ухо",
                "Братья Карамазовы",
                "В овраге / Собр. соч. в 15 тт.",
                "В потемках / Собр. соч. в 15 тт.",
                "Ванька / Собр. соч. в 15 тт.",
                "Ведьма / Собр. соч. в 15 тт.",
                "Выстрел",
                "Герой нашего времени",
                "Гриша / Собр. соч. в 15 тт.",
                "Гробовщик",
                "Дама с собачкой / Собр. соч. в 15 тт.",
                "Дачники / Собр. соч. в 15 тт.",
                "Дворянское гнездо",
                "Детвора / Собр. соч. в 15 тт.",
                "Добрый немец / Собр. соч. в 15 тт.",
                "Дом на набережной",
                "Дом с мезонином / Собр. соч. в 15 тт.",
                "Дорогие уроки / Собр. соч. в 15 тт.",
                "Дочь Альбиона / Собр. соч. в 15 тт.",
                "Житейская мелочь / Собр. соч. в 15 тт.",
                "За все надо платить",
                "Записки из подполья",
                "Злой мальчик / Собр. соч. в 15 тт.",
                "Злоумышленник / Собр. соч. в 15 тт.",
                "Знакомый мужчина / Собр. соч. в 15 тт.",
                "Иисусов грех / Одесские рассказы.",
                "Капитанская дочка",
                "Король / Одесские рассказы.",
                "Крыжовник / Собр. соч. в 15 тт.",
                "Кухарка женится / Собр. соч. в 15 тт.",
                "Лишние люди / Собр. соч. в 15 тт.",
                "Лошадиная фамилия / Собр. соч. в 15 тт.",
                "Любовь / Собр. соч. в 15 тт.",
                "Макар Чудра",
                "Мальчики / Собр. соч. в 15 тт.",
                "Мастер и Маргарита",
                "Метель",
                "Мечты / Собр. соч. в 15 тт.",
                "Мститель / Собр. соч. в 15 тт.",
                "Мужики / Собр. соч. в 15 тт.",
                "Навеки девятнадцатилетние",
                "Налим / Собр. соч. в 15 тт.",
                "Нервные люди",
                "Несчастье / Собр. соч. в 15 тт.",
                "Неудача / Собр. соч. в 15 тт.",
                "Нищий / Собр. соч. в 15 тт.",
                "Ночное происшествие",
                "Ночь на кладбище / Собр. соч. в 15 тт.",
                "Ночь перед судом / Собр. соч. в 15 тт.",
                "Отец семейства / Собр. соч. в 15 тт.",
                "Очарованный странник",
                "Папаша / Собр. соч. в 15 тт.",
                "Пересолил / Собр. соч. в 15 тт.",
                "Пиковая дама ",
                "Предварительные итоги",
                "Преступление и наказание",
                "Произведение искусства / Собр. соч. в 15 тт.",
                "Разгром",
                "Роман с контрабасом / Собр. соч. в 15 тт.",
                "Свадьба с генералом / Собр. соч. в 15 тт.",
                "Семнадцать мгновений весны",
                "Сирена / Собр. соч. в 15 тт.",
                "Смерть и немного любви",
                "Смерть чиновника / Собр. соч. в 15 тт.",
                "Собачье сердце",
                "Событие / Собр. соч. в 15 тт.",
                "Станционный смотритель",
                "Старость / Собр. соч. в 15 тт.",
                "Старуха Изергиль",
                "Страшная ночь / Собр. соч. в 15 тт.",
                "Счастливчик / Собр. соч. в 15 тт.",
                "Счастье / Собр. соч. в 15 тт.",
                "Тайный советник / Собр. соч. в 15 тт.",
                "Театральный роман",
                "Тихий Дон, ч. 1",
                "Толстый и тонкий / Собр. соч. в 15 тт.",
                "Тоска / Собр. соч. в 15 тт.",
                "Устрицы / Собр. соч. в 15 тт.",
                "Хамелеон / Собр. соч. в 15 тт.",
                "Хирургия / Собр. соч. в 15 тт.",
                "Хористка / Собр. соч. в 15 тт.",
                "Челкаш",
                "Шинель",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "АСТ, 1997",
                "АСТ, 1998",
                "АСТ, 2001",
                "АСТ, 2002",
                "АСТ, 2004",
                "АСТ, 2007",
                "АСТ, 2010",
                "АСТ, 2011",
                "АСТ, Астрель, 2002",
                "АСТ, Астрель, 2011",
                "Азбука-классика, 2002",
                "Альд, Империум Пресс, Литература, 2003",
                "Детская литература, 1999",
                "Детская литература, 2000",
                "Детская литература, 2004",
                "Олимп, АСТ, 2002",
                "Терра,  1999",
                "Терра, 1999",
                "Терра,1999",
                "Художественная литература, 2000",
                "Эксмо",
                "Эксмо, 2003",
                "Эксмо, 2007",
                "Эксмо, 2009",
                "Эксо, 2008",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

settings.corpusinfo.parrus = {
    urn: "[to be added]",
    metadata_urn: "urn:nbn:fi:lb-20140730173",
    lbr_id: "urn:nbn:fi:lb-2014052710",
    licence: {
        name: "CLARIN RES +PLAN +NC +INF +ND",
        url: "urn:nbn:fi:lb-2016042705",
    },
    homepage_url: "https://mustikka.uta.fi/",
};


/* ParFin 2016 common */

settings.corpusinfo.parfin_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    lbr_id: "urn:nbn:fi:lb-2017020601",
    homepage_url: "https://mustikka.uta.fi/",
};

sattrlist.parfin_2016_base = {
    link_text_code: {
        label: "text_id"
    },
    link_text_author: {
        label: "author"
    },
    link_text_title: {
        label: "title"
    },
    link_text_publisher: {
        label: "publisher"
    },
    link_text_year: {
        label: "year",
    },
    link_text_yearorig: {
        label: "year_orig",
    },
    link_text_yeartr: {
        label: "year_transl",
    },
    sentence_id: sattrs.sentence_id_hidden
};

sattrlist.parfin_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Haahtela Joel",
                "Hotakainen Kari",
                "Katz Daniel",
                "Konkka Anita",
                "Krohn Leena",
                "Lassila Maiju",
                "Lehtolainen Leena",
                "Linna Väinö",
                "Mäkelä Hannu",
                "Oksanen Sofi",
                "Rimminen Mikko",
                "Salminen Arto",
                "Sillanpää Frans Emil",
                "Sinisalo Johanna",
                "Tuuri Antti",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Ei-kuori",
                "Ennen päivänlaskua ei voi",
                "Ensimmäinen murhani",
                "Harmin paikka",
                "Hullun taivaassa",
                "Ihmisen vaatteissa",
                "Ihmiset suviyössä",
                "Joki virtaa",
                "Juoksuhaudantie",
                "Kun isoisä suomeen hiihti",
                "Kuparisydän",
                "Pekka Peloton",
                "Perhoskerääjä",
                "Puhdistus",
                "Pussikalja",
                "Sfinksi vai robotti",
                "Tulitikkuja lainaamassa",
                "Tuntematon sotilas",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "Kansa",
                "Otava",
                "Tammi",
                "Teos",
                "WSOY",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_year_orig: {
            label: "year",
        },
    }
);

sattrlist.parfin_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_fi,
    {
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Бесстрашный Пекка",
                "В одежде человека",
                "В сумасшедших небесах",
                "За спичками",
                "Змеи в раю",
                "Как мой прадедушка на лыжах прибежал в Финляндию",
                "Люди в летней ночи",
                "Медное сердце",
                "Мое первое убийство",
                "Неизвестный солдат",
                "Очищение",
                "Река течет через город",
                "Роман с пивом",
                "Собиратель бабочек",
                "Спасибо, нет",
                "Сфинкс или робот",
                "Тролль",
                "Улица окопная",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
            displayType: "select",
            dataset: [
                "Виролайнен, Лаура and Иоффе, Элеонора",
                "Джафарова-Виитала, Таисья",
                "Зощенко, M.",
                "Иоффе, Элеонора",
                "Мельник, Татьяна",
                "Муравин, Геннадий",
                "Муравин, Геннадий and Каменская, Е.",
                "Олыкайнен, Лео and Олыкайнен, Леонид",
                "Прилежаев, Иван",
                "Сидорова, Анна",
                "Смирнов Владимир",
                "Смирнов, Владимир and Марцина, И.",
                "Тиновицкая, Евгения",
                "Урецкий, Илья",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "Азбука-классика",
                "Амфора",
                "Астрель",
                "Вяжевич, А.С",
                "Государственное издательство художественной литературы",
                "Едиториал УРСС",
                "КомКнига",
                "Лимбус Пресс, Издательство К. Тублина",
                "Прогресс",
                "Самокат",
                "Текст",
                "Художественная литература",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

attrlist.parfin_2016_fi = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_ud_fi,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_ud_fi,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden
};

attrlist.parfin_2016_ru = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_uta_ru,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_uta_ru,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden
};


/* ParRus 2016 common */

attrlist.parrus_2016_fi = $.extend(
    true, {}, attrlist.parfin_2016_fi);

attrlist.parrus_2016_ru = $.extend(
    true, {}, attrlist.parfin_2016_ru);

sattrlist.parrus_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Бабель И.",
                "Булгаков М.А.",
                "Гоголь Н.В.",
                "Горький М.",
                "Достоевский Ф.М.",
                "Дудинцев В.",
                "Зощенко М.",
                "Ильф И., Петров Е.",
                "Лермонтов М.Ю.",
                "Лесков Н.",
                "Маринина А.",
                "Пушкин А.С.",
                "Семенов Ю.",
                "Трифонов Ю.",
                "Троепольский Г.",
                "Тургенев И.С.",
                "Улицкая Л.",
                "Фадеев А.",
                "Чехов А.П.",
                "Шолохов М.А.",
                "Шукшин В.М.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Агафья",
                "Актерская гибель",
                "Аристократка",
                "Барышня-крестьянка",
                "Беглец",
                "Белые одежды",
                "Белый Бим черное ухо",
                "Брат Юрочка / Сквозная линия",
                "Братья Карамазовы",
                "В овраге",
                "В потемках",
                "Ванька",
                "Ведьма",
                "Верую!",
                "Выстрел",
                "Герой нашего времени",
                "Гриша",
                "Дама с собачкой",
                "Дачники",
                "Дворянское гнездо",
                "Детвора",
                "Диана / Сквозная линия",
                "Добрый немец",
                "Дом на набережной",
                "Дом с мезонином",
                "Дорогие уроки",
                "Дочь Альбиона",
                "Житейская мелочь",
                "За все надо платить",
                "Записки из подполья",
                "Злоумышленник",
                "Змеиный яд",
                "Знакомый мужчина",
                "Золотой теленок",
                "Иисусов грех",
                "Искусство жить / Сквозная линия",
                "Капитанская дочка",
                "Конец сюжета / Сквозная линия",
                "Король",
                "Крепкий мужик",
                "Крыжовник",
                "Кухарка женится",
                "Лишние люди",
                "Лошадиная фамилия",
                "Любовь",
                "Макар Чудра",
                "Мальчики",
                "Мастер и Маргарита",
                "Мертвые души",
                "Метель",
                "Мечты",
                "Мститель",
                "Мужики",
                "Налим",
                "Нервные люди",
                "Несчастье",
                "Неудача",
                "Нищий",
                "Ночное происшествие",
                "Ночь на кладбище",
                "Ночь перед судом",
                "Осенью",
                "Отец семейства",
                "Очарованный странник",
                "Папаша",
                "Пересолил",
                "Пиковая дама",
                "Предварительные итоги",
                "Преступление и наказание",
                "Произведение искусства",
                "Разгром",
                "Роман с контрабасом",
                "Свадьба с генералом",
                "Семнадцать мгновений весны",
                "Сирена",
                "Смерть и немного любви",
                "Смерть чиновника",
                "Собачье сердце",
                "Событие",
                "Старость",
                "Старуха Изергиль",
                "Страшная ночь",
                "Счастливчик",
                "Счастливый случай / Сквозная линия",
                "Счастье",
                "Тайный советник",
                "Тарас Бульба",
                "Театральный роман",
                "Тихий Дон, ч. 1",
                "Толстый и тонкий",
                "Тоска",
                "Устрицы",
                "Хамелеон",
                "Хирургия",
                "Хористка",
                "Челкаш",
                "Шинель",
                "Явление природы / Сквозная линия",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "",
                "Эксмо",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

sattrlist.parrus_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
        link_text_author: {
            label: "author",
            displayType: "select",
            dataset: [
                "Аксенов В.",
                "Бабель И.",
                "Бакланов Г.",
                "Белов В.",
                "Булгаков М.А.",
                "Гоголь Н.В.",
                "Горький М.",
                "Достоевский Ф.М.",
                "Дудинцев В.",
                "Ерофеев В.",
                "Зощенко М.",
                "Ильф И., Петров Е.",
                "Лермонтов М.Ю.",
                "Лесков Н.",
                "Маринина А.",
                "Олеша Ю.",
                "Приставкин А.",
                "Пушкин А.С.",
                "Распутин В.",
                "Семенов Ю.",
                "Солженицын А.И.",
                "Стругацкие А. и Б.",
                "Толстая Т.",
                "Трифонов Ю.",
                "Троепольский Г.",
                "Тургенев И.С.",
                "Улицкая Л.",
                "Фадеев А.",
                "Чехов А.П.",
                "Шолохов М.А.",
                "Шукшин В.М.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_translator: {
            label: "translator",
            displayType: "select",
            dataset: [
                "A.W--",
                "Aarto A.",
                "Adrian E.",
                "Adrian, Esa",
                "Ahava Juho, Hämeen-Anttila V.",
                "Ahava, Juho, Hameen-anttila, Vaino",
                "Anhava M.",
                "Elias Siippainen",
                "Halonen J.A.",
                "Heino U.-L.",
                "Heino Ulla-Liisa",
                "Heino, Ulla-Liisa",
                "Hollo J.",
                "Hollo Juho",
                "Hollo, Juho",
                "Hollo, Juho Anselmi",
                "Holm L.",
                "Iranto L.",
                "Jalkanen, Huugo",
                "Juhani Konkka",
                "Kallama, Valto",
                "Konkka J.",
                "Konkka Juhani",
                "Konkka, Juhani",
                "Koskinen M.",
                "Kuukasjärvi Olli",
                "Laaksonen H.",
                "Lahtela M.",
                "Losowitch K.",
                "M.-W.",
                "Mitrošin A.",
                "Orlov Vappu",
                "Pesonen, Pekka Alarik",
                "Pienimäki N.",
                "Pikkupeura A.",
                "Pyykkö L.",
                "Pyykkö Lea",
                "Rymin R., Parkkinen P.",
                "Samuli S.",
                "Samuli Suomalainen",
                "Silvanto, Reino",
                "Viitanen Liisa",
                "Wuori M.",
                "c.-s.",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_title: {
            label: "title",
            displayType: "select",
            dataset: [
                "Aateliskoti",
                "Aatelisneiti talonpoikaistyttönä",
                "Agafja",
                "Aikamme sankari",
                "Aikamme uros",
                "Albionin tytär",
                "Alustava tilinpäätös",
                "Aristokraatti",
                "Bim mustakorva",
                "Diana / Naisten valheet",
                "Ei onnistunut!",
                "Elä ja muista",
                "Elämän pikkuseikka",
                "Elämäntaito / Naisten valheet",
                "Griša",
                "Haaveita",
                "Halu elää",
                "Hammaskirurgi",
                "Herra salaneuvos",
                "Herrasneitti-talonpoikalaistyttö",
                "Hevosenkaltainen sukunimi",
                "Hiljaa virtaa Don",
                "Hiljainen Don",
                "Huvila-asukkaita",
                "Häät kenraalin kera",
                "Isergil-muori",
                "Isä-kulta",
                "Ivan Denisovitšin päivä",
                "Jeesuksen synti",
                "Joki nimeltä Ockerville",
                "Jura-veli / Naisten valheet",
                "Kaikesta täytyy maksaa",
                "Kalliita kielitunteja",
                "Kameleontti",
                "Kapronkuusi",
                "Kapteenin tytär",
                "Kapteenintytär",
                "Karamazovin veljekset",
                "Karkuri",
                "Karviaismarjoja",
                "Kateus",
                "Kauhunyö",
                "Keittäjätär menee naimisiin",
                "Kellariloukko",
                "Kerjäläinen",
                "Kevään seitsemäntoista hetkeä",
                "Kireähermoista väkeä",
                "Kirje isoisälle",
                "Kirjoituksia kellarista",
                "Koiran sydän",
                "Kostaja",
                "Kova äijä",
                "Kultainen vasikka",
                "Kultaportailla istuivat",
                "Kun pupujussi lensi ilmapalloilla",
                "Kuningas",
                "Kunnon saksalainen",
                "Kuolema ja vähän rakkautta",
                "Kuolleet sielut",
                "Kuorotyttö",
                "Käärmeenmyrkky",
                "Lankomies Sergei Sergejevitš",
                "Lapsia",
                "Laukaus",
                "Liikaa suolaa",
                "Lumimyrsky",
                "Lumottu vaeltaja",
                "Luonnonilmiö / Naisten valheet",
                "Made",
                "Makar Tšudra",
                "Matkalippu tähtiin",
                "Mestari",
                "Mielipaha",
                "Mille pardons, madame!",
                "Minä uskon!",
                "Moskova-Petuški",
                "Nainen ja sylikoira",
                "Nainen koiran kanssa",
                "Nainen, jolla oli koira",
                "Naistennaurattaja",
                "Noita",
                "Nolla-nolla kokonaista",
                "Nuoren Vaganovin kärsimykset",
                "Näyttelijän lähtö",
                "Onnekas sattuma / Naisten valheet",
                "Onnenpoika",
                "Onnettomuus",
                "Onni",
                "Osterit",
                "Pahantekijä",
                "Pakoyritys",
                "Paksukainen ja ohukainen",
                "Patarouva",
                "Perheen isä",
                "Pimeässä",
                "Poika helvetistä",
                "Poikia",
                "Puhujan tehokeino",
                "Päivä Stalinin keskitysleirissä",
                "Päällystakki",
                "Päällysviitta",
                "Rakastaa - ei rakasta",
                "Rakkaus",
                "Rikos ja rangaistus",
                "Romaani bassoviulusta",
                "Rotkossa",
                "Saatana saapuu Moskovaan",
                "Seireeni",
                "Shura-kulta",
                "Sonja",
                "Sormeton",
                "Surkea tapaus",
                "Suru",
                "Syksyllä",
                "Synnyinmaan puolesta",
                "Taiteen tuote",
                "Taiteilijan tarina",
                "Talo rantakadulla",
                "Talonpoikia",
                "Tanssiva Šiva",
                "Tapahtui ravintolassa",
                "Tapaus yöllä",
                "Taras Bulba",
                "Tarinan loppu / Naisten valheet",
                "Tarpeettomia ihmisiä",
                "Teatteriromaani",
                "Teurastus",
                "Tuho",
                "Tuttu mies",
                "Tuttu tarina",
                "Tšelkaš",
                "Valitsen asuinkylää",
                "Valkeat vaatteet",
                "Vanhuus",
                "Vartijaton Aljoša",
                "Versio",
                "Viitta",
                "Virkamiehen kuolema",
                "Yö ennen oikeudenkäyntiä",
                "Yö hautausmaalla",
                "Yöpyi pilvi kultainen",
                "Äidin sydän",
            ],
            localize: false,
            opts: liteOptions,
        },
        link_text_publisher: {
            label: "publisher",
            displayType: "select",
            dataset: [
                "Churberg",
                "Edlund",
                "Gummerus",
                "Hki, Kustannusosakeyhtiö",
                "Holm",
                "K.E. Holm",
                "Kansankulttuuri",
                "Karisto",
                "Kirjayhtymä",
                "Oma",
                "Otava",
                "Petroskoi, KSNT",
                "Päivälehti",
                "SN-kirjat",
                "Siltala",
                "Smia",
                "Suomen kuvalehti",
                "Tammi",
                "Valvoja (lehti)",
                "WSOY",
                "null",
            ],
            localize: false,
            opts: liteOptions,
        },
    }
);

settings.corpusinfo.parrus_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    lbr_id: "urn:nbn:fi:lb-2017020601",
    homepage_url: "https://mustikka.uta.fi/",
};


/* SINEBRYCHOFF */

attrlist.sinebrychoff = {
    //footnote: attrs.word_note
};

sattrlist.sinebrychoff = {
    text_url: sattrs.original_url,
    text_date: {label: "date"},
    text_sender: { label: "topling_from" },
    text_receiver: { label: "topling_to"},
    text_id: { label: "text_id" }
};



// EuroParl

sattrlist.europarl_v7 = {
    text_title: sattrs.text_title,
    sentence_id: sattrs.sentence_id_hidden,

    sentence_type: {
        label: "sentence_type",
        displayType: "select",
        opts: liteOptions,
        dataset: {
            "meta": "meta",
            "speech": "speech"
        },
        translation: {
            "meta": {
                // "en": "meta",
                "fi": "meta",
                // "sv": "meta",
            },
            "speech": {
                // "en": "speech",
                "fi": "puhe",
                // "sv": "speech",
            },
        },
    },

    sentence_line: {
        label: "sentence_line",
    },
    text_filename: {
        label: "file_name",
    },
    chapter_title: {
        label: "chapter_title",
    },
    chapter_id: {
        label: "chapter_id",
        displayType: "hidden",
    },
    speaker_id: {
        label: "speech_speakerid",
        displayType: "hidden",
    },
    speaker_name: {
        label: "speech_speakername"
    },
    speaker_aff: {
        label: 'speaker_affiliation',
        displayType: "select",
        // No translations for this key (2021-09-15)
        // translationKey: "europarl_v7_aff_",
        dataset: {
            "und": "und"
        }
    },
    speaker_lang: {
        label: "speech_language",
        displayType: "select",
        opts: liteOptions,
        dataset: {
            "BG": "bg",
            "CS": "cs",
            "DA": "da",
            "DE": "de",
            "EL": "el",
            "EN": "en",
            "ES": "es",
            "ET": "et",
            "EU": "eu",
            "FI": "fi",
            "FR": "fr",
            "GA": "ga",
            "HU": "hu",
            "IT": "it",
            "LT": "lt",
            "LV": "lv",
            "MT": "mt",
            "NL": "nl",
            "PL": "pl",
            "PT": "pt",
            "RO": "ro",
            "SK": "sk",
            "SL": "sl",
            "SV": "sv",
            "und": "und"
        },
        translation: transl.langEuroParl,
    }
};


/* KFSPC */
sattrlist.kfspc = {
    sentence_id: sattrs.sentence_id_hidden,
    text_distributor: sattrs.text_distributor,
    text_h_title2: sattrs.text_title,
    text_pubdate2: sattrs.text_pubdate,
    text_publisher: sattrs.text_publisher
};

settings.corpusinfo.kfspc = {
    urn: "urn:nbn:fi:lb-201406035",
    metadata_urn: "urn:nbn:fi:lb-201406036",
    licence: settings.licenceinfo.CC_BY,
};


/* JRC-ACQUIS */

sattrlist.jrc_acquis = {
    sentence_id: sattrs.sentence_id_hidden,
    text_year: {
        label: "year"
    },
    text_title: sattrs.text_title,
    text_filename: {
        label: "file_name",
    }
};


/* TOPLING */

attrlist.topling = {
    type: attrs.wordtype
};

sattrlist.topling = {
    sentence_id: sattrs.sentence_id_hidden,
    text_id: {
        label: "text_id"
        },
    text_student: {
        label: "text_studentno"
        },
    file_edulevel: {
        label: "file_edulevel"
        },
    text_year: {
        label: "year"
        },
    file_round: {
        label: "file_round"
        },
    file_levelops: {
        label: "file_levelops"
        },
    file_exercise: {
        label: "file_exercise"
        },
    file_filetype: {
        label: "file_filetype"
        }
};



/* --------- */


// Functions used in corpus configurations
funcs = {};


// Add corpusIds to the "contents" array of corpusfolder folderName.
// Arguments:
// - folderName: a string that is a property (folder) in
//   settings.corporafolders. folderName may specify subfolders as
//   separated by dots: "a.b.c" denotes settings.corporafolders.a.b.c
// - corpusIds: a single corpus id string or an array of corpus them
//   to be added to the contents of folderName
// - options: an object of options; the only currently supported
//   option is:
//   - prepend: if true, prepend corpusIds to contents instead of
//     appending
funcs.addCorporaToFolder = function (folderName, corpusIds, options = {}) {
    let folder = settings.corporafolders
    for (let subfolderName of folderName.split(".")) {
        folder = folder[subfolderName]
    }
    if (_.isString(corpusIds)) {
        corpusIds = [corpusIds]
    }
    if (folder.contents == undefined) {
        folder.contents = []
    }
    const addFunc = (options.prepend ? "unshift" : "push")
    if (options.prepend) {
        // As the corpus ids are added one at a time, reverse the
        // array when prepending, so that their order is preserved.
        corpusIds.reverse()
    }
    for (let corpusId of corpusIds) {
        folder.contents[addFunc](corpusId)
    }
}


// Homepage in Kotus's Kaino service
funcs.kaino_homepage = function(urlbase) {
    return {
        name: "Kokoelman etusivu",
        url: "http://kaino.kotus.fi/korpus/" + urlbase + "_coll_rdf.xml",
        no_label: true
    };
};


// An array of properties of corpus attributes to be added based on
// other properties. Each element is an object with the properties
// "test" (a function returning true for the attribute object if the
// extra properties should be added) and "props" (an object containing
// the extra properties to be added).
settings.attr_extra_properties = [
    {
        // If displayType == "select", add property extendedComponent.
        test: function (attr) {
            return "displayType" in attr && attr.displayType == "select";
        },
        props: {
            extendedComponent: "datasetSelect",
            // extended_template: selectType.extended_template,
            // controller: selectType.controller
        }
    }
];


/*
 * Generic functions
 *
 * These could perhaps be moved to util.js or to a script file of
 * their own or a plugin.
 */


// corporafolder properties that are not names of subfolders.
// Represented as an object instead of an array, so that we can use
// the JavaScript "in" operator.
settings.corporafolder_properties = {
    title: "",
    description: "",
    contents: "",
    info: "",
    unselected: ""
};


// Remove non-existing or irrelevant corpora (and folders) based on
// the server from which the code is being run.
//
// NOTE: These functions have less use now that the corpus
// configurations for unavailable corpora are removed by default
// (util.removeUnavailableCorpora).
//
// funcs.remove_empty_corporafolders has been replaced by
// util.removeEmptyCorporafolders, but there is not yet an exact
// replacement for funcs.remove_matching_corpora that would
// remove corpora based on regular expressions.
//
// TODO: Remove these functions from here when a replacement for
// funcs.remove_matching_corpora has been implemented in util.


// Recursively remove corpora folders in folder containing no corpora
// (or folders) that are in settings.corpora. Returns true if folder
// is empty.
funcs.remove_empty_corporafolders = function (folder) {
    var empty = true;
    if ("contents" in folder) {
        var new_contents = [];
        for (var i = 0; i < folder.contents.length; i++) {
            var corpname = folder.contents[i];
            if (corpname in settings.corpora) {
                new_contents.push(corpname);
            }
        }
        if (new_contents.length == 0) {
            delete folder.contents;
        } else {
            folder.contents = new_contents;
            empty = false;
        }
    }
    for (var prop in folder) {
        if (folder.hasOwnProperty(prop)
            && ! (prop in settings.corporafolder_properties)) {
            if (funcs.remove_empty_corporafolders(folder[prop])) {
                delete folder[prop];
            } else {
                empty = false;
            }
        }
    }
    return empty;
}

// Remove from settings.corpora corpora whose property name (id)
// matches one of regular expressions (as strings) in corplist. If the
// second argument is true, remove the corpora that do *not* match any
// of the regular expressions. After that, remove corpora folders that
// would be empty after removing the copora.
funcs.remove_matching_corpora = function (corplist) {
    var inverse = (arguments.length > 1 && arguments[1]);
    var corp_re = new RegExp("^(" + corplist.join ("|") + ")$");
    for (var corpus in settings.corpora) {
        var matches = corp_re.test (corpus);
        if ((matches && ! inverse) || (inverse && ! matches)) {
            delete settings.corpora[corpus];
        }
    }
    funcs.remove_empty_corporafolders(settings.corporafolders);
};


// Add extra properties to corpus attributes based on other
// properties. This is currently used to add extended_template and
// controller to attributes with displayType "select".
// Another approach would be to add these properties explicitly to all
// the relevant attribute objects, as Språkbanken have done. Both
// approaches probably have advantages and disadvantages (less
// redundancy vs. explicitness).


// Add the extra attibute properties in settings.attr_extra_properties
// to the appropriate attributes of corpora.
funcs.add_attr_extra_properties = function (corpora) {
    for (var corpname in corpora) {
        var corpus = corpora[corpname];
        var attr_group_names = ["attributes", "struct_attributes"];
        var attr_group_count = attr_group_names.length;
        for (var groupnum = 0; groupnum < attr_group_count; groupnum++) {
            if (attr_group_names[groupnum] in corpus) {
                var attrs = corpus[attr_group_names[groupnum]];
                var extra_props_count = settings.attr_extra_properties.length;
                for (var attrname in attrs) {
                    for (var i = 0; i < extra_props_count; i++) {
                        var attr_extra_props =
                            settings.attr_extra_properties[i];
                        var attr = attrs[attrname];
                        if (attr_extra_props.test(attr)) {
                            var props = attr_extra_props.props;
                            for (var prop in props) {
                                if (props.hasOwnProperty(prop)
                                    && ! attr.hasOwnProperty(prop)) {
                                    attr[prop] = props[prop];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


// Add corpus aliases that are expanded to the corpus ids matching the
// regular expression string corpus_id_patt (actually, a
// comma-separated list of regular expressions matching corpus ids).
//
// In addition to the explicitly specified corpus aliases, the
// function also adds variants with and without a "-korp" suffix and
// with underscores converted to dashes and dashes to underscores. If
// the specified corpus aliases contain an alias with "-korp-" or
// "_korp_" infix, also aliases without it are added.
//
// The optional third argument is an object containing options. The
// following options are supported:
//   override: if true, override an existing alias (default: no)
//   add_variants: if false, do not add the alias variants (default:
//     true)
funcs.add_corpus_aliases = function (corpus_id_patt, aliases) {
    var opts = arguments[2] || {};
    var override = opts.override || false;
    var add_variants = (opts.add_variants !== false);

    var add_dash_underscore_variants = function (aliases, alias) {
        if (alias.indexOf("_") > -1) {
            aliases.push(alias.replace(/_/g, "-"));
        }
        if (alias.indexOf("-") > -1) {
            aliases.push(alias.replace(/-/g, "_"));
        }
    }

    if (! _.isArray(aliases)) {
        aliases = [aliases];
    }
    for (var i = 0; i < aliases.length; i++) {
        var alias = aliases[i]
        var aliases2 = [alias];
        var alias2;
        if (add_variants) {
            // Add alias variants:
            // x -> x, x-korp, x_korp
            // x-y | x_y | x-y-korp | x_y_korp -> x-y, x_y, x-y-korp, x_y_korp
            add_dash_underscore_variants(aliases2, alias);
            // This may add some aliases twice to alias2, but that
            // does not matter in the end.
            if (alias.match(/[_-]korp($|[_-])/)) {
                alias2 = alias.replace(/[_-]korp($|[_-])/, "$1");
                aliases2.push(alias2)
                add_dash_underscore_variants(aliases2, alias2);
            } else {
                aliases2.push(alias + "-korp");
                add_dash_underscore_variants(aliases2, alias + "-korp");
            }
        }
        for (var j = 0; j < aliases2.length; j++) {
            alias2 = aliases2[j];
            if (override || ! (alias2 in settings.corpus_aliases)) {
                settings.corpus_aliases[alias2] = corpus_id_patt;
            }
        }
    }
};


// Add corpus settings for multiple corpora using a template, modified
// with items in infolist, added to folder, with the id constructed
// using id_templ.
//
// Arguments:
// - template: the common definitions for all the corpora
// - infolist: one of the following:
//   1. an array of objects with properties with which to extend the
//      template (should contain the property "id", which is treated
//      as the variable part of the corpus id),
//   2. an array of strings treated as (the variable parts of) corpus
//      ids, or
//   3. an array of two integers (typically years), which denote the
//      start and end values (inclusive) for the variable parts of the
//      ids (converted to strings).
// - folder: the corpus folder to whose "contents" property the
//   corpora are added
// - id_templ: a template for the corpus id: "{}" is replaced with the
//   variable part of the id value taken from the infolist item; if no
//   "{}", treated as a prefix to the id
//
// Occurrences of "{}" in the title, description and id_templ are
// replaced with the variable part of the id specified in the infolist
// item.

funcs.add_corpus_settings = function (template, infolist, folder, id_templ) {
    var ids = [];
    // Replace {} with the id in infolist in these properties:
    var id_subst_props = ["title", "description"];

    var add_info = function (info) {
        var info_is_string = (typeof info == "string");
        var id_varpart = (info_is_string ? info : info.id);
        var id = (id_templ.indexOf("{}") > -1
                  ? id_templ.replace(/{}/g, id_varpart)
                  : id_templ + id_varpart);
        // Make a deep copy so that the resulting objects can be
        // safely modified independently of each other if necessary.
        settings.corpora[id] = $.extend(true, {}, template);
        var config = settings.corpora[id];
        if (! info_is_string) {
            $.extend(config, info);
        }
        config.id = id;
        for (var j = 0; j < id_subst_props.length; j++) {
            var propname = id_subst_props[j];
            config[propname] = config[propname].replace(/{}/g, id_varpart);
        }
        ids.push(id);
    };

    if (infolist.length == 2 && Number.isInteger(infolist[0])) {
        for (var id = infolist[0]; id <= infolist[1]; id++) {
            add_info(id.toString());
        }
    } else {
        for (var i = 0; i < infolist.length; i++) {
            add_info(infolist[i]);
        }
    }
    if (folder != null) {
        if (! ("contents" in folder)) {
            folder.contents = [];
        }
        folder.contents = folder.contents.concat(ids);
    }
};


// Add properties to the settings of the listed corpora.
funcs.extend_corpus_settings = function (props, corpus_ids) {
    for (var i = 0; i < corpus_ids.length; i++) {
        $.extend(true, settings.corpora[corpus_ids[i]], props);
    }
};


// Generate a declaration for an attribute with Boolean values.
// Arguments:
// - label: attribute translation label
// - yes_no: an array of two items: the corpus values for "yes" and
//   "no"; if omitted, use "y" and "n".
funcs.make_bool_attr = function (label, yes_no) {
    var dataset = {};
    if (arguments.length < 2) {
        dataset = {
            "y": "yes",
            "n": "no",
        };
    } else {
        dataset[yes_no[0]] = "yes";
        dataset[yes_no[1]] = "no";
    }
    return {
        label: label,
        displayType: "select",
        opts: liteOptions,
        dataset: dataset,
        translation: transl.yesno,
    };
};


// Add an explanation to specific values of an attribute in the
// sidebar. The explanation text is localized, in grey italics,
// enclosed in square brackets. This function is inteded to be used in
// the value of the "pattern" property of an attribute declaration.
// Arguments:
// - value: the value of the attribute
// - value_map: an object whose keys are attribute values to be
//   explained and their values are the explanations of the attribute
//   values corresponding to the keys
// Example:
//   pattern: "<%=funcs.make_explained_value(val, {'0': 'no_quote'})%>",
funcs.make_explained_value = function (value, value_map) {
    if (value in value_map) {
        value += (" <i style=\"color: grey;\">[<span rel=\"localize["
                  + value_map[value] + "]\"></span>]</i>");
    }
    return value;
};


// Add a zero-width space before "T" to allow more logical
// line-breaking of an ISO datetime value.
funcs.stringify_iso_datetime = function (val) {
    return val.replace(/T/g, "<wbr>T");
};


// Recursively create a corpus folder hierarchy under parent_folder
// and the configurations for its corpora. The hierarchy is specified
// in subfolder_tree, and options control how the data is mapped to
// the configuration. The function returns an object with the
// properties id (folder or corpus id) and data (folder or corpus
// configuration object).
//
// The subfolder_tree is an array of the format:
// [[ folder1_data, [[ subfolder11_data, [ corpus111_data, corpus112_data ]],
//                   [ subfolder12_data, [ corpus121_data, corpus122_data ]]],
// [[ folder2_data, [ corpus21_data, corpus22_data, corpus23_data ]]]
// Folder and corpus data may be an object containing the essential
// properties for the item, or one to four array elements, the last of
// which may be a composite object and the preceding ones strings. The
// strings are the (base) values for the properties id, title and
// description. These values will be modified as specified in options.
// If one is not specified, the previous one is used. The possible
// final composite object is used to override other properties in the
// configuration template specified in options.
//
// options is an object that may contain the following properties:
// - folder_template, corpus_template: An object to be used as the
//   base configuration properties for folders and corpora,
//   respectively (default: {})
// - ({folder,corpus}_){id,title,description}_{prefix,suffix}: A
//   string to be prefixed or suffixed to the id, title or description
//   of folders and/or corpora (default: empty)
// - make_{folder,corpus}_{id,title,description}: A function to use to
//   make the id, title or description of a folder or corpus;
//   arguments info (the folder or corpus data in subfolder_tree),
//   parent_folder (settings.corporafolders subobject),
//   ancestor_folder_ids (an array of strings containing the ancestor
//   folder ids from the top to the parent); should return a string.
//   The function is used in preference to the prefix and suffix
//   properties above
//
// TODO: Would this function be better in the util module? Or maybe a
// separate util_config?

funcs.make_folder_hierarchy = function (parent_folder, subfolder_tree,
                                        options) {

    // Return a function for making the folder or corpus (depending on
    // the argumet "type") config object with the given options.
    function get_make_info_fn (type, options) {
        var info_strings = ["id", "title", "description"];
        return function (info, parent_folder, ancestor_folder_ids) {
            var result = {};
            result.data = $.extend(true, {}, options[type + "_template"] || {});
            var last_infoitem = info[info.length - 1];
            var last_stringinfo_nr = info.length - 1;
            if (typeof last_infoitem != "string") {
                result.data = $.extend(true, result.data, last_infoitem);
                last_stringinfo_nr--;
            }
            for (var itemnr = 0; itemnr < info_strings.length; itemnr++) {
                var infostr = info_strings[itemnr];
                var make_fn = options["make_" + type + "_" + infostr];
                if (make_fn) {
                    result.data[infostr] = make_fn (info, parent_folder,
                                                    ancestor_folder_ids)
                } else {
                    info_itemnr = (itemnr <= last_stringinfo_nr
                                   ? itemnr : last_stringinfo_nr);
                    result.data[infostr] =
                        (options[type + "_" + infostr + "_prefix"]
                         || options[infostr + "_prefix"] || "")
                        + info[info_itemnr]
                        + (options[type + "_" + infostr + "_suffix"]
                           || options[infostr + "_suffix"] || "");
                }
            }
            result.id = result.data.id;
            if (type == "folder") {
                delete result.data.id;
            }
            // c.log('folder hierarchy:', type, parent_folder, info, '->', result);
            return result;
        }
    }

    var make_folder_fn = options.make_folder || get_make_info_fn("folder",
                                                                 options);
    var make_corpus_fn = options.make_corpus || get_make_info_fn("corpus",
                                                                 options);
    var ancestor_ids = (arguments.length > 3 ? arguments[3] : []);
    for (var i = 0; i < subfolder_tree.length; i++) {
        var subfolder_info = subfolder_tree[i];
        var subsubfolders = subfolder_info[subfolder_info.length - 1];
        if (_.isArray(subsubfolders) && subsubfolders.length) {
            var folder_info = make_folder_fn(subfolder_info.slice(0, -1),
                                             parent_folder, ancestor_ids)
            var subfolder = folder_info.data;
            parent_folder[folder_info.id] = subfolder;
            funcs.make_folder_hierarchy(
                subfolder, subsubfolders, options,
                ancestor_ids.concat([folder_info.id]));
        } else {
            var corpus_info = $.extend(
                true, {}, make_corpus_fn(subfolder_info, parent_folder,
                                         ancestor_ids));
            if (! ("contents" in parent_folder)) {
                parent_folder.contents = [];
            }
            parent_folder.contents
                = parent_folder.contents.concat([corpus_info.id]);
            settings.corpora[corpus_info.id] = corpus_info.data;
        }
    }
};


// Add "order" properties to the attribute definitions in attrstruct
// for setting the order of attributes. attrnamelist lists the names
// of the attribute in the desired order: it can be either an array of
// strings or a single string of names separated by spaces (or tabs).
funcs.set_attr_order = function (attrstruct, attrnamelist) {
    if (typeof attrnamelist == "string") {
        attrnamelist = attrnamelist.split(/[ \t]+/);
    }
    var attrnamecount = attrnamelist.length;
    for (var i = 0; i < attrnamelist.length; i++) {
        // The attribute with the smallest order value is shown first;
        // this has been changed at some point.
        attrstruct[attrnamelist[i]].order = i;
    }
};


// Functions for the video page

// Return the milliseconds value ms0 formatted as hh:mm:ss.xxx
funcs.ms_to_hms = function (ms0) {
    // Adapted from https://stackoverflow.com/a/2998822
    var pad = function (num, len) {
        var s = "000" + Math.floor(num).toString();
        return s.substr(s.length - len);
    }
    ms0 = parseInt(ms0);
    var ms = pad(ms0 % 1000, 3);
    var s = pad(ms0 / 1000 % 60, 2);
    var m = pad(ms0 / 60000 % 60, 2);
    var h = pad(ms0 / 3600000, 1);
    return (h + ":" + m + ":" + s
            + util.getLocaleString("util_decimalseparator") + ms);
};


// Make the URL to the video page with information encoded in
// parameters.
//
// This function is tailored to generate the value for a synthetic
// attribute. This function was developed for the Eduskunta corpus,
// but it aims to be more general-purpose. However, it might need to
// be modified (generalized further) when used for other corpora.
//
// Arguments:
// - corpus_id: the id of the corpus linking to the video page
// - token_data: the token data passed to the stringify_synthetic
//   function
// - video_url: the URL of the original video shown on the video page
// - msec2sec_attrs: ids of structural attributes whose values should
//   be converted from milliseconds to seconds
// - omit_attrs: the structural attributes not to be passed to the
//   video page
funcs.make_videopage_url = function (corpus_id, token_data, video_url,
                                     msec2sec_attrs, omit_attrs) {
    // console.log("funcs.make_videopage_url", token_data);
    var msec_to_sec = function (sec) {
        return (parseInt(sec) / 1000).toString();
    };
    var append_attr = function (key, val, attrdef, text_attrs) {
        var name = (util.getLocaleStringUndefined(attrdef.label)
                    || attrdef.label);
        if (name) {
            if (msec2sec_attrs.includes(key)) {
                val = msec_to_sec(val);
            } else if (attrdef.renderItem) {
                val = attrdef.renderItem(
                    key, val, attrdef, token_data.pos_attrs,
                    token_data.struct_attrs, token_data.tokens);
            } else if (attrdef.translation != null) {
                val = util.translateAttribute(null, attrdef.translation, val);
            } else if (val == "") {
                val = util.getLocaleString("unknown");
            }
            text_attrs[key] = name + "," + val;
        }
    };
    var make_licence_info = function (corpus_conf) {
        // A single quote does not seem to be encoded correctly, so
        // change single quotes to double ones. FIXME: This assumes
        // that single quotes are used only to delimit attribute
        // values.
        var licence_text = util.formatCorpusExtraInfo(
            corpus_conf, { info_items: ["licence"],
                           static_localization: true })
            .replace(/'/g, "\"");
        // A kludge to put the video licence first: assumes that its
        // localized label contains the string "video"
        return licence_text.replace(
            /^(.*?)(<br\s*\/?>)(Li.*?video.*)$/, "$3$2$1");
    };
    // Would it be better to declare the base URL (prefix) somewhere
    // else?
    var prefix = "markup/video_page.html#";
    var words = [];
    var tokens = token_data.tokens;
    var match_types = ["_matchSentence", "_match"];
    for (var i = 0; i < tokens.length; i++) {
        var word = tokens[i].word;
        for (var j = 0; j < match_types.length; j++) {
            var match_type = match_types[j];
            if (tokens[i][match_type]) {
                if (i == 0 || ! tokens[i - 1][match_type]) {
                    word = ("<span class=\"" + match_type.substr(1) + "\">"
                            + word);
                }
                if (i == tokens.length - 1 || ! tokens[i + 1][match_type]) {
                    word += "</span>";
                }
            }
        }
        words.push(word);
    }
    var text_attrs = {};
    var corpus_conf = settings.corpora[corpus_id];
    var attr_types = ["struct", "custom"];
    for (var i = 0; i < attr_types.length; i++) {
        var attr_type = attr_types[i] + "Attributes";
        for (var key in corpus_conf[attr_type]) {
            if (! omit_attrs.includes(key)) {
                var attrdef = corpus_conf[attr_type][key];
                // console.log(key, attrdef);
                append_attr(
                    key,
                    (attr_type == "structAttributes"
                     ? token_data.struct_attrs[key] : null),
                    attrdef, text_attrs);
            }
        }
    }
    var params = {
        lang: window.lang || settings.defaultLanguage,
        src: video_url,
        corpusname: corpus_conf.title,
        metadata_urn: corpus_conf.metadata_urn,
        licence_info: make_licence_info(corpus_conf),
        korp_url: window.location.href,
        utterance: "<span class=\"utterance\">" + words.join(" ") + "<span>",
        text_attributes: JSON.stringify(text_attrs),
    };
    // console.log(params);
    var paramstr = "";
    for (var key in params) {
        if (paramstr != "") {
            paramstr += "&";
        }
        paramstr += key + "=" + encodeURIComponent(params[key]);
    }
    return prefix + paramstr;
};



// Functions used for constructing settings.corpora and
// settings.corporafolders for corpora split by year; used for KLK
// (both fi and sv).


// Construct a list of years from start to end, years in opts.omit
// omitted, descending if opts.descending
funcs.make_yearlist = function(start, end, opts)
{
    var omit = [];
    var descending = false;
    var result = [];
    if (typeof opts !== 'undefined') {
        if ('descending' in opts) {
            descending = opts.descending;
        }
        if ('omit' in opts) {
            omit = opts.omit;
        }
    }
    for (var year = start; year <= end; year++) {
        if (omit.indexOf(year) == -1) {
            result.push(year);
        }
    }
    if (descending) {
        result.reverse();
    }
    return result;
}

// Construct corpus settings by year and corpus folder settings by
// decade
funcs.make_corpus_settings_by_year_decade = function(
    folder_parent, folder_name_format, corpus_name_format,
    make_folder_settings_fn, make_corpus_settings_fn, yearlist)
{
    var decade = 0;
    var prev_decade = 0;
    var contents = [];

    function make_decade(decade) {
        if (contents) {
            var folder_name = folder_name_format.replace("{decade}",
                                                         decade.toString());
            folder_parent[folder_name] = make_folder_settings_fn(decade);
            folder_parent[folder_name]["contents"] = contents;
        }
    }

    for (var yearnum = 0; yearnum < yearlist.length; yearnum++) {
        var year = yearlist[yearnum];
        decade = Math.floor(year / 10) * 10;
        if (decade != prev_decade && prev_decade != 0) {
            make_decade(prev_decade);
            contents = [];
        }
        var corpus_name = corpus_name_format.replace("{year}",
                                                      year.toString());
        contents.push(corpus_name);
        settings.corpora[corpus_name] = make_corpus_settings_fn(year,
                                                                corpus_name);
        settings.corpora[corpus_name]["id"] = corpus_name;
        prev_decade = decade;
    }
    make_decade(prev_decade);
};


// Construct settings contents for a single KLK corpus
funcs.make_klk_corpus_settings = function(
    title_format, descr_format, key_prefix, lang, year, parsed)
{
    var year_str = year.toString();
    var ctx_type = (year <= 1911 ? "sp" : "default");
    var attrs_key = (key_prefix + "_" + lang + (parsed ? "_parsed" : "")
                     + (year <= 1910 ? "_pagelinks" : ""));
    return {
        title: title_format.replace("{year}", year_str),
        description: descr_format.replace("{year}", year_str),
        // Korp 9 has window.spWithin but settings.defaultWithin
        within: (ctx_type == "sp"
                 ? window[ctx_type + "Within"]
                 : settings[ctx_type + "Within"]),
        context: window[ctx_type + "Context"],
        attributes: attrlist[attrs_key],
        structAttributes: sattrlist[attrs_key]
    };
}


// Functions used to make page URL attribute values

funcs.make_klk_url_base = function (data) {
    return ("http://digi.kansalliskirjasto.fi/"
            + data.struct_attrs.text_publ_type
            + "/binding/"
            + data.struct_attrs.text_binding_id);
};

// Return the argument word with non-word characters removed
funcs.remove_non_word_chars = function (word) {
    // Modified from
    // http://stackoverflow.com/questions/11598786/how-to-replace-non-printable-unicode-characters-javascript,
    // which was from
    // https://github.com/slevithan/XRegExp/blob/master/src/addons/unicode/unicode-categories.js#L28
    var non_word_chars_re = /[\0-\x2C\x2E\x2F\x3B-\x40\x5B-\x60\x7B-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
    return (word.replace(non_word_chars_re, "")
            // Remove word-initial and word-final colons; leave
            // hyphens intact.
            .replace(/^:+/, "")
            .replace(/:+$/, ""));
}

// Return the string of context_size words before and after
// token_data.pos_attrs.word.
funcs.find_context_words = function (token_data, context_size) {
    var main_word =
        funcs.remove_non_word_chars(token_data.pos_attrs.word);
    if (context_size == 0) {
        return main_word;
    }
    var wordnum = token_data.pos_attrs.ref - 1;
    var words = [];
    if (main_word) {
        words.push(main_word);
    }
    var numwords = 0;
    for (var i = wordnum - 1; i >= 0 && numwords < context_size; i--) {
        var word = funcs.remove_non_word_chars(token_data.tokens[i].word);
        if (word) {
            words.unshift(word);
            numwords++;
        }
    }
    var numtokens = token_data.tokens.length;
    numwords = 0;
    for (var i = wordnum + 1; i < numtokens && numwords < context_size; i++) {
        var word = funcs.remove_non_word_chars(token_data.tokens[i].word);
        if (word) {
            words.push(word);
            numwords++;
        }
    }
    return words.join(" ");
}

// Return a KLK page image URL for a token, with the specified context
// size.
funcs.make_klk_page_image_url = function (token_data, context_size) {
    var words = funcs.find_context_words(token_data, context_size);
    return (funcs.make_klk_url_base(token_data)
            + "?page=" + token_data.struct_attrs.text_page_no)
            + (words ? "&term=" + words : "");
}


// Common settings template for FTC, FSTC and Svenska Parole (may be
// overridden)
settings.templ.lemmie_common = {
    title: "",
    description: "",
    id: "",
    within: spWithin,
    context: spContext,
    limitedAccess: true,
    licenceType: "RES",
    attributes: {
    },
    structAttributes: {
        text_title: sattrs.text_title,
        text_creator: sattrs.author,
        text_publisher: sattrs.publisher,
        text_wordcount: {
            label: "text_word_count",
        },
        text_lemmie_id: {
            label: "lemmie_text_id",
        },
        text_lang: {
            label: "lang",
            displayType: "select",
            opts: liteOptions,
            dataset: [
                "fin",
                "eng",
                "swe",
            ],
            translation: transl.lang,
        },
        text_date: sattrs.date,
        text_filename: {
            label: "file_name",
        },
        text_rights: {
            label: "access_rights_cat",
        },
        text_contributor: {
            label: "contributor",
        },
        text_source: {
            label: "source",
            displayType: "select",
            localize: false,
            opts: liteOptions,
        },
        text_lemmie_corpus: {
            label: "lemmie_corpus",
        },
        // // Always empty
        // text_type: {
        //     label: "text_type",
        // },
        text_subject: {
            label: "subject",
        },
        paragraph_type: {
            label: "paragraph_type",
            displayType: "select",
            opts: liteOptions,
            dataset: {},
            translation: transl.paragraphType,
        },
        sentence_id: sattrs.sentence_id_hidden,
        sentence_within: {
            label: "enclosing_elems",
        },
    }
};


// Make a custom (structural) attribute for showing the video popup,
// based on other attribute values.
//
// If the values of (some of) the arguments baseURL, path, file, ext,
// startTime and endTime begin with an "@", the rest of the value is
// the name of the (structural) attribute from which to get the actual
// value; otherwise, the value is used as a constant value as such.
// The seventh argument is optional videoType: if not specified, its
// value defaults to "mp4".
//
// Generalized from ivipVideo in Språkbankens default_mode.js

var makeVideoAttr = function (baseURL0, path0, file0, ext0, startTime0, endTime0) {
    var videoType = (arguments[6] || "mp4");
    console.log("makeVideoAttr", startTime0, endTime0);
    return {
        label: "video",
        renderItem: function (key, value, attrs, wordData, sentenceData,
                              tokens) {
            var getValue = function (value) {
                return (value.startsWith("@")
                        ? sentenceData[value.slice(1)]
                        : value);
            };
            var baseURL = getValue(baseURL0);
            var startTime = getValue(startTime0);
            var endTime = getValue(endTime0);
            var path = getValue(path0);
            var file = getValue(file0);
            var ext = getValue(ext0);
            console.log("video renderItem", sentenceData, baseURL, startTime,
                        endTime, path, file, ext);
            var videoLink
                = $('<span class="link" rel="localize[show_video]"></span>');
            videoLink.click(function () {
                var url = baseURL + path + file + (ext ? "." + ext : "");
                var scope = angular.element("#video-modal").scope();
                scope.videos = [{"url": url, "type": "video/" + videoType}];
                scope.fileName = (file
                                  ? file + "." + ext
                                  : url.split("/").slice(-1)[0]);
                scope.startTime = startTime / 1000;
                scope.endTime = endTime / 1000;
                console.log("videoLink", scope.videos, scope.fileName,
                            scope.startTime, scope.endTime);
                // find start of sentence
                var startIdx = 0
                for (var i = wordData.position; i >= 0; i--) {
                    if (_.includes(tokens[i]._open, "sentence")) {
                        startIdx = i;
                        break;
                    }
                }
                // find end of sentence
                var endIdx = tokens.length - 1
                for (var i = wordData.position; i < tokens.length; i++) {
                    if (_.includes(tokens[i]._close, "sentence")) {
                        endIdx = i;
                        break;
                    }
                }
                scope.sentence =
                    _.map(tokens.slice(startIdx, endIdx + 1), "word").join(" ")
                scope.open();
                scope.$apply();
            });
            return videoLink;
        },
        customType: "struct",
    }
};


module.exports = {
    spWithin,
    spContext,
    spcWithin,
    defaultContext,
    attrs,
    sattrs,
    attrlist,
    sattrlist,
    funcs,
    transl,
    setOptions,
    liteOptions,
    makeVideoAttr,
}
