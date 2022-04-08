
[\[Importing corpus data to Korp: technical documentation\]](https://www.kielipankki.fi/development/korp/)


# Adding a corpus to the Korp frontend (configuration)


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of contents

- [Overview](#overview)
- [General principles](#general-principles)
- [Adding corpus configuration to a Korp configuration file](#adding-corpus-configuration-to-a-korp-configuration-file)
  - [The “mode” of a corpus](#the-mode-of-a-corpus)
  - [Corpus folder in the corpus selector](#corpus-folder-in-the-corpus-selector)
  - [The configuration for a corpus](#the-configuration-for-a-corpus)
  - [Special types of attributes](#special-types-of-attributes)
    - [Selection lists](#selection-lists)
    - [Selection lists with values from corpus data](#selection-lists-with-values-from-corpus-data)
    - [Selection lists with autocompletion, values from corpus data](#selection-lists-with-autocompletion-values-from-corpus-data)
    - [Links (URLs)](#links-urls)
    - [Feature-set values](#feature-set-values)
    - [Structural attributes within sentences](#structural-attributes-within-sentences)
    - [Custom (computed) attributes](#custom-computed-attributes)
  - [Special attribute properties](#special-attribute-properties)
    - [Restricted corpora (licence category CLARIN ACA or CLARIN RES)](#restricted-corpora-licence-category-clarin-aca-or-clarin-res)
    - [Information link](#information-link)
    - [Value pattern](#value-pattern)
    - [Custom features in the extended search](#custom-features-in-the-extended-search)
  - [Defining often-used attributes and other configuration properties](#defining-often-used-attributes-and-other-configuration-properties)
  - [Special features of corpus settings](#special-features-of-corpus-settings)
    - [Attribute value filters](#attribute-value-filters)
    - [Corpus status](#corpus-status)
  - [Generating subcorpus configurations with JavaScript](#generating-subcorpus-configurations-with-javascript)
    - [`funcs.addCorpusSettings`](#funcsaddcorpussettings)
    - [`funcs.extendCorpusSettings`](#funcsextendcorpussettings)
    - [`funcs.makeFolderHierarchy`](#funcsmakefolderhierarchy)
    - [Custom functions](#custom-functions)
  - [Corpus aliases](#corpus-aliases)
  - [Special features of parallel corpus configurations](#special-features-of-parallel-corpus-configurations)
  - [Utility functions](#utility-functions)
- [Attribute name translations](#attribute-name-translations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Overview

This document contains instructions for adding corpus configuration to
[Korp frontend](https://korp.csc.fi/korp/) of [the Language Bank of
Finland (Kielipankki)](https://www.kielipankki.fi/language-bank/).
Please note that this Korp has some changes from the original [Korp of
Språkbanken](https://spraakbanken.gu.se/korp/), whose configuration is
documented in [Språkbanken’s Korp frontend
repository](https://github.com/spraakbanken/korp-frontend/blob/master/doc/frontend_devel.md).

This document has been updated for Korp 9, which was taken into
production in the Language Bank of Finland in February 2022.
Significant changes from the previous Korp 5 are marked with “**\[Korp
9\]**”; for an overview of changes, please see
[korp-corpus-config-changes-v9.md](korp-corpus-config-changes-v9.md).
The obsolete [Korp 5 configuration
instructions](https://www.kielipankki.fi/development/korp/corpus-config/)
are available for comparison.

Please also be aware that configuring corpora for Korp is to undergo
major changes, as the corpus configurations are eventually to be moved
from the frontend to the backend.


## General principles

To make a corpus visible in the Korp frontend and to make Korp know
how its content can be searched and represented, information on the
corpus needs to be added to the configuration files of the Korp
frontend. The configuration files are JavaScript code. In addition,
you may need to add translations of attribute names if they are not
already present; the translations are in JSON files.

**\[Korp 9\]** The Korp configuration files reside in the
[Kielipankki-korp-frontend Git(Hub)
repository](https://github.com/CSCfi/Kielipankki-korp-frontend/),
along with other Korp frontend code, but in separate *branches*, under
the branch “namespace” `config/`. As several corpora may be in the
configuration stage at the same time and as their configurations may
need adjustments in the process, you should create a new branch in the
repository for each corpus to be configured, which allows independent
development of the configurations. The branch name should be of the
form `config/`*corpus* where *corpus* is the short name of the corpus
(or its abbreviation). After cloning the repository, you can create a
new branch based on
[`config/master`](https://github.com/CSCfi/Kielipankki-korp-frontend/tree/config/master)
(the current production
configuration) and check it out (make it the current working branch)
with the Git command:

    git checkout -b config/corpus config/master

When the corpus is to be deployed into production, the corpus-specific
configuration branch is merged to the `config/master` branch of the
repository. For more information on using branches in Git, please see
the [Git
instructions](https://www.kielipankki.fi/development/korp//git/#Branches).
When working with multiple corpus configurations concurrently, [Git
worktrees](https://git-scm.com/docs/git-worktree) can be also a useful
alternative to completely separate working copies of the repository.

Further information on Korp configuration is available on [the Korp
frontend setup documentation of
Språkbanken](https://github.com/spraakbanken/korp-frontend/blob/master/doc/frontend_devel.md).
However, please note that the Korp of the Language Bank of Finland has
some extensions to Språkbanken’s Korp that also affect corpus
configuration.

If the Korp Web page does not open or if it does not work after
modifying configuration or translation files, very likely a
modification contained a (syntax) error. The developer’s tools of a
Web browser may help in debugging.

In the following instructions, the references to the files of the Korp
configuration are relative to the root of the Korp installation. In
the [Kielipankki-korp-frontend Git
repository](https://github.com/CSCfi/Kielipankki-korp-frontend/tree/config/master),
it is `app/` (relative to the root of the repository in the
`config/`*corpus* branches) and in the
various test instances of Korp on `korp.csc.fi` it is
`/var/www/html/korp-test/corpus/`, where *corpus* may be a corpus name (or
abbreviation).


## Adding corpus configuration to a Korp configuration file

### The “mode” of a corpus

The corpora visible in Korp are configured in the files
[`modes/`*modename*`_mode.js`](../app/modes). Definitions common to
several modes should be added to
[`modes/common.js`](../app/modes/common.js). The following modes are
currently available:

| *modename*          | Corpora in the mode                                 |
|-------------------|-----------------------------------------------------|
| `default`         | Finnish-language corpora                            |
| `swedish`         | Swedish-language corpora                            |
| `other_languages` | corpora in other languages than Finnish and Swedish |
| `parallel`        | parallel corpora                                    |


### Corpus folder in the corpus selector

**\[Korp 9\]** Each corpus should be in subtree (folder) in Korp’s
corpus selector. In the Finnish, Swedish and parallel modes, the
top-level folders mostly correspond to the CLARIN resource families:

| Top-level folder | Meaning                                  |
|------------------|------------------------------------------|
| `cmc`            | Computer-mediated communications corpora |
| `academic`       | Academic texts                           |
| `historical`     | Historical corpora                       |
| `learner`        | Language learner corpora                 |
| `literary`       | Literary corpora                         |
| `manual`         | Manually annotated corpora               |
| `news`           | News corpora (including periodicals)     |
| `parliament`     | Parliamentary corpora                    |
| `reference`      | Reference corpora                        |
| `spoken`         | Spoken language corpora (transliterated) |
| `legal`          | Legal corpora                            |
| `easytoread`     | Easy-to-read texts                       |
| `other`          | Other corpora                            |

In contrast, in the other languages mode, the top level corresponds to
a language or language family, currently `english`, `german`,
`french`, `spanish`, `russian`, `uralic`, `swahili` and `cuneiform`.
If a language has many corpora, the second folder level corresponds to
the resource families listed above.

Top-level corpus folders are properties of `settings.corporafolders`.
If a new corpus folder is to be added to news corpora, it is defined
by adding a new property to the object `settings.corporafolders.news`
as follows:

```javascript
settings.corporafolders.news.folder = {
    title: "Folder title",
    description: "Description of the folder",
    contents: [
        "corpus1",
        "corpus2",
    ],
};
```

Defined as above, `folder` contains at the leaf-node level the corpora
`corpus1` and `corpus2`. More levels of nested folders can be defined
as follows:

```javascript
settings.corporafolders.news.folder1 = {
    title: "Folder1 title"
    description: "Description of folder1",
};

settings.corporafolders.news.folder1.folder2a = {
    title: "Folder 2a title",
    description: "Description of folder2a",
    // Ids of the corpora directly under this folder; preferably list each id on a line of its own.
    contents: [
        "corpus1",
        "corpus2",
    ],
};
```

Now `folder1` contains `folder2a` but no leaf-level corpora, and
`folder2a` contains the corpora `corpus1` and `corpus2`.

**\[Korp 9\]** An alternative to specifying the corpora in the
`contents` property of the corpus folder is to call the function
`funcs.addCorporaToFolder` as follows:

```javascript
funcs.addCorporaToFolder("news.folder1.folder2a",
                         [
                             "corpus1",
                             "corpus2",
                         ]);
```

This appends corpora `corpus1` and `corpus2` to the `contents`
property folder of `news.folder1.folder2a`. (If the corpora should be
prepended, add the argument `{prepend: true}` to the function call.)
By using this function, you can have the folder information near the
actual corpus configuration.

Corpora should be divided into folders (primarily) logically, for
example, by genre, not by corpus owner.

The folders in a configuration file should in general be sorted
alphabetically by
the title of the folder. Also subfolders within a folder should be
sorted alphabetically, unless another order is more logical. (The
order in the file does not actually guarantee the order in Korp’s
corpus selector, but it is often the same.) Typically also public
corpora are listed before restricted corpora.

Note that the title and description of corpus folders and corpora
cannot currently be localized according to the Korp interface
language. The titles and descriptions of corpora and folders should in
general follow the language of the corpus: Finnish for Finnish corpora
and Swedish for Swedish. For corpora in other languages and for
parallel corpora, the description may be in the language of the
corpus, in English or in Finnish, or in two or three of these
languages as deemed appropriate. The titles and descriptions of the
language-specific folders in the other-languages mode are in the
language of the corpus, English and Finnish. Please see
`modes/other_languages_mode.js` for examples: search for
`settings.corporafolders.german`, for example.

In addition to the properties `title`, `description` and `contents`, a
corpus folder may have the property `info` containing further
(metadata) information on the corpus. It should be used only
for folders corresponding to logical corpora split into several
physical (sub)corpora, and not for folders grouping together different
corpora of the same kind. The `info` property may contain the
properties shown and described in the following:

```javascript
settings.corporafolders.folder1 = {
    title: "Folder1 title"
    description: "Description of folder1",
    info: {
        // URN pointing to the corpus in Korp
        urn: "urn:nbn:fi:lb-201406021",
        // URN pointing to the META-SHARE record
        metadata_urn: "urn:nbn:fi:lb-201406022",
        // Licence information; settings.licenceinfo defined in modes/common.js
        licence: settings.licenceinfo.CC_BY_30,
        // A home page (information page) of the corpus
        homepage: {
            // The link text
            name: "Information page",
            // The link URL
            url: "http://www.example.fi/",
            // No "Home page" label shown in front of the link text
            no_label: true,
        },
        // Link to information on the compiler of the corpus; the subproperties as above
        compiler: {
            name: "Kotimaisten kielten keskus",
            url: "http://www.kotus.fi/",
            no_label: true,
        },
        // Other supported link items (similar to homepage and compiler above):
        // credits, infopage, iprholder, download
    },
};
```

**\[Korp 9\]** Note that a separate `cite_id` is no longer needed, as
the metadata URN is used for citation id.


### The configuration for a corpus

The configuration for a corpus is defined as a property of
`settings.corpora`. The following example shows the most common
information, and the comments following `//` contain further details.
Further below are separate instructions on certain special types of
attributes and on the special features parallel corpora.

```javascript
settings.corpora.corpus = {
    // The name shown in the corpus selector; often the short name of the corpus
    title: "Corpus",
    // The description of the corpus shown when hovering the mouse over the corpus name in the corpus selector
    description: "Corpus whose name is Corpus",
    // The id of the corpus; the same as the last part of settings.corpora.corpus and the name of the corpus in CWB
    id: "corpus",
    // urn, metadata_urn, licence and cite_id should be specified at the corpus level if the physical corpus corresponds
    // to the logical one (that is, if they are not specified at the corpus folder level). All the properties available
    // in the info property of corpus folders can be added directly to the configuration of a corpus.
    urn: "urn:nbn:fi:lb-2016090610",
    metadata_urn: "urn:nbn:fi:lb-20140730158",
    licence: {
        name: "CLARIN RES +PLAN +NC +PRIV 1.0",
        urn: "urn:nbn:fi:lb-2016041802",
    },
    // If the corpus has paragraphs marked with paragraph elements, the
    // following are within.sp and context.sp
    within: within.default,
    context: context.default,
    // The attributes of a token with the names as specified in the VRT positional-attributes comment
    // (except "word") or to korp-make --input-attributes
    attributes: {
        lemma: {
            // The translation key for the attribute name in the frontend; may be different from attribute name.
            label: "baseform",
            // Value comparison options for the extended search: in practice, one of the following:
            // options.default (for text input, can be omitted),
            // options.lite (for selection lists),
            // options.set (for feature-set attributes, only “is” and “is not”) and
            // options.fullSet (feature-set attributes, all options)
            opts: options.default,
        },
        // Selection list (fixed set of values; see further below)
        pos: {
            label: "pos",
            // Selection list with a fixed value set
            extendedComponent: "datasetSelect",
            // Values and their corresponding translation keys
            dataset: {
                "N": "N",
                "A": "A",
                "Unk": "Unknown",
            },
            // Use the translations in transl.pos for the values (defined in modes/common.js)
            translation: transl.pos,
            opts: options.lite,
        },
        // Reference to an attribute defined earlier
        msd: attrs.msd,
    },
    // Structural attributes: in practice, the attributes in the XML elements of the VRT files
    // (only attributes of the form elem_attr, not structural attributes elem corresponding to plain elements)
    structAtrributes: {
        // The CWB structural attribute text_name corresponds to the attribute "name" of the element "text"
        // in the VRT file
        text_name: {
            label: "text_name",
            extendedComponent: "datasetSelect",
            // Do not translate dataset values
            localize: false,
            // Values as a simple array
            dataset: [
                "Korp1",
                "Korp2",
            ],
            opts: options.lite,
        },
        paragraph_id: {
            label: "paragraph_id",
            // An attribute whose value is not shown in the search interface
            // but may be needed for internal purposes
            displayType: "hidden",
        },
        // Since in practice all corpora have sentence_id, it is best to use the common definition
        sentence_id: sattrs.sentence_id_hidden,
    },
};
```

The titles of the subcorpora of a corpus should contain the title of the
whole (logical) corpus as a part of them. Even though they are seen
under the folder representing the whole corpus in the corpus selector,
in the results only the title is shown. For example, the titles of the
Finnish subcorpora of the KLK corpus (the newspapers and magazines
corpus of the Finnish National Library) are of the form “KLK suomi
*year*”. In contrast, intermediate folders in the corpus selector need
not have full corpus names, for example, the decades in the KLK
corpus.

**\[Korp 9\]** To control the order in which attributes are shown in the
sidebar of Korp’s concordance results, you can use one of two options:
1. In the attribute configurations, specify the `order` property with
   a numeric value: the lower the value, the higher the attribute is
   shown in the sidebar.
2. In the corpus configuration, specify the property
   `sidebarDisplayOrder` containing some of the properties
   `attributes`, `structAttributes`, `customAttributes` and
   `linkAttributes` with arrays listing attribute names or regular
   expressions matching attribute names in the order in which the
   attributes should be shown. For example:
```javascript
    sidebarDisplayOrder: {
        attributes: [
            "cleanword",
            "lemma",
            "pos",
            "msd",
            "note",
            /^clause_/,
        ],
        structAttributes: [
            "text_dialect_region",
            "text_dialect_group",
            "text_parish",
            /^text_/,
            /^paragraph_/,
            /^sentence_/,
        ],
    },
```

**\[Korp 9\]** An attribute may also be shown only some of the
following: KWIC sidebar, statistics attribute selector, extended
search attribute selector and comparison attribute selector. To hide
an attribute in these contexts, specify the properties `hideSidebar`,
`hideStatistics`, `hideExtended` and `hideCompare`, respectively, with
the value `true` in the attribute configuration.


### Special types of attributes

#### Selection lists

If the value set of an attribute is fixed and relatively small,
it may make sense to show it as a selection list in Korp’s extended
search. This allows showing the values of the attribute localized both
in the selection list and in the sidebar. A disadvantage is that at
least at present, the user can select only one value at a time in the
extended search. (Although that can be worked around by adding
disjunctive conditions on the same attribute, it is somewhat
cumbersome.)

**\[Korp 9\]** An attribute is declared as a selection list by adding to
its configuration the property

```javascript
            extendedComponent: "datasetSelect",
```

The values of the attribute (and the translation keys corresponding to
the values) are defined in the property `dataset` of the attribute
declaration. Its value may be either a JavaScript object or array. In
an abject, values may have translation keys differing from the values:

```javascript
            dataset: {
                "N": "N",
                "A": "A",
                "Unk": "Unknown"
            },
```

In an object, the name of the property is the value of the attribute
in the corpus (e.g., `Unk` above) and the value is the name of the
translation key (`Unknown` above).

If the translation keys are always the same as the values or if the
values should not be translated, it is simpler to use an array, in
which case it suffices to write each value once:

```javascript
            dataset: [
                "N",
                "A",
                "Unk"
            ],
```

**\[Korp 9\]** If the values of the attribute should be localized, you
need to define the property `translation` mapping attribute values (or
translation keys; see below) to translated strings:

```javascript
            translation: {
                "N": {
                    "en": "noun",
                    "fi": "substantiivi",
                    "sv": "substantiv",
                },
                "A": {
                    "en": "adjective",
                    "fi": "adjektiivi",
                    "sv": "adjektiv",
                },
                "Unk": {
                    "en": "unknown",
                    "fi": "tuntematon",
                    "sv": "okänd",
                },
            },
```

For translations used in many attributes, you should add the
translation object as the value of a property of the object `transl`
(see [`modes/common.js`](../app/modes/common.js)).

If the values of an attribute should *not* be translated (for example,
names of authors), the property `translation` is omitted and the
property `localize` is set to `false`:

```javascript
            localize: false,
```

Moreover, the value of the property `opts` of a selection list
attribute should be `options.lite`, so that the user can only
specify the conditions *is* and *is not* in the extended search:

```javascript
            opts: options.lite,
```


#### Selection lists with values from corpus data

**\[Korp 9\]** As an alternative to specifying the values of an
attribute in the corpus configuration, the values can be retrieved
directly from corpus data. To do that, specify in the attribute
configuration:

```javascript
            extendedComponent: "structServiceSelect",
```

Note that in this case, you cannot map the values in the corpus data
to something else as with a `dataset` with an object value.

Also note that despite the name `structServiceSelect`, this can be
used for positional (token) attributes as well as structural (text)
attributes.


#### Selection lists with autocompletion, values from corpus data

**\[Korp 9\]** A third option for selection lists is one which retrieves
values from corpus data but also has autocompletion: the user can type
a part of the value and the list narrows down to values matching the
typed value. This is specified in the attribute configuration as

```javascript
            extendedComponent: "structServiceAutocomplete",
```

Again, despite the name, this can also be used for positional
attributes.

In an autocompleting selection list, the user need not choose any of
the values in the list and can also enter any value in the input
field, so it may often make sense to specify `opts: options.default`
instead of `opts: options.lite`, thus allowing more conditions on the
value.

Autocompleting selection lists can be practical for larger value sets
than plain selection lists, even for thousands of values, even though
a large number of values makes the list slower to appear when the user
opens it the first time (for a certain corpus selection).


#### Links (URLs)

An attribute of type URL is specified by adding the property `type`
with the value `url`:

```javascript
        file_url: {
            label: "file_url",
            type: "url",
        },
```

In this basic case, the KWIC sidebar shows the localized name of the
attribute followed by the (possibly abbreviated) URL as the link text.
You can specify that the localized attribute name is shown as the link
text using the property `urlOpts.hideUrl`:

```javascript
            urlOpts: {
                hideUrl: true
            },
```

You can also specify via `urlOpts` that a link should be shown below
other attributes (`inLinkSection: true`), or that the linked page
should open to a new window or tab (`newWindow: true`). These
definitions have been collected to the pre-defined variable
`sattrs.link_url_opts`. The code below defines the URL attribute
`fulltext_url`, with the attribute name as the link text, link below
other attributes and the linked page opening in a new window:

```javascript
        fulltext_url: {
            label: "show_fulltext",
            type: "url",
            urlOpts: sattrs.link_url_opts,
            urlPrefix: "http://www.example.com/",
        }
```

In addition, the above definition contains the property `urlPrefix`
which defines a prefix to be prepended to attribute values, so that a
fixed URL prefix may be omitted from the attribute values in the
corpus data.


#### Feature-set values

A Korp (CWB) corpus may have attributes with feature-set values, which
are in practice multi-valued attributes. Such values are indicated in
the corpus data by separating the values with vertical bars and by
having a leading and trailing vertical bar. Feature-set values are
supported in both positional and structural attributes. In the sidebar
of Korp’s concordance results, the values of a feature-set attribute
are shown beneath each other.

In a Korp corpus configuration, a feature-set attribute needs to be
declared as follows:

```javascript
        pos: {
            label: "pos",
            type: "set",
            opts: options.set,
            // ...
        },
```

Note that you must give the property `opts` the value `options.set`
instead of `options.lite`: even though they appear the same in the
extended search. **\[Korp 9\]** If the attribute should support the full
set of comparisons in the extended search and not only *is* and *is
not*, use `options.fullSet` instead of `options.set`.


#### Structural attributes within sentences

**\[Korp 9\]** Structural attributes within sentences should be declared
under `attributes` with the property `isStructAttr: true` and not
under `structAttributes`, so that the values are shown correctly in
the sidebar. (If declared under `structAttributes`, the value of the
attribute is that of the first token of the sentence for all tokens of
the sentence, even if the sentence contained multiple occurrences of
the structure with different values for the attribute.) For example:

```javascript
    attributes: {
        // ...
        clause_clnum: {
            label: "clause_clnum",
            isStructAttr: true,
        },
        // ...
    },
```

#### Custom (computed) attributes

**\[Korp 9\]** The sidebar of Korp’s concordance results may show
attributes computed based on the values of other attributes, without a
corresponding attribute in the corpus data. They may be used for
generating URLs with common parts and variable parts filled from other
attributes, for example.

A custom attribute is defined in the separate attribute section
`customAttributes`. The attribute definition must have the property
`pattern`, whose value is a pattern for [Lodash
`_.template`](https://lodash.com/docs/4.17.15#template). The pattern
can refer to the following variables:

- `key`: The name of the attribute.
- `pos_attrs`: The positional attributes of the current token: an
   object with each attribute as the property (name).
- `struct_attrs`: The structural attributes of the current token,
   similarly to `pos_attrs`.
- `tokens`: An array of all the tokens of the sentence (or paragraph
   in the context view if the corpus supports extended context). Each
   token is an object containing positional attributes as in
   `pos_attrs`. In addition, the property `_match` is `true` for the
   tokens in the actual match, `_matchSentence` is `true` if the
   current sentence contains the match.

In addition, the custom attribute definition needs to define property
`customType` with a value of either `"struct"` or `"pos"`, which
determines if the attribute is shown under text or word attributes,
respectively.

If you need more complex computation to get the value, you can define
a function and call it in the pattern. For example:

```javascript
    customAttributes: {
        sentence_fulltext_link:  {
            pattern: funcs.makeLinkPattern(
                "show_fulltext",
                "<%= funcs.makeLaMurreFulltextUrl({struct_attrs, pos_attrs, tokens}) %>"),
            customType: "struct",
            urlOpts: sattrs.link_url_opts,
        },
    },
```

See the function `funcs.findContextWords` in
[`modes/common.js`](../app/modes/common.js) for an example of using
the token data.


### Special attribute properties

#### Restricted corpora (licence category CLARIN ACA or CLARIN RES)

If the use of the corpus is restricted and requires logging in to
Korp, either the corpus licence name (`licence.name` in corpus
configuration or `info.licence.name` in corpus folder configuration)
must contain `ACA`, `ACA-Fi` or `RES`, or the following properties
must be added to corpus settings (otherwise they can be left out):

```javascript
             limitedAccess: true,
             licenceType: "RES",
```

`licence_type` may be `RES`, `ACA` or `ACA-Fi` depending on the
licence type.

**Note** that the information on the licence type for restricted
corpora must be added to the Korp MySQL authorization database. When
using `korp-make`, that can be done with the options `--licence-type`
and `--lbr-id`. You can also use the script `korp-make-auth-info.sh`
with the same options before packaging the corpus.


#### Information link

It is possible to add a link to information on attribute values from
an info icon (ⓘ) beside the attribute in the concordance sidebar. It
can be useful in particular for attributes such as the morphosyntactic
description which have a fixed set of values but too large to be
enumerated in a value selection list.

**\[Korp 9\]** An information link for an attribute is specified by
adding to the attribute definition the property `sidebarInfoUrl` with
the URL as the value:

```javascript
        sentence_signum: {
            label: "signum",
            // This URL is in the sidebar ⓘ link
            sidebarInfoUrl: "markup/dma_signumlist.html",
            // ...
        },
```


#### Value pattern

**\[Korp 9\]** The `pattern` property of normal attributes may be used
to modify the appearance of the attribute value in the concordance
sidebar, for example, to add hints for breaking into lines a long
string without spaces. The value of `pattern` is a pattern for [Lodash
`_.template`](https://lodash.com/docs/4.17.15#template), similarly to
that for [custom attributes](#custom-computed-attributes), but it can
only refer to the following variables:

- `val`: The value of the attribute for the current token.
- `key`: The name of the attribute.

For example, a `pattern` calling a function to add an explanation to a
certain value:

```javascript
    text_parent_comment_id: {
        label: "parent_comment_id",
        pattern: "<%= funcs.makeExplainedValue(val, {'0': 'thread_start_message'}) %>",
    },
```


#### Custom features in the extended search

**\[Korp 9\]** An attribute may have custom features in the extended
search, such as a tailored selection list. This is implemented by
writing an appropriate component with the properties `template` and
`controller` and adding it to
[`custom/extended.js`](../app/custom/extended.js). `extended_template`
and `controller`. Please see [Språkbanken’s Korp frontend
instructions](https://github.com/spraakbanken/korp-frontend/blob/dev/doc/frontend_devel.md#customizing-extended-search)
for some more information, and
[`modes/default_mode.js`](../app/modes/default_mode.js) and
[`modes/other_languages_mode.js`](../app/modes/other_languages_mode.js)
for examples.


### Defining often-used attributes and other configuration properties

You should define reusable definitions for often-used
attributes. If a definition is common to corpora in several modes, it
should be defined in [`modes/common.js`](../app/modes/common.js),
otherwise in the configuration
file for the mode in which it is used. For parallel corpora whose
parts are also used as monolingual corpora, the definitions of common
attributes should be in `modes/common.js`.

Reusable attribute definitions can be defined as follows (the
following have already been defined):

```javascript
attrs.msd = {
    label: "msd",
    opts: options.default,
};

sattrs.sentence_id_hidden = {
    label: "sentence_id",
    displayType: "hidden",
};
```

By convention, the `attrs` namespace object contains definitions of
positional attributes and `sattrs` structural attributes. They are
used in the configurations as follows:

```javascript
settings.corpora.sample_corpus =
    // ...
    attributes: {
        // ...
        msd: attrs.msd,
        // ...
    },
    structAtrributes: {
        // ...
        sentence_id: sattrs.sentence_id_hidden,
        // ...
    },
```

In addition, complete lists of positional and structural attributes,
to be used in multiple corpora, can be defined in `attrlist` and
`sattrlist`, respectively:

```javascript
attrlist.corpus_common = {
    lemma: attrs.baseform,
    pos: attrs.pos,
    // ...
};

sattrlist.corpus_common = {
    text_title: sattrs.title,
    text_author: sattrs.author,
    text_author_birthyear: {
        label: "author_birthyear",
    },
    // ...
};

settings.corpora.sample_corpus2 = {
    // ...
    attributes: attrlist.corpus_common,
    structAtrributes: sattrlist.corpus_common,
}
```

You should use the same labels (translation keys) as in other corpora
as far as possible, so that the names appearing in the Korp user
interface are the same.

Another way to refer to commonly used attributes and also other corpus
settings properties is to use the `features` property. You can define
and use such a corpus feature as follows:

```javascript
settings.corpusFeatures.paragraphs = {
    within: within.sp,
    context: context.sp,
};

settings.corpora.sample_corpus = {
    // ...
    features: ["paragraphs"],
    // ...
}
```

The properties in `settings.corpusFeatures.paragraphs` are added to
the properties of `settings.corpora.sample_corpus`. They are added
recursively (with `$.extend`), so that if the corpus settings contains
an `attributes` definition, the `attributes` defined in
`settings.corpusFeatures.parsed_tdt` are added to them.

The following commonly-used feature has already been defined and can
be used whenever appropriate:

- `paragraphs`: The corpus contains paragraphs that can be shown as an
   extended context in the concordance result.

**\[Korp 9\]** **Note** that even though you can use the `features`
property to add attribute definitions to `attributes` and
`structAttributes`, it is better to define lists of attribute
definitions used in multiple corpora in `attrlist` and `sattrlist`, as
using the same objects improves the performance of the Korp corpus
selector. (`features` makes copies of the attribute lists.)


### Special features of corpus settings

#### Attribute value filters

**\[Korp 9\]** A corpus configuration may specify filters based on
values of structural attributes for the simple and extended search:
the user can select one or more values from selection lists and the
search result includes only hits with the specified values.

Filters are specified by adding to the corpus configuration a
`defaultFilters` property, whose value is an array of names of
structural attributes by which to filter the results. For example, to
add a multiple-selection list for filtering by the value of the
attribute `text_parish_name`, add the following line to the corpus
configuration:

```javascript
    defaultFilters: ["text_parish_name"],
```


### Corpus status

**\[Korp 9\]** When a corpus is in the beta test stage or in an
earlier testing stage, you should add the property `status` with the
value `"beta"` or `"test"` to the corpus configuration or to the
`info` object of the configuration of a corpus folder whose all
corpora have the same status:

```javascript
    status: "beta",
```

This appends the string “_(beta)_” or “_(test)_” to the corpus title
and an appropriate localized disclaimer to the description.


<!--
#### Ignore tokens between CQP token conditions

If a corpus contains non-text tokens, such as comments or prosody
information interspersed between tokens, it may make searching easier
if they can be ignored in a multi-token search. To do so, add to the
corpus configuration the property `ignore_between_tokens_cqp`, whose
value is the CQP expression to be inserted between each two token
expressions in the CQP expression formed from an extended search
expression in Korp. For example, the following allows any number of
tokens with the part of speech `punct` between other tokens:

```javascript
    ignore_between_tokens_cqp: '[pos="punct"]*',
```

However, please note that this takes effect only if all the selected
corpora have the same value for the `ignore_between_tokens_cqp`.
Moreover, the setting does not (at least currently) affect the simple
nor the advanced search.
-->


### Generating subcorpus configurations with JavaScript

If a logical corpus has been divided into several (sub)corpora from
Korp’s point of view, the configurations for these (sub)corpora are
typically the same except for the id, name and description of the
corpus. In such a case it may make sense to generate the
configurations of the (sub)corpora programmatically with JavaScript
code based on a list containing only the variable parts of the
configurations. Advantages of this approach are that the configuration
is usually more compact and that changes need to be made to a single
place if the declarations common to all (sub)corpora need to be
modified. A drawback is that the code generating corpus configurations
is often less transparent than explicit declarations for each
(sub)corpus.

The main Korp frontend configuration file
[`modes/common.js`](../app/modes/common.js) contains a couple of
functions for generating corpus configurations with common
declarations. The functions are in the `funcs` namespace and they are
described in the following.


#### `funcs.addCorpusSettings`

Function `funcs.addCorpusSettings` adds corpus settings based
on a template of common properties and a list of corpus-specific
properties added to the template. The corpora are added to a given
corpus folder with an id with a given fixed prefix and variable suffix
part in the corpus-specific property list. It is used for the corpus
`kotus_ns_presidentti`, for example:

```javascript
settings.templ.kotus_ns_presidentti = {
   title: "",
   description: "",
   id: "",
   within: within.sp,
   context: context.sp,
   attributes: {
       lemma: attrs.baseform,
       // ...
       lex: attrs.lemgram_hidden
   },
   structAtrributes: {
       text_title: sattrs.text_title,
       // ...
       sentence_url: sattrs.context_url
   }
};

funcs.addCorpusSettings(
   settings.templ.kotus_ns_presidentti,
   [
       { id: "ahtisaari",
         title: "Presidentti Ahtisaaren uudenvuodenpuheet",
         description: "Kokoelma sisältää presidentti Martti Ahtisaaren pitämät uudenvuodenpuheet (1995–2000). ..." },
       // ...
       { id: "svinhufvud",
         title: "Presidentti Svinhufvudin uudenvuodenpuheet",
         description: "Kokoelma sisältää presidentti P. E. Svinhufvudin pitämät uudenvuodenpuheet (1935–1937)." },
   ],
   settings.corporafolders.other_texts.kotus_ns_presidentti,
   "kotus_ns_presidentti_"
);
```

`funcs.addCorpusSettings` takes the following arguments:
1.  a template containing the common properties for the configurations
    of all the subcorpora;
2.  a list (an array) of objects containing for each subcorpus the
    variable parts to be combined with the properties of the template;
    each item in the list must contain the property `id` that is used
    as the variable part of the corpus id;
3.  the folder (subtree) of the corpus selector to which the
    subcorpora are to be added; and
4.  a corpus id prefix to be prepended to the values of the `id`
    property in the array elements.


#### `funcs.extendCorpusSettings`

Function `funcs.extendCorpusSettings` is used to add properties to the
existing settings of multiple corpora. (The function thus does not
actually generate corpus settings, but it helps in making them more
compact.) It can be used as follows:

```javascript
// The properties common to the corpora
las2_common_props = {
    urn: "urn:nbn:fi:lb-2015050504",
    // ...
    limitedAccess: true,
    licenceType: "RES",
    attributes: attrlist.las2,
    structAtrributes: sattrlist.las2,
};

// The variable parts of the corpus settings
settings.corpora.las2_tentit = {
    title: "LAS2 (tentit)",
    description: "Edistyneiden suomenoppijoiden korpus (tentit)",
    id: "las2_tentit",
};
settings.corpora.las2_esseet = {
    title: "LAS2 (esseet)",
    description: "Edistyneiden suomenoppijoiden korpus (esseet)",
    id: "las2_esseet",
};

// Add the common properties to the corpus settings
funcs.extendCorpusSettings(
    las2_common_props, ["las2_tentit", "las2_esseet"]);

delete las2_common_props;
```

`funcs.extendCorpusSettings` takes the following arguments:
1.  an object containing the properties to be added (recursively) to
    the corpus settings; and
2.  a list (an array) of ids of the corpora to whose settings the
    properties are to be added.


#### `funcs.makeFolderHierarchy`

Function `funcs.makeFolderHierarchy` creates corpus settings
for multiple corpora and creates a corpus folder hierarchy for them
under a specified parent folder. It is used as follows for generating
the two-level subcorpus hierarchy of the dialect corpus LA-murre
(slightly modified for illustration):

```javascript
// Corpus grouping to folders
var la_murre_grouping = [
    // First-level subfolder: base id and name
    ["LOU", "Lounaismurteet", [
        // Second-level subfolder
        ["VarE", "Eteläinen Varsinais-Suomi", [
            // Corpus: base id and name
            ["karuna", "Karuna"],
            ["kisk", "Kisko"],
            // ...
        ] ],
        ["VarP", "Pohjoinen Varsinais-Suomi", [
            ["eura", "Eura"],
            // ...
        ] ],
    ] ],
    ["LVÄ", "Lounaiset välimurteet", [
        ["SatL", "Länsi-Satakunta", [
            ["ahla", "Ahlainen", {
                // Modify corpus settings with these properties
                context: context.default,
                within: within.sc
            }],
            // ...
        ] ],
        // ...
    ] ],
    // ...
];

// A template of common corpus properties
settings.templ.la_murre = {
    within: within.spc,
    context: context.sp,
    attributes: {
        cleanword: {
            label: "cleanword",
        },
        // ...
    },
    structAtrributes: {
        text_header: {
            label: "text_header"
        },
        // ...
    }
};

// Actually create the folder hierarchy
funcs.makeFolderHierarchy(
    settings.corporafolders.spoken.la_murre, la_murre_grouping,
    {
        id_prefix: "lam_",
        folder_description_prefix: "Lauseopin arkiston murrekorpus: ",
        corpus_title_suffix: " (LA-murre)",
        make_corpus_description: function (data) {
            return "Lauseopin arkiston murrekorpus: " + data[1];
        },
        corpus_template: settings.templ.la_murre,
    });
```

`funcs.makeFolderHierarchy` takes the following arguments:
1.  Parent folder, under which the subfolders are added.
2.  Subfolder tree: an array of the format: `[[ folder1_data, [[
    subfolder11_data, [ corpus111_data, corpus112_data ]], [
    subfolder12_data, [ corpus121_data, corpus122_data ]]], [[
    folder2_data, [ corpus21_data, corpus22_data, corpus23_data ]]]`
    Folder and corpus data may be an object containing the essential
    properties for the item, or one to four array elements, the last
    of which may be a composite object and the preceding ones strings.
    The strings are the (base) values for the properties id, title and
    description. These values will be modified as specified in
    options. If one is not specified, the previous one is used. The
    possible final composite object is used to override other
    properties in the configuration template specified in options.
3.  Options: an object that may contain the following properties:
    - `folder_template`, `corpus_template`: An object to be used as
       the base configuration properties for folders and corpora,
       respectively (default: `{}`).
    - ({`folder`,`corpus`}`_`){`id`,`title`,`description`}`_`{`prefix`,`suffix`}:
       A string to be prefixed or suffixed to the id, title or
       description of folders and/or corpora (default: empty).
    - `make_`{`folder`,`corpus`}`_`{`id`,`title`,`description`}: A
       function to use to make the id, title or description of a
       folder or corpus. The function takes the arguments `info` (the
       folder or corpus data in subfolder tree), `parent_folder`
       (settings.corporafolders subobject) and `ancestor_folder_ids`
       (an array of strings containing the ancestor folder ids from
       the top to the parent), and it should return a string. If
       defined, the function is used in preference to the prefix and
       suffix properties above.


#### Custom functions

Another complex example of using JavaScript to generate corpus
configurations is for the KLK corpora (National Library Newspapers and
Magazines, corpus ids `klk_`…), in which the variable part is
primarily the year, but also a different value for the property
`context` beginning from a certain year. In addition, JavaScript code
is used to generate corpus folders by decade. (However, the custom
function could probably be replaced with
`funcs.makeFolderHierarchy` and a function creating the folder
hierarchy.)


### Corpus aliases

Corpus aliases are used to map a corpus id to another one or a list of
corpus ids. They can be used as shorthands for a list of corpus ids,
or to map old corpus ids of renamed corpora to new ones. The
shorthands are useful in the location URNs of corpora split into
multiple subcorpora in Korp, for example. For renamed corpora, they
allow saved URLs referring to old corpus ids to continue to work.
Corpus aliases are expanded in the URL, so the URL that the user sees
in the end contains the actual corpus ids.

Please note that the corpus alias mechanism currently works for the
Korp frontend only. For the backend (Korp API), you currently need to
copy a renamed corpus to the new name. An alias mechanism for the
backend may be introduced later.

You can add corpus aliases with the function `funcs.addCorpusAliases`,
which allows adding multiple aliases at once:

```javascript
funcs.addCorpusAliases(
    "s24_20(0[1-9]|1[0-7])",
    [
        "suomi24-2017h2",
        "suomi24-2001-2017",
        "suomi24-2001-2017-korp-v1-1",
    ]);
```

The first argument is a string containing a list of comma-separated
corpus ids or regular expressions, and the second argument is a list
of corpus aliases to be expanded to the given corpus ids. Note that
corpus aliases are not expanded recursively, so the first argument
should not refer to corpus aliases.

`funcs.addCorpusAliases` by default adds variants of aliases with and
without a `-korp` suffix and with underscores converted to hyphens and
hyphens to underscores. If an alias contains the infix `-korp-` or
`_korp_`, the function also adds aliases without it. Thus, in addition
to the explicitly specified aliases, the example above adds the
aliases `suomi24-2017h2-korp`, `suomi24-2001-2017-korp`,
`suomi24-2001-2017-v1-1`, `suomi24_2017h2`, `suomi24_2001_2017`,
`suomi24_2001_2017_korp_v1_1`, `suomi24_2017h2_korp`,
`suomi24_2001_2017_korp` and `suomi24_2001_2017_v1_1`.

Alternatively, you can add corpus aliases manually to the object
(namespace) `settings.corpusAliases`. The property name is the alias,
and the value is a string containing a list of comma-separated corpus
ids or regular expressions. For example:

```javascript
// "las2" is expanded to the two corpora las2_tentit and las2_esseet
settings.corpusAliases.las2 = "las2_tentit,las2_esseet";

// "lehdet_ks" has been renamed as "karjalansuomi", but allow the old id via an alias
settings.corpusAliases.lehdet_ks = "karjalansuomi";

// "ftc" refers to the list of all the corpora whose id begins with "ftc_"
settings.corpusAliases.ftc = "ftc_.*";
```

Note that the expansions of aliases containing regular expressions may
change if new corpora are added to Korp. Such aliases may not be used
for the Korp URNs of corpora, since the denotation of a corpus URN
should be persistent.


### Special features of parallel corpus configurations

For parallel corpora, the configuration of the corpus for each
language is defined separately as above, but a couple of additional
properties are added to the configuration. One of the aligned corpora
is a kind of a main corpus that is shown in Korp’s corpus selector.
The property `contents` of a corpus folder lists only this main
corpus.

In the configurations of individual corpora, the crucial attributes
are `lang`, `linkedTo`, `context` and `hide`. They are described in
the comments of the following example:

```javascript
settings.corpora.parfin_2016_fi = {
    id: "parfin_2016_fi",
    title: "ParFin 2016",
    description: "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus ...",
    // ..
    // The corpus language code (a three-letter ISO language code)
    lang: "fin",
    // Information on the structure on which the corpora have been aligned; the value may be
    // context.linkAligned if the alignment structure is "link", or context.defaultAligned
    // if it is "sentence". If the alignment element is something else, it must be defined in the
    // variable context.
    context: context.linkAligned,
    within: within.sentLink,
    // The other parts of the parallel corpus which this corpus has been liked to and aligned with.
    linkedTo: ["parfin_2016_ru"],
    attributes: attrlist.parfin_2016_fi,
    structAtrributes: sattrlist.parfin_2016_fi,
    // The main corpus should be shown in the corpus selector, so no property "hide"
};

settings.corpora.parfin_2016_ru = {
    id: "parfin_2016_ru",
    title: "ParFin 2016",
    description: "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus ...",
    // ..
    lang: "rus",
    context: context.linkAligned,
    within: within.sentLink,
    linkedTo: ["parfin_2016_fi"],
    attributes: attrlist.parfin_2016_ru,
    structAtrributes: sattrlist.parfin_2016_ru,
    // Setting the property hide to true hides this corpus from the corpus selector, since this is not the main corpus.
    hide: true,
};
```


### Utility functions

[`modes/common.js`](../app/modes/common.js) contains definitions of a
number of utility functions in the namespace object `funcs`, which can
be used in corpus configurations. Typically, the functions have been
written for a specific purpose, but they may also be useful in other
contexts. The file contains the following at least somewhat
general-purpose functions:

- `funcs.makeLinkPattern (label, url)`
- `funcs.makeBoolAttr (label, yes_no)`
- `funcs.makeExplainedValue (value, value_map)`
- `funcs.stringifyIsoDatetime (val)`
- `funcs.msToHms (ms0)`
- `funcs.makeVideopageUrl (corpus_id, token_data, video_url, msec2sec_attrs, omit_attrs)`
- `funcs.makeYearlist (start, end, opts)`
- `funcs.removeNonWordChars (word)`
- `funcs.findContextWords (token_data, context_size)`
- `funcs.makeVideoAttr (options, attrProps)`

Please see the file [`modes/common.js`](../app/modes/common.js) for
more information on the functions.


## Attribute name translations

The texts shown for corpus attributes (labels) are defined in the JSON
translation files
[`translations/corpora-lg.json`](../app/translations), where *lg* is
the language code `fi`, `sv` or `en`.

Many corpora have translations currently only for Finnish, that is, in
the file
[`translations/corpora-fi.json`](../app/translations/corpora-fi.json).
However, Swedish-language corpora should have translations at least in
Swedish and corpora in other languages than Finnish or Swedish at
least in English.

Translations in the JSON files are of the form

```javascript
    "translation_key": "translation",
```

where `translation_key` is an attribute label (the value of the
property `label` in the configuration of a corpus attribute). For
example:

```javascript
    "pos": "part-of-speech",
```

The following lists current best practices for translation keys and
translations. However, for historical reasons, the translation files
contain a large number of examples violating these practices.
-   Translation keys should be in English, correspond to the meaning
    of the attribute or attribute value and be human readable but
    reasonably short.
-   A translation should in general begin with a lower-case letter,
    unless it begins with a proper name.
-   Avoid structure and corpus names in the translation keys, unless
    they are part of the translation. For example, the translation key
    for the structural attribute `text_author` should be `author` and
    not `text_author`, unless the translation should be “author of the
    text”.

If you add translations to the end of a translation file, add them
above the final, dummy “sentinel” line to avoid comma errors.
A comma missing from the end of a non-final
translation line or a comma at the end of a translation file causes
Korp not to work, with little or no indication of the place of error.

**\[Korp 9\]** Note that in Korp 9, the translations of enumerated
attribute values are defined in the `translation` property of the
attribute configuration, not in the JSON files.
