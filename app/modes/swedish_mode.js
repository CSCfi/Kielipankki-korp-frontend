// -*- coding: utf-8 -*-

settings.primaryColor = "#EEBA94";
settings.primaryLight = "#F5D4BB";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = true;
settings.show_related_words = true;


// TODO: Modify the commented-out code below appropriately when
// porting the modifications in statistics_config.js to Korp 9.

// // Override the default statisticsFormatting.makeGroupingValue (in
// // statistics_config.js) to group lemmas, saldo values and lemgrams in
// // the same way as Språkbanken's Korp (ignoring the possible trailing
// // digits preceded by a colon). (Jyrki Niemi 2018-10-04)
// statisticsFormatting.makeGroupingValue = function (value) {
//     // This is slightly more precise than the original, as this
//     // requires that the colon is followed by digits.
//     return value.replace(/(:[0-9]+?)(\/|$| )/g, "$2");
// }


settings.preselectedCorpora = [
    // "mulcold_sv",
    // "kfspc_sv",
];


$("#lemgram_list_item").remove();
$("#results-lemgram").remove();

sattrlist.klk_sv = $.extend({}, sattrlist.klk);
sattrlist.klk_sv_parsed = $.extend(
    {}, sattrlist.klk_sv,
    {
        paragraph_n: {
            label: "sentence_n",
            displayType: "hidden"
        },
        sentence_n: {
            label: "sentence_n",
            displayType: "hidden"
        }
    });

sattrlist.klk_sv_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_sv_parsed, sattrlist.klk_pagelinks);

sattrlist.klk_sv_parsed_pagelinks_custom = sattrlist.klk_pagelinks_custom;

attrlist.klk_sv = {
    ocr: {
        label: "OCR",
        opts: options.default,
    }
};

attrlist.klk_sv_parsed =
    $.extend(
        {
            pos: attrs.pos,
            msd: attrs.msd,
            lemma: attrs.baseform_sv,
            lex: attrs.lemgram,
            saldo: attrs.saldo,
            dephead: attrs.dephead,
            deprel: attrs.deprel,
            ref: attrs.ref,
            prefix: attrs.prefix,
            suffix: attrs.suffix
        },
        attrlist.klk_sv);

attrlist.klk_sv_parsed_pagelinks = attrlist.klk_sv_parsed;


settings.corpora = {};
settings.corporafolders = {};


// Top-level folders according to CLARIN resource families
settings.corporafolders = {
    academic: {
        title: "Akademiska texter",
        description: "Korpusar av akademiska texter",
    },
    historical: {
        title: "Historiska korpusar",
        description: "Historiska korpusar",
    },
    learner: {
        title: "Svenskstuderandes språk",
        description: "Korpusar av svenskstuderandes språk (svenska som andra eller främmande språk)",
    },
    literary: {
        title: "Litteraturkorpusar",
        description: "Litteraturkorpusar",
    },
    news: {
        title: "Tidnings-, tidskrifts- och nyhetskorpusar",
        description: "Tidnings-, tidskrifts- och nyhetskorpusar",
    },
    reference: {
        title: "Referenskorpusar",
        description: "Referenskorpusar",
    },
    legal: {
        title: "Juridiska korpusar",
        description: "Juridiska korpusar",
    },
    other: {
        title: "Andra korpusar",
        description: "Andra korpusar",
    },
};


settings.corporafolders.academic.ethesis = {
    title: "E-thesis",
    contents: [
        "ethesis_sv_dissabs",
        "ethesis_sv_maabs",
        "ethesis_sv_phd",
        "ethesis_sv_ma",
    ],
    info: {
        cite_id: "e-thesis-sv",
    }
};

var fstc_info = {
    urn: "urn:nbn:fi:lb-2016112318",
    metadata_urn: "urn:nbn:fi:lb-2016050213",
    lbr_id: "urn:nbn:fi:lb-2016050212",
    licence: {
        name: "CLARIN RES +PLAN +NC +LOC +ND",
        urn: "urn:nbn:fi:lb-20150304123",
    },
    // KitWiki is no longer available and there is no replacement page yet
    // homepage: {
    //     name: "Beskrivning",
    //     url: "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotFstc",
    //     no_label: true,
    // },
    cite_id: "fstc-korp",
};

settings.corporafolders.literary.fstc_literary = {
    title: "Finlandssvensk textkorpus (UHLCS) (FISC/FSTC): litteratur",
    description: "Finlandssvensk textcorpus (UHLCS): litteratur: delkorpusar som var i Lemmie-servicen, morfosyntaktiskt analyserade med SWECG<br/><br/><strong>Observera</strong> att delkorpusar av FSTC finns också under <i>Tidnings-, tidskrifts- och nyhetskorpusar</i> och <i>Andra korpusar</i>.",
    info: fstc_info,
};

settings.corporafolders.news.klk_sv = {
    title: "Nationalbibliotekets svenskspråkiga tidningar och tidskrifter",
    description: "Svenskspråkiga tidningar och tidskrifter i Nationalbibliotekets digitala samlingar, Kielipankki-version",
    info: {
        urn: "urn:nbn:fi:lb-2014091901",
        metadata_urn: "urn:nbn:fi:lb-2016050301",
        licence: settings.licenceinfo.CC_BY,
        cite_id: "KLK-sv",
    }
};

settings.corporafolders.news.ylenews_sv = {
    title: "Yle svenska webbartiklar",
    description: "Yle svenska webbartiklar<br/><br/>Mappen innehåller två korpusar med samma meningar men med olika tillgänglighet och egenskaper: den ena korpusen är öppen för alla och har meningarna i en blandad ordning inom varje text och utan utökad kontextvisning, medan den andra korpusen är tillgänglig för forskare och har meningarna i den ursprungliga ordningen och stöd för utökad kontextvisning.",
    info: {
        homepage: {
            name: "Svenska Yle",
            url: "https://svenska.yle.fi",
            no_label: true,
        },
    },
};

settings.corporafolders.news.ylenews_sv.a = {
    title: "Yle svenska webbartiklar 2012–2018 (för forskare)",
    description: "Yle svenska webbartiklar 2012–2018, Korp<br/>Variant tillgänglig för forskare: meningarna i den ursprungliga ordningen och stöd för utökad kontextvisning<br/><br/>Korpusen är indelad i delkorpusar enligt år, och artiklarna är ordnade enligt redigeringsdatumet.",
    // Contents are added later with funcs.addCorpusSettings
    contents: [],
    info: {
        urn: "urn:nbn:fi:lb-2019120405",
        metadata_urn: "urn:nbn:fi:lb-2019120403",
        licence: settings.licenceinfo.Ylenews_sv_en,
        cite_id: "ylenews-sv-2012-2018-korp",
    },
};

settings.corporafolders.news.ylenews_sv.s = {
    title: "Yle svenska webbartiklar 2012–2018 (för alla)",
    description: "Yle svenska webbartiklar 2012–2018, blandad, Korp<br/>Variant öppen för alla: meningarna i en blandad ordning inom varje text och ingen utökad kontextvisning<br/><br/>Korpusen är indelad i delkorpusar enligt år, och artiklarna är ordnade enligt redigeringsdatumet.",
    // Contents are added later with funcs.addCorpusSettings
    contents: [],
    info: {
        urn: "urn:nbn:fi:lb-2019120406",
        metadata_urn: "urn:nbn:fi:lb-2019120404",
        licence: settings.licenceinfo.CC_BY,
        cite_id: "ylenews-sv-2012-2018-s-korp",
    },
};

settings.corporafolders.news.fstc_news = {
    title: "Finlandssvensk textkorpus (UHLCS) (FISC/FSTC): tidningar och nyheter",
    description: "Finlandssvensk textcorpus (UHLCS): tidningar och nyheter: delkorpusar som var i Lemmie-servicen, morfosyntaktiskt analyserade med SWECG<br/><br/><strong>Observera</strong> att delkorpusar av FSTC finns också under <i>Litteraturkorpusar</i> och <i>Andra korpusar</i>.",
    info: fstc_info,
};

settings.corporafolders.legal.semfinlex = {
    title: "Semfinlex",
    description: "Innehåller ett urval av ursprungliga författningar av Riksdagen (1920–2018), avgöranden av Högsta domstolen (1980–) och avgöranden av Högsta förvaltningsdomstolen (2001–).",
    contents: [
        "semfinlex_asd_sv_2018",
        "semfinlex_kko_sv_2018",
        "semfinlex_kho_sv_2018",
    ],
    info: {
        licence: settings.licenceinfo.CC_BY,
        cite_id: "semfinlex",
    }
}

settings.corporafolders.other.fstc_other = {
    title: "Finlandssvensk textkorpus (UHLCS) (FISC/FSTC): myndighetstexter",
    description: "Finlandssvensk textcorpus (UHLCS): myndighetstexter: delkorpus som var i Lemmie-servicen, morfosyntaktiskt analyserad med SWECG<br/><br/><strong>Observera</strong> att delkorpusar av FSTC finns också under <i>Litteraturkorpusar</i> och <i>Tidnings-, tidskrifts- och nyhetskorpusar</i>.",
    info: fstc_info,
};


var klk_sv_parsed_years = funcs.makeYearlist(1771, 1948);


// Generate settings.corpora and settings.corporafolders for the
// Swedish KLK corpora by using functions defined in config.js

funcs.makeCorpusSettingsByYearDecade(
    settings.corporafolders.news.klk_sv, "sv_{decade}", "klk_sv_{year}",
    function(decade) {
        return { title: decade.toString() + "-talet" };
    },
    function(year) {
        return funcs.makeKlkCorpusSettings(
            "Nationalbiblioteket svenska {year}",
            "Nationalbibliotekets svenskspråkiga tidningar och tidskrifter från {year}",
            "klk",
            "sv",
            year,
            klk_sv_parsed_years.indexOf(year) != -1);
    },
    funcs.makeYearlist(
        1771, 1948,
        {descending: true,
         omit: [1779, 1780, 1781, 1786, 1787, 1788, 1790]}
    )
);


delete klk_sv_parsed_years;

settings.corpora.semfinlex_asd_sv_2018 = {
    id: "semfinlex_asd_sv_2018",
    lang: "swe",
    title: "Ursprungliga författningar",
    description: "Ett urval av ursprungliga författningar av Riksdagen från 1920̣–2018.",
    urn: "urn:nbn:fi:lb-2019042604",
    metadata_urn: "urn:nbn:fi:lb-2019042603",
    context: context.default,
    within: within.default,
    licence: settings.licenceinfo.CC_BY,
    attributes: attrlist.parsed_sv,
    structAttributes: {
        text_url: {
            label: "URL",
            type: "url",
            urlOpts: sattrs.link_url_opts
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
    }
}

settings.corpora.semfinlex_kko_sv_2018 = {
    id: "semfinlex_kko_sv_2018",
    lang: "swe",
    title: "Avgöranden av KKO",
    description: "Ett urval av avgöranden av Högsta domstolen (KKO) från 1980̣–2018.",
    urn: "urn:nbn:fi:lb-2019042610",
    metadata_urn: "urn:nbn:fi:lb-2019042609",
    context: context.default,
    within: within.default,
    licence: settings.licenceinfo.CC_BY,
    attributes: attrlist.parsed_sv,
    structAttributes: {
        text_url: {
            label: "URL",
            type: "url",
            urlOpts: sattrs.link_url_opts
        },
        text_keywords: {label: "keywords"}
    }
}

settings.corpora.semfinlex_kho_sv_2018 = {
    id: "semfinlex_kho_sv_2018",
    lang: "swe",
    title: "Avgöranden av KHO",
    description: "Ett urval av avgöranden av Högsta förvaltningsdomstolen (KHO) från 2001–2018.",
    urn: "urn:nbn:fi:lb-2019042610",
    metadata_urn: "urn:nbn:fi:lb-2019042609",
    context: context.default,
    within: within.default,
    licence: settings.licenceinfo.CC_BY,
    attributes: attrlist.parsed_sv,
    structAttributes: {
        text_url: {
            label: "URL",
            type: "url",
            urlOpts: sattrs.link_url_opts
        },
        text_keywords: {label: "keywords"}
    }
}


/*ETHESIS*/
settings.corpora.ethesis_sv_ma = {
    title: "Masteruppsatser",
    description: "Masteruppsatser (1997–2016)",
    id: "ethesis_sv_ma",
    within: within.default,
    context: context.default,
    attributes: {
    },
    structAttributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_maabs = {
    title: "Masteruppsatser (abstrakt)",
    description: "Masteruppsatser (abstrakt) (1999–2016)",
    id: "ethesis_sv_maabs",
    within: within.default,
    context: context.default,
    attributes: {
    },
    structAttributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_dissabs = {
    title: "Doktorsavhandlingar (abstrakt)",
    description: "Doktorsavhandlingar (abstrakt) (2006–2016)",
    id: "ethesis_sv_dissabs",
    within: within.default,
    context: context.default,
    attributes: {
    },
    structAttributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_phd = {
    title: "Doktorsavhandlingar",
    description: "Doktorsavhandlingar (2000–2016)",
    id: "ethesis_sv_phd",
    within: within.default,
    context: context.default,
    attributes: {
    },
    structAttributes: sattrlist.ethesis
};


/* STUDENTSVENSKA */

attrlist.studentsvenska = {
    lemma: attrs.baseform,
    code: {
        label: "studentsvenska_code",
        opts: options.default
    },
    properties: {
        label: "studentsvenska_properties",
        opts: options.default
    }
};

sattrlist.studentsvenska = {
    sentence_id: sattrs.sentence_id_hidden,
    text_textnumber: {
        label: "studentsvenska_textnumber"
    },
    text_gradeteacher: {
        label: "studentsvenska_gradeteacher"
    },
    text_gradeexam: {
        label: "studentsvenska_gradeexam"
    },
    text_gradeword: {
        label: "studentsvenska_gradeword"
    },
    text_schoolnumber: {
        label: "studentsvenska_schoolnumber"
    },
    text_errorother: {
        label: "studentsvenska_errorother"
    },
    text_gender: {
        label: "studentsvenska_gender"
    },
    text_gradegrammar: {
        label: "studentsvenska_gradegrammar"
    },
    text_errorwordorder: {
        label: "studentsvenska_errorwordorder"
    },
    text_subject: {
        label: "studentsvenska_subject"
    }
};

settings.corpora.studentsvenska = {
    id: "studentsvenska",
    title: "Studentsvenska 79/80",
    description: "Studentsvenska 79/80",
    urn: "urn:nbn:fi:lb-2016081701",
    metadata_urn: "urn:nbn:fi:lb-20140730119",
    licence: {
        name: "CLARIN RES +PLAN +NC +PRIV 1.0",
        description: "CLARIN RES end-user licence +PLAN +NC +PRIV 1.0",
        urn: "urn:nbn:fi:lb-2016040410",
    },
    cite_id: "Studentsvenska",
    context: context.default,
    within: within.default,
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.studentsvenska,
    structAttributes: sattrlist.studentsvenska
};

funcs.addCorporaToFolder("learner", "studentsvenska");


settings.corpora.mulcold_sv = {
    id: "mulcold_sv",
    title: "MULCOLD svenska",
    description: "Multilingual Corpus of Legal Documents, svenskspråkiga delen",
    cite_id: "MULCOLD",
    context: context.default,
    within: within.default,
    attributes: attrlist.mulcold_sv,
    structAttributes: sattrlist.mulcold,
};

funcs.extendCorpusSettings(settings.corpusinfo.mulcold,
                           ["mulcold_sv"]);

funcs.addCorporaToFolder("legal", "mulcold_sv");


settings.corpora.topling_sv = {
    id: "topling_sv",
    title: "Topling (svenska)",
    description: "Topling – Inlärningsgångar i andraspråket, svensk delkorpus",
    urn: "urn:nbn:fi:lb-2016112903",
    metadata_urn: "urn:nbn:fi:lb-2016111801",
    lbr_id: "urn:nbn:fi:lb-20140730168",
    licence: {
        name: "CLARIN RES +NC +DEP 1.0",
        urn: "urn:nbn:fi:lb-2016112304",
    },
    homepage_url: "https://www.jyu.fi/topling",
    cite_id: "topling-sv",
    context: context.sp,
    within: within.sp,
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.topling,
    structAttributes: sattrlist.topling
};

funcs.addCorporaToFolder("learner", "topling_sv");

settings.corpusAliases["topling-sv"] = "topling_sv";


settings.corpora.kfspc_sv = {
    title: "KFSPC svenska",
    description: "Kotus Finnish-Swedish Parallel Corpus, svenskspråkiga delen",
    id: "kfspc_sv",
    cite_id: "kfspc-korp-sv",
    lang: "swe",
    context: context.default,
    within: within.default,
    attributes: {
    },
    structAttributes: sattrlist.kfspc,
};

funcs.addCorporaToFolder("other", "kfspc_sv");


settings.corpora.sinebrychoff_orig = {
    id: "sinebrychoff_orig",
    title: "Paul Sinebrychoffs brevsamling",
    description: "Paul Sinebrychoffs brevsamling",
    metadata_urn: "urn:nbn:fi:lb-201407303",
    licence: settings.licenceinfo.CC_BY_30,
    cite_id: "sinebrychoff-sv",
    context: context.sp,
    within: within.sp,
    attributes: attrlist.sinebrychoff,
    structAttributes: sattrlist.sinebrychoff
};

funcs.addCorporaToFolder("historical", "sinebrychoff_orig");


funcs.extendCorpusSettings(settings.corpusinfo.kfspc, ["kfspc_sv"]);


/* FSTC (Finland-Swedish Text Corpus) aka FISC */

// FSTC (sub)corpus hierarchies
fstc_hierarchy = {
    news: [
        ["fnb", "Finska Notisbyrån 1999–2000", [
            ["fnb1999", "Finska Notisbyrån 1999"],
            ["fnb2000", "Finska Notisbyrån 2000"],
        ] ],
        ["hbl", "Hufvudstadsbladet 1998–1999", [
            ["hbl1998", "Hufvudstadsbladet 1998"],
            ["hbl1999", "Hufvudstadsbladet 1999"],
        ] ],
        ["jt", "Jakobstads Tidning 1999–2000", [
            ["jt1999", "Jakobstads Tidning 1999"],
            ["jt2000", "Jakobstads Tidning 2000"],
        ] ],
        ["fisc_tid", "FISC Tidning",
         "FISC – En finlandssvensk textkorpus: Tidning<br/><br/><strong>Observera</strong> att delkorpusar av FISC finns också under <i>Tidnings-, tidskrifts- och nyhetskorpusar</i> och <i>Andra korpusar</i>."],
    ],
    literary: [
        ["soder", "Söderströms 1997–1999", [
            ["soder_a", "Söderströms 1997–1999 A"],
            ["soder_b", "Söderströms 1997–1999 B"],
        ] ],
        ["fisc", "FISC Litteratur och Sakprosa",
         "FISC – En finlandssvensk textkorpus: Litteratur och Sakprosa<br/><br/><strong>Observera</strong> att delkorpusar av FISC finns också under <i>Litteraturkorpusar</i> och <i>Andra korpusar</i>.", [
            ["fisc_lit", "FISC Litteratur"],
            ["fisc_sak", "FISC Sakprosa"],
        ] ],
    ],
    other: [
        ["fisc_myn", "FISC Myndighet",
         "FISC – En finlandssvensk textkorpus: Myndighet<br/><br/><strong>Observera</strong> att delkorpusar av FISC finns också under <i>Litteraturkorpusar</i> och <i>Tidnings-, tidskrifts- och nyhetskorpusar</i>."],
    ],
};

// Settings template for FSTC subcorpora
settings.templ.fstc = $.extend(true, {}, settings.templ.lemmie_common, {
    attributes: {
        lemma: attrs.baseform,
        lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_swecg,
        msd: attrs.msd,
        id: attrs.id_hidden,
        lex: attrs.lemgram_hidden,
    },
    structAttributes: {
        text_source: {
            dataset: [
                "FISC Litteratur",
                "FISC Myndighet",
                "FISC Sakprosa",
                "FISC Tidning",
                "Finska Notisbyrån",
                "Hufvudstadsbladet",
                "Jakobstads Tidning",
                "Söderströms förlag",
            ],
        },
        paragraph_type: {
            // The values could be localized as in FTC, but we would
            // need to decide the translations
            localize: false,
            dataset: {
                "author": "author",
                "bibl": "bibl",
                "body": "body",
                "byline": "byline",
                "caption": "caption",
                "closer": "closer",
                "date": "date",
                "div|div0|div1|div2|div3": "div",
                "emph": "emph",
                "entry": "entry",
                "footer": "footer",
                "group": "group",
                "head": "head",
                "header": "header",
                "hi": "hi",
                "item": "item",
                "l": "l",
                "list": "list",
                "note": "note",
                "omit": "omit",
                "opener": "opener",
                "p": "p",
                "q": "q",
                "quote": "quote",
                "resp": "resp",
                "rs": "rs",
                "signed": "signed",
                "title": "title",
            },
        },
    }
});

// Create the FSTC corpus folder hierarchies and corpus settings
for (const [key, label] of [
    ["news", "tidningar och nyheter"],
    ["literary", "litteratur"],
    ["other", "andra"],
]) {
    funcs.makeFolderHierarchy(
        settings.corporafolders[key]["fstc_" + key], fstc_hierarchy[key],
        {
            id_prefix: "fstc_",
            description_prefix: ("Finlandssvensk textkorpus (UHLCS): "
                                 + label + ": "),
            corpus_title_suffix: " (FSTC)",
            corpus_template: settings.templ.fstc,
        });
}

delete fstc_hierarchy;

// TODO: Add aliases for subcorpora, such as fstc_fnb
settings.corpusAliases.fstc = "fstc_.*";


/* Svenska Parole */

settings.corpora.parole_sv = $.extend(true, {}, settings.templ.fstc, {
    title: "Svenska Parole",
    description: "Svenska Parole: sammanställd av Språkbanken vid Göteborgs unversitet, morfosyntaktiskt analyserad med SWECG",
    id: "parole_sv",
    urn: "urn:nbn:fi:lb-2016050208",
    metadata_urn: "urn:nbn:fi:lb-2016050211",
    licence: {
        name: "CLARIN RES +PLAN +NC +LOC +ND",
        urn: "urn:nbn:fi:lb-2015101602",
    },
    cite_id: "parole-sv",
    text_source: {
        dataset: ["Språkbanken, Göteborgs universitet"],
    },
    // Does it make sense to have a paragraph type with a single
    // value, to get the same structure as FSTC?
    paragraph_type: {
        dataset: ["p"]
    },
});

funcs.addCorporaToFolder("reference", "parole_sv");


/* Svenska YLE */

sattrlist.ylenews_sv_common = {
    text_main_department: {
        label: "main_section",
        extendedComponent: "structServiceAutocomplete",
        opts: options.default,
    },
    text_departments: {
        label: "sections",
        type: "set",
        opts: options.fullSet,
        extendedComponent: "structServiceAutocomplete",
    },
    text_id: {
        label: "text_id",
    },
    text_publisher: $.extend(
        {}, sattrs.text_publisher,
        {
            opts: options.lite,
            extendedComponent: "structServiceSelect",
        }
    ),
    text_url: sattrs.link_original,
    text_datetime_published: {
        label: "datetime_published",
        // The datetime values look better when kept on the same line,
        // so do not use funcs.stringifyIsoDatetime that would add a
        // <wbr> break tag
        // pattern: "<%= funcs.stringifyIsoDatetime(val) %>",
    },
    text_datetime_content_modified: {
        label: "datetime_content_modified",
        // pattern: "<%= funcs.stringifyIsoDatetime(val) %>",
    },
    text_datetime_json_modified: {
        label: "datetime_json_modified",
        // pattern: "<%= funcs.stringifyIsoDatetime(val) %>",
    },
    paragraph_id: sattrs.hidden,
    sentence_id: sattrs.hidden,
    sentence_type: {
        label: "sentence_type",
        extendedComponent: "datasetSelect",
        opts: options.lite,
        dataset: {
            "alt": "image_alt",
            "by": "byline",
            "caption": "caption",
            "heading": "heading",
            "heading-alt": "heading_alt",
            "heading-caption": "heading_caption",
            "text": "text",
        },
        translation: transl.textPart,
    },
};

sattrs.ylenews_sv_paragraph_type = {
    label: "paragraph_type",
    extendedComponent: "datasetSelect",
    opts: options.lite,
    dataset: {
        "by": "byline",
        "heading": "heading",
        "headline": "headline",
        "image": "image",
        "lead": "lead",
        "quote": "quote",
        "shortSummary": "short_summary",
        "summary": "summary",
        "text": "text",
    },
    translation: transl.textPart,
};

settings.templ.ylenews_sv_a = {
    title: "Yle svenska webbartiklar {} (för forskare)",
    description: "Yle svenska webbartiklar 2012–2018, Korp: år {}<br/>Variant tillgänglig för forskare: meningarna i den ursprungliga ordningen och stöd för utökad kontextvisning",
    id: "ylenews_sv_{}_a",
    limitedAccess: true,
    licenceType: "ACA",
    features: ["paragraphs"],
    attributes: attrlist.parsed_sv_lemmaset,
    structAttributes: $.extend(
        {}, sattrlist.ylenews_sv_common,
        {
            paragraph_type: sattrs.ylenews_sv_paragraph_type,
        }),
};

funcs.addCorpusSettings(
    settings.templ.ylenews_sv_a,
    [2012, 2018],
    settings.corporafolders.news.ylenews_sv.a,
    "ylenews_sv_{}_a");

settings.corpusAliases["ylenews_sv_2012_2018_a"]
    = settings.corpusAliases["ylenews-sv-2012-2018-korp"]
    = settings.corpusAliases["ylenews-sv-2012-2018"]
    = "ylenews_sv_201[2-8]_a";

settings.templ.ylenews_sv_s = {
    title: "Yle svenska webbartiklar {} (för alla)",
    description: "Yle svenska webbartiklar 2012–2018, blandad, Korp: år {}<br/>Variant öppen för alla: meningarna i en blandad ordning inom varje text och ingen utökad kontextvisning",
    id: "ylenews_sv_{}_s",
    context: context.default,
    within: within.default,
    attributes: attrlist.parsed_sv_lemmaset,
    structAttributes: $.extend(
        {}, sattrlist.ylenews_sv_common,
        {
            sentence_paragraph_type: sattrs.ylenews_sv_paragraph_type,
        }),
};

funcs.addCorpusSettings(
    settings.templ.ylenews_sv_s,
    [2012, 2018],
    settings.corporafolders.news.ylenews_sv.s,
    "ylenews_sv_{}_s");

settings.corpusAliases["ylenews_sv_2012_2018_s"]
    = settings.corpusAliases["ylenews-sv-2012-2018-s-korp"]
    = settings.corpusAliases["ylenews-sv-2012-2018-s"]
    = "ylenews_sv_201[2-8]_s";


settings.corpora.nlfcl_sv = {
    id: "nlfcl_sv",
    title: "Nationalbibliotekets Klassikerbibliotek (svenska)",
    description: "Nationalbibliotekets Klassikerbiblioteks svenskspråkiga delkorpus – Kielipankki version: verk från åren 1810–1937",
    urn: "urn:nbn:fi:lb-201804042",
    metadata_urn: "urn:nbn:fi:lb-201804041",
    cite_id: "nlfcl-sv-korp",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs"],
    attributes : attrlist.parsed_sv_lemmaset,
    structAttributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_author: sattrs.text_author,
        text_contributor: {
            label: "nlfcl_contributor"
        },
        text_rights: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_digitized: {
            label: "digitization_date"
        },
        text_book_number: {
            label: "book_number"
        },
        text_year: {
            label: "publication_year"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

funcs.addCorporaToFolder("literary", "nlfcl_sv");


funcs.addAttrExtraProperties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
