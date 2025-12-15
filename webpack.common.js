/** @format */
const webpack = require("webpack")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin")

function getKorpConfigDirs() {
    fs = require("fs")
    let config = "app"
    let plugins = "app/plugins"
    try {
        json = fs.readFileSync("run_config.json", { encoding: "utf-8" })
        json_parsed = JSON.parse(json)
        config = json_parsed.configDir || "app"
        console.log('Using "' + config + '" as config directory.')
        plugins = json_parsed.pluginDir || config + "/plugins"
        console.log('Using "' + plugins + '" as plugin directory.')
    } catch (err) {
        console.error(err)
        console.log('No run_config.json given, using "app" as config and plugin directory (default).')
    }
    return [config, plugins]
}

const [korpConfigDir, korpPluginDir] = getKorpConfigDirs()

// Return an array of all the locale (language) codes LG from
// localization files filename-LG.json in the directories listed in
// array translDirs.
function getLocales(translDirs) {
    fg = require("fast-glob")
    let locales = new Set()
    for (let translDir of translDirs) {
        let fnames = fg.sync(translDir + "/*.json")
        // console.log("getLocales", translDir, fnames)
        for (let fname of fnames) {
            let basename = path.basename(fname, ".json")
            if (basename.indexOf("-") != -1) {
                locales.add(basename.split("-").slice(-1)[0])
            }
        }
    }
    // Return an array
    return [...locales]
}

// Return a value for the groupBy output specification of
// MergeJsonWebpackPlugin: merge into <filenamePrefix>-LG.json all
// JSON files <filenamePrefix>*-LG.json with the same language code LG
// found under "translations" subdirectories of the directories listed
// in array translBasedirs.
function makeMergeJsonGroupBy(filenamePrefix, translBasedirs) {
    const translDirs = translBasedirs.map(dir => dir + "/translations")
    const multipleDirs = translDirs.length > 1
    const pattBegin = multipleDirs ? "{" : ""
    const pattEnd = multipleDirs ? "}" : ""
    // console.log(translDirs)
    const groupBy = getLocales(translDirs).map(locale => (
        {
            pattern:
                pattBegin +
                translDirs.map(
                    dir => `${dir}/${filenamePrefix}*-${locale}.json`)
                .join(",") +
                pattEnd,
            fileName: `translations/${filenamePrefix}-${locale}.json`,
        }))
    // console.log(groupBy)
    return groupBy
}

const {accessSync, constants: {R_OK}} = require('fs');

const exists = filename => {
    try {
        accessSync(filename, R_OK);
        return true;
    } catch (err) {
        return false;
    }
};

// A Pug plugin to search for files to be included from multiple
// directories specified as the paths argument. paths may contain
// wildcards as recognized by fast-glob, which allows recursive search
// by using "**".
//
// To enable non-default behaviour, the filename of the include
// directive needs to be prefixed with options between two colons,
// separated by commas; for example:
//     include :search,optional:includes/file
// The following options are recognized:
// - search: Search paths for file and include the first one, unless
//   option "all" is also specified
// - all: Include all the files found in the order of paths (only in
//   conjunction with "search")
// - optional: No error if no file is found
//
// Inspired by
// https://github.com/pugjs/pug/issues/2499#issuecomment-241927949
//
// TODO:
// - When including the contents of all found files, sort them
//   somehow. A way to do this could be to suffix file names with a
//   double-digit number: "include :search,all:file" would include
//   "file-10.pug" and "file-20.pug", in this order. Another option
//   could be to list names (or patterns) for paths in the order in
//   which they should be considered as an argument to option "all";
//   for example, "include :search,all=plugin1+plugin2"; non-matching
//   ones would be included in an arbitrary order after the matching
//   ones (or maybe optionally not included).
function PugMultiplePathsPlugin ({paths = []}) {
    let load = require("pug-load")
    const fg = require("fast-glob")
    return {
        name: 'multiplePaths',
        // Resolve filename to a fully-resolved path or multiple paths
        // separated by vertical bars (resolve has to return a string)
        resolve (filename, source, options) {
            let out = ""
            let fileopts = {}
            // console.log("resolve", filename, source, options, paths)
            // Extract possible file options
            const extractFileOptions = function (filename) {
                let fileopts = {}
                if (filename.startsWith(":")) {
                    filename = filename.slice(1)
                    const colonpos = filename.indexOf(":")
                    fileoptStr = filename.slice(0, colonpos)
                    fileoptStr.split(",").forEach(opt => fileopts[opt] = true)
                    filename = filename.slice(colonpos + 1)
                }
                return [filename, fileopts]
            };
            // Get the subdirectory of filename relative to basedir
            const getRelativeSubdir = function (basedir, filename) {
                // console.log("getRelativeSubdir", basedir, filename)
                if (! filename.startsWith(basedir)) {
                    return ""
                }
                let filenameRel = filename.slice(basedir.length + 1)
                let lastSlashPos = filenameRel.lastIndexOf("/")
                if (lastSlashPos == -1) {
                    // filename is directly in basedir
                    return ""
                }
                // Include trailing slash
                return filenameRel.slice(0, lastSlashPos + 1)
            };
            [filename, fileopts] = extractFileOptions(filename)
            // console.log("fileopts =", fileopts)
            if (paths.length > 0 && fileopts.search) {
                // If file options contains "search", search for
                // filename in each of paths
                // Include the subdirectory relative to basedir
                filename = getRelativeSubdir(options.basedir, source) + filename
                for (let pth of paths) {
                    if (fg.isDynamicPattern(pth)) {
                        // fast-glob returns paths in arbitrary order,
                        // so sort the result
                        let fnames = fg.sync(pth + "/" + filename).sort()
                        // console.log("globbed fnames", pth, filename, fnames)
                        if (fnames.length > 0) {
                            if (! fileopts.all) {
                                return fnames[0]
                            }
                            out += "|" + fnames.join("|")
                        }
                    } else {
                        let fname = path.resolve(pth, filename)
                        // console.log("exists", pth, filename, fname, exists(fname))
                        if (exists(fname)) {
                            // Return the first one found, unless the file
                            // option "all" has been specified
                            if (! fileopts.all) {
                                return fname
                            }
                            out += "|" + fname
                        }
                    }
                }
                // Strip leading vertical bar
                out = out.slice(1)
                // If not found and option "optional" not specified,
                // throw an error
                if (! out && ! fileopts.optional) {
                    let pathstr = paths.join(", ")
                    throw new Error(
                        `${filename} cannot be found in any of the specified`
                        + `directories: ${pathstr}`)
                }
            } else {
                // The default include behaviour
                out = load.resolve(filename, source, options)
                if (! exists(out) && fileopts.optional) {
                    out = ""
                }
            }
            // console.log("out =", out)
            return out
        },
        read (filename, options) {
            // Return the content of filename. filename may contain
            // multiple file names separated by vertical bars, in
            // which case the contents of the files are concatenated.
            // console.log("read", filename)
            // Skip empty file names, as that means that an optional
            // include file was not found.
            if (! filename) {
                return ""
            }
            let out = ""
            let filenames = filename.split("|")
            for (let fname of filenames) {
                out += load.read(fname, options)
                // console.log("read", fname)
            }
            // console.log("read:out", out)
            return out
        },
    };
}

const pugMultiplePathsPlugin = PugMultiplePathsPlugin({
    paths: [
        path.resolve(korpConfigDir),
        // Search under all plugin directories
        path.resolve(`${korpConfigDir}/plugins/**`),
        path.resolve(`${korpPluginDir}/**`),
        path.resolve("app/plugins/**"),
        "app",
    ]
})


module.exports = {
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, "node_modules/jquery/src/jquery"),
            jreject: path.resolve(__dirname, "app/lib/jquery.reject"),
            jquerylocalize: path.resolve(__dirname, "app/lib/jquery.localize"),
            jqueryhoverintent: path.resolve(__dirname, "app/lib/jquery.hoverIntent"),
            configjs: path.resolve(korpConfigDir, "config.js"),
            commonjs: path.resolve(korpConfigDir, "modes/common.js"),
            defaultmode: path.resolve(korpConfigDir, "modes/default_mode.js"),
            custom: path.resolve(korpConfigDir, "custom/"),
            '@': path.resolve(__dirname, "app/scripts"),
            customplugins: path.resolve(korpPluginDir),
            configplugins: path.resolve(korpConfigDir, "plugins/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.json"),
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: require.resolve(
                    path.resolve(__dirname, "app/scripts/cqp_parser/CQPParser.js")
                ),
                use: "imports-loader?this=>window",
            },
            {
                test: /\.pug$/i,
                exclude: [
                    // does not work
                    path.resolve(__dirname, "app/index.pug"),
                ],
                use: [
                    { loader: "file-loader" },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "" },
                    },
                    { loader: "html-loader" },
                    { loader: "pug-html-loader" },
                ],
            },
            {
                test: /index.pug$/,
                use: [
                    { loader: "file-loader?name=index.html" },
                    {
                        loader: "extract-loader",
                        options: { publicPath: "" },
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            // TODO we should not pretty-print HTML, but removing this
                            // option will result in that some elements get closer together
                            // and need to be fixed with CSS
                            pretty: true,
                            basedir: path.resolve(__dirname, "app"),
                            plugins: pugMultiplePathsPlugin,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            conservativeCollapse: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=[name].[contenthash].[ext]",
            },
            {
                test: /\.ico$/i,
                loader: "file-loader?name=[name].[ext]",
            },
            {
                test: /\.otf$/i,
                loader: "file-loader",
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/font-woff",
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/octet-stream",
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // plugins: () => [require("tailwindcss"), require("autoprefixer")],
                            // sourceMap: process.env.NODE_ENV !== "production",
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production",
                            // sourceMapContents: false
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: korpConfigDir + "/modes/*mode.js",
                    to: "modes/[name].[ext]",
                },
                {
                    from: korpConfigDir + "/modes/*html",
                    to: "modes/[name].[ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: korpConfigDir + "/markup/*html",
                    to: "markup/[name].[ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: korpConfigDir + "/corpus_info/*.json",
                    to: "corpus_info/[name].[ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "app/translations/angular-locale_*.js",
                    to: "translations/[name].[ext]",
                },
                {
                    from: "app/markup/msdtags.html",
                    to: "markup",
                },
                // This is now handled using MergeJsonWebpackPlugin below
                // {
                //     from: "app/translations/locale-*.json",
                //     to: "translations/[name].[ext]",
                // },
                {
                    from: korpConfigDir + "/translations/corpora-*.json",
                    to: "translations/[name].[ext]",
                },
                {
                    from: korpConfigDir + "/translations/angular-locale_*.js",
                    to: "translations/[name].[ext]",
                },
                {
                    from: "app/lib/deptrees/",
                    to: "lib/deptrees",
                },
            ],
        }),
        // Merge the locale*-LG.json files in app/translations,
        // app/plugins/**/translations,
        // <korpPluginDir>/**/translations,
        // <korpConfigDir>/translations and
        // <korpConfigDir>/plugins/**/translations into
        // translations/locale-LG.json, so that plugins may contain
        // translations and the configuration may override default
        // translations.
        new MergeJsonWebpackPlugin({
            // "debug": true,
            "output": {
                "groupBy": makeMergeJsonGroupBy(
                    "locale",
                    [
                        "app",
                        "app/plugins/**",
                        `${korpPluginDir}/**`,
                        korpConfigDir,
                        // Plugin translations could also be
                        // overridden in korpConfigDir/translations,
                        // but this may make it easier to separate
                        // plugin translations in the configuration.)
                        `${korpConfigDir}/plugins/**`,
                    ]),
            },
            "space": 1,
            "globOptions": {
                "nosort": true
            }
        }),
    ],
    entry: {
        bundle: "./app/index.js",
        worker: "./app/scripts/statistics_worker.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "this",
        hashFunction: "xxhash64",
    },
}
