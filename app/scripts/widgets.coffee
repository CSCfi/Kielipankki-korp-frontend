Sidebar =
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
        # TODO (Jyrki Niemi): This could now be removed as Språkbanken's code
        # also passes tokens to @renderCorpusContent and @renderCustomContent
        token_data =
            pos_attrs : wordData
            struct_attrs : sentenceData
            tokens : tokens
        unless $.isEmptyObject(corpusObj.attributes)
            $("#selected_word").append $("<h4>").localeKey("word_attr")

            posData = @renderCorpusContent("pos", wordData, sentenceData,
                corpusObj.attributes, tokens,
                corpusObj.synthetic_attr_names.attributes, token_data)
            # posData.appendTo "#selected_word"
            $("#selected_word").append posData
        unless $.isEmptyObject(corpusObj.struct_attributes)
            $("#selected_sentence").append $("<h4>").localeKey("sentence_attr")

            @renderCorpusContent("struct", wordData, sentenceData,
                corpusObj.struct_attributes, tokens,
                corpusObj.synthetic_attr_names.struct_attributes, token_data)
            .appendTo "#selected_sentence"

        unless $.isEmptyObject(corpusObj.custom_attributes)
            [word, sentence] = @renderCustomContent(wordData, sentenceData, corpusObj.custom_attributes, tokens)
            word.appendTo "#selected_word"
            sentence.appendTo "#selected_sentence"

        # Links in a separate link section
        unless $.isEmptyObject(corpusObj.link_attributes)
            @renderCorpusContent("link", wordData, sentenceData,
                corpusObj.link_attributes,
                corpusObj.synthetic_attr_names.link_attributes, token_data)
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

    renderCorpusContent: (type, wordData, sentenceData, corpus_attrs, tokens,
                          synthetic_attr_names, token_data) ->
        if type == "struct" or type == "link"
            pairs = _.pairs(sentenceData)

        else if type == "pos"
            pairs = _.pairs(wordData)
            for item in (wordData._struct or [])
                # Allow spaces in values (Jyrki Niemi 2016-10-18)
                [key, val] = item.split(/ (.+)/, 2)
                if key of corpus_attrs
                    pairs.push([key, val])

        pairs = _.filter pairs, ([key, val]) -> corpus_attrs[key]

        pairs.sort ([a], [b]) ->
            ord1 = corpus_attrs[a].order
            ord2 = corpus_attrs[b].order
            # first three cases to handle ord1 or ord2 being undefined
            if ord1 == ord2
                return 0
            if not ord1
                return 1
            if not ord2
                return -1
            else
                return ord2 - ord1

        items = []
        for [key, value] in pairs
            items = items.concat (@renderItem key, value, corpus_attrs[key], wordData, sentenceData, token_data, tokens).get?(0)

        items = _.compact items

        # Append possible synthetic attributes (Jyrki Niemi 2015-02-24)
        if synthetic_attr_names.length
            synthetic = for key in synthetic_attr_names
                @renderItem key, null, corpus_attrs[key], wordData, sentenceData, tokens, token_data
            items = items.concat(synthetic)

        return $(items)

    renderCustomContent: (wordData, sentenceData, corpus_attrs, tokens) ->
        struct_items = []
        pos_items = []
        for key, attrs of corpus_attrs
            output = @renderItem(key, null, attrs, wordData, sentenceData, tokens)
            if attrs.customType == "struct"
                struct_items.push output
            else if attrs.customType == "pos"
                pos_items.push output
        return [$(pos_items), $(struct_items)]

    renderItem: (key, value, attrs, wordData, sentenceData, tokens, token_data) ->

        # Convert &, < and > to HTML character entities (for
        # stringifying attribute values for which stringify is not
        # defined). (Jyrki Niemi 2016-12-15)
        encodeHtmlEntities = (s) ->
            s.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")

        # Map a value via the dataset property if it exists and is not
        # an array, that it, is a mapping (object with properties).
        # FIXME: This does not yield a correct result if the dataset
        # keys are regular expressions as they may be. Should we
        # perhaps have separate dataset mappings for the query,
        # allowing regexps, and for stringifying values, not allowing
        # regexps? (Jyrki Niemi 2017-05-16)
        mapViaDataset = (value) ->
            if attrs.dataset? and not _.isArray(attrs.dataset)
                return attrs.dataset[value] or value
            else
                return value

        if attrs.displayType in ["hidden", "date_interval"] or
                attrs.displayOnly == "search"
            return ""
        if attrs.type == "url" and attrs?.url_opts?.hide_url
            # If url_opts.hide_url, hide the url and show the localized
            # label as the link, or nothing, if the value is empty
            if value == ""
                return ""
            output = $("<p></p>")
        else
            output = $("<p><span rel='localize[#{attrs.label}]'></span>: </p>")
        if attrs.renderItem
            return output.append(attrs.renderItem key, value, attrs, wordData, sentenceData, tokens)

        output.data("attrs", attrs)
        # Convert an undefined value to the empty string (Jyrki Niemi
        # 2015-08-26)
        value ?= ""
        if (value == "|" or value == "") and
                not (attrs.translationKey? and attrs.dataset?[value]?) and
                not attrs.stringify_synthetic?
            # The original version only appended to the output here
            # but did not return yet. Would we need further processing
            # for empty values in some cases? (Jyrki Niemi 2015-08-26)
            output.append "<i rel='localize[empty]' style='color : grey'>${util.getLocaleString('empty')}</i>"
            return output

        # Transform the value if a transformation function has been
        # specified. (Jyrki Niemi 2015-10-26)
        if attrs.transform?
            value = attrs.transform(value)

        if attrs.type == "set"
            # For a set-valued attribute, add the taginfo link right
            # after the attribute label (Jyrki Niemi 2016-02-10)
            if attrs.taginfo_url
                output.append """<a href='#{attrs.taginfo_url}' target='_blank'>
                                                <span id='sidbar_info' class='ui-icon ui-icon-info'></span>
                                            </a>
                                    """
            pattern = attrs.pattern or '<span data-key="<%= key %>"><%= val %></span>'
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
                val = (attrs.stringify or encodeHtmlEntities)(x)

                inner = $(_.template(pattern, {key : x, val : val}))
                if attrs.translationKey?
                    prefix = attrs.translationKey or ""
                    val = mapViaDataset(val)
                    inner.localeKey(prefix + val)

                if attrs.internalSearch
                    inner.addClass("link").click ->
                        cqpVal = $(this).data("key")
                        search({"search": "cqp|[#{key} contains '#{cqpVal}']"})

                li = $("<li></li>").data("key", x).append inner
                if attrs.externalSearch
                    address = _.template(attrs.externalSearch, {val : x})
                    li.append $("<a href='#{address}' class='external_link' target='_blank'></a>")


                li
            ul.append lis
            output.append ul

            return output


        str_value = if attrs.stringify_synthetic
                        attrs.stringify_synthetic(token_data)
                    else
                        (attrs.stringify or encodeHtmlEntities)(value)


        if attrs.type == "url"
            # If url_opts.new_window, open the link to a new window
            target = if attrs?.url_opts?.new_window
                         " target='_blank'"
                     else
                         ""
            # If the function attrs.url_opts.stringify_link is
            # defined, use it to make the complete link (HTML "a"
            # element(s)). The function takes as arguments the name of
            # the current attribute, its stringified value, its
            # configuration properties, and HTML attributes for the a
            # element. stringify_link is useful e.g. when a link
            # attribute contains more than one URL. (Jyrki Niemi
            # 2016-02-10)
            if attrs?.url_opts?.stringify_link
                return output.append attrs.url_opts.stringify_link(
                        key, str_value, attrs,
                        "class='exturl' sidebar_url'#{target}")
            # If url_prefix is specified, prepend it to the URL
            url = (attrs.url_prefix or "") + str_value
            # If url_opts.hide_url, use the localized label as the
            # link text, otherwise the URL
            link_text = if attrs?.url_opts?.hide_url
                            "<span rel='localize[#{attrs.label}]'>#{key}</span>"
                        else
                            decodeURI(str_value)
            return output.append "<a href='#{url}' class='exturl sidebar_url'#{target}>#{link_text}</a>"

        else if attrs.taginfo_url or (key == "msd" and attrs.taginfo_url != "")
            # For msd, an empty taginfo_url disables the info link, a
            # non-empty value is used as an URL to link to, and an
            # undefined value links to the default URL
            # markup/msdtags.html. For other attributes, require that
            # taginfo_url is defined and non-empty.(Jyrki Niemi
            # 2015-02-04, 2016-02-10)
            taginfo_url = attrs.taginfo_url or "markup/msdtags.html"
            return output.append """<span class='msd_sidebar'>#{str_value}</span>
                                        <a href='#{taginfo_url}' target='_blank'>
                                            <span id='sidbar_info' class='ui-icon ui-icon-info'></span>
                                        </a>
                                    </span>
                                """
        else if attrs.pattern
            return output.append _.template attrs.pattern, {key : key, val : str_value, pos_attrs : wordData, struct_attrs : sentenceData }

        else
            if attrs.translationKey?
                str_value = mapViaDataset(str_value)
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
                a = _.str.trim(oldtext, "/").replace("...", "").split("/")
                domain = a.slice(2, 3)
                midsection = a.slice(3).join("/")
                midsection = "..." + midsection.slice(2)
                $(this).text ["http:/"].concat(domain, midsection).join("/")
                break if midsection is "..."

        # @element.css "display", oldDisplay

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
