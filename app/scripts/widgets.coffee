Sidebar =
    options: {
        displayOrder : [
            "pos",
            "posset",
            "lemma",
            "lex",
            "saldo",
            "variants"
        ].reverse()
    }
    _init: () ->

    updateContent: (sentenceData, wordData, corpus, tokens) ->
        @element.html ('<div id="selected_sentence" /><div id="selected_word" /><div id="selected_links" />')
        corpusObj = settings.corpora[corpus]

        formattedCorpusInfo =
            if settings?.corpusExtraInfo
            then util.formatCorpusExtraInfo(
                corpusObj, settings.corpusExtraInfo?.sidebar)
            else ""
        if formattedCorpusInfo
            formattedCorpusInfo = "<br/>" + formattedCorpusInfo
        $("<div />").html("<h4 rel='localize[corpus]'></h4> <p>#{corpusObj.title}</p><p id='sidebar-corpus-info'>#{formattedCorpusInfo}</p>").prependTo "#selected_sentence"
        # All token data, to be passed to the function stringify_synthtetic
        # of a synthetic attribute (Jyrki Niemi 2015-02-24)
        token_data =
            pos_attrs : wordData
            struct_attrs : sentenceData
            tokens : tokens
        unless $.isEmptyObject(corpusObj.attributes)
            $("#selected_word").append $("<h4>").localeKey("word_attr")

            @renderContent(wordData, corpusObj.attributes,
                corpusObj.synthetic_attr_names.attributes, token_data,
                corpusObj._sidebar_display_order?.attributes)
            .appendTo "#selected_word"
        unless $.isEmptyObject(corpusObj.struct_attributes)
            $("#selected_sentence").append $("<h4>").localeKey("sentence_attr")

            @renderContent(sentenceData, corpusObj.struct_attributes,
                corpusObj.synthetic_attr_names.struct_attributes, token_data,
                corpusObj._sidebar_display_order?.struct_attributes)
            .appendTo "#selected_sentence"

        # Links in a separate link section
        unless $.isEmptyObject(corpusObj.link_attributes)
            @renderContent(sentenceData, corpusObj.link_attributes,
                corpusObj.synthetic_attr_names.link_attributes, token_data,
                corpusObj._sidebar_display_order?.link_attributes)
            .appendTo "#selected_links"

        @element.localize()
        @applyEllipse()
        if corpusObj.attributes.deprel
            @renderGraph(tokens)

    renderGraph : (tokens) ->
        outerW = $(window).width() - 80

        $("<span class='link show_deptree'>Visa träd</button>").localeKey("show_deptree").click( ->
            info = $("<span class='info' />")
            iframe = $('<iframe src="lib/deptrees/deptrees.html"></iframe>').css("width", outerW - 40).load ->

                wnd = this.contentWindow
                tokens = tokens
                wnd.draw_deptree.call wnd, tokens, (msg) ->
                    [type, val] = _.head _.pairs msg
                    info.empty().append $("<span>").localeKey(type), $("<span>: </span>"), $("<span>").localeKey("#{type}_#{val}")

            $("#deptree_popup").empty().append(info, iframe).dialog(
                height : 300
                width : outerW

            ).parent().find(".ui-dialog-title").localeKey("dep_tree")

        ).appendTo(@element)





    renderContent: (wordData, corpus_attrs, synthetic_attr_names, token_data,
                    attr_order) ->
        pairs = _.pairs(wordData)
        order = attr_order or @options.displayOrder
        pairs.sort ([a], [b]) ->
            $.inArray(b, order) - $.inArray(a, order)
        items = for [key, value] in pairs when corpus_attrs[key]
            @renderItem key, value, corpus_attrs[key], token_data

        # Append possible synthetic attributes (Jyrki Niemi 2015-02-24)
        if synthetic_attr_names.length
            synthetic = for key in synthetic_attr_names
                @renderItem key, null, corpus_attrs[key], token_data
            items = items.concat(synthetic)

        return $(items)

    renderItem: (key, value, attrs, token_data) ->
        if attrs.displayType == "hidden" or attrs.displayType == "date_interval"
            return ""
        if attrs.type == "url" and attrs?.url_opts?.hide_url
            # If url_opts.hide_url, hide the url and show the localized
            # label as the link, or nothing, if the value is empty
            if value == ""
                return ""
            output = $("<p></p>")
        else
            output = $("<p><span rel='localize[#{attrs.label}]'>#{key}</span>: </p>")
        output.data("attrs", attrs)
        # Convert an undefined value to the empty string (Jyrki Niemi
        # 2015-08-26)
        value ?= ""
        if (value == "|" or value == "") and
                not (attrs.translationKey? and attrs.dataset?[value]?)
            # The original version only appended to the output here
            # but did not return yet. Would we need further processing
            # for empty values in some cases? (Jyrki Niemi 2015-08-26)
            return output.append "<i rel='localize[empty]' style='color : grey'>${util.getLocaleString('empty')}</i>"


        if attrs.type == "set"
            pattern = attrs.pattern or '<span data-key="<% key %>"><%= val %></span>'
            ul = $("<ul>")
            getStringVal = (str) ->
                return _.reduce(_.invoke(_.invoke(str, "charCodeAt", 0), "toString"), (a,b) -> a + b);
            valueArray = _.filter(value?.split("|") or [], Boolean)
            if key == "variants"
                # TODO: this doesn't sort quite as expected
                valueArray.sort (a, b) ->
                    splita = util.splitLemgram(a);
                    splitb = util.splitLemgram(b);
                    strvala = getStringVal(splita.form) + splita.index + getStringVal(splita.pos);
                    strvalb = getStringVal(splitb.form) + splitb.index + getStringVal(splitb.pos);

                    return parseInt(strvala) - parseInt(strvalb);

            itr = if _.isArray(valueArray) then valueArray else _.values(valueArray)
            lis = for x in itr when x.length
                val = (attrs.stringify or _.identity)(x)

                inner = $(_.template(pattern, {key : x, val : val}))
                if attrs.translationKey?
                    prefix = attrs.translationKey or ""
                    inner.localeKey(prefix + val)
                li = $("<li></li>").data("key", x).append inner
                if attrs.externalSearch
                    address = _.template(attrs.externalSearch, {val : x})
                    li.append $("<a href='#{address}' class='external_link' target='_blank'></a>")
                                                    .click (event) -> event.stopImmediatePropagation()
                if attrs.internalSearch
                    li.addClass("link").click ->
                        cqpVal = $(this).data("key")
                        search({"search": "cqp|[#{key} contains '#{cqpVal}']"})


                li
            ul.append lis
            output.append ul

            return output


        str_value = if attrs.stringify_synthetic
                        attrs.stringify_synthetic(token_data)
                    else
                        (attrs.stringify or _.identity)(value)


        if attrs.type == "url"
            # If url_prefix is specified, prepend it to the URL
            url = (attrs.url_prefix or "") + str_value
            # If url_opts.new_window, open the link to a new window
            target = if attrs?.url_opts?.new_window
                         " target='_blank'"
                     else
                         ""
            # If url_opts.hide_url, use the localized label as the
            # link text, otherwise the URL
            link_text = if attrs?.url_opts?.hide_url
                            "<span rel='localize[#{attrs.label}]'>#{key}</span>"
                        else
                            decodeURI(str_value)
            return output.append "<a href='#{url}' class='exturl sidebar_url'#{target}>#{link_text}</a>"

        else if key == "msd" and attrs.taginfo_url != ""
            # An empty taginfo_url disables the info link; a non-empty value
            # is used as an URL to link to; and an undefined value links to
            # the default URL markup/msdtags.html.
            # This probably could be generalized to other attributes as well.
            # (Jyrki Niemi 2015-02-04)
            taginfo_url = attrs.taginfo_url or "markup/msdtags.html"
            return output.append """<span class='msd'>#{str_value}</span>
                                        <a href='#{taginfo_url}' target='_blank'>
                                            <span id='sidbar_info' class='ui-icon ui-icon-info'></span>
                                        </a>
                                    </span>
                                """
        else if attrs.pattern
            return output.append _.template(attrs.pattern, {key : key, val : str_value})

        else
            if attrs.translationKey?
                str_value = attrs?.dataset[value] or str_value
                return output.append "<span rel='localize[#{attrs.translationKey}#{str_value}]'></span>"
            else
                return output.append "<span>#{str_value || ''}</span>"


    applyEllipse: ->
        # oldDisplay = @element.css("display")
        # @element.css "display", "block"
        totalWidth = @element.width()

        # ellipse for too long links of type=url
        @element.find(".sidebar_url").css("white-space", "nowrap").each ->
            while $(this).width() > totalWidth
                oldtext = $(this).text()
                a = $.trim(oldtext, "/").replace("...", "").split("/")
                domain = a.slice(2, 3)
                midsection = a.slice(3).join("/")
                midsection = "..." + midsection.slice(2)
                $(this).text ["http:/"].concat(domain, midsection).join("/")
                break if midsection is "..."

        # @element.css "display", oldDisplay

    _parseLemma: (attr, tmplVal) ->
        seq = []
        if attr?
            seq = $.map(attr.split("|"), (item) ->
                lemma = item.split(":")[0]
                if tmplVal.pattern
                    $.format tmplVal.pattern, [lemma, lemma]
                else
                    lemma
            )
        seq = $.grep(seq, (itm) ->
            itm and itm.length
        )
        $.arrayToHTMLList(seq).outerHTML()

    refreshContent: (mode) ->
        if mode is "lemgramWarning"
            $.Deferred((dfd) =>
                @element.load "markup/parse_warning.html", =>
                    util.localize()
                    @element.addClass("ui-state-highlight").removeClass "kwic_sidebar"
                    dfd.resolve()

            ).promise()
        else
            @element.removeClass("ui-state-highlight").addClass "kwic_sidebar"

    updatePlacement: ->
        max = Math.round($("#columns").position().top)
        if $(window).scrollTop() < max
            @element.removeClass "fixed"
        else @element.addClass "fixed" if $("#left-column").height() > $("#sidebar").height()


$.widget("korp.sidebar", Sidebar)



$.widget "korp.radioList",
    options:
        change: $.noop
        separator: "|"
        selected: "default"

    _create: ->
        @_super()
        self = this
        $.each @element, ->

            # $.proxy(self.options.change, self.element)();
            $(this).children().wrap("<li />").click(->
                unless $(this).is(".radioList_selected")
                    self.select $(this).data("mode")
                    self._trigger "change", $(this).data("mode")
            ).parent().prepend($("<span>").text(self.options.separator)).wrapAll "<ul class='inline_list' />"

        @element.find(".inline_list span:first").remove()
        @select @options.selected

    select: (mode) ->
        @options.selected = mode
        target = @element.find("a").filter(->
            $(this).data("mode") is mode
        )
        @element.find(".radioList_selected").removeClass "radioList_selected"
        @element.find(target).addClass "radioList_selected"
        @element

    getSelected: ->
        @element.find ".radioList_selected"

$.extend $.ui.autocomplete.prototype,
    _renderItem: (ul, item) ->
        li = $("<li></li>").data("ui-autocomplete-item", item)
            .append($("<a></a>")[(if @options.html then "html" else "text")](item.label))
            .appendTo(ul)
        li.addClass "autocomplete-item-disabled" unless item["enabled"]
        li

    _renderMenu: (ul, items) ->
        that = this
        currentCategory = ""
        $.each items, (index, item) ->
            if item.category and item.category isnt currentCategory
                ul.append $("<li class='ui-autocomplete-category'></li>").localeKey(item.category)
                currentCategory = item.category
            that._renderItem ul, item



$.fn.korp_autocomplete = (options) ->
    selector = $(this)
    proxy = new model.LemgramProxy()
    if typeof options is "string" and options is "abort"
        proxy.abort()
        selector.preloader "hide"
        return
    options = $.extend(
        type: "lem"
        select: (e) ->
            # c.log "select", arguments
            # return false
        labelFunction: util.lemgramToString
        middleware: (request, idArray) ->

            dfd = $.Deferred()
            has_morphs = settings.corpusListing.getMorphology().split("|").length > 1
            if has_morphs
                idArray.sort (a, b) ->
                    first = (if a.split("--").length > 1 then a.split("--")[0] else "saldom")
                    second = (if b.split("--").length > 1 then b.split("--")[0] else "saldom")
                    second < first

            else
                idArray.sort options.sortFunction or view.lemgramSort
            labelArray = util.sblexArraytoString(idArray, options.labelFunction)
            listItems = $.map(idArray, (item, i) ->
                out =
                    label: labelArray[i]
                    value: item
                    input: request.term
                    enabled: true

                out["category"] = (if item.split("--").length > 1 then item.split("--")[0] else "saldom") if has_morphs
                out
            )
            dfd.resolve listItems
            
            dfd.promise()
    , options)
    selector.preloader(
        timeout: 500
        position:
            my: "right center"
            at: "right center"
            offset: "-1 0"
            collision: "none"
    ).autocomplete
        html: true
        source: (request, response) ->
            c.log "autocomplete request", request
            c.log "autocomplete type", options.type
            promise = if options.type is "saldo"
            then proxy.saldoSearch(request.term, options["sw-forms"])
            else proxy.karpSearch(request.term, options["sw-forms"])
            promise.done((idArray, textstatus, xhr) ->
                c.log "idArray", idArray.length
                idArray = $.unique(idArray)
                options.middleware(request, idArray).done (listItems) ->
                    
                    
                    selector.data "dataArray", listItems
                    response listItems
                    if selector.autocomplete("widget").height() > 300
                        selector.autocomplete("widget").addClass "ui-autocomplete-tall"
                    $("#autocomplete_header").remove()
                    $("<li id='autocomplete_header' />")
                        .localeKey("autocomplete_header")
                        .css("font-weight", "bold")
                        .css("font-size", 10)
                        .prependTo selector.autocomplete("widget")
                    selector.preloader "hide"
                    

            ).fail ->
                c.log "sblex fail", arguments
                selector.preloader "hide"

            selector.data "promise", promise

        search: ->
            selector.preloader "show"

        minLength: 1
        select: (event, ui) ->
            event.preventDefault()
            selectedItem = ui.item.value
            $.proxy(options.select, selector) selectedItem

        close: (event) ->
            false

        focus: ->
            false

    selector
