/* eslint-disable
    constructor-super,
    no-constant-condition,
    no-eval,
    no-return-assign,
    no-throw-literal,
    no-undef,
    no-unused-expressions,
    no-unused-vars,
    no-use-before-define,
    no-useless-constructor,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS104: Avoid inline assignments
 * DS202: Simplify dynamic range loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
"use strict"
window.model = {}

model.getAuthorizationHeader = function() {
    if ((typeof authenticationProxy !== "undefined") && !$.isEmptyObject(authenticationProxy.loginObj)) {
        return { "Authorization" : `Basic ${authenticationProxy.loginObj.auth}` }
    } else {
        return {}
    }
}


class BaseProxy {
    constructor() {
        this.prev = ""
        this.progress = 0
        this.total
        this.total_results = 0
        this.pendingRequests = []
    }

    expandCQP(cqp) {
        try {
            return CQP.expandOperators(cqp)
        } catch (e) {
            c.warn("CQP expansion failed", cqp, e)
            return cqp
        }
    }

    makeRequest() {
        this.abort()
        this.prev = ""
        this.progress = 0
        this.total_results = 0
        return this.total = null
    }

    abort() {
        if (this.pendingRequests.length) { return _.invokeMap(this.pendingRequests, "abort") }
    }

    hasPending() {
        return _.some(_.map(this.pendingRequests, req => (req.readyState !== 4) && (req.readyState !== 0)))
    }

    parseJSON(data) {
        try {
            let json = data
            if (json[0] !== "{") { json = `{${json}` }
            if (json.match(/,\s*$/)) {
                json = json.replace(/,\s*$/, "") + "}"
            }
            const out = JSON.parse(json)
            return out
        } catch (e) {
            return JSON.parse(data)
        }
    }

    addAuthorizationHeader(req) {
        const pairs = _.toPairs(model.getAuthorizationHeader())
        if (pairs.length) {
            return req.setRequestHeader(...Array.from(pairs[0] || []))
        }
    }

    calcProgress(e) {
        const newText = e.target.responseText.slice(this.prev.length)
        let struct = {}
        try {
            struct = this.parseJSON(newText)
        } catch (error) {}
        $.each(struct, (key, val) => {
            if ((key !== "progress_corpora") && (key.split("_")[0] === "progress")) {
                const currentCorpus = val.corpus || val
                const sum = _(currentCorpus.split("|")).map(corpus => Number(settings.corpora[corpus.toLowerCase()].info.Size)).reduce((a, b) => a + b
                , 0)
                this.progress += sum
                return this.total_results += parseInt(val.hits)
            }
        })

        const stats = (this.progress / this.total) * 100
        if ((this.total == null) && (struct.progress_corpora != null ? struct.progress_corpora.length : undefined)) {
            const tmp = $.map(struct["progress_corpora"], function(corpus) {
                if (!corpus.length) { return }

                return _(corpus.split("|")).map(corpus => parseInt(settings.corpora[corpus.toLowerCase()].info.Size)).reduce((a, b) => a + b
                , 0)
            })
            this.total = _.reduce(tmp, (val1, val2) => val1 + val2
            , 0)
        }
        this.prev = e.target.responseText
        return {
            struct,
            stats,
            total_results: this.total_results
        }
    }
}


model.KWICProxy = class KWICProxy extends BaseProxy {
    constructor() {
        super()
        this.prevRequest = null
        this.queryData = null
        this.prevAjaxParams = null
        this.foundKwic = false
    }

    makeRequest(options, page, progressCallback, kwicCallback) {
        c.log("kwicproxy.makeRequest", options, page, kwicResults.getPageInterval(Number(page)))
        const self = this
        this.foundKwic = false
        super.makeRequest()
        kwicCallback = kwicCallback || $.proxy(kwicResults.renderResult, kwicResults)
        self.progress = 0
        var progressObj = { progress(data, e) {
                progressObj = self.calcProgress(e)
                if (progressObj == null) { return }

                progressCallback(progressObj)
                if (progressObj["struct"].kwic) {
                    c.log("found kwic!")
                    this.foundKwic = true
                    return kwicCallback(progressObj["struct"])
                }
            }
    }

        if (!options.ajaxParams.within) {
            _.extend(options.ajaxParams, settings.corpusListing.getWithinParameters())
        }

        const data = {
            command: "query",
            default_context: settings.defaultOverviewContext,
            show: [],
            show_struct: []
        }

        $.extend(data, kwicResults.getPageInterval(page), options.ajaxParams)
        for (let corpus of Array.from(settings.corpusListing.selected)) {
            var key, val
            for (key in corpus.within) {
                val = corpus.within[key]
                data.show.push(_.last(key.split(" ")))
            }
            for (key in corpus.attributes) {
                val = corpus.attributes[key]
                data.show.push(key)
            }

            if (corpus.structAttributes != null) {
                $.each(corpus.structAttributes, function(key, val) {
                    if ($.inArray(key, data.show_struct) === -1) { return data.show_struct.push(key) }
                })
            }
        }

        if (data.cqp) {
            data.cqp = this.expandCQP(data.cqp)
        }
        this.prevCQP = data.cqp
        data.show = (_.uniq(["sentence"].concat(data.show))).join(",")
        c.log("data.show", data.show)
        data.show_struct = (_.uniq(data.show_struct)).join(",")

        if (locationSearch()["in_order"] === false) {
            data.in_order = false
        }

        this.prevRequest = data
        this.prevParams = data
        const def = $.ajax({
            method: "POST",
            url: settings.korpBackendURL + "/" + data.command,
            data,
            beforeSend(req, settings) {
                self.prevRequest = settings
                self.addAuthorizationHeader(req)
                return self.prevUrl = this.url + "?" + _.toPairs(data).map( pair => pair.join("=")).join("&")
            },

            success(data, status, jqxhr) {
                self.queryData = data.query_data
                if ((data.incremental === false) || !this.foundKwic) { return kwicCallback(data) }
            },

            progress: progressObj.progress
        })
        this.pendingRequests.push(def)
        return def
    }
}


model.LemgramProxy = class LemgramProxy extends BaseProxy {
    constructor() {
        super()
    }

    makeRequest(word, type, callback) {
        super.makeRequest()
        const self = this
        const params = {
            command: "relations",
            word,
            corpus: settings.corpusListing.stringifySelected(),
            incremental: true,
            type,
            max : 1000
        }
        this.prevParams = params
        const def =  $.ajax({
            url: settings.korpBackendURL + "/" + params.command,
            data: params,

            success(data) {
                c.log("relations success", data)
                return self.prevRequest = params
            },

            progress(data, e) {
                const progressObj = self.calcProgress(e)
                if (progressObj == null) { return }
                return callback(progressObj)
            },

            beforeSend(req, settings) {
                self.prevRequest = settings
                self.addAuthorizationHeader(req)
                return self.prevUrl = this.url
            }
        })
        this.pendingRequests.push(def)
        return def
    }
}


model.StatsProxy = class StatsProxy extends BaseProxy {
    constructor() {
        super()
        this.prevRequest = null
        this.prevParams = null
    }

    makeParameters(reduceVals, cqp, ignoreCase) {
        const structAttrs = settings.corpusListing.getStructAttrs(settings.corpusListing.getReduceLang())
        const groupBy = []
        const groupByStruct = []
        for (let reduceVal of Array.from(reduceVals)) {
            if (structAttrs[reduceVal]) {
                groupByStruct.push(reduceVal)
            } else {
                groupBy.push(reduceVal)
            }
        }
        const parameters = {
            command: "count",
            group_by: groupBy.join(','),
            group_by_struct: groupByStruct.join(','),
            cqp: this.expandCQP(cqp),
            corpus: settings.corpusListing.stringifySelected(true),
            incremental: true
        }
        _.extend(parameters, settings.corpusListing.getWithinParameters())
        if (ignoreCase) {
            _.extend(parameters, { ignore_case: "word" })
        }
        return parameters
    }

    makeRequest(cqp, callback) {
        const self = this
        super.makeRequest()
        const reduceval = locationSearch().stats_reduce || "word"
        const reduceVals = reduceval.split(",")

        const ignoreCase = (locationSearch().stats_reduce_insensitive != null)

        const reduceValLabels = _.map(reduceVals, function(reduceVal) {
            if (reduceVal === "word") { return "word" }
            const maybeReduceAttr = settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())[reduceVal]
            if (maybeReduceAttr) {
                return maybeReduceAttr.label
            } else {
                return settings.corpusListing.getStructAttrs(settings.corpusListing.getReduceLang())[reduceVal].label
            }
        })

        const data = this.makeParameters(reduceVals, cqp, ignoreCase)

        const wordAttrs = settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())
        const structAttrs = settings.corpusListing.getStructAttrs(settings.corpusListing.getReduceLang())
        data.split = _.filter(reduceVals, reduceVal => ((wordAttrs[reduceVal] != null ? wordAttrs[reduceVal].type : undefined) === "set") || ((structAttrs[reduceVal] != null ? structAttrs[reduceVal].type : undefined) === "set")).join(',')

        const rankedReduceVals = _.filter(reduceVals, reduceVal => __guard__(settings.corpusListing.getCurrentAttributes(settings.corpusListing.getReduceLang())[reduceVal], x => x.ranked))
        data.top = _.map(rankedReduceVals, reduceVal => reduceVal + ":1").join(',')

        this.prevNonExpandedCQP = cqp
        this.prevParams = data
        const def = $.Deferred()
        this.pendingRequests.push($.ajax({
            url: settings.korpBackendURL + "/" + data.command,
            data,
            beforeSend(req, settings) {
                self.prevRequest = settings
                self.addAuthorizationHeader(req)
                return self.prevUrl = this.url
            },

            error(jqXHR, textStatus, errorThrown) {
                c.log(`gettings stats error, status: ${textStatus}`)
                return def.reject(textStatus, errorThrown)
            },

            progress(data, e) {
                const progressObj = self.calcProgress(e)
                if (progressObj == null) { return }
                return (typeof callback === 'function' ? callback(progressObj) : undefined)
            },

            success: data => {
                if (data.ERROR != null) {
                    c.log("gettings stats failed with error", data.ERROR)
                    def.reject(data)
                    return
                }
                return statisticsService.processData(def, data, reduceVals, reduceValLabels, ignoreCase)
            }
        })
        )

        return def.promise()
    }
}

model.NameProxy = class NameProxy extends BaseProxy {
    constructor() {
        super()
    }

    makeRequest(cqp, callback) {
        const self = this
        super.makeRequest()

        const posTags = Array.from(settings.mapPosTag).map((posTag) =>
            `pos='${posTag}'`)

        const parameters = {
            group_by: "word",
            cqp: this.expandCQP(cqp),
            cqp2: `[${posTags.join(" | ")}]`,
            corpus: settings.corpusListing.stringifySelected(true),
            incremental: true
        }
        _.extend(parameters, settings.corpusListing.getWithinParameters())

        const def = $.Deferred()
        this.pendingRequests.push($.ajax({
            url: settings.korpBackendURL + "/count",
            data: parameters,

            beforeSend(req, settings) {
                return self.addAuthorizationHeader(req)
            },

            error(jqXHR, textStatus, errorThrown) {
                return def.reject(textStatus, errorThrown)
            },

            progress(data, e) {
                const progressObj = self.calcProgress(e)
                if (progressObj == null) { return }
                return (typeof callback === 'function' ? callback(progressObj) : undefined)
            },

            success: data => {
                if (data.ERROR != null) {
                    c.log("gettings stats failed with error", data.ERROR)
                    def.reject(data)
                    return
                }
                return def.resolve(data)
            }
        })
        )

        return def.promise()
    }
}


model.AuthenticationProxy = class AuthenticationProxy {
    constructor() {
        this.loginObj = {}
    }

    makeRequest(usr, pass, saveLogin) {
        let auth
        const self = this
        if (window.btoa) {
            auth = window.btoa(usr + ":" + pass)
        } else {
            throw "window.btoa is undefined"
        }
        const dfd = $.Deferred()
        $.ajax({
            url: settings.korpBackendURL + "/authenticate",
            type: "GET",
            beforeSend(req) {
                return req.setRequestHeader("Authorization", `Basic ${auth}`)
            }
        }).done(function(data, status, xhr) {
            if (!data.corpora) {
                dfd.reject()
                return
            }
            self.loginObj = {
                name: usr,
                credentials: data.corpora,
                auth
            }
            if (saveLogin) {
                $.jStorage.set("creds", self.loginObj)
            }
            return dfd.resolve(data)
        }).fail(function(xhr, status, error) {
            c.log("auth fail", arguments)
            return dfd.reject()
        })

        return dfd
    }

    hasCred(corpusId) {
        let needle
        if (!this.loginObj.credentials) { return false }
        return (needle = corpusId.toUpperCase(), Array.from(this.loginObj.credentials).includes(needle))
    }
}

model.TimeProxy = class TimeProxy extends BaseProxy {
    constructor() {
        {
          // Hack: trick Babel/TypeScript into allowing this before super.
          if (false) { super() }
          let thisFn = (() => { return this }).toString()
          let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1]
          eval(`${thisName} = this;`)
        }
    }


    makeRequest() {
        const dfd = $.Deferred()


        const xhr = $.ajax({
            url: settings.korpBackendURL + "/timespan",
            type: "GET",
            data: {
                granularity: "y",
                corpus: settings.corpusListing.stringifyAll()
            }
        })

        xhr.done((data, status, xhr) => {
            c.log("timespan done", data)
            if (data.ERROR) {
                c.error("timespan error", data.ERROR)
                dfd.reject(data.ERROR )
                return
            }

            const rest = data.combined[""]
            delete data.combined[""]

            this.expandTimeStruct(data.combined)
            const combined = this.compilePlotArray(data.combined)

            if ((_.keys(data).length < 2) || data.ERROR) {
                dfd.reject()
                return
            }

            return dfd.resolve([data.corpora, combined, rest])
    })

        xhr.fail(function() {
            c.log("timeProxy.makeRequest failed", arguments)
            return dfd.reject()
        })

        return dfd
    }

    compilePlotArray(dataStruct) {
        let output = []
        $.each(dataStruct, function(key, val) {
            if (!key || !val) { return }
            return output.push([parseInt(key), val])
    })

        output = output.sort((a, b) => a[0] - b[0])
        return output
    }

    expandTimeStruct(struct) {
        const years = _.map(_.toPairs(_.omit(struct, "")), item => Number(item[0]))
        if (!years.length) { return }
        const minYear = _.min(years)
        const maxYear = _.max(years)

        if (_.isNaN(maxYear) || _.isNaN(minYear)) {
            c.log("expandTimestruct broken, years:", years)
            return
        }

        return (() => {
            const result = []
            for (let y = minYear, end = maxYear, asc = minYear <= end; asc ? y <= end : y >= end; asc ? y++ : y--) {
                const thisVal = struct[y]
                if (typeof thisVal === "undefined") {
                    result.push(struct[y] = prevVal)
                } else {
                    var prevVal
                    result.push(prevVal = thisVal)
                }
            }
            return result
        })()
    }
}



model.GraphProxy = class GraphProxy extends BaseProxy {
    constructor() {
        super()
        this.prevParams = null
    }

    expandSubCqps(subArray) {
        const padding = _.map(__range__(0, subArray.length.toString().length, false), () => "0")
        const array = (() => {
            const result = []
            for (let i = 0; i < subArray.length; i++) {
                const cqp = subArray[i]
                const p = padding.slice(i.toString().length).join("")
                result.push([`subcqp${p}${i}`, cqp])
            }
            return result
        })()
        return _.fromPairs(array)
    }

    makeRequest(cqp, subcqps, corpora, from, to) {
        super.makeRequest()
        const self = this
        const params = {
            command : "count_time",
            cqp : this.expandCQP(cqp),
            corpus : corpora,
            granularity : this.granularity,
            incremental: true
        }

        if (from) {
            params.from = from
        }
        if (to) {
            params.to = to
        }

        // TODO: fix this for struct attrs
        _.extend(params, this.expandSubCqps(subcqps))
        this.prevParams = params
        const def = $.Deferred()

        $.ajax({
            url: settings.korpBackendURL + "/" + params.command,
            dataType : "json",
            data : params,

            beforeSend: (req, settings) => {
                this.prevRequest = settings
                this.addAuthorizationHeader(req)
                return self.prevUrl = this.url
            },

            progress: (data, e) => {
                const progressObj = this.calcProgress(e)
                if (progressObj == null) { return }
                return def.notify(progressObj)
            },

            error(jqXHR, textStatus, errorThrown) {
                return def.reject(textStatus)
            },
            success(data) {
                return def.resolve(data)
            }
        })

        return def.promise()
    }
}

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
function __range__(left, right, inclusive) {
  let range = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}
