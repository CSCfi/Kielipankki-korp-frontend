(function() {
  var BaseProxy,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.model = {};

  BaseProxy = (function() {

    function BaseProxy() {
      this.prev = "";
      this.progress = 0;
      this.total;
      this.total_results = 0;
    }

    BaseProxy.prototype.makeRequest = function() {
      this.prev = "";
      this.progress = 0;
      this.total_results = 0;
      return this.total = null;
    };

    BaseProxy.prototype.parseJSON = function(data) {
      var json;
      try {
        json = data;
        if (json.slice(-1) === ",") {
          json = "{" + json.slice(0, -1) + "}";
        }
        return JSON.parse(json);
      } catch (e) {
        return JSON.parse(data);
      }
    };

    BaseProxy.prototype.addAuthorizationHeader = function(req) {
      if (typeof authenticationProxy !== "undefined" && !$.isEmptyObject(authenticationProxy.loginObj)) {
        c.log("adding creds", authenticationProxy.loginObj.auth);
        return req.setRequestHeader("Authorization", "Basic " + authenticationProxy.loginObj.auth);
      }
    };

    BaseProxy.prototype.calcProgress = function(e) {
      var newText, self, stats, struct;
      self = this;
      newText = e.target.responseText.slice(this.prev.length);
      struct = {};
      try {
        struct = this.parseJSON(newText);
      } catch (_error) {}
      $.each(struct, function(key, val) {
        var currentCorpus, sum;
        if (key !== "progress_corpora" && key.split("_")[0] === "progress") {
          currentCorpus = val.corpus || val;
          sum = _.chain(currentCorpus.split("|")).map(function(corpus) {
            return parseInt(settings.corpora[corpus.toLowerCase()].info.Size);
          }).reduce(function(a, b) {
            return a + b;
          }, 0).value();
          self.progress += sum;
          return self.total_results += parseInt(val.hits);
        }
      });
      stats = (self.progress / self.total) * 100;
      if (!(this.total != null) && "progress_corpora" in struct) {
        this.total = $.reduce($.map(struct["progress_corpora"], function(corpus) {
          return _.chain(corpus.split("|")).map(function(corpus) {
            return parseInt(settings.corpora[corpus.toLowerCase()].info.Size);
          }).reduce(function(a, b) {
            return a + b;
          }, 0).value();
        }), function(val1, val2) {
          return val1 + val2;
        });
      }
      self.prev = e.target.responseText;
      return {
        struct: struct,
        stats: stats,
        total_results: this.total_results
      };
    };

    return BaseProxy;

  })();

  model.SearchProxy = (function(_super) {

    __extends(SearchProxy, _super);

    function SearchProxy() {}

    SearchProxy.prototype.relatedWordSearch = function(lemgram) {
      return $.ajax({
        url: "http://spraakbanken.gu.se/ws/saldo-ws/grel/json/" + lemgram,
        success: function(data) {
          var hasAnyFreq, lemgrams;
          c.log("related words success");
          lemgrams = [];
          $.each(data, function(i, item) {
            return lemgrams = lemgrams.concat(item.rel);
          });
          hasAnyFreq = false;
          return lemgramProxy.lemgramCount(lemgrams).done(function(freqs) {
            $.each(data, function(i, item) {
              return item.rel = $.grep(item.rel, function(lemgram) {
                if (freqs[lemgram]) {
                  hasAnyFreq = true;
                }
                return !!freqs[lemgram];
              });
            });
            if (hasAnyFreq) {
              return simpleSearch.renderSimilarHeader(lemgram, data);
            } else {
              return simpleSearch.removeSimilarHeader();
            }
          });
        }
      });
    };

    return SearchProxy;

  })(BaseProxy);

  model.KWICProxy = (function(_super) {

    __extends(KWICProxy, _super);

    function KWICProxy() {
      KWICProxy.__super__.constructor.call(this);
      this.prevRequest = null;
      this.queryData = null;
      this.command = "query";
      this.prevAjaxParams = null;
      this.pendingRequests = [];
      this.foundKwic = false;
    }

    KWICProxy.prototype.abort = function() {
      if (this.pendingRequests.length) {
        _.invoke(this.pendingRequests, "abort");
      }
      return this.pendingRequests = [];
    };

    KWICProxy.prototype.popXhr = function(xhr) {
      var i;
      i = $.inArray(this.pendingRequests, xhr);
      if (i !== -1) {
        return this.pendingRequests.pop(i);
      }
    };

    KWICProxy.prototype.makeRequest = function(options, page, callback, successCallback, kwicCallback) {
      var corpus, data, o, self;
      self = this;
      this.foundKwic = false;
      KWICProxy.__super__.makeRequest.call(this);
      successCallback = successCallback || $.proxy(kwicResults.renderCompleteResult, kwicResults);
      kwicCallback = kwicCallback || $.proxy(kwicResults.renderResult, kwicResults);
      self.progress = 0;
      corpus = settings.corpusListing.stringifySelected();
      if (currentMode === "parallel") {
        corpus = extendedSearch.getCorporaQuery();
      }
      o = $.extend({
        cqp: $("#cqp_string").val(),
        queryData: null,
        ajaxParams: this.prevAjaxParams,
        success: function(data, status, xhr) {
          self.popXhr(xhr);
          return successCallback(data);
        },
        error: function(data, status, xhr) {
          c.log("kwic error", data);
          self.popXhr(xhr);
          return kwicResults.hidePreloader();
        },
        progress: function(data, e) {
          var progressObj;
          progressObj = self.calcProgress(e);
          if (progressObj == null) {
            return;
          }
          callback(progressObj);
          if (progressObj["struct"].kwic) {
            c.log("found kwic!");
            this.foundKwic = true;
            return kwicCallback(progressObj["struct"]);
          }
        },
        incremental: $.support.ajaxProgress
      }, kwicResults.getPageInterval(page), options);
      this.prevAjaxParams = o.ajaxParams;
      c.log("kwicProxy.makeRequest", o.cqp);
      data = {
        command: this.command,
        corpus: corpus,
        cqp: o.cqp,
        start: o.start || 0,
        end: o.end,
        defaultcontext: $.keys(settings.defaultContext)[0],
        defaultwithin: "sentence",
        show: ["sentence"],
        show_struct: [],
        sort: o.sort,
        incremental: o.incremental
      };
      if ($.sm.In("extended") && $(".within_select").val() === "paragraph") {
        data.within = settings.corpusListing.getWithinQueryString();
      }
      if (o.context != null) {
        data.context = o.context;
      }
      if (o.within != null) {
        data.within = o.within;
      }
      if (o.random_seed != null) {
        data.random_seed = o.random_seed;
      }
      $.extend(data, o.ajaxParams);
      if (o.queryData != null) {
        data.querydata = o.queryData;
      }
      $.each(settings.corpusListing.selected, function(_, corpus) {
        $.each(corpus.attributes, function(key, val) {
          if ($.inArray(key, data.show) === -1) {
            return data.show.push(key);
          }
        });
        if (corpus.struct_attributes != null) {
          return $.each(corpus.struct_attributes, function(key, val) {
            if ($.inArray(key, data.show_struct) === -1) {
              return data.show_struct.push(key);
            }
          });
        }
      });
      kwicResults.prevCQP = o.cqp;
      data.show = data.show.join();
      data.show_struct = data.show_struct.join();
      this.prevRequest = data;
      return this.pendingRequests.push($.ajax({
        url: settings.cgi_script,
        data: data,
        beforeSend: function(req, settings) {
          self.prevRequest = settings;
          return self.addAuthorizationHeader(req);
        },
        success: function(data, status, jqxhr) {
          self.queryData = data.querydata;
          if (o.incremental === false || !this.foundKwic) {
            kwicCallback(data);
          }
          return o.success(data, o.cqp);
        },
        error: o.error,
        progress: o.progress
      }));
    };

    return KWICProxy;

  })(BaseProxy);

  model.ExamplesProxy = (function(_super) {

    __extends(ExamplesProxy, _super);

    function ExamplesProxy() {
      ExamplesProxy.__super__.constructor.call(this);
      this.command = "relations_sentences";
    }

    return ExamplesProxy;

  })(model.KWICProxy);

  model.LemgramProxy = (function(_super) {

    __extends(LemgramProxy, _super);

    function LemgramProxy() {
      LemgramProxy.__super__.constructor.call(this);
      this.pendingRequest = {
        abort: $.noop
      };
    }

    LemgramProxy.prototype.buildAffixQuery = function(isValid, key, value) {
      if (!isValid) {
        return "";
      }
      return $.format("| (%s contains \"%s\")", [key, value]);
    };

    LemgramProxy.prototype.lemgramSearch = function(lemgram, searchPrefix, searchSuffix) {
      var cqp;
      cqp = $.format("[(lex contains \"%s\")%s%s]", [lemgram, this.buildAffixQuery(searchPrefix, "prefix", lemgram), this.buildAffixQuery(searchSuffix, "suffix", lemgram)]);
      return cqp;
    };

    LemgramProxy.prototype.makeRequest = function(word, type, callback) {
      var data, self;
      LemgramProxy.__super__.makeRequest.call(this);
      self = this;
      data = {
        command: "relations",
        word: word,
        corpus: settings.corpusListing.stringifySelected(),
        incremental: $.support.ajaxProgress,
        type: type
      };
      return $.ajax({
        url: settings.cgi_script,
        data: data,
        error: function(data) {
          c.log("relationsearch abort", arguments);
          return lemgramResults.hidePreloader();
        },
        success: function(data) {
          c.log("relations success", data);
          return lemgramResults.renderResult(data, word);
        },
        progress: function(data, e) {
          var progressObj;
          progressObj = self.calcProgress(e);
          if (progressObj == null) {
            return;
          }
          return callback(progressObj);
        },
        beforeSend: this.addAuthorizationHeader
      });
    };

    LemgramProxy.prototype.relationsWordSearch = function(word) {
      var data, self;
      self = this;
      data = {
        command: "relations",
        word: word,
        corpus: settings.corpusListing.stringifySelected(),
        incremental: $.support.ajaxProgress
      };
      return $.ajax({
        url: settings.cgi_script,
        data: data,
        beforeSend: function(jqXHR, settings) {
          c.log("before relations send", settings);
          return self.prevRequest = settings;
        },
        error: function(data) {
          c.log("relationsearch abort", arguments);
          return lemgramResults.hidePreloader();
        },
        success: function(data) {
          c.log("relations success", data);
          return lemgramResults.renderResult(data, word);
        }
      });
    };

    LemgramProxy.prototype.abort = function() {
      this.pendingRequest.abort();
      return this.pendingRequest = {
        abort: $.noop
      };
    };

    LemgramProxy.prototype.karpSearch = function(word, sw_forms) {
      var deferred, self;
      self = this;
      deferred = $.Deferred(function(dfd) {
        return self.pendingRequest = $.ajax({
          url: "http://spraakbanken.gu.se/ws/karp-sok",
          data: {
            wf: word,
            resource: settings.corpusListing.getMorphology(),
            format: "json",
            "sms-forms": false,
            "sw-forms": sw_forms
          },
          success: function(data, textStatus, xhr) {
            var div, output;
            if (data.count === 0) {
              dfd.reject();
              return;
            }
            c.log("karp success", data, sw_forms);
            div = ($.isPlainObject(data.div) ? [data.div] : data.div);
            output = $.map(div.slice(0, Number(data.count)), function(item) {
              item = util.convertLMFFeatsToObjects(item);
              return item.LexicalEntry.Lemma.FormRepresentation.feat_lemgram;
            });
            return dfd.resolve(output, textStatus, xhr);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            c.log("karp error", jqXHR, textStatus, errorThrown);
            return dfd.reject();
          }
        });
      }).promise();
      return deferred;
    };

    LemgramProxy.prototype.saldoSearch = function(word, sw_forms) {
      var dfd;
      dfd = $.Deferred();
      this.karpSearch(word, sw_forms).done(function(lemgramArray) {
        return $.ajax({
          url: "http://spraakbanken.gu.se/ws/karp-sok",
          data: {
            lemgram: lemgramArray.join("|"),
            resource: "saldo",
            format: "json"
          }
        }).done(function(data, textStatus, xhr) {
          var div, output;
          if (data.count === 0) {
            dfd.reject();
            c.log("saldo search 0 results");
            return;
          }
          div = ($.isPlainObject(data.div) ? [data.div] : data.div);
          output = $.map(div.slice(0, Number(data.count)), function(item) {
            var sense;
            sense = item.LexicalEntry.Sense;
            if (!$.isArray(sense)) {
              sense = [sense];
            }
            return _.map(sense, function(item) {
              return item.id;
            });
          });
          c.log("saldoSearch results", output);
          return dfd.resolve(output, textStatus, xhr);
        }).fail(function() {
          c.log("saldo search failed");
          return dfd.reject();
        });
      });
      return dfd;
    };

    LemgramProxy.prototype.lemgramCount = function(lemgrams, findPrefix, findSuffix) {
      var count, self;
      self = this;
      count = $.grep(["lemgram", (findPrefix ? "prefix" : ""), (findSuffix ? "suffix" : "")], Boolean);
      return $.ajax({
        url: settings.cgi_script,
        data: {
          command: "lemgram_count",
          lemgram: lemgrams,
          count: count.join(","),
          corpus: settings.corpusListing.stringifySelected()
        },
        beforeSend: function(req) {
          return self.addAuthorizationHeader(req);
        },
        method: "POST"
      });
    };

    return LemgramProxy;

  })(BaseProxy);

  model.StatsProxy = (function(_super) {

    __extends(StatsProxy, _super);

    function StatsProxy() {
      StatsProxy.__super__.constructor.call(this);
      this.prevRequest = null;
      this.currentPage = 0;
      this.page_incr = 25;
    }

    StatsProxy.prototype.makeRequest = function(cqp, callback) {
      var data, reduceval, self;
      c.log("statsproxy.makeRequest", callback);
      self = this;
      StatsProxy.__super__.makeRequest.call(this);
      statsResults.showPreloader();
      reduceval = $.bbq.getState("stats_reduce") || "word";
      if (reduceval === "word_insensitive") {
        reduceval = "word";
      }
      data = {
        command: "count",
        groupby: reduceval,
        cqp: cqp,
        corpus: settings.corpusListing.stringifySelected(),
        incremental: $.support.ajaxProgress,
        defaultwithin: "sentence"
      };
      if ($("#reduceSelect select").val() === "word_insensitive") {
        $.extend(data, {
          ignore_case: "word"
        });
      }
      if ($.sm.In("extended") && $(".within_select").val() === "paragraph") {
        data.within = settings.corpusListing.getWithinQueryString();
      }
      return $.ajax({
        url: settings.cgi_script,
        data: data,
        beforeSend: function(req, settings) {
          self.prevRequest = settings;
          return self.addAuthorizationHeader(req);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          c.log("gettings stats error, status: " + textStatus);
          return statsResults.hidePreloader();
        },
        progress: function(data, e) {
          var progressObj;
          progressObj = self.calcProgress(e);
          if (progressObj == null) {
            return;
          }
          return callback(progressObj);
        },
        success: function(data) {
          var columns, dataset, totalRow, wordArray;
          if (data.ERROR != null) {
            c.log("gettings stats failed with error", $.dump(data.ERROR));
            statsResults.resultError(data);
            return;
          }
          columns = [
            {
              id: "hit",
              name: "stats_hit",
              field: "hit_value",
              sortable: true,
              formatter: settings.reduce_stringify(reduceval)
            }, {
              id: "total",
              name: "stats_total",
              field: "total_value",
              sortable: true,
              formatter: self.valueFormatter
            }
          ];
          $.each($.keys(data.corpora).sort(), function(i, corpus) {
            return columns.push({
              id: corpus,
              name: settings.corpora[corpus.toLowerCase()].title,
              field: corpus + "_value",
              sortable: true,
              formatter: self.valueFormatter
            });
          });
          totalRow = {
            id: "row_total",
            hit_value: "&Sigma;",
            total_value: {
              absolute: data.total.sums.absolute,
              relative: data.total.sums.relative
            }
          };
          dataset = [totalRow];
          $.each(data.corpora, function(corpus, obj) {
            return totalRow[corpus + "_value"] = {
              absolute: obj.sums.absolute,
              relative: obj.sums.relative
            };
          });
          wordArray = $.keys(data.total.absolute);
          $.each(wordArray, function(i, word) {
            var row;
            row = {
              id: "row" + i,
              hit_value: word,
              total_value: {
                absolute: data.total.absolute[word],
                relative: data.total.relative[word]
              }
            };
            $.each(data.corpora, function(corpus, obj) {
              return row[corpus + "_value"] = {
                absolute: obj.absolute[word],
                relative: obj.relative[word]
              };
            });
            return dataset.push(row);
          });
          statsResults.savedData = data;
          statsResults.savedWordArray = wordArray;
          return statsResults.renderResult(columns, dataset);
        }
      });
    };

    StatsProxy.prototype.valueFormatter = function(row, cell, value, columnDef, dataContext) {
      if (!value.relative && !value.absolute) {
        return "";
      }
      return "<span>\n      <span class='relStat'>" + (util.formatDecimalString(value.relative.toFixed(1), true)) + "</span>\n      <span class='absStat'>(" + (prettyNumbers(String(value.absolute))) + ")</span>\n<span>";
    };

    return StatsProxy;

  })(BaseProxy);

  model.AuthenticationProxy = (function() {

    function AuthenticationProxy() {
      this.loginObj = {};
    }

    AuthenticationProxy.prototype.makeRequest = function(usr, pass) {
      var auth, dfd, self;
      self = this;
      if (window.btoa) {
        auth = window.btoa(usr + ":" + pass);
      } else {
        throw "window.btoa is undefined";
      }
      dfd = $.Deferred();
      $.ajax({
        url: settings.cgi_script,
        type: "GET",
        data: {
          command: "authenticate"
        },
        beforeSend: function(req) {
          return req.setRequestHeader("Authorization", "Basic " + auth);
        }
      }).done(function(data, status, xhr) {
        c.log("auth done", arguments);
        if (!data.corpora) {
          dfd.reject();
          return;
        }
        self.loginObj = {
          name: usr,
          credentials: data.corpora,
          auth: auth
        };
        $.jStorage.set("creds", self.loginObj);
        return dfd.resolve(data);
      }).fail(function(xhr, status, error) {
        c.log("auth fail", arguments);
        return dfd.reject();
      });
      return dfd;
    };

    return AuthenticationProxy;

  })();

  model.TimeProxy = (function(_super) {

    __extends(TimeProxy, _super);

    function TimeProxy() {
      this.data = [];
      this.req = {
        url: settings.cgi_script,
        type: "GET",
        data: {
          command: "timespan",
          granularity: "y",
          corpus: settings.corpusListing.stringifySelected()
        }
      };
    }

    TimeProxy.prototype.makeRequest = function(combined) {
      var dfd, self, xhr;
      self = this;
      dfd = $.Deferred();
      this.req.data.combined = combined;
      xhr = $.ajax(this.req);
      if (combined) {
        xhr.done(function(data, status, xhr) {
          var output, rest;
          if (_.keys(data).length < 2) {
            dfd.reject();
            return;
          }
          rest = data.combined[""];
          delete data.combined[""];
          self.expandTimeStruct(data.combined);
          output = self.compilePlotArray(data.combined);
          return dfd.resolve(output, rest);
        });
      } else {
        xhr.done(function(data, status, xhr) {
          if (_.keys(data).length < 2) {
            dfd.reject();
            return;
          }
          self.corpusdata = data;
          return dfd.resolve(data);
        });
      }
      xhr.fail(function() {
        c.log("timeProxy.makeRequest failed", arguments);
        return dfd.reject();
      });
      return dfd;
    };

    TimeProxy.prototype.compilePlotArray = function(dataStruct) {
      var output;
      output = [];
      $.each(dataStruct, function(key, val) {
        if (!key || !val) {
          return;
        }
        return output.push([parseInt(key), val]);
      });
      output = output.sort(function(a, b) {
        return a[0] - b[0];
      });
      return output;
    };

    TimeProxy.prototype.expandTimeStruct = function(struct) {
      var maxYear, minYear, output, prevVal, thisVal, y, years, _results;
      years = _.map(_.pairs(_.omit(struct, "")), function(item) {
        return Number(item[0]);
      });
      minYear = Math.min.apply(null, years);
      maxYear = Math.max.apply(null, years);
      output = {};
      prevVal = struct[minYear];
      y = minYear;
      _results = [];
      while (y < maxYear) {
        thisVal = struct[y];
        if (typeof thisVal !== "undefined") {
          struct[y] = thisVal;
          prevVal = thisVal;
        }
        _results.push(y++);
      }
      return _results;
    };

    return TimeProxy;

  })(BaseProxy);

}).call(this);
