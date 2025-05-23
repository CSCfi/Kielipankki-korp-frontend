
# Frontend configuration for the Korp of the Language Bank of Finland

This is branch `config/master` (or a derivative of it) of the [Korp
frontend repository of the Language Bank of Finland
(Kielipankki)](https://github.com/CSCfi/Kielipankki-korp-frontend).
This branch contains the configuration for the [Korp
frontend](https://korp.csc.fi/korp/) of the [Language Bank of
Finland](https://www.kielipankki.fi/language-bank/), including corpus
configurations and some modifications to the Korp user interface
specific to the Language Bank of Finland.

Please see [`doc/korp-corpus-config.md`](doc/korp-corpus-config.md)
for more information on configuring corpora for Korp.

---

Configuration specific for Språkbankens instance of Korp.

For usage instructions check [the korp-frontend repository](https://github.com/spraakbanken/korp-frontend#run_configjson).

# Korp at Språkbanken

## Branches

`dev` is used to build the frontend at https://spraakbanken.gu.se/korplabb

`master` is used to build the frontend at https://spraakbanken.gu.se/korp

More info in [RELEASE.md](./RELEASE.md)

Use the same branch for both `korp-frontend` and `korp-frontend-sb` repositories.

## Test

End-to-end tests, see main repository.

There are also some manual test cases in [test/testcases.md](./test/testcases.md).

## Special modes

- Parallel - special KWIC mainly
- Mink - fetches the list of corpora from Mink instead of the backend

## Backends

There are two backends (at least):
https://ws.spraakbanken.gu.se/ws/korp/v8/ (korpsrv)
https://ws.spraakbanken.gu.se/ws/korp/mink/ (gu-it, direct url: https://spraakbanken3.it.gu.se/korp/)

## Custom code / plugins

A rudimentary plugin system exists for parts of the application. Sometimes the code is written in a modes file and sometimes in the folder `app/custom`  (`korp-frontend-sb` ).

## Static `corpus_config` response

If the servers are slow, waiting for the `corpus_config` response when developing can be frustrating. To skip that request, save the response to `app/modes/<mode>_corpus_config.json` and it will be loaded directly from there instead.

## Angular.js

### Directives/components binding

https://blog.krawaller.se/posts/dissecting-bindings-in-angularjs/

About the different ways to pass values to components in Angular.js. Try to only use `<`. There are lots of examples of passing values and functions in the implemented components. Sometimes they do not use `<` even though they should.

Components are just a special case of directives, but they are much simpler so try to avoid directives.
