# Setting up the Korp Frontend

This section describes how to get the Korp frontend up and running on your own machine and presents the available customization. In this step it is necessary to have a backend with at least one corpus installed. For testing purposes, Språkbankens Korp backend may be enough. It is also assumed that you have a web server available (such as Apache or Nginx).

Download the latest release from [Github](https://github.com/spraakbanken/korp-frontend/releases). The code is distributed under the [MIT license][MIT].

An alternative to downloading a released bundle is to clone the repository:

```
git clone https://github.com/spraakbanken/korp-frontend.git
```

Be sure to use the `master`-branch for production environments.

In this text Korp refers to the frontend only.

## Configuration

In ideal cases, no changes needs to be done in Korp. Instead
all configuration will reside in another directory. How to make the build
system detect this directory and its contents will be described below.

### Make Korp detect the configuration directory

To make Korp detect the configuration directory,
use a `run_config.json` file in the root of the Korp repo with the following content:

```
{
    "configDir": "../path/to/my/configuration/folder"
}
```

### Structure of the configuration directory

The following type of files are needed to make Korp work properly. They
are all described in the documentation.

- `config.js`
- `modes/common.js`
- `modes/*mode.js`
- `translations/*.json`

(In short, a mode is a collection of corpora that may have different 
  functionality and is described later).

For more advanced use cases there is also the possibility to add own code, styling etc.
in `custom`.

### Språkbankens configuration

Språkbankens configuration repository is https://github.com/spraakbanken/korp-frontend-sb.
It can be used as a supplement to this documentation.

#### Components

Define your own components as a map in `custom/components.js`. `component` will be added as a component with name `componentName` to the Angular app.

```
import component from 'custom/myComponentFile'

export default {
	componentName: component
}
```

These can then be used in other custom components / extended / sidebar or as reading mode-components. `component` can also be defined in `components.js`.

#### Customizing extended search

In `custom/extended.js`, we can define custom (non-Angular) components to be used in extended search:

```
export default {
    complemgramExtended: {
        template: `<input type="text" ng-model="model" />
        `,
        controller: [
            "$scope", function($scope) {
                $scope.$watch("input; () => ...)
                ...
        }],
    },
    attr: {
        template: `
            <select ...>
        `,
        controller: ["$scope", "$uibModal", function($scope, $uibModal) {
            if($scope.show) $uibModal.open
        }
    },
    ...
}
```

Template is an Angular.js template string and controller is an Angular.js controller function.

Make sure to set `$scope.model` as the final result to be used in the CQP-query.

`complemgramExtended` can then be used as key for `extendedComponent` in the configuration files.

```
attributes: {
    complemgram: {
        label: "Compounds",
        extendedComponent: "complemgramExtended",
    }
}
```

##### escaper

`escaper` is a directive that takes the user's input and escapes any regexp characters before saving it to `scope.model`. 
When the model changes it automatically de-escapes any regexp characters before showing the value to the user. 
Input must be saved to `scope.input` for it to work. Example: `<input ng-model="input" escaper>`


##### Customizing sidebar

In `custom/sidebar.js`, we can define custom (non-Angular) components to be used in the sidebar:

```
export default {
    imageSidebar: {
        template: `<img ng-src="myImg" />
        `,
        controller: [
            "$scope", function($scope) {
                $scope.myImg = $scope.sentenceData["text_mediafilepath"]
                ...
        }],
    },
    ...
}
```

Useful for having e.g. a modal window pop up, or for rendering a small video player in the sidebar, or for anything else that isn't simple text or a link.

Use `imageSidebar` as key for `sidebarComponent` in the configuration files.

#### Rendering attribute values in the statistics-view

Define your own rules for rendering values and generating CQP-expressions for certain attributes.

When configuring an attribute that needs special handling, use the `stats_cqp` and `stats_stringify` keywords:

```
const myAttribute = {
    label: "category",
    order: 80,
    stats_stringify: "customStringify",
    stats_cqp: "customCQP",
}
```

Then create `custom/statistics.js` and define the functions there:

```
export default {
    customStringify: (values) => values.join(' == '),
    customCQP: (tokens) => "(" + tokens.map(item => `_.cat="${item}"`).join(" | ") + ")",
}
```

A `stats_cqp` function can take the additional arguments `ignoreCase`
(`boolean`: `true` if the value should be treated case-insensitively)
and `type` (`string`: the name of the attribute). The function should
take care of escaping the regular expression metacharacters in
attribute values as appropriate.

Rendering values and generating CQP can also be controlled by editing `app/config/statistics_config.js`, but 
of course it is best to avoid editing the actual code if it is possible.

#### Stringify functions

Add all custom pretty-printing to `custom/stringify.js`. Example file:

```
export const {
    sense: (sense) => util.saldoToString(sense, true),
    lemgram: (str) => util.lemgramToString(str, true),
    complemgram: (str) => str.split('+').map((lemgram) => util.lemgramToString(lemgram, true)).join('+')
}
```

Note that no changes in the attribute-configuration is needed here. Korp will pick up the functions automatically
based on the name of the attribute. Will be used in sidebar, statistics, extended, etc.

### Reading mode

Enable the standard reading mode by using this setting on a corpus:

  ```
  readingMode: {
        component: "standardReadingMode"
    }
  ```

When clicking on a row in the KWIC a link will be added to the sidebar. Clicking this link opens a new tab where the entire text is shown.

Prerequisites are:
- A structural attribute identifying the currently selected row in the KWIC. This may be configured with `settings.readingModeField`, default is `sentence_id`.
- `_head` and `_tail` attribute on each token. These attributes contain the whitespace before and after a token.

It is possible to write a custom reading component. See <https://github.com/spraakbanken/korp-frontend/blob/dev/app/scripts/components/readingmode.js> for an example.

### Content of `config.js`

The main configuration file of Korp is `config.js`. In this file we have 
configuration for where the backend is located, what features should be turned 
on or off etc. Corpora configuration is done in the modes files. There is more 
information about that later in this document.

All configuration parameters are added to a global `settings`-object. For example: 

```
settings.defaultLanguage = "en"
```

Available settings will be described in feature sections and there is also a 
[summary of all settings](#summary-settings).

### Content of `modes/common.js`

After `config.js`, but before any mode configuration, `modes/common.js` is 
loaded. This may include definitions which are used in several modes such as a set 
of attributes. This helps to keep `config.js` clean. This file must export any 
variables that can be used in a mode.

```
var veryCommonAttributes = {
  pos: {
    label: "pos",
    order: 600
  }
}
module.exports = {
  veryCommonAttributes
}
```

Now very `veryCommonAttributes` will be available in all mode-files.

### Localization

Add `corpora_<lang>.json` files to `app/translations` where lang is replaced with a 
language you want to support. This file is mostly used to translate the names of modes
and the names of attributes. However, it is also possible to put translations
to be used in custom components for extended search and sidebar here.

Translation of values of attributes, that will be shown in the sidebar and statistics,
for example, is done in the corpus configuration.

Files prefixed with `locale` in the codebase controls translations are hard-coded into the 
application and thus it should not be necessary to change these.

#### Adding Languages

To add a new language in the frontend, for example Lithuanian, add a `corpora-lt.json` 
and `locale-lt.json`. `locale-lt.json` may be copied from an existing locale-file and
then translated. Then add the language in `config.js`:

    settings.languages = ["sv", "en", "lt"];
    settings.languageNames = {
        "sv": "Svenska",
        "en": "English",
        "lt": "Lietuvių",
    }

(`settings.languageNames` maps the language code to the name of the language in the language itself.)

To make Lithuanian the default language, use:

    settings.defaultLanguage = "lt"

##### Angular.js locale

To enable full localization (dates in a datepicker for example), an extra file
is necessary. Download `angular-locale_lt.js` from here:

[Angular i18n][angular-i18n]

Put the file in `app/translations/`.

## Modes

Each Korp installation has a series of _Modes_ in the top left corner, which 
are useful for presenting different faces of Korp that might have different 
layouts or functionality. In the Swedish version the parallel corpora have their
own mode because their KWIC results don't mix particularly well with the 
'normal' results.

#### Adding modes

Relevant setting fields are `settings.visibleModes` and `settings.modeConfig`. 
The former controls how many modes are visible in the header (the rest are hidden away in a menu). The latter looks like this:

    [
      {
        localekey: "modern_texts", 
        mode: "default"
      },
      {
        localekey: "parallel_texts", 
        mode: "parallel",
        parallel: true
      },
      {
        localekey: "faroese_texts", 
        mode: "faroe"
      }
    ]


The `localeKey` key corresponds to a key from the localization files. The `mode` key is the mode identifier and is used to load a script file from the `modes` folder, in
the configuration directory, corresponding to that ID. So if you click the modeSelectors 'parallel' entry, the page refreshes and the `modes/parallel_mode.js` will be loaded.

The mode called `default` will always be loaded first. If there is no need for more than one mode, leave `settings.modeConfig` empty.

If `parallel: true` Korp's user interface with be adapted for parallel corpora.

## Corpora

The config file contains the corpora declaration, wherein the available corpora are declared 
together with information about which metadata fields are searchable in them. Adding a test 
corpus is as simple as:


        settings.corpora = {};
        settings.corpora["testcorpus"] = {
            id: "testcorpus",
            title: "The Korp Test Corpus",
            description: "A test corpus for testing Korp.",
            within: {"sentence": "sentence"},
            attributes: {
                pos: {
                    label: "pos",
                    opts: {
                        "is": "=",
                        "is_not": "!="
                    }
                }
            },
            structAttributes: {
            }
        }

* `id`: Short form title, should correspond to the key name of the definition.
* `title`: Long form title, for display in the corpus chooser.
* `description`: For display in the corpus chooser.
* `within`: What are the structural elements of the corpus? See `defaultWithin` in [settings summary](#summary-settings) for format and more information.
* `attributes`: each key here refers to a word attribute in Corpus Workbench. Their values are JSON structures with a few attributes of their own; they are concerned with generating the necessary interface widgets in Extended Search, display in sidebar and statistics. They are:
    * `display`: **REMOVED** Use `sidebarComponent`
    * `displayType`: set to `'hidden'` to fetch attribute, but never show it in the frontend. See `hideSidebar`, `hideStatistics`, `hideExtended` and `hideCompare` for more control.
    * `extendedComponent`: See <#ref customizing-extended-search|customizing extended search>.
    * `externalSearch`: Link with placeholder for replacing value. Example `https://spraakbanken.gu.se/karp/#?search=extended||and|sense|equals|<%= val %>`
    * `groupBy`; `string`. Should be either `group_by` or `group_by_struct`. Should only be needed for attributes with `isStructAttr: true`. Those attributes are by default sent as `group_by_struct` in the statistics, but can be overridden here.
    * `hideSidebar`: Default `false`. Hide attribute in sidebar.
    * `hideStatistics`: Default: `false`. Should it be possible to compile statistics based on this attribute?
    * `hideExtended`: Default: `false`. Should it be possible to search using this attribute in extended?
    * `hideCompare`: Default: `false`. Should it be possible to compare searches using this attribute?
    * `internalSearch`: `boolean`. Should the value be displayed as a link to a new Korp search? Only works for sets. Searches for CQP-expression: `[<attrName> contains "<regescape(attrValue)>"]`
    * `isStructAttr`: `boolean`. If `true` the attribute will be treated as a structural attribute in all sense except it will be included in the `show` query parameter instead of `show_struct` for KWIC requests. Useful for structural attributes that extend to smaller portions of the text, such as name tagging.
    * `label`: a translation key for the attributes name
    * `limitedAccess`: `boolean`, it will not be possible to select this corpus unless a user is logged in and has the correct credentials.
    * `opts`: this represents the auxiliary select box where you can modify the input value. See `defaultOptions` in [settings summary](#summary-settings) for format and more information.
    * `order`: Order of attribute in the sidebar. Attributes with a lower `order`-value will be placed over attributes with a higher `order`-value.
    * `pattern`: HTML snippet with placeholders for replacing values. Available is `key` (attribute name) and `value`. Also works for sets. Example: `'<p style="margin-left: 5px;"><%=val.toLowerCase()%></p>'`
    * `sidebarComponent`: See <# ref customizing-sidebar|customizing sidebar>
    * `sidebarInfoUrl`: `string` (URL). If defined and non-empty, add an info symbol ⓘ for the attribute in the sidebar, linking to the given URL. This can be used to link to an explanation page for morphosyntactic tags, for example.
    * `sidebarHideLabel`: `boolean`. If `true`, do not show the localized attribute label and the colon following it in the sidebar, only the attribute value. This can be used, for example, if the `pattern` for the attribute includes the label but the label should be shown in the attribute lists of the extended search or statistics.
    * `stats_cqp`: See [Custom statistics functions](#custom-statistics-functions).  
    * `stats_stringify`: See [Custom statistics functions](#custom-statistics-functions).
    * `stringify`: *DEPRECATED*, use <# ref stringify-functions | stringify>
    * `translation`: An object containing translations of possible values of the attribute, in this format:
        ```
        {
            "ROOT": {
                "en": "Root",
                "sv": "Rot"
            },
            "++": {
                "en": "Coordinating conjunction",
                "sv": "Samordnande konjunktion"
            },
            "+A": {
                "en": "Conjunctional adverbial",
                "sv": "Konjuktionellt adverb"
            },
            ...
        }
        ```
        This replaces value-translation in the translation-files, and also the old attribute `translationKey`.
    * `translationKey`: **REMOVED** use the new `translation`-setting
    * `type`: Possible values:
        - "set" - The attribute is formatted as "|value1|value2|". Include contains and not contains in `opts`.
                  In the sidebar, the value will be split before formatted. When using compile / `groupby` on a "set" attribute in a statistics request, it will be added to `split`.
        - "url" - The value will be rendered as a link to the URL and possibly truncated if too long. 
* `structAttributes`: refers to higher level metadata attributes. Examples include author, publishing year, URL etc. Structural attributes support the same settings as the word attributes.
* `customAttributes`: creates fields in the sidebar that have no corresponding attribute in the backend. Useful for combining two different attributes. All settings concerning sidebar format for normal attributes apply in addition to:
    * `customType`: `"struct"` / `"pos"` - decides if the attribute should be grouped under word attributes or text attributes.
    * `pattern`: Same as pattern for normal attributes, but `struct_attrs`, `pos_attrs` and `tokens` (all tokens in the hit) are also available. Example: `'<p style="margin-left: 5px;"><%=struct_attrs.text_title - struct_attrs.text_description%></p>'`.
* `readingMode`: See [Reading mode](#reading-mode).

## Parallel Corpora

Parallel corpora need to have its own mode. `startLang` settings must be used. Set it to whatever language that should be the default search language.

The corpora declaration for parallel corpora is different in some important ways. Example:

~~~~~~~
settings.corpora["saltnld-sv"] = {
    id: "saltnld-sv",
    lang: "swe",
    linkedTo: ["saltnld-nl"],
    title: "SALT svenska-nederländska",
    context: context.defaultAligned,
    within: {
    	"link": "meningspar"
    },
    attributes: {},
    structAttributes: {}
};
~~~~~~~
~~~~~~~
settings.corpora["saltnld-nl"] = {
    id: "saltnld-nl",
    lang: "nld",
    linkedTo: ["saltnld-sv"],
    title: "SALT svenska-nederländska",
    context: context.defaultAligned,
    within: {
    	"link": "meningspar"
    },
    attributes: {},
    structAttributes: {},
    hide: true
};
~~~~~~~

The corpus configuration for parallel corpora needs to make explicit the links between the declared corpora. 
This is done using the `linkedTo` property. A corpus may declare any amount of links to other corpora. Also 
notice the `lang` property, used for building the correct language select menu. The `within` attribute should 
use the `"link": "meningspar"` (sentence par in Swedish) value. Also note the `hide` attribute which prevents
both subcorpora from being listed in the corpus chooser widget.

## Autocompletion menu

Korp features an autocompletion list for searches in the Simple Search as well as in Extended for those corpus 
attributes configured to use `autoc`-directive (see <#ref autoc|autoc-section>). This is implemented using an 
ngular.js directive `autoc` that calls Karp's autocompletion function. Using Karp, Korp can autocomplete senses 
and lemgrams. To disable autocompletion use `settings.autocomplete = false`.

Also see `settings.lemgramComplete` for specifying an alternative lemgram autocompletion for the Simple Search.

## Word picture

The word picture-config object looks like this:

    setting.wordPictureConf = {
        pos_tag: [table_def1, tabledef2...]
    }

where `table_def` is an array of objects that describe the resulting word picture table. `table_def1` above might look like this:

    [
        {rel: "subject", css_class: "color_blue"},
        "_",
        {rel: "object", css_class: "color_purple"},
        {rel: "adverbial", css_class: "color_purple", field_reverse: false}
    ]

The `"_"` refers to the placement of the hit in the table order. The value for `rel` refers to a key in `settings.wordpictureTagset` looking like this:

    settings.wordpictureTagset = {
        // the actual value for the pos-tag must be given in this object
        pos_tag: "vb",  

        subject: "ss",
        object: "obj",
        adverbial: "adv"
    }

The values are the actual relations returned by the backend. The relation used is determined by `field_reverse`. If `field_reverse` is `false` (default), `dep` is used, else `head`. If you find yourself with a table full of the search word just flip the `field_reverse` switch.

`css_class` simply gives a class to the column, useful for applying background color. The last supported attribute is `alt_label`, used for when another value than the relation name should be used for the table header.

## Map

Korp's map uses annotations to get locations. The user selects rows from the statistics table and points derived from different rows will have different colors. The selected corpora must have structural attributes with location data in them. The format is `Fukuoka;JP;33.6;130.41667` - the location name, the country, latitude and longitude separated by `;`.

    Also the name of the attribute must contain `"__"` and `"geo"` to show up in the list of supported attributes.

- `settings.mapEnabled` - `boolean`. The map should be enabled.
- `settings.mapCenter` - Where the center of the map should be located when user opens map (but see `settings.calculateMapCenter` below for calculating the center based on map data). Example:  
   ```
    settings.mapCenter = {
      lat: 62.99515845212052,
      lng: 16.69921875,
      zoom: 4
    };
    ```
- `settings.calculateMapCenter` - `string`. The name of the function to calculate the map center dynamically based on the location points to be shown on the map. The supported values are:
    - `"fixed"`: Use the value in `settings.mapCenter` (the default).
    - `"maximumAbsoluteFrequency"`: Center to the location with the maximum absolute frequency.
    - `"average"`: Center to the average of the latitudes and longitudes of all locations.
    - `"weightedAverage"`: Center to the average of the latitudes and longitudes of all the locations, weighted by the absolute frequency of each location.
    - `"centerPoint"`: Center to the middle of the northernmost and southernmost and the westernmost and easternmost points.
Note that the zoom level is always taken from `settings.mapCenter.zoom`, regardless of the distance of the points on the map from each other.


## News widget

By setting `newsDeskUrl`, the news widget is enabled. The widget simply fetches a JSON-file from the given URL. Short example of such a file, including only one news item with its title and body in two languages and a date:

    [
        {
            "h": {
                "en": "<p>Longer description in English</p>",
                "sv": "<p>Längre beskrivning på svenska</p>"
            },
            "t": {
                "en": "English Title",
                "sv": "Svensk Titel"
            },
            "d": "2017-03-01"
        }
    ]

## <a name="summary-settings">Summary of settings</a>

Settings are required unless specified to be optional.

__autocomplete__ - Boolean. Enable autocomplete (see **autoc**-directive) for simple search.

__lemgramComplete__ - An alternative lemgram autocompletion for the simple search, overriding the default Karp-based completion. If specified, it should be an object containing two functions:

- `makeHTTPArgs (wf, resources, corporaIDs, httpArgs)` → `{ method: ..., url: ..., params: ... }`

  Create HTTP arguments for the lemgram completion call based on the given arguments. Arguments:
    - `wf`: the word form (prefix) to complete
    - `resources`: completion resources to use (need not be used)
    - `corporaIDs`: ids of selected corpora
    - `httpArgs`: default HTTP arguments object containing `method`, `url` and `params`
  Return value: HTTP arguments object containing `method`, `url` and `params`

- `makeLemgramList (data)` → `[lemgram]`

  Extract lemgrams from data returned by the lemgram completion call.
  Return value: array of lemgrams as strings

__simpleSearchGetLemgramCQP__ - `function (lemgram, options)` → `cqp`. A function for constructing the CQP query expression for a lemgram selected in the simple search, overriding the default based on the values of attributes `lex` (lemgram) and `complemgram` (compound lemgram). Arguments:

- `lemgram`: lemgram string, regular expression metacharacters _not_ escaped
- `options.prefix`: if `true`, also search for prefixes (initial parts of compounds)
- `options.mid_comp`: if `true`, also search for infixes (middle parts of compounds)
- `options.suffix`: if `true`, also search for suffixes (final parts of compounds)

The function must return a valid CQP expression as a string, with regular expression metacharacters escaped as appropriate with function `regescape`.

__languages__ - Array of supported interface language codes s.a. `["en", "sv"]`

__defaultLanguage__ - The default interface language. Example: `"sv"`

__locales__ - Locales corresponding to the interface languages; e.g. `{ sv: "sv-SE", en: "gb-EN" }`

__defaultTranslationLanguages__ - Array of languages (languages codes) from which translations are searched for if no translation is found in the interface language, before defaulting to the raw translation key. The first found translation is used. Example: `["en", "sv"]` (default: `[]`, i.e., if no translation found in the interface language, the translation key is used).

__downloadFormats__ - Available formats of KWIC-download.

__downloadFormatParams__ - Settings for KWIC-download.

__wordAttributeSelector__ - `"union"` / `"intersection"`. Controls attribute list in extended search. Use all selected corpora *word* attributes or only the attributes common to selected corpora.

__structAttributeSelector__ - Same as __wordAttributeSelector__, but for structural attributes.

__reduceWordAttributeSelector__ - Same as __wordAttributeSelector__, but for the "compile based on"-configuration in statistics. Warning: if set to `"union"`, the statistics call will fail if user selects an attribute that is not supported by a selected corpus.

__reduceStructAttribute_selector__ - Same as __reduceWordAttributeSelector__, but for structural attributes.

__newsDeskUrl__ - See **News widget**. Optional.

__wordpictureTagset__ - See **Word picture**

__wordPictureConf__ - See **Word picture**

__visibleModes__ - See **Adding modes**

__modeConfig__ - See **Adding modes**

__primaryColor__  - Background color in corpus chooser, CSS color. Example: `"rgb(221, 233, 255)"`

__primaryLight__  - Background color of settings area, CSS color. Example: `"rgb(221, 233, 255)"`

__defaultOverviewContext__ - The default context for KWIC-view. Use a context that is supported by the majority of corpora in the mode (URLs will be shorter). E.g.: `"1 sentence"`. For corpora that do not support this context an additional parameter will be sent to the backend based on the `context`-setting in the corpus.

__defaultReadingContext__ - Same as __defaultOverviewContext__, but for the context-view. Use a context larger than the __defaultOverviewContext__.

__defaultWithin__ - An object containing the structural elements of a corpus. Default within is used unless a corpus overrides the setting using `within`. Example:

    settings.defaultWithin = {
        "sentence": "sentence",
        "paragraph": "paragraph"
    };

In simple search, we will search within the default context and supply extra information for the corpora that do not support the default context.

In extended search, the default `within` will be used unless the user specifies something else. In that case the user's choice will be used for all corpora that support it and for corpora that do not support it, a supported `within` will be used.

__cqpPrio__ - An array of attributes to order and-clauses in CQP-expressions by. Order the array by how specific an attribute is in increasing order. `word` will probably be the most specific attribute and should be placed last, while POS-tags will be near the beginning. A well ordered list will speed up queries significantly.

__defaultOptions__ - Object containing the default operators for extended search. May be overridden for each attribute by setting `opts` on the attribute-configuration. The object keys are translation keys and values are the frontend's internal representation of CQP. Example:

    settings.defaultOptions = {
        "is": "=",
        "is_not": "!=",
        "starts_with": "^=",
        "contains": "_=",
        "ends_with": "&=",
        "matches": "*=",
        "matches_not": "!*=",
    }

Explanation of internal format:

             Internal representation       CQP                     Note
----         -------                       ---                     ----
starts with  `[key ^= "val"]`              `[key = "val.*"]`
contains     `[key _= "val"]`              `[key = ".*val.*"]`
ends with    `[key &= "val"]`              `[key = ".*val"]`
matches      `[key *= "val"]`              `[key = "val"]`         Used with `escaper`-directive, regexp
matches not  `[key !*= "val"]`             `[key != "val"]`        special characters will not be escaped.

Then we have the five last operators again, but for `contains` instead of `=`:

             Internal representation            CQP                         Note
----         -------                            ---                         ----
starts with  `[key starts_with_contains "val"]` `[key contains "val.*"]`
contains     `[key incontains_contains "val"]`  `[key contains ".*val.*"]`  Strange name due to CQPParser getting confused by `contains_contains`
ends with    `[key ends_with_contains "val"]`   `[key contains ".*val"]`
matches      `[key regexp_contains "val"]`      `[key contains "val"]`      Used with `escaper`-directive, regexp
matches not  `[key not_regexp_contains "val"]`  `[key not contains "val"]`  special characters will not be escaped.

__cgiScript__ - URL to Korp CGI-script

__downloadCgiScript__ - URL to Korp download CGI-script

__backendURLMaxLength__ - Integer. The maximum length of URL (in bytes) to be passed to the backend. If the URL would be longer, use HTTP POST method instead of GET. The default is 8100, tailored for Apache’s default maximum HTTP request line length of 8190 bytes.

__wordpicture__ - Boolean. Enable word picture.

__statisticsCaseInsensitiveDefault__ - Boolean. Selects case-insensitive for "compile based on" by default.

__inputCaseInsensitiveDefault__ - Boolean. Selects case-insensitive for simple search by default.

__corpora__ - See [Corpora](#corpora)

__corpusListing__ - After specifying all corpora in a modes-file use:
`settings.corpusListing = new CorpusListing(settings.corpora);` to enable the configuration. For parallel corpora use: `settings.corpusListing = new ParallelCorpusListing(settings.corpora);`

__corporafolders__ - Create a directory-structure in corpus chooser. Example:

    settings.corporafolders.foldername = {
        title: "A folder",
        contents: ["corpus1", "corpus2"],
        description: "Optional description"
    };

    settings.corporafolders.foldername.subfolder = {
        title: "A sub folder",
        contents: ["corpus3", "corpus4"]
    }

__corpusfolderNonSubfolderProperties__ - Array of corpus folder property names *not* to be treated as subfolder ids, in addition to `"title"`, `"contents"` and `"description"` (default: []).

__preselectedCorpora__ - An array of corpus (internal) names or folder names. Given corpora and corpora in folders will be selected on load. To select only a subfolder write `folder.subfolder`.

__handleUnavailableCorpora__ - Specify how to handle corpora defined in the configuration but not found by the backend. Supported values are:

- `"none"` or `"fatal"`: no handling: an undefined corpus causes an error that stops loading Korp; the default if no value is specified;
- `"error"`: error on the console;
- `"warn"`: warning on the console; and
- `"log"`: normal log message on the console.

Note that filtering out unavailable corpora requires that the backend command `/corpus_info` understands the parameter `report_undefined_corpora`.

Handling unavailable corpora results in a somewhat slower startup of Korp, so it could be enabled only for development environments, so that the production environment would have a slightly faster startup.

__allowNoPreselectedCorpora__ - Boolean. If `true`, an empty or undefined `preselectedCorpora` means that no corpora are initially selected instead of having all unprotected corpora selected.

__mapEnabled__ - See [Map](#map).

__newMapEnabled__ - Renamed to `mapEnabled`.

__mapCenter__ - See [Map](#map).

__hitsPerPageValues__ - An array of possible number of hits per page for example: `[25,50,75,100]`

__hitsPerPageDefault__ - The number of hits per page that Korp should select by default. If emitted, fallback value is the first element in `hitsPerPageValues`

__startLang__ - The default in the language dropdown for parallel Korp, for example: `"swe"`

__isKorpLabsURL__ - A function which returns `true` if Korp should run as Korp Labs, based on `window.location` passed as the argument. If the function is not defined, Korp runs as Korp Labs if the second component of `window.location.pathname` is `"korplabb"`. Korp Labs can be used to test upcoming changes to Korp and it may have a different mode selection than the production Korp.

__logoKorpVersion__ - The Korp version number string to be shown in the Korp logo; default: the current version for production Korp (non-Korp Labs) and the current version plus one for Korp Labs, prefixed with a `v`.

__modeSwitchRestoreParams__ - Boolean (default: `false`). Save and restore Korp parameters when switching modes within a page session, so the user can return to the same search after visiting another mode. The parameters listed in `modeSwitchRestoreParamsExclude` are not restored.

__modeSwitchRestoreParamsExclude__ - Array of strings. Do not save and restore the parameters whose names are listed in this array when switching modes even if `modeSwitchRestoreParams` is `true`. The default is `["lang"]`: the user interface language is not saved or restored.

# Developing the Korp Frontend

Here is where we present details on how to install development dependencies for the Korp frontend and how to build and distribute the frontend code.

## Source code

The source code is available on [Github][github-frontend].

## Setting up the development environment

The Korp frontend uses a plethora of technologies and has a corresponding amount of dependencies. Luckily, a set of package managers do all the heavy lifting and so you should be up and running in no time. Simply follow these steps:

* Install Yarn
* Fetch the latest Korp source release.
* `cd` to the Korp folder you just checked out and run `yarn` in order to fetch the local dependencies. This includes libs for compiling transpiling JavaScript, building, running a dev server, as well as the required client side JavaScript libs utilized directly by Korp.

You are now ready to start the dev server, do so by running `yarn dev`. In you browser, open `http://localhost:9111` to launch Korp. Now, as you edit the Korp code, JavaScript and Sass files are automatically compiled/transpiled as required, additionally causing the browser window to be reloaded to reflect the new changes.

In practice, settings must be made, either for your own instance of the Korp backend or using Språkbankens. To test Språkbankens setup, fetch our [settings
repository][github-frontend] from Github and add `run_config.json` to the codebase-directory with this content: 

```
{
    "configDir": "../korp-frontend-sb/app"
}
```

Adapt the path to where the repository is stored.

## Localization

Korp does runtime DOM manipulation when the user changes language. Using an Angular filter to specify which translation key looks like this:

    <div>{{'my_key' | loc}}</div>

[Deprecation warning] Before the Angular approach we used the `rel` attribute, like so (but you shouldn't any more):
  `<span rel="localize[translation_key]">...</span>`

## Map

Modify the map with configuration, `scripts/map_controllers.coffee` or the [Geokorp-component](https://github.com/spraakbanken/korp-geo). Geokorp wraps [Leaflet][leaflet] and adds further functionality such as integration with Angular, marker clustering, marker styling and information when selecting a marker. 

## Building a distribution

Building a distribution is as simple as running the command `yarn build`. A `dist` folder is created. These are the files to use for production deployment. The build system performs concatenation and minimization of JavaScript and CSS source files, giving the resulting code a lighter footprint.

[MIT]: https://opensource.org/licenses/MIT
[angular-i18n]: https://github.com/angular/bower-angular-i18n
[leaflet]: http://leafletjs.com/
[github-frontend]: https://github.com/spraakbanken/korp-frontend/
[frontend-settings]: https://github.com/spraakbanken/korp-frontend-sb/
