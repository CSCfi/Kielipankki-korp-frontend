This repo contains the frontend for [Korp](https://spraakbanken.gu.se/korp), 
a frontend for the IMS Open Corpus Workbench (CWB). The Korp frontend is a great
tool for searching and visualising natural language corpus data. 

Korp is developed by [Språkbanken](https://spraakbanken.gu.se) at the 
University of Gothenburg, Sweden. 

Documentation:
- [Frontend documentation](../master/doc/frontend_devel.md)
- [Backend documentation](https://github.com/spraakbanken/korp-backend/)
- Sparv - The pipeline used to tag and otherwise process raw Swedish-language corpus data is documented [here](https://spraakbanken.gu.se/sparv)
- [Our Korp configuration directory](https://github.com/spraakbanken/korp-frontend-sb/) (supplement to documentation)

# Getting started

Install `yarn`: `https://yarnpkg.com`

## Using `yarn`

- install all dependencies: `yarn`
- run development server: `yarn start`
- build a dist-version: `yarn build`
- run dist-version: `yarn start:dist`
- run tests: `yarn test` or `yarn test:karma` or `yarn test:e2e` (tests currently depend on Språkbankens setup).

Declare dependencies using `yarn add pkg`or `yarn add --dev pkg` for dev dependencies.

`npm` has not worked previously, but the status is unknown right now.

# webpack

We use *webpack* to build Korp and *webpack-dev-server* to run a local server. To include new code or resources, require
or use import them where needed:

```
import { aFunction } from 'new-dependency'
```

or

```
nd = require("new-dependency")
nd.aFunction()
```

or

```
imgPath = require("img/image.png")
myTemplate = `<img src='${imgPath}'>`
```

Most dependencies are only specified in `app/index.js` and where needed
added to the `window`-object.

About the current loaders in `webpack.config.js`:
- `pug` and `html` files: all `src`-attributes in `<img>` tags and all `href`s in `<link>` tags will be
  loaded by webpack and replaced in the markup. Uses file loader so that requiring a `pug`
  or `html` file will give the path to the file back.
- `js` files are added to the bundle
- all images and fonts are added to the bundle using file loader and gives back a file path.
- `css` and `scss` are added to the bundle. `url`s will be loaded and replaced by webpack.

In addition to this, some specific files will simply be copied as is, for example Korp mode-files.

## configuration

Use `config.yml` for settings needed in the frontend. In some cases, mode-files can be used. For example 
it is possible to have different backends for modes.

# Other instances

There are several instances of Korp, here are a list of some:

- [Språkbanken Text](https://spraakbanken.gu.se/korp/)
- [The Language Bank of Finland (Kielipankki)](https://korp.csc.fi)
- [Iceland / Stofnun Árna Magnússonar í íslenskum fræðum](https://malheildir.arnastofnun.is/)
- [Tromsø / Giellatekno](https://gtweb.uit.no/korp/)
- [Copenhagen / Institut for Nordiske Studier og Sprogvidenskab](https://alf.hum.ku.dk/korp/)
