// -*- coding: utf-8 -*-

settings.primaryColor = "#ffe7d2";
settings.primaryLight = "#fff4eb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();


// Proper nouns for BYU and HCS2 annotations.
settings.placenameConstraint = "pos contains 'np1?' | pos='PROPNAME'";


settings.preselectedCorpora = [
//    "mulcold_en",
];


settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.english = {
    title: "English / Englanti",
    description: "Texts in English<br/>Englanninkielisiä tekstejä",
    cmc: {
        title: "Computer-mediated communications corpora / Tietokonevälitteistä viestintää",
        description: "Corpora containing computer-mediated communications<br/>Tietokonevälitteistä viestintää sisätläviä aineistoja",
    },
    academic: {
        title: "Academic texts / Akateemisia tekstejä",
        description: "Corpora containing academic texts<br/>Akateemisia tekstejä sisältäviä aineistoja",
    },
    historical: {
        title: "Historical corpora / Historiallisia aineistoja",
        description: "Historical corpora<br/>Historiallisia aineistoja",
        contents: [
            "hc",
        ],
    },
    learner: {
        title: "Learner corpora / Oppijankielen aineistoja",
        description: "Corpora of texts by learners of English (English as a second or foreign language)<br/>Englanninoppijoiden kieltä sisältäviä aineistoja (englantia toisena tai vieraana kielenä)",
        contents: [
            "topling_en",
        ],
    },
    reference: {
        title: "Reference corpora / Referenssiaineistoja",
        description: "Reference corpora<br/>Referenssiaineistoja",
    },
    spoken: {
        title: "Spoken language / Puheaineistoja",
        description: "Corpora of transliterated spoken language<br/>Litteroitua puhuttua kieltä sisältäviä aineistoja",
        contents: [
            "elfa",
        ],
    },
    legal: {
        title: "Legal texts / Juridisia aineistoja",
        description: "Legal texts<br/>Juridisia aineistoja",
        contents: [
            "mulcold_en",
        ],
    },
    other: {
        title: "Other corpora / Muita aineistoja",
        description: "Other corpora<br/>Muita aineistoja",
    },
};

settings.corporafolders.german = {
    title: "Deutsch / Saksa / German",
    description: "Texte auf Deutsch<br/>Saksankielisiä tekstejä<br/>Texts in German",
    academic: {
        title: "Akademische Texte / Akateemisia tekstejä / Academic texts",
        description: "Akademische Texte<br/>Akateemisia tekstejä<br/>Academic texts",
        contents: [
            "ethesis_de",
        ],
    },
    legal: {
        title: "Juristische Texte / Juridisia tekstejä / Legal texts",
        description: "Juristische Texte<br/>Juridisia tekstejä<br/>Legal texts",
        contents: [
            "mulcold_de",
        ],
    },
};

settings.corporafolders.french = {
    title: "Français / Ranska / French",
    description: "Textes en français<br/>Ranskankielisiä tekstejä<br/>Texts in French",
    academic: {
        title: "Textes académiques / Akateemisia tekstejä / Academic texts",
        description: "Textes académiques<br/>Akateemisia tekstejä<br/>Academic texts",
        contents: [
            "ethesis_fr",
        ],
    },
};

settings.corporafolders.spanish = {
    title: "Español / Espanja / Spanish",
    description: "Textos on español<br/>Espanjankielisiä tekstejä<br/>Texts in Spanish",
    academic: {
        title: "Textos académicos / Akateemisia tekstejä / Academic texts",
        description: "Textos académicos<br/>Akateemisia tekstejä<br/>Academic texts",
        contents: [
            "ethesis_es",
        ],
    },
};

settings.corporafolders.russian = {
    title: "Русский / Venäjä / Russian",
    description: "Tексты по-русски<br/>Venäjänkielisiä tekstejä<br/>Texts in Russian",
    academic: {
        title: "Академические тексты / Akateemisia tekstejä / Academic texts",
        description: "Академическиe тексты<br/>Akateemisia tekstejä<br/>Academic texts",
        contents: [
            "ethesis_ru",
        ],
    },
    literary: {
        title: "Художественные тексты / Kirjallisuutta / Literary texts",
        description: "Художественные тексты<br/>Kirjallisuutta<br/>Literary texts",
        contents: [
            "parrus_2016_ru",
            "parfin_2016_ru",
        ],
    },
    legal: {
        title: "Юридические тексты / Juridisia tekstejä / Legal texts",
        description: "Юридические тексты<br/>Juridisia tekstejä<br/>Legal texts",
        contents: [
            "legal_ru",
            "mulcold_ru",
        ],
    },
};

settings.corporafolders.uralic = {
    title: "Uralic languages / Uralilaisia kieliä",
    description: "Corpora in Uralic languages<br/>Uralilaisten kielten aineistoja",
};

settings.corporafolders.swahili = {
    title: "Swahili",
    description: "Texts in Swahili<br/>Swahilihinkielisiä tekstejä",
};

settings.corporafolders.cuneiform = {
    title: "Cuneiform / Nuolenpääkirjoitus",
    description: "Transliterated cuneiform texts<br/>Translitteroituja nuolenpääkirjoitustekstejä",
};


settings.corporafolders.english.academic.ethesis = {
    title: "E-thesis (English)",
    description: "The University of Helsinki’s English E-thesis 1999-2016, Korp version 1.1<br/><br/>Corpus of University of Helsinki theses and dissertations<br/><a href='https://ethesis.helsinki.fi/en/'>https://ethesis.helsinki.fi/</a>",
    contents: [
        "ethesis_en_dissabs",
        "ethesis_en_maabs",
    ],
    info: {
        cite_id: "e-thesis-en-korp-v1-1",
        urn: "urn:nbn:fi:lb-2020031302",
        metadata_urn: "urn:nbn:fi:lb-2020031301",
        shortname: "e-thesis-en-korp-v1-1",
        licence: settings.licenceinfo.CC_BY,
        homepage: {
            url: "https://ethesis.helsinki.fi/en/",
            name: "Digital dissertations and theses at the University of Helsinki",
            // no_label: true,
        },
    }
};

settings.corporafolders.english.academic.ethesis.phdtheses = {
    title: "Doctoral dissertations",
    description: "The University of Helsinki’s English E-thesis 1999-2016, Korp version 1.1: Doctoral dissertations",
    contents: [
        "ethesis_en_phd_mm",
        "ethesis_en_phd_hum",
        "ethesis_en_phd_bio",
        "ethesis_en_phd_beh",
        "ethesis_en_phd_ot",
        "ethesis_en_phd_med",
        "ethesis_en_phd_far",
        "ethesis_en_phd_sci",
        "ethesis_en_phd_valt",
        "ethesis_en_phd_teo",
        "ethesis_en_phd_el",
    ]
};

settings.corporafolders.english.academic.ethesis.matheses = {
    title: "Master’s theses",
    description: "The University of Helsinki’s English E-thesis 1999-2016, Korp version 1.1: Master’s theses",
    contents: [
        "ethesis_en_ma_mm",
        "ethesis_en_ma_ai",
        "ethesis_en_ma_hum",
        "ethesis_en_ma_bio",
        "ethesis_en_ma_beh",
        "ethesis_en_ma_far",
        "ethesis_en_ma_ot",
        "ethesis_en_ma_med",
        "ethesis_en_ma_sci",
        "ethesis_en_ma_valt",
        "ethesis_en_ma_teo",
        "ethesis_en_ma_el",
    ]
};


var byu_fulltext_note = "<br/><br/><strong>Note:</strong> To follow the US Fair Use Law, every 200 words, ten words have been removed and replaced with “@” (<a href='https://www.corpusdata.org/limitations.asp' target='_blank'>more information</a>).";

var byu_homepage_url = "https://www.corpusdata.org/intro.asp";
var byu_compiler = {
    name: "Prof. Mark Davies, Brigham Young University",
    url: "https://www.mark-davies.org/",
};

settings.corporafolders.english.reference.coca2020 = {
    title: "COCA 2020: Corpus of Contemporary American English",
    description: "COCA: Corpus of Contemporary American English – Kielipankki Korp version 2020<br/><br/>The COCA corpus contains about 1,000 million words in 485,000 texts of US English from the years 1990–2019. The corpus is evenly divided into the following genres: spoken, fiction, magazine, newspaper, academic, blogs, other web and TV / movies (<a href='https://www.corpusdata.org/coca2020.asp' target='_blank'>more information</a>).<br/><br/>Note that the metadata for individual texts are partly different and somewhat more concise than in the older <a href=\"http://urn.fi/urn:nbn:fi:lb-2017061922\" target=\"_blank\">COCA version 2017H1</a>." + byu_fulltext_note,
    // contents will be added further below
    info: {
        urn: "urn:nbn:fi:lb-2022111502",
        metadata_urn: "urn:nbn:fi:lb-2022111501",
        licence: {
            name: "ACA-Fi (Academic users in Finland)",
            urn: "urn:nbn:fi:lb-2017072501",
        },
        homepage_url: byu_homepage_url,
        compiler: {
            name: "Prof. Mark Davies",
            url: "https://www.mark-davies.org/",
        },
    },
};

settings.corporafolders.english.reference.coca = {
    title: "COCA: Corpus of Contemporary American English",
    description: "COCA: Corpus of Contemporary American English – Kielipankki Korp version 2017H1<br/><br/>The COCA corpus contains about 520 million words in 220,000 texts of US English from the years 1990–2015. The corpus is evenly divided into spoken, fiction, magazine, newspaper and academic genres.<br/><br/><strong>Note</strong> that a newer, extended version of the corpus, <a href=\"http://urn.fi/urn:nbn:fi:lb-2022111501\" target=\"_blank\">COCA 2020</a>, is also available in Korp." + byu_fulltext_note,
    // contents will be added further below
    info: {
        urn: "urn:nbn:fi:lb-2017061933",
        metadata_urn: "urn:nbn:fi:lb-2017061922",
        licence: {
            name: "ACA-Fi (Academic users in Finland)",
            urn: "urn:nbn:fi:lb-2017072501",
        },
        cite_id: "coca-korp-2017H1",
        homepage_url: byu_homepage_url,
        compiler: byu_compiler,
    },
};

settings.corporafolders.english.historical.coha = {
    title: "COHA: Corpus of Historical American English",
    description: "COHA: Corpus of Historical American English – Kielipankki Korp version 2017H1<br/><br/>The COHA corpus contains about 400 million words in 107,000 texts of US English from the years 1810–2009. Each decade has roughly the same balance of fiction, popular magazine, newspaper, and non-fiction books." + byu_fulltext_note,
    // contents will be added futher below
    info: {
        urn: "urn:nbn:fi:lb-2017061934",
        metadata_urn: "urn:nbn:fi:lb-2017061925",
        licence: {
            name: "ACA-Fi (Academic users in Finland)",
            urn: "urn:nbn:fi:lb-2017072505",
        },
        cite_id: "coha-korp-2017H1",
        homepage_url: byu_homepage_url,
        compiler: byu_compiler,
    },
};

settings.corporafolders.english.cmc.glowbe = {
    title: "GloWbE: Global Web-based English",
    description: "GloWbE: Global Web-based English – Kielipankki Korp version 2017H1<br/><br/>The GloWbE corpus contains about 1.8 billion words on 1.8 million Web pages of English from the United States, Great Britain, Australia, India and 16 other countries, collected in 2013. About 60% of the text is from blogs." + byu_fulltext_note,
    // contents will be added futher below
    info: {
        urn: "urn:nbn:fi:lb-2017061935",
        metadata_urn: "urn:nbn:fi:lb-2017061928",
        licence: {
            name: "ACA-Fi (Academic users in Finland)",
            urn: "urn:nbn:fi:lb-2017072509",
        },
        cite_id: "glowbe-korp-2017H1",
        homepage_url: byu_homepage_url,
        compiler: byu_compiler,
    },
};

settings.corporafolders.english.historical.scotscorr = {
    title: "ScotsCorr",
    // Description copied from META-SHARE
    description: "Helsinki Corpus of Scottish Correspondence (1540–1750)<br/><br/>The corpus comprises circa 0.5 million tokens (417,709 words) of early Scottish correspondence by male and female writers dating from the period 1540–1750. The corpus consists of transcripts of original letter manuscripts, which reproduce the text disallowing any modernisation, normalisation or emendation. Language-external variables such as date, region, gender, addressee, hand and script type have been coded into the database. The writers originate from fifteen different regions of Scotland; these can be grouped to represent the areas of North, North-East, Central, South-East, and South-West. In addition, there are two categories of informants that have not been defined by geographical origin: representatives of the court and professional people such as members of the clergy. The proportion of female informants in the corpus is 21 per cent.<br/><br/><strong>Please note</strong> that the Korp version of the corpus is in test use and may change without notification, although the corpus data itself should be stable.<br/><br/><a href='https://www.kielipankki.fi/corpora/scotscorr/' target='_blank'>ScotsCorr information page with links to documentation</a>.",
    info: {
        urn: "urn:nbn:fi:lb-2016121607",
        metadata_urn: "urn:nbn:fi:lb-201411071",
        // Use the generic ACA+NC licence information but add a URN
        // directing to a licence page specific to ScotsCorr (URN
        // overrides the URL in settings.licenceinfo.ACA_NC).
        licence: $.extend(true, {},
                           settings.licenceinfo.ACA_NC,
                           { urn: "urn:nbn:fi:lb-2016051203" }),
        // General ACA status application, since ScotsCorr does not
        // have one of its own
        lbr_id: "urn:nbn:fi:lb-2016110710",
        iprholder: {
            name: "Anneli Meurman-Solin",
        },
        cite_id: "ScotsCorr",
    },
    contents: [
        "scots_royal",
        "scots_m1540_1599",
        "scots_f1540_1599",
        "scots_m1600_1649",
        "scots_f1600_1649",
        "scots_m1650_1699",
        "scots_f1650_1699",
        "scots_m1700_1749",
        "scots_f1700_1749",
    ],
};


settings.corporafolders.uralic.fennougrica = {
    title: "Fenno-Ugrica",
    contents: [
        "fennougrica_myv",
        "fennougrica_kca",
        "fennougrica_izh",
        "fennougrica_mhr",
        "fennougrica_mrj",
        "fennougrica_mns",
        "fennougrica_mdf",
        "fennougrica_sel",
        "fennougrica_yrk",
        "fennougrica_vep",
    ],
    info: {
        cite_id: "Fenno-ugrica",
    },
};

settings.corporafolders.uralic.wanca_2016 = {
    title: "Wanca 2016",
    description: "A collection of web corpora in small Uralic languages",
    info: {
        metadata_urn: "urn:nbn:fi:lb-2019052401",
        licence: settings.licenceinfo.CC_BY,
        cite_id: "wanca2016-korp",
    },
    contents: [
        "wanca_2016_fit_multili",
        "wanca_2016_fkv_multili",
        "wanca_2016_izh",
        "wanca_2016_kca_multili",
        "wanca_2016_koi_multili",
        "wanca_2016_kpv_multili",
        "wanca_2016_krl_multili",
        "wanca_2016_liv",
        "wanca_2016_lud",
        "wanca_2016_mdf_multili",
        "wanca_2016_mhr_multili",
        "wanca_2016_mns_multili",
        "wanca_2016_mrj_multili",
        "wanca_2016_myv_multili",
        "wanca_2016_nio",
        "wanca_2016_olo_multili",
        "wanca_2016_sjd",
        "wanca_2016_sjk",
        "wanca_2016_sju",
        "wanca_2016_sma_multili",
        "wanca_2016_sme_multili",
        "wanca_2016_smj_multili",
        "wanca_2016_smn_multili",
        "wanca_2016_sms_multili",
        "wanca_2016_udm_multili",
        "wanca_2016_vep_multili",
        "wanca_2016_vot",
        "wanca_2016_vro_multili",
        "wanca_2016_yrk",
    ]
};


settings.corporafolders.uralic.erme_v2 = {
    title: "ERME version 2",
    description: "ERME: Erzya and Moksha Extended Corpora version 2",
    info: {
      metadata_urn: "urn:nbn:fi:lb-2023021601",
        licence: {
            name: "CC BY (PUB)",
            urn: "urn:nbn:fi:lb-2022020106",
        }
    },
    contents: [
        "erme_v2_mdf",
        "erme_v2_myv",
    ]
};


settings.corporafolders.uralic.sust = {
    title: "SUS-kenttätyö (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus (näyte)",
    // The Finno-Ugrian Society Fieldwork Corpus (sample)<br/>
    info: {
        metadata_urn: "urn:nbn:fi:lb-2016092001",
        licence: settings.licenceinfo.CC_BY_NC,
    },
    contents: [
        "sust_myv",
        "sust_kpv",
        "sust_mdf",
    ]
};


settings.corporafolders.swahili.hcs2 = {
    title: "Helsinki Corpus of Swahili 2.0 (HCS 2.0)",
    description: "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version<br/><br><a href=\"https://www.kielipankki.fi/corpora/hcs2/\" target=\"_blank\">Corpus information page, including descriptions of annotation feature values (tags)</a>",
    info: {
        urn: "urn:nbn:fi:lb-201608301",
        metadata_urn: "urn:nbn:fi:lb-2016011301",
        lbr_id: "urn:nbn:fi:lb-2014032624",
        licence: {
            name: "CLARIN ACA +NC 2.1",
            urn: "urn:nbn:fi:lb-2016112310",
        },
        cite_id: "hcs-a-v2",
    },
};

settings.corporafolders.cuneiform.oracc2021 = {
    title: "Oracc 2021",
    description: "Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that the subcorpora CAMS, CTIJ, DCCLT and HBTIN contain less data than their counterparts in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.<br/>A list of Oracc texts included in this Korp version is <a href=\"http://urn.fi/urn:nbn:fi:lb-2024092401\" target=\"_blank\">here</a> (the CDLI number and lemmatization status of each text in Oracc).",
    contents: [
        "oracc2021_adsd",
        "oracc2021_aemw",
        "oracc2021_akklove",
        "oracc2021_ario",
	"oracc2021_atae",
        "oracc2021_blms",
        "oracc2021_btto",
        "oracc2021_cams",
        // "oracc2021_caspo", // removed temporarily
	"oracc2021_ccpo",
        "oracc2021_ckst",
        "oracc2021_cmawro",
	"oracc2021_ctij",
        "oracc2021_dcclt",
        "oracc2021_dccmt",
        "oracc2021_dsst",
	"oracc2021_ecut",
        "oracc2021_epsd2",
        "oracc2021_etcsri",
        "oracc2021_glass",
	"oracc2021_hbtin",
        "oracc2021_lacost",
        "oracc2021_obmc",
        "oracc2021_obta",
	"oracc2021_riao",
        "oracc2021_ribo",
        "oracc2021_rimanum",
        "oracc2021_rinap",
	"oracc2021_saao",
        "oracc2021_suhu",
    ],
    info: {
        metadata_urn: "urn:nbn:fi:lb-2022031705",
        urn: "urn:nbn:fi:lb-2022031706",
        licence: settings.licenceinfo.CC_BY_SA_30,
        iprholder: {
            name: "Open Richly Annotated Cuneiform Corpus Project",
            url: "http://oracc.museum.upenn.edu/doc/about/licensing/index.html",
        },
        cite_id: "oracc-korp-2021-06",
        infopage_url: "https://www.kielipankki.fi/corpora/oracc/",
    }
};

// Add corpus aliases containing all Oracc 2021 subcorpora
funcs.addCorpusAliases(
    settings.corporafolders.cuneiform.oracc2021.contents.join(","),
    ["oracc-korp-2021-06", "oracc-korp-2021"]);


settings.corporafolders.cuneiform.oracc = {
    title: "Oracc 2019",
    description: "Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    contents: [
        "oracc_adsd",
        "oracc_ario",
        "oracc_blms",
        "oracc_cams",
        "oracc_caspo",
        "oracc_ctij",
        "oracc_dcclt",
        "oracc_dccmt",
        "oracc_ecut",
        "oracc_etcsri",
        "oracc_hbtin",
        "oracc_obmc",
        "oracc_riao",
        "oracc_ribo",
        "oracc_rimanum",
        "oracc_rinap",
        "oracc_saao",
        "oracc_others",
    ],
    info: {
        metadata_urn: "urn:nbn:fi:lb-2019060601",
        urn: "urn:nbn:fi:lb-2019060602",
        licence: settings.licenceinfo.CC_BY_SA_30,
        iprholder: {
            name: "Open Richly Annotated Cuneiform Corpus Project",
            url: "http://oracc.museum.upenn.edu/doc/about/licensing/index.html",
        },
        cite_id: "oracc-korp-2019-05",
        infopage_url: "https://www.kielipankki.fi/corpora/oracc/",
    }
};

settings.corpusAliases["oracc-2019-05"] = "oracc_adsd,oracc_ario,oracc_blms,oracc_cams,oracc_caspo,oracc_ctij,oracc_dcclt,oracc_dccmt,oracc_ecut,oracc_etcsri,oracc_hbtin,oracc_obmc,oracc_riao,oracc_ribo,oracc_rimanum,oracc_rinap,oracc_saao,oracc_others";
settings.corpusAliases.oracc_2019_05
    = settings.corpusAliases["oracc-2019-05"];


/* Helsinki Corpus */

sattrlist.hc = {
    sentence_id: sattrs.sentence_id_hidden,
    text_date: {label: "date"},
    text_title: {label: "title"},
    text_xmlid: {label: "hc_xmlid"},
    text_id: {label: "hc_textid"},
    text_source: {label: "source"},
    text_lang: {label: "lang"},
    text_langid: {label: "hc_lang_id"},
    text_contemporaneity: {label: "hc_contemporaneity"},
    //text_dialect: {label: "hc_dialect"},
    text_form: {label: "hc_form"},
    text_texttype: {label: "hc_texttype"},
    text_foreignorig: {label: "hc_foreignorig"},
    text_foreignlang: {label: "hc_foreignlang"},
    text_spoken: {label: "hc_spoken"},
    text_authorsex: {label: "hc_authorsex"},
    text_author: {label: "hc_author"},
    text_authorage: {label: "hc_authorage"},
    text_socialrank: {label: "hc_socialrank"},
    text_audience: {label: "hc_audience"},
    text_partrel: {label: "hc_partrel"},
    text_interaction: {label: "hc_interaction"},
    text_setting: {label: "hc_setting"},
    text_proto: {label: "hc_proto"}
};

attrlist.hc = {
    page: {
        label: "page_num",
        opts: options.default
    },
    note: {
        label: "note",
        opts: options.default
    },
    unit: {
        label: "unit",
        opts: options.default
    },
    type: {
        label: "type",
        opts: options.default
    },
    supplement: {
        label: "supplement",
        opts: options.default
    }
};

settings.corpora.hc = {
    id: "hc",
    title: "Helsinki Corpus TEI XML Edition (2011)",
    description: "Helsinki Corpus TEI XML Edition (2011), Korp Version<br/><br/>The Helsinki Corpus of English Texts is a structured multi-genre diachronic corpus, which includes periodically organized text samples from Old, Middle and Early Modern English. Each sample is preceded by a list of parameter codes giving information on the text and its author. The Corpus is useful particularly in the study of the change of linguistic features in long diachrony. It can be used as a diagnostic corpus giving general information of the occurrence of forms, structures and lexemes in different periods of English. This information can be supplemented by evidence yielded by more special and focused historical corpora.<br/><br/><strong>Note</strong> that this version of the corpus is based on the Helsinki Corpus TEI XML Edition of 2011, so it does not contain word-level annotations.",
    metadata_urn: "urn:nbn:fi:lb-2017083001",
    // Uncomment location URN when the beta stage ends
    // urn: "urn:nbn:fi:lb-2019061401",
    homepage_url: "http://www.helsinki.fi/varieng/CoRD/corpora/HelsinkiCorpus/HC_XML.html",
    limitedAccess: true,
    licenceType: "ACA",
    licence: {
        name: "CLARIN ACA +NC +DEP 2.1",
        description: "CLARIN ACA (Academic) End-User License 2.1, Non-commercial, No redistribution, Redeposit",
        urn: "urn:nbn:fi:lb-2019061301",
    },
    cite_id: "HC-TEI-XML",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.hc,
    structAttributes: sattrlist.hc
};


/* Oracc */

sattrlist.oracc = {
    text_cdlinumber: {
        label: "oracc_cdlinumber",
    },
    text_provenance: {
        label: "oracc_provenance",
    },
    text_language: {
        label: "oracc_textlang",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "Akkadian",
            "AkkadianAramaic",
            "AkkadianAramaicLuwian",
            "AkkadianEgyptian",
            "AkkadianOldPersian",
            "AkkadianOldPersianElamite",
            "AkkadianOldPersianElamiteEgyptian",
            "AkkadianUrartian",
            "Aramaic",
            "Eblaite",
            "Elamite",
            "Hittite",
            "Neo-Assyrian",
            "Neo-Babylonian",
            "OldPersian",
            "OldPersianElamite",
            "Sumerian",
            "SumerianAkkadian",
            "Uncertainorunspecified",
            "Urartian"
        ],
        translation: {
            "Akkadian": {
                "en": "Akkadian",
                "fi": "akkadi",
                // "sv": "Akkadian",
            },
            "AkkadianAramaic": {
                "en": "Akkadian, Aramaic",
                "fi": "akkadi, aramea",
                // "sv": "AkkadianAramaic",
            },
            "AkkadianAramaicLuwian": {
                "en": "Akkadian, Aramaic, Luwian",
                "fi": "akkadi, aramea, luuvi",
                // "sv": "AkkadianAramaicLuwian",
            },
            "AkkadianEgyptian": {
                "en": "Akkadian, Egyptian",
                "fi": "akkadi, egypti",
                // "sv": "AkkadianEgyptian",
            },
            "AkkadianOldPersian": {
                "en": "Akkadian, Old Persian",
                "fi": "akkadi, muinaispersia",
                // "sv": "AkkadianOldPersian",
            },
            "AkkadianOldPersianElamite": {
                "en": "Akkadian, Old Persian, Elamite",
                "fi": "akkadi, muinaispersia, elami",
                // "sv": "AkkadianOldPersianElamite",
            },
            "AkkadianOldPersianElamiteEgyptian": {
                "en": "Akkadian, Old Persian, Elamite, Egyptian",
                "fi": "akkadi, muinaispersia, elami, egypti",
                // "sv": "AkkadianOldPersianElamiteEgyptian",
            },
            "AkkadianUrartian": {
                "en": "Akkadian, Urartian",
                "fi": "akkadi, urartu",
                // "sv": "AkkadianUrartian",
            },
            "Aramaic": {
                "en": "Aramaic",
                "fi": "aramea",
                // "sv": "Aramaic",
            },
            "Eblaite": {
                "en": "Eblaite",
                "fi": "ebla",
                // "sv": "Eblaite",
            },
            "Elamite": {
                "en": "Elamite",
                "fi": "elami",
                // "sv": "Elamite",
            },
            "Hittite": {
                "en": "Hittite",
                "fi": "heetti",
                // "sv": "Hittite",
            },
            "Neo-Assyrian": {
                "en": "Neo-Assyrian",
                "fi": "uusassyria",
                // "sv": "Neo-Assyrian",
            },
            "Neo-Babylonian": {
                "en": "Neo-Babylonian",
                "fi": "uusbabylonia",
                // "sv": "Neo-Babylonian",
            },
            "OldPersian": {
                "en": "Old Persian",
                "fi": "muinaispersia",
                // "sv": "OldPersian",
            },
            "OldPersianElamite": {
                "en": "Old Persian, Elamite",
                "fi": "muinaispersia, elami",
                // "sv": "OldPersianElamite",
            },
            "Sumerian": {
                "en": "Sumerian",
                "fi": "sumeri",
                // "sv": "Sumerian",
            },
            "SumerianAkkadian": {
                "en": "Sumerian, Akkadian",
                "fi": "sumeri, akkadi",
                // "sv": "SumerianAkkadian",
            },
            "Uncertainorunspecified": {
                "en": "Uncertain or unspecified",
                "fi": "määrittelemätön",
                // "sv": "Uncertainorunspecified",
            },
            "Urartian": {
                "en": "Urartian",
                "fi": "urartu",
                // "sv": "Urartian",
            },
        },
    },
    text_genre: {
        label: "oracc_genre",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "administrativerecord",
            "astrologicalastronomical",
            "grantdecreegift",
            "legaltransaction",
            "letter",
            "lexical",
            "literary",
            "miscellaneous",
            "omendivination",
            "prayerritualincantation",
            "royalinscription",
            "scholarly",
            "school",
            "uncertainorunspecified"
        ],
        translation: {
            "administrativerecord": {
                "en": "administrative record",
                "fi": "hallinnollinen",
                // "sv": "administrativerecord",
            },
            "astrologicalastronomical": {
                "en": "astrological/astronomical",
                "fi": "astrologinen/astronominen",
                // "sv": "astrologicalastronomical",
            },
            "grantdecreegift": {
                "en": "grant/decree/gift",
                "fi": "lahjoitus/määräys",
                // "sv": "grantdecreegift",
            },
            "legaltransaction": {
                "en": "legal transaction",
                "fi": "laki",
                // "sv": "legaltransaction",
            },
            "letter": {
                "en": "letter",
                "fi": "kirje",
                // "sv": "letter",
            },
            "lexical": {
                "en": "lexical",
                "fi": "leksikaalinen",
                // "sv": "lexical",
            },
            "literary": {
                "en": "literary",
                "fi": "kaunokirjallinen",
                // "sv": "literary",
            },
            "miscellaneous": {
                "en": "miscellaneous",
                "fi": "sekalainen",
                // "sv": "miscellaneous",
            },
            "omendivination": {
                "en": "omen/divination",
                "fi": "enteet",
                // "sv": "omendivination",
            },
            "prayerritualincantation": {
                "en": "prayer/ritual/incantation",
                "fi": "rukoukset/rituaalit",
                // "sv": "prayerritualincantation",
            },
            "royalinscription": {
                "en": "royal inscription",
                "fi": "kuninkaallinen",
                // "sv": "royalinscription",
            },
            "scholarly": {
                "en": "scholarly",
                "fi": "tieteellinen",
                // "sv": "scholarly",
            },
            "school": {
                "en": "school",
                "fi": "koulutekstit",
                // "sv": "school",
            },
            "uncertainorunspecified": {
                "en": "uncertain or unspecified",
                "fi": "määrittelemätön",
                // "sv": "uncertainorunspecified",
            },
        },
    },
    text_period: {
        label: "oracc_period",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "Achaemenid",
            "Archaic",
            "EarlyDynastic",
            "Ebla",
            "FirstMillennium",
            "Hellenistic",
            "LagašII",
            "LateBabylonian",
            "MiddleAssyrian",
            "MiddleBabylonian",
            "MiddleHittite",
            "NeoAssyrian",
            "Neo-Assyrian",
            "NeoBabylonian",
            "Neo-Babylonian",
            "OldAkkadian",
            "OldAssyrian",
            "OldBabylonian",
            "Parthian",
            "StandardBabylonian",
            "Uncertainorunspecified",
            "Urartian",
            "UrIII",
            "UrukIII",
            "UrukIV"
        ],
        translation: {
            "Achaemenid": {
                "en": "Achaemenid",
                "fi": "persialainen",
                // "sv": "Achaemenid",
            },
            "Archaic": {
                "en": "Archaic",
                "fi": "arkaainen",
                // "sv": "Archaic",
            },
            "EarlyDynastic": {
                "en": "Early Dynastic",
                "fi": "varhaisdynastinen",
                // "sv": "EarlyDynastic",
            },
            "Ebla": {
                "en": "Ebla",
                "fi": "Ebla",
                // "sv": "Ebla",
            },
            "FirstMillennium": {
                "en": "First Millennium",
                "fi": "ensimmäinen vuosituhat",
                // "sv": "FirstMillennium",
            },
            "Hellenistic": {
                "en": "Hellenistic",
                "fi": "hellenistinen",
                // "sv": "Hellenistic",
            },
            "LagašII": {
                "en": "Lagaš II",
                "fi": "Lagaš II",
                // "sv": "LagašII",
            },
            "LateBabylonian": {
                "en": "Late Babylonian",
                "fi": "myöhäisbabylonialainen",
                // "sv": "LateBabylonian",
            },
            "MiddleAssyrian": {
                "en": "Middle Assyrian",
                "fi": "keskiassyrialainen",
                // "sv": "MiddleAssyrian",
            },
            "MiddleBabylonian": {
                "en": "Middle Babylonian",
                "fi": "keskibabylonialainen",
                // "sv": "MiddleBabylonian",
            },
            "MiddleHittite": {
                "en": "Middle Hittite",
                "fi": "keskiheettiläinen",
                // "sv": "MiddleHittite",
            },
            "Neo-Assyrian": {
                "en": "Neo-Assyrian",
                "fi": "uusassyrialainen",
                // "sv": "Neo-Assyrian",
            },
            "Neo-Babylonian": {
                "en": "Neo-Babylonian",
                "fi": "uusbabylonialainen",
                // "sv": "Neo-Babylonian",
            },
            "NeoAssyrian": {
                "en": "Neo Assyrian",
                "fi": "uusassyrialainen",
                // "sv": "NeoAssyrian",
            },
            "NeoBabylonian": {
                "en": "Neo Babylonian",
                "fi": "uusbabylonialainen",
                // "sv": "NeoBabylonian",
            },
            "OldAkkadian": {
                "en": "Old Akkadian",
                "fi": "muinaisakkadilainen",
                // "sv": "OldAkkadian",
            },
            "OldAssyrian": {
                "en": "Old Assyrian",
                "fi": "muinaisassyrialainen",
                // "sv": "OldAssyrian",
            },
            "OldBabylonian": {
                "en": "Old Babylonian",
                "fi": "muinaisbabylonialainen",
                // "sv": "OldBabylonian",
            },
            "Parthian": {
                "en": "Parthian",
                "fi": "parthialainen",
                // "sv": "Parthian",
            },
            "StandardBabylonian": {
                "en": "Standard Babylonian",
                "fi": "standardibabylonia",
                // "sv": "StandardBabylonian",
            },
            "Uncertainorunspecified": {
                "en": "Uncertain or unspecified",
                "fi": "määrittelemätön/tuntematon",
                // "sv": "Uncertainorunspecified",
            },
            "UrIII": {
                "en": "Ur III",
                "fi": "Ur III",
                // "sv": "UrIII",
            },
            "Urartian": {
                "en": "Urartian",
                "fi": "urartu",
                // "sv": "Urartian",
            },
            "UrukIII": {
                "en": "Uruk III",
                "fi": "Uruk III",
                // "sv": "UrukIII",
            },
            "UrukIV": {
                "en": "Uruk IV",
                "fi": "Uruk IV",
                // "sv": "UrukIV",
            },
        },
    },
    text_subgenre: {
        label: "oracc_subgenre"
    },
    sentence_line: {
        label: "oracc_line",
    },
    sentence_translation: {
        label: "oracc_sent_translation"
    },
    paragraph_id: {
        label: "paragraph_id",
        displayType: "hidden",
    }
};

attrlist.oracc = {
    lemma: attrs.baseform,
    ltrans:  {
        // Lemma translation
        label: "oracc_lemmatrans"
    },
    transcription: {
        label: "oracc_transcription"
    },
    sense: {
        // Contextual sense
        label: "oracc_sense",
        stats_cqp: "cqpPlainWordAttr",
        stats_stringify: "stringifyPlainWordAttr",
    },
    pos: {
        label: "pos",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "adjective",
            "adverb",
            "commonnoun",
            "conjunction",
            "interjection",
            "miscellaneousundetermined",
            "number",
            "particle",
            "prepositionpostposition",
            "pronoun",
            "propernoun",
            "verb"
        ],
        translation: {
            "adjective": {
                "en": "adjective",
                "fi": "adjektiivi",
                // "sv": "adjective",
            },
            "adverb": {
                "en": "adverb",
                "fi": "adverbi",
                // "sv": "adverb",
            },
            "common noun": {
                "en": "common noun",
                // "fi": "common noun",
                // "sv": "common noun",
            },
            "commonnoun": {
                "en": "common noun",
                "fi": "substantiivi",
                // "sv": "commonnoun",
            },
            "conjunction": {
                "en": "conjunction",
                "fi": "konjunktio",
                // "sv": "conjunction",
            },
            "interjection": {
                "en": "interjection",
                "fi": "interjektio",
                // "sv": "interjection",
            },
            "miscellaneous/undetermined": {
                "en": "miscellaneous/undetermined",
                // "fi": "miscellaneous/undetermined",
                // "sv": "miscellaneous/undetermined",
            },
            "miscellaneousundetermined": {
                "en": "miscellaneous/undetermined",
                "fi": "sekalainen/määrittelemätön",
                // "sv": "miscellaneousundetermined",
            },
            "number": {
                "en": "number",
                "fi": "numero",
                // "sv": "number",
            },
            "particle": {
                "en": "particle",
                "fi": "partikkeli",
                // "sv": "particle",
            },
            "preposition/postposition": {
                "en": "preposition/postposition",
                // "fi": "preposition/postposition",
                // "sv": "preposition/postposition",
            },
            "prepositionpostposition": {
                "en": "preposition/postposition",
                "fi": "pre-/postpositio",
                // "sv": "prepositionpostposition",
            },
            "pronoun": {
                "en": "pronoun",
                "fi": "pronomini",
                // "sv": "pronoun",
            },
            "proper noun": {
                "en": "proper noun",
                // "fi": "proper noun",
                // "sv": "proper noun",
            },
            "propernoun": {
                "en": "proper noun",
                "fi": "erisnimi",
                // "sv": "propernoun",
            },
            "subcategory": {
                "en": "part of speech (detailed)",
                "fi": "tarkempi sanaluokka",
                // "sv": "subcategory",
            },
            "verb": {
                "en": "verb",
                "fi": "verbi",
                // "sv": "verb",
            },
        },
    },
    possub: {
        // Sub POS
        label: "oracc_pos_subcategory"
    },
    standard: {
        label: "oracc_standardized"
    },
    lang: {
        label: "oracc_lang",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "Akkadian",
            "Aramaic",
            "Cuneiform",
            "EarlyAkkadian",
            "Eblaite",
            "Elamite",
            "Greek",
            "Hittite",
            "Hurrian",
            "LateBabylonian",
            "MiddleAssyrian",
            "MiddleBabylonian",
            "MiddleBabylonianperipheral",
            "Neo-Assyrian",
            "Neo-Babylonian",
            "OldAkkadian",
            "OldAssyrian",
            "OldBabylonian",
            "OldPersian",
            "Proto-cuneiform",
            "StandardBabylonian",
            "Sumerian",
            "SumerianEmesal",
            "Ugaritic",
            "Urartian"
        ],
        translation: {
            "Akkadian": {
                "en": "Akkadian",
                "fi": "akkadi",
                // "sv": "Akkadian",
            },
            "Aramaic": {
                "en": "Aramaic",
                "fi": "aramaea",
                // "sv": "Aramaic",
            },
            "Cuneiform": {
                "en": "Cuneiform",
                "fi": "nuolenpäät",
                // "sv": "Cuneiform",
            },
            "EarlyAkkadian": {
                "en": "Early Akkadian",
                "fi": "varhainen akkadi",
                // "sv": "EarlyAkkadian",
            },
            "Eblaite": {
                "en": "Eblaite",
                "fi": "ebla",
                // "sv": "Eblaite",
            },
            "Elamite": {
                "en": "Elamite",
                "fi": "elami",
                // "sv": "Elamite",
            },
            "Greek": {
                "en": "Greek",
                "fi": "kreikka",
                // "sv": "Greek",
            },
            "Hittite": {
                "en": "Hittite",
                "fi": "heetti",
                // "sv": "Hittite",
            },
            "Hurrian": {
                "en": "Hurrian",
                "fi": "hurri",
                // "sv": "Hurrian",
            },
            "LateBabylonian": {
                "en": "Late Babylonian",
                "fi": "myöhäisbabylonia",
                // "sv": "LateBabylonian",
            },
            "MiddleAssyrian": {
                "en": "Middle Assyrian",
                "fi": "keskiassyria",
                // "sv": "MiddleAssyrian",
            },
            "MiddleBabylonian": {
                "en": "Middle Babylonian",
                "fi": "keskibabylonia",
                // "sv": "MiddleBabylonian",
            },
            "MiddleBabylonianperipheral": {
                "en": "Middle Babylonian peripheral",
                "fi": "keskibabylonia (periferia)",
                // "sv": "MiddleBabylonianperipheral",
            },
            "Neo-Assyrian": {
                "en": "Neo-Assyrian",
                "fi": "uusassyria",
                // "sv": "Neo-Assyrian",
            },
            "Neo-Babylonian": {
                "en": "Neo-Babylonian",
                "fi": "uusbabylonia",
                // "sv": "Neo-Babylonian",
            },
            "OldAkkadian": {
                "en": "Old Akkadian",
                "fi": "muinaisakkadi",
                // "sv": "OldAkkadian",
            },
            "OldAssyrian": {
                "en": "Old Assyrian",
                "fi": "muinaisassyria",
                // "sv": "OldAssyrian",
            },
            "OldBabylonian": {
                "en": "Old Babylonian",
                "fi": "muinaisbabylonia",
                // "sv": "OldBabylonian",
            },
            "OldPersian": {
                "en": "Old Persian",
                "fi": "muinaispersia",
                // "sv": "OldPersian",
            },
            "Proto-cuneiform": {
                "en": "Proto-cuneiform",
                "fi": "protonuolenpäät",
                // "sv": "Proto-cuneiform",
            },
            "StandardBabylonian": {
                "en": "Standard Babylonian",
                "fi": "standardibabylonia",
                // "sv": "StandardBabylonian",
            },
            "Sumerian": {
                "en": "Sumerian",
                "fi": "sumeri",
                // "sv": "Sumerian",
            },
            "SumerianEmesal": {
                "en": "Sumerian Emesal",
                "fi": "sumeri (emesal)",
                // "sv": "SumerianEmesal",
            },
            "Ugaritic": {
                "en": "Ugaritic",
                "fi": "ugarit",
                // "sv": "Ugaritic",
            },
            "Urartian": {
                "en": "Urartian",
                "fi": "urartu",
                // "sv": "Urartian",
            },
        },
    },
    // links won't work
    url: {
        label: "oracc_url",
        type: "url",
        urlOpts: {
            //inLinkSection: true,
            //hideUrl: true,
            newWindow: true,
        }
    }
/*
    url: {
        inLinkSection: true,
        hideUrl: true,
        newWindow: true,
        label: "oracc_url",
        type: "url"
        }*/
};

// Oracc 2021

attrlist.oracc2021 = {
    lemma: attrs.baseform,
    autolemma: {
        label: "autolemma",
        opts: options.default
    },
    //attrs.baseform,
    autopos: {
        label: "autopos",
        extendedComponent: "structServiceAutocomplete",
    },
    msd: {
	label: "msd"
    },
    translation: {
	label: "oracc_lemmatrans"
    },
    sense: {
	label: "oracc_sense",
        stats_cqp: "cqpPlainWordAttr",
        stats_stringify: "stringifyPlainWordAttr",
    },
    transcription: {
	label: "oracc_transcription"
    },
    pos: {
	label: "pos",
        extendedComponent: "structServiceSelect",
    },
    oraccpos: {
	label: "oracc_pos_subcategory",
        extendedComponent: "structServiceAutocomplete",
    },
    normname: {
	label: "oracc_standardized"
    },
    lang: {
	label: "oracc_lang",
        extendedComponent: "structServiceSelect",
    },
    url: {
	label: "oracc_url",
	type: "url",
        hideExtended: true,
        hideStatistics: true,
	url_opts: {
	    //in_link_section: true,
	    //hide_url: true,
	    new_window: true,
	}
    }
};


sattrlist.oracc2021 = {
    text_cdlinumber: {
        label: "oracc_cdlinumber",
    },
    /*text_credits: {
        label: "oracc_credits",
        type: "url",
        url_opts: {
            //in_link_section: true,
            //hide_url: true,
            new_window: true,
        }
    },*/
    text_provenience: {
        label: "oracc_provenance",
        opts: options.lite,
        extendedComponent: "structServiceAutocomplete",
    },
    text_language: {
        label: "oracc_textlang",
        extendedComponent: "structServiceAutocomplete",
    },
    text_genre: {
        label: "oracc_genre",
        opts: options.lite,
        extendedComponent: "structServiceSelect",
    },
    text_period: {
        label: "oracc_period",
        opts: options.lite,
	extendedComponent: "structServiceSelect",
    },
    text_subgenre: {
        label: "oracc_subgenre",
	extendedComponent: "structServiceAutocomplete",
    },
    text_museumno: {
	label: "oracc_museumno",
    },
    text_photo: {
        label: "oracc_photo",
	extendedComponent: "structServiceAutocomplete",
    },
    text_copy: {
        label: "oracc_copy",
	extendedComponent: "structServiceAutocomplete",
    },
    text_accessionno: {
        label: "oracc_accessionno",
    },
    text_datebce: {
        label: "oracc_datebce",
	extendedComponent: "structServiceAutocomplete",
    },
    text_primarypub: {
        label: "oracc_primarypubno",
    },
    text_excavation: {
        label: "oracc_excavation",
	extendedComponent: "structServiceAutocomplete",
    },
    text_collection: {
        label: "oracc_collection",
	extendedComponent: "structServiceAutocomplete",
    },
    paragraph_id: {
        label: "paragraph_id",
	displayType: "hidden",
    }
};

settings.corpora.oracc2021_adsd = {
    id: "oracc2021_adsd",
    title: "ADsD: Astronomical Diaries Digital (Oracc 2021)",
    description: "ADsD: Astronomical Diaries Digital<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/adsd/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_aemw = {
    id: "oracc2021_aemw",
    title: "AEMW: Akkadian in the Eastern Mediterranean World (Oracc 2021)",
    description: "AEMW: Akkadian in the Eastern Mediterranean World<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/aemw/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_akklove = {
    id: "oracc2021_akklove",
    title: "Akkadian Love Literature (Oracc 2021)",
    description: "Akkadian Love Literature<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/akklove/participants/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_ario = {
    id: "oracc2021_ario",
    title: "ARIo: Achaemenid Royal Inscriptions online (Oracc 2021)",
    description: "ARIo: Achaemenid Royal Inscriptions online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/ario/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_atae = {
    id: "oracc2021_atae",
    title: "ATAE: Archival Texts of the Assyrian Empire (Oracc 2021)",
    description: "ATAE: Archival Texts of the Assyrian Empire<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/atae/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_blms = {
    id: "oracc2021_blms",
    title: "blms: Bilinguals in Late Mesopotamian Scholarship (Oracc 2021)",
    description: "blms: Bilinguals in Late Mesopotamian Scholarship<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/blms/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_btto = {
    id: "oracc2021_btto",
    title: "BTTo: Babylonian Topographical Texts Online (Oracc 2021)",
    description: "BTTo: Babylonian Topographical Texts Online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/btto/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_cams = {
    id: "oracc2021_cams",
    title: "CAMS: Corpus of Ancient Mesopotamian Scholarship (Oracc 2021)",
    description: "CAMS: Corpus of Ancient Mesopotamian Scholarship<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that this subcorpus contains less data than its counterpart in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.",
    credits_url: "http://www.oracc.org/cams/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
// Remove CASPo temporarily
// settings.corpora.oracc2021_caspo = {
//     id: "oracc2021_caspo",
//     title: "CASPo: Corpus of Akkadian Shuila-Prayers online (Oracc 2021)",
//     description: "CASPo: Corpus of Akkadian Shuila-Prayers online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that this subcorpus contains less data than its counterpart in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.",
//     credits_url: "http://www.oracc.org/caspo/",
//     cite_id: "",
//     context: context.sp,
//     within: within.sp,
//     attributes: attrlist.oracc2021,
//     structAttributes: sattrlist.oracc2021
// };
settings.corpora.oracc2021_ccpo = {
    id: "oracc2021_ccpo",
    title: "CCPo: Cuneiform Commentaries Project on Oracc (Oracc 2021)",
    description: "CCPo: Cuneiform Commentaries Project on Oracc<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/ccpo/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_ckst = {
    id: "oracc2021_ckst",
    title: "CKST: Corpus of Kassite Sumerian Texts (Oracc 2021)",
    description: "CKST: Corpus of Kassite Sumerian Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/ckst/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_cmawro = {
    id: "oracc2021_cmawro",
    title: "CMAwRo: Corpus of Mesopotamian Anti-witchcraft Rituals (Oracc 2021)",
    description: "CMAwRo: Corpus of Mesopotamian Anti-witchcraft Rituals<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/cmawro/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_ctij = {
    id: "oracc2021_ctij",
    title: "CTIJ: Cuneiform Texts Mentioning Israelites, Judeans, and Other Related Groups (Oracc 2021)",
    description: "CTIJ: Cuneiform Texts Mentioning Israelites, Judeans, and Other Related Groups<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that this subcorpus contains less data than its counterpart in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.",
    credits_url: "http://www.oracc.org/ctij/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_dcclt = {
    id: "oracc2021_dcclt",
    title: "DCCLT: Digital Corpus of Cuneiform Lexical Texts (Oracc 2021)",
    description: "DCCLT: Digital Corpus of Cuneiform Lexical Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that this subcorpus contains less data than its counterpart in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.",
    credits_url: "http://www.oracc.org/dcclt/aboutdcclt/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_dccmt = {
    id: "oracc2021_dccmt",
    title: "DCCMT: Digital Corpus of Cuneiform Mathematical Texts (Oracc 2021)",
    description: "DCCMT: Digital Corpus of Cuneiform Mathematical Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/dccmt/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_dsst = {
    id: "oracc2021_dsst",
    title: "DSSt: Datenbank sumerischer Streitliteratur (Oracc 2021)",
    description: "DSSt: Datenbank sumerischer Streitliteratur<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/dsst/staff/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_ecut = {
    id: "oracc2021_ecut",
    title: "eCUT: Electronic Corpus of Urartian Texts (Oracc 2021)",
    description: "eCUT: Electronic Corpus of Urartian Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/ecut/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_epsd2 = {
    id: "oracc2021_epsd2",
    title: "EPSD2: Electronic Pennsylvania Sumerian Dictionary 2 (Oracc 2021)",
    description: "EPSD2: Electronic Pennsylvania Sumerian Dictionary 2<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/epsd2/about/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_etcsri = {
    id: "oracc2021_etcsri",
    title: "ETCSRI: Electronic Text Corpus of Sumerian Royal Inscriptions (Oracc 2021)",
    description: "ETCSRI: Electronic Text Corpus of Sumerian Royal Inscriptions<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/etcsri/staff/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_glass = {
    id: "oracc2021_glass",
    title: "Glass: Corpus of Glass Technological Texts (Oracc 2021)",
    description: "Glass: Corpus of Glass Technological Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/glass/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_hbtin = {
    id: "oracc2021_hbtin",
    title: "HBTIN: Hellenistic Babylonia: Texts, Iconography, Names (Oracc 2021)",
    description: "HBTIN: Hellenistic Babylonia: Texts, Iconography, Names<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021<br/><br/>Note that this subcorpus contains less data than its counterpart in <a href=\"http://urn.fi/urn:nbn:fi:lb-2019060601\" target=\"_blank\">Oracc, Korp version, May 2019</a>. This version is based on the JSON data that was available in <a href=\"http://oracc.museum.upenn.edu/\" target=\"_blank\">Oracc</a> in June 2021.",
    credits_url: "http://www.oracc.org/hbtin/staff.html",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_lacost = {
    id: "oracc2021_lacost",
    title: "LaOCOST: Law and Order: Cuneiform Online Sustainable Tool (Oracc 2021)",
    description: "LaOCOST: Law and Order: Cuneiform Online Sustainable Tool<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/lacost/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_obmc = {
    id: "oracc2021_obmc",
    title: "OBMC: Old Babylonian Model Contracts (Oracc 2021)",
    description: "OBMC: Old Babylonian Model Contracts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/obmc/aboutobmc/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_obta = {
    id: "oracc2021_obta",
    title: "OBTA: Old Babylonian Tabular Accounts (Oracc 2021)",
    description: "OBTA: Old Babylonian Tabular Accounts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/obta/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_riao = {
    id: "oracc2021_riao",
    title: "RIAo: Royal Inscriptions of Assyria online (Oracc 2021)",
    description: "RIAo: Royal Inscriptions of Assyria online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/riao/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_ribo = {
    id: "oracc2021_ribo",
    title: "RIBo: Royal Inscriptions of Babylonia online (Oracc 2021)",
    description: "RIBo: Royal Inscriptions of Babylonia online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/ribo/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_rimanum = {
    id: "oracc2021_rimanum",
    title: "Rīm-Anum: The House of Prisoners (Oracc 2021)",
    description: "Rīm-Anum: The House of Prisoners<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/rimanum/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_rinap = {
    id: "oracc2021_rinap",
    title: "RINAP: Royal Inscriptions of the Neo-Assyrian Period (Oracc 2021)",
    description: "RINAP: Royal Inscriptions of the Neo-Assyrian Period<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/rinap/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_saao = {
    id: "oracc2021_saao",
    title: "SAAo: State Archives of Assyria Online (Oracc 2021)",
    description: "SAAo: State Archives of Assyria Online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/saao/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};
settings.corpora.oracc2021_suhu = {
    id: "oracc2021_suhu",
    title: "Suhu: The Inscriptions of Suhu online (Oracc 2021)",
    description: "Suhu: The Inscriptions of Suhu online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, June 2021",
    credits_url: "http://www.oracc.org/suhu/abouttheproject/",
    cite_id: "",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc2021,
    structAttributes: sattrlist.oracc2021
};

// Oracc 2019

settings.corpora.oracc_adsd = {
    id: "oracc_adsd",
    title: "Astronomical Diaries Digital (Oracc 2019)",
    description: "ADsD: Astronomical Diaries Digital<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_ario = {
    id: "oracc_ario",
    title: "Achaemenid Royal Inscriptions online (Oracc 2019)",
    description: "ARIo: Achaemenid Royal Inscriptions online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_blms = {
    id: "oracc_blms",
    title: "Bilinguals in Late Mesopotamian Scholarship (Oracc 2019)",
    description: "blms: Bilinguals in Late Mesopotamian Scholarship<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_cams = {
    id: "oracc_cams",
    title: "Corpus of Ancient Mesopotamian Scholarship (Oracc 2019)",
    description: "CAMS: Corpus of Ancient Mesopotamian Scholarship<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_caspo = {
    id: "oracc_caspo",
    title: "Corpus of Akkadian Shuila-Prayers online (Oracc 2019)",
    description: "CASPo: Corpus of Akkadian Shuila-Prayers online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_ctij = {
    id: "oracc_ctij",
    title: "Cuneiform Texts Mentioning Israelites, Judeans, and Other Related Groups (Oracc 2019)",
    description: "CTIJ: Cuneiform Texts Mentioning Israelites, Judeans, and Other Related Groups<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_dcclt = {
    id: "oracc_dcclt",
    title: "Digital Corpus of Cuneiform Lexical Texts (Oracc 2019)",
    description: "DCCLT: Digital Corpus of Cuneiform Lexical Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_dccmt = {
    id: "oracc_dccmt",
    title: "Digital Corpus of Cuneiform Mathematical Texts (Oracc 2019)",
    description: "DCCMT: Digital Corpus of Cuneiform Mathematical Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_ecut = {
    id: "oracc_ecut",
    title: "Electronic Corpus of Urartian Texts (Oracc 2019)",
    description: "eCUT: Electronic Corpus of Urartian Texts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_etcsri = {
    id: "oracc_etcsri",
    title: "Electronic Text Corpus of Sumerian Royal Inscriptions (Oracc 2019)",
    description: "ETCSRI: Electronic Text Corpus of Sumerian Royal Inscriptions<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_hbtin = {
    id: "oracc_hbtin",
    title: "Hellenistic Babylonia (Oracc 2019)",
    description: "HBTIN: Hellenistic Babylonia: Texts, Iconography, Names<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_obmc = {
    id: "oracc_obmc",
    title: "Old Babylonian Model Contracts (Oracc 2019)",
    description: "OBMC: Old Babylonian Model Contracts<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_others = {
    id: "oracc_others",
    title: "Other projects (Oracc 2019)",
    description: "Other projects<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_riao = {
    id: "oracc_riao",
    title: "Royal Inscriptions of Assyria online (Oracc 2019)",
    description: "RIAo: Royal Inscriptions of Assyria online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_ribo = {
    id: "oracc_ribo",
    title: "Royal Inscriptions of Babylonia online (Oracc 2019)",
    description: "RIBo: Royal Inscriptions of Babylonia online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_rimanum = {
    id: "oracc_rimanum",
    title: "The House of Prisoners (Oracc 2019)",
    description: "Rīm-Anum: The House of Prisoners<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_rinap = {
    id: "oracc_rinap",
    title: "Royal Inscriptions of the Neo-Assyrian Period (Oracc 2019)",
    description: "RINAP: Royal Inscriptions of the Neo-Assyrian Period<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};
settings.corpora.oracc_saao = {
    id: "oracc_saao",
    title: "State Archives of Assyria Online (Oracc 2019)",
    description: "SAAo: State Archives of Assyria Online<br/>Part of Oracc – Open Richly Annotated Cuneiform Corpus, Korp Version, May 2019",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.oracc,
    structAttributes: sattrlist.oracc
};


settings.corpora.ethesis_ru = {
    title: "E-thesis (русский)",
    description: "The University of Helsinki’s Russian E-thesis, Korp Version<br/>Corpus of theses and dissertations (2005–2016)",
    id: "ethesis_ru",
    metadata_urn: "urn:nbn:fi:lb-2016102808",
    urn: "urn:nbn:fi:lb-2016102805",
    shortname: "ethesis-ru",
};

settings.corpora.ethesis_es = {
    title: "E-thesis (español)",
    description: "The University of Helsinki’s Spanish E-thesis, Korp Version<br/>Corpus of theses and dissertations (2003–2015)",
    id: "ethesis_es",
    metadata_urn: "urn:nbn:fi:lb-2016102809",
    urn: "urn:nbn:fi:lb-2016102804",
    shortname: "e-thesis-es",
};

settings.corpora.ethesis_fr = {
    title: "E-thesis (français)",
    description: "The University of Helsinki’s French E-thesis, Korp Version<br/>Corpus of theses and dissertations (2000–2016)",
    id: "ethesis_fr",
    metadata_urn: "urn:nbn:fi:lb-2016102806",
    urn: "urn:nbn:fi:lb-2016102803",
    shortname: "e-thesis-fr",
};

settings.corpora.ethesis_de = {
    title: "E-thesis (Deutsch)",
    description: "The University of Helsinki’s German E-thesis, Korp Version<br/>Corpus of theses and dissertations (1997–2016)",
    id: "ethesis_de",
    metadata_urn: "urn:nbn:fi:lb-2016102807",
    urn: "urn:nbn:fi:lb-2016102802",
    shortname: "e-thesis-de",
};

// Add common properties to E-thesis corpora
funcs.extendCorpusSettings(
    {
        licence: settings.licenceinfo.CC_BY,
        homepage: {
            url: "https://ethesis.helsinki.fi/en/",
            name: "Digital dissertations and theses at the University of Helsinki",
            // no_label: true,
        },
        within: within.default,
        context: context.default,
        attributes: {},
        structAttributes: sattrlist.ethesis
    },
    [
        "ethesis_ru",
        "ethesis_es",
        "ethesis_fr",
        "ethesis_de",
    ]);


sattrlist.sust_common = {
    text_lang: {
        label: "lang",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "kpv",
            "mdf",
            "myv",
        ],
        translation: transl.lang,
    },
    text_recdate: {
        label: "interview_date"
    },
    text_interviewee: {
        label: "interviewee"
    },
    text_interviewer: {
        label: "interviewer"
    },
    text_locale: {
        label: "locality"
    },
    text_locale_orig: {
        label: "locality_orig"
    },
    text_locale_rus: {
        label: "locality_russian"
    },
    text_id_orig: {
        label: "text_title_orig",
    },
    text_id_deu: {
        label: "text_title_transl",
    },
    // text_title: {
    //     label: "text_title"
    // },
    text_publ_name: {
        label: "publication_name",
    },
    text_issue: {
        label: "text_issue"
    },
    text_publisher: {
        label: "publisher"
    },
    text_publ_year: {
        label: "publication_year"
    },
    text_publ_place: {
        label: "publication_place",
    },
    text_corryear: {
        label: "text_correction_year"
    },
    text_corrector: {
        label: "text_corrector"
    },
    text_collection: {
        label: "text_collection",
        displayType: "hidden",
    },
    text_genre_deu: {
        label: "genre",
    },
    text_comment_deu: {
        label: "comment_german",
    },
    text_pagerange: {
        label: "text_page_range",
    },
    text_licence: {
        label: "licence",
    },
    text_status_eng: {
        label: "text_status",
    },
    text_type: {
        label: "text_type",
    },
    text_textnum: {
        label: "text_num",
    },
    sentence_type: {
        label: "sentence_type",
    },
    sentence_orig: {
        label: "transcription",
    },
    sentence_transl_deu: {
        label: "translation_german",
    },
    sentence_pagenum: {
        label: "page_num",
    },
    sentence_pageline: {
        label: "page_line",
    },
    sentence_paranum: {
        label: "paragraph_num",
    },
    sentence_sentnum: {
        label: "sentence_num",
    },
};


attrlist.sust_common = {
    ref: attrs.ref,
    phon: {
        label: "transcription",
    },
};

attrlist.sust_tagged = $.extend(true, attrlist.sust_common, {
    lemma: {
        label: "lemma",
    },
    pos: {
        label: "pos",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: {
            "A": "A",
            "Adv": "Adv",
            "CC": "CC",
            "CLB": "PUnct",
            "N": "N",
            "Num": "Num",
            "Pcle": "Particle",
            "Po": "Post",
            "Pron": "Pron",
            "V": "V",
            null: null,
        },
        translation: transl.pos,
    },
    msd: {
        label: "msd",
    },
});


settings.corpora.sust_mdf = {
    id: "sust_mdf",
    title: "SUS-kenttätyö: mokša (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: mokša (näyte)",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.sust_tagged,
    structAttributes: sattrlist.sust_common
};

settings.corpora.sust_myv = {
    id: "sust_myv",
    title: "SUS-kenttätyö: ersä (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: ersä (näyte)",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.sust_tagged,
    structAttributes: sattrlist.sust_common
};

settings.corpora.sust_kpv = {
    id: "sust_kpv",
    title: "SUS-kenttätyö: komisyrjääni (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: komisyrjääni (näyte)",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.sust_tagged,
    structAttributes: sattrlist.sust_common
};

// TODO: check how attribute spaces should be shown
attrlist.wanca_common = {
    spaces: {
        label: "whitespace_related_to_token",
        dataset: {
            "_": "_",
            "SpaceAfter=No": "SpaceAfter=No",
            "SpacesAfter=\n\n": "SpacesAfter=\n\n",
            "SpacesBefore=\s": "SpacesBefore=\s",
            "SpacesAfter= ": "SpacesAfter= ",
            "SpacesAfter=\s\s": "SpacesAfter=\s\s",
            "SpacesBefore=\s|SpaceAfter=No": "SpacesBefore=\s|SpaceAfter=No",
            "SpacesAfter=　\s": "SpacesAfter=　\s",
            "SpacesAfter=  ": "SpacesAfter=  ",
        },
    },
    ref: attrs.ref,
};

sattrlist.wanca_common = {
    text_url: {
        label: "URL",
        type: "url",
        urlOpts: sattrs.link_url_opts
    },
};

settings.corpora.wanca_2016_fit_multili = {
    id: "wanca_2016_fit_multili",
    title: "Wanca 2016: Tornedalen Finnish (meänkieli)",
    description: "A collection of web corpora in small Uralic languages: Tornedalen Finnish (meänkieli)",
    lang: "fit",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_fkv_multili = {
    id: "wanca_2016_fkv_multili",
    title: "Wanca 2016: Kven (kvääni)",
    description: "A collection of web corpora in small Uralic languages: Kven (kvääni)",
    lang: "fkv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_izh = {
    id: "wanca_2016_izh",
    title: "Wanca 2016: Ingrian (ižoran keel)",
    description: "A collection of web corpora in small Uralic languages: Ingrian (ižoran keel)",
    lang: "izh",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_kca_multili = {
    id: "wanca_2016_kca_multili",
    title: "Wanca 2016: Khanty (ханты ясанг)",
    description: "A collection of web corpora in small Uralic languages: Khanty (ханты ясанг)",
    lang: "kca",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_koi_multili = {
    id: "wanca_2016_koi_multili",
    title: "Wanca 2016: Komi-Permyak (перем коми кыв)",
    description: "A collection of web corpora in small Uralic languages: Komi-Permyak (перем коми кыв)",
    lang: "koi",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_kpv_multili = {
    id: "wanca_2016_kpv_multili",
    title: "Wanca 2016: Komi-Zyrian (Коми кыв)",
    description: "A collection of web corpora in small Uralic languages: Komi-Zyrian (Коми кыв)",
    lang: "kpv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_krl_multili = {
    id: "wanca_2016_krl_multili",
    title: "Wanca 2016: Karelian (karjal)",
    description: "A collection of web corpora in small Uralic languages: Karelian (karjal)",
    lang: "krl",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_liv = {
    id: "wanca_2016_liv",
    title: "Wanca 2016: Liv (līvõ kēļ)",
    description: "A collection of web corpora in small Uralic languages: Liv (līvõ kēļ)",
    lang: "liv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_lud = {
    id: "wanca_2016_lud",
    title: "Wanca 2016: Ludian (lüüdin kiel')",
    description: "A collection of web corpora in small Uralic languages: Ludian (lüüdin kiel')",
    lang: "lud",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_mdf_multili = {
    id: "wanca_2016_mdf_multili",
    title: "Wanca 2016: Moksha (мокшень)",
    description: "A collection of web corpora in small Uralic languages: Moksha (мокшень)",
    lang: "mdf",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_mhr_multili = {
    id: "wanca_2016_mhr_multili",
    title: "Wanca 2016: Eastern and Meadow Mari (марий йылме)",
    description: "A collection of web corpora in small Uralic languages: Eastern and Meadow Mari (марий йылме)",
    lang: "mhr",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_mns_multili = {
    id: "wanca_2016_mns_multili",
    title: "Wanca 2016: Mansi (мāньси лāтыӈ)",
    description: "A collection of web corpora in small Uralic languages: Mansi (мāньси лāтыӈ)",
    lang: "mns",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_mrj_multili = {
    id: "wanca_2016_mrj_multili",
    title: "Wanca 2016: Western or Hill Mari (Кырык мары)",
    description: "A collection of web corpora in small Uralic languages: Western or Hill Mari (Кырык мары)",
    lang: "mrj",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_myv_multili = {
    id: "wanca_2016_myv_multili",
    title: "Wanca 2016: Erzya (эрзянь)",
    description: "A collection of web corpora in small Uralic languages: Erzya (эрзянь)",
    lang: "myv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_nio = {
    id: "wanca_2016_nio",
    title: "Wanca 2016: Nganasan (ня”)",
    description: "A collection of web corpora in small Uralic languages: Nganasan (ня”)",
    lang: "nio",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_olo_multili = {
    id: "wanca_2016_olo_multili",
    title: "Wanca 2016: Livvi (Olonets / livvin karjal)",
    description: "A collection of web corpora in small Uralic languages: Livvi (Olonets / livvin karjal)",
    lang: "olo",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sjd = {
    id: "wanca_2016_sjd",
    title: "Wanca 2016: Kildin Sami (Кӣллт са̄мь кӣлл)",
    description: "A collection of web corpora in small Uralic languages: Kildin Sami (Кӣллт са̄мь кӣлл)",
    lang: "sjd",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sjk = {
    id: "wanca_2016_sjk",
    title: "Wanca 2016: Kemi Sami (samääškiela)",
    description: "A collection of web corpora in small Uralic languages: Kemi Sami (samääškiela)",
    lang: "sjk",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sju = {
    id: "wanca_2016_sju",
    title: "Wanca 2016: Ume Sami (uumajanlappi)",
    description: "A collection of web corpora in small Uralic languages: Ume Sami (uumajanlappi)",
    lang: "sju",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sma_multili = {
    id: "wanca_2016_sma_multili",
    title: "Wanca 2016: Southern Sami (åarjel-saemien)",
    description: "A collection of web corpora in small Uralic languages: Southern Sami (åarjel-saemien)",
    lang: "sma",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sme_multili = {
    id: "wanca_2016_sme_multili",
    title: "Wanca 2016: Northern Sami (davvisámi, davvisámegiella)",
    description: "A collection of web corpora in small Uralic languages: Northern Sami (davvisámi, davvisámegiella)",
    lang: "sme",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_smj_multili = {
    id: "wanca_2016_smj_multili",
    title: "Wanca 2016: Lule Sami (julevsábme)",
    description: "A collection of web corpora in small Uralic languages: Lule Sami (julevsábme)",
    lang: "smj",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_smn_multili = {
    id: "wanca_2016_smn_multili",
    title: "Wanca 2016: Inari Sami (anarâškielâ)",
    description: "A collection of web corpora in small Uralic languages: Inari Sami (anarâškielâ)",
    lang: "smn",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_sms_multili = {
    id: "wanca_2016_sms_multili",
    title: "Wanca 2016: Skolt Sami (sää´mǩiõll)",
    description: "A collection of web corpora in small Uralic languages: Skolt Sami (sää´mǩiõll)",
    lang: "sms",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_udm_multili = {
    id: "wanca_2016_udm_multili",
    title: "Wanca 2016: Udmurt (удмурт кыл)",
    description: "A collection of web corpora in small Uralic languages: Udmurt (удмурт кыл)",
    lang: "udm",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_vep_multili = {
    id: "wanca_2016_vep_multili",
    title: "Wanca 2016: Veps (vepsän kel')",
    description: "A collection of web corpora in small Uralic languages: Veps (vepsän kel')",
    lang: "vep",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_vot = {
    id: "wanca_2016_vot",
    title: "Wanca 2016: Votic (vad̕d̕a ceeli)",
    description: "A collection of web corpora in small Uralic languages: Votic (vad̕d̕a ceeli)",
    lang: "vot",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_vro_multili = {
    id: "wanca_2016_vro_multili",
    title: "Wanca 2016: Võro (võro kiil)",
    description: "A collection of web corpora in small Uralic languages: Võro (võro kiil)",
    lang: "vro",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};

settings.corpora.wanca_2016_yrk = {
    id: "wanca_2016_yrk",
    title: "Wanca 2016: Nenets (ненэцяʼ вада)",
    description: "A collection of web corpora in small Uralic languages: Nenets (ненэцяʼ вада)",
    lang: "yrk",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.wanca_common,
    structAttributes: sattrlist.wanca_common
};


// Fenno-Ugrica

sattrlist.fennougrica_veps = {
    sentence_id: sattrs.sentence_id_hidden,
    sentence_page: { label: "klk_page"},
    within: within.sp,
    context: context.sp,
    text_datefrom: sattrs.date,
    text_year: {
        label: "year"
    },
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    }
};

attrlist.fennougrica_veps = {
    url: {
        label: "klk_img_url",
        type: "url"
    }
};

attrlist.fennougrica = {};

sattrlist.fennougrica = {
    within: within.sp,
    context: context.sp,
    text_datefrom: sattrs.date,
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    },
    text_editor: {
        label: "klk_editor"
    },
    text_lang: {
        label: "klk_lang",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: {
            "izh": "izh",
            "kca": "kca",
            "mdf": "mdf",
            "mns": "mns",
            "mrj": "mrj",
            "myv": "myv",
            "sel": "sel",
            "vep": "vep",
            "yrk": "yrk"
        },
        translation: transl.lang,

    },
    text_link: {
        urlOpts: sattrs.link_url_opts,
        label: "klk_img_url",
        type: "url"
    }
};

settings.corpora.fennougrica_izh = {
    id: "fennougrica_izh",
    title: "Inkeroinen",
    description: "Fenno-Ugrica, inkeroinen",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mhr = {
    id: "fennougrica_mhr",
    title: "Itämari",
    description: "Fenno-Ugrica, itämari",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_kca = {
    id: "fennougrica_kca",
    title: "Hanti",
    description: "Fenno-Ugrica, hanti",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mdf = {
    id: "fennougrica_mdf",
    title: "Mokša",
    description: "Fenno-Ugrica, mokša",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mns = {
    id: "fennougrica_mns",
    title: "Mansi",
    description: "Fenno-Ugrica, mansi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mrj = {
    id: "fennougrica_mrj",
    title: "Länsimari",
    description: "Fenno-Ugrica, länsimari",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_myv = {
    id: "fennougrica_myv",
    title: "Ersä",
    description: "Fenno-Ugrica, ersä",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_sel = {
    id: "fennougrica_sel",
    title: "Selkuppi",
    description: "Fenno-Ugrica, selkuppi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_vep = {
    id: "fennougrica_vep",
    title: "Vepsä",
    description: "Fenno-Ugrica, vepsä",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_yrk = {
    id: "fennougrica_yrk",
    title: "Tundranenetsi",
    description: "Fenno-Ugrica, tundranenetsi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.fennougrica,
    structAttributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.mulcold_en = {
    id: "mulcold_en",
    title: "MULCOLD englanti",
    description: "Multilingual Corpus of Legal Documents, englanninkielinen osa",
    context: context.default,
    within: within.default,
    attributes: attrlist.mulcold_en,
    structAttributes: sattrlist.mulcold,
};

settings.corpora.mulcold_de = {
    id: "mulcold_de",
    title: "MULCOLD saksa",
    description: "Multilingual Corpus of Legal Documents, saksankielinen osa",
    context: context.default,
    within: within.default,
    attributes: attrlist.mulcold_de,
    structAttributes: sattrlist.mulcold,
};

settings.corpora.mulcold_ru = {
    id: "mulcold_ru",
    title: "MULCOLD venäjä",
    description: "Multilingual Corpus of Legal Documents, venäjänkielinen osa",
    context: context.default,
    within: within.default,
    attributes: attrlist.mulcold_ru,
    structAttributes: sattrlist.mulcold,
};

funcs.extendCorpusSettings(settings.corpusinfo.mulcold,
                           ["mulcold_en", "mulcold_de", "mulcold_ru"]);

settings.corpora.legal_ru = {
    id: "legal_ru",
    title: "FiRuLex venäjä",
    description: "Jurdisia tekstejä (venäjä)",
    context: context.default,
    within: within.default,
    attributes: attrlist.mulcold_ru,
    structAttributes: sattrlist.legal
};

funcs.extendCorpusSettings(settings.corpusinfo.firulex,
                           ["legal_ru"]);


/* E-thesis en */

settings.templ.ethesis_en_base = {
    title: "E-thesis: {}",
    description: "The University of Helsinki's English E-thesis 1999-2016, Korp version 1.1: Master’s theses: {}",
    id: "ethesis_en_{}",
    within: within.default,
    context: context.default,
    attributes: attrlist.ud2_en,
    structAttributes: sattrlist.ethesis,
};

funcs.addCorpusSettings(
    settings.templ.ethesis_en_base,
    [
        ["maabs", "Master’s thesis abstracts",
         "Master’s thesis abstracts (1999–2016)"],
        ["dissabs", "Doctoral dissertation abstracts",
         "Doctoral disseration abstracts (2006–2016)"],
    ]);

settings.templ.ethesis_en_ma = $.extend(
    {}, settings.templ.ethesis_en_base,
    {
        id: "ethesis_en_ma_{}",
        title: "E-thesis: Master’s theses: {}",
        description: "The University of Helsinki's English E-thesis 1999-2016, Korp version 1.1: Master’s theses: {}",
    });

funcs.addCorpusSettings(
    settings.templ.ethesis_en_ma,
    [
        ["ot", "Law", "Faculty of Law (2010–2015)"],
        ["med", "Medicine", "Faculty of Medicine (2009–2015)"],
        ["el", "Veterinary Medicine",
         "Faculty of Veterinary Medicine (2003–2016)"],
        ["hum", "Arts", "Faculty of Arts (1997–2016)"],
        ["beh", "Behavioural Sciences",
         "Faculty of Behavioural Sciences (2000–2016)"],
        ["bio", "Biological and Environmental Sciences",
         "Faculty of Biological and Environmental Sciences (2006–2015)"],
        ["far", "Pharmacy", "Faculty of Pharmacy (2003, 2010–2016)"],
        ["mm", "Agriculture and Forestry",
         "Agriculture and Forestry (2002–2016)"],
        ["sci", "Science", "Faculty of Science (1999–2016)"],
        ["teo", "Theology", "Faculty of Theology (2006–2016)"],
        ["valt", "Social Sciences", "Faculty of Social Sciences (1999–2016)"],
        ["ai", "Aleksanteri Institute", "Aleksanteri Institute (2009–2015)"],
    ]);

settings.templ.ethesis_en_phd = $.extend(
    {}, settings.templ.ethesis_en_base,
    {
        id: "ethesis_en_phd_{}",
        title: "E-thesis: Doctoral dissertations: {}",
        description: "The University of Helsinki's English E-thesis 1999-2016, Korp version 1.1: Doctoral dissertations: {}",
    });

funcs.addCorpusSettings(
    settings.templ.ethesis_en_phd,
    [
        ["beh", "Behavioural Sciences",
         "Faculty of Behavioural Sciences (1999–2016)"],
        ["bio", "Biological and Environmental Sciences",
         "Faculty of Biological and Environmental Sciences (1997–2016)"],
        ["el", "Veterinary Medicine",
         "Faculty of Veterinary Medicine (1999–2016)"],
        ["far", "Pharmacy", "Faculty of Pharmacy (1999–2016)"],
        ["mm", "Agriculture and Forestry",
         "Agriculture and Forestry (1999–2016)"],
        ["hum", "Arts", "Faculty of Arts (1989, 1998–2016)"],
        ["sci", "Science", "Faculty of Science (1992, 1995–2016)"],
        ["ot", "Law", "Faculty of Law (2002, 2004–2016)"],
        ["teo", "Theology", "Faculty of Theology (2002–2016)"],
        ["med", "Medicine", "Faculty of Medicine (1998–2016)"],
        ["valt", "Social Sciences", "Faculty Social Sciences (1999–2016)"],
    ]);


/* ParRus 2016 ru */

settings.corpora.parrus_2016_ru = {
    id: "parrus_2016_ru",
    title: "ParRus 2016 (русский)",
    description: "ParRus 2016: русско-финский корпус художественных текстов. Русская классическая и современная проза.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
    urn: "urn:nbn:fi:lb-2016121605",
    metadata_urn: "urn:nbn:fi:lb-2016121614",
    licence: settings.licenceinfo.ParFinRus_2016_en,
    cite_id: "ParRus2016",
    context: context.sentLink,
    within: within.sentLink,
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.parrus_2016_ru,
    structAttributes: sattrlist.parrus_2016_ru,
};
funcs.extendCorpusSettings(settings.corpusinfo.parrus_2016,
                           ["parrus_2016_ru"]);


/* ParFin 2016 ru */

settings.corpora.parfin_2016_ru = {
    id: "parfin_2016_ru",
    title: "ParFin 2016 (русский)",
    description: "ParFin 2016: финско-русский корпус художественных текстов. Переводы финской прозы 1910–2008 гг. на русский язык.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
    urn: "urn:nbn:fi:lb-2016121603",
    metadata_urn: "urn:nbn:fi:lb-2016121612",
    licence: settings.licenceinfo.ParFinRus_2016_en,
    cite_id: "ParFin2016",
    context: context.sentLink,
    within: within.sentLink,
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.parfin_2016_ru,
    structAttributes: sattrlist.parfin_2016_ru,
};
funcs.extendCorpusSettings(settings.corpusinfo.parfin_2016,
                           ["parfin_2016_ru"]);


settings.corpora.topling_en = {
    id: "topling_en",
    title: "Topling (English)",
    description: "Topling – Paths in Second Language Acquisition, English subcorpus",
    urn: "urn:nbn:fi:lb-2016112901",
    metadata_urn: "urn:nbn:fi:lb-2016111803",
    lbr_id: "urn:nbn:fi:lb-20140730168",
    licence: {
        name: "CLARIN RES +NC +DEP 2.1",
        urn: "urn:nbn:fi:lb-2016112308"
    },
    homepage_url: "https://www.jyu.fi/topling",
    cite_id: "topling-en",
    limitedAccess: true,
    licenceType: "RES",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.topling,
    structAttributes: sattrlist.topling
};

settings.corpusAliases["topling-en"] = "topling_en";


settings.corpora.elfa = {
    id: "elfa",
    title: "ELFA",
    description: "ELFA – The Corpus of English as a Lingua Franca in Academic Settings (anonymised transcriptions), preliminary Korp version<br>The ELFA corpus contains 1 million words of transcribed spoken academic ELF (approximately 131 hours of recorded speech). The recordings were made at the University of Tampere, the University of Helsinki, Tampere University of Technology, and Helsinki University of Technology.",
    urn: "urn:nbn:fi:lb-2016061301",
    metadata_urn: "urn:nbn:fi:lb-2016061302",
    licence: settings.licenceinfo.CC_BY,
    iprholder: {
        name: "Professor Anna Mauranen, University of Helsinki",
    },
    cite_id: "ELFA-korp",
    context: context.sp,
    within: within.sp,
    ignoreBetweenTokensCQP: '[type != "word"]*',
    attributes: {
        type: {
            label: "token_type",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: {
                "word": "word",
                "hesitation": "hesitation",
                "pause": "pause",
                "backchannel": "backchannel",
                "overlap_begin": "overlap begin",
                "overlap_end": "overlap end",
                "voice_shift": "voice shift",
                "mode_shift": "mode shift",
                "unclear": "unclear",
                "laugh": "laugh",
                "cough": "cough",
                "incident": "incident",
                "sigh.*": "sigh",
                "foreign.*|repeats the question in russian": "foreign",
                "humming": "humming",
                "name.*|(company|village) name|ethnic group|book title|.*e-mail address": "name",
                "pronounces the sound": "pronounces the sound",
                "pronounces the name": "pronounces the name",
                "makes an attacking noise": "makes an attacking noise",
                "inaudibly through the microphone": "inaudibly through the microphone",
                "imitates barking": "imitates barking",
                "gasp": "gasp",
                "clicking his tongue": "clicking tongue",
                "null": "unspecified",
            },
        },
        subtype: {
            label: "token_subtype",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: {
                "overlap": "overlap",
                "unfinished": "unfinished",
                "unclear": "unclear",
                "begin": "begin",
                "end": "end",
                "anonymized_name": "anonymized name",
                "foreign": "foreign",
                "sic": "sic",
                "null": "unspecified",
            },
        },
        mode: {
            label: "action_type",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: {
                "speaking": "speaking",
                "reading_aloud": "reading aloud",
                "writing_on_blackboard": "writing on blackboard",
                "null": "unspecified",
            },
        },
        voice: {
            label: "speaking_mode",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: {
                "normal": "normal",
                "laugh": "laugh",
                "whisp": "whisp",
                "mock_accent": "mock accent",
                "mutter": "mutter",
                "Finnish_pronunciation": "Finnish pronunciation",
                "spelling": "spelling",
                "imitating_stress": "imitating stress",
                "Italian_pronunciation": "Italian pronunciation",
                "Finnish_spelling": "Finnish spelling",
                "null": "unspecified",
            },
        },
        tags: {
            label: "enclosing_elements",
            type: "set",
            displayType: "hidden",
        },
        synch_id: {
            label: "synch_id",
            isStructAttr: true,
        },
        synch_speaker_id: {
            label: "other_speaker_id",
            isStructAttr: true,
        },
        synch_content: {
            label: "other_speaker_content",
            isStructAttr: true,
        },
    },
    structAttributes: {
        text_id: {
            label: "text_id",
        },
        text_domain: {
            label: "academic_domain",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "behavioural_sciences",
                "economics_and_administration",
                "humanities",
                "medicine",
                "natural_sciences",
                "other",
                "social_sciences",
                "technology",
            ],
            translation: {
                "behavioural_sciences": {
                    "en": "behavioural sciences",
                    // "fi": "behavioural_sciences",
                    // "sv": "behavioural_sciences",
                },
                "economics_and_administration": {
                    "en": "economics and administration",
                    // "fi": "economics_and_administration",
                    // "sv": "economics_and_administration",
                },
                "humanities": {
                    "en": "humanities",
                    // "fi": "humanities",
                    // "sv": "humanities",
                },
                "medicine": {
                    "en": "medicine",
                    // "fi": "medicine",
                    // "sv": "medicine",
                },
                "natural_sciences": {
                    "en": "natural sciences",
                    // "fi": "natural_sciences",
                    // "sv": "natural_sciences",
                },
                "other": {
                    "en": "other",
                    // "fi": "other",
                    // "sv": "other",
                },
                "social_sciences": {
                    "en": "social sciences",
                    // "fi": "social_sciences",
                    // "sv": "social_sciences",
                },
                "technology": {
                    "en": "technology",
                    // "fi": "technology",
                    // "sv": "technology",
                },
            },
        },
        text_discipline: {
            label: "academic_discipline",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: [
                "accounting",
                "automation engineering",
                "biology",
                "cell biology",
                "cultural studies",
                "economics",
                "education",
                "forestry",
                "forest products chemistry",
                "genetics",
                "haematology",
                "history of science & technology",
                "industrial engineering and management",
                "information sciences",
                "information technology",
                "internal medicine",
                "international relations",
                "journalism and mass communication",
                "management studies",
                "materials engineering",
                "mathematics",
                "multidisciplinary",
                "neurology",
                "other",
                "philosophy",
                "physics",
                "political history",
                "political science",
                "public health",
                "regional studies",
                "Russian studies",
                "Slavonic philology",
                "social history",
                "social policy",
                "social policy and social work",
                "sociology",
                "Swedish philology",
                "translation studies",
                "virology",
                "women's studies",
            ],
        },
        text_event_type: {
            label: "event_type",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: [
                "conference discussion",
                "conference presentation",
                "doctoral defence discussion",
                "doctoral defence presentation",
                "ISSS seminar discussion",
                "lecture",
                "lecture discussion",
                "panel discussion",
                "post-graduate seminar discussion",
                "post-graduate seminar presentation",
                "presentation",
                "seminar discussion",
                "seminar presentation",
            ],
        },
        text_event_purpose: {
            label: "event_purpose",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "discuss",
                "inform",
            ],
            translation: {
                "discuss": {
                    "en": "discuss",
                    // "fi": "discuss",
                    // "sv": "discuss",
                },
                "inform": {
                    "en": "inform",
                    // "fi": "inform",
                    // "sv": "inform",
                },
            },
        },
        text_event_num: {
            label: "event_num",
        },
        text_event_part: {
            label: "event_part",
        },
        text_title: {
            label: "title",
        },
        text_notes: {
            label: "notes",
        },
        text_preparedness: {
            label: "preparedness",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "true",
                "false",
            ],
            translation: {
                "false": {
                    "en": "unprepared",
                    // "fi": "false",
                    // "sv": "false",
                },
                "true": {
                    "en": "prepared",
                    // "fi": "true",
                    // "sv": "true",
                },
            },
        },
        text_interaction_degree: {
            label: "interaction_degree",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "complete",
                "partial",
                "none",
            ],
            translation: {
                "complete": {
                    "en": "complete",
                    // "fi": "complete",
                    // "sv": "complete",
                },
                "none": {
                    "en": "none",
                    // "fi": "none",
                    // "sv": "none",
                },
                "partial": {
                    "en": "partial",
                    // "fi": "partial",
                    // "sv": "partial",
                },
            },
        },
        text_duration_minsec: {
            label: "recording_duration",
        },
        text_recording_type: {
            label: "recording_type",
            extendedComponent: "datasetSelect",
            localize: false,
            opts: options.lite,
            dataset: [
                "conference",
                "university degree programme",
            ],
        },
        text_num_speakers: {
            label: "num_speakers",
        },
        text_num_participants: {
            label: "num_participants",
        },
        text_date: {
            label: "date",
        },
        text_publisher: {
            displayType: "hidden",
        },
        paragraph_speaker_type: {
            label: "speaker_identification",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "identified",
                "several",
                "unidentified",
            ],
            translation: {
                "identified": {
                    "en": "single, identified speaker",
                    // "fi": "identified",
                    // "sv": "identified",
                },
                "several": {
                    "en": "several simultaneous speakers",
                    // "fi": "several",
                    // "sv": "several",
                },
                "unidentified": {
                    "en": "unidentified speaker",
                    // "fi": "unidentified",
                    // "sv": "unidentified",
                },
            },
        },
        paragraph_speaker_l1: {
            label: "speaker_l1",
            type: "set",
            extendedComponent: "datasetSelect",
            opts: options.set,
            dataset: {
                "ada-GH": "ada-GH",
                "aka.*": "aka",
                "aka-GH": "aka-GH",
                "amh": "amh",
                "ara": "ara",
                "ben": "ben",
                "ber": "ber",
                "bul": "bul",
                "cat": "cat",
                "ces": "ces",
                "cym": "cym",
                "dag-GH": "dag-GH",
                "dan": "dan",
                "deu.*": "deu",
                "deu-AT": "deu-AT",
                "deu-CH": "deu-CH",
                "ell": "ell",
                "eng.*": "eng",
                "eng-AU": "eng-AU",
                "eng-BD": "eng-BD",
                "eng-CA": "eng-CA",
                "eng-CM": "eng-CM",
                "eng-GB": "eng-GB",
                "eng-GH": "eng-GH",
                "eng-HK": "eng-HK",
                "eng-IE": "eng-IE",
                "eng-IN": "eng-IN",
                "eng-JM": "eng-JM",
                "eng-LB": "eng-LB",
                "eng-NG": "eng-NG",
                "eng-NZ": "eng-NZ",
                "eng-TT": "eng-TT",
                "eng-US": "eng-US",
                "est": "est",
                "fas": "fas",
                "fin": "fin",
                "fra.*": "fra",
                "fra-BE": "fra-BE",
                "hau-NG": "hau-NG",
                "hay": "hay",
                "heb": "heb",
                "hin": "hin",
                "hrv": "hrv",
                "hun": "hun",
                "ibo": "ibo",
                "isl": "isl",
                "ita": "ita",
                "jpn": "jpn",
                "kik.*": "kik",
                "kik-KE": "kik-KE",
                "lav": "lav",
                "lit": "lit",
                "nep": "nep",
                "nld.*": "nld",
                "nld-BE": "nld-BE",
                "nor": "nor",
                "orm-ET": "orm-ET",
                "pol": "pol",
                "por.*": "por",
                "por-BR": "por-BR",
                "qaa": "qaa",
                "ron": "ron",
                "rus": "rus",
                "slk": "slk",
                "som": "som",
                "spa.*": "spa",
                "spa-AR": "spa-AR",
                "spa-CO": "spa-CO",
                "spa-MX": "spa-MX",
                "swe.*": "swe",
                "swe-FI": "swe-FI",
                "swh.*": "swh",
                "swh-KE": "swh-KE",
                "swh-TZ": "swh-TZ",
                "tur": "tur",
                "twi.*": "twi",
                "twi-GH": "twi-GH",
                "und.*": "und",
                "und-CA": "und-CA",
                "und-GH": "und-GH",
                "und-TZ": "und-TZ",
                "urd-PK": "urd-PK",
                "uzb": "uzb",
                "yor": "yor",
                "zho": "zho",
            },
            // TODO: Add translations for the above languages to transl.lang
            // in common.js and uncomment the following line
            // translation: transl.lang,
        },
        paragraph_speaker_role: {
            label: "academic_role",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "junior staff",
                "junior staff and research student",
                "masters student",
                "other",
                "research student",
                "senior staff",
                "undergraduate",
                "unknown",
            ],
            translation: {
                "junior staff": {
                    "en": "junior staff",
                    // "fi": "junior staff",
                    // "sv": "junior staff",
                },
                "junior staff and research student": {
                    "en": "junior staff and research student",
                    // "fi": "junior staff and research student",
                    // "sv": "junior staff and research student",
                },
                "masters student": {
                    "en": "masters student",
                    // "fi": "masters student",
                    // "sv": "masters student",
                },
                "other": {
                    "en": "other",
                    // "fi": "other",
                    // "sv": "other",
                },
                "research student": {
                    "en": "research student",
                    // "fi": "research student",
                    // "sv": "research student",
                },
                "senior staff": {
                    "en": "senior staff",
                    // "fi": "senior staff",
                    // "sv": "senior staff",
                },
                "undergraduate": {
                    "en": "undergraduate",
                    // "fi": "undergraduate",
                    // "sv": "undergraduate",
                },
                "unknown": {
                    "en": "unknown",
                    // "fi": "unknown",
                    // "sv": "unknown",
                },
            },
        },
        paragraph_speaker_age: {
            label: "age",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "17-23",
                "24-30",
                "31-50",
                "51-over",
                "unknown",
            ],
            translation: {
                "17-23": {
                    "en": "17–23",
                    // "fi": "17-23",
                    // "sv": "17-23",
                },
                "24-30": {
                    "en": "24–30",
                    // "fi": "24-30",
                    // "sv": "24-30",
                },
                "31-50": {
                    "en": "31–50",
                    // "fi": "31-50",
                    // "sv": "31-50",
                },
                "51-over": {
                    "en": "over 51",
                    // "fi": "51-over",
                    // "sv": "51-over",
                },
                "unknown": {
                    "en": "unknown",
                    // "fi": "unknown",
                    // "sv": "unknown",
                },
            },
        },
        paragraph_speaker_sex: {
            label: "gender",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "male": "male",
                "female": "female",
                "unknown|null": "unknown",
            },
            translation: transl.sex,
        },
        paragraph_speaker_id: {
            label: "speaker_id",
        },
        paragraph_type: {
            label: "speech_event_type",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "utterance",
                "incident",
                "pause",
            ],
            translation: {
                "incident": {
                    "en": "incident",
                    // "fi": "incident",
                    // "sv": "incident",
                },
                "pause": {
                    "en": "pause",
                    // "fi": "pause",
                    // "sv": "pause",
                },
                "utterance": {
                    "en": "utterance",
                    // "fi": "utterance",
                    // "sv": "utterance",
                },
            },
        },
        paragraph_id: {
            label: "turn_id",
        },
        sentence_id: sattrs.sentence_id_hidden,
    },
};


sattrlist.scotscorr = {
    sentence_id: sattrs.sentence_id_hidden,
    text_from: { label: "writer" },
    text_to: { label: "addressee" },
    text_year: { label: "year" },
    text_date: { label: "date" },
    text_fraser: { label: "scotscorr_fraser" },
    text_lcinf: {
        label: "scotscorr_lcinf",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: {
            // The control characters \x01–\x08 are used to get the
            // desired sorting order in the selection list. They are
            // invisible in the output, but could they cause problems
            // in some cases?
            "Moray|Invernessshire|Sutherland|Ross": "\x01North",
            "Moray": "\x01    Moray",
            "Invernessshire": "\x01    Invernessshire",
            "Sutherland": "\x01    Sutherland",
            "Ross": "\x01    Ross",
            "Aberdeenshire|Angus": "\x02North-East",
            "Aberdeenshire": "\x02    Aberdeenshire",
            "Angus": "\x02    Angus",
            "Perthshire|Lanarkshire": "\x03Central",
            "Perthshire": "\x03    Perthshire",
            "Lanarkshire": "\x03    Lanarkshire",
            "Fife|Lothian|East Lothian|Stirlingshire|Borders": "\x04South-East",
            "Fife": "\x04    Fife",
            "Lothian": "\x04    Lothian",
            "East Lothian": "\x04    East Lothian",
            "Stirlingshire": "\x04    Stirlingshire",
            "Borders": "\x04    Borders",
            "Argyllshire|Ayrshire|South-West": "\x05South-West",
            "Argyllshire": "\x05    Argyllshire",
            "Ayrshire": "\x05    Ayrshire",
            "South-West": "\x05    South-West",
            "Court": "\x06Court",
            "Professional": "\x07Professional",
            "unlocalised": "\x08unlocalised",
        },
    },
    text_largeregion: {
        label: "scotscorr_largeregion",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: {
            // The control characters \x01–\x08 are used to get the
            // desired sorting order in the selection list. They are
            // invisible in the output, but could they cause problems
            // in some cases?
            "North": "\x01North",
            "North-East": "\x02North-East",
            "Central": "\x03Central",
            "South-East": "\x04South-East",
            "South-West": "\x05South-West",
            "Court": "\x06Court",
            "Professional": "\x07Professional",
            "Unlocalised": "\x08Unlocalised",
        },
    },
    text_lclet: { label: "scotscorr_lclet" },
    text_wgr: {
        label: "scotscorr_srg",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "female",
            "male",
            "royal",
            "unspecified",
        ],
    },
    text_agr: {
        label: "scotscorr_arg",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "female",
            "male",
            "royal",
            "unspecified",
        ],
    },
    text_lettertype: {
        label: "scotscorr_hand",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "autograph",
            "information unavailable",
            "non-autograph",
        ],
    },
    text_scripttype: {
        label: "scotscorr_scripttype",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "information unavailable",
            "initial and final formulae and signature",
            "italic",
            "letter-closing formula",
            "letter-closing formula and signature",
            "non-secretary",
            "secretary",
            "signature",
            "signatures",
            "signature and insertion",
            "the letter-closing formula and the signature",
            "the signature",
            "unspecified",
        ],
    },
    text_lettertype2: {
        label: "scotscorr_hand2",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "autograph",
            "information unavailable",
            "non-autograph",
        ],
    },
    text_scripttype2: {
        label: "scotscorr_scripttype2",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        localize: false,
        dataset: [
            "copy",
            "information unavailable",
            "non-secretary",
            "secretary",
        ],
    },
    text_wc: { label: "num_words" },
    text_id: { label: "text_id" },
    text_fn: { label: "file_name" },
    text_ms: { label: "scotscorr_ms" },
    text_bi: { label: "scotscorr_bi" },
    text_st: { label: "scotscorr_st" },
};

attrs.scotscorr_word = {
    label: "word",
    opts: options.default,
    extendedComponent: "scotscorrWord",
};


settings.corpora.scots_f1540_1599 = {
    id: "scots_f1540_1599",
    title: "ScotsCorr: Female 1540–1599",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1540–1599",
};

settings.corpora.scots_f1600_1649 = {
    id: "scots_f1600_1649",
    title: "ScotsCorr: Female 1600–1649",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1600–1649",
};

settings.corpora.scots_f1650_1699 = {
    id: "scots_f1650_1699",
    title: "ScotsCorr: Female 1650–1699",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1650–1699",
};

settings.corpora.scots_f1700_1749 = {
    id: "scots_f1700_1749",
    title: "ScotsCorr: Female 1700–1749",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1700–1749",
};

settings.corpora.scots_m1540_1599 = {
    id: "scots_m1540_1599",
    title: "ScotsCorr: Male 1540–1599",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1540–1599",
};

settings.corpora.scots_m1600_1649 = {
    id: "scots_m1600_1649",
    title: "ScotsCorr: Male 1600–1649",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1600–1649",
};

settings.corpora.scots_m1650_1699 = {
    id: "scots_m1650_1699",
    title: "ScotsCorr: Male 1650–1699",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1650–1699",
};

settings.corpora.scots_m1700_1749 = {
    id: "scots_m1700_1749",
    title: "ScotsCorr: Male 1700–1749",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1700–1749",
};

settings.corpora.scots_royal = {
    id: "scots_royal",
    title: "ScotsCorr: Royal",
    description: "Helsinki Corpus of Scottish Correspondence: Royal",
};

funcs.extendCorpusSettings(
    {
        context: {
            // 2 preceding and following lines, but not crossing
            // sentence boundaries. Note that this context syntax with
            // a secondary context requires a modified korp.cgi (Git
            // tag backend_20161201_secondary_contexts).
            "3 line/1 sentence": "3 line/1 sentence",
            // In ScotsCorr, sentence, paragraph and text are all the
            // same regions, but only paragraph works here, since it
            // is the default "reading mode" context.
            "1 paragraph": "1 paragraph"
        },
        within: within.default,
        limitedAccess: settings.isPublicServer,
        licenceType: "ACA",
        attributes: {
            // This currently adds "word" also as a word attribute in
            // attribute selection list, but it works in the same way
            // as the word itself.
            word: attrs.scotscorr_word,
            comment: {
                label: "word_related_comment",
            },
        },
        structAttributes: sattrlist.scotscorr,
        ignoreBetweenTokensCQP: '[word="[^a-zA-Z0-9]+|\\{.*"]*',
    },
    [
        "scots_f1540_1599",
        "scots_m1540_1599",
        "scots_f1600_1649",
        "scots_m1600_1649",
        "scots_f1650_1699",
        "scots_m1650_1699",
        "scots_f1700_1749",
        "scots_m1700_1749",
        "scots_royal",
    ]);

settings.corpusAliases.scotscorr = "scots_.*";


// ERME

attrlist.testerzya = {};
sattrlist.erme_debug = {}


sattrlist.erme_v2 = {
    text_iso_lang: { label: "uralic_ud_text_iso_lang" },
    text_genre: { label: "text_genre" },
    text_author: { label: "text_author" },
    text_page_range: { label: "text_page_range" },
    text_title: { label: "text_title" },
    text_wc: { label: "num_words" },
    text_id: { label: "text_id" },
    text_corrector: { label: "text_corrector" },
    text_charc: { label: "num_chars" },
    text_isbn: { label: "isbn" },
    text_year: { label: "text_year" },
    text_publisher: { label: "publisher" },
    text_e_corrector: { label: "text_e_corrector" },
    text_publication: { label: "publication_name" },
    text_no_of_pages: { label: "numberofpages" },
    text_publication_bibliog: { label: "publication_bibliography" },
    text_author_geo: { label: "text_author_geo" },
    text_bibliog: { label: "bibliography" },
    text_pages: { label: "text_pages" },
    chapter_storyid: { label: "story_id" },
    chapter_chapid: { label: "chapter_id" },
    paragraph_storyid: { label: "paragraph_story_id" },
    paragraph_pid: { label: "paragraph_pid" },
    paragraph_chapid: { label: "paragraph_chapter_id" },
    paragraph_class: { label: "paragraph_class" },
    paragraph_lang: { label: "paragraph_lang" },
    sentence_text: { label: "text" },
    sentence_pgno: { label: "page_num" },
    sentence_id: { label: "sentence_id" },
    sentence_storyid: { label: "sentence_storyid" },
    sentence_sent_no: { label: "sentence_sent_no" },
    sentence_pid: { label: "sentence_pid" },
    sentence_chapid: { label: "sentence_chapter_id" },
    sentence_text_eng: { label: "sentence_text_eng" },
    sentence_text_orig: { label: "sentence_text_orig" },
    sentence_source: { label: "sentence_source" }
};


sattrlist.testerzya = {
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    },
    text_publisher: {
        label: "text_publisher"
    },
    text_corrector: {
        label: "text_corrector"
    },
    text_usage: {
        label: "text_usage"
    },
    text_year: {
        label: "text_year"
    },
    text_lang: {
        label: "klk_lang",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: {
            "izh": "izh",
            "kca": "kca",
            "mdf": "mdf",
            "mns": "mns",
            "mrj": "mrj",
            "myv": "myv",
            "sel": "sel",
            "vep": "vep",
            "yrk": "yrk"
        },
        translation: transl.lang,
    },
    sentence_id: sattrs.sentence_id_hidden,
    sentence_section: {
        label: "sentence_section"
    },
    sentence_chapno: {
        label: "sentence_chapno"
    },
    paragraph_class: {
        label: "paragraph_class"
    },
    paragraph_lang: {
        label: "paragraph_lang"
    }
};


settings.corpora.erme_v2_myv = {
    id: "erme_v2_myv",
    title: "ERME version 2: Ersä/Erzya",
    description: "ERME version 2: Ersä/Erzya",
    licence: {
        name: "CC BY (PUB)",
        urn: "urn:nbn:fi:lb-2022020106",
    },
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.erme_v2,
    unselected: true
};

settings.corpora.erme_v2_mdf = {
    id: "erme_v2_mdf",
    title: "ERME version 2: Mokša/Moksha",
    description: "ERME version 2: Mokša/Moksha",
    licence: {
        name:"CC BY (PUB)",
        urn: "urn:nbn:fi:lb-2022020106",
    },
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.erme_v2,
    unselected: true
};


settings.corpora.kildin_sample = {
    id: "kildin_sample",
    title: "Kildin Saami (sample)",
    description: "A test sample of the Corpus of Written Kildin Saami (2015)",
    metadata_urn: "urn:nbn:fi:lb-2015102001",
    licence: settings.licenceinfo.CC_BY,
    context: context.default,
    within: within.default,
    attributes: {},
    structAttributes: {
        text_style: {
            label: "style",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "fiction",
                "non-fiction",
            ],
            translation: {
                "fiction": {
                    "en": "fiction",
                    // "fi": "fiction",
                    // "sv": "fiction",
                },
                "non-fiction": {
                    "en": "non-fiction",
                    // "fi": "non-fiction",
                    // "sv": "non-fiction",
                },
            },
        },
        text_medium: {
            label: "medium",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "book",
                "periodical",
                "internet",
            ],
            translation: {
                "book": {
                    "en": "book",
                    // "fi": "book",
                    // "sv": "book",
                },
                "internet": {
                    "en": "Internet",
                    // "fi": "internet",
                    // "sv": "internet",
                },
                "periodical": {
                    "en": "periodical",
                    // "fi": "periodical",
                    // "sv": "periodical",
                },
            },
        },
        text_language: {
            label: "lang",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "sjd",
            ],
            translation: transl.lang,
        },
        text_author: {
            label: "author",
        },
        text_annotator: {
            label: "annotator",
        },
        text_translator: {
            label: "translator",
        },
        text_source: {
            label: "source",
        },
        text_place: {
            label: "place",
        },
        text_modus: {
            label: "text_modus",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "written",
            ],
            translation: {
                "written": {
                    "en": "written",
                    // "fi": "written",
                    // "sv": "written",
                },
            },
        },
        text_year: {
            label: "year",
        },
        text_genre: {
            label: "genre",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "biography",
                "novel",
                "story",
            ],
            translation: transl.genre,
        },
        text_session_name: {
            label: "session_name",
        },
        text_session_title: {
            label: "session_title",
        },
        text_channel: {
            label: "channel",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "original",
                "translation",
            ],
            translation: {
                "original": {
                    "en": "original",
                    // "fi": "original",
                    // "sv": "original",
                },
                "translation": {
                    "en": "translation",
                    // "fi": "translation",
                    // "sv": "translation",
                },
            },
        },
        text_editor: {
            label: "editor",
        },
        sentence_orth_orig: {
            label: "orig_orthography",
        },
        sentence_transl: {
            label: "translation",
        },
        sentence_transl_lang: {
            label: "translation_lang",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "eng",
                "rus",
                "sms",
                "kpv",
            ],
            translation: transl.lang,
        },
        sentence_paragraph_boundary: {
            label: "in_paragraph",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "begin": "begin",
                "end": "end",
                "begin+end": "lone",
                "": "middle",
            },
            translation: {
                "begin": {
                    "en": "begin",
                    // "fi": "begin",
                    // "sv": "begin",
                },
                "end": {
                    "en": "end",
                    // "fi": "end",
                    // "sv": "end",
                },
                "lone": {
                    "en": "lone sentence",
                    // "fi": "lone",
                    // "sv": "lone",
                },
                "middle": {
                    "en": "middle",
                    // "fi": "middle",
                    // "sv": "middle",
                },
            },
        },
    }
};

funcs.addCorporaToFolder("uralic", ["kildin_sample"]);


settings.templ.hcs2_common = {
    id: "",
    title: "",
    description: "",
    limitedAccess: true,
    licenceType: "ACA",
    context: context.default,
    within: within.default,
    attributes: {
        lemma: attrs.baseform,
        pos: {
            label: "pos",
            extendedComponent: "datasetSelect",
            localize: "false",
            // The dataset currently excludes tags for punctuation
            // marks
            dataset: [
                "ABBR",
                "ADJ",
                "A-UNINFL",
                "ADV",
                "AG-PART",
                "CC",
                "CONJ",
                "CONJ/CC",
                "DEM",
                "EXCLAM",
                "GEN-CON",
                "GEN-CON-KWA",
                "INTERROG",
                "MWE",
                "N",
                "NUM",
                "NUM-ROM",
                "POSS-PRON",
                "PREP",
                "PREP/ADV",
                "PRON",
                "PROPNAME",
                "REL-LI",
                "REL-LI-VYO",
                "REL-SI",
                "REL-SI-VYO",
                "TITLE",
                "V",
                "V-BE",
                "V-DEF",
                "_",
            ],
            opts: options.lite,
        },
        msd: {
            label: "msd",
        },
        gloss: {
            label: "gloss",
        },
        syntax: {
            label: "syntactic_function",
            extendedComponent: "datasetSelect",
            localize: "false",
            dataset: [
                "@A>",
                "@<AD-A",
                "@AD-A>",
                "@ADVL",
                "@AG",
                "@CC",
                "@CS",
                "@<DN",
                "@DN>",
                "@FAUXV",
                "@-FAUXV",
                "@FMAINV",
                "@-FMAINV",
                "@FMAINVintr",
                "@FMAINVintr-ass",
                "@FMAINVintr-def",
                "@FMAINVintr-loc",
                "@-FMAINVkwisha<",
                "@-FMAINV-n",
                "@FMAINVtr-OBJ>",
                "@FMAINVtr+OBJ>",
                "@GCON",
                "@I-OBJ",
                "@NADJ",
                "@<NADJ",
                "@NADJ>",
                "@<NDEM",
                "@NDEM>",
                "@NH",
                "@<NH",
                "@OBJ",
                "@<P",
                "@P>",
                "@PAT",
                "@PCOMPL-S",
                "@QN",
                "@<QN",
                "@SUBJ",
                "@SUBJ+rel",
                "_",
            ],
            opts: options.lite,
        },
        msdextra: {
            label: "extra_features",
        },
        lex: attrs.lemgram_hidden,
    },
    structAttributes: {
        text_title: sattrs.text_title,
        text_filename: sattrs.filename,
        text_year: sattrs.year,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

hcs2_news_extra_props = {
    structAttributes: {
        text_month: sattrs.month,
    }
};

hcs2_hierarchy = [
    ["old", "Old material", "Material up to 2003, mostly from HCS 1.0", [
        ["old_books", "Books", {
            structAttributes: {
                text_author: sattrs.author,
                text_publisher: sattrs.text_publisher,
                text_place: sattrs.text_publ_place,
            }
        }],
        ["old_news", "News (old)", hcs2_news_extra_props],
    ] ],
    ["new", "New material", "Material after 2003, new to HCS 2.0", [
        ["new_bunge", "Bunge", "Hansards of Tanzanian Parliament 2004–2006", {
            structAttributes: {
                text_month: sattrs.month,
                text_day: sattrs.day_of_month,
            }
        }],
        ["new_news", "News (new)", hcs2_news_extra_props],
    ] ],
];

funcs.makeFolderHierarchy(
    settings.corporafolders.swahili.hcs2, hcs2_hierarchy,
    {
        id_prefix: "hcs2_",
        title_prefix: "HCS 2.0: ",
        description_prefix: "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version: ",
        corpus_template: settings.templ.hcs2_common,
    });

delete hcs2_hierarchy;
delete hcs2_news_extra_props;

settings.corpusAliases.hcs = "hcs2_.*";
settings.corpusAliases.hcs2 = "hcs2_.*";


/* BESERCORP */

attrlist.besercorp = {
    msd: attrs.msd,
    gloss: {
        label: "gloss_ru"
    },
    lex: {
        label: "lex"
    }
};

settings.corpora.besercorp = {
    title: "BeserCorp",
    description: "The Corpus of Beserman Udmurt",
    id: "besercorp",
    metadata_urn: "urn:nbn:fi:lb-2015081401",
    cite_id: "BeserCorp",
    within: within.default,
    context: context.default,
    attributes: attrlist.besercorp,
    structAttributes: {}
};

funcs.addCorporaToFolder("uralic", ["besercorp"]);


// Mark Davies's corpora

// Common definitions

attrlist.byu = {
    lemma: $.extend({}, attrs.baseform, { order: 50 }),
    pos_major: {
        label: "major_pos",
        type: "set",
        extendedComponent: "datasetSelect",
        opts: options.set,
        order: 51,
        // TODO: Map the UD2 PoS codes below to existing PoS keys
        dataset: {
            "ADJ": "ADJ",
            "ADP": "ADP",
            "ADV": "ADV",
            "CCONJ": "CCONJ",
            "DET": "DET",
            "INTJ": "INTJ",
            "NOUN": "NOUN",
            "NUM": "NUM",
            "PART": "PART",
            "PRON": "PRON",
            "PROPN": "PROPN",
            "PUNCT": "PUNCT",
            "SCONJ": "SCONJ",
            "SYM": "SYM",
            "VERB": "VERB",
            "X": "X",
        },
        translation: transl.pos,
    },
    pos: {
        label: "detailed_pos",
        type: "set",
        extendedComponent: "datasetSelect",
        opts: options.set,
        order: 52,
        // PoS tags from http://ucrel.lancs.ac.uk/claws7tags.html,
        // with some additions of BYU.
        dataset: {
            "appge": "byu_appge",
            "a": "byu_a",       // Not in CLAWS7
            "at": "byu_at",
            "at1": "byu_at1",
            "bcl": "byu_bcl",
            "c": "byu_c",       // Not in CLAWS7
            "cc": "byu_cc",
            "ccb": "byu_ccb",
            "cs": "byu_cs",
            "csa": "byu_csa",
            "csn": "byu_csn",
            "cst": "byu_cst",
            "csw": "byu_csw",
            "d": "byu_d",       // Not in CLAWS7
            "da": "byu_da",
            "da1": "byu_da1",
            "da2": "byu_da2",
            "dar": "byu_dar",
            "dat": "byu_dat",
            "db": "byu_db",
            "db2": "byu_db2",
            "dd": "byu_dd",
            "dd1": "byu_dd1",
            "dd2": "byu_dd2",
            "ddq": "byu_ddq",
            "ddqge": "byu_ddqge",
            "ddqv": "byu_ddqv",
            "ex": "byu_ex",
            "f": "byu_f",       // Not in CLAWS7
            "fo": "byu_fo",
            "fu": "byu_fu",
            "fw": "byu_fw",
            "ge": "byu_ge",
            "i": "byu_i",       // Not in CLAWS7
            "if": "byu_if",
            "ii": "byu_ii",
            "io": "byu_io",
            "iw": "byu_iw",
            "j": "byu_j",       // Not in CLAWS7
            "jj": "byu_jj",
            "jjr": "byu_jjr",
            "jjt": "byu_jjt",
            "jk": "byu_jk",
            "m": "byu_m",       // Not in CLAWS7
            "m#": "byu_m#",     // Not in CLAWS7
            "m\$": "byu_m$",     // Not in CLAWS7
            "m#": "byu_m1",     // Not in CLAWS7
            "mc": "byu_mc",
            "mc1": "byu_mc1",
            "mc2": "byu_mc2",
            "mcge": "byu_mcge",
            "mcmc": "byu_mcmc",
            "md": "byu_md",
            "mf": "byu_mf",
            "n": "byu_n",       // Not in CLAWS7
            "nd1": "byu_nd1",
            "nn": "byu_nn",
            "nn1": "byu_nn1",
            "nn2": "byu_nn2",
            "nna": "byu_nna",
            "nnb": "byu_nnb",
            "nnl1": "byu_nnl1",
            "nnl2": "byu_nnl2",
            "nno": "byu_nno",
            "nno2": "byu_nno2",
            "nnt1": "byu_nnt1",
            "nnt2": "byu_nnt2",
            "nnu": "byu_nnu",
            "nnu1": "byu_nnu1",
            "nnu2": "byu_nnu2",
            "np": "byu_np",
            "np1": "byu_np1",
            "np2": "byu_np2",
            "npd1": "byu_npd1",
            "npd2": "byu_npd2",
            "npm1": "byu_npm1",
            "npm2": "byu_npm2",
            "npx": "byu_npx",   // Not in CLAWS7
            "null": "byu_null", // Not in CLAWS7
            "p": "byu_p",       // Not in CLAWS7
            "pn": "byu_pn",
            "pn1": "byu_pn1",
            "pnqo": "byu_pnqo",
            "pnqs": "byu_pnqs",
            "pnqv": "byu_pnqv",
            "pnx1": "byu_pnx1",
            "ppge": "byu_ppge",
            "pph1": "byu_pph1",
            "ppho1": "byu_ppho1",
            "ppho2": "byu_ppho2",
            "pphs1": "byu_pphs1",
            "pphs2": "byu_pphs2",
            "ppio1": "byu_ppio1",
            "ppio2": "byu_ppio2",
            "ppis1": "byu_ppis1",
            "ppis2": "byu_ppis2",
            "ppx1": "byu_ppx1",
            "ppx2": "byu_ppx2",
            "ppy": "byu_ppy",
            "ra": "byu_ra",
            "rex": "byu_rex",
            "rg": "byu_rg",
            "rgq": "byu_rgq",
            "rgqv": "byu_rgqv",
            "rgr": "byu_rgr",
            "rgt": "byu_rgt",
            "rl": "byu_rl",
            "rp": "byu_rp",
            "rpk": "byu_rpk",
            "rr": "byu_rr",
            "rrq": "byu_rrq",
            "rrqv": "byu_rrqv",
            "rrr": "byu_rrr",
            "rrt": "byu_rrt",
            "rt": "byu_rt",
            "to": "byu_to",
            "uh": "byu_uh",
            "v": "byu_v",       // Not in CLAWS7
            "vb0": "byu_vb0",
            "vbdr": "byu_vbdr",
            "vbdz": "byu_vbdz",
            "vbg": "byu_vbg",
            "vbi": "byu_vbi",
            "vbm": "byu_vbm",
            "vbn": "byu_vbn",
            "vbr": "byu_vbr",
            "vbz": "byu_vbz",
            "vd": "byu_vd",     // Not in CLAWS7
            "vd0": "byu_vd0",
            "vdd": "byu_vdd",
            "vdg": "byu_vdg",
            "vdi": "byu_vdi",
            "vdn": "byu_vdn",
            "vdz": "byu_vdz",
            "vh0": "byu_vh0",
            "vhd": "byu_vhd",
            "vhg": "byu_vhg",
            "vhi": "byu_vhi",
            "vhn": "byu_vhn",
            "vhz": "byu_vhz",
            "vm": "byu_vm",
            "vmk": "byu_vmk",
            "vv0": "byu_vv0",
            "vvd": "byu_vvd",
            "vvg": "byu_vvg",
            "vvgk": "byu_vvgk",
            "vvi": "byu_vvi",
            "vvn": "byu_vvn",
            "vvnk": "byu_vvnk",
            "vvz": "byu_vvz",
            "x": "byu_x",       // Not in CLAWS7
            "xx": "byu_xx",
            "xxy": "byu_xxy",   // Not in CLAWS7
            "y": "Punct",   // Not in CLAWS7
            "[-!\\\"(),.:;?]|\\\"@|\\.\\.\\.": "byu_y0",  // Not in CLAWS7
            "z": "byu_z",       // Not in CLAWS7
            "z'": "byu_z'",     // Not in CLAWS7
            "zz1": "byu_zz1",
            "zz2": "byu_zz2",
            "zzc": "byu_zzc",   // Not in CLAWS7
            "zzq": "byu_zzq",   // Not in CLAWS7
            "GAP": "byu_GAP",   // Not in CLAWS7
            "UNKNOWN": "Unknown",   // Not in CLAWS7
            "_": "_",           // Empty value
        },
        translation: transl.pos,
    },
    posorig: {
        label: "pos_orig",
        order: 53,
    },
    msd_ambig: {
        label: "ambiguous_msd",
        order: 54,
        transform: function(val) {
            return val.replace(/(.)\|(.)/g, "$1\n|$2");
        },
    },
    lex: attrs.lemgram_hidden,
    // // This does not seem to work without a valued attribute.
    // gap: {
    //  label: "deleted",
    //  isStructAttr: true,
    // },
};

sattrlist.byu_common = {
    text_year: sattrs.year,
    text_title: sattrs.text_title,
    text_id: {
        label: "text_id",
    },
    text_wordcount: {
        label: "text_word_count",
    },
    text_filename: {
        label: "file_name"
    },
    paragraph_type: {
        label: "paragraph_type",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "paragraph",
            "heading",
            "paragraph/heading",
            "sentence",
        ],
        translation: transl.paragraphType,
    },
    sentence_gaps: {
        label: "sentence_part_deleted",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: [
            "yes",
            "no",
        ],
        translation: transl.yesno,
    },
};


// Common attributes for BYU corpora 2020/2021

// Use the older attributes as the basis
attrlist.byu2020 = $.extend(true, {}, attrlist.byu);
// pos has a few additional values (at least for COCA)
$.extend(
    attrlist.byu2020.pos.dataset,
    {
        "1": "byu_1",    // Not in CLAWS7
        "u": "byu_u",    // Not in CLAWS7
    }
);
// posorig has been renamed to pos_orig
attrlist.byu2020.pos_orig = attrlist.byu.posorig;
delete attrlist.byu2020.posorig;
// msd_ambig has been replaced with an actually feature-set-valued msd
delete attrlist.byu2020.msd_ambig;
attrlist.byu2020.msd = {
    label: "msd",
    type: "set",
    opts: options.fullSet,
    order: 54,
};


// COCA

sattrlist.coca = $.extend(
    true, {}, sattrlist.byu_common,
    {
        text_genre: {
            label: "genre",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "ACAD": "academic",
                "FIC": "fiction",
                "MAG": "popular_magazine",
                "NEWS": "newspaper",
                "SPOK": "spoken",
            },
            translation: transl.genre,
        },
        text_subgenre: {
            label: "subgenre",
        },
        text_source: {
            label: "source",
        },
        text_publ_info: {
            label: "publication_info",
        },
    });

settings.templ.coca_common = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.byu,
    structAttributes: sattrlist.coca,
};

var coca_hierarchy = [
    ["fic", "Fiction"],
    ["mag", "Magazine"],
    ["news", "Newspaper"],
    ["acad", "Academic"],
    ["spok", "Spoken"],
];

funcs.makeFolderHierarchy(
    settings.corporafolders.english.reference.coca, coca_hierarchy,
    {
        id_prefix: "coca_",
        title_prefix: "COCA: ",
        description_prefix: "COCA: Corpus of Contemporary American English (genre: ",
        description_suffix: ") – Kielipankki Korp version 2017H1",
        corpus_template: settings.templ.coca_common,
    });

settings.corpusAliases.coca = "coca_.*";
settings.corpusAliases["coca-2017h1"] = "coca_.*";


// COCA 2020

// Structural attributes based on COCA 2017H1
sattrlist.coca2020 = $.extend(true, {}, sattrlist.coca);
// Delete structural attributes in COCA 2017H1 but not in COCA 2020
delete sattrlist.coca2020.text_publ_info;
delete sattrlist.coca2020.text_wordcount;
// Add text_title_orig
sattrlist.coca2020.text_title_orig = {
    label: "title_uncleaned",
};

settings.templ.coca2020_common = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.byu2020,
    structAttributes: sattrlist.coca2020,
};

coca_hierarchy = coca_hierarchy.concat([
    ["blog", "Blogs"],
    ["web", "Other Web"],
    ["tvm", "TV / Movies"],
]);

funcs.makeFolderHierarchy(
    settings.corporafolders.english.reference.coca2020, coca_hierarchy,
    {
        id_prefix: "coca2020_",
        title_prefix: "COCA 2020: ",
        description_prefix: "COCA 2020: Corpus of Contemporary American English (genre: ",
        description_suffix: ") – Kielipankki Korp version 2020",
        corpus_template: settings.templ.coca2020_common,
    });

funcs.addCorpusAliases("coca2020_.*", ["coca-2020", "coca2020"]);

delete coca_hierarchy;


// COHA

sattrlist.coha =  $.extend(
    true, {}, sattrlist.byu_common,
    {
        text_genre: {
            label: "genre",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "FIC": "fiction",
                "MAG": "popular_magazine",
                "NEWS": "newspaper",
                "NF": "non-fiction_book",
            },
            translation: transl.genre,
        },
        text_author: {
            label: "author",
        },
        text_publ_info: {
            label: "publication_info",
        },
        // LCC is non-empty only for non-fiction; should it be defined
        // only there?
        text_lcc: {
            label: "lib_congress_classif",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "A": "A – General Works",
                "B": "B – Philosophy. Psychology. Religion",
                "C": "C – Auxiliary Sciences of History",
                "D": "D – World History and History of Europe, Asia, Africa, Australia, New Zealand, etc.",
                "E": "E – History of the Americas",
                "F": "F – History of the Americas",
                "G": "G – Geography. Anthropology. Recreation",
                "H": "H – Social Sciences",
                "J": "J – Political Science",
                "K": "K – Law",
                "L": "L – Education",
                "M": "M – Music and Books on Music",
                "N": "N – Fine Arts",
                "P": "P – Language and Literature",
                "Q": "Q – Science",
                "R": "R – Medicine",
                "S": "S – Agriculture",
                "T": "T – Technology",
                "U": "U – Military Science",
                "V": "V – Naval Science",
                "Z": "Z – Bibliography. Library Science. Information Resources (General)",
                "": "(unclassified)",
            }
        },
    });

settings.templ.coha_common = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.byu,
    structAttributes: sattrlist.coha,
};

// Make a corpus/folder hierarchy for COHA (to be used as an argument
// to funcs.makeFolderHierarchy): decades as folders, decades
// with genres as corpora from start_decade to end_decade (inclusive),
// with the genres listed in an array of two-elemen arrays (corpus id
// suffix, genre name).
function make_coha_hierarchy (start_decade, end_decade, genres) {
    var result = [];
    for (var decade = start_decade; decade <= end_decade; decade += 10) {
        var decade_str = decade.toString() + "s";
        var genre_hierarchy = []
        for (var i = 0; i < genres.length; i++) {
            var genre = genres[i];
            genre_hierarchy.push([decade_str + "_" + genre[0],
                                  decade_str + " " + genre[1]]);
        }
        result.push([decade_str, decade_str, genre_hierarchy]);
    }
    return result;
}

var coha_genres_nonews = [["fic", "fiction"],
                          ["mag", "popular magazines"],
                          ["nf", "non-fiction books"]];
var coha_genres_news = [["fic", "fiction"],
                        ["mag", "popular magazines"],
                        ["news", "newspapers"],
                        ["nf", "non-fiction books"]];

// No news before 1860s
var coha_hierarchy =
    make_coha_hierarchy(1810, 1850, coha_genres_nonews)
    .concat(make_coha_hierarchy(1860, 2000, coha_genres_news));

funcs.makeFolderHierarchy(
    settings.corporafolders.english.historical.coha, coha_hierarchy,
    {
        id_prefix: "coha_",
        title_prefix: "COHA: ",
        description_prefix: "COHA: Corpus of Historical American English: ",
        description_suffix: " – Kielipankki Korp version 2017H1",
        corpus_template: settings.templ.coha_common,
    });

delete coha_genres_nonews;
delete coha_genres_news;
delete coha_hierarchy;

settings.corpusAliases.coha = "coha_.*";
settings.corpusAliases["coha-2017h1"] = "coha_.*";


// GloWbE

// Countries sorted by region and perhaps approximate size
var glowbe_countries = [
    // North America
    ["us", "United States"],
    ["ca", "Canada"],
    // Europe
    ["gb", "Great Britain"],
    ["ie", "Ireland"],
    // Australia and Oceania
    ["au", "Australia"],
    ["nz", "New Zealand"],
    // South Asia
    ["in", "India"],
    ["lk", "Sri Lanka"],
    ["pk", "Pakistan"],
    ["bd", "Bangladesh"],
    // South-East Asia
    ["sg", "Singapore"],
    ["my", "Malaysia"],
    ["ph", "Philippines"],
    ["hk", "Hong Kong"],
    // Africa
    ["za", "South Africa"],
    ["ng", "Nigeria"],
    ["gh", "Ghana"],
    ["ke", "Kenya"],
    ["tz", "Tanzania"],
    // The Caribbean
    ["jm", "Jamaica"],
];

sattrlist.glowbe = $.extend(
    true, {}, sattrlist.byu_common,
    {
        // The country and genre are always the same for each subcorpus,
        // but they could have use if more than one subcorpus is selected.
        text_country: {
            label: "country",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            // Uppercase country codes
            dataset: (_.unzip(glowbe_countries)[0]
                      .map(function (s) { return s.toUpperCase(); })),
            translation: {
                "AU": {
                    "en": "Australia",
                    "fi": "Australia",
                    // "sv": "AU",
                },
                "BD": {
                    "en": "Bangladesh",
                    "fi": "Bangladesh",
                    // "sv": "BD",
                },
                "CA": {
                    "en": "Canada",
                    "fi": "Kanada",
                    // "sv": "CA",
                },
                "GB": {
                    "en": "Great Britain",
                    "fi": "Iso-Britannia",
                    // "sv": "GB",
                },
                "GH": {
                    "en": "Ghana",
                    "fi": "Ghana",
                    // "sv": "GH",
                },
                "HK": {
                    "en": "Hong Kong",
                    "fi": "Hongkong",
                    // "sv": "HK",
                },
                "IE": {
                    "en": "Ireland",
                    "fi": "Irlanti",
                    // "sv": "IE",
                },
                "IN": {
                    "en": "India",
                    "fi": "Intia",
                    // "sv": "IN",
                },
                "JM": {
                    "en": "Jamaica",
                    "fi": "Jamaika",
                    // "sv": "JM",
                },
                "KE": {
                    "en": "Kenya",
                    "fi": "Kenia",
                    // "sv": "KE",
                },
                "LK": {
                    "en": "Sri Lanka",
                    "fi": "Sri Lanka",
                    // "sv": "LK",
                },
                "MY": {
                    "en": "Malaysia",
                    "fi": "Malesia",
                    // "sv": "MY",
                },
                "NG": {
                    "en": "Nigeria",
                    "fi": "Nigeria",
                    // "sv": "NG",
                },
                "NZ": {
                    "en": "New Zealand",
                    "fi": "Uusi-Seelanti",
                    // "sv": "NZ",
                },
                "PH": {
                    "en": "Philippines",
                    "fi": "Filippiinit",
                    // "sv": "PH",
                },
                "PK": {
                    "en": "Pakistan",
                    "fi": "Pakistan",
                    // "sv": "PK",
                },
                "SG": {
                    "en": "Singapore",
                    "fi": "Singapore",
                    // "sv": "SG",
                },
                "TZ": {
                    "en": "Tanzania",
                    "fi": "Tansania",
                    // "sv": "TZ",
                },
                "US": {
                    "en": "United States",
                    "fi": "Yhdysvallat",
                    // "sv": "US",
                },
                "ZA": {
                    "en": "South Africa",
                    "fi": "Etelä-Afrikka",
                    // "sv": "ZA",
                },
            },
        },
        text_genre: {
            label: "genre",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                "B": "blog",
                "G": "general",
            },
            translation: transl.genre,
        },
        text_url: sattrs.original_url,
        text_webdomain: {
            label: "web_domain_name",
        },
    });

settings.templ.glowbe_common = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.byu,
    structAttributes: sattrlist.glowbe,
};

// Make a corpus/folder hierarchy for GloWbE (to be used as an
// argument to funcs.makeFolderHierarchy) based on the list of
// country codes and names: countries as folders, countries with
// genres (general or blog) as corpora.
function make_glowbe_hierarchy (countries) {
    var result = [];
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        result.push([
            country[0], country[1], [
                [country[0] + "_genl", country[1] + ": general"],
                [country[0] + "_blog", country[1] + ": blogs"],
            ]
        ])
    }
    return result;
}

funcs.makeFolderHierarchy(
    settings.corporafolders.english.cmc.glowbe,
    make_glowbe_hierarchy(glowbe_countries),
    {
        id_prefix: "glowbe_",
        title_prefix: "GloWbE: ",
        description_prefix: "GloWbE: Global Web-based English: ",
        description_suffix: " – Kielipankki Korp version 2017H1",
        corpus_template: settings.templ.glowbe_common,
    });

delete glowbe_countries;

settings.corpusAliases.glowbe = "glowbe_.*";
settings.corpusAliases["glowbe-2017h1"] = "glowbe_.*";

// Uralic UD
attrlist.ud2_uralic = attrlist.ud2_fi;
attrlist.ud2_uralic.misc = { label: "misc", opts: options.default, pattern: "<%= val.replace(/\\|/g, '|<wbr>') %>" };

sattrlist.ud2_uralic_fi = {
    text_id : { label: "uralic_ud_text_id" },
    text_iso_lang : { label: "uralic_ud_text_iso_lang" },
    sentence_id : { label: "uralic_ud_sentence_id" },
    sentence_text : { label: "uralic_ud_sentence_text" },
    sentence_text_en : { label: "uralic_ud_sentence_text_en" },
    sentence_doc_id : { label: "uralic_ud_sentence_doc_id" },
    sentence_newdoc_id : { label: "uralic_ud_sentence_newdoc_id" },
    sentence_thread_id : { label: "uralic_ud_sentence_thread_id" },
    sentence_comment_id : { label: "uralic_ud_sentence_comment_id" },
    sentence_newpar_id : { label: "uralic_ud_sentence_newpar_id" }
};

settings.corporafolders.uralic.uralic_ud_v213 = {
    title: "Uralic UD v2.13",
    description: "The corpus contains Universal Dependencies version 2.13 for the following Uralic languages: Erzya, Estonian, Finnish, Hungarian, Karelian, Komi-Permyak, Komi-Zyrian, Livvi, Moksha, North Sami, Skolt Sami and Veps.",
    info: {
       metadata_urn: "urn:nbn:fi:lb-2024031207",
	cite_id: "uralic-ud-v2-13",
    },
    contents: [ "uralic_ud_v213_et",
		"uralic_ud_v213_fi",
		"uralic_ud_v213_hu",
		"uralic_ud_v213_krl",
		"uralic_ud_v213_koi",
		"uralic_ud_v213_kpv",
		"uralic_ud_v213_mdf",
		"uralic_ud_v213_myv",
		"uralic_ud_v213_olo",
		"uralic_ud_v213_sme",
		"uralic_ud_v213_sms",
		"uralic_ud_v213_vep" ]
};

function create_ud2_sattrlist(sentence_attribute_names) {
    retval = {};
    retval.text_id = { label: "uralic_ud_text_id" };
    retval.text_iso_lang = { label: "uralic_ud_text_iso_lang" };
    retval.sentence_id = { label: "uralic_ud_sentence_id" };
    retval.sentence_text = { label: "uralic_ud_sentence_text" };
    for (var i = 0; i < sentence_attribute_names.length; i++) {
	retval[ "sentence_" + sentence_attribute_names[i] ] = { label: "uralic_ud_sentence_" + sentence_attribute_names[i] };
    };
    return retval;
};

settings.licenceinfo.CC_BY_SA_40 = {
    name: "CC BY-SA 4.0 (PUB)",
    description: "Creative Commons Attribution-ShareAlike",
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
};
settings.licenceinfo.CC_BY_NC_SA_30 = {
    name: "CC BY-NC-SA 3.0 (PUB)",
    description: "Creative Commons Attribution-NonCommercial-ShareAlike",
    url: "https://creativecommons.org/licenses/by-nc-sa/3.0/",
};
settings.licenceinfo.CC_BY_NC_SA_40 = {
    name: "CC BY-NC-SA 4.0 (PUB)",
    description: "Creative Commons Attribution-NonCommercial-ShareAlike",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

settings.corpora.uralic_ud_v213_et = {
    id: "uralic_ud_v213_et",
    title: "Uralic UD v2.13 for Estonian",
    description: "Universal Dependencies version 2.10 for Estonian",
    lang: "et",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["newdoc_id"]),
    licence: settings.licenceinfo.CC_BY_NC_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_fi = {
    id: "uralic_ud_v213_fi",
    title: "Uralic UD v2.13 for Finnish",
    description: "Universal Dependencies version 2.10 for Finnish<br/>(Note: the treebanks OOD, PUD and TDT are licensed as CC BY-SA 4.0, but FTB is licensed as CC BY 4.0)",
    lang: "fi",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: sattrlist.ud2_uralic_fi,
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_hu = {
    id: "uralic_ud_v213_hu",
    title: "Uralic UD v2.13 for Hungarian",
    description: "Universal Dependencies version 2.10 for Hungarian",
    lang: "hu",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist([]),
    licence: settings.licenceinfo.CC_BY_NC_SA_30,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_krl = {
    id: "uralic_ud_v213_krl",
    title: "Uralic UD v2.13 for Dvina-Karelian",
    description: "Universal Dependencies version 2.10 for Dvina-Karelian",
    lang: "krl",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["comment"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_koi = {
    id: "uralic_ud_v213_koi",
    title: "Uralic UD v2.13 for Komi-Permyak",
    description: "Universal Dependencies version 2.10 for Komi-Permyak",
    lang: "koi",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text_sms", "text_mdf", "text_fi", "text_olo", "text_kpv", "text_ru", "text_orig", "source", "gloss_ru"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_kpv = {
    id: "uralic_ud_v213_kpv",
    title: "Uralic UD v2.13 for Komi-Zyrian",
    description: "Universal Dependencies version 2.10 for Komi-Zyrian",
    lang: "kpv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text_ru", "text_en", "comment", "text_koi", "text_orig", "corpus_version", "text_end", "questions", "label"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_mdf = {
    id: "uralic_ud_v213_mdf",
    title: "Uralic UD v2.13 for Moksha",
    description: "Universal Dependencies version 2.10 for Moksha",
    lang: "mdf",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text_en", "source", "text_orig", "gloss_en", "text_sms", "text_kpv", "text_fi"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_myv = {
    id: "uralic_ud_v213_myv",
    title: "Uralic UD v2.13 for Erzya",
    description: "Universal Dependencies version 2.10 for Erzya",
    lang: "myv",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text_en", "text_fi", "story_id", "source", "text_ru", "text_orig"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_olo = {
    id: "uralic_ud_v213_olo",
    title: "Uralic UD v2.13 for Olonets-Karelian",
    description: "Universal Dependencies version 2.10 for Olonets-Karelian",
    lang: "olo",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text_sms", "text_mdf", "text_fi", "text_en"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_sme = {
    id: "uralic_ud_v213_sme",
    title: "Uralic UD v2.13 for North Sami",
    description: "Universal Dependencies version 2.10 for North Sami",
    lang: "sme",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist([]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_sms = {
    id: "uralic_ud_v213_sms",
    title: "Uralic UD v2.13 for Skolt Sami",
    description: "Universal Dependencies version 2.10 for Skolt Sami",
    lang: "sms",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["story_id", "text_fi", "text_mdf", "text_olo", "comment"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

settings.corpora.uralic_ud_v213_vep = {
    id: "uralic_ud_v213_vep",
    title: "Uralic UD v2.13 for Veps",
    description: "Universal Dependencies version 2.13 for Veps",
    lang: "vep",
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_uralic,
    structAttributes: create_ud2_sattrlist(["text"]),
    licence: settings.licenceinfo.CC_BY_SA_40,
    metadata_urn: "urn:nbn:fi:lb-2024031207",
};

funcs.addAttrExtraProperties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
