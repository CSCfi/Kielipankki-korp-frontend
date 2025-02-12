settings.wordpicture = false;
settings.startLang = "fin";

settings.hitsPerPageDefault = 10
settings.hitsPerPageValues = [10,25,50,75,100,500,1000]

settings.primaryColor = "#CAD2E6";
settings.primaryLight = "#CAD2E6";

settings.preselectedCorpora = [
    // "europarl_v7_enfi_fi",
    // "mulcold_fi",
];

settings.defaultOverviewContext = "1 link";
settings.defaultReadingContext = "1 link";

settings.corporafolders = {};


// Top-level folders according to CLARIN resource families
settings.corporafolders = {
    literary: {
        title: "Kirjallisuusaineistoja / Litteraturkorpusar / Literary texts",
        description: "Kirjallisuusaineistoja<br/>Litteraturkorpusar<br/>Literary texts",
    },
    parliament: {
        title: "Parlamenttiaineistoja / Parlamentariska korpusar / Parliamentary texts",
        description: "Parlamenttiaineistoja<br/>Parlamentariska korpusar<br/>Parliamentary texts",
    },
    legal: {
        title: "Juridisia aineistoja / Juridiska korpusar / Legal texts",
        description: "Juridisia aineistoja<br/>Juridiska korpusar<br/>Legal texts",
    },
    other: {
        title: "Muita aineistoja / Andra korpusar / Other corpora",
        description: "Muita aineistoja<br/>Andra korpusar<br/>Other corpora",
    },
};


settings.corporafolders.parliament.europarl = {
    title: "HeKo-EuroParl 7",
    description: "Helsinki Korp EuroParl v7 -aineistokokoelma",
    contents: [
        "europarl_v7_enfi_fi",
        "europarl_v7_svfi_fi",
        "europarl_v7_defi_fi",
        "europarl_v7_frfi_fi",
        "europarl_v7_esfi_fi",
        "europarl_v7_etfi_fi",
    ],
    info: {
        urn: "urn:nbn:fi:lb-2015043012",
        metadata_urn: "urn:nbn:fi:lb-2015043011",
        licence: {
            name: "CC BY",
            urn: "urn:nbn:fi:lb-2023110701",
        },
        cite_id: "HeKo-Europarl",
    }
};

settings.corpusAliases.europarl_v7 = "europarl_v7_.*_fi";
settings.corpusAliases.europarl = settings.corpusAliases.europarl_v7;

settings.corporafolders.legal.jrc = {
    title: "HeKo-JRC-Acquis",
    description: "Helsinki Korp JRC-Acquis -aineistokokoelma",
    contents: [
        "jrc_acquis_enfi_fi",
        "jrc_acquis_svfi_fi",
        "jrc_acquis_defi_fi",
        "jrc_acquis_esfi_fi",
        // jrc_acquis_etfi_et is empty in practice, probably due to an
        // error in the import process
        // "jrc_acquis_etfi_fi",
        "jrc_acquis_frfi_fi",
        "jrc_acquis_itfi_fi",
        "jrc_acquis_hufi_fi",
        "jrc_acquis_plfi_fi",
    ],
    info: {
        urn: "urn:nbn:fi:lb-2015062301",
        metadata_urn: "urn:nbn:fi:lb-2015061210",
        licence: {
            name: "CC BY",
            urn: "urn:nbn:fi:lb-2023110703",
        },
        cite_id: "HeKo-JRC-Acquis",
    }
};

settings.corpusAliases.jrc_acquis = "jrc_acquis_.*fi";

settings.corporafolders.other.opus = {
    title: "OPUS",
    description: "OPUS – an open source parallel corpus",
    info: {
        urn: "urn:nbn:fi:lb-2016012101",
        metadata_urn: "urn:nbn:fi:lb-2015102201",
        licence: settings.licenceinfo.CC_BY_40,
        cite_id: "Opus-Korp",
    },
};

settings.corporafolders.other.opus.enfi = {
    title: "OPUS Finnish–English",
    contents: [
        "opus_opensub2011enfi_fi",
        "opus_opensub2012enfi_fi",
        "opus_opensub2013enfi_fi",
        "opus_opensub2015enfi_fi",
        "opus_ecb_enfi_fi",
        "opus_emea_enfi_fi",
        "opus_eubookshop_enfi_fi",
        "opus_dgt_enfi_fi",
        "opus_tatoeba_enfi_fi",
        "opus_php_enfi_fi",
        "opus_gnome_enfi_fi",
        "opus_euconst_enfi_fi",
        "opus_books_enfi_fi",
        "opus_ubuntu_enfi_fi",
    ]
};

settings.corpusAliases.opus_enfi = "opus_.*enfi_fi";
settings.corpusAliases.opus_fien = "opus_.*enfi_fi";

settings.corporafolders.other.opus.firu = {
    title: "OPUS Finnish–Russian",
    contents: [
        "opus_opensubtitles2011_firu_fi",
        "opus_opensubtitles2012_firu_fi",
        "opus_eubookshop_firu_fi",
        "opus_kde4_firu_fi",
        "opus_opensubtitles_firu_fi",
        "opus_tatoeba_firu_fi",
        "opus_php_firu_fi",
        "opus_gnome_firu_fi",
        "opus_ubuntu_firu_fi",
    ]
};

settings.corpusAliases.opus_firu = "opus_.*firu_fi";

settings.corporafolders.other.opus.fisv = {
    title: "OPUS Finnish–Swedish",
    contents: [
        "opus_opensubtitles2011_fisv_fi",
        "opus_opensubtitles2012_fisv_fi",
        "opus_opensubtitles2013_fisv_fi",
        "opus_dgt_fisv_fi",
        "opus_kde4_fisv_fi",
        "opus_emea_fisv_fi",
        "opus_eubookshop_fisv_fi",
        "opus_gnome_fisv_fi",
        "opus_euconst_fisv_fi",
        "opus_php_fisv_fi",
        "opus_ubuntu_fisv_fi",
        "opus_tatoeba_fisv_fi",
        "opus_opensubtitles_fisv_fi",
    ]
};

settings.corpusAliases.opus_fisv = "opus_.*fisv_fi";

settings.corporafolders.other.opus.defi = {
    title: "OPUS Finnish–German",
    contents: [
        "opus_opensubtitles2012_defi_fi",
        "opus_opensubtitles2011_defi_fi",
        "opus_opensubtitles2013_defi_fi",
        "opus_eubookshop_defi_fi",
        "opus_dgt_defi_fi",
        "opus_kde4_defi_fi",
        "opus_emea_defi_fi",
        "opus_ecb_defi_fi",
        "opus_ubuntu_defi_fi",
        "opus_gnome_defi_fi",
        "opus_tatoeba_defi_fi",
        "opus_opensubtitles_defi_fi",
        "opus_php_defi_fi",
        "opus_euconst_defi_fi",
    ]
};

settings.corpusAliases.opus_defi = "opus_.*defi_fi";
settings.corpusAliases.opus_fide = "opus_.*defi_fi";

settings.corporafolders.other.opus.fifr = {
    title: "OPUS Finnish–French",
    contents: [
        "opus_dgt_fifr_fi",
        "opus_emea_fifr_fi",
        "opus_ecb_fifr_fi",
        "opus_eubookshop_fifr_fi",
        "opus_opensubtitles2013_fifr_fi",
        "opus_opensubtitles2011_fifr_fi",
        "opus_books_fifr_fi",
        "opus_opensubtitles2012_fifr_fi",
        "opus_opensubtitles_fifr_fi",
        "opus_kde4_fifr_fi",
        "opus_gnome_fifr_fi",
        "opus_euconst_fifr_fi",
        "opus_php_fifr_fi",
        "opus_ubuntu_fifr_fi",
        "opus_tatoeba_fifr_fi",
    ]
};

settings.corpusAliases.opus_fifr = "opus_.*fifr_fi";

settings.corporafolders.other.opus.dafi = {
    title: "OPUS Finnish–Danish",
    contents: [
        "opus_dgt_dafi_fi",
        "opus_eubookshop_dafi_fi",
        "opus_opensubtitles2012_dafi_fi",
        "opus_opensubtitles2013_dafi_fi",
        "opus_kde4_dafi_fi",
        "opus_ecb_dafi_fi",
    ]
};

settings.corpusAliases.opus_dafi = "opus_.*dafi_fi";
settings.corpusAliases.opus_fida = "opus_.*dafi_fi";

settings.corporafolders.other.opus.fipl = {
    title: "OPUS Finnish–Polish",
    contents: [
        "opus_dgt_fipl_fi",
        "opus_opensubtitles2011_fipl_fi",
        "opus_opensubtitles2012_fipl_fi",
        "opus_opensubtitles2013_fipl_fi",
        "opus_emea_fipl_fi",
        "opus_ecb_fipl_fi",
    ]
};

settings.corpusAliases.opus_fipl = "opus_.*fipl_fi";

settings.corporafolders.other.opus.esfi = {
    title: "OPUS Finnish–Spanish",
    contents: [
        "opus_dgt_esfi_fi",
        "opus_eubookshop_esfi_fi",
        "opus_opensubtitles2012_esfi_fi",
        "opus_opensubtitles2013_esfi_fi",
        "opus_opensubtitles2011_esfi_fi",
        "opus_ecb_esfi_fi",
        "opus_emea_esfi_fi",
        "opus_euconst_esfi_fi",
        "opus_gnome_esfi_fi",
        "opus_kde4_esfi_fi",
        "opus_opensubtitles_esfi_fi",
        "opus_php_esfi_fi",
        "opus_tatoeba_esfi_fi",
        "opus_ubuntu_esfi_fi",
        "opus_books_esfi_fi",
    ]
};

settings.corpusAliases.opus_esfi = "opus_.*esfi_fi";
settings.corpusAliases.opus_fies = "opus_.*esfi_fi";

settings.corporafolders.other.opus.fipt = {
    title: "OPUS Finnish–Portuguese",
    contents: [
        "opus_dgt_fipt_fi",
        "opus_eubookshop_fipt_fi",
        "opus_opensubtitles2011_fipt_fi",
        "opus_opensubtitles2013_fipt_fi",
        "opus_opensubtitles_fipt_fi",
        "opus_emea_fipt_fi",
        "opus_ecb_fipt_fi",
    ]
};

settings.corpusAliases.opus_fipt = "opus_.*fipt_fi";

settings.corporafolders.other.opus.etfi = {
    title: "OPUS Finnish–Estonian",
    contents: [
        "opus_dgt_etfi_fi",
        "opus_emea_etfi_fi",
        "opus_kde4_etfi_fi",
        "opus_opensubtitles2012_etfi_fi",
        "opus_opensubtitles2011_etfi_fi",
        "opus_opensubtitles2013_etfi_fi",
    ]
};

settings.corpusAliases.opus_etfi = "opus_.*etfi_fi";
settings.corpusAliases.opus_fiet = "opus_.*etfi_fi";

settings.corporafolders.other.opus.fiit = {
    title: "OPUS Finnish–Italian",
    contents: [
        "opus_dgt_fiit_fi",
        "opus_emea_fiit_fi",
        "opus_ecb_fiit_fi",
        "opus_opensubtitles2012_fiit_fi",
        "opus_opensubtitles2011_fiit_fi",
        "opus_opensubtitles2013_fiit_fi",
        "opus_eubookshop_fiit_fi",
    ]
};

settings.corpusAliases.opus_fiit = "opus_.*fiit_fi";

settings.corporafolders.other.opus.fihu = {
    title: "OPUS Finnish–Hungarian",
    contents: [
        "opus_dgt_fihu_fi",
        "opus_emea_fihu_fi",
        "opus_ecb_fihu_fi",
        "opus_opensubtitles2012_fihu_fi",
        "opus_opensubtitles2011_fihu_fi",
        "opus_opensubtitles2013_fihu_fi",
        "opus_eubookshop_fihu_fi",
        "opus_kde4_fihu_fi",
    ]
};

settings.corpusAliases.opus_fihu = "opus_.*fihu_fi";

settings.corporafolders.other.opus.finl = {
    title: "OPUS Finnish–Dutch",
    contents: [
        "opus_dgt_finl_fi",
        "opus_ecb_finl_fi",
        "opus_emea_finl_fi",
        "opus_eubookshop_finl_fi",
        "opus_euconst_finl_fi",
        "opus_gnome_finl_fi",
        "opus_kde4_finl_fi",
        "opus_opensubtitles2011_finl_fi",
        "opus_opensubtitles2012_finl_fi",
        "opus_opensubtitles2013_finl_fi",
        "opus_php_finl_fi",
        "opus_tatoeba_finl_fi",
        "opus_ubuntu_finl_fi",
    ]
};

settings.corpusAliases.opus_finl = "opus_.*finl_fi";

settings.corporafolders.other.opus.fitrl = {
    title: "OPUS Finnish–Turkish",
    contents: [
        "opus_eubookshop_fitr_fi",
        "opus_gnome_fitr_fi",
        "opus_kde4_fitr_fi",
        "opus_opensubtitles2011_fitr_fi",
        "opus_opensubtitles2012_fitr_fi",
        "opus_opensubtitles2013_fitr_fi",
        "opus_php_fitr_fi",
        "opus_opensubtitles_fitr_fi",
    ]
};

settings.corpusAliases.opus_fitr = "opus_.*fitr_fi";

settings.corporafolders.other.opus.csfi = {
    title: "OPUS Finnish–Czech",
    contents: [
        "opus_dgt_csfi_fi",
        "opus_ecb_csfi_fi",
        "opus_emea_csfi_fi",
        "opus_eubookshop_csfi_fi",
        "opus_euconst_csfi_fi",
        "opus_gnome_csfi_fi",
        "opus_kde4_csfi_fi",
        "opus_opensubtitles2011_csfi_fi",
        "opus_opensubtitles2012_csfi_fi",
        "opus_opensubtitles2013_csfi_fi",
        "opus_php_csfi_fi",
        "opus_tatoeba_csfi_fi",
        "opus_ubuntu_csfi_fi",
        "opus_europarl_csfi_fi",
    ]
};

settings.corpusAliases.opus_csfi = "opus_.*csfi_fi";
settings.corpusAliases.opus_fics = "opus_.*csfi_fi";

settings.corporafolders.other.opus.elfi = {
    title: "OPUS Finnish–Greek",
    contents: [
        "opus_dgt_elfi_fi",
        "opus_ecb_elfi_fi",
        "opus_emea_elfi_fi",
        "opus_eubookshop_elfi_fi",
        "opus_euconst_elfi_fi",
        "opus_gnome_elfi_fi",
        "opus_kde4_elfi_fi",
        "opus_opensubtitles2011_elfi_fi",
        "opus_opensubtitles2012_elfi_fi",
        "opus_opensubtitles2013_elfi_fi",
        "opus_php_elfi_fi",
        "opus_opensubtitles_elfi_fi",
        "opus_ubuntu_elfi_fi",
    ]
};

settings.corpusAliases.opus_elfi = "opus_.*elfi_fi";
settings.corpusAliases.opus_fiel = "opus_.*elfi_fi";


settings.corporafolders.literary.parfin_parrus = {
    title: "ParFin, ParRus",
    contents: [
        "parfin_2016_fi",
        "parrus_2016_ru",
    ],
};


settings.corpora = {};


var linkref = {
    label: "linkref",
    displayType: "hidden"
}
var wordlink = {
    label: "wordlink",
    displayType: "hidden"
}


/* CEAL */

settings.corporafolders.literary.ceal = {
    title: "CEAL",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus<br/>Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus",
        // <br/><br/><strong>Huomaa</strong>, että korpukset CEAL-o ja CEAL-s sisältävät samat tekstit, mutta CEAL-s:ssä kappaleet on sekoitettu kunkin teoksen sisällä, kun taas CEAL-o:ssa kappaleet ovat alkuperäisessä järjestyksessä. Hakuja varten kannattaa valita vain toinen korpus. CEAL-o vaatii aina henkilökohtaisen käyttöluvan."
    info: {
        metadata_urn: "urn:nbn:fi:lb-2020012801",
        iprholder: {
            name: "Kersti Juva",
        },
    },
    contents: [
        "ceal_s_fi",
        "ceal_o_fi",
    ]
};

sattrlist.ceal_common = {
    text_year: sattrs.year,
    text_author: {
        label: "author",
        extendedComponent: "datasetSelect",
        localize: false,
        opts: options.lite,
        dataset: [
            "Jane Austen",
            "Charles Dickens",
            "Henry James",
        ],
    },
    text_title: {
        label: "work_title",
    },
    text_translator: {
        label: "text_translator",
        // All the works in CEAL have been translated by Kersti Juva,
        // so having the translator as a search criterion would make
        // little sense. How about statistics and comparison?
        hideExtended: true,
        // hideStatistics: true,
        // hideCompare: true,
    },
};

var ceal_work_list = "Korpus sisältää seuraavat teokset Kersti Juvan käännöksinä sekä alkuperäisinä:<br/>The corpus contains the following works as translated by Kersti Juva and as original:<ul><li>Jane Austen: Ylpeys ja ennakkoluulo (Teos 2013) (Pride and Prejudice)</li><li>Charles Dickens: Kolea talo (Otava 2003) (Bleak House)</li><li>Henry James: Washingtonin aukio (Tammi 2006) (Washington Square)</li>";

// scrambled ceal
settings.corpora.ceal_s_fi = {
    title: "CEAL (sekoitettu)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus, sekoitetut kappaleet<br/>ceal-par-s: Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus, scrambled paragraphs<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: within.link,
    id: "ceal_s_fi",
    shortname: "ceal-par-s-korp",
    lang: "fin",
    urn: "urn:nbn:fi:lb-2020012802",
    metadata_urn: "urn:nbn:fi:lb-2020012801",
    licence: {
        name: "CLARIN ACA +AFFIL=EDU +NC 2.1",
        urn: "urn:nbn:fi:lb-2020012804",
    },
    cite_id: "ceal-par-s-korp",
    limitedAccess: true,
    licenceType: "ACA",
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.ceal_common,
    linkedTo: ["ceal_s_en"]
};

settings.corpora.ceal_s_en = {
    title: "CEAL (sekoitettu)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus, sekoitetut kappaleet<br/>ceal-par-s: Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus, scrambled paragraphs<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: within.link,
    id: "ceal_s_en",
    shortname: "ceal-par-s-korp",
    lang: "eng",
    urn: "urn:nbn:fi:lb-2020012802",
    metadata_urn: "urn:nbn:fi:lb-2020012801",
    licence: {
        name: "CLARIN ACA +AFFIL=EDU +NC 2.1",
        urn: "urn:nbn:fi:lb-2020012803",
    },
    cite_id: "ceal-par-s-korp",
    limitedAccess: true,
    licenceType: "ACA",
    attributes: attrlist.ud2_en,
    structAttributes: sattrlist.ceal_common,
    linkedTo: ["ceal_s_fi"],
    hide: true
};

// original ceal
settings.corpora.ceal_o_fi = {
    title: "CEAL (alkuperäinen)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti-suomi-rinnakkaiskorpus<br/>ceal-par-korp: Classics of English and American Literature as translated by Kersti Juva, English-Finnish parallel corpus, Korp<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: within.link,
    id: "ceal_o_fi",
    shortname: "ceal-par-korp",
    lang: "fin",
    urn: "urn:nbn:fi:lb-2019121808",
    metadata_urn: "urn:nbn:fi:lb-2019121805",
    licence: {
	name: "CLARIN RES +NC 2.1",
	urn: "urn:nbn:fi:lb-2019121806",
    },
    cite_id: "ceal-par-korp",
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.ceal_common,
    linkedTo: ["ceal_o_en"]
};

settings.corpora.ceal_o_en = {
    title: "CEAL (alkuperäinen)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti-suomi-rinnakkaiskorpus, Korp<br/>ceal-par-korp: Classics of English and American Literature as translated by Kersti Juva, English-Finnish parallel corpus<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: within.link,
    id: "ceal_o_en",
    shortname: "ceal-par-korp",
    lang: "eng",
    urn: "urn:nbn:fi:lb-2019121808",
    metadata_urn: "urn:nbn:fi:lb-2019121805",
    licence: {
	name: "CLARIN RES +NC 2.1",
	urn: "urn:nbn:fi:lb-2019121806",
    },
    cite_id: "ceal-par-korp",
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.ud2_en,
    structAttributes: sattrlist.ceal_common,
    linkedTo: ["ceal_o_fi"],
    hide: true
};


delete ceal_work_list;


/* SEMFINLEX */

settings.corpora.semfinlex_asd_par_2018_fi = {
    id: "semfinlex_asd_par_2018_fi",
    lang: "fin",
    title : "Semfinlex: Alkuperäisiä säädöksiä (suomi–ruotsi)",
    description: "Eduskunnan alkuperäisiä säädöksiä vuosilta 1918–2018.",
    context: context.linkAligned,
    within: within.link,
    licence : settings.licenceinfo.CC_BY,
    features: ["parsed_tdt"],
    structAttributes : {
        text_url : {
            label : "URL",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_parl_statute_type: {
            label: "parl_statute_type",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "laki",
                "asetus",
                "paatos",
                "ilmoitus",
                "tyojarjestys",
                "kirje",
                "luettelo",
                "kuulutus",
                "kaari",
                ""
            ],
            translation: transl.parlStatuteType,
        }
    },
    cite_id: "semfinlex-asd-par-2018-korp",
    urn: "urn:nbn:fi:lb-2019042606",
    metadata_urn: "urn:nbn:fi:lb-2019042605",
    linkedTo: ["semfinlex_asd_par_2018_sv"]
}

settings.corpora.semfinlex_asd_par_2018_sv = {
    id: "semfinlex_asd_par_2018_sv",
    lang: "swe",
    title : "Semfinlex: Ursprungliga författningar (finska–svenska)",
    description: "Ett urval av ursprungliga författningar av Riksdagen från 1920–2018.",
    context: context.linkAligned,
    within: within.link,
    licence : settings.licenceinfo.CC_BY,
    attributes : attrlist.parsed_sv,
    structAttributes : {
        text_url : {
            label : "URL",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_parl_statute_type: {
            label: "parl_statute_type",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: [
                "laki",
                "asetus",
                "paatos",
                "ilmoitus",
                "tyojarjestys",
                "kirje",
                "luettelo",
                "kuulutus",
                "kaari",
                ""
            ],
            translation: transl.parlStatuteType,
        }
    },
    cite_id: "semfinlex-asd-par-2018-korp",
    urn: "urn:nbn:fi:lb-2019042606",
    metadata_urn: "urn:nbn:fi:lb-2019042605",
    linkedTo: ["semfinlex_asd_par_2018_fi"],
    hide: true
}

funcs.addCorporaToFolder("legal", "semfinlex_asd_par_2018_fi");

sattrlist.uspenskij = {
    text_translators: { label: "text_translator" },
    text_publisher: { label: "publisher" },
    text_publication_year: { label: "publication_year" },
    text_publication_place: { label: "publication_place" },
    text_publication: { label: "publication_name" },
    text_page_range: { label: "text_page_range" },
    text_original_lang: { label: "origlang" },
    text_no_of_pages: { label: "numberofpages" },
    text_medium: { label: "medium" },
    text_iso_lang: { label: "uralic_ud_text_iso_lang" },
    text_id: { label: "text_id" },
    /*text__geo_translator_origin: { label: "" }, */
    text_genre: { label: "text_genre" },
    text_e_corrector: { label: "text_e_corrector" },
    text_corrector: { label: "text_corrector" },
    text_comment: { label: "comment" },
    text_bibliog: { label: "bibliography" },
    text_author: { label: "text_author" },
    text_word_count: { label: "num_words" },
    text_character_count: { label: "num_chars" },
    chapter_storyid: { label: "story_id" },
    chapter_chapid: { label: "chapter_id" },
    paragraph_pid: { label: "paragraph_pid" },
    sentence_text: { label: "text" },
    sentence_id: { label: "sentence_id" },
    sentence_text_mhr: { label: "sentence_text_mhr" },
    sentence_text_mns: { label: "sentence_text_mns" },
    sentence_text_rus: { label: "sentence_text_rus" }
}

settings.corporafolders.other.uspenskij_4bat = {
    title: "Uspenskij 4 battles",
    description: "Parallel Corpus of the book 'Four Battles', written by L. Uspenskij",
    info: {
        metadata_urn: "urn:nbn:fi:lb-2023042426",
	licence: {
	    name: "CC-BY (PUB)",
	    urn: "urn:nbn:fi:lb-2023042428",
	},
    },
    contents: [ "uspenskij_a_4bat_mns", "uspenskij_4bat_koi" ]
}

settings.corpora.uspenskij_a_4bat_mns = {
    id: "uspenskij_a_4bat_mns",
    lang: "mns",
    title : "Uspenskij 4 battles (mns-rus)",
    description: "Uspenskij 4 battles (mns-rus)",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: ["uspenskij_a_4bat_rus"]
}

settings.corpora.uspenskij_a_4bat_rus = {
    id: "uspenskij_a_4bat_rus",
    lang: "rus",
    title : "Uspenskij 4 battles (mns-rus)",
    description: "Uspenskij 4 battles (mns-rus)",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: ["uspenskij_a_4bat_mns"],
    hide: true
}


settings.corpora.uspenskij_4bat_koi = {
    id: "uspenskij_4bat_koi",
    lang: "koi",
    title : "Uspenskij 4 battles (koi-kpv-mdf-mhr-mrj-myv-rus-udm)",
    description: "Uspenskij 4 battles (koi-kpv-mdf-mhr-mrj-myv-rus-udm)",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ]
}

settings.corpora.uspenskij_4bat_kpv = {
    id: "uspenskij_4bat_kpv",
    lang: "kpv",
    title : "Uspenskij 4 battles: kpv",
    description: "Uspenskij 4 battles: kpv",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ],
    hide: true
}

settings.corpora.uspenskij_4bat_mdf = {
    id: "uspenskij_4bat_mdf",
    lang: "mdf",
    title : "Uspenskij 4 battles: mdf",
    description: "Uspenskij 4 battles: mdf",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ],
    hide: true
}

settings.corpora.uspenskij_4bat_mhr = {
    id: "uspenskij_4bat_mhr",
    lang: "mhr",
    title : "Uspenskij 4 battles: mhr",
    description: "Uspenskij 4 battles: mhr",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ],
    hide: true
}

settings.corpora.uspenskij_4bat_mrj = {
    id: "uspenskij_4bat_mrj",
    lang: "mrj",
    title : "Uspenskij 4 battles: mrj",
    description: "Uspenskij 4 battles: mrj",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_myv", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ],
    hide: true
}
settings.corpora.uspenskij_4bat_myv = {
    id: "uspenskij_4bat_myv",
    lang: "myv",
    title : "Uspenskij 4 battles: myv",
    description: "Uspenskij 4 battles: myv",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_rus", "uspenskij_4bat_udm" ],
    hide: true
}

settings.corpora.uspenskij_4bat_rus = {
    id: "uspenskij_4bat_rus",
    lang: "rus",
    title : "Uspenskij 4 battles: rus",
    description: "Uspenskij 4 battles: rus",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_udm" ],
    hide: true
}

settings.corpora.uspenskij_4bat_udm = {
    id: "uspenskij_4bat_udm",
    lang: "udm",
    title : "Uspenskij 4 battles: udm",
    description: "Uspenskij 4 battles: udm",
    context: context.linkAligned,
    within: within.link,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.uspenskij,
    linkedTo: [ "uspenskij_4bat_koi", "uspenskij_4bat_kpv", "uspenskij_4bat_mdf", "uspenskij_4bat_mhr", "uspenskij_4bat_mrj", "uspenskij_4bat_myv", "uspenskij_4bat_rus" ],
    hide: true
}


/* OPUS – Open Source Paraller Corpus */

settings.corpusAliases.opus = "opus_.*_fi";

settings.corpora.opus_opensubtitles2011_fitr_tr = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_opensubtitles2011_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fitr_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fitr_tr = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_opensubtitles2012_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fitr_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fitr_tr = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_opensubtitles2013_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fitr_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fitr_tr = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_opensubtitles_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fitr_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fitr_tr = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_eubookshop_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fitr_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fitr_tr = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_kde4_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fitr_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_fitr_tr = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_gnome_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fitr_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fitr_tr = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linkedTo: ["opus_php_fitr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fitr_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_fitr_tr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_fifr_fr = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_books_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_fifr_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_books_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fifr_fr = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_opensubtitles2012_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fifr_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fifr_fr = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_opensubtitles_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fifr_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fifr_fr = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_kde4_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fifr_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_fifr_fr = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_gnome_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fifr_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_fifr_fr = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_euconst_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_fifr_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fifr_fr = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_php_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fifr_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_fifr_fr = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_ubuntu_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_fifr_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_fifr_fr = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_tatoeba_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_fifr_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_es = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_opensubtitles2011_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_esfi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_esfi_es = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_opensubtitles_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_esfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_esfi_es = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_kde4_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_esfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_esfi_es = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_gnome_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_esfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_esfi_es = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_euconst_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_esfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_esfi_es = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_php_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_esfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_esfi_es = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_ubuntu_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_esfi_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_esfi_es = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_tatoeba_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_esfi_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_books_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_esfi_es = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_books_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_europarl_csfi_fi = {
    title: "Europarl",
    description: "Europarl",
    id: "opus_europarl_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_europarl_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_europarl_csfi_cs = {
    title: "Europarl",
    description: "Europarl",
    id: "opus_europarl_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_europarl_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fisv_sv = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_gnome_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fisv_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_fisv_sv = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_euconst_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_fisv_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fisv_sv = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_php_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fisv_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_fisv_sv = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_ubuntu_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_fisv_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_fisv_sv = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_tatoeba_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_fisv_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fisv_sv = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_opensubtitles_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fisv_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_el = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_opensubtitles2011_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_elfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_elfi_el = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_opensubtitles2012_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_elfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_elfi_el = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_opensubtitles2013_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_elfi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_elfi_el = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_opensubtitles_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_elfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_elfi_el = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_dgt_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_elfi_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_elfi_el = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_eubookshop_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_elfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_elfi_el = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_emea_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_elfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_elfi_el = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_ecb_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_elfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_elfi_el = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_kde4_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_elfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_elfi_el = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_gnome_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_elfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_elfi_el = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_euconst_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_elfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_elfi_el"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_elfi_el = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linkedTo: ["opus_ubuntu_elfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_defi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_defi_de = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_opensubtitles_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_defi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_defi_de = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_gnome_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_defi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_defi_de = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_euconst_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_defi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_defi_de = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_php_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_defi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_defi_de = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_ubuntu_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_defi_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_defi_de = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_tatoeba_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_csfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_csfi_cs = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_opensubtitles2011_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_csfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_csfi_cs = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_opensubtitles2012_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_csfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_csfi_cs = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_opensubtitles2013_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_csfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_csfi_cs = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_dgt_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_csfi_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_csfi_cs = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_eubookshop_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_csfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_csfi_cs = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_emea_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_csfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_csfi_cs = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_ecb_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_csfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_csfi_cs = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_kde4_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_csfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_csfi_cs = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_gnome_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_csfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_csfi_cs = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_euconst_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_csfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_csfi_cs = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_php_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_csfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_csfi_cs"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_csfi_cs = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linkedTo: ["opus_ubuntu_csfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_finl_nl = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_opensubtitles2011_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_finl_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_finl_nl = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_opensubtitles2012_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_finl_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_finl_nl = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_opensubtitles2013_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_finl_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_finl_nl = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_dgt_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_finl_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_finl_nl = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_eubookshop_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_finl_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_finl_nl = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_emea_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_finl_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_finl_nl = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_ecb_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_finl_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_finl_nl = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_kde4_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_finl_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_finl_nl = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_gnome_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_finl_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_finl_nl = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_euconst_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_finl_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_finl_nl = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_php_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_finl_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_finl_nl = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_ubuntu_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_finl_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_finl_nl = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linkedTo: ["opus_tatoeba_finl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_finl_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_finl_nl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_firu_ru = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_opensubtitles2011_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_firu_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_firu_ru = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_kde4_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_firu_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_ru = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_eubookshop_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_firu_ru = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_opensubtitles2012_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_firu_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_firu_ru = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_php_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_firu_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_firu_ru = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_opensubtitles_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_firu_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_firu_ru = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_tatoeba_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_firu_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_firu_ru = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_ubuntu_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_firu_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_firu_ru = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linkedTo: ["opus_gnome_firu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_firu_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_firu_ru"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_enfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_gnome_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_enfi_en = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linkedTo: ["opus_gnome_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_enfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_euconst_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_enfi_en = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linkedTo: ["opus_euconst_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_enfi_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_books_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_enfi_en = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linkedTo: ["opus_books_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_enfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_php_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_enfi_en = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linkedTo: ["opus_php_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_enfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ubuntu_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_enfi_en = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linkedTo: ["opus_ubuntu_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fihu_hu = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_opensubtitles2012_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fihu_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fihu_hu = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_opensubtitles2013_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fihu_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fihu_hu = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_opensubtitles2011_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fihu_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fihu_hu = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_dgt_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fihu_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fihu_hu = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_ecb_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fihu_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fihu_hu = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_emea_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fihu_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fihu_hu = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_eubookshop_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fihu_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fihu_hu = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linkedTo: ["opus_kde4_fihu_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fihu_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_fihu_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fiit_it = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_emea_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fiit_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fiit_it = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_ecb_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fiit_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fiit_it = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_opensubtitles2011_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fiit_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fiit_it = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_opensubtitles2013_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fiit_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fiit_it = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_opensubtitles2012_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fiit_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fiit_it = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_eubookshop_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fiit_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fiit_it = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linkedTo: ["opus_dgt_fiit_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fiit_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fiit_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fipt_pt = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_ecb_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fipt_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fipt_pt = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_emea_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipt_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipt_pt = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_opensubtitles2011_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fipt_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipt_pt = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_opensubtitles2013_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fipt_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};



settings.corpora.opus_eubookshop_fipt_pt = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_eubookshop_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fipt_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fipt_pt = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_opensubtitles_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fipt_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fipt_pt = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linkedTo: ["opus_dgt_fipt_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fipt_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fipt_pt"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_et = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_opensubtitles2011_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_etfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};
settings.corpora.opus_kde4_etfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_etfi_et = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_kde4_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_etfi_et = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_emea_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_etfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_etfi_et = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_dgt_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_etfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_etfi_et = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_opensubtitles2012_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};
settings.corpora.opus_opensubtitles2013_etfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_etfi_et"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_etfi_et = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linkedTo: ["opus_opensubtitles2013_etfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipl_pl = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_emea_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipl_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fim",
    linkedTo: ["opus_emea_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fipl_pl = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_ecb_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fipl_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fim",
    linkedTo: ["opus_ecb_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fipl_pl = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_dgt_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fipl_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fipl_pl = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_opensubtitles2012_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fipl_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipl_pl = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_opensubtitles2013_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fipl_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipl_pl = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linkedTo: ["opus_opensubtitles2011_fipl_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fipl_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fipl_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_dafi_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_dafi_da = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_dgt_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_dafi_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_dafi_da = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_eubookshop_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_dafi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_dafi_da = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_opensubtitles2012_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_dafi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_dafi_da = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_opensubtitles2013_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_dafi_fi = {
    title: "KDE4 – KDE4 localization files (v.2)",
    description: "KDE4",
    id: "opus_kde4_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_dafi_da = {
    title: "KDE4 – KDE4 localization files (v.2)",
    description: "KDE4",
    id: "opus_kde4_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_kde4_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_dafi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_dafi_da"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_dafi_da = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linkedTo: ["opus_ecb_dafi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};


settings.corpora.opus_dgt_esfi_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_esfi_es = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_dgt_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_esfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_esfi_es = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_opensubtitles2012_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_esfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_esfi_es = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_opensubtitles2013_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_esfi_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_esfi_es = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linkedTo: ["opus_eubookshop_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fifr_fr = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_ecb_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fifr_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fifr_fr = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_emea_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fifr_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fifr_fr = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_opensubtitles2013_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fifr_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fifr_fr = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_opensubtitles2011_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fifr_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fifr_fr = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_eubookshop_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fifr_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fifr_fr = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linkedTo: ["opus_dgt_fifr_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fifr_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fifr_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_defi_fi = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_defi_de = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_kde4_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};


settings.corpora.opus_emea_defi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_defi_de = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_emea_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_defi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_defi_de = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_ecb_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_defi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_defi_de = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_dgt_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_defi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_defi_de = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_opensubtitles2013_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_defi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_defi_de = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_opensubtitles2011_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_defi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_defi_de = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_opensubtitles2012_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_defi_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_defi_de = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linkedTo: ["opus_eubookshop_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fisv_sv = {
    title: "DGT FI–SV",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_dgt_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fisv_fi = {
    title: "DGT FI–SV",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fisv_sv = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_eubookshop_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fisv_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fisv_fi",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2012_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_sv = {
    title: "OpenSubtitles2012 SV",
    description: "OpenSubtitles2012 SV",
    id: "opus_opensubtitles2012_fisv_sv",
    lang: "swe",
    linkedTo: ["opus_opensubtitles2012_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fisv_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fisv_fi",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2013_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fisv_sv = {
    title: "OpenSubtitles2013 SV",
    description: "OpenSubtitles2013 SV",
    id: "opus_opensubtitles2013_fisv_sv",
    lang: "swe",
    linkedTo: ["opus_opensubtitles2013_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fisv_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fisv_fi",
    lang: "fin",
    linkedTo: ["opus_opensubtitles2011_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fisv_sv = {
    title: "OpenSubtitles2011 SV",
    description: "OpenSubtitles2011 SV",
    id: "opus_opensubtitles2011_fisv_sv",
    lang: "swe",
    linkedTo: ["opus_opensubtitles2011_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {},
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fisv_sv = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_kde4_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fisv_fi = {
    title: "KDE4 FI–SV",
    description: "A parallel corpus of KDE4 localization files (v.2)",
    id: "opus_kde4_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_kde4_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};


settings.corpora.opus_dgt_enfi_fi = {
    title: "DGT",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_dgt_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_enfi_en = {
    title: "DGT",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_dgt_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_enfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_enfi_en = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_emea_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {
    },
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fisv_sv = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linkedTo: ["opus_emea_fisv_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fisv_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_emea_fisv_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_fi = {
    title: "OpenSubtitles2013",
    description: "Opensubtitles 2013",
    id: "opus_opensub2013enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensub2013enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_en = {
    title: "Opensubtitles 2013 EN",
    description: "Opensubtitles 2013 EN",
    id: "opus_opensub2013enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_opensub2013enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2015enfi_fi = {
    title: "Opensubtitles 2015",
    description: "Opensubtitles 2015",
    id: "opus_opensub2015enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensub2015enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2015enfi_en = {
    title: "Opensubtitles 2015 EN",
    description: "Opensubtitles 2015 EN",
    id: "opus_opensub2015enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_opensub2015enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2011enfi_fi = {
    title: "OpenSubtitles2011",
    description: "Opensubtitles 2011",
    id: "opus_opensub2011enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensub2011enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2011enfi_en = {
    title: "Opensubtitles 2011 EN",
    description: "Opensubtitles 2011 EN",
    id: "opus_opensub2011enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_opensub2011enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2012enfi_fi = {
    title: "OpenSubtitles2012",
    description: "Opensubtitles 2012",
    id: "opus_opensub2012enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_opensub2012enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2012enfi_en = {
    title: "Opensubtitles 2012 EN",
    description: "Opensubtitles 2012 EN",
    id: "opus_opensub2012enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_opensub2012enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_enfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_ecb_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_enfi_en = {
    title: "ECB EN",
    description: "ECB EN",
    id: "opus_ecb_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_ecb_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_enfi_en = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_eubookshop_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_enfi_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_eubookshop_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_fi = {
    title: "Tatoeba",
    description: "Käännettyjen lauseiden tietokanta (A DB of translated sentences)",
    id: "opus_tatoeba_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linkedTo: ["opus_tatoeba_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_en = {
    title: "Tatoeba EN–FI EN",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linkedTo: ["opus_tatoeba_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    attributes: {
    },
    within: within.sp,
    context: context.sp,
    structAttributes: sattrlist.opus,
    hide: true
};

/* Europarl V7 */

settings.corpora.europarl_v7_enfi_en = {
    title: "EuroParl v7 EN",
    description: "euroParl_v7_enfi_en",
    id: "europarl_v7_enfi_en",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "eng",
    linkedTo: ["europarl_v7_enfi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};


settings.corpora.europarl_v7_etfi_et = {
    title: "EuroParl v7 ET",
    description: "euroParl_v7_etfi_et",
    id: "europarl_v7_etfi_et",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "est",
    linkedTo: ["europarl_v7_etfi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_esfi_es = {
    title: "EuroParl v7 ES",
    description: "euroParl_v7_esfi_es",
    id: "europarl_v7_esfi_es",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "spa",
    linkedTo: ["europarl_v7_esfi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_frfi_fr = {
    title: "EuroParl v7 FR",
    description: "euroParl_v7_frfi_fr",
    id: "europarl_v7_frfi_fr",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fra",
    linkedTo: ["europarl_v7_frfi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_defi_de = {
    title: "EuroParl v7 DE",
    description: "euroParl_v7_defi_de",
    id: "europarl_v7_defi_de",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "deu",
    linkedTo: ["europarl_v7_defi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_svfi_sv = {
    title: "EuroParl v7 SV",
    description: "euroParl_v7_svfi_sv",
    id: "europarl_v7_svfi_sv",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "swe",
    linkedTo: ["europarl_v7_svfi_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_etfi_fi = {
    title: "EuroParl suomi–viro",
    description: "EuroParl suomi–viro-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_etfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_etfi_et"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_esfi_fi = {
    title: "EuroParl suomi–espanja",
    description: "EuroParl suomi–espanja-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_esfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_esfi_es"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_frfi_fi = {
    title: "EuroParl suomi–ranska",
    description: "EuroParl suomi–ranska-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_frfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_frfi_fr"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_defi_fi = {
    title: "EuroParl suomi–saksa",
    description: "EuroParl suomi–saksa-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_defi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_defi_de"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_enfi_fi = {
    title: "EuroParl suomi–englanti",
    description: "EuroParl suomi–englanti-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_enfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_enfi_en"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_svfi_fi = {
    title: "EuroParl suomi–ruotsi",
    description: "EuroParl suomi–ruotsi-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_svfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linkedTo: ["europarl_v7_svfi_sv"],
    context: context.defaultAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};


/* JRC */

settings.corpora.jrc_acquis_enfi_en = {
    title: "JRC-Acquis englanti",
    description: "jrc_acquis_enfi_en",
    id: "jrc_acquis_enfi_en",
    urn: "urn:nbn:fi:lb-2015062302",
    metadata_urn: "urn:nbn:fi:lb-2015061201",
    lang: "eng",
    linkedTo: ["jrc_acquis_enfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_enfi_fi = {
    title: "JRC-Acquis suomi–englanti",
    description: "JRC-Acquis suomi–englanti",
    id: "jrc_acquis_enfi_fi",
    urn: "urn:nbn:fi:lb-2015062302",
    metadata_urn: "urn:nbn:fi:lb-2015061201",
    lang: "fin",
    linkedTo: ["jrc_acquis_enfi_en"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};


settings.corpora.jrc_acquis_hufi_hu = {
    title: "JRC-Acquis unkari",
    description: "jrc_acquis_hufi_hu",
    id: "jrc_acquis_hufi_hu",
    urn: "urn:nbn:fi:lb-2015062309",
    metadata_urn: "urn:nbn:fi:lb-2015061205",
    lang: "hun",
    linkedTo: ["jrc_acquis_hufi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_hufi_fi = {
    title: "JRC-Acquis suomi–unkari",
    description: "JRC-Acquis suomi–unkari",
    id: "jrc_acquis_hufi_fi",
    urn: "urn:nbn:fi:lb-2015062309",
    metadata_urn: "urn:nbn:fi:lb-2015061205",
    lang: "fin",
    linkedTo: ["jrc_acquis_hufi_hu"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_frfi_fr = {
    title: "JRC-Acquis ranska",
    description: "jrc_acquis_frfi_fr",
    id: "jrc_acquis_frfi_fr",
    urn: "urn:nbn:fi:lb-2015062307",
    metadata_urn: "urn:nbn:fi:lb-2015061203",
    lang: "fra",
    linkedTo: ["jrc_acquis_frfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_frfi_fi = {
    title: "JRC-Acquis suomi–ranska",
    description: "JRC-Acquis suomi–ranska",
    id: "jrc_acquis_frfi_fi",
    urn: "urn:nbn:fi:lb-2015062307",
    metadata_urn: "urn:nbn:fi:lb-2015061203",
    lang: "fin",
    linkedTo: ["jrc_acquis_frfi_fr"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_plfi_pl = {
    title: "JRC-Acquis puola",
    description: "jrc_acquis_plfi_pl",
    id: "jrc_acquis_plfi_pl",
    urn: "urn:nbn:fi:lb-2015062310",
    metadata_urn: "urn:nbn:fi:lb-2015061207",
    lang: "pol",
    linkedTo: ["jrc_acquis_plfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_plfi_fi = {
    title: "JRC-Acquis suomi–puola",
    description: "JRC-Acquis suomi–puola",
    id: "jrc_acquis_plfi_fi",
    urn: "urn:nbn:fi:lb-2015062310",
    metadata_urn: "urn:nbn:fi:lb-2015061207",
    lang: "fin",
    linkedTo: ["jrc_acquis_plfi_pl"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_itfi_it = {
    title: "JRC-Acquis italia",
    description: "jrc_acquis_itfi_it",
    id: "jrc_acquis_itfi_it",
    urn: "urn:nbn:fi:lb-2015062308",
    metadata_urn: "urn:nbn:fi:lb-2015061206",
    lang: "ita",
    linkedTo: ["jrc_acquis_itfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_itfi_fi = {
    title: "JRC-Acquis suomi–italia",
    description: "JRC-Acquis suomi–italia",
    id: "jrc_acquis_itfi_fi",
    urn: "urn:nbn:fi:lb-2015062308",
    metadata_urn: "urn:nbn:fi:lb-2015061206",
    lang: "fin",
    linkedTo: ["jrc_acquis_itfi_it"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_esfi_es = {
    title: "JRC-Acquis espanja",
    description: "jrc_acquis_esfi_es",
    id: "jrc_acquis_esfi_es",
    urn: "urn:nbn:fi:lb-2015062305",
    metadata_urn: "urn:nbn:fi:lb-2015061208",
    lang: "spa",
    linkedTo: ["jrc_acquis_esfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_esfi_fi = {
    title: "JRC-Acquis suomi–espanja",
    description: "JRC-Acquis suomi–espanja",
    id: "jrc_acquis_esfi_fi",
    urn: "urn:nbn:fi:lb-2015062305",
    metadata_urn: "urn:nbn:fi:lb-2015061208",
    lang: "fin",
    linkedTo: ["jrc_acquis_esfi_es"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

// jrc_acquis_etfi_et is empty in practice, probably due to an error
// in the import process

// settings.corpora.jrc_acquis_etfi_et = {
//     title: "JRC-Acquis viro",
//     description: "jrc_acquis_etfi_et",
//     id: "jrc_acquis_etfi_et",
//     urn: "urn:nbn:fi:lb-2015062306",
//     metadata_urn: "urn:nbn:fi:lb-2015061202",
//     lang: "est",
//     linkedTo: ["jrc_acquis_etfi_fi"],
//     context: context.alignAligned,
//     within: within.sentence,
//     within: within.sp,
//     context: context.sp,
//     attributes: {
//     },
//     structAttributes: sattrlist.jrc_acquis,
//     hide: true
// };

// settings.corpora.jrc_acquis_etfi_fi = {
//     title: "JRC-Acquis suomi–viro",
//     description: "JRC-Acquis suomi–viro",
//     id: "jrc_acquis_etfi_fi",
//     urn: "urn:nbn:fi:lb-2015062306",
//     metadata_urn: "urn:nbn:fi:lb-2015061202",
//     lang: "fin",
//     linkedTo: ["jrc_acquis_etfi_et"],
//     context: context.alignAligned,
//     within: within.sentence,
//     within: within.sp,
//     context: context.sp,
//     attributes: {
//     },
//     structAttributes: sattrlist.jrc_acquis
// };

settings.corpora.jrc_acquis_defi_de = {
    title: "JRC-Acquis saksa",
    description: "jrc_acquis_defi_de",
    id: "jrc_acquis_defi_de",
    urn: "urn:nbn:fi:lb-2015062304",
    metadata_urn: "urn:nbn:fi:lb-2015061204",
    lang: "deu",
    linkedTo: ["jrc_acquis_defi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_defi_fi = {
    title: "JRC-Acquis suomi–saksa",
    description: "JRC-Acquis suomi–saksa",
    id: "jrc_acquis_defi_fi",
    urn: "urn:nbn:fi:lb-2015062304",
    metadata_urn: "urn:nbn:fi:lb-2015061204",
    lang: "fin",
    linkedTo: ["jrc_acquis_defi_de"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_svfi_sv = {
    title: "JRC-Acquis ruotsi",
    description: "jrc_acquis_svfi_sv",
    id: "jrc_acquis_svfi_sv",
    urn: "urn:nbn:fi:lb-2015062303",
    metadata_urn: "urn:nbn:fi:lb-2015061209",
    lang: "swe",
    linkedTo: ["jrc_acquis_svfi_fi"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_svfi_fi = {
    title: "JRC-Acquis suomi–ruotsi",
    description: "JRC-Acquis suomi–ruotsi",
    id: "jrc_acquis_svfi_fi",
    urn: "urn:nbn:fi:lb-2015062303",
    metadata_urn: "urn:nbn:fi:lb-2015061209",
    lang: "fin",
    linkedTo: ["jrc_acquis_svfi_sv"],
    context: context.alignAligned,
    within: within.sentence,
    within: within.sp,
    context: context.sp,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};


/* KFSPC */

settings.corpora.kfspc_fi = {
    title: "Kotus Finnish-Swedish Parallel Corpus (suomi)",
    description: "KFSPC (suomi)",
    id: "kfspc_fi",
    cite_id: "kfspc-korp",
    lang: "fin",
    linkedTo: ["kfspc_sv"],
    context: context.defaultAligned,
    within: within.sentence,
    features: ["parsed_tdt", "finer"],
    structAttributes: sattrlist.kfspc
};

settings.corpora.kfspc_sv = {
    title: "Kotus Finnish-Swedish Parallel Corpus (ruotsi)",
    description: "KFSPC (ruotsi)",
    id: "kfspc_sv",
    cite_id: "kfspc-korp",
    lang: "swe",
    linkedTo: ["kfspc_fi"],
    context: context.defaultAligned,
    within: within.sentence,
    attributes: {
    },
    structAttributes: sattrlist.kfspc,
    hide: true
};

funcs.extendCorpusSettings(settings.corpusinfo.kfspc,
                           ["kfspc_fi", "kfspc_sv"]);

funcs.addCorporaToFolder("other", "kfspc_fi");


settings.corpora.mulcold_fi = {
    id: "mulcold_fi",
    lang: "fin",
    linkedTo: ["mulcold_en", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (suomi)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: within.sentence,
    attributes: attrlist.mulcold_fi,
    structAttributes: sattrlist.mulcold
};

settings.corpora.mulcold_en = {
    id: "mulcold_en",
    lang: "eng",
    linkedTo: ["mulcold_fi", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (englanti)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: within.sentence,
    attributes: attrlist.mulcold_en,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_sv = {
    id: "mulcold_sv",
    lang: "swe",
    linkedTo: ["mulcold_fi", "mulcold_en", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (ruotsi)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: within.sentence,
    attributes: attrlist.mulcold_sv,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_ru = {
    id: "mulcold_ru",
    lang: "rus",
    linkedTo: ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (venäjä)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: within.sentence,
    attributes: attrlist.mulcold_ru,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_de = {
    id: "mulcold_de",
    lang: "deu",
    linkedTo: ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_ru"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (saksa)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: within.sentence,
    attributes: attrlist.mulcold_de,
    structAttributes: sattrlist.mulcold,
    hide: true
};

funcs.extendCorpusSettings(
    $.extend({}, settings.corpusinfo.mulcold, { cite_id: "MULCOLD", }),
    ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_ru", "mulcold_de"]);

funcs.addCorporaToFolder("legal", "mulcold_fi");


/* ParFin 2016 */

settings.corpora.parfin_2016_fi = {
    id: "parfin_2016_fi",
    lang: "fin",
    linkedTo: ["parfin_2016_ru"],
    attributes: attrlist.parfin_2016_fi,
    structAttributes: sattrlist.parfin_2016_fi,
};

settings.corpora.parfin_2016_ru = {
    id: "parfin_2016_ru",
    lang: "rus",
    linkedTo: ["parfin_2016_fi"],
    attributes: attrlist.parfin_2016_ru,
    structAttributes: sattrlist.parfin_2016_ru,
    hide: true,
};

funcs.extendCorpusSettings(
    {
        // Properties common to parfin_2016_fi and parfin_2016_ru
        title: "ParFin 2016",
        description: "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1910–2008 ja niiden käännöksiä venäjäksi virketasolla kohdistettuina<br/>ParFin 2016: финско-русский корпус художественных текстов. Финская проза 1910–2008 гг. и ее переводы на русский язык, тексты выровнены на уровне предложений.<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Suomen annotaatioiden kuvaus</a><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
        urn: "urn:nbn:fi:lb-2016121601",
        metadata_urn: "urn:nbn:fi:lb-2016121610",
        licence: settings.licenceinfo.ParFinRus_2016_fi,
        cite_id: "ParFin2016",
        context: context.linkAligned,
        // TODO: Make sure that within.sentLink works in all cases.
        within: within.sentLink,
        limitedAccess: true,
        licenceType: "RES",
    },
    ["parfin_2016_fi", "parfin_2016_ru"]
);
funcs.extendCorpusSettings(settings.corpusinfo.parfin_2016,
                           ["parfin_2016_fi", "parfin_2016_ru"]);


/* ParRus 2016 */

// parrus_2016_fi contains all the parallel Finnish translations and
// it is linked to parrus_2016_ru, so that a search in Finnish returns
// matches from any Finnish translation.
//
// However, parrus_2016_ru is linked to the Finnish versions _fi1,
// _fi2, _fi3, _fi4, each of which contains only a single translation
// of each text, so that searching in Russian should return results in
// each of the translations. (_fi1 contains translations of all texts,
// _fi2, _fi3 and _fi4 contain the second, third and fourth
// translations, respectively, for the texts with at least that number
// of translations.)
//
// Searching in Finnish from parrus_2016_ru shows the results
// separately for each translation and for each search shows all the
// translations, which multiplies the "corpora" from which results are
// reported.
//
// Because of Mikhail Mikhailov's wishes, only parrus_2016_ru is shown
// in the corpus selector, even if searching from it in Finnish shows
// the same results several times.

settings.corpora.parrus_2016_ru = {
    title: "ParRus 2016",
    id: "parrus_2016_ru",
    lang: "rus",
    linkedTo: ["parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi3",
                 "parrus_2016_fi4"],
    // linkedTo_inverse appeared to be needed to make searches in
    // Finnish work in parrus_2016_ru. But now the searches seem to
    // work without that, although nothing related to that should have
    // been changed. Why is that? (Jyrki Niemi 2017-02-03)
    // linkedTo_inverse: ["parrus_2016_fi"],
    attributes: attrlist.parrus_2016_ru,
    structAttributes: sattrlist.parrus_2016_ru,
};

settings.corpora.parrus_2016_fi = {
    title: "ParRus 2016 (suomi)",
    id: "parrus_2016_fi",
    linkedTo: ["parrus_2016_ru"],
};

settings.corpora.parrus_2016_fi1 = {
    id: "parrus_2016_fi1",
    linkedTo: ["parrus_2016_ru",
                 "parrus_2016_fi2", "parrus_2016_fi3", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 1)",
};

settings.corpora.parrus_2016_fi2 = {
    id: "parrus_2016_fi2",
    linkedTo: ["parrus_2016_ru",
                 "parrus_2016_fi1", "parrus_2016_fi3", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 2)",
};

settings.corpora.parrus_2016_fi3 = {
    id: "parrus_2016_fi3",
    linkedTo: ["parrus_2016_ru",
                 "parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 3)",
};

settings.corpora.parrus_2016_fi4 = {
    id: "parrus_2016_fi4",
    linkedTo: ["parrus_2016_ru",
                 "parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi3"],
    title: "ParRus 2016 (suomenkielinen käännös 4)",
};

funcs.extendCorpusSettings(
    {
        // Properties common to all ParRus 2016 language versions
        description: "ParRus 2016 – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus<br/>Venäjänkielisiä kaunokirjallisia tekstejä (klassista ja 1900-luvun kirjallisuutta) ja niiden käännöksiä suomeksi kappaletasolla kohdistettuina.<br/>ParRus 2016: русско-русский корпус художественных текстов. Русская классическая и современная проза и ее переводы на финский язык, тексты выровнены на уровне абзацев.<br/><br/><strong>Huomaa:</strong> Suomeksi haettaessa hakutulos sisältää samoja tuloksia useaan kertaan.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Suomen annotaatioiden kuvaus</a>",
        urn: "urn:nbn:fi:lb-2016121604",
        metadata_urn: "urn:nbn:fi:lb-20140730173",
        licence: settings.licenceinfo.ParFinRus_2016_fi,
        cite_id: "ParRus2016",
        context: context.linkAligned,
        // TODO: Make sure that within.sentLink works in all cases.
        within: within.sentLink,
        limitedAccess: true,
        licenceType: "RES"
    },
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4",
     "parrus_2016_ru"]);

funcs.extendCorpusSettings(
    settings.corpusinfo.parrus_2016,
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4",
     "parrus_2016_ru"]);

funcs.extendCorpusSettings(
    {
        // Properties common to parrus_2016_fiN
        lang: "fin",
        attributes: attrlist.parrus_2016_fi,
        structAttributes: sattrlist.parrus_2016_fi,
        hide: true,
    },
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4"]);

attrs.pos_pabivus = {
    label: "pos",
    displayType: "select",
    dataset: {
	"_" : "NOT_DEFINED",
	"N" : "N",
	"CLB" : "CLB",
	"V" : "V",
	"Pron" : "Pron",
	"Adv" : "Adv",
	"PUNCT" : "PUNCT",
	"CC" : "CC",
	"A" : "A",
	"Adp" : "Adp",
	"Pcle" : "Pcle",
	"Po" : "Po",
	"Num" : "Num",
	"CS" : "CS",
	"Det" : "Det",
	"Interj" : "Interj",
	"Ad" : "Ad",
	"Hom" : "Hom",
	"C" : "C",
	"Hom1" : "Hom1",
	"Card" : "Card",
	"Pl" : "Pl",
	"Adn" : "Adn",
	"Hom2" : "Hom2",
	"Sg" : "Sg",
	"Temp" : "Temp",
	"Qnt" : "Qnt",
	"Coll" : "Coll",
	"Ord" : "Ord",
	"SP" : "SP",
	"Descr" : "Descr",
	"Prc" : "Prc",
	"IV" : "IV",
	"Der" : "NOT_DEFINED",
	"Err/Dial" : "Err_Dial"
    },
    translation: {
	"NOT_DEFINED": { "en" : "undefined", "fi" : "undefined", "sv" : "undefined", },
        "N": { "en" : "noun", "fi" : "noun", "sv" : "noun", },
        "CLB": { "en" : "punctuation (CLB)", "fi" : "punctuation (CLB)", "sv" : "punctuation (CLB)", },
        "V": { "en" : "verb", "fi" : "verb", "sv" : "verb", },
        "Pron": { "en" : "pronoun", "fi" : "pronoun", "sv" : "pronoun", },
        "Adv": { "en" : "adverb", "fi" : "adverb", "sv" : "adverb", },
        "PUNCT": { "en" : "punctuation", "fi" : "punctuation", "sv" : "punctuation", },
        "CC": { "en" : "coordinating conjunction", "fi" : "coordinating conjunction", "sv" : "coordinating conjunction", },
        "A": { "en" : "adjective", "fi" : "adjective", "sv" : "adjective", },
        "Adp": { "en" : "adposition", "fi" : "adposition", "sv" : "adposition", },
        "Pcle": { "en" : "particle", "fi" : "particle", "sv" : "particle", },
        "Po": { "en" : "adposition (Po)", "fi" : "adposition (Po)", "sv" : "adposition (Po)", },
        "Num": { "en" : "numeral", "fi" : "numeral", "sv" : "numeral", },
        "CS": { "en" : "subordinationg conjunction", "fi" : "subordinationg conjunction", "sv" : "subordinationg conjunction", },
        "Det": { "en" : "determiner", "fi" : "determiner", "sv" : "determiner", },
        "Interj": { "en" : "interjection", "fi" : "interjection", "sv" : "interjection", },
        "Ad": { "en" : "adverb (Ad)", "fi" : "adverb (Ad)", "sv" : "adverb (Ad)", },
        "Hom": { "en" : "homonyme (Hom)", "fi" : "homonyme (Hom)", "sv" : "homonyme (Hom)", },
        "C": { "en" : "conjunction", "fi" : "conjunction", "sv" : "conjunction", },
        "Hom1": { "en" : "homonyme (Hom1)", "fi" : "homonyme (Hom1)", "sv" : "homonyme (Hom1)", },
        "Card": { "en" : "cardinal number", "fi" : "cardinal number", "sv" : "cardinal number", },
        "Pl": { "en" : "plural", "fi" : "plural", "sv" : "plural", },
        "Adn": { "en" : "adjective (Adn)", "fi" : "adjective (Adn)", "sv" : "adjective (Adn)", },
        "Hom2": { "en" : "homonyme (Hom2)", "fi" : "homonyme (Hom2)", "sv" : "homonyme (Hom2)", },
        "Sg": { "en" : "singular", "fi" : "singular", "sv" : "singular", },
        "Temp": { "en" : "adverb (Temp)", "fi" : "adverb (Temp)", "sv" : "adverb (Temp)", },
        "Qnt": { "en" : "adverb (Qnt)", "fi" : "adverb (Qnt)", "sv" : "adverb (Qnt)", },
        "Coll": { "en" : "collective nominal", "fi" : "collective nominal", "sv" : "collective nominal", },
        "Ord": { "en" : "ordinal adjective", "fi" : "ordinal adjective", "sv" : "ordinal adjective", },
        "SP": { "en" : "singular/plural", "fi" : "singular/plural", "sv" : "singular/plural", },
        "Descr": { "en" : "Descr", "fi" : "Descr", "sv" : "Descr", },
        "Prc": { "en" : "participe", "fi" : "participe", "sv" : "participe", },
        "IV": { "en" : "intransitive verb", "fi" : "intransitive verb", "sv" : "intransitive verb", },
        "Der": { "en" : "", "fi" : "", "sv" : "", },
        "Err_Dial": { "en" : "Err/Dial", "fi" : "Err/Dial", "sv" : "Err/Dial", },
    },
};

attrlist.pabivus = {
    ref: attrs.ref,
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_pabivus,
    msd: attrs.msd
};

sattrlist.pabivus = {
    //text_lang : { label: "" },
    text_id : { label: "text_id" },
    text_iso_lang : { label: "iso_639_code" },
    chapter_id : { label: "pabivus_chapter" },
    sentence_id : { label: "pabivus_verse" }
    //sentence_text : { label: "text" }
};

var pabivus_corpora =
    ["pabivus_fin_1938",
     "pabivus_kca_2013",
     "pabivus_kca_2017",
     "pabivus_kca_2018",
     "pabivus_koi_1996",
     "pabivus_koi_2019",
     "pabivus_kpv_1995",
     "pabivus_kpv_1997",
     "pabivus_kpv_2008",
     "pabivus_krl_2011",
     "pabivus_mdf_1995",
     "pabivus_mdf_2016",
     "pabivus_mns_2000",
     "pabivus_myv_1821",
     "pabivus_myv_1910",
     "pabivus_myv_1995",
     "pabivus_myv_1996",
     "pabivus_myv_1998",
     "pabivus_myv_2006",
     "pabivus_myv_2011",
     "pabivus_myv_2020",
     "pabivus_olo_2003",
     "pabivus_rus_1876",
     "pabivus_udm_1997",
     "pabivus_vep_2013"];

// return all corpora except the one defined as argument
function pabivus_linked_corpora(corpus) {
    var retval = [];
    for (var i = 0; i < pabivus_corpora.length; i++) {
	if (corpus.localeCompare(pabivus_corpora[i]) != 0) {
	    retval.push(pabivus_corpora[i]); } }
    return retval; }

var pabivus_common_corpus_info = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.pabivus,
    structAttributes: sattrlist.pabivus,
    hide: true
};

function pabivus_add_common_info(corpus, attrs = "") {
    for (var key in pabivus_common_corpus_info) {
	corpus[key] = pabivus_common_corpus_info[key];
    }
    if (attrs == "UD") {
	corpus["attributes"] = attrlist.ud2_fi;
    }
    corpus.licence = settings.licenceinfo.CC_BY_NC;
    corpus.metadata_urn = "urn:nbn:fi:lb-2020021121";
};

settings.corpora.pabivus_udm_1997 = {
    id: "pabivus_udm_1997",
    title: "Pabivus: Udmurt (1997)",
    description: "Parallel Bible verses for Uralic languages: Udmurt",
    lang: "udm-1997", // year 1997 translation
    linkedTo: pabivus_linked_corpora("pabivus_udm_1997"),
};
pabivus_add_common_info(settings.corpora.pabivus_udm_1997);

settings.corpora.pabivus_olo_2003 = {
    id: "pabivus_olo_2003",
    title: "Pabivus: Livvi-Karelian (2003)",
    description: "Parallel Bible verses for Uralic languages: Livvi-Karelian",
    lang: "olo-2003", // year 2003 translation
    linkedTo: pabivus_linked_corpora("pabivus_olo_2003"),
};
pabivus_add_common_info(settings.corpora.pabivus_olo_2003);

settings.corpora.pabivus_myv_2006 = {
    id: "pabivus_myv_2006",
    title: "Pabivus: Erzya (2006)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-2006", // year 2006 translation (some books available from 1996, 1998, 1995, 1910 and 1821)
    linkedTo: pabivus_linked_corpora("pabivus_myv_2006"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_2006, "UD");

settings.corpora.pabivus_myv_1995 = {
    id: "pabivus_myv_1995",
    title: "Pabivus: Erzya (1995)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-1995", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_1995"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_1995, "UD");

settings.corpora.pabivus_myv_1996 = {
    id: "pabivus_myv_1996",
    title: "Pabivus: Erzya (1996)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-1996", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_1996"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_1996, "UD");

settings.corpora.pabivus_myv_1998 = {
    id: "pabivus_myv_1998",
    title: "Pabivus: Erzya (1998)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-1998", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_1998"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_1998, "UD");

settings.corpora.pabivus_myv_2011 = {
    id: "pabivus_myv_2011",
    title: "Pabivus: Erzya (2011)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-2011", // year 2011 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_2011"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_2011, "UD");

settings.corpora.pabivus_myv_2020 = {
    id: "pabivus_myv_2020",
    title: "Pabivus: Erzya (2020)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-2020", // year 2020 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_2020"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_2020, "UD");

settings.corpora.pabivus_myv_1910 = {
    id: "pabivus_myv_1910",
    title: "Pabivus: Erzya (1910)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-1910", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_1910"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_1910, "UD");

settings.corpora.pabivus_myv_1821 = {
    id: "pabivus_myv_1821",
    title: "Pabivus: Erzya (1821)",
    description: "Parallel Bible verses for Uralic languages: Erzya",
    lang: "myv-1821", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_myv_1821"),
};
pabivus_add_common_info(settings.corpora.pabivus_myv_1821, "UD");

settings.corpora.pabivus_mdf_2016 = {
    id: "pabivus_mdf_2016",
    title: "Pabivus: Moksha (2016)",
    description: "Parallel Bible verses for Uralic languages: Moksha",
    lang: "mdf-2016", // year 2016 translation (some books available from 1995)
    linkedTo: pabivus_linked_corpora("pabivus_mdf_2016"),
};
pabivus_add_common_info(settings.corpora.pabivus_mdf_2016, "UD");

settings.corpora.pabivus_mdf_1995 = {
    id: "pabivus_mdf_1995",
    title: "Pabivus: Moksha (1995)",
    description: "Parallel Bible verses for Uralic languages: Moksha",
    lang: "mdf-1995", // year 1995 translation
    linkedTo: pabivus_linked_corpora("pabivus_mdf_1995"),
};
pabivus_add_common_info(settings.corpora.pabivus_mdf_1995, "UD");

settings.corpora.pabivus_krl_2011 = {
    id: "pabivus_krl_2011",
    title: "Pabivus: North Karelian (2011)",
    description: "Parallel Bible verses for Uralic languages: North Karelian",
    lang: "krl-2011", // year 2011 translation
    linkedTo: pabivus_linked_corpora("pabivus_krl_2011"),
};
pabivus_add_common_info(settings.corpora.pabivus_krl_2011);

settings.corpora.pabivus_kpv_2008 = {
    id: "pabivus_kpv_2008",
    title: "Pabivus: Komi-Zyrian (2008)",
    description: "Parallel Bible verses for Uralic languages: Komi-Zyrian",
    lang: "kpv-2008", // year 2008 translation (some books avaiable from 1995 and 1997)
    linkedTo: pabivus_linked_corpora("pabivus_kpv_2008"),
};
pabivus_add_common_info(settings.corpora.pabivus_kpv_2008);

settings.corpora.pabivus_kpv_1995 = {
    id: "pabivus_kpv_1995",
    title: "Pabivus: Komi-Zyrian (1995)",
    description: "Parallel Bible verses for Uralic languages: Komi-Zyrian",
    lang: "kpv-1995", // year 1995 translation
    linkedTo: pabivus_linked_corpora("pabivus_kpv_1995"),
};
pabivus_add_common_info(settings.corpora.pabivus_kpv_1995);

settings.corpora.pabivus_kpv_1997 = {
    id: "pabivus_kpv_1997",
    title: "Pabivus: Komi-Zyrian (1997)",
    description: "Parallel Bible verses for Uralic languages: Komi-Zyrian",
    lang: "kpv-1997", // year 1997 translation
    linkedTo: pabivus_linked_corpora("pabivus_kpv_1997"),
};
pabivus_add_common_info(settings.corpora.pabivus_kpv_1997);

settings.corpora.pabivus_koi_2019 = {
    id: "pabivus_koi_2019",
    title: "Pabivus: Komi-Permyak (2019)",
    description: "Parallel Bible verses for Uralic languages: Komi-Permyak",
    lang: "koi-2019", // year 2019 translation (some books available from 1996)
    linkedTo: pabivus_linked_corpora("pabivus_koi_2019"),
};
pabivus_add_common_info(settings.corpora.pabivus_koi_2019);

settings.corpora.pabivus_koi_1996 = {
    id: "pabivus_koi_1996",
    title: "Pabivus: Komi-Permyak (1996)",
    description: "Parallel Bible verses for Uralic languages: Komi-Permyak",
    lang: "koi-1996", // year 1996 translation
    linkedTo: pabivus_linked_corpora("pabivus_koi_1996"),
};
pabivus_add_common_info(settings.corpora.pabivus_koi_1996);

settings.corpora.pabivus_rus_1876 = {
    id: "pabivus_rus_1876",
    title: "Pabivus: Russian (1876)",
    description: "Parallel Bible verses for Uralic languages: Russian",
    lang: "rus-1876", // year 1876 translation
    linkedTo: pabivus_linked_corpora("pabivus_rus_1876"),
};
pabivus_add_common_info(settings.corpora.pabivus_rus_1876);

settings.corpora.pabivus_vep_2013 = {
    id: "pabivus_vep_2013",
    title: "Pabivus: Veps (2013)",
    description: "Parallel Bible verses for Uralic languages: Veps",
    lang: "vep-2013", // year 2013 translation
    linkedTo: pabivus_linked_corpora("pabivus_vep_2013"),
};
pabivus_add_common_info(settings.corpora.pabivus_vep_2013);

settings.corpora.pabivus_kca_2013 = {
    id: "pabivus_kca_2013",
    title: "Pabivus: Khanty (2013)",
    description: "Parallel Bible verses for Uralic languages: Khanty",
    lang: "kca-2013", // year 2013 translation
    linkedTo: pabivus_linked_corpora("pabivus_kca_2013"),
};
pabivus_add_common_info(settings.corpora.pabivus_kca_2013);

settings.corpora.pabivus_kca_2017 = {
    id: "pabivus_kca_2017",
    title: "Pabivus: Khanty (2017)",
    description: "Parallel Bible verses for Uralic languages: Khanty",
    lang: "kca-2017", // year 2017 translation
    linkedTo: pabivus_linked_corpora("pabivus_kca_2017"),
};
pabivus_add_common_info(settings.corpora.pabivus_kca_2017);

settings.corpora.pabivus_kca_2018 = {
    id: "pabivus_kca_2018",
    title: "Pabivus: Khanty (2018)",
    description: "Parallel Bible verses for Uralic languages: Khanty",
    lang: "kca-2018", // year 2018 translation
    linkedTo: pabivus_linked_corpora("pabivus_kca_2018"),
};
pabivus_add_common_info(settings.corpora.pabivus_kca_2018);

settings.corpora.pabivus_mns_2000 = {
    id: "pabivus_mns_2000",
    title: "Pabivus: Mansi (2000)",
    description: "Parallel Bible verses for Uralic languages: Mansi",
    lang: "mns-2000", // year 2000 translation
    linkedTo: pabivus_linked_corpora("pabivus_mns_2000"),
};
pabivus_add_common_info(settings.corpora.pabivus_mns_2000);

settings.corpora.pabivus_fin_1938 = {
    id: "pabivus_fin_1938",
    title: "Pabivus (fin–kca-koi–kpv–krl–mdf–mns-myv–olo–udm–vep-rus)",
    description: "Parallel Bible verses for Uralic languages<br/>The corpus contains the 27 books of the New Testament in ten languages: Finnish (fin), Komi-Permyak (koi), Komi-Zyrian (kpv), North Karelian (krl), Moksha (mdf), Erzya (myv), Livvi-Karelian (olo), Udmurt (udm) and Veps (vep) as well as Russian (rus). It also contains some books of the Bible in Mansi (mns) and Khanty (kca).<br/>Some books have more than one translation available in the same language. The translation year is shown for each subcorpus. The Finnish translation is from 1938.",
    lang: "fin",
    linkedTo: pabivus_linked_corpora("pabivus_fin_1938"),
};

pabivus_add_common_info(settings.corpora.pabivus_fin_1938, "UD");
settings.corpora.pabivus_fin_1938.hide = false;

funcs.extendCorpusSettings(settings.corpusinfo.pabivus_fin_1938,
                           pabivus_corpora);

funcs.addCorporaToFolder("other", "pabivus_fin_1938");


 // Christmas Gospel text-to-speech in four Uralic languages

sattrlist.xmas_gospel = {
    //text_lang : { label: "" },
    //text_id : { label: "text_id" },
    text_iso_lang : {
	label: "iso_639_code" ,
	extendedComponent: "datasetSelect",
        localize: false,
        opts: options.lite,
        dataset: [ "kpv", "krl", "myv", "olo" ],
    },
    //chapter_id : { label: "pabivus_chapter" },
    sentence_id : {
	label: "pabivus_verse",
	extendedComponent: "datasetSelect",
        localize: false,
        opts: options.lite,
        dataset: [ ":LUK.2.1:", ":LUK.2.2:", ":LUK.2.3:", ":LUK.2.4:", ":LUK.2.5:", ":LUK.2.4–5:",
		   ":LUK.2.6:", ":LUK.2.7:", ":LUK.2.8:", ":LUK.2.9:", ":LUK.2.10:",
		   ":LUK.2.11:", ":LUK.2.12:", ":LUK.2.13:", ":LUK.2.14:", ":LUK.2.15:",
		   ":LUK.2.16:", ":LUK.2.17:",  ":LUK.2.18:", ":LUK.2.19:", ":LUK.2.20:" ],
    },
    sentence_kpv_audio: { label: "sentence_kpv_audio", displayType: "hidden" },
    sentence_krl_audio: { label: "sentence_krl_audio", displayType: "hidden" },
    sentence_myv_audio: { label: "sentence_myv_audio", displayType: "hidden" },
    sentence_olo_audio: { label: "sentence_olo_audio", displayType: "hidden" },
    sentence_text_kpv: { label: "sentence_text_kpv", displayType: "hidden" },
    sentence_text_krl: { label: "sentence_text_krl", displayType: "hidden" },
    sentence_text_myv: { label: "sentence_text_myv", displayType: "hidden" },
    sentence_text_olo: { label: "sentence_text_olo", displayType: "hidden" },
    //sentence_text : { label: "text" }
};

var xmas_gospel_common_corpus_info = {
    within: within.sp,
    context: context.sp,
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.xmas_gospel,
};

function xmas_gospel_add_common_info(corpus) {
    for (var key in xmas_gospel_common_corpus_info) {
	corpus[key] = xmas_gospel_common_corpus_info[key];
    }
    corpus.licence = {
        name: "CC-BY-NC",
        urn: "urn:nbn:fi:lb-2023110603",
    },
    corpus.metadata_urn = "urn:nbn:fi:lb-2023111601";
};

settings.corpora.xmas_gospel_kpv = {
    id: "xmas_gospel_kpv",
    title: "Christmas Gospel text-to-speech (Komi-Zyrian, Erzya, Karelian, Olonets-Karelian)",
    description: "Christmas Gospel text-to-speech in four Uralic languages<br/>This resource contains text and text-to-speech in four languages pertaining to the Finnish Christmas Gospel verses Luke 2. 1–20. The four languages include Komi-Zyrian (kpv), Erzya (myv), Karelian (krl) and Olonets-Karelian (olo, aka Livvi), whose texts are all included in the Parallel Biblical Verses for Uralic Studies (PaBiVUS) corpus (LUK.2.1–20).",
    lang: "kpv",
    linkedTo: ["xmas_gospel_krl", "xmas_gospel_myv", "xmas_gospel_olo"],
    customAttributes: {
	audio_kpv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_kpv_audio",
	    sentence: "@sentence_text_kpv",
	    label: "listen_audio_kpv_first"
        }),
	audio_krl: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_krl_audio",
	    sentence: "@sentence_text_krl",
	    label: "listen_audio_krl"
        }),
	audio_myv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_myv_audio",
	    sentence: "@sentence_text_myv",
	    label: "listen_audio_myv"
	}),
	audio_olo: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_olo_audio",
	    sentence: "@sentence_text_olo",
	    label: "listen_audio_olo"
        }),
    },
};
xmas_gospel_add_common_info(settings.corpora.xmas_gospel_kpv);

settings.corpora.xmas_gospel_krl = {
    id: "xmas_gospel_krl",
    title: "Christmas Gospel text-to-speech (Karelian)",
    description: "Christmas Gospel text-to-speech in four Uralic languages: Karelian",
    lang: "krl",
    linkedTo: ["xmas_gospel_kpv", "xmas_gospel_myv", "xmas_gospel_olo"],
    customAttributes: {
	audio_krl: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_krl_audio",
	    sentence: "@sentence_text_krl",
	    label: "listen_audio_krl_first"
        }),
	audio_kpv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_kpv_audio",
	    sentence: "@sentence_text_kpv",
	    label: "listen_audio_kpv"
        }),
	audio_myv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_myv_audio",
	    sentence: "@sentence_text_myv",
	    label: "listen_audio_myv"
	}),
	audio_olo: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_olo_audio",
	    sentence: "@sentence_text_olo",
	    label: "listen_audio_olo"
        }),
    },
    hide: true,
};
xmas_gospel_add_common_info(settings.corpora.xmas_gospel_krl);

settings.corpora.xmas_gospel_myv = {
    id: "xmas_gospel_myv",
    title: "Christmas Gospel text-to-speech (Erzya)",
    description: "Christmas Gospel text-to-speech in four Uralic languages: Erzya",
    lang: "myv",
    linkedTo: ["xmas_gospel_kpv", "xmas_gospel_krl", "xmas_gospel_olo"],
    customAttributes: {
	audio_myv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_myv_audio",
	    sentence: "@sentence_text_myv",
	    label: "listen_audio_myv_first"
	}),
	audio_kpv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_kpv_audio",
	    sentence: "@sentence_text_kpv",
	    label: "listen_audio_kpv"
        }),
	audio_krl: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_krl_audio",
	    sentence: "@sentence_text_krl",
	    label: "listen_audio_krl"
        }),
	audio_olo: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_olo_audio",
	    sentence: "@sentence_text_olo",
	    label: "listen_audio_olo"
        }),
    },
    hide: true,
};
xmas_gospel_add_common_info(settings.corpora.xmas_gospel_myv);

settings.corpora.xmas_gospel_olo = {
    id: "xmas_gospel_olo",
    title: "Christmas Gospel text-to-speech (Olonets-Karelian)",
    description: "Christmas Gospel text-to-speech in four Uralic languages: Olonets-Karelian (aka Livvi)",
    lang: "olo",
    linkedTo: ["xmas_gospel_kpv", "xmas_gospel_krl", "xmas_gospel_myv"],
    customAttributes: {
	audio_olo: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_olo_audio",
	    sentence: "@sentence_text_olo",
	    label: "listen_audio_olo_first"
        }),
	audio_kpv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_kpv_audio",
	    sentence: "@sentence_text_kpv",
	    label: "listen_audio_kpv"
        }),
	audio_krl: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_krl_audio",
	    sentence: "@sentence_text_krl",
	    label: "listen_audio_krl"
        }),
	audio_myv: funcs.makeVideoAttr({
            baseURL: "/media/",
            path: "xmas-gospel-tts/",
            file: "@sentence_myv_audio",
	    sentence: "@sentence_text_myv",
	    label: "listen_audio_myv"
	}),
    },
    hide: true,
};
xmas_gospel_add_common_info(settings.corpora.xmas_gospel_olo);


//funcs.extendCorpusSettings(settings.corpusinfo.xmas_gospel_kpv,
//                           ["xmas_gospel_krl", "xmas_gospel_myv", "xmas_gospel_olo"]);

funcs.addCorporaToFolder("other", "xmas_gospel_kpv");


funcs.addAttrExtraProperties(settings.corpora);


console.log("parallelcorpuslisting")
window.cl = settings.corpusListing = new ParallelCorpusListing(settings.corpora);
delete ParallelCorpusListing;
delete context;
