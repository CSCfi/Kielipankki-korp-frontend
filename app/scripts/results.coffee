class BaseResults
    constructor: (resultSelector, tabSelector, scope) ->
        @s = scope
        # @s.instance = this
        @$tab = $(tabSelector)
        @$result = $(resultSelector)
        @index = @$tab.index()
        @optionWidget = $("#search_options")
        @num_result = @$result.find(".num-result")
        @$result.add(@$tab).addClass "not_loading"

    onProgress: (progressObj) ->
        # c.log "onProgress", progressObj
        # TODO: this item only exists in the kwic.
        @num_result.html util.prettyNumbers(progressObj["total_results"])
        # unless isNaN(progressObj["stats"])
            # try
                # @$result.find(".progress_container progress").attr "value", Math.round(progressObj["stats"])
            # catch e
                # c.log "onprogress error", e
        # @$tab.find(".tab_progress").css "width", Math.round(progressObj["stats"]).toString() + "%"

        safeApply @s, () =>
            @s.$parent.progress = Math.round(progressObj["stats"])


    renderResult: (data) ->

        #       this.resetView();
        @$result.find(".error_msg").remove()
        util.setJsonLink @proxy.prevRequest if @$result.is(":visible")
        if data.ERROR
            @resultError data
            return false
        else
            safeApply @s, () =>
                @hasData = true

    resultError: (data) ->
        c.error "json fetch error: ", data
        @hidePreloader()
        @resetView()
        $('<object class="korp_fail" type="image/svg+xml" data="img/korp_fail.svg">')
            .append("<img class='korp_fail' src='img/korp_fail.svg'>")
            .add($("<div class='fail_text' />")
            .localeKey("fail_text"))
            .addClass("inline_block")
            .prependTo(@$result)
            .wrapAll "<div class='error_msg'>"
        util.setJsonLink @proxy.prevRequest

    showPreloader : () ->
        @s.$parent.loading = true
    
    hidePreloader : () ->
        @s.$parent.loading = false

    resetView: ->
        @hasData = false
        @$result.find(".error_msg").remove()

    countCorpora : () ->
        @proxy.prevParams?.corpus.split(",").length


class view.KWICResults extends BaseResults
    constructor : (tabSelector, resultSelector, scope) ->
        self = this
        @prevCQP = null
        super tabSelector, resultSelector, scope
        # @s.$parent.loading = false
        # @initHTML = @$result.html()
        window.kwicProxy = new model.KWICProxy()
        @proxy = kwicProxy
        @readingProxy = new model.KWICProxy()
        @current_page = search().page or 0

        @s = scope
        @s.setupReadingHash()
        @selectionManager = scope.selectionManager

        @$result.click =>
            return unless @selectionManager.hasSelected()
            @selectionManager.deselect()
            safeApply @s.$root, (s) ->
                s.$root.word_selected = null

        $(document).keydown $.proxy(@onKeydown, this)


        # @$result.addClass "reading_mode" if $.bbq.getState("reading_mode")
        @$result.on "click", ".word", (event) =>
            @s.$root.sidebar_visible = true
            # c.log "click", obj, event
            # c.log "word click", $(this).scope().wd, event.currentTarget
            scope = $(event.currentTarget).scope()
            obj = scope.wd
            sent = scope.sentence
            event.stopPropagation()
            word = $(event.target)
            # $.sm.send("word.select")



            if $("#sidebar").data().korpSidebar?
                $("#sidebar").sidebar "updateContent", sent.structs, obj, sent.corpus.toLowerCase(), sent.tokens

            if not obj.dephead?
                scope.selectionManager.select word, null
                safeApply @s.$root, (s) ->
                    s.$root.word_selected = word
                return

            i = Number(obj.dephead)
            paragraph = word.closest(".sentence").find(".word")
            sent_start = 0
            if word.is(".open_sentence")
                sent_start = paragraph.index(word)
            else

                l = paragraph.filter((__, item) ->
                    $(item).is(word) or $(item).is(".open_sentence")
                )
                sent_start = paragraph.index(l.eq(l.index(word) - 1))
            aux = $(paragraph.get(sent_start + i - 1))
            scope.selectionManager.select word, aux
            safeApply @s.$root, (s) ->
                s.$root.word_selected = word




    resetView: ->
        super()
        # @$result.find(".results_table,.pager-wrapper").empty()
        # @$result.find(".pager-wrapper").empty()

    getProxy: ->
        # return @readingProxy if @isReadingMode()
        @proxy

    isReadingMode : () ->
        @s.reading_mode

    onentry: ->
        c.log "onentry kwic"
        @s.$root.sidebar_visible = true

        @$result.find(".token_selected").click()
        # $("#sidebar").sidebar("show")
        _.defer () => @centerScrollbar()
        # @centerScrollbar()
        # $(document).keydown $.proxy(@onKeydown, this)
        return

    onexit: ->
        c.log "onexit kwic"
        @s.$root.sidebar_visible = false
        # $("#sidebar").sidebar("hide")
        # $(document).unbind "keydown", @onKeydown
        return

    onKeydown: (event) ->
        isSpecialKeyDown = event.shiftKey or event.ctrlKey or event.metaKey
        return if isSpecialKeyDown or $("input, textarea, select").is(":focus") or
            not @$result.is(":visible")
        switch event.which
            when 78 # n
                @$result.find(".pager-wrapper .next").click()
                return false
            when 70 # f
                @$result.find(".pager-wrapper .prev").click()
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
        items_per_page = Number(@optionWidget.find(".num_hits").val())
        output = {}
        output.start = (page or 0) * items_per_page
        output.end = (output.start + items_per_page) - 1
        output

    renderCompleteResult: (data) ->
        c.log "renderCompleteResult", data
        @current_page = search().page or 0
        safeApply @s, () =>
            @hidePreloader()
        unless data.hits
            c.log "no kwic results"
            @showNoResults()
            return
        # @s.$parent.loading = false
        @$result.removeClass "zero_results"
        @$result.find(".num-result").html util.prettyNumbers(data.hits)
        @renderHitsPicture data
        @buildPager data.hits



    renderResult: (data) ->
        c.log "data", data
        resultError = super(data)
        return if resultError is false
        unless data.kwic then data.kwic = []
        c.log "corpus_results"
        isReading = @isReadingMode()



        # applyTo "kwicCtrl", ($scope) ->
        @s.$apply ($scope) =>
            # kwicResults.hidePreloader()
            c.log "apply kwic search data", data
            if isReading
                $scope.setContextData(data)
                @selectionManager.deselect()
                @s.$root.word_selected = null
            else
                $scope.setKwicData(data)
            # @hidePreloader()    

        if currentMode == "parallel" and not isReading
            scrollLeft = $(".table_scrollarea", @$result).scrollLeft() or 0
            for linked in $(".linked_sentence")
                mainrow = $(linked).prev()
                firstWord = mainrow.find(".left .word:first")
                if not firstWord.length then firstWord = mainrow.find(".match .word:first")
                offset = (firstWord.position().left + scrollLeft) - 25
                $(linked).find(".lnk").css("padding-left", Math.round(offset))

        @$result.localize()
        @centerScrollbar()
        if not @s.$root.word_selected and not isReading
            @$result.find(".match").children().first().click()

    showNoResults: ->
        # @$result.find(".results_table").empty()
        @$result.find(".pager-wrapper").empty()
        @hidePreloader()
        @$result.find(".num-result").html 0
        @$result.addClass("zero_results").click()

        #   this.$result.find(".sort_select").hide();
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

    buildPager: (number_of_hits) ->
        items_per_page = @optionWidget.find(".num_hits").val()
        # @movePager "up"
        $.onScrollOut "unbind"
        @$result.find(".pager-wrapper").unbind().empty()
        if number_of_hits > items_per_page
            @$result.find(".pager-wrapper").pagination number_of_hits,
                items_per_page: items_per_page
                callback: $.proxy(@handlePaginationClick, this)
                next_text: util.getLocaleString("next")
                prev_text: util.getLocaleString("prev")
                link_to: "javascript:void(0)"
                num_edge_entries: 2
                ellipse_text: ".."
                current_page: @current_page or 0

            @$result.find(".next").attr "rel", "localize[next]"
            @$result.find(".prev").attr "rel", "localize[prev]"
    
    # pagination_container is used by the pagination lib
    handlePaginationClick: (new_page_index, pagination_container, force_click) ->
        page = search().page or 0
        c.log "handlePaginationClick", new_page_index, page
        self = this
        if new_page_index isnt page or !!force_click
            isReading = @isReadingMode()
            kwicCallback = @renderResult

            # this.showPreloader();

            @getProxy().makeRequest @buildQueryOptions(), new_page_index, ((progressObj) ->

                #progress
                self.$tab.find(".tab_progress").css "width", Math.round(progressObj["stats"]).toString() + "%"
            ), ((data) ->
                #success
                self.buildPager data.hits
            ), $.proxy(kwicCallback, this)
            # $.bbq.pushState page: new_page_index
            safeApply @s, () ->
                search page: new_page_index
            @current_page = new_page_index
        false

    buildQueryOptions: (cqp) ->
        c.log "buildQueryOptions", cqp
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

        opts.ajaxParams = {
            command : "query"
            cqp : cqp or @proxy.prevCQP
            queryData : @proxy.queryData if @proxy.queryData
            context : settings.corpusListing.getContextQueryString() if @isReadingMode() or currentMode == "parallel"
            within : settings.corpusListing.getWithinQueryString() if search().within
        }
        _.extend opts.ajaxParams, getSortParams()
        return opts


    makeRequest: (page_num, cqp) ->
        @showPreloader()
        isReading = @isReadingMode()

        safeApply @s, () =>
            if isReading
                @s.setContextData({kwic:[]})
            else
                @s.setKwicData({kwic:[]})
                # $scope.kwic = data.kwic

        kwicCallback = $.proxy(@renderResult, this)
        @getProxy().makeRequest @buildQueryOptions(cqp),
                           page_num,
                           (if isReading then $.noop else $.proxy(@onProgress, this)),
                           $.proxy(@renderCompleteResult, this),
                           kwicCallback


    setPage: (page) ->
        @$result.find(".pager-wrapper").trigger "setPage", [page]

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
    # TODO: currently out of commission
    # setupPagerMover: ->
    #     self = this
    #     pager = @$result.find(".pager-wrapper")
    #     upOpts =
    #         point: pager.offset().top + pager.height()
    #         callback: ->
    #             self.movePager "up"

    #     self.movePager "down"
    #     downOpts =
    #         point: pager.offset().top + pager.height()
    #         callback: ->
    #             self.movePager "down"

    #     self.movePager "up"
    #     c.log "onscrollout", upOpts.point, downOpts.point
    #     $.onScrollOut upOpts, downOpts

    # movePager: (dir) ->
    #     pager = @$result.find(".pager-wrapper")
    #     if dir is "down"
    #         pager.data("prevPos", pager.prev()).appendTo @$result
    #     else
    #         pager.data("prevPos").after pager if pager.data("prevPos")





class view.ExampleResults extends view.KWICResults
    constructor: (tabSelector, resultSelector, scope) ->
        super tabSelector, resultSelector, scope
        @proxy = new model.KWICProxy()
        # @$result.find(".progress_container,.tab_progress").hide()
        # @$result.add(@$tab).addClass "not_loading customtab"
        # @$result.removeClass "reading_mode"
        @s.setupReadingWatch()
        if @s.$parent.queryParams
            @makeRequest()
            @onentry()
        @current_page = 0
        # @s.$parent.active = true

    makeRequest: () ->
        c.log "ExampleResults.makeRequest()", @current_page
        items_per_page = parseInt(@optionWidget.find(".num_hits").val())
        opts = @s.$parent.queryParams
        @resetView()
        opts.ajaxParams.incremental = opts.ajaxParams.command == "query"

        opts.ajaxParams.start = @current_page * items_per_page
        opts.ajaxParams.end = (opts.ajaxParams.start + items_per_page)

        prev = _.pick @proxy.prevParams, "cqp", "command", "corpus", "head", "rel", "source", "dep", "depextra"
        _.extend opts.ajaxParams, prev

        $.extend opts,
            success: (data) =>
                c.log "ExampleResults success", data, opts
                @renderResult data, opts.cqp
                @renderCompleteResult data
                safeApply @s, () =>
                    @hidePreloader()
                util.setJsonLink @proxy.prevRequest
                @$result.find(".num-result").html util.prettyNumbers(data.hits)

            error: =>
                safeApply @s, () =>
                    @hidePreloader()


        @showPreloader()

        #   this.proxy.makeRequest(opts, $.proxy(this.onProgress, this));
        progress = if opts.command == "query" then $.proxy(this.onProgress, this) else $.noop
        @proxy.makeRequest opts, null, $.noop, $.noop, progress



    handlePaginationClick: (new_page_index, pagination_container, force_click) ->
        @current_page = new_page_index
        @makeRequest()
        false


class view.LemgramResults extends BaseResults
    constructor: (tabSelector, resultSelector, scope) ->
        self = this
        super tabSelector, resultSelector, scope
        @s = scope
        #   TODO: figure out what I use this for.
        @resultDeferred = $.Deferred()
        @proxy = new model.LemgramProxy()
        window.lemgramProxy = @proxy
        @$result.find("#wordclassChk").change ->
            if $(this).is(":checked")
                $(".lemgram_result .wordclass_suffix", self.$result).show()
            else
                $(".lemgram_result .wordclass_suffix", self.$result).hide()

        

    resetView: ->
        super()
        $(".content_target", @$result).empty()

    makeRequest : (word, type) ->
        @showPreloader()
        def = @proxy.makeRequest word, type, (args...) =>
            @onProgress args...

        def.fail (jqXHR, status, errorThrown) ->
            c.log "def fail", status
            if status == "abort"
                safeApply lemgramResults.s, () =>
                    lemgramResults.hidePreloader()


    renderResult: (data, query) ->
        c.log "lemgram renderResult", data, query
        # @resetView()
        $(".content_target", @$result).empty()
        resultError = super(data)
        safeApply @s, () =>
            @hidePreloader()
            @s.$parent.progress = 100
        return if resultError is false
        unless data.relations
            safeApply @s, () =>
                # @hasData = false

            @resultDeferred.reject()
        else if util.isLemgramId(query)
            @renderTables query, data.relations
            @resultDeferred.resolve()
        else
            @renderWordTables query, data.relations
            @resultDeferred.resolve()

    renderHeader: (wordClass, isLemgram) ->

        wordClass = (_.invert settings.wordpictureTagset)[wordClass.toLowerCase()]
        $(".tableContainer:last .lemgram_section").each((i) ->
            $parent = $(this).find(".lemgram_help")
            $(this).find(".lemgram_result").each (j) ->
                confObj = settings.wordPictureConf[wordClass][i][j]
                if confObj != "_"

                    unless $(this).find("table").length then return

                    if confObj.alt_label
                        label = confObj.alt_label
                    else
                        label = "rel_" + $(this).data("rel")
                    cell = $("<span />", class: "lemgram_header_item")
                        .localeKey(label)
                        .addClass(confObj.css_class or "").appendTo($parent)
                    $(this).addClass(confObj.css_class).css "border-color", $(this).css("background-color")
                else
                    # c.log "header data", $(this).data("word"), $(this).tmplItem().lemgram
                    label = $(this).data("word") or $(this).tmplItem().lemgram
                    classes = "hit"
                    if isLemgram
                        classes += " lemgram"
                    $("<span class='#{classes}'><b>#{label}</b></span>").appendTo $parent
        ).append "<div style='clear:both;'/>"

    renderWordTables: (word, data) ->
        self = this
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
            
        
        
        $.each unique_words, (i, [currentWd, pos]) =>
            self.drawTable currentWd, pos, data
            self.renderHeader pos, false
            content = """
                #{currentWd} (<span rel="localize[pos]">#{util.getLocaleString(pos)}</span>)
            """
            $(".tableContainer:last").prepend($("<div>",
                class: "header"
            ).html(content)).find(".hit .wordclass_suffix").hide()
                
        $(".lemgram_result .wordclass_suffix").hide()
        @hidePreloader()


    renderTables: (lemgram, data) ->
        # wordClass = util.splitLemgram(lemgram).pos.slice(0, 2)
        if data[0].head == lemgram
            wordClass = data[0].headpos
        else
            wordClass = data[0].deppos

        @drawTable lemgram, wordClass, data #, getRelType
        $(".lemgram_result .wordclass_suffix").hide()
        @renderHeader wordClass, true
        @hidePreloader()

    drawTable: (token, wordClass, data) ->
        # c.log "token, wordClass", token, wordClass
        inArray = (rel, orderList) ->
            i = _.findIndex orderList, (item) -> 
                (item.field_reverse or false) == (rel.field_reverse or false) and item.rel == rel.rel
            type = (if rel.field_reverse then "head" else "dep")
            i : i
            type : type


        
        tagsetTrans = _.invert settings.wordpictureTagset
        getRelType = (item) ->
            return {rel : tagsetTrans[item.rel.toLowerCase()] , field_reverse : item.dep == token}

        wordClass = (_.invert settings.wordpictureTagset)[wordClass.toLowerCase()]

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
                    unsortedList.splice toIndex, 0,
                        word: token.split("..")[0].replace(/_/g, " ")

                else
                    unsortedList.splice toIndex, 0,
                        word: util.lemgramToString(token)

            unsortedList = $.grep(unsortedList, (item, index) ->
                Boolean item
            )


        container = $("<div>", class: "tableContainer radialBkg")
        .appendTo(".content_target", @$result)

        c.log "orderArrays", orderArrays
        $("#lemgramResultsTmpl").tmpl(orderArrays,
            lemgram: token
        ).find(".example_link")
        .append($("<span>")
            .addClass("ui-icon ui-icon-document")
        ).css("cursor", "pointer")
        .click( (event) =>
            @onClickExample(event)
        ).end()
        .appendTo container

        $("td:nth-child(2)", @$result).each -> # labels
            $siblings = $(this).parent().siblings().find("td:nth-child(2)")
            siblingLemgrams = $.map($siblings, (item) ->
                $(item).data("lemgram").slice 0, -1
            )
            hasHomograph = $.inArray($(this).data("lemgram").slice(0, -1), siblingLemgrams) isnt -1
            prefix = (if $(this).data("depextra").length then $(this).data("depextra") + " " else "")
            data = $(this).tmplItem().data
            if not data.dep
                label = "&mdash;"
            else 
                label = util.lemgramToString($(this).data("lemgram"), hasHomograph)
            $(this).html prefix + label



    #   self.renderHeader(wordClass);
    onClickExample: (event) ->
        self = this
        $target = $(event.currentTarget)
        c.log "onClickExample", $target
        data = $target.parent().tmplItem().data
        
        opts = {}
        opts.ajaxParams =
            start : 0
            end : 24
            command : "relations_sentences"
            source : data.source.join(",")
            corpus : null
            head: data.head
            dep: data.dep
            rel: data.rel
            depextra: data.depextra
            corpus: data.corpus


        @s.$root.kwicTabs.push opts

    showWarning: ->
        hasWarned = !!$.jStorage.get("lemgram_warning")

        #   var hasWarned = false;
        unless hasWarned
            $.jStorage.set "lemgram_warning", true
            $("#sidebar").sidebar "show", "lemgramWarning"
            self.timeout = setTimeout(->
                $("#sidebar").sidebar "hide"
            , 5000)

    onentry: ->
        @resultDeferred.done @showWarning

    onexit: ->
        clearTimeout self.timeout
        $("#sidebar").sidebar "hide"

    showNoResults: ->
        @hidePreloader()
        @$result.find(".content_target").html $("<i />").localeKey("no_lemgram_results")



    hideWordclass: ->
        $("td:first-child", @$result).each ->
            $(this).html $.format("%s <span class='wordClass'>%s</span>", $(this).html().split(" "))



newDataInGraph = (dataName, horizontalDiagram) ->
    c.log "dataName, horizontalDiagram", dataName, horizontalDiagram
    dataItems = []
    wordArray = []
    corpusArray = []
    statsResults["lastDataName"] = dataName
    if horizontalDiagram # hits/corpus
        $.each statsResults.savedData["corpora"], (corpus, obj) ->
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
        if dataName is "SIGMA_ALL"
            topheader = util.getLocaleString("statstable_hitsheader_lemgram")
            locstring = "statstable_hitsheader_lemgram"
        else
            topheader = util.getLocaleString("statstable_hitsheader") + "<i>#{dataName}</i>"
            locstring = "statstable_hitsheader"
        relHitsString = util.getLocaleString("statstable_relfigures_hits")
        $("<div id='dialog' title='#{topheader}' />")
        .appendTo("body")
        .append("""<br/><div id="statistics_switch" style="text-align:center">
                            <a href="javascript:" rel="localize[statstable_relfigures]" data-mode="relative">Relativa frekvenser</a>
                            <a href="javascript:" rel="localize[statstable_absfigures]" data-mode="absolute">Absoluta frekvenser</a>
                        </div>
                        <div id="chartFrame" style="height:380"></div>
                        <p id="hitsDescription" style="text-align:center" rel="localize[statstable_absfigures_hits]">#{relHitsString}</p>"""
        ).dialog(
            width: 400
            height: 500
            resize: ->
                $("#chartFrame").css "height", $("#chartFrame").parent().width() - 20
                stats2Instance.pie_widget "resizeDiagram", $(this).width() - 60
                # false

            resizeStop: (event, ui) ->
                w = $(this).dialog("option", "width")
                h = $(this).dialog("option", "height")
                if @width * 1.25 > @height
                    $(this).dialog "option", "height", w * 1.25
                else
                    $(this).dialog "option", "width", h * 0.80
                stats2Instance.pie_widget "resizeDiagram", $(this).width() - 60
        ).css("opacity", 0)
        .parent().find(".ui-dialog-title").localeKey("statstable_hitsheader_lemgram")
        $("#dialog").fadeTo 400, 1
        $("#dialog").find("a").blur() # Prevents the focus of the first link in the "dialog"
        stats2Instance = $("#chartFrame").pie_widget(
            container_id: "chartFrame"
            data_items: dataItems
        )
        statsSwitchInstance = $("#statistics_switch").radioList(
            change: ->
                typestring = statsSwitchInstance.radioList("getSelected").attr("data-mode")
                dataItems = new Array()
                dataName = statsResults["lastDataName"]
                $.each statsResults.savedData["corpora"], (corpus, obj) ->
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
                    loc = "statstable_absfigures_hits"
                $("#hitsDescription").localeKey loc

            selected: "relative"
        )



class view.StatsResults extends BaseResults
    constructor: (resultSelector, tabSelector, scope) ->
        super resultSelector, tabSelector, scope
        c.log "StatsResults constr", 
        self = this
        @gridData = null
        @proxy = new model.StatsProxy()
        window.statsProxy = @proxy
        @$result.on "click", ".arcDiagramPicture", (event) ->
            parts = $(event.currentTarget).attr("id").split("__")

            if parts[1] != "Σ"
                newDataInGraph(parts[1],true)
            else # The ∑ row
                newDataInGraph("SIGMA_ALL",true)

        @$result.on "click", ".slick-cell.l1.r1 .link", () ->
            query = $(this).data("query")
            
            opts = {}
            opts.ajaxParams =
                start : 0
                end : 24
                command : "query"
                corpus : $(this).data("corpora").join(",").toUpperCase()
                cqp: decodeURIComponent(query)
            
            safeApply scope.$root, () ->
                scope.$root.kwicTabs.push opts




        $(window).resize _.debounce( () =>
            # $("#myGrid:visible").width($("#myGrid").parent().width())
            $("#myGrid:visible").width($(window).width() - 40)
            nRows = @gridData?.length or 2
            h = (nRows * 2) + 4
            h = Math.min h, 40
            $("#myGrid:visible").height "#{h}.1em"
            @grid?.resizeCanvas()
            @grid?.autosizeColumns()
            
        , 100)

        $("#exportButton").unbind "click"
        $("#exportButton").click =>
            selVal = $("#kindOfData option:selected").val()
            selType = $("#kindOfFormat option:selected").val()
            dataDelimiter = ";"
            dataDelimiter = "%09" if selType is "TSV"
            cl = settings.corpusListing.subsetFactory(_.keys @savedData.corpora)

            header = [
                util.getLocaleString("stats_hit"), 
                util.getLocaleString("stats_total")
            ]
            header = header.concat _.pluck cl.corpora, "title"
            fmt = (what) ->
                util.formatDecimalString(what.toString(), false, true, true)

            total = ["Σ", fmt @savedData.total.sums[selVal]]

            total = total.concat (fmt @savedData.corpora[corp.toUpperCase()].sums[selVal] for corp in _.pluck cl.corpora, "id")



            output = [
                header
                total
            ]

            for wd in @savedWordArray
                row = [wd, fmt @savedData.total[selVal][wd]]
                values = for corp in _.pluck cl.corpora, "id"
                    val = @savedData.corpora[corp.toUpperCase()][selVal][wd]
                    if val 
                        val = fmt val
                    else 
                        val = "0"

                
                output.push row.concat values



            output = _.invoke output, "join", dataDelimiter
            output = output.join(escape(String.fromCharCode(0x0D) + String.fromCharCode(0x0A)))


            if selType is "TSV"
                window.open "data:text/tsv;charset=utf-8," + (output)
            else
                window.open "data:text/csv;charset=utf-8," + (output)


        if $("html.msie7,html.msie8").length
            $("#showGraph").hide()
            return

        $("#showGraph").on "click", () =>
            if $("#showGraph").is(".disabled") then return
            params = @proxy.prevParams
            cl = settings.corpusListing.subsetFactory(params.corpus.split(","))
            # instance.corpora = cl
            reduceVal = params.groupby


            isStructAttr = reduceVal of cl.getStructAttrs()
            subExprs = []
            labelMapping = {}
            
            showTotal = false
            mainCQP = params.cqp
            prefix = if isStructAttr then "_." else ""
            attrs = _.extend {}, cl.getCurrentAttributes(settings.reduce_word_attribute_selector),
                 cl.getStructAttrs(settings.reduce_word_attribute_selector)

            op = if attrs[reduceVal]?.type == "set" then "contains" else "="

            for chk in @$result.find(".slick-cell-checkboxsel :checked")
                cell = $(chk).parent()
                if cell.is ".slick-row:nth-child(1) .slick-cell-checkboxsel"
                    showTotal = true
                    continue
                val = @gridData[cell.parent().index()].hit_value
                cqp = "[#{prefix + reduceVal} #{op} '#{regescape(val)}']"
                subExprs.push cqp
                labelMapping[cqp] = cell.next().text()


            @s.$apply () =>
                @s.onGraphShow
                    cqp : mainCQP
                    subcqps : subExprs
                    labelMapping : labelMapping
                    showTotal : showTotal
                    corpusListing : cl
        #     instance.makeRequest mainCQP, subExprs, labelMapping, showTotal
        # $("#showGraph .ui-button-text", @$result).localeKey("show_diagram")


        paper = new Raphael($(".graph_btn_icon", @$result).get(0), 33, 24)
        paper.path("M3.625,25.062c-0.539-0.115-0.885-0.646-0.77-1.187l0,0L6.51,6.584l2.267,9.259l1.923-5.188l3.581,3.741l3.883-13.103l2.934,11.734l1.96-1.509l5.271,11.74c0.226,0.504,0,1.095-0.505,1.321l0,0c-0.505,0.227-1.096,0-1.322-0.504l0,0l-4.23-9.428l-2.374,1.826l-1.896-7.596l-2.783,9.393l-3.754-3.924L8.386,22.66l-1.731-7.083l-1.843,8.711c-0.101,0.472-0.515,0.794-0.979,0.794l0,0C3.765,25.083,3.695,25.076,3.625,25.062L3.625,25.062z")
            .attr
                fill: "#666"
                stroke: "none"
                transform: "s0.6"

    renderResult: (columns, data) ->
        refreshHeaders = ->
            $(".slick-header-column:nth(2)").click().click()
            $(".slick-column-name:nth(1),.slick-column-name:nth(2)").not("[rel^=localize]").each ->
                $(this).localeKey $(this).text()

        @resetView()
        @gridData = data
        resultError = super(data)
        return if resultError is false
        c.log "renderresults"
        if data[0].total_value.absolute == 0
            @showNoResults()
            return

        checkboxSelector = new Slick.CheckboxSelectColumn
            cssClass: "slick-cell-checkboxsel"

        columns = [checkboxSelector.getColumnDefinition()].concat(columns)
        $("#myGrid").width($(document).width())
        grid = new Slick.Grid $("#myGrid"), data, columns,
            enableCellNavigation: false
            enableColumnReorder: true

        grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}))
        grid.registerPlugin(checkboxSelector)
        @grid = grid
        @grid.autosizeColumns()
        $("#myGrid").width("100%")

        sortCol = columns[2]

        grid.onSort.subscribe (e, args) ->
            sortCol = args.sortCol  
            data.sort (a, b) ->
                if sortCol.field is "hit_value"
                    x = a[sortCol.field]
                    y = b[sortCol.field]
                else
                    x = a[sortCol.field].absolute or 0
                    y = b[sortCol.field].absolute or 0
                ret = ((if x is y then 0 else ((if x > y then 1 else -1))))
                ret *= -1 unless args.sortAsc
                ret

            grid.setData data
            grid.updateRowCount()
            grid.render()

        grid.onHeaderCellRendered.subscribe (e, args) ->
            refreshHeaders()

        # remove first checkbox
        # c.log "remove", $(".slick-row:nth(0) .l0.r0 input", @$result).remove()
        refreshHeaders()
        $(".slick-row:first input", @$result).click()
        $(window).trigger("resize")

        $.when(timeDeferred).then =>
            safeApply @s, () =>
                @updateGraphBtnState()            
        safeApply @s, () =>
            @hidePreloader()

    updateGraphBtnState : () ->

        # $("#showGraph").button("enable")
        @s.graphEnabled = true
        cl = settings.corpusListing.subsetFactory(@proxy.prevParams.corpus.split(","))

        if not (_.compact cl.getTimeInterval()).length
            @s.graphEnabled = false

    # showError : function() {
    #   this.hidePreloader();
    #   $("<i/>")
    #   .localeKey("error_occurred")
    #   .appendTo("#results-stats");
    # },
    onentry : () ->
        $(window).trigger("resize")
        return
    onexit : () ->

    resetView: ->
        super()
        $("myGrid").empty()
        $("#exportStatsSection").show()

    showNoResults: ->
        c.log "showNoResults", @$result
        safeApply @s, () =>
            @hidePreloader()
        @$result.prepend $("<i/ class='error_msg'>").localeKey("no_stats_results")
        $("#exportStatsSection").hide()

    # onProgress : (progressObj) ->
    #     super(progressObj)
        # c.log "onProgress", progressObj.stats



class view.GraphResults extends BaseResults
    constructor : (tabSelector, resultSelector, scope) ->
        super(tabSelector, resultSelector, scope)

        @zoom = "year"
        @granularity = @zoom[0]
        # @corpora = null
        @proxy = new model.GraphProxy()

        @makeRequest @s.data.cqp,
            @s.data.subcqps,
            @s.data.corpusListing,
            @s.data.labelMapping,
            @s.data.showTotal

        $(".chart", @$result).on "click", (event) =>
            target = $(".chart", @$result)
            val = $(".detail .x_label > span", target).data "val"
            cqp = $(".detail .item.active > span", target).data("cqp")
            c.log "chart click", cqp, target
            # time =
            if cqp
                m = moment(val * 1000)

                start = m.format("YYYYMMDD")
                end = m.add(1, "year").subtract(1, "day").format("YYYYMMDD")
                timecqp = "(int(_.text_datefrom) >= #{start} & int(_.text_dateto) <= #{end})"
                cqp = "[(#{decodeURIComponent(cqp)[1...-1]}) & #{timecqp}]"


                opts = {}
                opts.ajaxParams =
                    start : 0
                    end : 24
                    command : "query"
                    corpus: @s.data.corpusListing.stringifySelected()
                    cqp : cqp


                safeApply @s.$root, () =>
                    @s.$root.kwicTabs.push opts



    onentry : ->
    onexit : ->

    parseDate : (granularity, time) ->
        [year,month,day] = [null,0,1]
        switch granularity
            when "y" then year = time
            when "m"
                year = time[0...4]
                month = time[4...6]
            when "d"
                year = time[0...4]
                month = time[4...6]
                day = time[6...8]

        return moment([Number(year), Number(month), Number(day)])


    fillMissingDate : (data) ->
        dateArray = _.pluck data, "x"
        min = _.min dateArray, (mom) -> mom.toDate()
        max = _.max dateArray, (mom) -> mom.toDate()


        duration = switch @granularity
            when "y"
                duration = moment.duration year :  1
                diff = "year"
            when "m"
                duration = moment.duration month :  1
                diff = "month"
            when "d"
                duration = moment.duration day :  1
                diff = "day"

        n_diff = moment(max).diff min, diff

        momentMapping = _.object _.map data, (item) ->
            [moment(item.x).unix(), item.y]

        newMoments = []
        for i in [0..n_diff]
            newMoment = moment(min).add(diff, i)
            maybeCurrent = momentMapping[newMoment.unix()]
            if typeof maybeCurrent != 'undefined'
                lastYVal = maybeCurrent
            else
                newMoments.push {x : newMoment, y : lastYVal}
                

        return [].concat data, newMoments




    getSeriesData : (data) ->
        delete data[""]
        # TODO: getTimeInterval should take the corpora of this parent tab instead of the global ones.
        [first, last] = settings.corpusListing.getTimeInterval()
        firstVal = @parseDate "y", first
        lastVal = @parseDate "y", last.toString()

        hasFirstValue = false
        hasLastValue = false
        output = for [x, y] in (_.pairs data)
            mom = (@parseDate @granularity, x)
            if mom.isSame firstVal then hasFirstValue = true
            if mom.isSame lastVal then hasLastValue = true
            {x : mom, y : y}

        unless hasFirstValue
            output.push {x : firstVal, y:0}

        output = @fillMissingDate output


        output =  output.sort (a, b) ->
            a.x.unix() - b.x.unix()

        #remove last element
        output.splice(output.length-1, 1)

        for tuple in output
            tuple.x = tuple.x.unix()

        return output


    hideNthTick : (graphDiv) ->
        $(".x_tick:visible", graphDiv).hide()
        .filter((n) ->
            return n % 2 == 0
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


    drawIntervals : (graph, intervals) ->
        # c.log "unitWidth", unitWidth
        unless $(".zoom_slider", @$result).is ".ui-slider"
            return
        [from, to] = $('.zoom_slider', @$result).slider("values")
        
        unitSpan = moment.unix(to).diff(moment.unix(from), @zoom)
        unitWidth = graph.width / unitSpan

        $(".empty_area", @$result).remove()
        for list in intervals
            max = _.max list, "x"
            min = _.min list, "x"
            from = Math.round graph.x min.x
            to = Math.round graph.x max.x
            # c.log "from", from, to
            offset = 8
            $("<div>", {class : "empty_area"}).css
                # left : ((from + unitWidth / 2) - offset)
                left : from - unitWidth / 2
                # width : (to - from) - unitWidth / 2
                width : (to - from) + unitWidth
            .appendTo graph.element





    makeRequest : (cqp, subcqps, corpora, labelMapping, showTotal) ->
        c.log "makeRequest", cqp, subcqps, corpora, labelMapping, showTotal
        # hidden = $(".progress_container", @$result).nextAll().hide()
        @s.loading = true
        @showPreloader()
        @proxy.makeRequest(cqp, subcqps, corpora.stringifySelected()).progress( (data) =>
            @onProgress(data)



        ).fail( (data) =>
            c.log "graph crash"
            @resultError(data)
            @s.loading = false


        ).done (data) =>
            c.log "data", data
                
            if data.ERROR
                @resultError data
                return
            nontime = @getNonTime()
            
            if nontime
                $(".non_time", @$result).text(nontime.toFixed(2) + "%").parent().localize()
            else
                $(".non_time_div").hide()

            
            if _.isArray data.combined
                palette = new Rickshaw.Color.Palette("colorwheel")
                series = for item in data.combined
                    color = palette.color()
                    # @colorToCqp[color] = item.cqp
                    {
                        data : @getSeriesData item.relative
                        color : color
                        # name : item.cqp?.replace(/(\\)|\|/g, "") || "&Sigma;"
                        name : if item.cqp then labelMapping[item.cqp] else "&Sigma;"
                        cqp : item.cqp or cqp
                        abs_data : @getSeriesData item.absolute
                    }
            else
                # @colorToCqp['steelblue'] = cqp
                series = [{
                            data: @getSeriesData data.combined.relative
                            color: 'steelblue'
                            name : "&Sigma;"
                            cqp : cqp
                            abs_data : @getSeriesData data.combined.absolute
                        }]

            Rickshaw.Series.zeroFill(series)
            window.data = series[0].data
            emptyIntervals = @getEmptyIntervals(series[0].data)
            @s.hasEmptyIntervals = emptyIntervals.length
            # c.log "emptyIntervals", emptyIntervals

            for s in series
                s.data = _.filter s.data, (item) -> item.y != null


            graph = new Rickshaw.Graph
                element: $(".chart", @$result).get(0)
                renderer: 'line'
                interpolation : "linear"
                series: series
                padding :
                    top : 0.1
                    right : 0.01
                # min : "auto"
            graph.render()
            window._graph = graph
            
            

            @drawIntervals(graph, emptyIntervals)


            $(window).on "resize", _.throttle(() =>
                if @$result.is(":visible")
                    graph.setSize()
                    graph.render()
            , 200)

            # smoother = new Rickshaw.Graph.Smoother
            #     graph: graph,

            # $(".smoothing_switch", @$result).button().change ->
            #     if $(this).is(":checked")
            #         smoother.setScale(1)
            #         graph.interpolation = "cardinal"
            #     else
            #         smoother.setScale(1)
            #         graph.interpolation = "linear"
            #     graph.render()

            $(".form_switch", @$result).buttonset().change (event, ui) =>
                target = event.currentTarget
                val = $(":checked", target).val()
                for cls in @$result.attr("class").split(" ")
                    if cls.match(/^form-/) then @$result.removeClass(cls)
                @$result.addClass("form-" +val)

                $(".smoothing_switch", @$result).button("enable")
                if val == "bar"
                    if $(".legend .line", @$result).length > 1
                        $(".legend li:last:not(.disabled) .action", @$result).click()

                        if (_.all _.map $(".legend .line", @$result), (item) -> $(item).is(".disabled"))
                            $(".legend li:first .action", @$result).click()

                    $(".smoothing_switch:checked", @$result).click()
                    $(".smoothing_switch", @$result).button("disable")


                graph.setRenderer val
                graph.render()
            $(".smoothing_label .ui-button-text", @$result).localeKey("smoothing")
            $(".form_switch .ui-button:first .ui-button-text", @$result).localeKey("line")
            $(".form_switch .ui-button:last .ui-button-text", @$result).localeKey("bar")
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
                    d = new Date(x * 1000)
                    output = ["<span rel='localize[year]'>#{util.getLocaleString('year')}</span>: <span class='currently'>#{d.getFullYear()}</span>",
                              "<span rel='localize[month]'>#{util.getLocaleString('month')}</span>: <span class='currently'>#{d.getMonth()}</span>",
                              "<span rel='localize[day]'>#{util.getLocaleString('day')}</span>: <span class='currently'>#{d.getDay()}</span>"
                              ]
                    out = switch @granularity
                        when "y" then output[0]
                        when "m" then output[0..1].join("\n")
                        when "d" then output.join("\n")

                    return "<span data-val='#{x}'>#{out}</span>"


                yFormatter: (y) ->
                    val = util.formatDecimalString (y.toFixed 2), false, true, true

                    "<br><span rel='localize[rel_hits_short]'>#{util.getLocaleString 'rel_hits_short'}</span> " + val
                formatter : _.debounce( (series, x, y, formattedX, formattedY, d) ->
                    i = _.indexOf (_.pluck series.abs_data, "x"), x, true
                    abs_y = series.abs_data[i].y


                    rel = series.name + ':&nbsp;' + formattedY
                    return """<span data-cqp="#{encodeURIComponent(series.cqp)}">
                        #{rel}
                        <br>
                        #{util.getLocaleString 'abs_hits_short'}: #{abs_y}
                    </span>"""
                , 100)
            } )

            [first, last] = settings.corpusListing.getTimeInterval()

            timeunit = if last - first > 100 then "decade" else @zoom

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

            window.xAxis = new Rickshaw.Graph.Axis.Time
                graph: graph
                timeUnit: time.unit(timeunit)

            slider = new Rickshaw.Graph.RangeSlider
                graph: graph,
                element: $('.zoom_slider', @$result)

            old_render = xAxis.render
            xAxis.render = () =>
                old_render.call xAxis
                @updateTicks()
                @drawIntervals(graph, emptyIntervals)
            

            old_tickOffsets = xAxis.tickOffsets
            xAxis.tickOffsets = () =>
                domain = xAxis.graph.x.domain()

                unit = xAxis.fixedTimeUnit or xAxis.appropriateTimeUnit()
                count = Math.ceil((domain[1] - domain[0]) / unit.seconds)

                runningTick = domain[0]

                offsets = []

                for i in [0...count]
                    tickValue = time.ceil(runningTick, unit)
                    runningTick = tickValue + unit.seconds / 2

                    offsets.push( { value: tickValue, unit: unit, _date: moment(tickValue * 1000).toDate() } )

                return offsets

            xAxis.render()

            yAxis = new Rickshaw.Graph.Axis.Y
                graph: graph

            yAxis.render()
            # hidden.fadeIn()
            @hidePreloader()
            safeApply @s, () =>
                @s.loading = false








