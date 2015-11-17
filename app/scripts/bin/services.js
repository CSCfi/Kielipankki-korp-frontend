(function() {
  var CompareSearches, korpApp,
    __slice = [].slice;

  korpApp = angular.module("korpApp");

  korpApp.factory("utils", function($location) {
    return {
      valfilter: function(attrobj) {
        if (attrobj.isStructAttr) {
          return "_." + attrobj.value;
        } else {
          return attrobj.value;
        }
      },
      setupHash: function(scope, config) {
        var obj, onWatch, watch, _i, _len, _results;
        onWatch = function() {
          var obj, val, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = config.length; _i < _len; _i++) {
            obj = config[_i];
            val = $location.search()[obj.key];
            if (!val) {
              if (obj["default"] != null) {
                val = obj["default"];
              } else {
                continue;
              }
            }
            val = (obj.val_in || _.identity)(val);
            if ("scope_name" in obj) {
              _results.push(scope[obj.scope_name] = val);
            } else if ("scope_func" in obj) {
              _results.push(scope[obj.scope_func](val));
            } else {
              _results.push(scope[obj.key] = val);
            }
          }
          return _results;
        };
        onWatch();
        scope.$watch((function() {
          return $location.search();
        }), function() {
          return onWatch();
        });
        _results = [];
        for (_i = 0, _len = config.length; _i < _len; _i++) {
          obj = config[_i];
          watch = obj.expr || obj.scope_name || obj.key;
          _results.push(scope.$watch(watch, (function(obj, watch) {
            return function(val) {
              val = (obj.val_out || _.identity)(val);
              if (val === obj["default"]) {
                val = null;
              }
              $location.search(obj.key, val || null);
              if (obj.key === "page") {
                c.log("post change", watch, val);
              }
              return typeof obj.post_change === "function" ? obj.post_change(val) : void 0;
            };
          })(obj, watch)));
        }
        return _results;
      }
    };
  });

  korpApp.factory("debounce", function($timeout) {
    return function(func, wait, options) {
      var args, delayed, inited, leading, result, thisArg, timeoutDeferred, trailing;
      args = null;
      inited = null;
      result = null;
      thisArg = null;
      timeoutDeferred = null;
      trailing = true;
      delayed = function() {
        inited = timeoutDeferred = null;
        if (trailing) {
          return result = func.apply(thisArg, args);
        }
      };
      if (options === true) {
        leading = true;
        trailing = false;
      } else if (options && angular.isObject(options)) {
        leading = options.leading;
        trailing = ("trailing" in options ? options.trailing : trailing);
      }
      return function() {
        args = arguments;
        thisArg = this;
        $timeout.cancel(timeoutDeferred);
        if (!inited && leading) {
          inited = true;
          result = func.apply(thisArg, args);
        } else {
          timeoutDeferred = $timeout(delayed, wait);
        }
        return result;
      };
    };
  });

  korpApp.factory('backend', function($http, $q, utils) {
    return {
      requestCompare: function(cmpObj1, cmpObj2, reduce) {
        var conf, corpora1, corpora2, corpusListing, def, filterFun, params, xhr;
        reduce = reduce.replace(/^_\./, "");
        filterFun = function(item) {
          return settings.corpusListing.corpusHasAttr(item, reduce);
        };
        corpora1 = _.filter(cmpObj1.corpora, filterFun);
        corpora2 = _.filter(cmpObj2.corpora, filterFun);
        corpusListing = settings.corpusListing.subsetFactory(cmpObj1.corpora);
        def = $q.defer();
        params = {
          command: "loglike",
          groupby: reduce,
          set1_corpus: corpora1.join(",").toUpperCase(),
          set1_cqp: cmpObj1.cqp,
          set2_corpus: corpora2.join(",").toUpperCase(),
          set2_cqp: cmpObj2.cqp,
          max: 50
        };
        conf = {
          url: settings.cgi_script,
          params: params,
          method: "GET",
          headers: {}
        };
        _.extend(conf.headers, model.getAuthorizationHeader());
        xhr = $http(conf);
        xhr.success(function(data) {
          return def.resolve([data, cmpObj1, cmpObj2, reduce], xhr);
        });
        return def.promise;
      },
      relatedWordSearch: function(lemgram) {
        var def, req;
        def = $q.defer();
        req = $http({
          url: "http://spraakbanken.gu.se/ws/karp-sok",
          method: "GET",
          params: {
            cql: "lemgram==/pivot/saldo " + lemgram,
            resource: "swefn",
            "mini-entries": true,
            info: "lu",
            format: "json"
          }
        }).success(function(data) {
          var e, eNodes, output;
          if (angular.isArray(data.div)) {
            eNodes = data.div[0].e;
          } else if (data.div) {
            eNodes = data.div.e;
          } else {
            eNodes = [];
          }
          if (!angular.isArray(eNodes)) {
            eNodes = [eNodes];
          }
          output = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = eNodes.length; _i < _len; _i++) {
              e = eNodes[_i];
              _results.push({
                label: e.s.replace("swefn--", ""),
                words: _.pluck(e.info.info.feat, "val")
              });
            }
            return _results;
          })();
          return def.resolve(output);
        });
        return def.promise;
      }
    };
  });

  korpApp.factory('nameEntitySearch', function($rootScope, $q) {
    var NameEntities;
    NameEntities = (function() {
      function NameEntities() {}

      NameEntities.prototype.request = function(cqp) {
        this.def = $q.defer();
        this.promise = this.def.promise;
        this.proxy = new model.NameProxy();
        $rootScope.$broadcast('map_data_available', cqp, settings.corpusListing.stringifySelected(true));
        return this.proxy.makeRequest(cqp, this.progressCallback).then((function(_this) {
          return function(data) {
            return _this.def.resolve(data);
          };
        })(this));
      };

      NameEntities.prototype.progressCallback = function(progress) {
        return $rootScope.$broadcast('map_progress', progress);
      };

      return NameEntities;

    })();
    return new NameEntities();
  });

  korpApp.factory('searches', function(utils, $location, $rootScope, $http, $q, nameEntitySearch) {
    var Searches, oldValues, searches;
    Searches = (function() {
      function Searches() {
        var def, timedef;
        this.activeSearch = null;
        def = $q.defer();
        timedef = $q.defer();
        this.infoDef = def.promise;
        this.timeDef = timedef.promise;
        this.langDef = $q.defer();
        this.getInfoData().then(function() {
          def.resolve();
          return initTimeGraph(timedef);
        });
      }

      Searches.prototype.addIgnoreCQP = function(cqp) {
        if ($location.search().search_tab === 1) {
          return util.addIgnoreCQPBetweenTokens(cqp);
        } else {
          return cqp;
        }
      };

      Searches.prototype.kwicRequest = function(cqp, isPaging, hasIgnores) {
        c.log("kwicRequest", cqp);
        if (!hasIgnores) {
          cqp = this.addIgnoreCQP(cqp);
        }
        return kwicResults.makeRequest(cqp, isPaging);
      };

      Searches.prototype.kwicSearch = function(cqp, isPaging) {
        cqp = this.addIgnoreCQP(cqp);
        this.kwicRequest(cqp, isPaging, true);
        statsResults.makeRequest(cqp);
        return this.nameEntitySearch(cqp);
      };

      Searches.prototype.lemgramSearch = function(lemgram, searchPrefix, searchSuffix, isPaging) {
        var cqp;
        cqp = new model.LemgramProxy().lemgramSearch(lemgram, searchPrefix, searchSuffix);
        statsResults.makeRequest(cqp);
        this.kwicRequest(cqp, isPaging);
        this.nameEntitySearch(cqp);
        if (settings.wordpicture === false) {
          return;
        }
        return lemgramResults.makeRequest(lemgram, "lemgram");
      };

      Searches.prototype.nameEntitySearch = function(cqp) {
        if ($location.search().show_map != null) {
          return nameEntitySearch.request(cqp);
        }
      };

      Searches.prototype.getMode = function() {
        var def, mode;
        def = $q.defer();
        mode = $.deparam.querystring().mode;
        if ((mode != null) && mode !== "default") {
          $.getScript("modes/" + mode + "_mode.js").done(function() {
            return $rootScope.$apply(function() {
              return def.resolve();
            });
          }).fail(function(args, msg, e) {
            return $rootScope.$apply(function() {
              return def.reject();
            });
          });
        } else {
          def.resolve();
        }
        return def.promise;
      };

      Searches.prototype.getInfoData = function() {
        var def;
        def = $q.defer();
        $http({
          method: "POST",
          url: settings.cgi_script,
          params: {
            command: "info",
            corpus: _(settings.corpusListing.corpora).pluck("id").invoke("toUpperCase").join(",")
          }
        }).success(function(data) {
          var corpus, folder_name, _i, _len, _ref;
          c.log("data", data);
          _ref = settings.corpusListing.corpora;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            corpus = _ref[_i];
            corpus["info"] = data["corpora"][corpus.id.toUpperCase()]["info"];
            util.copyCorpusInfoToConfig(corpus);
          }
          for (folder_name in settings.corporafolders) {
            util.propagateCorpusFolderInfo(settings.corporafolders[folder_name], void 0);
          }
          c.log("loadCorpora");
          util.loadCorpora();
          return def.resolve();
        });
        return def.promise;
      };

      return Searches;

    })();
    searches = new Searches();
    oldValues = [];
    $rootScope.$watchGroup([
      (function() {
        return $location.search().search;
      }), "_loc.search().page"
    ], (function(_this) {
      return function(newValues) {
        var pageChanged, pageOnly, searchChanged, searchExpr, type, value, _ref;
        c.log("searches service watch", $location.search().search);
        searchExpr = $location.search().search;
        if (!searchExpr) {
          return;
        }
        _ref = searchExpr != null ? searchExpr.split("|") : void 0, type = _ref[0], value = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
        value = value.join("|");
        newValues[1] = Number(newValues[1]) || 0;
        oldValues[1] = Number(oldValues[1]) || 0;
        c.log("newValues", newValues);
        c.log("oldValues", oldValues);
        if (_.isEqual(newValues, oldValues)) {
          pageChanged = false;
          searchChanged = true;
        } else {
          pageChanged = newValues[1] !== oldValues[1];
          searchChanged = newValues[0] !== oldValues[0];
        }
        pageOnly = pageChanged && !searchChanged;
        view.updateSearchHistory(value, $location.absUrl());
        return $q.all([searches.infoDef, searches.langDef.promise]).then(function() {
          switch (type) {
            case "word":
              searches.activeSearch = {
                type: type,
                val: value,
                page: newValues[1],
                pageOnly: pageOnly
              };
              break;
            case "lemgram":
              searches.activeSearch = {
                type: type,
                val: value,
                page: newValues[1],
                pageOnly: pageOnly
              };
              break;
            case "saldo":
              extendedSearch.setOneToken("saldo", value);
              break;
            case "cqp":
              if (!value) {
                value = $location.search().cqp;
              }
              searches.activeSearch = {
                type: type,
                val: value,
                page: newValues[1],
                pageOnly: pageOnly
              };
              searches.kwicSearch(value, pageOnly);
          }
          return oldValues = [].concat(newValues);
        });
      };
    })(this));
    return searches;
  });

  korpApp.service("compareSearches", CompareSearches = (function() {
    function CompareSearches() {
      if (currentMode !== "default") {
        this.key = 'saved_searches_' + currentMode;
      } else {
        this.key = "saved_searches";
      }
      c.log("key", this.key);
      this.savedSearches = ($.jStorage.get(this.key)) || [];
    }

    CompareSearches.prototype.saveSearch = function(searchObj) {
      this.savedSearches.push(searchObj);
      return $.jStorage.set(this.key, this.savedSearches);
    };

    CompareSearches.prototype.flush = function() {
      var _ref;
      [].splice.apply(this.savedSearches, [0, 9e9].concat(_ref = [])), _ref;
      return $.jStorage.set(this.key, this.savedSearches);
    };

    return CompareSearches;

  })());

  korpApp.factory("lexicons", function($q, $http) {
    return {
      getLemgrams: function(wf, resources, corporaIDs, restrictToSingleWords) {
        var args, deferred, swforms;
        deferred = $q.defer();
        swforms = restrictToSingleWords ? "true" : "false";
        args = {
          "cql": "wf==" + wf,
          "resurs": resources,
          "lemgram-ac": "true",
          "format": "json",
          "sw-forms": swforms,
          "sms-forms": "false"
        };
        $http({
          method: 'GET',
          url: "http://spraakbanken.gu.se/ws/karp-sok",
          params: args
        }).success((function(_this) {
          return function(data, status, headers, config) {
            var karpLemgrams, korpargs;
            if (data === null) {
              return deferred.resolve([]);
            } else {
              if (!angular.isArray(data)) {
                data = [data];
              }
              karpLemgrams = data;
              korpargs = {
                "command": "lemgram_count",
                "lemgram": data,
                "count": "lemgram",
                "corpus": corporaIDs
              };
              return $http({
                method: 'POST',
                url: settings.cgi_script,
                params: korpargs
              }).success(function(data, status, headers, config) {
                var allLemgrams, count, klemgram, lemgram, _i, _len;
                delete data.time;
                allLemgrams = [];
                for (lemgram in data) {
                  count = data[lemgram];
                  allLemgrams.push({
                    "lemgram": lemgram,
                    "count": count
                  });
                }
                for (_i = 0, _len = karpLemgrams.length; _i < _len; _i++) {
                  klemgram = karpLemgrams[_i];
                  if (!data[klemgram]) {
                    allLemgrams.push({
                      "lemgram": klemgram,
                      "count": 0
                    });
                  }
                }
                return deferred.resolve(allLemgrams);
              }).error(function(data, status, headers, config) {
                return deferred.resolve([]);
              });
            }
          };
        })(this)).error(function(data, status, headers, config) {
          return deferred.resolve([]);
        });
        return deferred.promise;
      },
      getSenses: function(wf) {
        var args, deferred;
        deferred = $q.defer();
        args = {
          "cql": "wf==" + wf,
          "resurs": "saldom",
          "lemgram-ac": "true",
          "format": "json",
          "sw-forms": "false",
          "sms-forms": "false"
        };
        $http({
          method: 'GET',
          url: "http://spraakbanken.gu.se/ws/karp-sok",
          params: args
        }).success((function(_this) {
          return function(data, status, headers, config) {
            var senseargs;
            if (data === null) {
              return deferred.resolve([]);
            } else {
              if (!angular.isArray(data)) {
                data = [data];
              }
              senseargs = {
                "cql": "lemgram == " + data.join(" or lemgram == "),
                "resurs": "saldo",
                "format": "json",
                "mini-entries": "true",
                "info": "primary"
              };
              return $http({
                method: 'POST',
                url: "http://spraakbanken.gu.se/ws/karp-sok",
                params: senseargs
              }).success(function(data, status, headers, config) {
                var senses, _ref;
                console.log("sense data", data);
                if (!(data != null ? (_ref = data.div) != null ? _ref.e : void 0 : void 0)) {
                  deferred.resolve([]);
                  return null;
                }
                if (!$.isArray(data != null ? data.div.e : void 0)) {
                  data.div.e = [data.div.e];
                }
                senses = _.map(data.div.e, function(obj) {
                  var _ref1, _ref2, _ref3;
                  return {
                    "sense": obj.s,
                    "desc": (_ref1 = obj.info) != null ? (_ref2 = _ref1.info) != null ? (_ref3 = _ref2.SenseRelation) != null ? _ref3.targets : void 0 : void 0 : void 0
                  };
                });
                console.log("OUTSENSES", senses);
                return deferred.resolve(senses);
              }).error(function(data, status, headers, config) {
                return deferred.resolve([]);
              });
            }
          };
        })(this)).error(function(data, status, headers, config) {
          return deferred.resolve([]);
        });
        return deferred.promise;
      }
    };
  });

}).call(this);
