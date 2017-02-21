korpApp = angular.module("korpApp")
korpApp.factory "utils", ($location) ->
    valfilter : (attrobj) ->
        return if attrobj.isStructAttr then "_." + attrobj.value else attrobj.value

    setupHash : (scope, config) ->
        # config = [
        #     expr : "sorttuple[0]"
        #     scope_name : "sortVal"
        #     scope_func : "locChange"
        #     key : "sortering"
        #     val_in : (val) ->
        #         newVal
        #     val_out : (val) ->
        #         newVal
        #     post_change : () ->
        #     default : [val : valval]

        # ]
        onWatch = () ->
            for obj in config
                val = $location.search()[obj.key]
                unless val
                    if obj.default? then val = obj.default else continue


                val = (obj.val_in or _.identity)(val)

                if "scope_name" of obj
                    scope[obj.scope_name] = val
                else if "scope_func" of obj
                    scope[obj.scope_func](val)
                else
                    scope[obj.key] = val

        onWatch()
        scope.$watch ( () -> $location.search() ), ->
            onWatch()

        for obj in config
            watch = obj.expr or obj.scope_name or obj.key
            scope.$watch watch, do (obj, watch) ->
                (val) ->
                    val = (obj.val_out or _.identity)(val)
                    if val == obj.default then val = null
                    $location.search obj.key, val or null
                    if obj.key == "page" then c.log "post change", watch, val
                    obj.post_change?(val)


korpApp.factory "debounce", ($timeout) ->
    (func, wait, options) ->
        args = null
        inited = null
        result = null
        thisArg = null
        timeoutDeferred = null
        trailing = true

        delayed = ->
            inited = timeoutDeferred = null
            result = func.apply(thisArg, args) if trailing
        if options is true
            leading = true
            trailing = false
        else if options and angular.isObject(options)
            leading = options.leading
            trailing = (if "trailing" of options then options.trailing else trailing)
        return () ->
            args = arguments
            thisArg = this
            $timeout.cancel timeoutDeferred
            if not inited and leading
                inited = true
                result = func.apply(thisArg, args)
            else
                timeoutDeferred = $timeout(delayed, wait)
            result

korpApp.factory 'backend', ($http, $q, utils, lexicons) ->
    requestCompare : (cmpObj1, cmpObj2, reduce) ->
        reduce = _.map reduce, (item) -> item.replace(/^_\./, "")
        
        # remove all corpora which do not include all the "reduce"-attributes
        filterFun = (item) -> settings.corpusListing.corpusHasAttrs item, reduce
        corpora1 = _.filter cmpObj1.corpora, filterFun
        corpora2 = _.filter cmpObj2.corpora, filterFun
         
        corpusListing = settings.corpusListing.subsetFactory cmpObj1.corpora

        split = _.filter(reduce, (r) -> 
            settings.corpusListing.getCurrentAttributes()[r]?.type == "set").join(',')

        attributes = _.extend {}, corpusListing.getCurrentAttributes(),
                              corpusListing.getStructAttrs()
        reduceIsStructAttr =
            _.map reduce, (attr) -> attributes[attr]?.isStructAttr

        def = $q.defer()
        params =
            command : "loglike"
            groupby : reduce.join ','
            set1_corpus : corpora1.join(",").toUpperCase()
            set1_cqp : cmpObj1.cqp
            set2_corpus : corpora2.join(",").toUpperCase()
            set2_cqp : cmpObj2.cqp
            max : 50
            split : split

        conf =
            url : settings.cgi_script
            params : params
            method : "GET"
            headers : {}


        _.extend conf.headers, model.getAuthorizationHeader()


        xhr = $http(conf)

        xhr.success (data) ->

            if data.ERROR
                def.reject()
                return

            loglikeValues = data.loglike

            objs = _.map loglikeValues, (value, key) ->
                return {
                    value: key
                    loglike: value
                }
            
            tables = _.groupBy objs, (obj) ->
                if obj.loglike > 0
                    obj.abs = data.set2[obj.value] 
                    return "positive" 
                else 
                    obj.abs = data.set1[obj.value]
                    return "negative"

            groupAndSum = (table, currentMax) ->
                groups = _.groupBy table, (obj) ->
                    obj.value.replace(/:\d+/g, "")

                res = _.map groups, (value, key) ->
                    # tokenLists = _.map key.split("/"), (tokens) ->
                    #     return tokens.split(" ")
                    tokenLists = util.splitCompareKey key, reduce,
                                                      reduceIsStructAttr
                    # c.log "tokenLists", tokenLists

                    loglike = 0
                    abs = 0
                    cqp = []
                    elems = []
                    
                    _.map value, (val) ->
                        abs += val.abs
                        loglike += val.loglike
                        elems.push val.value
                    if loglike > currentMax
                        currentMax = loglike
                    { key: key, loglike : loglike, abs : abs, elems : elems, tokenLists: tokenLists }

                return [res, currentMax]

            [tables.positive, max] = groupAndSum tables.positive, 0
            [tables.negative, max] = groupAndSum tables.negative, max

            def.resolve [tables, max, cmpObj1, cmpObj2, reduce], xhr

        return def.promise

    relatedWordSearch : (lemgram) ->
        return lexicons.relatedWordSearch(lemgram)
        #def = $q.defer()
        #lexicons.relatedWordSearch(lemgram)
        #return def.promise
        #def = $q.defer()
        ## http://spraakbanken.gu.se/ws/karp-sok?cql=lemgram==/pivot/saldo%20g%C3%A5..vb.1&resource=swefn&mini-entries=true&info=lu​
        #req = $http(
        #    #url : "http://spraakbanken.gu.se/ws/karp-sok"
        #    #method: "GET"
        #    #params :
        #    #    cql : "lemgram==/pivot/saldo " + lemgram
        #    #    resource : "swefn"
        #    #    "mini-entries" : true
        #    #    info : "lu"
        #    #    format : "json"
        #    url : "https://ws.spraakbanken.gu.se/ws/karp/v1/query"
        #    method : "GET"
        #    params :
        #
        #).success (data) ->
        #
        #    if angular.isArray data.div
        #        eNodes = data.div[0].e
        #    else if data.div
        #        eNodes = data.div.e
        #    else 
        #        eNodes = []
        #    unless angular.isArray eNodes then eNodes = [eNodes]
        #    output = for e in eNodes
        #        {
        #            label : e.s.replace("swefn--", "")
        #            words : _.pluck e.info.info.feat, "val"
        #        }
        #
        #    def.resolve output
        #
        #return def.promise

korpApp.factory 'nameEntitySearch', ($rootScope, $q) ->

    class NameEntities
        constructor: () ->

        request: (cqp) ->
            @def = $q.defer()
            @promise = @def.promise
            @proxy = new model.NameProxy()
            $rootScope.$broadcast 'map_data_available', cqp, settings.corpusListing.stringifySelected(true)
            @proxy.makeRequest(cqp, @progressCallback).then (data) =>
                @def.resolve data

        progressCallback: (progress) ->
            $rootScope.$broadcast 'map_progress', progress

    return new NameEntities()

korpApp.factory 'searches', (utils, $location, $rootScope, $http, $q, nameEntitySearch) ->

    class Searches
        constructor : () ->
            @activeSearch = null
            def = $q.defer()
            timedef = $q.defer()
            @infoDef = def.promise
            @timeDef = timedef.promise

            # is resolved when parallel search controller is loaded
            @langDef = $q.defer()
            # @modeDef = @getMode()
            # @modeDef.then () =>
            @getInfoData().then () ->
                def.resolve()
                initTimeGraph(timedef)

        kwicRequest : (cqp, isPaging) ->

            c.log "kwicRequest", cqp
            kwicResults.makeRequest(cqp, isPaging)


        kwicSearch : (cqp, isPaging) ->
            # simpleSearch.resetView()
            # kwicResults.@
            @kwicRequest cqp, isPaging
            statsResults.makeRequest cqp
            @nameEntitySearch cqp

            if settings.name_classification
                nameClassificationResults.makeRequest cqp

        lemgramSearch : (lemgram, searchPrefix, searchSuffix, isPaging) ->
            #TODO: this is dumb, move the cqp calculations elsewhere
            cqp = new model.LemgramProxy().lemgramSearch(lemgram, searchPrefix, searchSuffix)
            statsResults.makeRequest cqp
            @kwicRequest cqp, isPaging
            @nameEntitySearch cqp

            if settings.name_classification
                nameClassificationResults.makeRequest cqp

            if settings.wordpicture == false then return

            # lemgramResults.showPreloader()
            lemgramResults.makeRequest(lemgram, "lemgram")
            # def = lemgramProxy.makeRequest(lemgram, "lemgram", $.proxy(lemgramResults.onProgress, lemgramResults))
            # c.log "def", def
            # def.fail (jqXHR, status, errorThrown) ->
            #     c.log "def fail", status
            #     if status == "abort"
            #         safeApply lemgramResults.s, () =>
            #             lemgramResults.hidePreloader()

        nameEntitySearch : (cqp) ->
            if $location.search().show_map?
                nameEntitySearch.request cqp

        getMode : () ->
            def = $q.defer()
            mode = $.deparam.querystring().mode
            if mode? and mode isnt "default"
                $.getScript("modes/#{mode}_mode.js").done(->
                    $rootScope.$apply () ->
                        def.resolve()

                ).fail (args, msg, e) ->
                    $rootScope.$apply () ->
                        def.reject()
            else
                def.resolve()

            return def.promise

        getInfoData : () ->
            def = $q.defer()
            corpora = _(settings.corpusListing.corpora).pluck("id")
                      .invoke("toUpperCase").join ","
            $http(
                method : "POST"
                url : settings.cgi_script
                data : "command=info&corpus=#{corpora}"
                headers :
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            ).success (data) ->
                c.log "data", data
                for corpus in settings.corpusListing.corpora
                    corpus["info"] = data["corpora"][corpus.id.toUpperCase()]["info"]
                    # Copy possible URL and URN information in "info"
                    # to top-level properties, so that it can be
                    # specified in either the backend info file or in
                    # the frontend config (Jyrki Niemi 2014-09-04).
                    util.copyCorpusInfoToConfig corpus
                # Propagate the properties in corpus folder "info" to
                # all subfolders and corpora. (Jyrki Niemi 2014-09-08)
                for folder_name of settings.corporafolders
                    util.propagateCorpusFolderInfo(
                        settings.corporafolders[folder_name], undefined)

                c.log "loadCorpora"
                util.loadCorpora()
                def.resolve()

            return def.promise




    searches = new Searches()
    # infoDef = searches.getInfoData()


    oldValues = []
    $rootScope.$watchGroup [(() -> $location.search().search), "_loc.search().page"], (newValues) =>
        c.log "searches service watch", $location.search().search

        searchExpr = $location.search().search
        unless searchExpr then return
        [type, value...] = searchExpr?.split("|")
        value = value.join("|")
        # page = $location.search().page or 0

        newValues[1] = Number(newValues[1]) or 0
        oldValues[1] = Number(oldValues[1]) or 0
        c.log "newValues", newValues
        c.log "oldValues", oldValues

        # weird workaround for bug that makes oldValues[0] undefined sometimes
        # if not oldValues[0]?
        #     oldValues[0] = newValues[0]

        if _.isEqual newValues, oldValues
            pageChanged = false
            searchChanged = true
        else
            pageChanged = newValues[1] != oldValues[1]
            searchChanged = newValues[0] != oldValues[0]

        pageOnly = pageChanged and not searchChanged

        view.updateSearchHistory value, $location.absUrl()
        # $.when(chained).then () ->
            # $rootScope.$apply () ->
        $q.all([searches.infoDef, searches.langDef.promise]).then () ->
            switch type
                when "word"
                    searches.activeSearch =
                        type : type
                        val : value
                        page: newValues[1]
                        pageOnly: pageOnly

                when "lemgram"
                    searches.activeSearch =
                        type : type
                        val : value
                        page: newValues[1]
                        pageOnly: pageOnly


                    # $.sm.send "submit.lemgram", data
                when "saldo"
                    extendedSearch.setOneToken "saldo", value
                    # $.sm.send "submit.cqp", data
                when "cqp"
                    # advancedSearch.setCQP value
                    # if not value then value = CQP.expandOperators $location.search().cqp
                    if not value then value = $location.search().cqp
                    # c.log "cqp search", value, $location.search().cqp
                    searches.activeSearch =
                        type : type
                        val : value
                        page: newValues[1]
                        pageOnly: pageOnly


                    searches.kwicSearch value, pageOnly
            oldValues = [].concat newValues


    return searches


korpApp.service "compareSearches",
    class CompareSearches
        constructor : () ->
            if currentMode != "default"
                @key = 'saved_searches_' + currentMode
            else
                @key = "saved_searches"
            c.log "key", @key
            @savedSearches = ($.jStorage.get @key) or []

        saveSearch : (searchObj) ->
            @savedSearches.push searchObj
            $.jStorage.set @key, @savedSearches

        flush: () ->
            @savedSearches[..] = []
            $.jStorage.set @key, @savedSearches


korpApp.factory "lexicons", ($q, $http) ->
    karpURL = "https://ws.spraakbanken.gu.se/ws/karp/v1"
    getLemgrams: (wf, resources, corporaIDs) ->
        deferred = $q.defer()

        args =
            "q" : wf
            "resource" : if $.isArray(resources) then resources.join(",") else resources
        # Support an alternative lemgram service. TODO: Make the
        # service CGI script take the same arguments and return a
        # similar output as Karp, so that it would not need to be
        # special-cased here. (Jyrki Niemi 2015-12-04)
        if settings.lemgramService == "FIN-CLARIN"
            _.extend args, {wf: wf}
            url = settings.lemgrams_cgi_script
        else
            url = "#{karpURL}/autocomplete"
        $http(
            method : "GET"
            url : url
            params : args
        ).success((data, status, headers, config) ->
            if data is null
                deferred.resolve []
            else

                # Support an alternative lemgram service (Jyrki Niemi
                # 2015-12-04)
                if settings.lemgramService == "FIN-CLARIN"
                    div = (if $.isPlainObject(data.div) then [data.div] else data.div)
                    karpLemgrams = $.map(div.slice(0, Number(data.count)), (item) ->
                        item.LexicalEntry.lem
                    )
                else
                    # Pick the lemgrams. Would be nice if this was done by the backend instead.
                    karpLemgrams = _.map data.hits.hits, (entry) -> entry._source.FormRepresentations[0].lemgram

                if karpLemgrams.length is 0
                    deferred.resolve []
                    return

                lemgram = karpLemgrams.join(",")
                corpora = corporaIDs.join(",")
                $http(
                    method: 'POST'
                    url: settings.cgi_script
                    data : "command=lemgram_count&lemgram=#{lemgram}&count=lemgram&corpus=#{corpora}"
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                ).success (data, status, headers, config) =>
                    delete data.time
                    allLemgrams = []
                    for lemgram, count of data
                        allLemgrams.push {"lemgram" : lemgram, "count" : count}
                    for klemgram in karpLemgrams
                        unless data[klemgram]
                            allLemgrams.push {"lemgram" : klemgram, "count" : 0}
                    deferred.resolve allLemgrams
        ).error (data, status, headers, config) ->
            deferred.resolve []
        return deferred.promise

    getSenses: (wf) ->
        deferred = $q.defer()
        args =
            "cql" : "wf==" + wf
            "resurs" : "saldom"
            "lemgram-ac" : "true"
            "format" : "json"
            "sw-forms" : "false"
            "sms-forms" : "false"

        args =
            "q" : wf
            "resource" : "saldom"

        $http(
            method: 'GET'
            url: "#{karpURL}/autocomplete"
            params : args
        ).success((data, status, headers, config) =>
            if data is null
                deferred.resolve []
            else
                #unless angular.isArray(data) then data = [data]

                karpLemgrams = _.map data.hits.hits, (entry) -> entry._source.FormRepresentations[0].lemgram
                if karpLemgrams.length is 0
                    deferred.resolve []
                    return

                senseargs =
                    "q" : "extended||and|lemgram|equals|#{karpLemgrams.join('|')}"
                    "resource" : "saldo"
                    "show" : "sense,primary"
                    "size" : 500

                $http(
                    method: 'GET'
                    url: "#{karpURL}/minientry"
                    params : senseargs
                ).success((data, status, headers, config) ->
                    if data.hits.total is 0
                        deferred.resolve []
                        return
                    senses = _.map data.hits.hits, (entry) ->
                        {
                            "sense" : entry._source.Sense[0].senseid,
                            "desc" : entry._source.Sense[0].SenseRelations?.primary
                        }
                    deferred.resolve senses
                ).error (data, status, headers, config) ->
                    deferred.resolve []
        ).error (data, status, headers, config) ->
            deferred.resolve []
        return deferred.promise

    relatedWordSearch : (lemgram) ->
        def = $q.defer()
        req = $http(
            url : "#{karpURL}/minientry"
            method : "GET"
            params :
                q : "extended||and|lemgram|equals|#{lemgram}"
                show : "sense"
                resource : "saldo"
        ).success (data) ->
            if data.hits.total is 0
                def.resolve []
                return
            else
                senses = _.map data.hits.hits, (entry) -> entry._source.Sense[0].senseid

                http = $http(
                    url : "#{karpURL}/minientry"
                    method : "GET"
                    params :
                        q : "extended||and|LU|equals|#{senses.join('|')}"
                        show : "LU,sense"
                        resource : "swefn"
                ).success (data) ->
                    if data.hits.total is 0
                        def.resolve []
                        return
                    else
                        eNodes = _.map data.hits.hits, (entry) ->
                            {
                                "label" : entry._source.Sense[0].senseid.replace("swefn--", "")
                                "words" : entry._source.Sense[0].LU
                            }

                        def.resolve eNodes

        return def.promise
