
# Changes in corpus configuration in Korp 9

Corpus configurations have a number of changes in Korp 9 compared with
the previous Korp 5, summarized below. Some of them are due to changes
in Korp code, others are conventions in the Language Bank of Finland.
Please see the [main Korp corpus configuration
documentation](korp-corpus-config.md) for more information.

## Git repository branches

Korp configurations are under the `config/` branch namespace,
separated from main Korp code. When adding the configuration for a new
corpus, create a new branch `config/`*corpus* based on
`config/master`, where *corpus* is the short name of the corpus.

## Camel-casing

CamelCase is used in most fixed property names instead of underscores:
for example, `structAttributes` (previously `struct_attributes`). This
is not completely consistent, however, and may change over time, so
please check the usage in the configuration files. Moreover, property
names corresponding to attribute names retain underscores.

## Predefined values of properties `opts`, `context` and `within`

The predefined values of properties `opts`, `context` and `within` are
of the form `options.`*name*, `context.`*name* and `within.`*name*,
without a `settings.` prefix: for example, `options.lite`,
`context.default`, `within.sp` (previously, `settings.liteOptions`,
`settings.defaultContext` and `settings.spWithin`, respectively).

## Translations of attribute values

Translations of attribute values are defined in the `translation`
property of a corpus configuration instead of in the
`app/translations/corpora-`*lg*`.json` files. For example:

```javascript
        sentence_type: {
            label: "sentence_type",
            extendedComponent: "datasetSelect",
            opts: options.lite,
            dataset: {
                'comment':'comment',
                'verse':'verse',
            },
            translation: {
                "comment": {
                    "en": "comment",
                    "fi": "suorasanainen osuus",
                    "sv": "komment",
                },
                "verse": {
                    "en": "verse",
                    "fi": "runosäe",
                    "sv": "vers",
                },
            },
        },
```

If the same translations are used in many corpora, add a new
translation object to `transl`.

In contrast, translations of attribute *labels* (such as
`sentence_type` above) are still defined in the JSON translation
files.

## Attributes with selection lists

Attributes to be shown as selection lists in the extended search have
new options, chosen with the value of the property `extendedComponent`
of an attribute configuration:

1. `"datasetSelect"`: Use if the values are enumerated in the
   `dataset` property of an attribute configuration.
2. `"structServiceSelect"`: Make Korp retrieve the values from the
   corpus data, so they need not be listed in `dataset`. The values
   are shown in a normal selection list.
3. `"structServiceAutocomplete"`: Similar to `"structServiceSelect"`,
   but Korp shows the values as an autocompleting list.

Note that `displayType: "select"` no longer has an effect.

## No corpora at the top-level

All corpora should be within some corpus folder. In general, top-level
folders correspond to CLARIN resource families.

## Configuration functions in `funcs`

Functions used in corpus configurations are contained in object
`funcs` (previously, `settings.fn`). The names of the functions
defined in `app/modes/common.js` have been converted to camel case.

## Beta and test status in `status`

The beta and test status for a corpus are specified by adding the
property `status: "beta"` (or `"test"`) to the corpus configuration
(or to the `info` object of a corpus folder), instead of `labels:
["beta"]`.
