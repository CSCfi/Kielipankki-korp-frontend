settings.primaryColor = "#F7D1E4";
settings.primaryLight = "#FFEBF5";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.fsvattributes = {
    lemma : settings.fsvlemma,
    lex : settings.fsvlex,
    posset : settings.posset,
    variants : settings.fsvvariants
};

settings.sdhkstructs = {
    text_id : {
        label : "fulltext",
        pattern : "<a href='http://www.nad.riksarkivet.se/SDHK?EndastDigitaliserat=false&SDHK=<%= val %>&page=1&postid=Dipl_<%= val %>&tab=post' target='_blank'>Riksarkivet <%=val %></a>",
        opts : settings.liteOptions,
        internalSearch : false
    },
    text_lang : { label : "lang" },
    text_place : { label : "city" },
    text_date : { label : "date" },
};

settings.sdhkdescription ='Svenskt Diplomatarium - från <a href="http://www.riksarkivet.se/sdhk" target="_blank">Riksarkivet</a>';


$("#lemgram_list_item").remove();

settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.fsvb = {
    title : "Fornsvenska textbanken",
    contents : ["fsv-profanprosa", "fsv-verser"],
};


settings.corporafolders.fsvb.aldre = {
    title : "Äldre fornsvenska",
    contents : ["fsv-aldrelagar", "fsv-aldrereligiosprosa"]
};

settings.corporafolders.fsvb.yngre = {
    title : "Yngre fornsvenska",
    contents : ["fsv-yngrelagar", "fsv-yngrereligiosprosa", "fsv-yngretankebocker"]
};

settings.corporafolders.fsvb.nysvenska = {
    title : "Nysvenska",
    contents : ["fsv-nysvensklagar", "fsv-nysvenskdalin", "fsv-nysvenskkronikor", "fsv-nysvenskovrigt", "fsv-nysvenskbibel"]
};

settings.corporafolders.medeltid = {
    title : "Medeltidsbrev, Svenskt Diplomatarium",
    contents : ["sdhk-svenska", "sdhk-norska", "sdhk-tyska", "sdhk-latin", "sdhk-ovrigt"],
};

settings.corpora["fsv-aldrelagar"] = fsv_aldrelagar;

settings.corpora["fsv-aldrereligiosprosa"] = {
    morf : 'fsvm',
    id : "fsv-aldrereligiosprosa",
    title : "Äldre religiös prosa – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : settings.fsvattributes,
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Birgittaautograferna",
                "Fornsvenska legendariet enligt Codex Bureanus",
                "Pentateuchparafrasen, enligt MB I A",
                "Pentateuchparafrasen B, enligt MB I B",
                "Fornsvenska legendariet enligt Codex Bildstenianus"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-profanprosa"] = {
    morf : 'fsvm',
    id : "fsv-profanprosa",
    title : "Profan prosa – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : settings.fsvattributes,
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Barlaam och Josaphat, ur Codex Holm A 49 Nådendals klosterbok",
                "Sju vise mästare B, Nådendals klosterbok, Codex Holm A 49",
                "Didrik av Bern, hand A",
                            "Sverige krönika, eller Prosaiska krönikan efter Holm D 26",
                "Konungastyrelsen, Bureus utgåva",
                "Didrik av Bern, hand B",
                "Namnlös och Valentin, ur Codex Holm D 4a",
                "Sju vise mästare C, efter Codex Askabyensis",
                "Historia Trojana, ur Codex Holm D 3a",
                "Sju vise mästare A, ur Codex Holm D 4"
            ]
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-verser"] = {
    morf : 'fsvm',
    id : "fsv-verser",
    title : "Verser – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : settings.fsvattributes,
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Fornsvenska Ordspråk",
                "Erikskrönikan, ur Spegelbergs bok, Codex Holm D2" ,
                "Fredrik av Normandie",
                "Ivan Lejonriddaren, ur SFSS Bd 50 Uppsala 1931",
                "Flores och Blanzeflor",
                "Karlskrönikan"
            ]
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-yngrelagar"] = fsv_yngrelagar;

settings.corpora["fsv-yngrereligiosprosa"] = {
    id : "fsv-yngrereligiosprosa",
    morf : 'fsvm',
    title : "Yngre religiös prosa – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : settings.fsvattributes,
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Johannes döparens födelse ur Codex Bildstenianus Ups C 528",
                "Jesu lidandes bägare och hans blods utgjutelse",
                "Svenska Medeltidspostillor 1, enligt AM 787",
                "Esthers bok, ur Codex Holm A1",
                "Gregorius av Armenien B, ur Codex Holm A 49 Nådendals klosterbok",
                "Legenden om Sankt Sigfrid, ur Codex Bilstenianus",
                "Legenden om Sankta Jakelina, ur Linköpingslegendariet, Benz 39",
                "S.Johannis Theologi uppenbarelse",
                "Legenden om Sankta Elisabet av Brabant, ur Linköpingslegendariet, Benz 39",
                "Legenden om Sankta Elisabet av Ungern",
                "Legenden om Sankt Joakim, ur Codex Holm A 3",
                "Sankta Anna, enligt Codex Benz 9",
                "Sancta Clara, ur Codex Oxenstiernianus",
                "Sancti Marci Euangelium",
                "Legenden om Sankta Tekla, ur Linköpingslegendariet, Benz 39",
                "Om Erik den helige, efter Codex Vat Reg Lat 525",
                "Legenden om Stephanus påve, ur Linköpingslegendariet, Benz 39, översatt av Herr Jöns Ewangelista",
                "Legenden om Sankt Germanus och Genoveva, ur Codex Holm A 49 Nådendals klosterbok",
                "Legender om Germanus \\(2\\), ur Codex Holm A 49 Nådendals klosterbok",
                "Utdrag ur Legenden om St Mektild, ur Lund Mh 20",
                "Legenden om Sankt Paulus omvändelse, ur Codex Bildstenianus",
                "Legenden om Maria ov Oegnies",
                "Svenska Medeltidspostillor 5, enligt Linc T 181",
                "Legenden om Sankta Felicula och Petronella, ur Linköpingslegendariet, Benz 39'",
                "Legenden om Katarina av Egypten, ur Codex Holm A 3",
                "Svenska Medeltidspostillor 2, enligt Lund Mh 51 och HUB",
                "Legenden om Sankt Alexius ur Linköpingslegendariet",
                "Birgittas uppenbarelser, Sju stycken, fordom i Codex Bergmannius, Lund Mh 20",
                "Birgittas uppenbarelser, återöversättningen, första redaktionen, Bok 7",
                "Sancti Joannisoppenbarilse",
                "Gregorius Stylista, eller Gregorius på stenen, ur Linköpingslegendariet, Benz 39",
                "Själens kloster,översatt av Jöns Budde",
                "Sankt Ansgarii leverne av Rimbertus, ur Codex Holm A 49 Nådendals klosterbok",
                "Vår herres födelse, ur Codex Holm A 3",
                "Bonaventura, kapitel 6",
                "Exodus 16, ur Holm A3",
                "S Stephani saga, ur Linköpingslegendariet, Benz 39, översatt av Johannes Mathei",
                "Ängelens diktamen, ur Codex Oxenstiernianus",
                "Järteckensboken, ur Codex Oxenstiernianus",
                "Gregorius av Armenien A, ur Codex Bergmannius, Lund Mh 20",
                "Legender om Briccius",
                "Legenden om Sankt Macarius Romanus",
                "Legenden om Sankta Amalberga",
                "Legenden om Sankta Phara, ur Linköpingslegendariet, Benz 39",
                "Legenden om Sankta Maria \\(F\\)",
                "Legenden om Sankta Maria \\(E\\), ur Codex Holm A 3",
                "Den heliga Elisabet av Ungerns uppenbarelser A",
                "Patrikssagan, efter Codex Bildstenianus \\(Ups C 528\\)",
                "Bonaventuras betraktelser, Kapitel 7 ur Holm A 3",
                "Sagan om den helige Blasius, ur Codex Oxenstiernianus",
                "Heliga Birgittas uppenbarelser ur Codex Oxenstiernianus",
                "Birgittas uppenbarelser, åttonde boken, ur Cod Holm A 44",
                "Nicodemi evangelium enligt Codex Oxenstiernianus",
                "Apostla gernigar, ur Codex Oxenstiernianus",
                "Judits bok, ur Codex Holm A 1",
                "Lucidarius, redaktion B, ur Holm A 58, Jöns Buddes bok",
                "Sanct Bartholomei moder, eller Kvinnan utan händer, ur Linköpingslegendariet, översatt av Karl Benedictsson",
                "Codex Bildstenianus; strödda legender Hand I",
                "Regula Salvatoris och Revelationes Extravagantes, ur Berlin KB 3762",
                "Legenden om Sankt Albinus",
                "Birgittas uppenbarelser, Birgittinernorska efter Skokloster 5 kvart",
                "Legenden om Erik den helige, ur Codex Bildstenianus Ups C 528",
                "Legenden om Sankta Joleida, ur Linköpingslegendariet, Benz 39",
                "Birgittas uppenbarelser, återöversättingen, andra redaktionen, Bok 4-8",
                "Den heliga Birgittas liv, Vita abbreviata ur Holm A 33",
                "Legenden om Sankta Macra, ur Nådendals klosterbok",
                "Legenden om Johannes Chrysostomus, ur Linköpingslegendariet, Benz 39",
                "Ruths bok, enligt Holm A 1",
                "Legenden om Germanus \\(1b\\), ur Codex Bildstenianus Ups C 528",
                "Elisabet av Ungerns uppenbarelser B",
                "Legender om Genoveva, ur Codex Holm A 49 Nådendals klosterbok",
                "Legenden om Olav den helige, ur Codex Bildstenianus",
                "Stimulus Amoris, efter Cod Holm A 9",
                "Sjusovaresagan, ur Linköpingslegendariet, Benz 39",
                "Katarina av Sverige, ur Codex Holm A 58, Jöns Buddes bok",
                "Legenden om Sankta Rakel, ur Linköpingslegendariet, Benz 39",
                "Birgittas uppenbarelser Bok 1-3, ur Codex Holm A 33",
                "Legeneden om Magnus Jarl av Okenöarna",
                "Bonaventuras betraktelser, Codex Bergmannius, Lund Mh 20",
                "Vitæpatrum - Helga manna lefverne, ur Codex Oxenstiernianus",
                "Legenden om Sankta Otilia, ur Linköpingslegendariet, Benz 39",
                "Heliga Barbara, ur Codex Oxenstiernianus",
                "Legenden om Paulus och Johannes, ur Codex Bildstenianus, hand IV",
                "Själens tröst, ur Codex Holm A 108",
                "Sankt Emerentia och Sankt Anna; översatt från tyska av Lars Elfsson ur Linköpingslegendariet, Benz 39",
                "Karl Magnus, enl Cod Holm D 4",
                "Legenden om Blasius \\(1b\\) ur Ups C 528",
                "Legenden om tre konungar, ur Ups C 528",
                "Legenden om Sankt Servacius",
                "Bonaventuras betraktelser, kapitel 63 ur Holm A 3"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-yngretankebocker"] = {
    morf : 'fsvm',
    id : "fsv-yngretankebocker",
    title : "Yngre tankeböcker – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : settings.fsvattributes,
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Läkebok 1: blandad läkedom, ur Codex AM",
                "Läkebok 11: Månaderna, efter KBs handskrift med gammal signatur K 45, supplerad på Danska ur codex Grensholmensis",
                "Läkebok, 8 ur codex Grensholmensis i Linköping",
                "Läkebok 4, ur Codex Holm A 49",
                "Läkebok 2, ur pappershandskriften Ups C 601",
                "Bondakonst av Peder Månsson",
                                "Läkedomar, codex Ups Benz 22",
                "Läkebok 5 och 6, ur Codex 19 Benz",
                "Läkebok 7, efter Codex linc M 5",
                "Läkebok 10: Zoodiaken, månaderna m m, efter hskr i Rålambska samlingen",
                "Läkedom, efter Peder Månssons handskrift i Linköpings Stiftsbibliotek"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-nysvenskbibel"] = {
    id : "fsv-nysvenskbibel",
    title : "Nysvenska bibelböcker – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {pos: attrs.pos},
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Gustav Vasas Bibel, Markusevanguliet",
                "Gustav Vasas Bibel, Lukasevangeliet"
            ]
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-nysvenskdalin"] = {
    id : "fsv-nysvenskdalin",
    title : "Dalin: then swänska argus – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {pos: attrs.pos},
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Dalin: Then Swänska Argus"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-nysvenskkronikor"] = {
    id : "fsv-nysvenskkronikor",
    title : "Nysvenska krönikor – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {pos: attrs.pos},
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Peder Swarts krönika",
                "Per Brahes krönika",
                "Olaus Petris Krönika, stil B",
                "Olaus Petris Krönika, stil A",
                "Olaus Petris Krönika"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-nysvenskovrigt"] = {
    id : "fsv-nysvenskovrigt",
    title : "Nysvenska, övrigt – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {pos: attrs.pos},
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Runius: Prosastycken",
                "Mag. Joh. Qvirfelds himmelska örtegårds-sällskap",
                "Gyllenborg: Svenska sprätthöken",
                "Jon Stålhammars brev",
                "Agneta Horns levnadsbeskrivning",
                "Beskrifning öfwer Sweriges Lapmarker 1747 av Pehr Högström, kap 1-4",
                "AnnaVasas brev",
                "Carl Carlsson Gyllenhielms anteckningar",
                "Samuel Columbus: Mål-roo eller Roo-mål",
                "Haqvin Spegel: Dagbok",
                "UrbanHiärne: Stratonice"
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["fsv-nysvensklagar"] = {
    id : "fsv-nysvensklagar",
    title : "Nysvenska lagar – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {
    	pos: attrs.pos
    },
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            dataset : [
                "Missgiernings Balk",
                "Giftermåls balk \\(1734\\)",
            ],
        },
        text_date : {label : "date"}
    }
};

settings.corpora["sdhk-svenska"] = {
    id : "sdhk-svenska",
    title : "Medeltidsbrev - Svenska",
    description : settings.sdhkdescription,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-norska"] = {
    id : "sdhk-norska",
    title : "Medeltidsbrev - Norska",
    description : settings.sdhkdescription,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-tyska"] = {
    id : "sdhk-tyska",
    title : "Medeltidsbrev - Tyska",
    description : settings.sdhkdescription,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-latin"] = {
    id : "sdhk-latin",
    title : "Medeltidsbrev - Latin",
    description : settings.sdhkdescription,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-ovrigt"] = {
    id : "sdhk-ovrigt",
    title : "Medeltidsbrev - Övriga språk",
    description : settings.sdhkdescription,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : settings.sdhkstructs
};

if(isLab){
    settings.corpora.ogl = {
        id : "ogl",
        title : "Östgötalagen",
        description : "",
        within : settings.defaultWithin,
        context: {"1 section" : "1 section"},
        attributes : {
            baseform : {
                label : "baseform",
                type : "set",
                extended_template : "<input ng-model='model' >",
                opts : settings.setOptions,
                externalSearch : "http://spraakbanken.gu.se/karplabb/#?resources=soederwall,soederwall-supp&search=extended%7C%7Cand%7Cgf%7Cequals%7C<%= val %>&searchTab=extended&hpp=25&extended=and%7Cgf%7Cequals%7C<%= val %>",
                // internalSearch : true,
            },
            pos : {
                label : "pos",
                displayType : "select",
                opts : settings.liteOptions,
                extended_template : selectType.extended_template,
                controller : selectType.controller,
                translationKey : "ogl_pos_",
                dataset : [
                    "Nb",
                    "Ne",
                    "A-",
                    "Pp",
                    "Pk",
                    "Pi",
                    "Px",
                    "Pd",
                    "Py",
                    "Ps",
                    "V-",
                    "Df",
                    "Du",
                    "R-",
                    "C-",
                    "G-",
                    "N-",
                    "I-",
                    "X-",
                    "F-"
                ]
            },
            morph : {
                label : "msd",
                displayType : "select",
                opts : settings.liteOptions,
                extended_template : selectType.extended_template,
                controller : selectType.controller,
                translationKey : "ogl_msd_",
                dataset : [
                    "A----------n",
                    "A--s---mnpsi",
                    "A--s---mnpti",
                    "A--s---mncsi",
                    "A--s---mncti",
                    "A--s---mnssi",
                    "A--s---mnswi",
                    "A--s---mnsti",
                    "A--s---mgpwi",
                    "A--s---mgpti",
                    "A--s---mgcti",
                    "A--s---mdpti",
                    "A--s---mapsi",
                    "A--s---mapti",
                    "A--s---macwi",
                    "A--s---macti",
                    "A--s---mxpsi",
                    "A--s---mxpti",
                    "A--s---mxcti",
                    "A--s---mxsti",
                    "A--s---fnpsi",
                    "A--s---fnpwi",
                    "A--s---fnpti",
                    "A--s---fncti",
                    "A--s---fnsti",
                    "A--s---fgpti",
                    "A--s---fdpti",
                    "A--s---fapsi",
                    "A--s---fapti",
                    "A--s---facti",
                    "A--s---fxpti",
                    "A--s---fxcti",
                    "A--s---nnpsi",
                    "A--s---nnpwi",
                    "A--s---nnpti",
                    "A--s---nncti",
                    "A--s---nnsti",
                    "A--s---ngpti",
                    "A--s---ndpti",
                    "A--s---ndsti",
                    "A--s---napsi",
                    "A--s---napti",
                    "A--s---nacti",
                    "A--s---nxpti",
                    "A--s---nxsti",
                    "A--s---pdpti",
                    "A--s---odpti",
                    "A--s---xnpti",
                    "A--s---xgpti",
                    "A--s---xdpti",
                    "A--s---xapti",
                    "A--s---xxpti",
                    "A--p---mnpsi",
                    "A--p---mnpti",
                    "A--p---mncti",
                    "A--p---mgpti",
                    "A--p---mdpti",
                    "A--p---mdcti",
                    "A--p---mapti",
                    "A--p---masti",
                    "A--p---mxpsi",
                    "A--p---fnpti",
                    "A--p---fdpsi",
                    "A--p---fdpti",
                    "A--p---fapsi",
                    "A--p---fapti",
                    "A--p---facti",
                    "A--p---fxpti",
                    "A--p---nnpti",
                    "A--p---nncti",
                    "A--p---ndpsi",
                    "A--p---ndpti",
                    "A--p---ndsti",
                    "A--p---napsi",
                    "A--p---napti",
                    "A--p---nacti",
                    "A--p---pncsi",
                    "A--p---ogpti",
                    "A--p---rdpti",
                    "A--p---xnpti",
                    "A--p---xdpsi",
                    "A--x---mnpti",
                    "A--x---mgpti",
                    "A--x---mapti",
                    "A--x---mxpti",
                    "A--x---fxpti",
                    "A--x---napti",
                    "A--x---xxpsi",
                    "A--x---xxpti",
                    "C----------n",
                    "Df---------n",
                    "Df-------p-i",
                    "Df-------c-i",
                    "Df-------s-i",
                    "Df-------x-i",
                    "Du---------n",
                    "F----------n",
                    "G----------n",
                    "I----------n",
                    "Nb-s---mn-si",
                    "Nb-s---mn-wi",
                    "Nb-s---mn-ti",
                    "Nb-s---mg-si",
                    "Nb-s---mg-wi",
                    "Nb-s---mg-ti",
                    "Nb-s---md-si",
                    "Nb-s---md-wi",
                    "Nb-s---md-ti",
                    "Nb-s---ma-si",
                    "Nb-s---ma-wi",
                    "Nb-s---ma-ti",
                    "Nb-s---mx-si",
                    "Nb-s---mx-ti",
                    "Nb-s---fn-si",
                    "Nb-s---fn-wi",
                    "Nb-s---fn-ti",
                    "Nb-s---fg-si",
                    "Nb-s---fg-wi",
                    "Nb-s---fg-ti",
                    "Nb-s---fd-si",
                    "Nb-s---fd-wi",
                    "Nb-s---fd-ti",
                    "Nb-s---fa-si",
                    "Nb-s---fa-wi",
                    "Nb-s---fa-ti",
                    "Nb-s---fx-si",
                    "Nb-s---fx-ti",
                    "Nb-s---nn-si",
                    "Nb-s---nn-wi",
                    "Nb-s---nn-ti",
                    "Nb-s---ng-si",
                    "Nb-s---ng-ti",
                    "Nb-s---nd-si",
                    "Nb-s---nd-wi",
                    "Nb-s---nd-ti",
                    "Nb-s---na-si",
                    "Nb-s---na-wi",
                    "Nb-s---na-ti",
                    "Nb-s---nx-si",
                    "Nb-s---nx-ti",
                    "Nb-s---pn-ti",
                    "Nb-s---pg-ti",
                    "Nb-s---pa-si",
                    "Nb-s---pa-ti",
                    "Nb-s---px-ti",
                    "Nb-s---on-ti",
                    "Nb-s---og-ti",
                    "Nb-s---od-ti",
                    "Nb-s---oa-ti",
                    "Nb-s---ox-ti",
                    "Nb-s---rn-ti",
                    "Nb-s---ra-ti",
                    "Nb-s---rx-ti",
                    "Nb-s---xn-ti",
                    "Nb-s---xg-si",
                    "Nb-s---xg-ti",
                    "Nb-s---xa-ti",
                    "Nb-p---mn-si",
                    "Nb-p---mn-wi",
                    "Nb-p---mn-ti",
                    "Nb-p---mg-wi",
                    "Nb-p---mg-ti",
                    "Nb-p---md-si",
                    "Nb-p---md-wi",
                    "Nb-p---md-ti",
                    "Nb-p---ma-si",
                    "Nb-p---ma-ti",
                    "Nb-p---mx-si",
                    "Nb-p---mx-ti",
                    "Nb-p---fn-si",
                    "Nb-p---fn-ti",
                    "Nb-p---fg-ti",
                    "Nb-p---fd-si",
                    "Nb-p---fd-ti",
                    "Nb-p---fa-si",
                    "Nb-p---fa-wi",
                    "Nb-p---fa-ti",
                    "Nb-p---fx-ti",
                    "Nb-p---nn-si",
                    "Nb-p---nn-wi",
                    "Nb-p---nn-ti",
                    "Nb-p---ng-si",
                    "Nb-p---ng-wi",
                    "Nb-p---ng-ti",
                    "Nb-p---nd-si",
                    "Nb-p---nd-wi",
                    "Nb-p---nd-ti",
                    "Nb-p---na-si",
                    "Nb-p---na-wi",
                    "Nb-p---na-ti",
                    "Nb-p---nx-si",
                    "Nb-p---nx-ti",
                    "Nb-p---pd-ti",
                    "Nb-p---pa-si",
                    "Nb-p---pa-ti",
                    "Nb-p---on-si",
                    "Nb-p---on-ti",
                    "Nb-p---og-ti",
                    "Nb-p---od-wi",
                    "Nb-p---od-ti",
                    "Nb-p---rd-si",
                    "Nb-p---rd-ti",
                    "Nb-x---mn-ti",
                    "Nb-x---mg-si",
                    "Nb-x---md-si",
                    "Nb-x---md-ti",
                    "Nb-x---ma-ti",
                    "Nb-x---mx-ti",
                    "Nb-x---fg-ti",
                    "Nb-x---fa-ti",
                    "Nb-x---fx-ti",
                    "Nb-x---nn-si",
                    "Nb-x---nn-ti",
                    "Nb-x---ng-ti",
                    "Nb-x---na-si",
                    "Nb-x---na-ti",
                    "Nb-x---nx-ti",
                    "Nb-x---ox-ti",
                    "Ne---------n",
                    "Ne-s---mn-ti",
                    "Ne-s---mg-ti",
                    "Ne-s---md-si",
                    "Ne-s---fd-si",
                    "Ne-s---xg-ti",
                    "Ne-s---xd-ti",
                    "Pd-s---mn--i",
                    "Pd-s---mg--i",
                    "Pd-s---md--i",
                    "Pd-s---ma--i",
                    "Pd-s---mx--i",
                    "Pd-s---fn--i",
                    "Pd-s---fg--i",
                    "Pd-s---fd--i",
                    "Pd-s---fa--i",
                    "Pd-s---fx--i",
                    "Pd-s---nn--i",
                    "Pd-s---ng--i",
                    "Pd-s---nd--i",
                    "Pd-s---na--i",
                    "Pd-s---nx--i",
                    "Pd-s---od--i",
                    "Pd-s---xn--i",
                    "Pd-s---xg--i",
                    "Pd-s---xx--i",
                    "Pd-p---mn--i",
                    "Pd-p---mg--i",
                    "Pd-p---md--i",
                    "Pd-p---ma--i",
                    "Pd-p---mx--i",
                    "Pd-p---fn--i",
                    "Pd-p---fg--i",
                    "Pd-p---fd--i",
                    "Pd-p---fa--i",
                    "Pd-p---nn--i",
                    "Pd-p---ng--i",
                    "Pd-p---nd--i",
                    "Pd-p---na--i",
                    "Pd-p---pn--i",
                    "Pd-p---pg--i",
                    "Pd-p---on--i",
                    "Pd-p---xn--i",
                    "Pd-p---xg--i",
                    "Pd-p---xd--i",
                    "Pd-p---xa--i",
                    "Pd-x---mn--i",
                    "Pd-x---mg--i",
                    "Pd-x---mx--i",
                    "Pd-x---fg--i",
                    "Pd-x---nx--i",
                    "Pd-x---xd--i",
                    "Pi-s---na--i",
                    "Pi-s---xn--i",
                    "Pi-s---xx--i",
                    "Pi-s----n--i",
                    "Pi-s----a--i",
                    "Pi-s----x--i",
                    "Pi-p----x--i",
                    "Pk-s----n--i",
                    "Pk-s----g--i",
                    "Pk-s----d--i",
                    "Pk-s----a--i",
                    "Pk-s----x--i",
                    "Pk-p----n--i",
                    "Pp-s----n--i",
                    "Pp-s----g--i",
                    "Pp-s----d--i",
                    "Pp-s----a--i",
                    "Pp-p----n--i",
                    "Pp-p----g--i",
                    "Pp-p----d--i",
                    "Pp-p----a--i",
                    "Pp-x----n--i",
                    "Ps-s----n--i",
                    "Ps-s----g--i",
                    "Ps-s----d--i",
                    "Ps-s----a--i",
                    "Ps-s----x--i",
                    "Ps-p----g--i",
                    "Ps-p----d--i",
                    "Ps-p----a--i",
                    "Ps-p----x--i",
                    "Ps-x----x--i",
                    "Px-s---mn--i",
                    "Px-s---mg--i",
                    "Px-s---md--i",
                    "Px-s---ma--i",
                    "Px-s---mx--i",
                    "Px-s---fn--i",
                    "Px-s---fd--i",
                    "Px-s---fa--i",
                    "Px-s---fx--i",
                    "Px-s---nn--i",
                    "Px-s---ng--i",
                    "Px-s---nd--i",
                    "Px-s---na--i",
                    "Px-s---nx--i",
                    "Px-s---pn--i",
                    "Px-s---rd--i",
                    "Px-s---xn--i",
                    "Px-s---xg--i",
                    "Px-p---mn--i",
                    "Px-p---md--i",
                    "Px-p---ma--i",
                    "Px-p---fn--i",
                    "Px-p---fd--i",
                    "Px-p---fa--i",
                    "Px-p---fx--i",
                    "Px-p---nn--i",
                    "Px-p---ng--i",
                    "Px-p---nd--i",
                    "Px-p---na--i",
                    "Px-p---nx--i",
                    "Px-p---pn--i",
                    "Px-p---pd--i",
                    "Px-p---xn--i",
                    "Px-p---xd--i",
                    "Px-x---md--i",
                    "Px-x---ng--i",
                    "Py---------n",
                    "Py-s---mn--i",
                    "Py-s---mg--i",
                    "Py-s---md--i",
                    "Py-s---ma-si",
                    "Py-s---ma--i",
                    "Py-s---mx--i",
                    "Py-s---fn--i",
                    "Py-s---fg--i",
                    "Py-s---fd--i",
                    "Py-s---fa--i",
                    "Py-s---fx--i",
                    "Py-s---nn--i",
                    "Py-s---nd--i",
                    "Py-s---na--i",
                    "Py-s---nx-ti",
                    "Py-s---nx--i",
                    "Py-s---pn--i",
                    "Py-s---xn--i",
                    "Py-s---xa--i",
                    "Py-p---mn-si",
                    "Py-p---mn--i",
                    "Py-p---mg--i",
                    "Py-p---md-si",
                    "Py-p---md--i",
                    "Py-p---ma-si",
                    "Py-p---ma--i",
                    "Py-p---fn--i",
                    "Py-p---fg--i",
                    "Py-p---fd--i",
                    "Py-p---fa--i",
                    "Py-p---nn--i",
                    "Py-p---nd--i",
                    "Py-p---na--i",
                    "Py-p---pa--i",
                    "Py-p---on--i",
                    "Py-p---xa--i",
                    "Py-x---fn--i",
                    "Py-x---ng--i",
                    "Py-x---xx--i",
                    "R----------n",
                    "V-1spia----i",
                    "V-2spia----i",
                    "V-2suia----i",
                    "V-2ppia----i",
                    "V-3spia----i",
                    "V-3spim----i",
                    "V-3suia----i",
                    "V-3suim----i",
                    "V-3sxia----i",
                    "V-3sxim----i",
                    "V-3ppia----i",
                    "V-3ppim----i",
                    "V-3puia----i",
                    "V-3puim----i",
                    "V-3pxia----i",
                    "V-3xpia----i",
                    "V-3xuia----i",
                    "V-3spsa----i",
                    "V-3spsm----i",
                    "V-3susa----i",
                    "V-3sxsa----i",
                    "V-3ppsa----i",
                    "V-3ppsm----i",
                    "V-3pusa----i",
                    "V-3pxsa----i",
                    "V-3xpsa----i",
                    "V-3spma----i",
                    "V-3ppma----i",
                    "V--spp-mn-si",
                    "V--spp-mn-ti",
                    "V--spp-ma-si",
                    "V--spp-mx-ti",
                    "V--spp-fn-ti",
                    "V--spp-nn-si",
                    "V--spp-nn-ti",
                    "V--spp-nd-ti",
                    "V--spp-na-si",
                    "V--spp-xx-ti",
                    "V--sup-mn-si",
                    "V--sup-mn-ti",
                    "V--sup-md-ti",
                    "V--sup-ma-si",
                    "V--sup-ma-ti",
                    "V--sup-mx-ti",
                    "V--sup-fn-si",
                    "V--sup-fn-ti",
                    "V--sup-fx-ti",
                    "V--sup-nn-si",
                    "V--sup-nn-ti",
                    "V--sup-ng-ti",
                    "V--sup-nd-ti",
                    "V--sup-na-si",
                    "V--sup-na-ti",
                    "V--sup-nx-si",
                    "V--sup-nx-ti",
                    "V--sup-px-ti",
                    "V--sup-xn-ti",
                    "V--ppp-mn-ti",
                    "V--ppp-nn-ti",
                    "V--ppp-xn-ti",
                    "V--pup-mn-ti",
                    "V--pup-mg-ti",
                    "V--pup-mx-ti",
                    "V--pup-fn-si",
                    "V--pup-fn-ti",
                    "V--pup-fa-si",
                    "V--pup-nn-ti",
                    "V--pup-na-ti",
                    "V--pup-xn-ti",
                    "V--xpp-xx-ti",
                    "V--xup-mn-ti",
                    "V---pna----i",
                    "V---pnm----i",
                    "V---una----i",
                    "V-3spxa----i",
                    "V-3spxm----i",
                    "V-3suxa----i",
                    "V-3ppxa----i",
                    "V-3pxxa----i"
                ]
            },
            annotation : {
                label : "annotation",
                extended_template : selectType.extended_template,
                controller : selectType.controller,
                opts : settings.liteOptions,
                dataset : [
                    "automatic",
                    "manual"
                ]
            }
        },
        struct_attributes : {
            text_title : {label : "title"},
            section_name : {label : "section"},
            chapter_name : {label : "chapter"}
        }
    };
} // end if(isLab)

settings.corpusListing = new CorpusListing(settings.corpora);
