class BaseResults
    constructor: (resultSelector, tabSelector, scope) ->
        @s = scope
        @$tab = $(tabSelector)
        @$result = $(resultSelector)

        @$result.add(@$tab).addClass "not_loading"

        @injector = $("body").injector()

        def = @injector.get("$q").defer()
        @firstResultDef = def

    onProgress: (progressObj) ->
        safeApply @s, () =>
            @s.$parent.progress = Math.round(progressObj["stats"])
            @s.hits_display = util.prettyNumbers(progressObj["total_results"])

    abort : () ->
        @ignoreAbort = false
        @proxy.abort()

    getSearchTabs : () ->
        $(".search_tabs > ul").scope().tabs

    getResultTabs : () ->
        $(".result_tabs > ul").scope().tabs

    renderResult: (data) ->
        @$result.find(".error_msg").remove()
        if data.ERROR
            safeApply @s, () =>
                @firstResultDef.reject()

            @resultError data
            return false
        else
            safeApply @s, () =>
                c.log "firstResultDef.resolve"
                @firstResultDef.resolve()
                @hasData = true

    resultError: (data) ->
        c.error "json fetch error: ", data
        @hidePreloader()
        @resetView()
        detail = ""
        @checkExpiredLogin data?.ERROR?.value
        if settings.resultErrorDetails
            detail = @makeResultErrorDetails data
        $('<object class="korp_fail" type="image/svg+xml" data="img/korp_fail.svg">')
            .append("<img class='korp_fail' src='img/korp_fail.svg'>")
            .add($("<div class='fail_text' />")
            .localeKey("fail_text"))
            .addClass("inline_block")
            .prependTo(@$result)
            .append(detail)
            .wrapAll "<div class='error_msg'>"

    # Check if the login appears to have expired and if so, present
    # the relogin modal. (Jyrki Niemi 2018-02-06)
    checkExpiredLogin: (err_msg) ->
        if err_msg and err_msg.match(/^You do not have access/)
            # This error means that the login status is out of
            # date, so log out and present the relogin modal.
            if $("body").hasClass("logged_in")
                $("body").toggleClass("logged_in not_logged_in")
            $.jStorage.deleteKey("creds")
            util.showReloginModal()
        return

    makeResultErrorDetails: (data) ->
        if not data
            return ""
        detailed_msg = data.ERROR?.value
        report_msg = $("<span />").localeKey("fail_please_report")
        if detailed_msg?
            # Remove the end of CQP syntax error messages, which
            # is not relevant to the user
            detailed_msg = detailed_msg.replace(/ <-- Synchronizing.*/, "")
            # Remove enclosing single quotation marks
            detailed_msg = detailed_msg.replace(/^'(.*)'$/, "$1")
            error_type = data.ERROR?.type
            result = $("<div class='fail_detail'>")
            result.append($("<span />").localeKey("fail_backend_error_msg"))
                  .append(": " + error_type + ": " + detailed_msg)
            # CQPError probably results from a mistake made by the
            # user, the Korp authentication error is handled when
            # checking for an expired login, and "Key is required:
            # corpus" appears when a non-logged in user tries to
            # access restricted corpora and the user is presented the
            # restricted corpora access dialogue. Other backend errors
            # probably indicate a programming error and should be
            # reported.
            if error_type == "CQPError"
                result.append("<br /><br />")
                      .append($("<span />").localeKey("fail_cqp_error"))
            else if not ((error_type == "KorpAuthenticationError" and
                          detailed_msg.match(/^You do not have access/)) or
                         (error_type == "KeyError" and
                          detailed_msg == "Key is required: corpus"))
                result.append("<br /><br />").append(report_msg)
            result.append("</div>")
            return result
        else
            if data?.message
                return $("<div class='fail_detail' />")
                        .append($("<span />").localeKey("fail_invalid_json"))
                        .append(": " + data.message)
                        .append("<br /><br />")
                        .append(report_msg)
            else
                locale_key = ""
                if data.match(/Request-URI Too Large/i)
                    locale_key = "fail_too_many_corpora"
                else if data.match(/Internal Server Error/i)
                    locale_key = "fail_internal_error"
                localized_msg = ""
                result = $("<div class='fail_detail' />")
                if locale_key
                    localized_msg = $("<span />").localeKey(locale_key)
                    result.append(localized_msg)
                    result.append(".<br /><br />")
                if locale_key != "fail_too_many_corpora"
                    result.append(report_msg)
                result.append("<br /><br />")
                result.append($("<span />").localeKey("fail_server_error_msg"))
                result.append(": " + data)
                return result

    showPreloader : () ->
        @s.$parent.loading = true

    hidePreloader : () ->
        @s.$parent.loading = false

    resetView: ->
        @hasData = false
        @$result.find(".error_msg").remove()

    countCorpora : () ->
        # Allow full stop as a list item separator in addition to
        # comma. (Jyrki Niemi 2017-09-28)
        @proxy.prevParams?.corpus.split(/[,.]/).length

    onentry : () ->
        @s.$root.jsonUrl = null
        @firstResultDef.promise.then () =>
            if @isActive()
                @s.$root.jsonUrl = @proxy?.prevUrl
    onexit : () ->
        @s.$root.jsonUrl = null

    isActive : () ->
        !!@getResultTabs()[@tabindex]?.active


class view.KWICResults extends BaseResults
    constructor : (tabSelector, resultSelector, scope) ->
        self = this
        @prevCQP = null
        super tabSelector, resultSelector, scope
        window.kwicProxy = new model.KWICProxy()
        @proxy = kwicProxy
        @readingProxy = new model.KWICProxy()
        @current_page = search().page or 0
        @tabindex = 0

        @s = scope

        @selectionManager = scope.selectionManager
        @setupReadingHash()
        @$result.click =>
            return unless @selectionManager.hasSelected()
            @selectionManager.deselect()
            safeApply @s.$root, (s) ->
                s.$root.word_selected = null

        $(document).keydown $.proxy(@onKeydown, this)

        @$result.on "click", ".word", (event) => @onWordClick(event)

    setupReadingHash : () ->
        @s.setupReadingHash()

    onWordClick : (event) ->
        c.log "word click in kwic"
        if @isActive()
            @s.$root.sidebar_visible = true
        scope = $(event.currentTarget).scope()
        obj = scope.wd
        sent = scope.sentence
        event.stopPropagation()
        word = $(event.target)

        if $("#sidebar").data()["korp-sidebar"]
            $("#sidebar").sidebar "updateContent", sent.structs, obj, sent.corpus.toLowerCase(), sent.tokens

        @selectWord word, scope, sent


    selectWord : (word, scope) ->
        obj = scope.wd
        if not obj.dephead?
            scope.selectionManager.select word, null
            safeApply @s.$root, (s) ->
                s.$root.word_selected = word
            return

        i = Number(obj.dephead)

        paragraph = word.closest(".sentence").find(".word")
        sent_start = 0
        querySentStart = ".open_sentence"
        if word.is(querySentStart)
            sent_start = paragraph.index(word)
        else

            l = paragraph.filter((__, item) ->
                $(item).is(word) or $(item).is(querySentStart)
            )
            sent_start = paragraph.index(l.eq(l.index(word) - 1))
        aux = $(paragraph.get(sent_start + i - 1))
        scope.selectionManager.select word, aux
        safeApply @s.$root, (s) ->
            s.$root.word_selected = word

    resetView: ->
        super()

    getProxy: ->
        @proxy

    isReadingMode : () ->
        @s.reading_mode

    onentry: ->
        super()
        c.log "onentry kwic"
        @s.$root.sidebar_visible = true

        @$result.find(".token_selected").click()
        _.defer () => @centerScrollbar()
        return

    onexit: ->
        super()
        c.log "onexit kwic"
        @s.$root.sidebar_visible = false
        return

    onKeydown: (event) ->
        isSpecialKeyDown = event.shiftKey or event.ctrlKey or event.metaKey
        return if isSpecialKeyDown or $("input, textarea, select").is(":focus") or
            not @$result.is(":visible")

        switch event.which
            when 78 # n
                safeApply @s, =>
                    @s.$parent.page++
                    @s.$parent.pageObj.pager = @s.$parent.page + 1
                return false
            when 70 # f
                safeApply @s, =>
                    @s.$parent.page--
                    @s.$parent.pageObj.pager = @s.$parent.page + 1
                return false
        return unless @selectionManager.hasSelected()
        switch event.which
            when 38 #up
                next = @selectUp()
            when 39 # right
                next = @selectNext()
            when 37 #left
                next = @selectPrev()
            when 40 # down
                next = @selectDown()
        @scrollToShowWord($(next)) if next
        return false


    getPageInterval: (page) ->
        items_per_page = Number(@s.$root._searchOpts.hits_per_page) or settings.hits_per_page_default
        page = Number(page)
        output = {}
        output.start = (page or 0) * items_per_page
        output.end = (output.start + items_per_page) - 1
        output

    renderCompleteResult: (data) ->
        @current_page = search().page or 0
        safeApply @s, () =>
            @hidePreloader()
            @s.hits = data.hits
            @s.hits_display  = util.prettyNumbers(data.hits or 0)
        unless data.hits
            c.log "no kwic results"
            @showNoResults()
            return
        @$result.removeClass "zero_results"
        @renderHitsPicture data

    renderResult: (data) ->
        resultError = super(data)
        return if resultError is false
        unless data.kwic then data.kwic = []
        isReading = @isReadingMode()

        if @isActive()
            @s.$root.jsonUrl = @proxy.prevUrl

        @s.$apply ($scope) =>
            if isReading
                $scope.setContextData(data)
                @selectionManager.deselect()
                @s.$root.word_selected = null
            else
                $scope.setKwicData(data)

            setTimeout(() =>
                safeApply @s, () =>
                    @s.gotFirstKwic = true

            , 0)

        if currentMode == "parallel" and not isReading
            scrollLeft = $(".table_scrollarea", @$result).scrollLeft() or 0
            for linked in $(".table_scrollarea > .kwic .linked_sentence")
                mainrow = $(linked).prev()
                unless mainrow.length then continue
                firstWord = mainrow.find(".left .word:first")
                if not firstWord.length then firstWord = mainrow.find(".match .word:first")
                offset = (firstWord.position().left + scrollLeft) - 25
                $(linked).find(".lnk").css("padding-left", Math.round(offset))

        @$result.localize()
        @centerScrollbar()
        if not @selectionManager.hasSelected() and not isReading
            @$result.find(".match").children().first().click()

        @resultData = data

    showNoResults: ->
        @hidePreloader()
        @$result.addClass("zero_results").click()
        @$result.find(".hits_picture").html ""

    renderHitsPicture: (data) ->
        items = _.map data.corpus_order, (obj) ->
            {"rid" : obj,
            "rtitle" : settings.corpusListing.getTitle(obj.toLowerCase()),
            "relative" : data.corpus_hits[obj] / data.hits,
            "abs" : data.corpus_hits[obj]}
        items = _.filter items, (item) -> item.abs > 0
        # calculate which is the first page of hits for each item
        index = 0
        _.each items, (obj) =>
            obj.page = Math.floor(index / @proxy.prevMisc.hitsPerPage )
            index += obj.abs

        @s.$apply ($scope) ->
            $scope.hitsPictureData = items

    scrollToShowWord: (word) ->
        unless word.length then return
        offset = 200
        wordTop = word.offset().top
        newY = window.scrollY
        if wordTop > $(window).height() + window.scrollY
            newY += offset
        else newY -= offset if wordTop < window.scrollY
        $("html, body").stop(true, true).animate scrollTop: newY
        wordLeft = word.offset().left
        area = @$result.find(".table_scrollarea")
        newX = Number(area.scrollLeft())
        if wordLeft > (area.offset().left + area.width())
            newX += offset
        else newX -= offset if wordLeft < area.offset().left
        area.stop(true, true).animate scrollLeft: newX

    buildQueryOptions: (cqp, isPaging) ->
        opts = {}
        getSortParams = () ->
            sort = search().sort
            unless sort then return {}
            if sort == "random"
                if search().random_seed
                    rnd = search().random_seed
                else
                    rnd = Math.ceil(Math.random() * 10000000)
                    search random_seed: rnd

                return {
                    sort : sort
                    random_seed : rnd
                }
            return {sort : sort}

        if @isReadingMode()
            preferredContext = settings.defaultReadingContext
            avoidContext = settings.defaultOverviewContext
        else
            preferredContext = settings.defaultOverviewContext
            avoidContext = settings.defaultReadingContext

        context = settings.corpusListing.getContextQueryString(preferredContext, avoidContext)

        opts.ajaxParams = {
            command : "query"
            corpus : settings.corpusListing.stringifySelectedEncode()
            # cqp : cqp or @proxy.prevCQP
            queryData : @proxy.queryData if @proxy.queryData
            context : context
            defaultcontext : preferredContext
            incremental: !isPaging and $.support.ajaxProgress
        }
        util.addCQPs opts.ajaxParams, cqp or @proxy.prevCQP or @proxy.prevParams
        pq_within = if "cqp1" of opts.ajaxParams
                        $("#prequery_within").val()
        # FIXME: The backend probably should have a separate prequery
        # within parameter, so that it could be used independently of
        # the (default)within parameter of the main query.
        _.extend opts.ajaxParams, defaultwithin: pq_within
        _.extend opts.ajaxParams, getSortParams()
        return opts

    makeRequest: (cqp, isPaging) ->
        c.log "kwicResults.makeRequest", cqp, isPaging

        page = Number(search().page) or 0

        if !@hasInitialized?
            c.log "not init set page", page + 1
            @s.$parent.pageObj.pager = page + 1
        else if not isPaging
            @s.gotFirstKwic = false
            @s.$parent.pageObj.pager = 0
            c.log "not isPaging page reset"

        @hasInitialized ?= false
        @showPreloader()
        @s.aborted = false

        if @proxy.hasPending()
            @ignoreAbort = true
        else
            @ignoreAbort = false

        params = @buildQueryOptions(cqp, isPaging)
        progressCallback = if ((not params.ajaxParams.incremental)) then $.noop else $.proxy(@onProgress, this)

        req = @getProxy().makeRequest params,
                            page,
                            progressCallback,
                            (data) =>
                                @renderResult data
        req.success (data) =>
            @hidePreloader()
            @renderCompleteResult(data)
        req.fail (jqXHR, status, errorThrown) =>
            c.log "kwic fail"
            if @ignoreAbort
                c.log "kwic ignoreabort"
                return
            if status == "abort"
                safeApply @s, () =>
                    @hidePreloader()
                    @s.aborted = true
            else
                @resultError errorThrown



    getActiveData : () ->
        if @isReadingMode()
            @s.contextKwic
        else
            @s.kwic


    centerScrollbar: ->
        m = @$result.find(".match:first")
        return unless m.length
        area = @$result.find(".table_scrollarea").scrollLeft(0)
        match = m.first().position().left + m.width() / 2
        sidebarWidth = $("#sidebar").outerWidth() or 0
        area.stop(true, true).scrollLeft match - ($("body").innerWidth() - sidebarWidth) / 2
        return

    getCurrentRow: ->
        tr = @$result.find(".token_selected").closest("tr")
        if @$result.find(".token_selected").parent().is("td")
            tr.find "td > .word"
        else
            tr.find "div > .word"

    selectNext: ->
        unless @isReadingMode()
            i = @getCurrentRow().index(@$result.find(".token_selected").get(0))
            next = @getCurrentRow().get(i + 1)
            return unless next?
            $(next).click()

        else
            next = @$result.find(".token_selected").next().click()
        return next

    selectPrev: ->
        unless @isReadingMode()
            i = @getCurrentRow().index(@$result.find(".token_selected").get(0))
            return if i is 0
            prev = @getCurrentRow().get(i - 1)
            $(prev).click()
        else
            prev = @$result.find(".token_selected").prev().click()
        return prev

    selectUp: ->
        current = @selectionManager.selected
        unless @isReadingMode()
            prevMatch = @getWordAt(current.offset().left + current.width() / 2, current.closest("tr").prevAll(".not_corpus_info").first())
            prevMatch.click()
        else
            searchwords = current.prevAll(".word").get().concat(current.closest(".not_corpus_info").prevAll(".not_corpus_info").first().find(".word").get().reverse())
            def = current.parent().prev().find(".word:last")
            prevMatch = @getFirstAtCoor(current.offset().left + current.width() / 2, $(searchwords), def).click()

        return prevMatch

    selectDown: ->
        current = @selectionManager.selected
        unless @isReadingMode()
            nextMatch = @getWordAt(current.offset().left + current.width() / 2, current.closest("tr").nextAll(".not_corpus_info").first())
            nextMatch.click()
        else
            searchwords = current.nextAll(".word").add(current.closest(".not_corpus_info").nextAll(".not_corpus_info").first().find(".word"))
            def = current.parent().next().find(".word:first")
            nextMatch = @getFirstAtCoor(current.offset().left + current.width() / 2, searchwords, def).click()
        return nextMatch

    getFirstAtCoor: (xCoor, wds, default_word) ->
        output = null
        wds.each (i, item) ->
            thisLeft = $(this).offset().left
            thisRight = $(this).offset().left + $(this).width()
            if xCoor > thisLeft and xCoor < thisRight
                output = $(this)
                false

        output or default_word

    getWordAt: (xCoor, $row) ->
        output = $()
        $row.find(".word").each ->
            output = $(this)
            thisLeft = $(this).offset().left
            thisRight = $(this).offset().left + $(this).width()
            false if (xCoor > thisLeft and xCoor < thisRight) or thisLeft > xCoor

        output

    downloadKwic: (format_params) ->
        util.downloadKwic format_params, @proxy.prevRequest.url, @resultData


class view.ExampleResults extends view.KWICResults
    constructor: (tabSelector, resultSelector, scope) ->
        c.log "ExampleResults constructor", tabSelector, resultSelector, scope
        super tabSelector, resultSelector, scope
        @proxy = new model.KWICProxy()

        @current_page = 1
        if @s.$parent.kwicTab.queryParams
            @makeRequest().then () =>
                @onentry()
        @tabindex = (@getResultTabs().length - 1) + @s.$parent.$index

    setupReadingHash : () ->

    isReadingMode: () ->
        return @s.exampleReadingMode

    makeRequest: () ->
        c.log "ExampleResults.makeRequest()", @current_page
        items_per_page = parseInt($("#search_options").find(".num_hits").val())
        opts = @s.$parent.kwicTab.queryParams

        @resetView()
        opts.ajaxParams.incremental = false

        opts.ajaxParams.start = (@current_page - 1) * items_per_page
        opts.ajaxParams.end = (opts.ajaxParams.start + items_per_page - 1)

        prev = _.pick @proxy.prevParams, "cqp", "command", "corpus", "head", "rel", "source", "dep", "depextra"
        _.extend opts.ajaxParams, prev

        if @isReadingMode()
            preferredContext = settings.defaultReadingContext
            avoidContext = settings.defaultOverviewContext
        else
            preferredContext = settings.defaultOverviewContext
            avoidContext = settings.defaultReadingContext

        context = settings.corpusListing.getContextQueryString(preferredContext, avoidContext)
        _.extend opts.ajaxParams, {context: context, defaultcontext : preferredContext }

        @showPreloader()

        progress = if opts.command == "query" then $.proxy(this.onProgress, this) else $.noop
        def = @proxy.makeRequest opts, null, progress, ((data) =>
            @renderResult data, opts.cqp
            @renderCompleteResult data
            safeApply @s, () =>
                @hidePreloader()),
            "ex_kwic"        # loginfo

        def.fail (jqXHR, status, errorThrown) ->
            safeApply @s, () =>
                @hidePreloader()
                if status == "abort"
                    @s.aborted = true
                else
                    @resultError errorThrown



    renderResult : (data) ->
        super(data)
        @s.setupReadingWatch()


    renderCompleteResult : (data) ->
        curr = @current_page
        super(data)
        @current_page = curr


class view.LemgramResults extends BaseResults
    constructor: (tabSelector, resultSelector, scope) ->
        self = this
        super tabSelector, resultSelector, scope
        @s = scope
        @tabindex = 3
        @proxy = new model.LemgramProxy()

    resetView: ->
        super()
        safeApply @s, () =>
            @s.$parent.aborted = false
            @s.$parent.no_hits = false

    makeRequest: (word, type) ->
        if @proxy.hasPending()
            @ignoreAbort = true
        else
            @ignoreAbort = false
            @resetView()

        @showPreloader()
        def = @proxy.makeRequest word, type, (args...) =>
            @onProgress args...

        def.success (data) =>
            safeApply @s, () =>
                @renderResult(data, word)
        def.fail (jqXHR, status, errorThrown) =>
            c.log "def fail", status
            if @ignoreAbort
                return
            if status == "abort"
                safeApply @s, () =>
                    @hidePreloader()
                    @s.$parent.aborted = true
            else
                @resultError errorThrown


    renderResult: (data, query) ->
        resultError = super(data)
        @hidePreloader()
        @s.$parent.progress = 100
        return if resultError is false
        unless data.relations
            @s.$parent.no_hits = true
        else if util.isLemgramId(query)
            @renderTables query, data.relations
        else
            @renderWordTables query, data.relations

    renderWordTables: (word, data) ->
        wordlist = $.map(data, (item) ->
            output = []
            output.push [item.head, item.headpos.toLowerCase()] if item.head.split("_")[0] is word
            output.push [item.dep, item.deppos.toLowerCase()] if item.dep.split("_")[0] is word
            output
        )
        unique_words = _.uniq wordlist, ([word, pos]) ->
            word + pos
        tagsetTrans = _.invert settings.wordpictureTagset
        unique_words = _.filter unique_words, ([currentWd, pos]) ->
            settings.wordPictureConf[tagsetTrans[pos]]?
        if not unique_words.length
            @showNoResults()
            return

        @drawTables unique_words, data
        @hidePreloader()


    renderTables: (lemgram, data) ->
        if data[0].head == lemgram
            wordClass = data[0].headpos
        else
            wordClass = data[0].deppos
        @drawTables [[lemgram, wordClass]], data
        @hidePreloader()

    drawTables: (tables, data) ->
        inArray = (rel, orderList) ->
            i = _.findIndex orderList, (item) ->
                (item.field_reverse or false) == (rel.field_reverse or false) and item.rel == rel.rel
            type = (if rel.field_reverse then "head" else "dep")
            i : i
            type : type

        tagsetTrans = _.invert settings.wordpictureTagset

        res = _.map(tables, ([token, wordClass]) ->
            getRelType = (item) ->
                return {rel : tagsetTrans[item.rel.toLowerCase()] , field_reverse : item.dep == token}

            wordClassShort = wordClass.toLowerCase()
            wordClass = (_.invert settings.wordpictureTagset)[wordClassShort]

            unless settings.wordPictureConf[wordClass]?
                return
            orderArrays = [[], [], []]
            $.each data, (index, item) =>
                $.each settings.wordPictureConf[wordClass] or [], (i, rel_type_list) =>
                    list = orderArrays[i]
                    rel = getRelType(item)

                    return unless rel
                    ret = inArray(rel, rel_type_list)
                    return if ret.i is -1
                    list[ret.i] = [] unless list[ret.i]
                    item.show_rel = ret.type
                    list[ret.i].push item

            $.each orderArrays, (i, unsortedList) ->
                $.each unsortedList, (_, list) ->
                    if list
                        list.sort (first, second) ->
                            second.mi - first.mi


                if settings.wordPictureConf[wordClass][i] and unsortedList.length
                    toIndex = $.inArray("_", settings.wordPictureConf[wordClass][i])
                    if util.isLemgramId(token)
                        unsortedList[toIndex] = word: token.split("..")[0].replace(/_/g, " ")

                    else
                        unsortedList[toIndex] = word: util.lemgramToString(token)

                unsortedList = $.grep(unsortedList, (item, index) ->
                    Boolean item
                )

            orderArrays = _.map orderArrays, (section, i) ->
                return _.map section, (table, j) ->
                    if table and table[0]
                        rel = table[0].rel
                        show_rel = table[0].show_rel
                        all_lemgrams = _.unique (_.map (_.pluck table, show_rel), (item) ->
                            if util.isLemgramId item
                                return item.slice 0, -1
                            else
                                return item)
                        return { table: table, rel: rel, show_rel: show_rel, all_lemgrams: all_lemgrams }
                    else
                        return { table: table }

            return {"token": token, "wordClass": wordClass, "wordClassShort": wordClassShort, "data": orderArrays})

        @s.$root.$broadcast 'word_picture_data_available', res

    onentry: ->
        c.log "word pic onentry"
        super()
        return

    onexit: ->
        c.log "word pic onexit"
        super()
        clearTimeout self.timeout
        safeApply @s, () =>
            @s.$root.sidebar_visible = false
        return

    showNoResults: ->
        @hidePreloader()


class view.StatsResults extends BaseResults
    constructor: (resultSelector, tabSelector, scope) ->
        super resultSelector, tabSelector, scope
        c.log "StatsResults constr",
        self = this
        @tabindex = 2
        @gridData = null

        @doSort = true
        @sortColumn = null

        @proxy = new model.StatsProxy()
        window.statsProxy = @proxy
        @$result.on "click", ".arcDiagramPicture", (event) =>
            parts = $(event.currentTarget).attr("id").split("__")

            if parts[1] != "Σ"
                @newDataInGraph parts[1]
            else # The ∑ row
                @newDataInGraph "SIGMA_ALL"

        @$result.on "click", ".slick-cell .statistics-link", (e) =>
            rowIx = $(e.currentTarget).data "row"
            rowData = @grid.getData()[rowIx]

            cqp2 = statisticsFormatting.getCqp(@searchParams.reduceVals, rowData.hit_value, @searchParams.ignoreCase)
            corpora = @searchParams.corpora

            opts = {}
            opts.ajaxParams =
                start : 0
                end : 24
                command : "query"
                corpus : util.encodeListParam(corpora)
                cqp : self.proxy.prevParams.cqp
                cqp2: cqp2
                expand_prequeries : false

            safeApply scope.$root, () ->
                scope.$root.kwicTabs.push { queryParams: opts }

        $(window).resize _.debounce( () =>
            @resizeGrid()
        , 100)

        $("#kindOfData,#kindOfFormat").change () =>
            @showGenerateExport()

        $("#exportButton").hide();
        $("#generateExportButton").unbind("click").click () =>
            @hideGenerateExport()
            @updateExportBlob()

        if $("html.msie7,html.msie8").length
            $("#showGraph").hide()
            return

        $("#showGraph").on "click", () =>
            if $("#showGraph").is(".disabled") then return
            params = @proxy.prevParams
            reduceVal = params.groupby

            subExprs = []
            labelMapping = {}

            showTotal = false

            for rowIx in @getSelectedRows()
                if rowIx == 0
                    showTotal = true
                    continue

                row = @getDataAt(rowIx)
                cqp = statisticsFormatting.getCqp @searchParams.reduceVals, row.hit_value, @searchParams.ignoreCase
                subExprs.push cqp
                texts = statisticsFormatting.getTexts @searchParams.reduceVals, row.hit_value, @searchParams.corpora
                labelMapping[cqp] = texts.join ", "

            activeCorpora = _.flatten [key for key, val of @savedData.corpora when val.sums.absolute]

            @s.$apply () =>
                @s.onGraphShow
                    cqp : @proxy.prevNonExpandedCQP
                    subcqps : subExprs
                    labelMapping : labelMapping
                    showTotal : showTotal
                    corpusListing : settings.corpusListing.subsetFactory activeCorpora


    updateExportBlob : () ->
        selVal = $("#kindOfData option:selected").val()
        selType = $("#kindOfFormat option:selected").val()
        dataDelimiter = ";"
        dataDelimiter = "%09" if selType is "tsv"
        cl = settings.corpusListing.subsetFactory(_.keys @savedData.corpora)

        header = [
            util.getLocaleString("stats_hit"),
            util.getLocaleString("stats_total")
        ]
        header = header.concat _.pluck cl.corpora, "title"

        fmt = (what) ->
            what.toString()

        total = ["Σ", fmt @savedData.total.sums[selVal]]

        total = total.concat (fmt @savedData.corpora[corp.toUpperCase()].sums[selVal] for corp in _.pluck cl.corpora, "id")



        output = [
            total
        ]

        for wd in @savedWordArray
            row = [wd, fmt @savedSummarizedData.total[selVal][wd]]
            values = for corp in _.pluck cl.corpora, "id"
                val = @savedSummarizedData[corp.toUpperCase()][selVal][wd]
                if val
                    val = fmt val
                else
                    val = "0"


            output.push row.concat values


        csv = new CSV(output, {
            header : header
            delimiter : dataDelimiter
        })

        csvstr = csv.encode()

        blob = new Blob([csvstr], { type: "text/#{selType}"})
        csvUrl = URL.createObjectURL(blob)

        $("#exportButton", @$result).attr({
            download : "export.#{selType}"
            href : csvUrl
        })

    makeRequest : (cqp) ->
        c.log "StatsResults makeRequest", cqp

        if currentMode == "parallel"
            cqp = cqp.replace(/\:LINKED_CORPUS.*/, "")

        if @proxy.hasPending()
            @ignoreAbort = true
        else
            @ignoreAbort = false
            @resetView()

        @showPreloader()
        @proxy.makeRequest(cqp, ((args...) => @onProgress(args...))
        ).done( ([data, wordArray, columns, dataset, summarizedData, searchParams]) =>
            safeApply @s, () =>
                @hidePreloader()
            @savedData = data
            @savedSummarizedData = summarizedData
            @savedWordArray = wordArray
            @searchParams = searchParams
            @renderResult columns, dataset

        ).fail (textStatus, err) =>
            c.log "fail", arguments
            c.log "stats fail", @s.$parent.loading, _.map @proxy.pendingRequests, (item) -> item.readyState
            if @ignoreAbort
                c.log "stats ignoreabort"
                return
            safeApply @s, () =>
                @hidePreloader()
                if textStatus == "abort"
                    @s.aborted = true
                else if err?
                    @resultError err
                else
                    @resultError textStatus

    getSelectedRows: () ->
        if @grid
            return @grid.getSelectedRows().sort()
        else
            return []

    getDataAt: (rowIx) ->
        return @grid.getData()[rowIx]

    showGenerateExport: () ->
        $("#exportButton").hide();
        $("#generateExportButton").show();

    hideGenerateExport: () ->
        $("#exportButton").show();
        $("#generateExportButton").hide();

    renderResult: (columns, data) ->
        @showGenerateExport()
      
        refreshHeaders = ->
            $(".localized-header .slick-column-name").not("[rel^=localize]").each ->
                $(this).localeKey $(this).text()

        @gridData = data
        resultError = super(data)
        return if resultError is false

        if data[0].total_value.absolute == 0
            safeApply @s, () =>
                @s.no_hits = true
            return

        # The number of rows in the statistics table, excluding the sum
        @s.stats_num_values_display = util.prettyNumbers(data.length - 1)

        checkboxSelector = new Slick.CheckboxSelectColumn
            cssClass: "slick-cell-checkboxsel"

        columns = [checkboxSelector.getColumnDefinition()].concat(columns)

        grid = new Slick.Grid $("#myGrid"), data, columns,
            enableCellNavigation: false
            enableColumnReorder: false

        grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}))
        grid.registerPlugin(checkboxSelector)
        @grid = grid
        @grid.autosizeColumns()

        sortCol = columns[2]
        log = _.debounce () ->
            c.log "grid sort"
        , 200
        grid.onSort.subscribe (e, args) =>
            if @doSort
                sortColumns = grid.getSortColumns()[0]
                @sortColumn = sortColumns.columnId
                @sortAsc = sortColumns.sortAsc
                sortCol = args.sortCol
                data.sort (a, b) ->
                    if(a.id == "row_total")
                        return -1
                    if(b.id == "row_total")
                        return -1
                    log()
                    if sortCol.field is "hit_value"
                        x = a[sortColumns.columnId]
                        y = b[sortColumns.columnId]
                    else
                        x = a[sortCol.field][0] or 0
                        y = b[sortCol.field][0] or 0
                    ret = ((if x is y then 0 else ((if x > y then 1 else -1))))
                    ret *= -1 unless args.sortAsc
                    ret

                grid.setData data
                grid.updateRowCount()
                grid.render()
            else
                if @sortColumn
                    grid.setSortColumn @sortColumn, @sortAsc
                else
                    grid.setSortColumns []

        grid.onColumnsResized.subscribe (e, args) =>
            @doSort = false # if sort event triggered, sorting will not occur
            @resizeGrid()
            e.stopImmediatePropagation()

        grid.onHeaderClick.subscribe (e, args) =>
            @doSort = true # enable sorting again, resize is done
            e.stopImmediatePropagation()

        grid.onHeaderCellRendered.subscribe (e, args) ->
            refreshHeaders()

        refreshHeaders()
        $(".slick-row:first input", @$result).click()
        $(window).trigger("resize")

        $.when(timeDeferred).then =>
            safeApply @s, () =>
                @updateGraphBtnState()

        @s.getGeoAttributes(@proxy.prevParams.corpus.split(","))

        safeApply @s, () =>
            @hidePreloader()

    updateGraphBtnState : () ->

        @s.graphEnabled = true
        cl = settings.corpusListing.subsetFactory(
                util.decodeListParam(@proxy.prevParams.corpus))

        if not (_.compact cl.getTimeInterval()).length
            @s.graphEnabled = false

    resizeGrid : () ->
        height = 0
        $('.slick-row').each () ->
            height += $(this).outerHeight true
        $("#myGrid:visible.slick-viewport").height height

        # adding 20 px to width if vertical scrollbar appears
        if @gridData?.length * 25 >= height
            width = 20
        else
            width = 0

        $('.slick-header-column').each () ->
            width += $(this).outerWidth true
        if width > ($(window).width() - 40)
            width = $(window).width() - 40
        $("#myGrid:visible.slick-viewport").width width

        @grid?.resizeCanvas()
        @grid?.invalidate()

    newDataInGraph : (dataName) ->
        dataItems = []
        wordArray = []
        corpusArray = []
        @lastDataName = dataName

        $.each @savedSummarizedData, (corpus, obj) =>
            if corpus == "total"
                return

            if dataName is "SIGMA_ALL"
                # ∑ selected
                totfreq = 0
                $.each obj["relative"], (wordform, freq) ->
                    numFreq = parseFloat(freq)
                    totfreq += numFreq if numFreq

                dataItems.push
                    value: totfreq
                    caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(totfreq.toString())
                    shape_id: "sigma_all"

            else
                # Individual wordform selected
                freq = parseFloat(obj["relative"][dataName])
                if freq
                    dataItems.push
                        value: freq
                        caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(freq.toString())
                        shape_id: dataName

                else
                    dataItems.push
                        value: 0
                        caption: ""
                        shape_id: dataName


        $("#dialog").remove()

        relHitsString = util.getLocaleString("statstable_relfigures_hits")
        $("<div id='dialog' />")
        .appendTo("body")
        # rel="localize[...]" does not seem to localize the texts here,
        # nor does Angular localization seem to work, so use
        # util.getLocaleString directly. (Jyrki Niemi 2015-04-29)
        .append("""<div id="pieDiv"><br/><div id="statistics_switch" style="text-align:center">
                            <a href="javascript:" rel="localize[statstable_relfigures]" data-mode="relative">#{util.getLocaleString("statstable_relfigures")}</a>
                            <a href="javascript:" rel="localize[statstable_absfigures]" data-mode="absolute">#{util.getLocaleString("statstable_absfigures")}</a>
                        </div>
                        <div id="chartFrame" style="height:380"></div>
                        <p id="hitsDescription" style="text-align:center" rel="localize[statstable_absfigures_hits]">#{relHitsString}</p></div>"""
        ).dialog(
            width: 400
            height: 500
            close: () ->
                $("#pieDiv").remove()
        ).css("opacity", 0)
        .parent().find(".ui-dialog-title").localeKey("statstable_hitsheader_lemgram")
        $("#dialog").fadeTo 400, 1
        $("#dialog").find("a").blur() # Prevents the focus of the first link in the "dialog"
        stats2Instance = $("#chartFrame").pie_widget(
            container_id: "chartFrame"
            data_items: dataItems
        )
        statsSwitchInstance = $("#statistics_switch").radioList(
            change: =>
                typestring = statsSwitchInstance.radioList("getSelected").attr("data-mode")
                dataItems = []
                dataName = @lastDataName
                $.each @savedSummarizedData, (corpus, obj) ->
                    if corpus == "total"
                        return;

                    if dataName is "SIGMA_ALL"

                        # sigma selected
                        totfreq = 0
                        $.each obj[typestring], (wordform, freq) ->
                            if typestring is "absolute"
                                numFreq = parseInt(freq)
                            else
                                numFreq = parseFloat(freq)
                            totfreq += numFreq if numFreq

                        dataItems.push
                            value: totfreq
                            caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(totfreq.toString(), false)
                            shape_id: "sigma_all"

                    else

                        # Individual wordform selected
                        if typestring is "absolute"
                            freq = parseInt(obj[typestring][dataName])
                        else
                            freq = parseFloat(obj[typestring][dataName])
                        if freq
                            dataItems.push
                                value: freq
                                caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(freq.toString(), false)
                                shape_id: dataName

                        else
                            dataItems.push
                                value: 0
                                caption: ""
                                shape_id: dataName


                stats2Instance.pie_widget "newData", dataItems
                if typestring is "absolute"
                    loc = "statstable_absfigures_hits"
                else
                    loc = "statstable_relfigures_hits"
                $("#hitsDescription").localeKey loc

            selected: "relative"
        )

    onentry : () ->
        super()
        $(window).trigger("resize")
        return
    # onexit : () ->

    resetView: ->
        super()
        $("myGrid").empty()
        $("#exportStatsSection").show()
        $("#exportButton").attr({
            download : null,
            href : null
        })
        @s.no_hits = false
        @s.aborted = false


class view.GraphResults extends BaseResults
    constructor : (tabSelector, resultSelector, scope) ->
        super(tabSelector, resultSelector, scope)


        @validZoomLevels = [
            "year"
            "month"
            "day"
            "hour"
            "minute"
            "second"
        ]
        @granularities = {
            "year" : "y"
            "month" : "m"
            "day" : "d"
            "hour" : "h"
            "minute" : "n"
            "second" : "s"
        }

        @zoom = "year"
        # values: y m d h n s
        # @granularity = @zoom[0]
        # @corpora = null
        @proxy = new model.GraphProxy()

        [from, to] = settings.corpusListing.getMomentInterval()
        c.log "from, to", from, to

        @checkZoomLevel(from, to, true)


        c.log "adding chart listener", @$result

        $(".chart", @$result).on "click", (event) =>

            target = $(".chart", @$result)
            val = $(".detail .x_label > span", target).data "val"
            cqp = $(".detail .item.active > span", target).data("cqp")
            c.log "chart click", cqp, target, @s.data.subcqps, @s.data.cqp
            # time =


            if cqp
                cqp = CQP.expandOperators decodeURIComponent cqp
                c.log "cqp", cqp
                m = moment(val * 1000)


                datefrom = moment(m).startOf(@zoom).format("YYYYMMDD")
                dateto = moment(m).endOf(@zoom).format("YYYYMMDD")
                if (@validZoomLevels.indexOf @zoom) < 3 # year, month, day
                    timecqp = """(int(_.text_datefrom) >= #{datefrom} & int(_.text_dateto) <= #{dateto}) |
                        (int(_.text_datefrom) <= #{datefrom} & int(_.text_dateto) >= #{dateto})"""
                    # If specified, allow bare years in text_datefrom and
                    # text_dateto for backward compatibility
                    # (Jyrki Niemi 2013-12-12)
                    if settings.textDateAllowBareYears
                        year = m.format("YYYY")
                        timecqp = "(" + timecqp + " | (int(_.text_datefrom) = #{year} & int(_.text_dateto) = #{year}))"
                    timecqp = "[" + timecqp + "]"


                else # hour, minute, second
                    timefrom = moment(m).startOf(@zoom).format("HHmmss")
                    timeto = moment(m).endOf(@zoom).format("HHmmss")
                    c.log "timefrom", timefrom, timeto

                    timecqp = """[(int(_.text_datefrom) = #{datefrom} & int(_.text_timefrom) >= #{timefrom} & int(_.text_dateto) <= #{dateto} & int(_.text_timeto) <= #{timeto}) |
                     ((int(_.text_datefrom) < #{datefrom} | (int(_.text_datefrom) = #{datefrom} & int(_.text_timefrom) <= #{timefrom})) & (int(_.text_dateto) > #{dateto} | (int(_.text_dateto) = #{dateto} & int(_.text_timeto) >= #{timeto})))]"""

                    # (datefrom == 20140101 & timefrom >= 120000 & dateto == 20140101 & timeto <= 160000)
                    # |
                    # ((datefrom < 20140101 | (datefrom == 20140101 & timefrom <= 120000)) & (dateto > 20140101 | (dateto == 20140101 & timeto >= 160000)))

                n_tokens = @s.data.cqp.split("]").length - 2

                timecqp = ([timecqp].concat (_.map [0...n_tokens], () -> "[]")).join(" ")

                opts = {}
                opts.ajaxParams =
                    start : 0
                    end : 24
                    command : "query"
                    corpus: @s.data.corpusListing.stringifySelectedEncode()
                    cqp: @s.data.cqp
                    # cqp2 : cqp
                    cqp2 : timecqp
                    expand_prequeries : false


                safeApply @s.$root, () =>
                    @s.$root.kwicTabs.push { queryParams: opts }



    # onentry : () ->
    #     super
    # onexit : ->

    # getNextZoom : () ->
    #     i = @validZoomLevels.indexOf @zoom
    #     return @validZoomLevels[i + 1]
    # getPrevZoom : () ->
    #     i = @validZoomLevels.indexOf @zoom
    #     return @validZoomLevels[i - 1]


    resetPreloader : () ->
        # $(".preloader", @$result).css
        #     width : 0;

    drawPreloader : (from, to) ->
        if @graph
            left = @graph.x from.unix()
            width = (@graph.x to.unix()) - left
        else
            left = 0
            width = "100%"

        $(".preloader", @$result).css
            left : left
            width : width

    setZoom : (zoom, from, to) ->
        @zoom = zoom
        fmt = "YYYYMMDDHHmmss"

        @drawPreloader from, to
        @proxy.granularity = @granularities[zoom]
        @makeRequest @s.data.cqp,
            @s.data.subcqps,
            @s.data.corpusListing,
            @s.data.labelMapping,
            @s.data.showTotal,
            from.format(fmt),
            to.format(fmt)


    checkZoomLevel : (from, to, forceSearch) ->
        unless from?
            {x : [from, to]} = @graph.renderer.domain()
            from = moment.unix(from)
            from.start
            to = moment.unix(to)


        oldZoom = @zoom

        newZoom = null
        idealNumHits = 1000
        newZoom = _.min @validZoomLevels, (zoom) ->
            nPoints = to.diff(from, zoom)
            return Math.abs(idealNumHits - nPoints)


        # for zoom in @validZoomLevels
        #     nPoints = to.diff(from, zoom)
        #     c.log "nPoints", nPoints
        #     if 3600 > nPoints > 100
        #         c.log "zoom sweet spot:", zoom, nPoints
        #         newZoom = zoom
        #         break

        c.log "newZoom", newZoom
        if (newZoom and (oldZoom != newZoom) or forceSearch)
            @setZoom(newZoom, from, to)



    parseDate : (zoom, time) ->
        switch zoom
            when "year"
                return moment(time, "YYYY")
            when "month"
                return moment(time, "YYYYMM")
            when "day"
                return moment(time, "YYYYMMDD")
            when "hour"
                return moment(time, "YYYYMMDDHH")
            when "minute"
                return moment(time, "YYYYMMDDHHmm")
            when "second"
                return moment(time, "YYYYMMDDHHmmss")



        # return moment([Number(year), Number(month) - 1, Number(day) - 1])


    fillMissingDate : (data) ->
        dateArray = _.pluck data, "x"
        min = _.min dateArray, (mom) -> mom.toDate()
        max = _.max dateArray, (mom) -> mom.toDate()

        min.startOf(@zoom)
        max.endOf(@zoom)

        n_diff = moment(max).diff min, @zoom
        # c.log "n_diff", n_diff

        momentMapping = _.object _.map data, (item) =>
            mom = moment(item.x)
            mom.startOf(@zoom)
            [mom.unix(), item.y]

        newMoments = []
        for i in [0..n_diff]
            newMoment = moment(min).add(i, @zoom)

            maybeCurrent = momentMapping[newMoment.unix()]
            if typeof maybeCurrent != 'undefined'
                lastYVal = maybeCurrent
            else
                newMoments.push {x : newMoment, y : lastYVal}


        return [].concat data, newMoments




    getSeriesData : (data, showSelectedCorporasStartDate, zoom) ->
        delete data[""]
        # TODO: getTimeInterval should take the corpora of this parent tab instead of the global ones.
        # [first, last] = settings.corpusListing.getTimeInterval()
        [firstVal, lastVal] = settings.corpusListing.getMomentInterval()
        # firstVal = @parseDate @granularity, first
        # lastVal = @parseDate @granularity, last.toString()

        # hasFirstValue = false
        # hasLastValue = false
        output = for [x, y] in (_.pairs data)
            mom = (@parseDate @zoom, x)
            # if mom.isSame firstVal then hasFirstValue = true
            # if mom.isSame lastVal then hasLastValue = true
            {x : mom, y : y}

        # if (not hasFirstValue) and showSelectedCorporasStartDate
        # if showSelectedCorporasStartDate # Don't remove first value for now
            # output.push {x : firstVal, y:0}

        prettyDate = (item) ->
            moment(item.x).format("YYYYMMDD:HHmmss")
        # c.log "firstVal", prettyDate(firstVal)

        # c.log "output before", (_.map output, prettyDate).join(" | ")
        output = @fillMissingDate output
        # c.log "output before", (_.map output, prettyDate).join(" | ")


        output =  output.sort (a, b) ->
            a.x.unix() - b.x.unix()

        #remove last element WHY WOULD I DO THIS
        # output.splice(output.length-1, 1)

        for tuple in output
            tuple.x = tuple.x.unix()
            tuple.zoom = zoom

        return output


    hideNthTick : (graphDiv) ->
        $(".x_tick:visible", graphDiv).hide()
        .filter((n) ->
            return ((n % 2) or (n % 3) or (n % 5)) == 0
            # return Number($(this).text()) % 5 == 0
        ).show()

    updateTicks : () ->
        ticks = $(".chart .title:visible", @$result)
        firstTick = ticks.eq(0)
        secondTick = ticks.eq(1)

        margin = 5

        if not firstTick.length or not secondTick.length then return
        if firstTick.offset().left + firstTick.width() + margin > secondTick.offset().left
            @hideNthTick $(".chart", @$result)
            @updateTicks()


    getNonTime : () ->
        #TODO: move settings.corpusListing.selected to the subview
        non_time = _.reduce (_.pluck settings.corpusListing.selected, "non_time"), ((a, b) -> (a or 0) + (b or 0)), 0
        # c.log "non_time", non_time
        sizelist = _.map settings.corpusListing.selected, (item) -> Number item.info.Size

        totalsize = _.reduce sizelist, (a, b) -> a + b


        return (non_time / totalsize) * 100


    # onProgress : (progress) ->
    #     super progress
    #     c.log "progress", progress

    getEmptyIntervals : (data) ->
        intervals = []
        i = 0

        while i < data.length
            item = data[i]

            if item.y == null
                interval = [_.clone item]
                breaker = true
                while breaker
                    i++
                    item = data[i]
                    if item?.y == null
                        interval.push _.clone item
                    else
                        # if data[i + 1] then interval.push _.clone data[i + 1]
                        intervals.push interval
                        breaker = false
            i++

        # return intervals.splice(intervals.length - 1, 1)
        return intervals


    drawIntervals : (graph) ->
        # emptyIntervals = @getEmptyIntervals(graph.series[0].data)
        emptyIntervals = graph.series[0].emptyIntervals
        @s.hasEmptyIntervals = emptyIntervals.length
        {x : [from, to]} = graph.renderer.domain()

        unitSpan = moment.unix(to).diff(moment.unix(from), @zoom)
        unitWidth = graph.width / unitSpan

        $(".empty_area", @$result).remove()
        for list in emptyIntervals
            max = _.max list, "x"
            min = _.min list, "x"
            from = graph.x min.x
            to = graph.x max.x
            # c.log "from", from, to
            $("<div>", {class : "empty_area"}).css
                left : from - unitWidth / 2
                # width : (to - from) - unitWidth / 2
                width : (to - from) + unitWidth
            .appendTo graph.element


    setBarMode : () ->
        if $(".legend .line", @$result).length > 1
            $(".legend li:last:not(.disabled) .action", @$result).click()
            if (_.all _.map $(".legend .line", @$result), (item) -> $(item).is(".disabled"))
                $(".legend li:first .action", @$result).click()
        return
    setLineMode : () ->

    setTableMode : (series) ->
        $(".chart,.legend", @$result).hide()
        $(".time_table", @$result.parent()).show()
        nRows = series.length or 2
        h = (nRows * 2) + 4
        h = Math.min h, 40
        $(".time_table:visible", @$result).height "#{h}.1em"
        @time_grid?.resizeCanvas()
        $(".exportTimeStatsSection", @$result).show()

        $(".exportTimeStatsSection .btn.export", @$result).click(() =>
            selVal = $(".timeKindOfData option:selected", @$result).val()
            selType = $(".timeKindOfFormat option:selected", @$result).val()
            dataDelimiter = if selType is "TSV" then "%09" else ";"

            header = [ util.getLocaleString("stats_hit") ]

            for cell in series[0].data
                stampformat = @zoomLevelToFormat(cell.zoom)
                header.push moment(cell.x * 1000).format(stampformat)

            output = [header]

            for row in series
                cells = [ if row.name is "&Sigma;" then "Σ" else row.name ]
                for cell in row.data
                    if selVal is "relative"
                        cells.push cell.y
                    else
                        i = _.indexOf (_.pluck row.abs_data, "x"), cell.x, true
                        cells.push row.abs_data[i].y
                output.push cells

            csv = new CSV(output, {
                delimiter : dataDelimiter
            })
            csvstr = csv.encode()
            blob = new Blob([csvstr], { type: "text/#{selType}"})
            csvUrl = URL.createObjectURL(blob)
            
            a = document.createElement "a"
            a.href = csvUrl
            a.download = "export.#{selType}"
            a.click()
            window.URL.revokeObjectURL(csvUrl)
        )

    zoomLevelToFormat : (zoom) ->
        stampFormats =
            "second" : "YYYY-MM-DD hh:mm:ss"
            "minute" : "YYYY-MM-DD hh:mm"
            "hour" : "YYYY-MM-DD hh"
            "day" : "YYYY-MM-DD"
            "month" : "YYYY-MM"
            "year" : "YYYY"
        return stampFormats[zoom]

    renderTable : (series) ->
        console.log "**************** series", series
        HTMLFormatter = (row, cell, value, columnDef, dataContext) -> value


        time_table_data = []
        time_table_columns_intermediate = {}
        for row in series
            new_time_row = {"label" : row.name}
            for item in row.data
                stampformat = @zoomLevelToFormat(item.zoom)
                timestamp = moment(item.x * 1000).format(stampformat) # this needs to be fixed for other resolutions
                time_table_columns_intermediate[timestamp] =
                    "name" : timestamp
                    "field" : timestamp
                    "formatter" : (row, cell, value, columnDef, dataContext) ->
                        loc = settings.locales[$("body").scope().lang]
                        fmt = (valTup) ->
                            if typeof valTup[0] == "undefined" then return ""
                            return "<span>" +
                                    "<span class='relStat'>" + Number(valTup[1].toFixed(1)).toLocaleString(loc) + "</span> " +
                                    "<span class='absStat'>(" + valTup[0].toLocaleString(loc) + ")</span> " +
                              "<span>"
                        return fmt(value)
                i = _.indexOf (_.pluck row.abs_data, "x"), item.x, true
                #new_time_row[timestamp] = {"relative" : item.y, "absolute" : row.abs_data[i].y}
                new_time_row[timestamp] = [item.y, row.abs_data[i].y]
            time_table_data.push new_time_row
        # Sort columns
        time_table_columns = [
                            "name" : "Hit"
                            "field" : "label"
                            "formatter" : HTMLFormatter
                            ]
        for key in _.keys(time_table_columns_intermediate).sort()
            time_table_columns.push(time_table_columns_intermediate[key])

        time_grid = new Slick.Grid $(".time_table", @$result), time_table_data, time_table_columns,
            enableCellNavigation: false
            enableColumnReorder: false
        #time_grid.autosizeColumns()
        $(".time_table", @$result).width("100%")
        @time_grid = time_grid


    makeSeries : (data, cqp, labelMapping, zoom) ->
        [from, to] = CQP.getTimeInterval(CQP.parse(cqp)) or [null, null]
        showSelectedCorporasStartDate = !from
        if _.isArray data.combined
            palette = new Rickshaw.Color.Palette("colorwheel")
            series = []
            for item in data.combined
                color = palette.color()
                # @colorToCqp[color] = item.cqp
                series.push {
                    data : @getSeriesData item.relative, showSelectedCorporasStartDate, zoom
                    color : color
                    # name : item.cqp?.replace(/(\\)|\|/g, "") || "&Sigma;"
                    name : if item.cqp then @s.data.labelMapping[item.cqp] else "&Sigma;"
                    cqp : item.cqp or cqp
                    abs_data : @getSeriesData item.absolute, showSelectedCorporasStartDate, zoom
                }
        else # TODO: get rid of code doubling and use seriesData variable
            # @colorToCqp['steelblue'] = cqp
            series = [{
                        data: @getSeriesData data.combined.relative, showSelectedCorporasStartDate, zoom
                        color: 'steelblue'
                        name : "&Sigma;"
                        cqp : cqp
                        abs_data : @getSeriesData data.combined.absolute, showSelectedCorporasStartDate, zoom
                    }]
        Rickshaw.Series.zeroFill(series)
        # window.data = series[0].data

        # c.log "emptyIntervals", emptyIntervals

        emptyIntervals = @getEmptyIntervals(series[0].data)
        series[0].emptyIntervals = emptyIntervals

        for s in series
            s.data = _.filter s.data, (item) -> item.y != null
            s.abs_data = _.filter s.abs_data, (item) -> item.y != null

        return series



    spliceData : (newSeries) ->
        for seriesObj, seriesIndex in @graph.series
            first = newSeries[seriesIndex].data[0].x
            c.log "first", first, moment.unix(first).format()
            last = (_.last newSeries[seriesIndex].data).x
            c.log "last", moment.unix(last).format()
            startSplice = false
            from = 0
            n_elems = seriesObj.data.length + newSeries[seriesIndex].data.length
            for {x}, i in seriesObj.data
                if (x >= first) and (not startSplice)
                    startSplice = true
                    from = i
                    c.log "from", from, moment.unix(seriesObj.data[from].x).format()
                    j = 0
                if startSplice
                    if x >= last
                        n_elems = (j + 1)
                        c.log "n_elems", n_elems
                        # c.log "to", to, moment.unix(seriesObj.data[to].x).format()
                        break
                    # seriesObj.data[i] = newSeries[seriesIndex].data[j]
                    j++


            # c.log "splicing from, to", from, to, moment.unix(seriesObj.data[from].x).format(), moment.unix(seriesObj.data[to].x).format()
            c.log "n_elems after", n_elems #, moment.unix(seriesObj.data[to].x).format()
            c.log "seriesObj.data", seriesObj.data.length
            seriesObj.data.splice(from, n_elems, newSeries[seriesIndex].data...)
            seriesObj.abs_data.splice(from, n_elems, newSeries[seriesIndex].abs_data...)
            # seriesObj.data[..] = _.sortBy seriesObj.data, "x"
            # seriesObj.abs_data[from..to] = newSeries[seriesIndex].abs_data
            c.log "seriesObj.data", seriesObj.data.length


    previewPanStop : () ->
        c.log "pan stop"

        # {x : [from, to]} = graph.renderer.domain()

        visibleData = @graph.stackData()
        c.log "visibleData", visibleData

        count = _.countBy visibleData[0], (coor) ->
            coor.zoom
        c.log "count", count

        # @validZoomLevels.indexOf z

        grouped = _.groupBy visibleData[0], "zoom"

        for zoomLevel, points of grouped
            if zoomLevel != @zoom
                from = moment.unix(points[0].x)
                from.startOf(@zoom)
                to = moment.unix((_.last points).x)
                to.endOf(@zoom)
                # to.add(3, @zoom)
                @setZoom @zoom, from, to

        # _.filter visibleData[0], (item) ->
        #     item




        #if we have dots in graph of wrong granularity
            # fetch and splice





    makeRequest : (cqp, subcqps, corpora, labelMapping, showTotal, from, to) ->
        c.log "makeRequest", cqp, subcqps, corpora, labelMapping, showTotal
        # hidden = $(".progress_container", @$result).nextAll().hide()
        @s.loading = true
        @showPreloader()
        currentZoom = @zoom
        # @proxy.granularity = @granularity
        @proxy.makeRequest(cqp, subcqps, corpora.stringifySelectedEncode(),
                from, to).progress( (data) =>
            @onProgress(data)



        ).fail( (data) =>
            c.log "graph crash"
            @resultError(data)
            @s.loading = false


        ).done (data) =>
            c.log "graph data", data
            c.log "graph cqp", cqp

            done = () =>
                @resetPreloader()
                @hidePreloader()
                safeApply @s, () =>
                    @s.loading = false

                $(window).trigger("resize")

            if data.ERROR
                @resultError data
                return
            # if data.combined.sums.absolute == 0 and data.combined.sums.relative == 0
            #     c.log "no results from graph", data
            #     done()
            #     return

            if @graph
                series = @makeSeries(data, cqp, labelMapping, currentZoom)
                @spliceData series
                # @graph.series[...] = series
                @drawIntervals(@graph)
                @graph.render()
                done()
                return


            nontime = @getNonTime()

            if nontime
                $(".non_time", @$result).empty().text(nontime.toFixed(2) + "%").parent().localize()
            else
                $(".non_time_div", @$result).hide()

            series = @makeSeries(data, cqp, labelMapping, currentZoom)


            graph = new Rickshaw.Graph
                element: $(".chart", @$result).empty().get(0)
                renderer: 'line'
                interpolation : "linear"
                series: series
                padding :
                    top : 0.1
                    right : 0.01
                # min :
            graph.render()
            window._graph = @graph = graph


            @drawIntervals(graph)


            $(window).on "resize", _.throttle(() =>
                if @$result.is(":visible")
                    graph.setSize()
                    graph.render()

                    # @preview.configure
                    #     width : @$result.width() - 20
                    #     height : 80

                    # @preview.render()
            , 200)

            $(".form_switch", @$result).click (event) =>
                val = @s.mode
                for cls in @$result.attr("class").split(" ")
                    if cls.match(/^form-/) then @$result.removeClass(cls)
                @$result.addClass("form-" +val)
                $(".chart,.legend", @$result.parent()).show()
                $(".time_table", @$result.parent()).hide()
                if val == "bar"
                    @setBarMode()
                else if val == "table"
                    @renderTable(series)
                    @setTableMode(series)

                unless val == "table"
                    graph.setRenderer val
                    graph.render()
                    $(".exportTimeStatsSection", @$result).hide()


            legend = new Rickshaw.Graph.Legend
                element: $(".legend", @$result).get(0)
                graph: graph

            shelving = new Rickshaw.Graph.Behavior.Series.Toggle
                graph: graph
                legend: legend

            if not showTotal and $(".legend .line", @$result).length > 1
                $(".legend .line:last .action", @$result).click()

            hoverDetail = new Rickshaw.Graph.HoverDetail( {
                graph: graph
                xFormatter: (x) =>
                    # d = new Date(x * 1000)
                    # m = moment()
                    # m = @parseDate(@zoom, String(x))
                    m = moment.unix(String(x))
                    # output = ["<span rel='localize[year]'>#{util.getLocaleString('year')}</span>: <span class='currently'>#{m.year()}</span>",
                    #           "<span rel='localize[month]'>#{util.getLocaleString('month')}</span>: <span class='currently'>#{m.month() + 1}</span>",
                    #           "<span rel='localize[day]'>#{util.getLocaleString('day')}</span>: <span class='currently'>#{m.date() + 1}</span>"
                    #           ]
                    # out = switch @granularity
                    #     when "y" then output[0]
                    #     when "m" then output[0..1].join("\n")
                    #     when "d" then output.join("\n")

                    return "<span data-val='#{x}'>#{m.format('YYYY-MM-DD HH:mm:ss')}</span>"


                yFormatter: (y) ->
                    val = util.formatDecimalString (y.toFixed 2), false, true, true

                    "<br><span rel='localize[rel_hits_short]'>#{util.getLocaleString 'rel_hits_short'}</span> " + val
                formatter : (series, x, y, formattedX, formattedY, d) ->
                    i = _.indexOf (_.pluck series.data, "x"), x, true
                    try
                        abs_y = series.abs_data[i].y
                    catch e
                        c.log "i", i, x

                    rel = series.name + ':&nbsp;' + formattedY
                    return """<span data-cqp="#{encodeURIComponent(series.cqp)}">
                        #{rel}
                        <br>
                        #{util.getLocaleString 'abs_hits_short'}: #{abs_y}
                    </span>"""
                # , 100)
            } )

            # [first, last] = settings.corpusListing.getTimeInterval()
            # [firstVal, lastVal] = settings.corpusListing.getMomentInterval()

            # TODO: fix decade again
            # timeunit = if last - first > 100 then "decade" else @zoom

            toDate = (sec) ->
                moment(sec * 1000).toDate()

            time = new Rickshaw.Fixtures.Time()
            old_ceil = time.ceil
            time.ceil = (time, unit) =>
                if unit.name == "decade"
                    out = Math.ceil(time / unit.seconds) * unit.seconds;
                    mom = moment(out * 1000)
                    if mom.date() == 31
                        mom.add("day", 1)
                    return mom.unix()
                else
                    return old_ceil(time, unit)

            xAxis = new Rickshaw.Graph.Axis.Time
                graph: graph
                # timeUnit: time.unit("month") # TODO: bring back decade
                # timeFixture: new Rickshaw.Fixtures.Time()

            # slider = new Rickshaw.Graph.RangeSlider
            #     graph: graph,
            #     element: $('.zoom_slider', @$result)


            @preview = new Rickshaw.Graph.RangeSlider.Preview
                graph: graph
                element: $(".preview", @$result).get(0)


            $("body").on "mouseup", ".preview .middle_handle", () =>
                @previewPanStop()

            $("body").on "mouseup", ".preview .left_handle, .preview .right_handle", () =>
                if not @s.loading
                    @previewPanStop()




            # expanedCQP = CQP.expandOperators cqp

            window._xaxis = xAxis

            old_render = xAxis.render
            xAxis.render = _.throttle () =>
                old_render.call xAxis
                # @updateTicks()
                @drawIntervals(graph)


                @checkZoomLevel()

            , 20


            # old_tickOffsets = xAxis.tickOffsets
            # xAxis.tickOffsets = () =>
            #     domain = xAxis.graph.x.domain()

            #     unit = xAxis.fixedTimeUnit or xAxis.appropriateTimeUnit()
            #     count = Math.ceil((domain[1] - domain[0]) / unit.seconds)

            #     runningTick = domain[0]

            #     offsets = []

            #     for i in [0...count]
            #         tickValue = time.ceil(runningTick, unit)
            #         runningTick = tickValue + unit.seconds / 2

            #         offsets.push( { value: tickValue, unit: unit, _date: moment(tickValue * 1000).toDate() } )

            #     return offsets

            xAxis.render()

            yAxis = new Rickshaw.Graph.Axis.Y
                graph: graph

            yAxis.render()
            # hidden.fadeIn()

            done()


class view.NameClassificationResults extends BaseResults

    # Copied and modified from view.LemgramResults (Jyrki Niemi 2015-05-29)

    constructor: (tabSelector, resultSelector, scope) ->
        self = this
        super tabSelector, resultSelector, scope
        @s = scope
        @tabindex = 3
        #   TODO: figure out what I use this for.
        @resultDeferred = $.Deferred()
        @proxy = new model.NameClassificationProxy()
        window.nameClassificationProxy = @proxy
        @group_labels = {}
        @group_labels[group.regex] = \
            group.label for group in settings.name_groups or []
        # @$result.find("#wordclassChk").change ->
        #     if $(this).is(":checked")
        #         $(".lemgram_result .wordclass_suffix", self.$result).show()
        #     else
        #         $(".lemgram_result .wordclass_suffix", self.$result).hide()

    resetView: ->
        super()
        $(".name_content_target", @$result).empty()
        safeApply @s, () =>
            @s.$parent.aborted = false
            @s.$parent.no_hits = false

    makeRequest : (cqp, within) ->
        c.log "name makeRequest", cqp, within
        within = within or "sentence"
        if @proxy.hasPending()
            @ignoreAbort = true
        else
            @ignoreAbort = false
            @resetView()
        @showPreloader()
        def = @proxy.makeRequest cqp, within, (args...) =>
            @onProgress args...

        def.success (data) =>
            safeApply @s, () =>
                @renderResult(data, cqp, within)

        def.fail (jqXHR, status, errorThrown) =>
            c.log "def fail", status
            if @ignoreAbort
                c.log "name ignoreabort"
                return
            if status == "abort"
                safeApply @s, () =>
                    @hidePreloader()
                    c.log "aborted true", @s
                    @s.$parent.aborted = true
            else
                @resultError errorThrown

    renderResult: (data, cqp, within) ->
        c.log "name renderResult", data, cqp, within
        # @resetView()
        $(".name_content_target", @$result).empty()
        resultError = super(data)
        @hidePreloader()
        @s.$parent.progress = 100
        return if resultError is false
        if not data.name_groups or data.name_groups.length == 0
            locale_key = if not data.name_groups then "no_name_corpora" else "no_name_results" 
            @$result.find(".name_content_target").html $("<i />").localeKey(locale_key)
            @s.$parent.no_hits = true
                # @hasData = false
            @resultDeferred.reject()
        else
            @renderTables data.name_groups, cqp
            @resultDeferred.resolve()

    renderHeader: () ->
        group_labels = @group_labels
        $(".name_content_target:last .name_group").each((i) ->
            $parent = $(this).find(".name_group_heading")
            label = $(this).data("namegroup")
            if settings.name_groups
                loc_key = "namegroup_#{group_labels[label]}"
                rel_loc = " rel='localize[#{loc_key}]'"
                label = util.getLocaleString(loc_key)
            else
                rel_loc = ""
            $("<span #{rel_loc}>#{label}</span>").appendTo $parent
        ).append "<div style='clear:both;'/>"

    renderTables: (data, cqp) ->
        @drawTable data, cqp
        # $(".lemgram_result .wordclass_suffix").hide()
        @renderHeader()
        @hidePreloader()

    drawTable: (data, cqp) ->
        c.log "name drawTable", data, cqp
        container = $("<div>")
        .appendTo(".name_content_target", @$result)

        # $(".name_content_target").attr("data-cqp", cqp)
        $(".name_content_target").data("cqp", cqp)
        c.log "name_content_target cqp", $(".name_content_target").data("cqp")

        # data.cqp = cqp
        $("#nameTableTmpl").tmpl(data)
        .localize()
        .find(".example_link")
        .append($("<span>")
            .addClass("ui-icon ui-icon-document")
        ).css("cursor", "pointer")
        .click( (event) =>
            @onClickExample(event)
        ).end()
        .appendTo container

        $("td:nth-child(2)", @$result).each -> # labels
            $(this).html $(this).data("name")

    onClickExample: (event) ->
        self = this
        $target = $(event.currentTarget)
        c.log "onClickExample", $target
        data = $target.parent().tmplItem().data
        
        opts = {}
        opts.ajaxParams =
            command : "names_sentences"
            start : 0
            end : 24
            source : data.source.join(",")
            cqp : $(".name_content_target").data("cqp")

        c.log "names_sentences opts", opts
        @s.$root.kwicTabs.push opts

    showWarning: ->
        hasWarned = !!$.jStorage.get("name_warning")
        unless hasWarned
            $.jStorage.set "name_warning", true
            $("#sidebar").sidebar "refreshContent", "lemgramWarning"
            safeApply @s, () =>
                @s.$root.sidebar_visible = true
            self.timeout = setTimeout(=>
                safeApply @s, () =>
                    @s.$root.sidebar_visible = false
                    $("#sidebar").sidebar "refreshContent"
            , 5000)

    onentry: ->
        c.log "name onentry"
        super()
        @resultDeferred.done @showWarning
        return

    onexit: ->
        super()
        clearTimeout self.timeout
        safeApply @s, () =>
            @s.$root.sidebar_visible = false
        return

    showNoResults: ->
        @hidePreloader()
        # @$result.find(".name_content_target").html $("<i />").localeKey("no_name_results")
