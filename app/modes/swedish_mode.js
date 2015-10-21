// -*- coding: utf-8 -*-

settings.primaryColor = "#edfcd5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;


settings.preselected_corpora = ["mulcold_sv"];


$("#lemgram_list_item").remove();
$("#results-lemgram").remove();

sattrlist.klk_sv = $.extend({}, sattrlist.klk);
sattrlist.klk_sv_parsed = $.extend(
    {}, sattrlist.klk_sv,
    {
        paragraph_n : {
            label : "sentence_n",
            displayType : "hidden"
        },
        sentence_n : {
            label : "sentence_n",
            displayType : "hidden"
        }
    });

sattrlist.klk_sv_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_sv_parsed, sattrlist.klk_pagelinks);

attrlist.klk_sv = {
    ocr : {
        label : "OCR",
        opts : settings.defaultOptions,
    }
};

attrlist.klk_sv_parsed =
    $.extend(
        {
            pos : attrs.pos,
            msd : attrs.msd,
            lemma : attrs.baseform_sv,
            lex : attrs.lemgram,
            saldo : attrs.saldo,
            dephead : attrs.dephead,
            deprel : attrs.deprel,
            ref : attrs.ref,
            prefix : attrs.prefix,
            suffix : attrs.suffix
        },
        attrlist.klk_sv);

attrlist.klk_sv_parsed_pagelinks = attrlist.klk_sv_parsed;


settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.klk_sv = {
    title : "Kansalliskirjaston lehtikokoelman (KLK) ruotsinkieliset lehdet"
};


var klk_sv_parsed_years = settings.fn.make_yearlist(1771, 1948);


// Generate settings.corpora and settings.corporafolders for the
// Swedish KLK corpora by using functions defined in config.js

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_sv, "sv_{decade}", "klk_sv_{year}",
    function(decade) {
        return { title : decade.toString() + "-luku" };
    },
    function(year) {
        return settings.fn.make_klk_corpus_settings(
            "KLK ruotsi {year}",
            "Kansalliskirjaston ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta {year}",
            "sv",
            year,
            klk_sv_parsed_years.indexOf(year) != -1);
    },
    settings.fn.make_yearlist(
        1771, 1948,
        {descending : true,
         omit : [1779, 1780, 1781, 1786, 1787, 1788, 1790]}
    )
);


delete klk_sv_parsed_years;


settings.corpora.mulcold_sv = {
    id : "mulcold_sv",
    title: "MULCOLD ruotsi",
    description : "Multilingual Corpus of Legal Documents, ruotsinkielinen osa",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_sv,
    struct_attributes : sattrlist.mulcold,
};


if (! isPublicServer) {
    settings.fn.remove_matching_corpora(["mulcold_.*"], true);
}


settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
