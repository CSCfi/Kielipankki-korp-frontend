"use strict"
window.model = {}

model.getAuthorizationHeader = () ->
    if typeof authenticationProxy isnt "undefined" and not $.isEmptyObject(authenticationProxy.loginObj)
        "Authorization" : "Basic " + authenticationProxy.loginObj.auth
    else
        {}


class BaseProxy
    constructor: ->

        # progress
        @prev = ""
        @progress = 0
        @total
        @total_results = 0
        @pendingRequests = []

    expandCQP : (cqp) ->
        try
            return CQP.expandOperators cqp
        catch e
            c.warn "CQP expansion failed", cqp, e
            return cqp

    # Add the possibly combined and unexpanded CQP query cqp (or
    # data.cqp) to data, splitting prequeries into separate
    # parameters, expanding all CQP queries and adding the ignorable
    # token expressions between tokens. (Jyrki Niemi 2016-02-02)
    addExpandedCQP : (data, cqp = null) ->
        # c.log "addExpandedCQP", data, data.cqp, cqp
        if cqp is null and "cqp" of data
            cqp = data.cqp
        util.addCQPs(data, cqp, (cqp) =>
            settings.corpusListing.addIgnoreBetweenTokensCQP @expandCQP cqp)
        # c.log "addExpandedCQP result", data, data.cqp

    makeRequest: ->
        @abort()
        @prev = ""
        @progress = 0
        @total_results = 0
        @total = null

    abort: ->
        _.invoke @pendingRequests, "abort" if @pendingRequests.length
        # @pendingRequests = []

    hasPending : () ->
        _.any _.map @pendingRequests, (req) -> req.readyState != 4 and req.readyState != 0

    parseJSON: (data) ->
        try

            # var prefix = data[0] == "{" ? "" : "{";
            # var suffix = data.slice(-1) == "}" ? "" : "}";
            # var json = prefix + data.slice(0,-2) + suffix;
            json = data
            # json = "{" + json.slice(0, -1) + "}" if json.slice(-1) is ","
            if json[0] != "{" then json = "{" + json
            if json.match(/,\s*$/)
                json = json.replace(/,\s*$/, "") + "}"


            # c.log('json after', json)
            out = JSON.parse(json)
            # c.log "json parsing success!", json
            return out
        catch e

                    # c.log("trying data", data);
            return JSON.parse(data)

    addAuthorizationHeader: (req) ->
        pairs = _.pairs model.getAuthorizationHeader()
        if pairs.length
            req.setRequestHeader pairs[0]...

    calcProgress: (e) ->
        newText = e.target.responseText.slice(@prev.length)
        # c.log "newText", newText
        struct = {}
        try
            struct = @parseJSON(newText)
        # c.log("json parse failed in ", newText);
        $.each struct, (key, val) =>
            if key isnt "progress_corpora" and key.split("_")[0] is "progress"
                currentCorpus = val.corpus or val
                sum = _(currentCorpus.split("|")).map((corpus) ->
                    Number settings.corpora[corpus.toLowerCase()].info.Size
                ).reduce((a, b) ->
                    a + b
                , 0)
                @progress += sum
                @total_results += parseInt(val.hits)

        stats = (@progress / @total) * 100
        if not @total? and struct.progress_corpora?.length
            @total = $.reduce($.map(struct["progress_corpora"], (corpus) ->
                return if not corpus.length
                _(corpus.split("|")).map((corpus) ->
                    parseInt settings.corpora[corpus.toLowerCase()].info.Size
                ).reduce((a, b) ->
                    a + b
                , 0)
            ), (val1, val2) ->
                val1 + val2
            , 0)
        @prev = e.target.responseText
        struct: struct
        stats: stats
        total_results: @total_results

    # Add to the backend query parameters in data the parameter
    # "loginfo", to be written to the backend log. The value is based
    # on its existing value, the values returned by
    # util.makeLogInfoItems and the values in argument loginfo (either
    # a single string or an array of strings). This is done only if
    # settings.addBackendLogInfo is true. (Jyrki Niemi 2017-12-14)
    addLogInfo: (data, loginfo) ->
        if settings.addBackendLogInfo
            new_loginfo = [data.loginfo].concat util.makeLogInfoItems()
            if _.isArray loginfo
                new_loginfo = new_loginfo.concat loginfo
            else
                new_loginfo.push loginfo
            new_loginfo = _.compact(new_loginfo).join(" ")
            if new_loginfo
                data.loginfo = new_loginfo
        return data


class model.KWICProxy extends BaseProxy
    constructor: ->
        super()
        @prevRequest = null
        @queryData = null
        @prevAjaxParams = null
        @foundKwic = false


    popXhr: (xhr) ->
        i = $.inArray(@pendingRequests, xhr)
        @pendingRequests.pop i unless i is -1

    makeRequest: (options, page, progressCallback, kwicCallback, loginfo) ->
        c.log "kwicproxy.makeRequest", options, page, kwicResults.getPageInterval(Number(page))
        self = this
        @foundKwic = false
        super()
        kwicCallback = kwicCallback or $.proxy(kwicResults.renderResult, kwicResults)
        self.progress = 0


        o = $.extend(
            queryData: null

            progress: (data, e) ->
                progressObj = self.calcProgress(e)
                return unless progressObj?

                progressCallback progressObj
                if progressObj["struct"].kwic
                    c.log "found kwic!"
                    @foundKwic = true
                    kwicCallback progressObj["struct"]
        , options)

        unless options.ajaxParams.within
            _.extend options.ajaxParams, settings.corpusListing.getWithinParameters()

        data =
            command: "query"
            defaultcontext: settings.defaultOverviewContext
            show: []
            show_struct: []
            cache : true

        $.extend data, kwicResults.getPageInterval(page), o.ajaxParams
        for corpus in settings.corpusListing.selected
            for key, val of corpus.within
                data.show.push _.last key.split(" ")
            for key, val of corpus.attributes
                data.show.push key


            if corpus.struct_attributes?
                $.each corpus.struct_attributes, (key, val) ->
                    data.show_struct.push key if $.inArray(key, data.show_struct) is -1

        if data.cqp
            # data.cqp = @expandCQP(data.cqp)
            @addExpandedCQP data, data.cqp

        util.addPrequeryWithin data

        # @prevCQP = data.cqp
        @prevCQP = util.combineCQPs data
        data.show = util.encodeListParamUniq ["sentence"].concat(data.show)
        c.log "data.show", data.show
        data.show_struct = util.encodeListParamUniq data.show_struct
        settings.corpusListing.minimizeWithinQueryString data
        settings.corpusListing.minimizeContextQueryString data
        data.corpus = util.encodeListParam data.corpus
        @addLogInfo data, loginfo
        @prevRequest = data
        @prevMisc = {"hitsPerPage" : $("#num_hits").val()}
        @prevParams = data
        def = $.ajax(
            url: settings.cgi_script
            data: util.compressQueryParams data
            beforeSend: (req, settings) ->
                self.prevRequest = settings
                self.addAuthorizationHeader req
                self.prevUrl = this.url

            success: (data, status, jqxhr) ->
                c.log "jqxhr", this
                self.queryData = data.querydata
                kwicCallback data if data.incremental is false or not @foundKwic




            # error: o.error
            progress: o.progress
        )
        @pendingRequests.push def
        return def

class model.LemgramProxy extends BaseProxy
    constructor: ->
        super()
        # @pendingRequest = abort: $.noop

    makeRequest: (word, type, callback, loginfo) ->
        super()
        self = this
        params =
            command: "relations"
            word: word
            corpus: settings.corpusListing.stringifySelectedEncode()
            incremental: $.support.ajaxProgress
            type: type
            cache : true
            max : 1000
            # max : settings.wordPictureMaxWords or 15
        @addLogInfo params, loginfo
        @prevParams = params
        def =  $.ajax
            url: settings.cgi_script
            data: util.compressQueryParams params
            # beforeSend: (jqXHR, settings) ->
            #   c.log "before relations send", settings
            #   # self.prevRequest = settings

            # error: (data, status) ->
            #     c.log "relationsearch abort", arguments
            #     if status == "abort"

            #     else
            #         lemgramResults.resultError()


            success: (data) ->
                c.log "relations success", data
                self.prevRequest = params
                # lemgramResults.renderResult data, word

            progress: (data, e) ->
                progressObj = self.calcProgress(e)
                return unless progressObj?
                callback progressObj

            beforeSend: (req, settings) ->
                self.prevRequest = settings
                self.addAuthorizationHeader req
                self.prevUrl = this.url
        @pendingRequests.push def
        return def



    karpSearch: (word, sw_forms) ->
        deferred = $.Deferred((dfd) =>
            @pendingRequests.push $.ajax(
                # url: "http://spraakbanken.gu.se/ws/karp-sok"
                url: settings.lemgrams_cgi_script
                data:
                    wf: word
                    corpus: settings.corpusListing.stringifySelected()
                    resource: settings.corpusListing.getMorphology()
                    format: "json"
                    "sms-forms": false
                    "sw-forms": sw_forms

                success: (data, textStatus, xhr) ->
                    if Number(data.count) is 0
                        dfd.reject()
                        return
                    c.log "karp success", data, sw_forms

                    div = (if $.isPlainObject(data.div) then [data.div] else data.div)
                    output = $.map(div.slice(0, Number(data.count)), (item) ->
                        # item = util.convertLMFFeatsToObjects(item)
                        # item.LexicalEntry.Lemma.FormRepresentation.feat_lemgram
                        item.LexicalEntry.lem
                    )

                    dfd.resolve output, textStatus, xhr

                error: (jqXHR, textStatus, errorThrown) ->
                    c.log "karp error", jqXHR, textStatus, errorThrown
                    dfd.reject()
            )
        ).promise()
        deferred

    saldoSearch: (word, sw_forms) ->
        dfd = $.Deferred()
        @karpSearch(word, sw_forms).done (lemgramArray) ->
            $.ajax(
                url: "http://spraakbanken.gu.se/ws/karp-sok"
                data:
                    lemgram: lemgramArray.join("|")
                    resource: "saldo"
                    format: "json"
            ).done((data, textStatus, xhr) ->
                if data.count is 0
                    dfd.reject()
                    c.log "saldo search 0 results"
                    return
                div = (if $.isPlainObject(data.div) then [data.div] else data.div)

                output = $.map(div.slice(0, Number(data.count)), (item) ->
                    sense = item.LexicalEntry.Sense
                    sense = [sense] unless $.isArray(sense)
                    _.map sense, (item) ->
                        item.id

                )
                c.log "saldoSearch results", output
                dfd.resolve output, textStatus, xhr
            ).fail ->
                c.log "saldo search failed"
                dfd.reject()


        dfd

    lemgramCount: (lemgrams, findPrefix, findSuffix) ->
        self = this
        count = $.grep(["lemgram", (if findPrefix then "prefix" else ""), (if findSuffix then "suffix" else "")], Boolean)
        $.ajax
            url: settings.cgi_script
            data:
                command: "lemgram_count"
                lemgram: lemgrams
                count: count.join(",")
                corpus: settings.corpusListing.stringifySelected()

            beforeSend: (req) ->
                self.addAuthorizationHeader req

            method: "POST"

    lemgramSearch: (lemgram, searchPrefix, searchSuffix) ->
        return $.format("[(lex contains \"%s\")%s%s]", [lemgram, @buildAffixQuery(searchPrefix, "prefix", lemgram), @buildAffixQuery(searchSuffix, "suffix", lemgram)])

    buildAffixQuery: (isValid, key, value) ->
        return "" unless isValid
        $.format "| (%s contains \"%s\")", [key, value]


class model.StatsProxy extends BaseProxy
    constructor: ->
        super()
        @prevRequest = null
        @prevParams = null
        @currentPage = 0
        @page_incr = 25

    processData: (def, data, reduceVals, reduceValLabels, ignoreCase) ->
        minWidth = 100

        columns = []

        for [reduceVal, reduceValLabel] in _.zip reduceVals, reduceValLabels
            columns.push
                id: reduceVal
                name: reduceValLabel
                field: "hit_value"
                sortable: true
                formatter: statisticsFormatting.reduceStatistics reduceVals, ignoreCase, _.keys(data.corpora)
                minWidth: minWidth
                cssClass: "parameter-column"
                headerCssClass: "localized-header"

        columns.push
            id: "pieChart"
            name: ""
            field: "hit_value"
            sortable: false
            formatter: statisticsFormatting.reduceStatisticsPieChart
            maxWidth: 25
            minWidth: 25

        columns.push
            id: "total"
            name: "stats_total"
            field: "total_value"
            sortable: true
            formatter: @valueFormatter
            minWidth : minWidth
            headerCssClass: "localized-header"

        $.each _.keys(data.corpora).sort(), (i, corpus) =>
            columns.push
                id: corpus
                name: settings.corpora[corpus.toLowerCase()].title
                field: corpus + "_value"
                sortable: true
                formatter: @valueFormatter
                minWidth : minWidth

        groups = _.groupBy _.keys(data.total.absolute), (item) ->
            statisticsFormatting.makeGroupingValue(item)

        wordArray = _.keys groups

        sizeOfDataset = wordArray.length
        dataset = new Array(sizeOfDataset + 1)

        statsWorker = new Worker "scripts/statistics_worker.js"
        statsWorker.onmessage = (e) ->
            c.log "Called back by the worker!\n"
            c.log e
            searchParams = 
                reduceVals: reduceVals
                ignoreCase: ignoreCase
                corpora: _.keys data.corpora
            def.resolve [data, wordArray, columns, e.data.dataset, e.data.summarizedData, searchParams]

        statsWorker.postMessage {
            "total" : data.total
            "dataset" : dataset
            "allrows" : (wordArray)
            "corpora" : data.corpora
            "groups" : groups
            loc : settings.locales[$("body").scope().lang]
            "attrs" : reduceVals
        }

    makeParameters: (reduceVals, cqp) ->
        parameters =
            command: "count"
            groupby: reduceVals.join ','
            # cqp: @expandCQP cqp
            corpus: settings.corpusListing.stringifySelectedEncode(true)
            incremental: $.support.ajaxProgress
        @addExpandedCQP parameters, cqp
        _.extend parameters, settings.corpusListing.getWithinParameters()
        util.addPrequeryWithin parameters
        return parameters

    makeRequest: (cqp, callback, loginfo) ->
        self = this
        super()
        reduceval = search().stats_reduce or "word"
        reduceVals = reduceval.split ","

        insensitive = search().stats_reduce_insensitive
        if insensitive
            ignoreCase = true
        else
            ignoreCase = false

        reduceValLabels = _.map reduceVals, (reduceVal) ->
            return "word" if reduceVal == "word"
            maybeReduceAttr = settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())[reduceVal]
            if maybeReduceAttr
                return maybeReduceAttr.label
            else
                return settings.corpusListing.getStructAttrs(settings.corpusListing.getReduceLang())[reduceVal].label

        # TODO: Make sure this works with util.addCQPs
        # Seems it didn't but with addExpandedCQP it would seem to
        # work. (Jyrki Niemi 2016-02-02)
        data = @makeParameters(reduceVals, cqp)

        data.split = _.filter(reduceVals, (reduceVal) ->
            settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())[reduceVal]?.type == "set").join(',')

        rankedReduceVals = _.filter reduceVals, (reduceVal) ->
            settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())[reduceVal]?.ranked
        data.top = _.map(rankedReduceVals, (reduceVal) ->
            return reduceVal + ":1").join(',')

        if ignoreCase
            $.extend data,
                ignore_case: "word"

        settings.corpusListing.minimizeWithinQueryString data
        @prevNonExpandedCQP = cqp
        @addLogInfo data, loginfo
        @prevParams = data
        def = $.Deferred()
        @pendingRequests.push $.ajax
            url: settings.cgi_script
            data: util.compressQueryParams data
            beforeSend: (req, settings) ->
                self.prevRequest = settings
                self.addAuthorizationHeader req
                self.prevUrl = this.url

            error: (jqXHR, textStatus, errorThrown) ->
                c.log "gettings stats error, status: " + textStatus
                def.reject(textStatus, errorThrown)

            progress: (data, e) ->
                progressObj = self.calcProgress(e)
                return unless progressObj?
                callback? progressObj

            success: (data) =>
                if data.ERROR?
                    c.log "gettings stats failed with error", data.ERROR
                    def.reject(data)
                    return
                @processData(def, data, reduceVals, reduceValLabels, ignoreCase)

        return def.promise()

    valueFormatter: (row, cell, value, columnDef, dataContext) ->
        return dataContext[columnDef.id + "_display"]

class model.NameProxy extends model.StatsProxy
    constructor: ->
        super()

    makeParameters: (reduceVal, cqp) ->
        # ignore reduceVal, map only works for word
        parameters = super([settings.placenameAttr], cqp)
        parameters.cqp2 = "[" + settings.placenameConstraint + "]"
        return parameters

    processData: (def, data, reduceval) ->
        def.resolve data


class model.AuthenticationProxy
    constructor: ->
        @loginObj = {}

    makeRequest: (usr, pass, saveLogin) ->
        self = this
        if window.btoa
            auth = window.btoa(usr + ":" + pass)
        else
            throw "window.btoa is undefined"
        dfd = $.Deferred()
        $.ajax(
            url: settings.cgi_script
            type: "GET"
            data:
                command: "authenticate"

            beforeSend: (req) ->
                req.setRequestHeader "Authorization", "Basic " + auth
        ).done((data, status, xhr) ->
            unless data.corpora
                dfd.reject()
                return
            self.loginObj =
                name:
                    # This is the only change for Shibboleth authentication in model.coffee: I use the username returned from the authentication proxy (auth.cgi) -- matthies 28.11.13, janiemi 2014-01-13
                    if settings.authenticationType == "shibboleth"
                        data.username
                    else
                        usr
                credentials: data.corpora
                auth: auth
            if saveLogin
                $.jStorage.set "creds", self.loginObj
            dfd.resolve data
        ).fail (xhr, status, error) ->
            c.log "auth fail", arguments
            dfd.reject()

        dfd
    hasCred : (corpusId) ->
        unless @loginObj.credentials then return false
        corpusId.toUpperCase() in @loginObj.credentials

class model.TimeProxy extends BaseProxy
    constructor: ->


    makeRequest: () ->
        dfd = $.Deferred()


        xhr = $.ajax
            url: settings.cgi_script
            type: "POST"
            data:
                command: "timespan"
                granularity: "y"
                corpus: settings.corpusListing.stringifyAll()

        xhr.done (data, status, xhr) =>
            c.log "timespan done", data
            if data.ERROR
                c.error "timespan error", data.ERROR
                dfd.reject(data.ERROR )
                return

            rest = data.combined[""]
            delete data.combined[""]

            @expandTimeStruct data.combined
            combined = @compilePlotArray(data.combined)
            # dfd.resolve output, rest

            if _.keys(data).length < 2 or data.ERROR
                dfd.reject()
                return
            # @corpusdata = data

            dfd.resolve [data.corpora, combined, rest]


        xhr.fail ->
            c.log "timeProxy.makeRequest failed", arguments
            dfd.reject()

        dfd



    compilePlotArray: (dataStruct) ->
        output = []
        $.each dataStruct, (key, val) ->
            return if not key or not val
            output.push [parseInt(key), val]

        output = output.sort((a, b) ->
            a[0] - b[0]
        )
        output

    expandTimeStruct: (struct) ->
        # c.log "struct", struct
        years = _.map(_.pairs(_.omit(struct, "")), (item) ->
            Number item[0]
        )
        unless years.length then return
        minYear = _.min years
        maxYear = _.max years

        if _.isNaN(maxYear) or _.isNaN(minYear)
            c.log "expandTimestruct broken, years:", years
            return
        # while y < maxYear
        # c.log "years", minYear, maxYear
        for y in [minYear..maxYear]
            thisVal = struct[y]
            if typeof thisVal is "undefined"
                struct[y] = prevVal
            else
                prevVal = thisVal
        # c.log "after", struct


class model.GraphProxy extends BaseProxy
    constructor: ->
        super()
        @prevParams = null

    expandSubCqps : (subArray) ->
        padding = _.map [0...subArray.length.toString().length], -> "0"
        array = for cqp, i in subArray
            p = padding[i.toString().length..].join("")
            ["subcqp#{p}#{i}", cqp]
        return _.object array

    makeRequest: (cqp, subcqps, corpora, from, to, loginfo) ->
        super()
        self = this
        params =
            command : "count_time"
            # cqp : @expandCQP cqp
            corpus : util.encodeListParam corpora
            granularity : @granularity
            incremental: $.support.ajaxProgress

        if from
            params.from = from
        if to
            params.to = to

        # util.addCQPs params, cqp
        @addExpandedCQP params, cqp
        #TODO: fix this for struct attrs
        _.extend params, @expandSubCqps subcqps
        @addLogInfo params, loginfo
        @prevParams = params
        def = $.Deferred()

        $.ajax
            url: settings.cgi_script
            # url : "data.json"
            dataType : "json"
            data : util.compressQueryParams params

            beforeSend: (req, settings) =>
                @prevRequest = settings
                @addAuthorizationHeader req
                self.prevUrl = this.url

            progress: (data, e) =>
                progressObj = @calcProgress(e)
                return unless progressObj?
                # callback progressObj
                def.notify progressObj

            error: (jqXHR, textStatus, errorThrown) ->
                def.reject(textStatus)
            success : (data) ->
                def.resolve data
            #     [first, last] = settings.corpusListing.getTimeInterval()
            #     data

        return def.promise()


class model.NameClassificationProxy extends BaseProxy

    # Copied and modified from model.LemgramProxy (Jyrki Niemi 2015-05-29)

    constructor: ->
        super()

    makeRequest: (cqp, within, callback, loginfo) ->
        super()
        self = this
        groups = if settings.name_groups
                     (group.regex for group in settings.name_groups).join(",")
                 else
                     null
        params =
            command: "names"
            # cqp: cqp
            corpus: settings.corpusListing.stringifySelectedEncode()
            defaultwithin: "sentence"
            default_nameswithin: "text_id"
            max: settings.name_group_max_names or 30
            groups: groups
            incremental: $.support.ajaxProgress
            cache: true
        @addExpandedCQP params, cqp
        @addLogInfo params, loginfo
        @prevParams = params
        def =  $.ajax
            url: settings.cgi_script
            data: util.compressQueryParams params
            # beforeSend: (jqXHR, settings) ->
            #   c.log "before relations send", settings
            #   # self.prevRequest = settings

            # error: (data, status) ->
            #     c.log "relationsearch abort", arguments
            #     if status == "abort"
                    
            #     else
            #         lemgramResults.resultError()
                    

            success: (data) ->
                c.log "names success", data
                self.prevRequest = params
                # lemgramResults.renderResult data, word

            progress: (data, e) ->
                progressObj = self.calcProgress(e)
                return unless progressObj?
                callback progressObj

            beforeSend: (req, settings) ->
                self.prevRequest = settings
                self.addAuthorizationHeader req
                self.prevUrl = this.url
        @pendingRequests.push def
        return def
