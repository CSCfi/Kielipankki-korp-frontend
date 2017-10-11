window.view = {}

#**************
# Search view objects
#**************
view.lemgramSort = (first, second) ->
    match1 = util.splitLemgram(first)
    match2 = util.splitLemgram(second)
    return parseInt(match1.index) - parseInt(match2.index) if match1.form is match2.form
    first.length - second.length

view.saldoSort = (first, second) ->
    match1 = util.splitSaldo(first)
    match2 = util.splitSaldo(second)
    return parseInt(match1[2]) - parseInt(match2[2]) if match1[1] is match2[1]
    first.length - second.length

view.updateSearchHistory = (value, href) ->
    filterParam = (url) ->
        $.grep($.param.fragment(url).split("&"), (item) ->
            item.split("=")[0] is "search" or item.split("=")[0] is "corpus"
        ).join "&"
    $("#search_history").empty()
    searches = $.jStorage.get("searches") or []
    searchLocations = $.map(searches, (item) ->
        filterParam item.location
    )
    if value? and filterParam(href) not in searchLocations
        searches.splice 0, 0,
            label: value
            location: href

        $.jStorage.set "searches", searches
    return unless searches.length
    opts = $.map(searches, (item) ->
        output = $("<option />", value: item.location)
        .text(item.label).get(0)
        output
    )
    placeholder = $("<option>").localeKey("search_history").get(0)
    clear = $("<option class='clear'>").localeKey("search_history_clear")

    $("#search_history").html(opts)
        .prepend(clear)
        .prepend(placeholder)


view.enableSearch = (bool) ->
    # TODO: revive this
    # if bool
    #     $("#search-tab").tabs("enable").removeClass("ui-state-disabled").uncover()
    # else
    #     $("#search-tab").tabs("disable").addClass("ui-state-disabled").cover()

view.initSearchOptions = ->
    selects = $("#search_options > div:first select").customSelect()

    $("#search_options select").each ->
        state = search()[$(this).data("history")]

        if state
            $(this).val(state).change()
        else
            $(this).prop("selectedIndex", 0).change()

    $("#search_options").css("background-color", settings.primaryLight).change (event, isInit) ->
        # simpleSearch.enableSubmit()
        target = $(event.target)
        unless target.data("history") then return
        state = {}
        state[target.data("history")] = target.val()
        unless target.prop("selectedIndex") is 0
            search state
        else
            if search()[target.data("history")]
                search target.data("history"), null

        if isInit is true
            search("search", null)

class BaseSearch
    constructor: (mainDivId, scope) ->
        @s = scope
        @$main = $(mainDivId)
        @$main.find("#sendBtn:submit").click $.proxy(@onSubmit, this)
        @_enabled = true

    refreshSearch: ->
        # $.bbq.removeState "search"
        search "search", null
        # search "page", null
        $(window).trigger "hashchange"

    onSubmit: ->
        @refreshSearch()

    isVisible: ->
        @$main.is ":visible"

    isEnabled: ->
        @_enabled

    enableSubmit: ->
        @_enabled = true
        @$main.find("#sendBtn").attr "disabled", false

    disableSubmit: ->
        @_enabled = false
        @$main.find("#sendBtn").attr "disabled", "disabled"


class view.SimpleSearch extends BaseSearch
    constructor: (mainDivId, _mainDiv, scope) ->
        super mainDivId, scope
        $("#similar_lemgrams").css "background-color", settings.primaryColor
        # $("#simple_text").keyup $.proxy(@onSimpleChange, this)
        $("#simple_text").keyup (event) =>
            @s.$apply () =>
                @onSimpleChange(event)
        # @onSimpleChange()
        $("#similar_lemgrams").hide()
        @savedSelect = null

        @lemgramProxy = new model.LemgramProxy()

        # [type, val] = search().search.split("|")

        # if type == "word"
            # TODO: bring back word to input field
            # input_field = val

        @s.autocSettings = { enableLemgramSuggestion : settings.autocomplete }

        $("#prefixChk, #suffixChk, #caseChk").click =>
            if $("#simple_text").attr("placeholder") and $("#simple_text").text() is ""
                @enableSubmit()
            else
                @onSimpleChange()

        # $("#keyboard").click ->
        #     c.log "click", arguments
        #     $("#char_table").toggle "slide",
        #         direction: "up"
        #     , "fast"

        # $("#char_table td").click ->
        #     $("#simple_text").val $("#simple_text").val() + $(this).text()


    isSearchPrefix: ->
        $("#prefixChk").is ":checked"

    isSearchSuffix: ->
        $("#suffixChk").is ":checked"

    #makeLemgramSelect: (lemgram) ->
    #    self = this
    #    promise = $("#simple_text").data("promise") or @lemgramProxy.karpSearch(lemgram or $("#simple_text").val(), false)
    #    promise.done (lemgramArray) =>
    #        $("#lemgram_select").prev("label").andSelf().remove()
    #        @savedSelect = null
    #        return if lemgramArray.length is 0
    #        lemgramArray.sort view.lemgramSort
    #        lemgramArray = $.map(lemgramArray, (item) ->
    #            label: util.lemgramToString(item, true)
    #            value: item
    #        )
    #        select = @buildLemgramSelect(lemgramArray)
    #        .appendTo("#korp-simple")
    #        .addClass("lemgram_select")
    #        .prepend($("<option>").localeKey("none_selected"))
    #        .change ->
    #            unless self.selectedIndex is 0
    #                self.savedSelect = lemgramArray
    #                self.selectLemgram $(this).val()
    #            $(this).prev("label").andSelf().remove()
    #
    #        # select.get(0).selectedIndex = 0
    #        label = $("<label />", for: "lemgram_select")
    #        .html("<i>#{$("#simple_text").val()}</i> <span rel='localize[autocomplete_header]'>#{util.getLocaleString("autocomplete_header")}</span>")
    #        .css("margin-right", 8)
    #        select.before label


    onSubmit: ->
        super()
        wordInput = @getWordInput()
        unless wordInput is ""
            util.searchHash "word", wordInput
            #console.log "modily", @s.model
        else
            if @s.model
                @selectLemgram @s.model

    getWordInput: () ->
        if settings.autocomplete
            return $("#simple_text > div > div > .autocomplete_searchbox").val()
        else
            return $("#simple_text > div > div > .standard_searchbox").val()

    selectLemgram: (lemgram) ->
        return if $("#search-tab").data("cover")?
        @refreshSearch()
        # if @isSearchSuffix() or @isSearchPrefix()
        #     c.log "suffix or prefix"
        #     util.searchHash "cqp", @getCQP()
        # else
        util.searchHash "lemgram", lemgram

    buildLemgramSelect: (lemgrams) ->
        $("#lemgram_select").prev("label").andSelf().remove()
        optionElems = $.map(lemgrams, (item) ->
            $("<option>",
                value: item.value
            ).html(item.label).get 0
        )
        return $("<select id='lemgram_select' />").html(optionElems).data("dataprovider", lemgrams)

    # Convert the prequery string prequery_str to an array of CQP
    # queries, searching for values of the attributes in
    # prequery_attrs, by default either a word form or lemma. Allow
    # phrases of consecutive words enclosed in double quotation marks,
    # with an asterisk denoting any single word. (Jyrki Niemi
    # 2015-06-18)
    makePrequeryCQPs: (prequery_str, prequery_attrs) ->

        # Split the string str to phrases of either single words or
        # consecutive words enclosed in double quotes.
        splitToPhrases = (str) ->
            words = str.split(/\s+/)
            result = []
            phrase = []
            wordcnt = words.length
            wordnum = 0
            while wordnum < wordcnt
                word = words[wordnum]
                if phrase.length > 0
                    if word.slice(-1) == "\""
                        phrase.push(word.slice(0, -1))
                        result.push(phrase.join(" "))
                        phrase = []
                    else
                        phrase.push(word)
                else if word.charAt(0) == "\""
                    if word.slice(-1) == "\""
                        result.push(word.slice(1, -1))
                    else
                        phrase.push(word.slice(1))
                else
                    result.push(word)
                wordnum++
            if phrase.length > 0
                result.push(phrase.join(" "))
            return result

        # Make CQP expression from phrase, using the attributes in the
        # array prequery_attrs. An asterisk denotes any single word.
        makePhraseCQP = (phrase, prequery_attrs) ->
            result = (for word in phrase.split(" ")
                "[" +
                    (if word == "*"
                         ""
                     else
                         (for attrname in prequery_attrs
                              $.format("%s = \"%s\"",
                                       [attrname,
                                        regescape(word).replace("\\*", ".*")])
                         ).join(" | ")) +
                "]"
            ).join(" ")
            # c.log("makePhraseCQP", phrase, "=>", result)
            return result

        prequery_str = $.trim(prequery_str or "")
        if prequery_str
            prequery_attrs = (prequery_attrs or "word|lemma").split("|")
            prequery_phrases = splitToPhrases(prequery_str)
            # c.log("prequery phrases", prequery_phrases)
            return (for phrase in prequery_phrases
                makePhraseCQP(phrase, prequery_attrs))
        else
            return null


    getCQP : (word) ->
        # c.log "getCQP", word
        currentText = $.trim(word or @getWordInput() or "", '"')
        suffix = (if $("#caseChk").is(":checked") then " %c" else "")
        if util.isLemgramId(currentText) # if the input is a lemgram, do lemgram search.
            val = "[lex contains \"#{currentText}\"]"
        else if @s.placeholder
            lemgram = regescape @s.placeholder
            val = "[lex contains '#{lemgram}'"

            # Include conditions on the prefix and suffix attributes
            # in the search only if all the selected corpora contain
            # the attributes; otherwise, construct a lemgram prefix
            # and suffix. If some corpora contain prefix and suffix
            # and others do not, using them for all corpora would
            # exclude all results from those that do not contain the
            # attributes, unless the missing attributes were filtered
            # out from the query for the corpora lacking them
            # (preferably by the backend). (Jyrki Niemi 2017-10-04)
            word_attrs =
                    settings.corpusListing.getCurrentAttributesIntersection()
            if @isSearchPrefix()
                if "prefix" of word_attrs
                    val += " | prefix contains '#{lemgram}'"
                else
                    # Require the same part of speech
                    val += " | lex contains '" +
                        lemgram.replace(/(.*)(\\.\\.)/, "$1.*$2") + "'"
            if @isSearchSuffix()
                if "suffix" of word_attrs
                    val += " | suffix contains '#{lemgram}'"
                else
                    val += " | lex contains '.*#{lemgram}'"

            val += "]"

        else if @isSearchPrefix() or @isSearchSuffix()
            query = []
            @isSearchPrefix() and query.push("%s.*")
            @isSearchSuffix() and query.push(".*%s")
            val = $.map(currentText.split(" "), (wd) ->
                "[" + $.map(query, (q) ->
                    q = $.format(q, wd)
                    $.format "word = \"%s\"%s", [q, suffix]
                ).join(" | ") + "]"
            ).join(" ")
        else
            wordArray = currentText.split(" ")
            cqp = $.map(wordArray, (item, i) ->
                $.format "[word = \"%s\"%s]", [regescape(item), suffix]
            )
            val = cqp.join(" ")

        # Make the possible prequeries and add the main CQP query as
        # the last one.
        prequeries = @makePrequeryCQPs($("#simple_prequery", @$main).val())
        # c.log("prequeries", prequeries)
        if prequeries
            prequeries.push(val)
        #     val = prequeries
            val = prequeries.join('||')

        return val

    onSimpleChange: (event) ->
        $("#simple_text").data "promise", null
        if event and event.keyCode is 27 #escape
            c.log "key", event.keyCode
            return

        if event and event.keyCode != 13
           @s.placeholder = null
        # val = @getCQP()
        # @s.$root.extendedCQP = val

    resetView: ->
        $("#similar_lemgrams").empty().height "auto"
        $("#show_more").remove()
        # @setPlaceholder null, null
        @s.placeholder = null

        this

    clear: ->
        $("#simple_text").val("").get(0).blur()
        # @disableSubmit()
        this
