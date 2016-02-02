window.util = {}


class window.CorpusListing
    constructor: (corpora) ->
        @struct = corpora
        @corpora = _.values(corpora)
        @selected = _.filter @corpora, (corp) -> not corp.limited_access

    get: (key) ->
        @struct[key]

    list: ->
        @corpora

    map: (func) ->
        _.map @corpora, func

    subsetFactory : (idArray) ->
        #returns a new CorpusListing instance from an id subset.
        idArray = _.invoke(idArray, "toLowerCase")
        cl = new CorpusListing _.pick @struct, idArray...
        cl.selected = cl.corpora
        return cl


    # Returns an array of all the selected corpora's IDs in uppercase
    getSelectedCorpora: ->
        corpusChooserInstance.corpusChooser "selectedItems"

    select: (idArray) ->
        @selected = _.values(_.pick.apply(this, [@struct].concat(idArray)))

    mapSelectedCorpora: (f) ->
        _.map @selected, f


    # takes an array of mapping objs and returns their intersection
    _mapping_intersection: (mappingArray) ->

        _.reduce mappingArray, ((a, b) ->
            keys_intersect = _.intersection (_.keys a), (_.keys b)
            to_mergea = _.pick a, keys_intersect...
            to_mergeb = _.pick b, keys_intersect...
            _.merge {}, to_mergea, to_mergeb
        ) or {}

    _mapping_union: (mappingArray) ->
        _.reduce mappingArray, ((a, b) ->
            _.merge a, b
        ), {}

    getCurrentAttributes: ->
        attrs = @mapSelectedCorpora((corpus) ->
            corpus.attributes
        )
        @_invalidateAttrs attrs

    getCurrentAttributesIntersection : () ->
        attrs = @mapSelectedCorpora((corpus) ->
            corpus.attributes
        )

        @_mapping_intersection attrs

    getStructAttrsIntersection: () ->
        attrs = @mapSelectedCorpora((corpus) ->
            for key, value of corpus.struct_attributes
                value["isStructAttr"] = true

            corpus.struct_attributes
        )
        @_mapping_intersection attrs

    
    getStructAttrs: ->
        attrs = @mapSelectedCorpora((corpus) ->
            for key, value of corpus.struct_attributes
                value["isStructAttr"] = true
            
            # if a position attribute is declared as structural, include here
            pos_attrs = _.pick corpus.attributes, (val, key) ->
                val.isStructAttr
            _.extend {}, pos_attrs, corpus.struct_attributes
        )
        rest = @_invalidateAttrs(attrs)

        # fix for combining dataset values
        withDataset = _.filter(_.pairs(rest), (item) ->
            item[1].dataset
        )
        $.each withDataset, (i, item) ->
            key = item[0]
            val = item[1]
            $.each attrs, (j, origStruct) ->
                if origStruct[key]?.dataset
                    ds = origStruct[key].dataset
                    ds = _.object(ds, ds) if $.isArray(ds)

                    val.dataset = (_.object val.dataset, val.dataset) if _.isArray val.dataset
                    $.extend val.dataset, ds


        $.extend rest, _.object(withDataset)

    _invalidateAttrs: (attrs) ->
        union = @_mapping_union(attrs)
        intersection = @_mapping_intersection(attrs)
        $.each union, (key, value) ->
            unless intersection[key]?
                value["disabled"] = true
            else
                delete value["disabled"]

        union
    
    # returns true if coprus has all attrs, else false
    corpusHasAttrs: (corpus, attrs) ->
        for attr in attrs
            unless attr == "word" or attr of $.extend({}, @struct[corpus].attributes, @struct[corpus].struct_attributes)
                return false
        return true

    stringifySelected: ->
        _(@selected).pluck("id").invoke("toUpperCase").join ","

    stringifyAll: ->
        _(@corpora).pluck("id").invoke("toUpperCase").join ","

    getWithinKeys: () ->
        struct = _.map(@selected, (corpus) ->
            _.keys corpus.within
        )
        _.union struct...

    # Change the properties type and "default"type of the object
    # params, where type is "within" or "context", if that results in
    # a shorter overall value, to be passed to the Korp backend as
    # query parameters. (This reduces the chance of producing URLs too
    # long for the server.) The method chooses as the default value
    # the one that would result in the longest value as the
    # corpus-specific parameter. Modifying the values computed
    # elsewhere is simpler than trying to find out exactly how (or
    # based on what data) the values are computed and to do the same.
    # (Jyrki Niemi 2015-09-11)
    minimizeDefaultAndCorpusQueryString: (type, params) ->
        if not (params.corpus? and params[type])
            return params
        all_corpora = params.corpus.split(',')
        c.log('minimize', type, params.corpus, params['default' + type],
              params[type], params[type].length)
        default_val = params['default' + type]
        value_corpora = {}
        nondefault_corpora = []
        for corpval in params[type].split(',')
            [corpname, val] = corpval.split(':')
            value_corpora[val] ?= []
            value_corpora[val].push(corpname)
            nondefault_corpora.push(corpname)
        default_corpora = _.difference(all_corpora, nondefault_corpora)
        value_corpora[default_val] =
            (value_corpora[default_val] or []).concat(default_corpora)
        # Find the longest value
        lengths = []
        for val, corpora of value_corpora
            lensum = 0
            for corp in corpora
                lensum += corp.length
            lengths.push(
                value: val
                # Also count URL-encoded commas and colons to be added
                # between corpus names, and corpus names and parameter
                # values
                length: lensum + (corpora.length * (val.length + 6)) -
                        if corpora.length == 1 then 3 else 0
            )
        maxval = _.max(lengths, 'length').value
        c.log 'minimizing', type, value_corpora, lengths, maxval
        if maxval == default_val and default_corpora.length > 0
            return params
        params['default' + type] = maxval
        # c.log maxval, params
        # Construct the non-default value string
        other_vals = []
        for val, corpora of value_corpora when val != maxval
            # c.log val, corpora
            other_vals = other_vals.concat(
                [corp + ':' + val for corp in corpora])
        # c.log other_vals
        params[type] = other_vals.join(',')
        c.log('minimized', type, params['default' + type], params[type],
              params[type].length)
        if params[type] == ''
            delete params[type]
        return params

    minimizeWithinQueryString: (params) ->
        @minimizeDefaultAndCorpusQueryString 'within', params

    minimizeContextQueryString: (params) ->
        @minimizeDefaultAndCorpusQueryString 'context', params

    getContextQueryString: (prefer, avoid) ->
        output = for corpus in @selected
            contexts = _.keys corpus.context
            if prefer not in contexts
                if contexts.length > 1 and avoid in contexts
                    contexts.splice (contexts.indexOf avoid), 1
                corpus.id.toUpperCase() + ":" + contexts[0]
        return _(output).compact().join()

    getWithinParameters: () ->
        defaultWithin = search().within or _.keys(settings.defaultWithin)[0]

        output = for corpus in @selected
            withins = _.keys corpus.within
            if defaultWithin not in withins
                corpus.id.toUpperCase() + ":" + withins[0]
        within = _(output).compact().join()
        return { defaultwithin : defaultWithin, within : within }

    # The above getWithinParameters replaces getWithinQueryString as
    # 2015-11. Should we modify getWithinParameters similarly, or does
    # it work as the modified getWithinQueryString?
    # (Jyrki Niemi 2015-11-19)
    getWithinQueryString: ->
        # If the URL parameter within is other than the default, use
        # it for the corpora that have it in their within property.
        # (Jyrki Niemi 2015-08-26)
        prefer_within = search().within
        if prefer_within and prefer_within not of settings.defaultWithin
            output = for corpus in @selected
                if prefer_within of corpus.within
                    corpus.id.toUpperCase() + ":" + prefer_within
                else
                    false
            _(output).flatten().compact().join()
        else
            null

        # The original version was as follows. If a corpus has a
        # property within with more than one value other than that in
        # defaultWithin, each of them generates a CORPUS:within pair
        # to the output. Why? (Jyrki Niemi 2015-08-26)

        # output = for corpus in @selected
        #     withins = _.keys(corpus.within)
        #     for within in withins
        #         if within and within not of settings.defaultWithin
        #             corpus.id.toUpperCase() + ":" + within
        #         else
        #             false

        # _(output).flatten().compact().join()

    getMorphology: ->
        _(@selected).map((corpus) ->
            morf = corpus.morf or "saldom"
            morf.split "|"
        ).flatten().unique().join "|"

    getTimeInterval : ->
        all = _(@selected)
            .pluck("time")
            .filter((item) -> item?)
            .map(_.keys)
            .flatten()
            .map(Number)
            .sort((a, b) ->
                a - b
            ).value()


        return [_.first(all), _.last(all)]
        

    getMomentInterval : () ->
        toUnix = (item) -> item.unix()

        infoGetter = (prop) =>
            return _(@selected) 
            .pluck("info")
            .pluck(prop)
            .compact()
            .map((item) -> moment(item))
            .value()
        


        froms = infoGetter("FirstDate")
        tos = infoGetter("LastDate")

        unless froms.length
            from = null
        else
            from = _.min froms, toUnix
        unless tos.length
            to = null
        else
            to = _.max tos, toUnix
        
        # c.log "first", infoGetter("FirstDate")
        [from, to]


    getNonProtected : () ->
        _.filter @corpora, (item) ->
            not item.limited_access

    getTitle : (corpus) ->
        try
            @struct[corpus].title
        catch e
            c.log "gettitle broken", corpus 
        


    getAttributeGroups : (lang) ->
        word =
            group : "word"
            value : "word"
            label : "word"
        
        attrs = for key, obj of @getCurrentAttributes(lang) when obj.displayType != "hidden"
            _.extend({group : "word_attr", value : key}, obj)

        common_keys = _.compact _.flatten _.map @selected, (corp) -> _.keys corp.common_attributes
        common = _.pick settings.common_struct_types, common_keys...

        sent_attrs = for key, obj of (_.extend {}, common, @getStructAttrs(lang)) when obj.displayType != "hidden"
            _.extend({group : "sentence_attr", value : key}, obj)

        sent_attrs = _.sortBy sent_attrs, (item) ->
            util.getLocaleString(item.label)

        return [word].concat(attrs, sent_attrs)

    # List the unique values of the property ignore_between_tokens_cqp
    # of the selected corpora. (Jyrki Niemi 2015-09-25)
    getIgnoreBetweenTokens : ->
        _(@selected)
        .pluck("ignore_between_tokens_cqp")
        .uniq()
        .compact()
        .value()


class window.ParallelCorpusListing extends CorpusListing
    constructor: (corpora) ->
        super(corpora)

    select: (idArray) ->
        @selected = []
        $.each idArray, (i, id) =>
            corp = @struct[id]
            @selected = @selected.concat(@getLinked(corp, true, false))

        @selected = _.unique @selected

    setActiveLangs : (langlist) ->
        @activeLangs = langlist


    getCurrentAttributes: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.attributes, b.attributes
        , {})
        struct

    getStructAttrs: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.struct_attributes, b.struct_attributes
        , {})
        $.each struct, (key, val) ->
            val["isStructAttr"] = true

        struct

    getLinked : (corp, andSelf=false, only_selected=true) ->
        target = if only_selected then @selected else @struct
        output = _.filter target, (item) ->
            item.id in (corp.linked_to or [])
        output = [corp].concat output if andSelf
        output

    getEnabledByLang : (lang, andSelf=false, flatten=true) ->
        corps = _.filter @selected, (item) ->
            item["lang"] == lang
        output = _(corps).map((item) =>
            @getLinked item, andSelf
        ).value()

        if flatten then (_.flatten output) else output


    getLinksFromLangs : (activeLangs) ->
        if activeLangs.length == 1
            return @getEnabledByLang(activeLangs[0], true, false)
        # get the languages that are enabled given a list of active languages
        main = _.filter @selected, (corp) ->
            corp.lang == activeLangs[0]

        output = []
        for lang in activeLangs[1..]
            other = _.filter @selected, (corp) ->
                corp.lang == lang

            for cps in other
                linked = _(main).filter((mainCorpus) ->
                    cps.id in mainCorpus.linked_to
                ).value()

                output = output.concat _.map linked, (item) -> [item, cps]

        output

    stringifySelected : (onlyMain) ->

        struct = @getLinksFromLangs(@activeLangs)
        if onlyMain
            struct = _.map struct, (pair) =>
                _.filter pair, (item) =>
                    item.lang == @activeLangs[0]


            return _(struct).flatten().pluck("id").invoke("toUpperCase").join ","
        c.log("struct", struct)

        output = []
        # $.each(struct, function(i, item) {
        for item, i in struct
            main = item[0]

            pair = _.map item.slice(1), (corp) ->
                main.id.toUpperCase() + "|" + corp.id.toUpperCase()

            output.push(pair)
        return output.join(",")


    getTitle : (corpus) ->
        @struct[corpus.split("|")[1]].title



settings.corpusListing = new CorpusListing(settings.corpora)



window.applyTo = (ctrl, f) ->
    s = getScope(ctrl)
    s.$apply f(s)

window.search = (obj, val) ->
    s = $("body").scope()

    # ret = s.$root.$apply () ->
    ret = safeApply s.$root, () ->
        # if obj or val
        unless obj then return s.$root.search()
        if _.isObject obj
            obj = _.extend {}, s.$root.search(), obj
            s.$root.search(obj)
        else
            s.$root.search(obj, val)

    onHashChange() if val == null
    return ret



window.initLocales = () ->
    packages = ["locale", "corpora"]
    prefix = "translations"
    defs = []
    window.loc_data = {}
    def = $.Deferred()
    for lang in settings.languages
        loc_data[lang] = {}
        for pkg in packages
            do (lang, pkg) ->
                file = pkg + "-" + lang + '.json'
                file = prefix + "/" + file
                defs.push $.ajax
                    url : file,
                    dataType : "json",
                    cache : false,
                    success : (data) -> 
                        _.extend loc_data[lang], data
                        # $.localize.data[lang][pkg] = data;
                        # $.extend($.localize.data[lang]["_all"], data);

    $.when.apply($, defs).then () ->
        def.resolve loc_data

    return def


window.safeApply = (scope, fn) ->
    if (scope.$$phase || scope.$root.$$phase) then fn(scope) else scope.$apply(fn)

window.util.setLogin = () ->
    $("body").toggleClass("logged_in not_logged_in")
    
    # $.each authenticationProxy.loginObj.credentials, (i, item) ->
    for corp in authenticationProxy.loginObj.credentials
        $("#hpcorpus_#{corp.toLowerCase()}")
            .closest(".boxdiv.disabled").removeClass("disabled")
    if window.corpusChooserInstance
        window.corpusChooserInstance.corpusChooser "updateAllStates"

    $("#log_out .usrname").text(authenticationProxy.loginObj.name)
    $(".err_msg", self).hide()



util.SelectionManager = ->
    @selected = $()
    @aux = $()
    return

util.SelectionManager::select = (word, aux) ->
    return if not word? or not word.length
    if @selected.length
        @selected.removeClass "word_selected token_selected"
        @aux.removeClass "word_selected aux_selected"
    @selected = word
    @aux = aux or $()
    @aux.addClass "word_selected aux_selected"
    word.addClass "word_selected token_selected"

util.SelectionManager::deselect = ->
    return unless @selected.length
    @selected.removeClass "word_selected token_selected"
    @selected = $()
    @aux.removeClass "word_selected aux_selected"
    @aux = $()
    return

util.SelectionManager::hasSelected = ->
    @selected.length > 0

util.getLocaleString = (key, lang) ->
    # lang = (if $("body").scope() then $("body").scope().lang) or settings.defaultLanguage or "sv"
    unless lang
        lang = window.lang or settings.defaultLanguage or "sv"

    try
        return loc_data[lang][key] or key
    catch e
        return key


util.localize = (root) ->
    root = root or "body"
    $(root).localize()
    return

util.lemgramToString = (lemgram, appendIndex) ->
    lemgram = _.str.trim(lemgram)
    infixIndex = ""
    concept = lemgram
    infixIndex = ""
    type = ""
    if util.isLemgramId(lemgram)
        match = util.splitLemgram(lemgram)
        infixIndex = $.format("<sup>%s</sup>", match.index) if appendIndex? and match.index isnt "1"
        concept = match.form.replace(/_/g, " ")
        type = match.pos.slice(0, 2)
    return $.format "%s%s <span class='wordclass_suffix'>(<span rel='localize[%s]'>%s</span>)</span>", [
        concept
        infixIndex
        type
        util.getLocaleString(type)
    ]

util.saldoRegExp = /(.*?)\.\.(\d\d?)(\:\d+)?$/
util.saldoToString = (saldoId, appendIndex) ->
    match = saldoId.match(util.saldoRegExp)
    infixIndex = ""
    infixIndex = $.format("<sup>%s</sup>", match[2]) if appendIndex? and match[2] isnt "1"
    $.format "%s%s", [
        match[1].replace(/_/g, " ")
        infixIndex
    ]

util.sblexArraytoString = (idArray, labelFunction) ->
    labelFunction = labelFunction or util.lemgramToString
    return _.map idArray, (lemgram) -> labelFunction lemgram, true

    # TODO: remove this if all is well with the lemgram dropdown
    # tempArray = $.map(idArray, (lemgram) ->
    #     labelFunction lemgram, false
    # )
    # out = $.map idArray, (lemgram) ->
    #     isAmbigous = $.grep(tempArray, (tempLemgram) ->
    #         tempLemgram is labelFunction(lemgram, false)
    #     ).length > 1
    #     labelFunction lemgram, isAmbigous
    # return out


util.lemgramRegexp = /\.\.\w+\.\d\d?(\:\d+)?$/
util.isLemgramId = (lemgram) ->
    lemgram.search(util.lemgramRegexp) isnt -1

util.splitLemgram = (lemgram) ->
    unless util.isLemgramId(lemgram)
        throw new Error("Input to util.splitLemgram is not a lemgram: " + lemgram)
    keys = ["morph", "form", "pos", "index", "startIndex"]
    splitArray = lemgram.match(/((\w+)--)?(.*?)\.\.(\w+)\.(\d\d?)(\:\d+)?$/).slice(2)
    _.object keys, splitArray

util.splitSaldo = (saldo) ->
    saldo.match util.saldoRegExp

# Add download links for other formats, defined in
# settings.downloadFormats (Jyrki Niemi <jyrki.niemi@helsinki.fi>
# 2014-02-26/04-30)

util.setDownloadLinks = (xhr_settings, result_data) ->
    # If some of the required parameters are null, return without
    # adding the download links.
    if ! (xhr_settings? and result_data? and
            result_data.corpus_order? and result_data.kwic?)
        c.log 'failed to do setDownloadLinks'
        return

    # Get the number (index) of the corpus of the query result hit
    # number hit_num in the corpus order information of the query
    # result.
    get_corpus_num = (hit_num) ->
        result_data.corpus_order.indexOf result_data.kwic[hit_num].corpus

    c.log 'setDownloadLinks data:', result_data
    $('#download-links').empty()
    # Corpora in the query result
    result_corpora = result_data.corpus_order.slice(
        get_corpus_num(0), get_corpus_num(result_data.kwic.length - 1) + 1)
    # Settings of the corpora in the result, to be passed to the
    # download script
    result_corpora_settings = {}
    i = 0
    while i < result_corpora.length
        corpus_ids = result_corpora[i].toLowerCase().split('|')
        j = 0
        while j < corpus_ids.length
            corpus_id = corpus_ids[j]
            result_corpora_settings[corpus_id] = settings.corpora[corpus_id]
            j++
        i++
    i = 0
    while i < settings.downloadFormats.length
        format = settings.downloadFormats[i]
        link_id = format + '-link'
        # NOTE: Using attribute rel="localize[...]" to localize the
        # title attribute requires a small change to
        # lib/jquery.localize.js. Without that, we could use
        # util.getLocaleString, but it would not change the
        # localizations immediately when switching languages but only
        # after reloading the page.
        # # title = util.getLocaleString('formatdescr_' + format)
        $('#download-links').append(
            '<a href="javascript:" ' + ' id="' + link_id + '"' +
            ' title="' + format + '"' +
            ' rel="localize[formatdescr_' + format + ']"' +
            ' class="download_link"><img src="img/' + format + '.png" alt="' +
            format.toUpperCase() + '" /></a>')
        download_params =
            query_params: JSON.stringify(
                $.deparam.querystring(xhr_settings.url))
            format: format
            korp_url: window.location.href
            korp_server_url: settings.cgi_script
            corpus_config: JSON.stringify(result_corpora_settings)
            # corpus_config_info_keys previously excluded "urn", but
            # now it is included if listed in
            # settings.corpusExtraInfoItems. Does it matter?
            corpus_config_info_keys:
                (settings.corpusExtraInfoItems or []).join(',')
            urn_resolver: settings.urnResolver
        if 'downloadFormatParams' of settings
            if '*' of settings.downloadFormatParams
                $.extend download_params, settings.downloadFormatParams['*']
            if format of settings.downloadFormatParams
                $.extend download_params, settings.downloadFormatParams[format]
        $('#' + link_id).click ((params) ->
            (e) ->
                $.generateFile settings.download_cgi_script, params
                e.preventDefault()
                return
        )(download_params)
        i++
    $('#download-links').localize()
    return

util.searchHash = (type, value) ->
    search
        search: type + "|" + value
        page: 0

    return

# $(window).trigger("hashchange")
added_corpora_ids = []
util.loadCorporaFolderRecursive = (first_level, folder) ->

    # Format the possible licence type information to be suffixed to
    # the corpus name in the corpus selector. <span class="..."> does
    # not seem to work correctly here; it probably disturbs
    # transforming the corpus selector.
    # (Jyrki Niemi 2014-02-06, 2015-02-10)
    format_licence_type = (corpus_id) ->
        licence_type = settings.corpora[corpus_id]["licence_type"]
        # c.log("licence_type", corpus_id, licence_type)
        if licence_type then " [" + licence_type.toUpperCase() + "]" else ""

    outHTML = undefined
    if first_level
        outHTML = "<ul>"
    else
        folder_descr = (folder.description or "") +
            if folder.info and settings.corpusExtraInfo
                (if folder.description then "<br/><br/>" else "") +
                    util.formatCorpusExtraInfo(
                        folder.info,
                        settings.corpusExtraInfo.corpus_infobox)
            else
                ""
        outHTML = "<ul title=\"" + folder.title + "\" description=\"" + escape(folder_descr) + "\">"
    if folder #This check makes the code work even if there isn't a ___settings.corporafolders = {};___ in config.js
        # Folders
        $.each folder, (fol, folVal) ->
            outHTML += "<li>" + util.loadCorporaFolderRecursive(false, folVal) + "</li>" if fol isnt "contents" and fol isnt "title" and fol isnt "description" and fol isnt "info"
            return
        
        # Corpora
        if folder["contents"] and folder["contents"].length > 0
            $.each folder.contents, (key, value) ->
                outHTML += "<li id=\"" + value + "\">" + settings.corpora[value]["title"] + format_licence_type(value) + "</li>"
                added_corpora_ids.push value
                return

    if first_level
        
        # Add all corpora which have not been added to a corpus
        for val of settings.corpora
            cont = false
            for usedid of added_corpora_ids
                if added_corpora_ids[usedid] is val or settings.corpora[val].hide
                    cont = true
            continue if cont
            
            # Add it anyway:
            outHTML += "<li id='#{val}'>#{settings.corpora[val].title + format_licence_type(val)}</li>"
    outHTML += "</ul>"
    outHTML

# Helper function to turn 1.2345 into 1,2345 (locale dependent)
# Use "," instead of "." if Swedish, if mode is
# Split the string into two parts

#return x.replace(".",'<span rel="localize[util_decimalseparator]">' + decimalSeparator + '</span>');

#return x.replace(".", decimalSeparator);

# Helper function to turn "8455999" into "8 455 999" 
util.prettyNumbers = (numstring) ->
    regex = /(\d+)(\d{3})/
    outStrNum = numstring.toString()
    outStrNum = outStrNum.replace(regex, "$1" + "<span rel=\"localize[util_numbergroupseparator]\">" + util.getLocaleString("util_numbergroupseparator") + "</span>" + "$2") while regex.test(outStrNum)

    outStrNum

util.suffixedNumbers = (num) ->
    out = ""
    if num < 1000 # 232
        out = num.toString()
    else if 1000 <= num < 1e6 # 232,21K
        out = (num/1000).toFixed(2).toString() + "K"
    else if 1e6 <= num < 1e9 # 232,21M
        out = (num/1e6).toFixed(2).toString() + "M"
    else if 1e9 <= num < 1e12 # 232,21G
        out = (num/1e9).toFixed(2).toString() + "G"
    else if 1e12 <= num # 232,21T
        out = (num/1e12).toFixed(2).toString() + "T"
    return out.replace(".","<span rel=\"localize[util_decimalseparator]\">" + util.getLocaleString("util_decimalseparator") + "</span>")

# Goes through the settings.corporafolders and recursively adds the settings.corpora hierarchically to the corpus chooser widget 
util.loadCorpora = ->
    added_corpora_ids = []
    outStr = util.loadCorporaFolderRecursive(true, settings.corporafolders)
    window.corpusChooserInstance = $("#corpusbox").corpusChooser(
        template: outStr
        infoPopup: (corpusID) ->
            corpusObj = settings.corpora[corpusID]
            maybeInfo = ""
            maybeInfo = "<br/><br/>" + corpusObj.description if corpusObj.description
            corpusExtraInfo =
                if settings.corpusExtraInfo
                    util.formatCorpusExtraInfo(
                        corpusObj, settings.corpusExtraInfo.corpus_infobox)
                else
                    undefined
            if corpusExtraInfo
                maybeInfo += (if maybeInfo then "<br/><br/>" else "") + corpusExtraInfo
            numTokens = corpusObj.info.Size
            baseLangTokenHTML = ""
            baseLangSentenceHTML = ""
            baseLangs = settings.corpora[corpusID]?.linked_to
            if baseLangs
                lang = " (" + util.getLocaleString(settings.corpora[corpusID].lang) + ")"
                for baseLang in baseLangs
                    #baseLangTag = " (" + settings.corpora[baseLang].lang + ")"
                    baseLangTokenHTML += """#{util.getLocaleString("corpselector_numberoftokens")}: <b>#{util.prettyNumbers(settings.corpora[baseLang].info.Size)}
                    </b> (#{util.getLocaleString(settings.corpora[baseLang].lang)})<br/>
                    """
                    baseLangSentenceHTML += """#{util.getLocaleString("corpselector_numberofsentences")}: <b>#{util.prettyNumbers(settings.corpora[baseLang].info.Sentences)}
                    </b> (#{util.getLocaleString(settings.corpora[baseLang].lang)})<br/>
                    """
            else
                lang = ""

            numSentences = corpusObj["info"]["Sentences"]
            lastUpdate = corpusObj["info"]["Updated"]
            lastUpdate = "?" unless lastUpdate
            sentenceString = "-"
            sentenceString = util.prettyNumbers(numSentences.toString()) if numSentences
            
            output = """
            <b>
                <img class="popup_icon" src="img/korp_icon.png" />
                #{corpusObj.title}
            </b>
            #{maybeInfo}
            <br/><br/>#{baseLangTokenHTML}
            #{util.getLocaleString("corpselector_numberoftokens")}:
            <b>#{util.prettyNumbers(numTokens)}</b>#{lang}
            <br/>#{baseLangSentenceHTML}
            #{util.getLocaleString("corpselector_numberofsentences")}: 
            <b>#{sentenceString}</b>#{lang}
            <br/>
            #{util.getLocaleString("corpselector_lastupdate")}: 
            <b>#{lastUpdate}</b>
            <br/><br/>"""
            
            supportsContext = _.keys(corpusObj.context).length > 1
            output += $("<div>").localeKey("corpselector_supports").html() + "<br>" if supportsContext
            output += $("<div>").localeKey("corpselector_limited").html() if corpusObj.limited_access
            output

        infoPopupFolder: (indata) ->
            corporaID = indata.corporaID
            desc = indata.description
            totalTokens = 0
            totalSentences = 0
            missingSentenceData = false
            $(corporaID).each (key, oneID) ->
                totalTokens += parseInt(settings.corpora[oneID]["info"]["Size"])
                oneCorpusSentences = settings.corpora[oneID]["info"]["Sentences"]
                if oneCorpusSentences
                    totalSentences += parseInt(oneCorpusSentences)
                else
                    missingSentenceData = true
                return

            totalSentencesString = util.prettyNumbers(totalSentences.toString())
            totalSentencesString += "+" if missingSentenceData
            maybeInfo = ""
            maybeInfo = desc + "<br/><br/>" if desc and desc isnt ""
            glueString = ""
            if corporaID.length is 1
                glueString = util.getLocaleString("corpselector_corporawith_sing")
            else
                glueString = util.getLocaleString("corpselector_corporawith_plur")
            "<b><img src=\"img/folder.png\" style=\"margin-right:4px; vertical-align:middle; margin-top:-1px\"/>" + indata.title + "</b><br/><br/>" + maybeInfo + "<b>" + corporaID.length + "</b> " + glueString + ":<br/><br/><b>" + util.prettyNumbers(totalTokens.toString()) + "</b> " + util.getLocaleString("corpselector_tokens") + "<br/><b>" + totalSentencesString + "</b> " + util.getLocaleString("corpselector_sentences")
    ).bind("corpuschooserchange", (evt, corpora) ->
        c.log "corpuschooserchange", corpora
        
        # c.log("corpus changed", corpora);
        safeApply $("body").scope(), (scope) ->
            scope.$broadcast "corpuschooserchange", corpora
            return

        return
    )
    selected = corpusChooserInstance.corpusChooser("selectedItems")
    settings.corpusListing.select selected
    return

window.regescape = (s) ->
    s.replace /[\.|\?|\+|\*|\|\'|\"\(\)\^\$]/g, "\\$&"

util.localizeFloat = (float, nDec) ->
    lang = $("#languages").radioList("getSelected").data("lang")
    sep = null
    nDec = nDec or float.toString().split(".")[1].length
    if lang is "sv"
        sep = ","
    else sep = "." if lang is "en"
    $.format("%." + nDec + "f", float).replace ".", sep

util.formatDecimalString = (x, mode, statsmode, stringOnly) ->
    if _.contains(x, ".")
        parts = x.split(".")
        decimalSeparator = util.getLocaleString("util_decimalseparator")
        return parts[0] + decimalSeparator + parts[1] if stringOnly
        if mode
            util.prettyNumbers(parts[0]) + "<span rel=\"localize[util_decimalseparator]\">" + decimalSeparator + "</span>" + parts[1]
        else
            util.prettyNumbers(parts[0]) + decimalSeparator + parts[1]
    else
        if statsmode
            x
        else
            util.prettyNumbers x

util.makeAttrSelect = (groups) ->
    arg_select = $("<select/>")
    $.each groups, (lbl, group) ->
        return if $.isEmptyObject(group)
        optgroup = $("<optgroup/>",
            label: util.getLocaleString(lbl).toLowerCase()
            rel: $.format("localize[%s]", lbl)
        ).appendTo(arg_select)
        $.each group, (key, val) ->
            return if val.displayType is "hidden"
            $("<option/>",
                rel: $.format("localize[%s]", val.label)
            ).val(key).text(util.getLocaleString(val.label) or "").appendTo(optgroup).data "dataProvider", val
            return

        return

    arg_select

util.browserWarn = ->
    $.reject
        reject:
            
            # all : false,
            msie5: true
            msie6: true
            msie7: true
            msie8: true
            msie9: true

        imagePath: "img/browsers/"
        display: [
            "firefox"
            "chrome"
            "safari"
            "opera"
        ]
        browserInfo: # Settings for which browsers to display
            firefox:
                text: "Firefox" # Text below the icon
                url: "http://www.mozilla.com/firefox/" # URL For icon/text link

            safari:
                text: "Safari"
                url: "http://www.apple.com/safari/download/"

            opera:
                text: "Opera"
                url: "http://www.opera.com/download/"

            chrome:
                text: "Chrome"
                url: "http://www.google.com/chrome/"

            msie:
                text: "Internet Explorer"
                url: "http://www.microsoft.com/windows/Internet-explorer/"

        header: "Du använder en omodern webbläsare" # Header of pop-up window
        paragraph1: "Korp använder sig av moderna webbteknologier som inte stödjs av din webbläsare. En lista på de mest populära moderna alternativen visas nedan. Firefox rekommenderas varmt." # Paragraph 1
        paragraph2: "" # Paragraph 2
        closeMessage: "Du kan fortsätta ändå – all funktionalitet är densamma – men så fort du önskar att Korp vore snyggare och snabbare är det bara att installera Firefox, det tar bara en minut." # Message displayed below closing link
        closeLink: "Stäng varningen" # Text for closing link
        #   header: 'Did you know that your Internet Browser is out of date?', // Header of pop-up window
        #     paragraph1: 'Your browser is out of date, and may not be compatible with our website. A list of the most popular web browsers can be found below.', // Paragraph 1
        #     paragraph2: 'Just click on the icons to get to the download page', // Paragraph 2
        #     closeMessage: 'By closing this window you acknowledge that your experience on this website may be degraded', // Message displayed below closing link
        #     closeLink: 'Close This Window', // Text for closing link
        closeCookie: true # If cookies should be used to remmember if the window was closed (see cookieSettings for more options)
        # Cookie settings are only used if closeCookie is true
        cookieSettings:
            path: "/" # Path for the cookie to be saved on (should be root domain in most cases)
            expires: 100000 # Expiration Date (in seconds), 0 (default) means it ends with the current session

    return

util.convertLMFFeatsToObjects = (structure, key) ->
    
    # Recursively traverse a tree, expanding each "feat" array into a real object, with the key "feat-[att]":
    if structure?
        output = null
        theType = util.findoutType(structure)
        if theType is "object"
            output = {}
            $.each structure, (inkey, inval) ->
                if inkey is "feat"
                    innerType = util.findoutType(inval)
                    if innerType is "array"
                        $.each inval, (fkey, fval) ->
                            keyName = "feat_" + fval["att"]
                            if not output[keyName]?
                                output[keyName] = fval["val"]
                            else
                                if $.isArray(output[keyName])
                                    output[keyName].push fval["val"]
                                else
                                    output[keyName] = [output[keyName], fval["val"]]
                            return

                    else
                        keyName = "feat_" + inval["att"]
                        if not output[keyName]?
                            output[keyName] = inval["val"]
                        else
                            if $.isArray(output[keyName])
                                output[keyName].push inval["val"]
                            else
                                output[keyName] = [output[keyName], inval["val"]]
                else
                    output[inkey] = util.convertLMFFeatsToObjects(inval)
                return

        else if theType is "array"
            dArr = new Array()
            $.each structure, (inkey, inval) ->
                dArr.push util.convertLMFFeatsToObjects(inval)
                return

            output = dArr
        else
            output = structure
        output
    else
        null

util.findoutType = (variable) ->
    if $.isArray(variable)
        "array"
    else
        typeof (variable)


# Format extra information associated with a corpus object, typically
# a URN, licence information and various links. An optional second
# argument specifies a list of items (properties in the corpus
# configuration) to be formatted.
#
# The properties are usually composite objects which may contain the
# properties "name", "description", and "url" or "urn". If the
# information contains "name", it is presented as follows: a label
# and a colon (unless the property "no_label" is true or the item is
# "homepage"), followed by the name as a link to the URN or URL (or
# if neither URN nor URL, no link). Otherwise, the label is a link to
# the URN or URL. The label is the localized string for the key
# "corpus_" + item name. The optional description is a represented as
# a tooltip (HTML title attribute).
#
# If an item needs no separate name, the simple properties X_urn and
# X_url can be used instead of X: { urn: ... } (similarly for url).
# The item "urn" is treated specially: it shows the value of the
# "urn" property as the link text.
#
# TODO: Add an option for presenting the description as a text
# following the link text. It could be used in the corpus info box
# instead of the tooltip.

util.formatCorpusExtraInfo = (corpusObj) ->
    info_items =
        if arguments.length > 1 and arguments[1]
            arguments[1]
        else
            settings.corpusExtraInfoItems? or []

    # Get the value of a URN (preferred, prefixed with resolver URL)
    # or URL property in obj. The optional second argument specifies
    # the property name prefix to "urn" or "url".
    getUrnOrUrl = (obj) ->
        prefix = if arguments.length > 1 then arguments[1] else ''
        if prefix + 'urn' of obj
            settings.urnResolver + obj[prefix + 'urn']
        else
            obj[prefix + 'url']

    # Return a HTML link (or text), given link_info, which may
    # contain the properties "label", "url", "text" and "tooltip".
    makeLinkItem = (link_info) ->
        result = ''
        if link_info.label
            result += link_info.label + ': '
        if link_info.url
            result += '<a href=\'' + link_info.url + '\' target=\'_blank\'' +
                (if link_info.tooltip
                    ' title=\'' + link_info.tooltip + '\''
                else
                    '') +
                '>' + link_info.text + '</a>'
        else if link_info.text
            if link_info.tooltip
                result += '<span class=\'has_hover_text\' title=\'' +
                    link_info.tooltip + '\'>' + link_info.text + '</span>'
            else
                result += link_info.text
        result

    result = ''
    i = 0
    while i < info_items.length
        info_item = info_items[i]
        link_info = {}
        label = ''
        # Use rel='localize[...]' instead of util.getLocaleString, so
        # that the texts are re-localized immediately when switching
        # languages.
        # TODO: Convert to use the new localization method
        label = '<span rel=\'localize[corpus_' + info_item + ']\'>' +
            'Corpus ' + info_item + '</span>'
        if info_item == 'urn' and corpusObj.urn
            link_info =
                url: settings.urnResolver + corpusObj.urn
                text: corpusObj.urn
                label: label
        else if info_item == 'homepage' and ! ('homepage' of corpusObj) and
                corpusObj.url
            # Assume that the top-level property "url" refers to the
            # home page of the corpus (unless the there is a property
            # "homepage").
            link_info =
                url: corpusObj.url
                text: label
        else if corpusObj[info_item]
            info_obj = corpusObj[info_item]
            link_info = url: getUrnOrUrl(info_obj)
            if info_obj.name
                link_info.text = info_obj.name
                if ! info_obj.no_label
                    link_info.label = label
            else
                link_info.text = label
            if info_obj.description
                link_info.tooltip = info_obj.description
        else if corpusObj[info_item + '_urn'] or corpusObj[info_item + '_url']
            # Simple *_urn or *_url properties
            link_info =
                url: getUrnOrUrl(corpusObj, info_item + '_')
                text: label
        if link_info.url or link_info.text
            if result
                result += '<br/>'
            result += makeLinkItem(link_info)
        i++
    result

# Copy information from the "info" property of corpusObj to the top
# level of corpusObj. This information may come from the backend .info
# file or database. The same information can also be specified in
# top-level properties of the frontend config file, but the
# information from "info" overrides them, so that this information can
# be accessed uniformly through the top-level properties. A property
# name may contain a prefix indicating a section (Metadata, Licence,
# Compiler, or other listed in settings.corpusExtraInfoItems): these
# are converted to separate composite objects in corpusObj. For
# example, Licence_URL: X, Licence_Name: Y is converted to licence : {
# url: X, name: Y }.

util.copyCorpusInfoToConfig = (corpusObj) ->
    info_key_sects =
        for item in settings.corpusExtraInfoItems when item != 'urn'
            item.charAt(0).toUpperCase() + item.slice(1)
    info_key_sects.push('')
    info_subkeys = [
        'Name'
        'Description'
        'URN'
        'URL'
    ]
    corpusInfo = corpusObj.info
    i = 0
    while i < info_key_sects.length
        sect = info_key_sects[i]
        sect_name = sect.toLowerCase()
        subobj = corpusObj
        if sect != ''
            subobj = if sect_name of corpusObj then corpusObj[sect_name] else {}
        info_key_prefix = sect + (if sect == '' then '' else '_')
        added_properties = false
        j = 0
        while j < info_subkeys.length
            key = info_subkeys[j]
            subkey = key.toLowerCase()
            value = corpusInfo[info_key_prefix + key]
            if value
                subobj[subkey] = value
                added_properties = true
            j++
        # Add only non-empty subobjects
        if sect != '' and added_properties
            corpusObj[sect_name] = subobj
        i++
    return

# Propagate information in the properties of info to corpusFolder,
# all its subfolders (recursively) and corpora. Info items lower in
# the corpus folder tree override those from above.

util.propagateCorpusFolderInfo = (corpusFolder, info) ->

    # Copy properties from info to corpusConfig if they are missing
    # from corpusConfig. A composite property in corpusConfig
    # overrides all the values in info (coming from folder info).
    addCorpusInfo = (corpusConfig, info) ->
        for prop_name of info
            if ! (prop_name of corpusConfig)
                corpusConfig[prop_name] = info[prop_name]
        return

    # The info in this folder overrides that coming from above
    if corpusFolder.info
        info = $.extend(true, {}, info or {}, corpusFolder.info)
    # Add or modify the info in this folder
    if info
        corpusFolder.info = info
    # Propagate the info to the corpora in this folder
    if info and corpusFolder.contents
        i = 0
        while i < corpusFolder.contents.length
            addCorpusInfo settings.corpora[corpusFolder.contents[i]], info
            i++
    # Recursively process subfolders and propagate the info
    for prop_name of corpusFolder
        if prop_name != 'title' and prop_name != 'description' and
                prop_name != 'contents' and prop_name != 'info'
            c.log 'propagate ', prop_name
            util.propagateCorpusFolderInfo corpusFolder[prop_name], info
    return


# Initialize the link_attributes properties in all the corpora in
# settings.corpora.
util.initCorpusSettingsLinkAttrs = () ->
    for corpus of settings.corpora
        util.extractLinkAttrs(settings.corpora[corpus])
    null

# Initialize the link_attributes property in corpusInfo to contain
# the attributes with type "url" and url_opts.in_link_section true.
# These attributes are shown in a separate section in the sidebar.
# The original attributes are marked as hidden.
util.extractLinkAttrs = (corpusInfo) ->

    extractLinkAttrs = (attrs, link_attrs) ->
        if attrs?
            for attrname of attrs
                attr = attrs[attrname]
                if attr.type == "url" and attr.url_opts? and attr.url_opts.in_link_section
                    if attr._link_attr
                        # This attribute was already handled via
                        # another reference; that happens when many
                        # corpora use the same attribute definitions
                        # objects.
                        link_attrs[attrname] = attr._link_attr
                    else
                        # Make a deep copy of the attr object
                        link_attrs[attrname] = $.extend(true, {}, attr)
                        # The original attribute cannot be deleted
                        # (without making more modifications
                        # elsewhere) because Korp only requests from
                        # the backend the attributes mentioned in
                        # attributes or struct_attributes.
                        attrs[attrname].displayType = "hidden"
                        attrs[attrname]._link_attr = link_attrs[attrname]

    link_attrs = {}
    extractLinkAttrs(corpusInfo.attributes, link_attrs)
    extractLinkAttrs(corpusInfo.struct_attributes, link_attrs)
    corpusInfo.link_attributes = link_attrs
    null


# Initialize the synthetic_attr_names property of all the corpora in
# settings.corpora.

util.initCorpusSettingsSyntheticAttrs = ->
    for corpus of settings.corpora
        util.setSyntheticAttrsInfo settings.corpora[corpus]
    return

# Initialize the synthetic_attr_names property of corpusInfo to
# contain the names of synthetic attributes (with property synthetic
# == true), separately for (positional) attributes, struct_attributes
# and link_attributes, so that Sidebar.renderContent (in widgets)
# need not find them out over and over again.

util.setSyntheticAttrsInfo = (corpusInfo) ->

    setSyntheticAttrs = (attrs, synthetic_list) ->
        if attrs != undefined
            for attrname of attrs
                attr = attrs[attrname]
                if attr.synthetic and attr.displayType != 'hidden'
                    synthetic_list.push attrname
        return

    corpusInfo.synthetic_attr_names =
        attributes: []
        struct_attributes: []
        link_attributes: []
    for attrtype of corpusInfo.synthetic_attr_names
        setSyntheticAttrs(
            corpusInfo[attrtype], corpusInfo.synthetic_attr_names[attrtype])
    return


# List the corpora (corpus ids) matching the regular expression regex.
# The regular expression is implicitly anchored to the beginning and
# end, so a corpus id must match it completely. The optional second
# argument is an object for options. If the option "inverse" is true,
# list corpora not matching regex. If the option "sort" is true, sort
# the corpus ids alphabetically.

util.listMatchingCorpora = (regex) ->
    corp_re = RegExp("^(" + regex + ")$")
    opts = if arguments.length > 1 then arguments[1] else {}
    inverse = opts.inverse
    result = []
    for corpus of settings.corpora
        match = corp_re.test(corpus)
        if (match and not inverse) or (inverse and not match)
            result.push(corpus)
    if opts.sort
        result.sort()
    return result


# Map possible corpus id aliases to actual corpus ids in the URL hash
# parameter "corpus". Aliases are defined in settings.corpus_aliases,
# whose property keys are aliases and values the actual corpus ids,
# separated by commas. The corpus ids may also be regular expressions
# that are expanded to the corpora mathing the regexp.
#
# Aliases can be useful if a corpus is renamed: the old name (id) can
# be retained as an alias to avoid breaking possible URLs containing
# the old id of the corpus. An alias may also be used a shorthand for
# a list of corpora. Regular expressions allow the denotation of the
# alias to expand if new corpora matching the regexp are added to Korp
# (or old ones removed). (Jyrki Niemi 2015-04-23, 2016-01-22)

util.mapHashCorpusAliases = () ->

    getUrlParam = (name) ->
        param_re = RegExp("\\b" + name + "=([^&;]*)")
        matches = window.location.hash.match(param_re)
        if matches? and matches.length > 1 then matches[1] else null

    expandAlias = (alias) ->
        if /[^a-z0-9_,-]/.test(alias)
            corpora = []
            corp_specs = alias.split(",")
            for corp_spec in corp_specs
                if /[^a-z0-9_,-]/.test(corp_spec)
                    corpora = corpora.concat(
                        util.listMatchingCorpora(corp_spec))
            return corpora.join(",")
        else
            return alias

    mapCorpusAliasList = (corpus) ->
        _.map(corpus.split(","),
              (corpus_id) ->
                  if corpus_id of settings.corpus_aliases
                      expandAlias(settings.corpus_aliases[corpus_id])
                  else
                      corpus_id
             )
        .join(",")

    if settings.corpus_aliases?
        orig_corpus = getUrlParam("corpus")
        if orig_corpus
            corpus = mapCorpusAliasList(orig_corpus)
            if corpus != orig_corpus
                c.log "mapHashCorpusAliases", orig_corpus, "->", corpus
                window.location.hash = window.location.hash.replace(
                    "corpus=" + orig_corpus, "corpus=" + corpus)
    return


# Initialize the _sidebar_display_order property of all the corpora in
# settings.corpora.

util.initCorpusSettingsAttrDisplayOrder = () ->
    for corpus of settings.corpora
        util.setAttrDisplayOrder settings.corpora[corpus]
    return

# Initialize the _sidebar_display_order property of corpusInfo to
# contain the (reverse of the) order in which attributes are to be
# shown in the sidebar, separately for (positional) attributes,
# struct_attributes and link_attributes.
#
# The order may be specified in corpusInfo.sidebar_display_order
# (property name without the leading underscore) or the default
# settings.default_sidebar_display_order. These are objects with the
# keys attributes, struct_attributes and link_attributes, whose values
# are lists of attribute names or regular expressions matching
# attribute names, in the order in which the attributes should be
# shown. Unlisted attributes are shown after the listed ones in the
# order JavaScript iterates over the attribute properties. Attributes
# matching a regular expression are shown in the JavaScript property
# iteration order. (Jyrki Niemi 2015-08-27)

util.setAttrDisplayOrder = (corpusInfo) ->

    for attr_type in ["attributes", "struct_attributes", "link_attributes"]
        order = (corpusInfo.sidebar_display_order?[attr_type] or
                 settings.default_sidebar_display_order?[attr_type])
        if order
            attr_names = _.keys(corpusInfo[attr_type])
            result = []
            for pattern in order
                if $.type pattern == "regexp"
                    index = 0
                    for attr_name in attr_names
                        if attr_name.match(pattern)
                            result.push(attr_name)
                            attr_names[index] = ""
                        index += 1
                else if $.type pattern == "string"
                    index = $.inArray(pattern, attr_names)
                    if index != -1
                        result.push(attr_names[index])
                        attr_names[index] = ""
            # if order[order.length() - 1] == "__SORTED__"
            #     attr_names.sort()
            for attr_name in attr_names
                if attr_name != ""
                    result.push(attr_name)
            # Internally use the property name prefixed with an
            # underscore. Reverse to make sorting work with
            # $.inArray() returning -1 for non-existent values.
            if not corpusInfo._sidebar_display_order
                corpusInfo._sidebar_display_order = {}
            corpusInfo._sidebar_display_order[attr_type] = result.reverse()
    return


# Add a CQP token expression to be ignored between the individual
# token expressions in cqp, based on the property
# ignore_between_tokens_cqp of the corpus configuration. The
# expression to be ignored is added only if all the selected corpora
# have the same ignore expression.
#
# TODO: It would be more appropriate and efficient to set the ignore
# expression in the model and change it when the set of chosen corpora
# changes, so we would not need to recompute it here every time.
# (Jyrki Niemi 2015-09-25)

util.addIgnoreCQPBetweenTokens = (cqp) ->

    insertBetweenCQPTokens = (base_cqp, insert_cqp) ->
        # Split the original CQP expression so that each token
        # expression [...] and each string between them is a separate
        # string.
        cqp_tokens = base_cqp.match(
            /\[([^\]\"\']*("([^\\\"]|\\.)*"|'([^\\\']|\\.)*'))*[^\]\"\']*\]|([^\[]+)/g)
        # Find the last token proper, which need not be followed by
        # the insert expression, although it does not make a
        # difference in the result if it is optional.
        last_token_num = _(cqp_tokens)
                         .map((token) -> token.charAt(0) == '[')
                         .lastIndexOf(true)
        # Append the insert expression to each token expression and
        # enclose them together in parentheses, so that repetition and
        # other regexp operators work correctly for the augmented
        # token expression.
        insert_cqp_lpar = " " + insert_cqp + ")"
        result = for token, token_num in cqp_tokens
                     if token.charAt(0) == '[' and token_num < last_token_num
                         "(" + token + insert_cqp_lpar
                     else
                         token
        result.join("")

    ignore_cqps = settings.corpusListing.getIgnoreBetweenTokens()
    c.log "ignore_cqps", ignore_cqps
    if ignore_cqps.length == 1
        insertBetweenCQPTokens cqp, ignore_cqps[0]
    else
        cqp


settings.common_struct_types = 
    date_interval:
        label: "date_interval"
        displayType: "date_interval"
        opts: false
        # extended_template: "<slider floor=\"{{floor}}\" ceiling=\"{{ceiling}}\" " + "ng-model-low=\"values.low\" ng-model-high=\"values.high\"></slider>" + "<div><input ng-model=\"values.low\" class=\"from\"> <input class=\"to\" ng-model=\"values.high\"></div>"
        extended_template : '<div class="date_interval_arg_type">
            <div class="section">
                <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top">
                    <i class="fa fa-calendar"></i>
                    {{"date_from" | loc:lang}}
                </button>
                    {{combined.format("YYYY-MM-DD HH:mm")}}
                <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" 
                    date-model="from_date" time-model="from_time" model="combined" 
                    min-date="minDate" max-date="maxDate">
                </time-interval>
            </div>
            
            <div class="section">
                <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top">
                    <i class="fa fa-calendar"></i>
                    {{"date_to" | loc:lang}}
                </button>
                    {{combined2.format("YYYY-MM-DD HH:mm")}}
                <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" 
                    date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top"
                    min-date="minDate" max-date="maxDate">
                </time-interval>
            </div>
        </div>'
        

        controller: ["$scope", "searches", "$timeout", ($scope, searches, $timeout) ->

            s = $scope
            cl = settings.corpusListing
            updateIntervals = () ->
                moments = cl.getMomentInterval()
                if moments.length
                    [s.minDate, s.maxDate] = _.invoke moments, "toDate"
                else 
                    # TODO: ideally, all corpora should have momentinterval soon and this block may be removed
                    [from, to] = cl.getTimeInterval()
                    s.minDate = moment(from.toString(), "YYYY").toDate()
                    s.maxDate = moment(to.toString(), "YYYY").toDate()

            s.$on "corpuschooserchange", () ->
                updateIntervals()


            updateIntervals()

            s.from_click = (event) ->
                event.originalEvent.preventDefault()
                event.originalEvent.stopPropagation()

            c.log "model", s.model

            getYear = (val) ->
                moment(val.toString(), "YYYYMMDD").toDate()

            getTime = (val) ->
                c.log "getTime", val, moment(val.toString(), "HHmmss").toDate()
                moment(val.toString(), "HHmmss").toDate()

            unless s.model
                s.from_date = s.minDate

                s.to_date = s.maxDate
                [s.from_time, s.to_time] = _.invoke cl.getMomentInterval(), "toDate"
                # s.from_time = moment("0", "h").toDate()
                # s.to_time = moment("23:59", "hh:mm").toDate()
            else if s.model.length == 4
                [s.from_date, s.to_date] = _.map s.model[..2], getYear
                [s.from_time, s.to_time] = _.map s.model[2..], getTime


            
                    # moment(item.toString(), )
            # s.from_date = moment()

            s.$watchGroup ["combined", "combined2"], ([combined, combined2]) ->
                c.log "combined", combined
                c.log "combined2", combined2
                s.model = [
                    moment(s.from_date).format("YYYYMMDD"),
                    moment(s.to_date).format("YYYYMMDD"),
                    moment(s.from_time).format("HHmmss"),
                    moment(s.to_time).format("HHmmss")
                ]
                c.log "s.model", s.model
        ]


# Add additional CQP queries ("pre-queries") in cqp to params (Korp
# backend query parameters), after mapping them via cqp_mapper
# (default: identity). cqp can be either a string of CQP queries
# joined by || or an object. In a string, the first query is the
# unnumbered one and the last one is the main query, whose matches
# will be highlighted. (Jyrki Niemi 2015-06-18)

util.addCQPs = (params, cqp, cqp_mapper = (cqp) -> cqp) ->
    if typeof cqp == "string" or cqp instanceof String
        if cqp.indexOf("||") != -1
            cqps = cqp.split("||")
            params["cqp"] = cqp_mapper(cqps[0])
            params["cqp" + i.toString()] = cqp_mapper(cqps[i]) for i in [1...cqps.length]
        else
            params.cqp = cqp_mapper(cqp)
    else
        params[key] = cqp_mapper(val) for key, val of cqp when key.substr(0, 3) == "cqp"
    return

# Combine the CQP queries in the properties cqp and cqp[1-9][0-9]* of
# the object params or in the elements of the array params into a
# single string, joined by ||. (Jyrki Niemi 2015-06-18)

util.combineCQPs = (params) ->
    if $.isArray(params)
        return params.join("||")
    else
        cqp_keys = (
            key for key of Object.keys(params) when key.substr(0, 3) == "cqp")
        cqp_keys = _.sortBy cqp_keys, (key) ->
            parseInt(key.substr(4) or "0")
        return (params[key] for key in cqp_keys).join("||")
