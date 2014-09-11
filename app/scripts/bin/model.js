(function() {
  var BaseProxy,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.model = {};

  model.getAuthorizationHeader = function() {
    if (typeof authenticationProxy !== "undefined" && !$.isEmptyObject(authenticationProxy.loginObj)) {
      return {
        "Authorization": "Basic " + authenticationProxy.loginObj.auth
      };
    } else {
      return {};
    }
  };

  BaseProxy = (function() {
    function BaseProxy() {
      this.prev = "";
      this.progress = 0;
      this.total;
      this.total_results = 0;
      this.pendingRequests = [];
    }

    BaseProxy.prototype.makeRequest = function() {
      this.prev = "";
      this.progress = 0;
      this.total_results = 0;
      return this.total = null;
    };

    BaseProxy.prototype.abort = function() {
      if (this.pendingRequests.length) {
        _.invoke(this.pendingRequests, "abort");
      }
      return this.pendingRequests = [];
    };

    BaseProxy.prototype.parseJSON = function(data) {
      var e, json, out;
      try {
        json = data;
        if (json[0] !== "{") {
          json = "{" + json;
        }
        if (json.match(/,\s*$/)) {
          json = json.replace(/,\s*$/, "") + "}";
        }
        out = JSON.parse(json);
        return out;
      } catch (_error) {
        e = _error;
        return JSON.parse(data);
      }
    };

    BaseProxy.prototype.addAuthorizationHeader = function(req) {
      var pairs;
      pairs = _.pairs(model.getAuthorizationHeader());
      if (pairs.length) {
        return req.setRequestHeader.apply(req, pairs[0]);
      }
    };

    BaseProxy.prototype.calcProgress = function(e) {
      var newText, stats, struct, _ref;
      newText = e.target.responseText.slice(this.prev.length);
      struct = {};
      try {
        struct = this.parseJSON(newText);
      } catch (_error) {}
      $.each(struct, (function(_this) {
        return function(key, val) {
          var currentCorpus, sum;
          if (key !== "progress_corpora" && key.split("_")[0] === "progress") {
            currentCorpus = val.corpus || val;
            sum = _(currentCorpus.split("|")).map(function(corpus) {
              return Number(settings.corpora[corpus.toLowerCase()].info.Size);
            }).reduce(function(a, b) {
              return a + b;
            }, 0);
            _this.progress += sum;
            return _this.total_results += parseInt(val.hits);
          }
        };
      })(this));
      stats = (this.progress / this.total) * 100;
      if ((this.total == null) && ((_ref = struct.progress_corpora) != null ? _ref.length : void 0)) {
        this.total = $.reduce($.map(struct["progress_corpora"], function(corpus) {
          if (!corpus.length) {
            return;
          }
          return _(corpus.split("|")).map(function(corpus) {
            return parseInt(settings.corpora[corpus.toLowerCase()].info.Size);
          }).reduce(function(a, b) {
            return a + b;
          }, 0);
        }), function(val1, val2) {
          return val1 + val2;
        }, 0);
      }
      this.prev = e.target.responseText;
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
      this.prevAjaxParams = null;
      this.foundKwic = false;
    }

    KWICProxy.prototype.popXhr = function(xhr) {
      var i;
      i = $.inArray(this.pendingRequests, xhr);
      if (i !== -1) {
        return this.pendingRequests.pop(i);
      }
    };

    KWICProxy.prototype.makeRequest = function(options, page, callback, successCallback, kwicCallback) {
      var corpus, data, key, o, self, val, _i, _len, _ref, _ref1, _ref2;
      self = this;
      this.foundKwic = false;
      KWICProxy.__super__.makeRequest.call(this);
      successCallback = successCallback || $.proxy(kwicResults.renderCompleteResult, kwicResults);
      kwicCallback = kwicCallback || $.proxy(kwicResults.renderResult, kwicResults);
      self.progress = 0;
      o = $.extend({
        queryData: null,
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
        }
      }, options);
      data = {
        command: "query",
        corpus: settings.corpusListing.stringifySelected(),
        defaultcontext: _.keys(settings.defaultContext)[0],
        defaultwithin: _.keys(settings.defaultWithin)[0],
        show: [],
        show_struct: [],
        incremental: $.support.ajaxProgress,
        cache: true
      };
      $.extend(data, kwicResults.getPageInterval(page), o.ajaxParams);
      _ref = settings.corpusListing.selected;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        corpus = _ref[_i];
        _ref1 = corpus.within;
        for (key in _ref1) {
          val = _ref1[key];
          data.show.push(key);
        }
        _ref2 = corpus.attributes;
        for (key in _ref2) {
          val = _ref2[key];
          data.show.push(key);
        }
        if (corpus.struct_attributes != null) {
          $.each(corpus.struct_attributes, function(key, val) {
            if ($.inArray(key, data.show_struct) === -1) {
              return data.show_struct.push(key);
            }
          });
        }
      }
      data.show = _.uniq(data.show);
      this.prevCQP = data.cqp;
      data.show = (_.uniq(data.show)).join(",");
      data.show_struct = (_.uniq(data.show_struct)).join(",");
      this.prevRequest = data;
      this.prevMisc = {
        "hitsPerPage": $("#num_hits").val()
      };
      this.prevParams = data;
      return this.pendingRequests.push($.ajax({
        url: settings.cgi_script,
        data: data,
        beforeSend: function(req, settings) {
          self.prevRequest = settings;
          return self.addAuthorizationHeader(req);
        },
        success: function(data, status, jqxhr) {
          self.queryData = data.querydata;
          if (data.incremental === false || !this.foundKwic) {
            kwicCallback(data);
          }
          return o.success(data, data.cqp);
        },
        error: o.error,
        progress: o.progress
      }));
    };

    return KWICProxy;

  })(BaseProxy);

  model.LemgramProxy = (function(_super) {
    __extends(LemgramProxy, _super);

    function LemgramProxy() {
      LemgramProxy.__super__.constructor.call(this);
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
      var def, params, self;
      LemgramProxy.__super__.makeRequest.call(this);
      self = this;
      params = {
        command: "relations",
        word: word,
        corpus: settings.corpusListing.stringifySelected(),
        incremental: $.support.ajaxProgress,
        type: type,
        cache: true
      };
      this.prevParams = params;
      def = $.ajax({
        url: settings.cgi_script,
        data: params,
        success: function(data) {
          c.log("relations success", data);
          self.prevRequest = params;
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
        beforeSend: function(req, settings) {
          self.prevRequest = settings;
          return self.addAuthorizationHeader(req);
        }
      });
      this.pendingRequests.push(def);
      return def;
    };

    LemgramProxy.prototype.karpSearch = function(word, sw_forms) {
      var deferred;
      deferred = $.Deferred((function(_this) {
        return function(dfd) {
          return _this.pendingRequests.push($.ajax({
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
          }));
        };
      })(this)).promise();
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
      this.prevParams = null;
      this.currentPage = 0;
      this.page_incr = 25;
    }

    StatsProxy.prototype.makeRequest = function(cqp, callback) {
      var data, reduceval, self, _ref;
      self = this;
      StatsProxy.__super__.makeRequest.call(this);
      statsResults.showPreloader();
      reduceval = search().stats_reduce || "word";
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
      if (((_ref = settings.corpusListing.getCurrentAttributes()[reduceval]) != null ? _ref.type : void 0) === "set") {
        data.split = reduceval;
      }
      if ($("#reduceSelect select").val() === "word_insensitive") {
        $.extend(data, {
          ignore_case: "word"
        });
      }
      if ($(".within_select").val() !== settings.defaultWithin) {
        data.within = settings.corpusListing.getWithinQueryString();
      }
      this.prevParams = data;
      return $.ajax({
        url: settings.cgi_script,
        data: data,
        beforeSend: function(req, settings) {
          c.log("req", req);
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
          var columns, corpus, dataset, i, minWidth, obj, row, totalRow, word, wordArray, _i, _len, _ref1;
          if (data.ERROR != null) {
            c.log("gettings stats failed with error", $.dump(data.ERROR));
            statsResults.resultError(data);
            return;
          }
          minWidth = 100;
          columns = [
            {
              id: "hit",
              name: "stats_hit",
              field: "hit_value",
              sortable: true,
              formatter: settings.reduce_stringify(reduceval),
              minWidth: minWidth
            }, {
              id: "total",
              name: "stats_total",
              field: "total_value",
              sortable: true,
              formatter: self.valueFormatter,
              minWidth: minWidth
            }
          ];
          $.each($.keys(data.corpora).sort(), function(i, corpus) {
            return columns.push({
              id: corpus,
              name: settings.corpora[corpus.toLowerCase()].title,
              field: corpus + "_value",
              sortable: true,
              formatter: self.valueFormatter,
              minWidth: minWidth
            });
          });
          totalRow = {
            id: "row_total",
            hit_value: "&Sigma;",
            total_value: data.total.sums
          };
          $.each(data.corpora, function(corpus, obj) {
            return totalRow[corpus + "_value"] = obj.sums;
          });
          wordArray = $.keys(data.total.absolute);
          dataset = [totalRow];
          for (i = _i = 0, _len = wordArray.length; _i < _len; i = ++_i) {
            word = wordArray[i];
            row = {
              id: "row" + i,
              hit_value: word,
              total_value: {
                absolute: data.total.absolute[word],
                relative: data.total.relative[word]
              }
            };
            _ref1 = data.corpora;
            for (corpus in _ref1) {
              obj = _ref1[corpus];
              row[corpus + "_value"] = {
                absolute: obj.absolute[word],
                relative: obj.relative[word]
              };
            }
            dataset[i + 1] = row;
          }
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
      return "<span>\n      <span class='relStat'>" + (util.formatDecimalString(value.relative.toFixed(1), true)) + "</span>\n      <span class='absStat'>(" + (util.prettyNumbers(String(value.absolute))) + ")</span>\n<span>";
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

    AuthenticationProxy.prototype.hasCred = function(corpusId) {
      var _ref;
      if (!this.loginObj.credentials) {
        return false;
      }
      return _ref = corpusId.toUpperCase(), __indexOf.call(this.loginObj.credentials, _ref) >= 0;
    };

    return AuthenticationProxy;

  })();

  model.TimeProxy = (function(_super) {
    __extends(TimeProxy, _super);

    function TimeProxy() {}

    TimeProxy.prototype.makeRequest = function() {
      var dfd, xhr;
      dfd = $.Deferred();
      xhr = $.ajax({
        url: settings.cgi_script,
        type: "GET",
        data: {
          command: "timespan",
          granularity: "y",
          corpus: settings.corpusListing.stringifyAll()
        }
      });
      xhr.done((function(_this) {
        return function(data, status, xhr) {
          var combined, rest;
          c.log("timespan done", data);
          if (data.ERROR) {
            c.error("timespan error", data.ERROR);
            dfd.reject(data.ERROR);
            return;
          }
          rest = data.combined[""];
          delete data.combined[""];
          _this.expandTimeStruct(data.combined);
          combined = _this.compilePlotArray(data.combined);
          if (_.keys(data).length < 2 || data.ERROR) {
            dfd.reject();
            return;
          }
          return dfd.resolve([data.corpora, combined, rest]);
        };
      })(this));
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
      var maxYear, minYear, prevVal, thisVal, y, years, _i, _results;
      years = _.map(_.pairs(_.omit(struct, "")), function(item) {
        return Number(item[0]);
      });
      if (!years.length) {
        return;
      }
      minYear = _.min(years);
      maxYear = _.max(years);
      if (_.isNaN(maxYear) || _.isNaN(minYear)) {
        c.log("expandTimestruct broken, years:", years);
        return;
      }
      _results = [];
      for (y = _i = minYear; minYear <= maxYear ? _i <= maxYear : _i >= maxYear; y = minYear <= maxYear ? ++_i : --_i) {
        thisVal = struct[y];
        if (typeof thisVal === "undefined") {
          _results.push(struct[y] = prevVal);
        } else {
          _results.push(prevVal = thisVal);
        }
      }
      return _results;
    };

    return TimeProxy;

  })(BaseProxy);

  model.GraphProxy = (function(_super) {
    __extends(GraphProxy, _super);

    function GraphProxy() {
      GraphProxy.__super__.constructor.call(this);
      this.prevParams = null;
    }

    GraphProxy.prototype.expandSubCqps = function(subArray) {
      var array, cqp, i, p, padding, _i, _ref, _results;
      padding = _.map((function() {
        _results = [];
        for (var _i = 0, _ref = subArray.length.toString().length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function() {
        return "0";
      });
      array = (function() {
        var _j, _len, _results1;
        _results1 = [];
        for (i = _j = 0, _len = subArray.length; _j < _len; i = ++_j) {
          cqp = subArray[i];
          p = padding.slice(i.toString().length).join("");
          _results1.push(["subcqp" + p + i, cqp]);
        }
        return _results1;
      })();
      return _.object(array);
    };

    GraphProxy.prototype.makeRequest = function(cqp, subcqps, corpora) {
      var def, params;
      GraphProxy.__super__.makeRequest.call(this);
      params = {
        command: "count_time",
        cqp: cqp,
        corpus: corpora,
        granularity: this.granularity,
        incremental: $.support.ajaxProgress
      };
      _.extend(params, this.expandSubCqps(subcqps));
      this.prevParams = params;
      def = $.Deferred();
      $.ajax({
        url: settings.cgi_script,
        dataType: "json",
        data: params,
        beforeSend: (function(_this) {
          return function(req, settings) {
            _this.prevRequest = settings;
            return _this.addAuthorizationHeader(req);
          };
        })(this),
        progress: (function(_this) {
          return function(data, e) {
            var progressObj;
            progressObj = _this.calcProgress(e);
            if (progressObj == null) {
              return;
            }
            return def.notify(progressObj);
          };
        })(this),
        error: function(jqXHR, textStatus, errorThrown) {
          return def.reject(textStatus);
        },
        success: function(data) {
          return def.resolve(data);
        }
      });
      return def.promise();
    };

    return GraphProxy;

  })(BaseProxy);

}).call(this);

//# sourceMappingURL=model.js.map
