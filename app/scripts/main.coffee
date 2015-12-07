
# window.searchProxy = new model.SearchProxy()
window.authenticationProxy = new model.AuthenticationProxy()
window.timeProxy = new model.TimeProxy()
creds = $.jStorage.get("creds")
if creds
    authenticationProxy.loginObj = creds

# rewriting old url format to the angular one
if(location.hash.length && location.hash[1] != "?")
    location.hash = "#?" + _.str.lstrip(location.hash, "#")

# Map possible corpus id aliases to actual corpus ids in the URL hash
# parameter "corpus". (Jyrki Niemi 2015-04-23)
util.mapHashCorpusAliases()

t = $.now()

isDev = window.location.host is "localhost"
# deferred_load = $.get("markup/searchbar.html")
$.ajaxSetup
    dataType: "json"
    traditional: true

$.ajaxPrefilter "json", (options, orig, jqXHR) ->
    "jsonp" if options.crossDomain and not $.support.cors

deferred_domReady = $.Deferred((dfd) ->
    $ ->
        mode = $.deparam.querystring().mode
        if mode? and mode isnt "default"
            $.getScript("modes/#{mode}_mode.js").done () ->
                dfd.resolve()
        else
            dfd.resolve()
                
            

    return dfd
).promise()

loc_dfd = initLocales()
$(document).keyup (event) ->
    if event.keyCode == 27
        kwicResults?.abort()
        lemgramResults?.abort()
        statsResults?.abort()

$.when(loc_dfd, deferred_domReady).then ((loc_data) ->
    c.log "preloading done, t = ", $.now() - t

    # angular.element(document).ready () ->
    angular.bootstrap(document, ['korpApp'])

    corpus = search()["corpus"]
    if corpus
        settings.corpusListing.select corpus.split(",")
    
    $("body").addClass "lab" if isLab
    
    $("body").addClass "mode-" + currentMode
    util.browserWarn()
    view.updateSearchHistory()

    $("#logo").click ->
        window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + location.search
        false


    #TODO: why do i have to do this?
    $("#cog_menu .follow_link").click ->
        window.href = window.open($(this).attr("href"), $(this).attr("target") or "_self")

    $("#search_history").change (event) ->
        c.log "select", $(this).find(":selected")
        target = $(this).find(":selected")
        if _.str.contains target.val(), "http://"
            location.href = target.val()
        else if target.is(".clear")
            c.log "empty searches"
            $.jStorage.set("searches", [])
            view.updateSearchHistory()

    # reset creds if new session --matthies 2014-01-14
    if not sessionStorage.getItem("newSession")
        sessionStorage.setItem("newSession", true)
        $.jStorage.deleteKey("creds")
        c.log "delete creds"
    creds = $.jStorage.get("creds")
    # for some reason this matches after login after browser start, but not later. --matthies 28.11.13
    if creds
        util.setLogin()
    #     authenticationProxy.loginObj = creds
    c.log "creds", creds

    tab_a_selector = "ul .ui-tabs-anchor"


    $("#log_out").click ->
        $.each authenticationProxy.loginObj.credentials, (i, item) ->
            $(".boxdiv[data=#{item.toLowerCase()}]").addClass "disabled"

        authenticationProxy.loginObj = {}
        $.jStorage.deleteKey "creds"
        $("body").toggleClass "logged_in not_logged_in"
        $("#pass").val ""
        $("#corpusbox").corpusChooser "redraw"

    # Add to selector a Shibboleth login or logout link as defined by
    # settings[url_prop]. If the link is a string, it is taken as a URL.
    # If it is a function, it is used to generate the URL dynamically
    # at link click time. This allows passing the current URL (including
    # parameters and hash) to the Shibboleth pages (scripts), which in
    # turn allows retaining the state of Korp (mode, language, selected
    # corpora, query) in login or logout. The function parameter
    # add_link_fn is used to add the URL to the HTML. It should take two
    # arguments: elem (corresponding to $(selector)) and href (the value
    # of the href attribute of the a element to be set or added).
    # (Jyrki Niemi 2015-05-06)
    make_shibboleth_link = (selector, url_prop, add_link_fn) ->
        url = settings[url_prop]
        if url?
            if typeof url != "function"
                add_link_fn($(selector), url)
            else
                add_link_fn($(selector), "javascript:")
                $(selector).find("a").click ((url_fn) ->
                    (e) ->
                        e.preventDefault()
                        window.location.href = url_fn()
                        return
                )(url)
        else
            c.log "settings.#{url_prop} not defined"
        return

    # Use Basic authentication if not specified explicitly
    settings.authenticationType ?= "basic"
    settings.authenticationType = settings.authenticationType.toLowerCase()
    # Modify the login (and logout) link according to authentication type
    # (janiemi 2014-01-13)
    switch settings.authenticationType
        when "shibboleth"
            # Change the href of login link to the one specified in config.js
            make_shibboleth_link(
                "#login", "shibbolethLoginUrl",
                (elem, href) -> elem.find("a").attr("href", href)
            )
            # Add an 'a' element to the logout link, href specified in config.js
            make_shibboleth_link(
                "#log_out", "shibbolethLogoutUrl",
                (elem, href) -> elem.wrapInner("<a href='#{href}'></a>")
            )
        when "basic"
            # Invoke JavaScript code from the login link
            $("#login").find("a").attr("href", "javascript:")
        else
            # Otherwise no authentication, so hide the login link
            $("#login").css("display", "none")


    prevFragment = {}
    window.onHashChange = (event, isInit) ->
        c.log "onHashChange"
        hasChanged = (key) ->
            prevFragment[key] isnt search()[key]
        showAbout = ->
            $("#about_content").dialog(beforeClose: ->
                search "display", null
                false
            ).css("opacity", 0)
            .parent().find(".ui-dialog-title").localeKey("about")
            $("#about_content").fadeTo 400, 1
            $("#about_content").find("a").blur() # Prevents the focus of the first link in the "dialog"
        if hasChanged("lang")
            newLang = search().lang || settings.defaultLanguage
            $("body").scope().lang = newLang
            # loc_dfd = util.initLocalize()
            # loc_dfd.done ->
            util.localize()

            $("#languages").radioList "select", newLang

        display = search().display
        # if display is "about"
            # if $("#about_content").is(":empty")
            #     $("#about_content").load "markup/about.html", ->
            #         util.localize this
                    # showAbout()

            # else
                # showAbout()
        # if display is "login"
        #     $("#login_popup").dialog(
        #         height: 220
        #         width: 177
        #         modal: true
        #         resizable: false
        #         create: ->
        #             $(".err_msg", this).hide()

        #         open: ->
        #             $(".ui-widget-overlay").hide().fadeIn()

        #         beforeClose: ->
        #             $(".ui-widget-overlay").remove()
        #             $("<div />",
        #                 class: "ui-widget-overlay"
        #             ).css(
        #                 height: $("body").outerHeight()
        #                 width: $("body").outerWidth()
        #                 zIndex: 1001
        #             ).appendTo("body").fadeOut ->
        #                 $(this).remove()

        #             search "display", null
        #             false
        #     ).show().unbind("submit").submit ->
        #         self = this
        #         authenticationProxy.makeRequest($("#usrname", this).val(), $("#pass", this).val()).done((data) ->
        #             util.setLogin()
        #             search "display", null
        #         ).fail ->
        #             c.log "login fail"
        #             $("#pass", self).val ""
        #             $(".err_msg", self).show()

        #         false

        #     $("#ui-dialog-title-login_popup").attr "rel", "localize[log_in]"
        # else
        #     $(".ui-dialog").fadeTo 400, 0, ->
        #         $(".ui-dialog-content", this).dialog "destroy"

        # if not isInit and hasChanged("display")
        #     $("#plot_popup.ui-dialog-content").dialog("destroy").css
        #         opacity: 0
        #         display: "block"
        #         height: 0


        if isInit
            util.localize()

        prevFragment = _.extend {}, search()


    $(window).scroll ->
        $("#sidebar").sidebar "updatePlacement"


    #setup about link
    $("#about").click ->
        unless search().display?
            search display: "about"
        else
            search "about", null

    if settings.authenticationType != "shibboleth"
        $("#login").click ->
            unless search().display?
                search display: "login"
            else
                search "login", null

    else if search().shib_logged_in?
        # Shibboleth deals with username and password on the IdP-server side. Therefore I ripped out the login window
        # Note that this code is called *after* successful login via Shibboleth. -- matthies 28.11.13

        # We don't have a username/password, so I just call it with dummy values:
        authenticationProxy.makeRequest("dummyuser", "dummypass").done((data) ->
            if $("body").hasClass("not_logged_in")
                # for some reason the first login after browser start is caught further up (see my comment there)
                # and with the user from the previous browser session(!)
                # So if setLogin has been called already, we toggle and call it again. -- matthies 28.11.13
                util.setLogin()
            else
                $("body").toggleClass("logged_in not_logged_in")
                util.setLogin()

            search "shib_logged_in", null
        ).fail ->
            c.log "login fail"

    $("#languages").radioList(
        change: ->
            c.log "lang change", $(this).radioList("getSelected").data("mode")
            search lang: $(this).radioList("getSelected").data("mode")
        # TODO: this does nothing?
        selected: settings.defaultLanguage


    )
    $("#sidebar").sidebar() #.sidebar "hide"
    # $("#simple_text")[0].focus()
    $(document).click ->
        $("#simple_text.ui-autocomplete-input").autocomplete "close"

    setTimeout(() -> 
        view.initSearchOptions()
        onHashChange null, true
    , 0)
    # Hide the "Loading..." message (Jyrki Niemi 2015-04-23)
    $("#loading-msg").animate
        opacity: 0
    , ->
        $(this).hide()
    $("#main").animate
        opacity: 1
    , ->
        $(this).css "opacity", ""

    util.initCorpusSettingsLinkAttrs()
    util.initCorpusSettingsSyntheticAttrs()
    util.initCorpusSettingsAttrDisplayOrder()
    # initTimeGraph()
), ->
    c.log "failed to load some resource at startup.", arguments
    $("body").css(
        opacity: 1
        padding: 20
    ).html('<object class="korp_fail" type="image/svg+xml" data="img/korp_fail.svg">')
    .append "<p>The server failed to respond, please try again later.</p>"




window.getAllCorporaInFolders = (lastLevel, folderOrCorpus) ->
    outCorpora = []

    # Go down the alley to the last subfolder
    while "." in folderOrCorpus
        posOfPeriod = _.indexOf folderOrCorpus, "."
        leftPart = folderOrCorpus.substr(0, posOfPeriod)
        rightPart = folderOrCorpus.substr(posOfPeriod + 1)
        if lastLevel[leftPart]
            lastLevel = lastLevel[leftPart]
            folderOrCorpus = rightPart
        else
            break
    if lastLevel[folderOrCorpus]

        # Folder
        # Continue to go through any subfolders
        $.each lastLevel[folderOrCorpus], (key, val) ->
            outCorpora = outCorpora.concat getAllCorporaInFolders(lastLevel[folderOrCorpus], key) if key not in ["title", "contents", "description", "info"]


        # And add the corpora in this folder level
        outCorpora = outCorpora.concat lastLevel[folderOrCorpus]["contents"]
    else

        # Corpus
        outCorpora.push folderOrCorpus
    outCorpora




window.initTimeGraph = (def) ->
    timestruct = null
    all_timestruct = null
    restdata = null
    restyear = null
    # time_comb = timeProxy.makeRequest(true)
    onTimeGraphChange = () ->

    getValByDate = (date, struct) ->
        output = null
        $.each struct, (i, item) ->
            if date is item[0]
                output = item[1]
                false

        return output

    window.timeDeferred = timeProxy.makeRequest()
        .fail (error) ->
            $("#time_graph").html("<i>Could not draw graph due to a backend error.</i>")
        .done ([dataByCorpus, all_timestruct, rest]) ->
            c.log "write time"
            # $.each data, (corpus, struct) ->
            for corpus, struct of dataByCorpus
                if corpus isnt "time"
                    cor = settings.corpora[corpus.toLowerCase()]
                    timeProxy.expandTimeStruct struct
                    cor.non_time = struct[""]
                    struct = _.omit struct, ""
                    cor.time = struct
                    if _.keys(struct).length > 1
                        cor.common_attributes ?= {}
                        cor.common_attributes.date_interval = true

                        
                    #     cor.struct_attributes.date_interval =
                    #         label: "date_interval"
                    #         displayType: "date_interval"
                    #         opts: settings.liteOptions

            # $("#corpusbox").trigger "corpuschooserchange", [settings.corpusListing.getSelectedCorpora()]
            # onTimeGraphChange()
            safeApply $("body").scope(), (scope) ->
                scope.$broadcast("corpuschooserchange", corpusChooserInstance.corpusChooser("selectedItems"));
                def.resolve()
            

            onTimeGraphChange = (evt, data) ->
                # the 46 here is the presumed value of
                # the height of the graph
                one_px = max / 46
                # c.log "one_px", one_px

                normalize = (array) ->
                    _.map array, (item) ->
                        out = [].concat(item)
                        out[1] = one_px if out[1] < one_px and out[1] > 0
                        out

                output = _(settings.corpusListing.selected)
                    .pluck("time")
                    .filter(Boolean)
                    .map(_.pairs)
                    .flatten(true)
                    .reduce((memo, [a, b]) -> 
                        if typeof memo[a] is "undefined"
                            memo[a] = b
                        else
                            memo[a] += b
                        memo
                    , {})

                max = _.reduce(all_timestruct, (accu, item) ->
                    return item[1] if item[1] > accu
                    return accu
                , 0)



                timestruct = timeProxy.compilePlotArray(output)
                # c.log "output", output
                # c.log "timestruct", timestruct
                endyear = all_timestruct.slice(-1)[0][0]
                yeardiff = endyear - all_timestruct[0][0]
                restyear = endyear + (yeardiff / 25)
                restdata = _(settings.corpusListing.selected)
                    .filter((item) ->
                        item.time
                    ).reduce((accu, corp) ->
                        accu + parseInt(corp.non_time or "0")
                    , 0)
                plots = [
                    data: normalize([].concat(all_timestruct, [[restyear, rest]]))
                    bars:
                        fillColor: "lightgrey"
                ,
                    data: normalize(timestruct)
                    bars:
                        fillColor: "navy"
                ]
                if restdata
                    plots.push
                        data: normalize([[restyear, restdata]])
                        bars:
                            fillColor: "indianred"

                plot = $.plot($("#time_graph"), plots,
                    bars:
                        show: true
                        fill: 1
                        align: "center"

                    grid:
                        hoverable: true
                        borderColor: "white"

                    yaxis:
                        show: false

                    xaxis:
                        show: true

                    hoverable: true
                    colors: ["lightgrey", "navy"]
                )
                $.each $("#time_graph .tickLabel"), ->
                    $(this).hide() if parseInt($(this).text()) > new Date().getFullYear()



        $("#time_graph,#rest_time_graph").bind "plothover", _.throttle((event, pos, item) ->
            if item
                # c.log "hover", pos, item, item.datapoint
                date = item.datapoint[0]
                header = $("<h4>")
                if date is restyear
                    header.text util.getLocaleString("corpselector_rest_time")
                    val = restdata
                    total = rest
                else
                    header.text util.getLocaleString("corpselector_time") + " " + item.datapoint[0]
                    val = getValByDate(date, timestruct)
                    total = getValByDate(date, all_timestruct)
                c.log "output", timestruct[item.datapoint[0].toString()]
                pTmpl = _.template("<p><span rel='localize[<%= loc %>]'></span>: <%= num %> <span rel='localize[corpselector_tokens]' </p>")
                firstrow = pTmpl(
                    loc: "corpselector_time_chosen"
                    num: util.prettyNumbers(val or 0)
                )
                secondrow = pTmpl(
                    loc: "corpselector_of_total"
                    num: util.prettyNumbers(total)
                )
                time = item.datapoint[0]
                $(".corpusInfoSpace").css top: $(this).parent().offset().top
                $(".corpusInfoSpace").find("p").empty()
                .append(header, "<span> </span>", firstrow, secondrow)
                .localize().end()
                .fadeIn "fast"
            else
                $(".corpusInfoSpace").fadeOut "fast"
        , 100)

    opendfd = $.Deferred()
    $("#corpusbox").one "corpuschooseropen", ->
        opendfd.resolve()

    $.when(timeDeferred, opendfd).then ->
        $("#corpusbox").bind "corpuschooserchange", onTimeGraphChange
        onTimeGraphChange()

