settings.corporafolders = {
    test: {
        title: "Testiaineistoja",
        description: "Huolettomia pikkuaineistoja testailuun",
    },
};

funcs.addCorporaToFolder("test", [
    "reittidemo",
]);

settings.corpora.reittidemo = {
    title: "Reitti A-siipeen",
    description: "Kahdenkeskisen videoidun keskustelun ”Reitti A-siipeen” yleiskielistetty litteraatti. Keskustelussa selvitetään reittiä tiettyyn Helsingin yliopiston Metsätalossa sijaitsevaan huoneeseen. Vapaasti käytettäväksi tarkoitettu näyteaineisto.",
    id: "reittidemo",
    context: context.sp,
    within: within.sp,
    urn: "urn:nbn:fi:lb-100110012817",
    metadata_urn: "urn:nbn:fi:lb-2014101401",
    cite_id: "Reittidemo-korp",
    licence: settings.licenceinfo.CC0,
    // Use feature "parsed_tdt", as the corpus has an extra attribute,
    // so attrlist.parsed_tdt could not be used directly
    features: ["paragraphs", "parsed_tdt"],
    attributes: {
        spoken: attrs.spoken,
    },
    structAttributes: {
        text_author: sattrs.author,
        text_title: sattrs.title,
        text_year: sattrs.publ_year,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
        utterance_id: {
            label: "utterance_num",
        },
        utterance_participant: {
            label: "speaker",
            extendedComponent: "datasetSelect",
            dataset: [
                "ML",
                "TA"
            ],
            opts: options.lite,
            escape: false,
        },
        utterance_begin_time: {
            label: "utterance_begin_time"
        },
        utterance_end_time: {
            label: "utterance_end_time"
        },
        utterance_duration: {
            label: "utterance_duration"
        },
        // TODO: Should this be replaced with something else, or is
        // the Korp video link below enough?
        // utterance_annex_link: sattrs.link_show_video_annex,
    },
    customAttributes: {
        video: funcs.makeVideoAttr({
            baseURL: "http://localhost/corpusdata/",
            path: "reittidemo/",
            file: "reitti_a-siipeen",
            ext: "mp4",
            startTime: "@utterance_begin_time",
            endTime: "@utterance_end_time",
        }),
    },
};

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
settings.preselectedCorpora = [
    // "reittidemo",
];

// Add the extra properties to corpora
//
// FIXME: This works for attributes set via the "features" property
// only if the same attribute objects are referred to directly from
// some other corpus configuration. Fixing would probably require
// moving this to initialization code (util.coffee, main.coffee),
// which might also otherwise make sense. (Jyrki Niemi 2016-10-18)

funcs.addAttrExtraProperties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
