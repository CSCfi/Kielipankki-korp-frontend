(function() {
  var ExampleCtrl, KwicCtrl, korpApp,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  korpApp = angular.module("korpApp");

  korpApp.controller("resultContainerCtrl", function($scope, searches, $location) {
    $scope.searches = searches;
    return $scope.enableMap = settings.enableMap;
  });

  KwicCtrl = (function() {
    KwicCtrl.prototype.setupHash = function() {
      c.log("setupHash", this.scope.$id);
      return this.utils.setupHash(this.scope, [
        {
          key: "page",
          post_change: (function(_this) {
            return function() {
              c.log("post_change page hash", _this.scope.page);
              _this.scope.pageObj.pager = (_this.scope.page || 0) + 1;
              return c.log("@scope.pageObj.pager", _this.scope.pageObj.pager);
            };
          })(this),
          val_in: Number
        }
      ]);
    };

    KwicCtrl.prototype.initPage = function() {
      c.log("initPage", this.location.search().page);
      this.scope.pageObj = {
        pager: Number(this.location.search().page) + 1 || 1
      };
      return this.scope.page = this.scope.pageObj.pager - 1;
    };

    KwicCtrl.$inject = ['$scope', "utils", "$location"];

    function KwicCtrl(scope, utils1, location) {
      var $location, $scope, findMatchSentence, fmtname, massageData, params, punctArray, readingChange, ref, s;
      this.scope = scope;
      this.utils = utils1;
      this.location = location;
      s = this.scope;
      $scope = this.scope;
      c.log("kwicCtrl init", $scope.$parent);
      $location = this.location;
      s.active = true;
      s.onexit = function() {
        c.log("onexit");
        return s.$root.sidebar_visible = false;
      };
      punctArray = [",", ".", ";", ":", "!", "?", "..."];
      this.initPage();
      s.$watch("pageObj.pager", function(val) {
        return c.log("pageobj watch", val);
      });
      s.pageChange = function($event, page) {
        c.log("pageChange", arguments);
        $event.stopPropagation();
        return s.page = page - 1;
      };
      this.setupHash();
      s.onPageInput = function($event, page, numPages) {
        if ($event.keyCode === 13) {
          if (page > numPages) {
            page = numPages;
          }
          s.pageObj.pager = page;
          return s.page = Number(page) - 1;
        }
      };
      readingChange = function() {
        var ref;
        c.log("reading change");
        if ((ref = s.instance) != null ? ref.getProxy().pendingRequests.length : void 0) {
          window.pending = s.instance.getProxy().pendingRequests;
          return $.when.apply($, s.instance.getProxy().pendingRequests).then(function() {
            c.log("readingchange makeRequest");
            return s.instance.makeRequest();
          });
        }
      };
      s.setupReadingHash = (function(_this) {
        return function() {
          return _this.utils.setupHash(s, [
            {
              key: "reading_mode",
              post_change: function(isReading) {
                c.log("change reading mode", isReading);
                return readingChange();
              }
            }
          ]);
        };
      })(this);
      s.setupReadingWatch = _.once(function() {
        var init;
        c.log("setupReadingWatch");
        init = true;
        return s.$watch("reading_mode", function() {
          if (!init) {
            readingChange();
          }
          return init = false;
        });
      });
      s.toggleReading = function() {
        s.reading_mode = !s.reading_mode;
        return s.instance.centerScrollbar();
      };
      s.hitspictureClick = function(pageNumber) {
        c.log("pageNumber", pageNumber);
        return s.page = Number(pageNumber);
      };
      massageData = function(sentenceArray) {
        var corpus, corpus_aligned, currentStruct, end, i, id, isOpen, j, k, l, len1, linkCorpusId, mainCorpusId, matchSentenceEnd, matchSentenceStart, newSent, output, prevCorpus, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, sentence, start, tokens, wd;
        currentStruct = [];
        prevCorpus = "";
        output = [];
        isOpen = false;
        for (i = k = 0, len1 = sentenceArray.length; k < len1; i = ++k) {
          sentence = sentenceArray[i];
          ref = findMatchSentence(sentence), matchSentenceStart = ref[0], matchSentenceEnd = ref[1];
          ref1 = sentence.match, start = ref1.start, end = ref1.end;
          for (j = l = 0, ref2 = sentence.tokens.length; 0 <= ref2 ? l < ref2 : l > ref2; j = 0 <= ref2 ? ++l : --l) {
            wd = sentence.tokens[j];
            if ((start <= j && j < end)) {
              _.extend(wd, {
                _match: true
              });
            }
            if ((matchSentenceStart < j && j < matchSentenceEnd)) {
              _.extend(wd, {
                _matchSentence: true
              });
            }
            if (ref3 = wd.word, indexOf.call(punctArray, ref3) >= 0) {
              _.extend(wd, {
                _punct: true
              });
            }
            if ((ref4 = wd.structs) != null ? ref4.open : void 0) {
              wd._open = wd.structs.open;
              currentStruct = [].concat(currentStruct, wd.structs.open);
              isOpen = true;
            } else if (isOpen && ((ref5 = wd.structs) != null ? ref5.close : void 0)) {
              wd._close = wd.structs.close;
              currentStruct = _.without.apply(_, [currentStruct].concat(slice.call(wd.structs.close)));
            }
            if (isOpen) {
              if (currentStruct.length) {
                _.extend(wd, {
                  _struct: currentStruct
                });
              }
            }
            if ((ref6 = wd.structs) != null ? ref6.close : void 0) {
              currentStruct = [];
              isOpen = false;
            }
          }
          if (currentMode === "parallel") {
            mainCorpusId = sentence.corpus.split("|")[0].toLowerCase();
            linkCorpusId = sentence.corpus.split("|")[1].toLowerCase();
          } else {
            mainCorpusId = sentence.corpus.toLowerCase();
          }
          id = linkCorpusId || mainCorpusId;
          if (prevCorpus !== id) {
            corpus = settings.corpora[id];
            newSent = {
              newCorpus: corpus.title,
              noContext: _.keys(corpus.context).length === 1
            };
            output.push(newSent);
          }
          if (i % 2 === 0) {
            sentence._color = settings.primaryColor;
          } else {
            sentence._color = settings.primaryLight;
          }
          sentence.corpus = mainCorpusId;
          output.push(sentence);
          if (sentence.aligned) {
            ref7 = _.pairs(sentence.aligned)[0], corpus_aligned = ref7[0], tokens = ref7[1];
            output.push({
              tokens: tokens,
              isLinked: true,
              corpus: corpus_aligned,
              _color: sentence._color
            });
          }
          prevCorpus = id;
        }
        return output;
      };
      findMatchSentence = function(sentence) {
        var decr, end, incr, ref, ref1, ref2, span, start;
        span = [];
        ref = sentence.match, start = ref.start, end = ref.end;
        decr = start;
        incr = end;
        while (decr >= 0) {
          if (indexOf.call(((ref1 = sentence.tokens[decr--].structs) != null ? ref1.open : void 0) || [], "sentence") >= 0) {
            span[0] = decr;
            break;
          }
        }
        while (incr < sentence.tokens.length) {
          if (indexOf.call(((ref2 = sentence.tokens[incr++].structs) != null ? ref2.close : void 0) || [], "sentence") >= 0) {
            span[1] = incr;
            break;
          }
        }
        return span;
      };
      s.kwic = [];
      s.contextKwic = [];
      s.setContextData = function(data) {
        return s.contextKwic = massageData(data.kwic);
      };
      s.setKwicData = function(data) {
        return s.kwic = massageData(data.kwic);
      };
      c.log("selectionManager");
      s.selectionManager = new util.SelectionManager();
      s.selectLeft = function(sentence) {
        if (!sentence.match) {
          return;
        }
        return sentence.tokens.slice(0, sentence.match.start);
      };
      s.selectMatch = function(sentence) {
        var from;
        if (!sentence.match) {
          return;
        }
        from = sentence.match.start;
        return sentence.tokens.slice(from, sentence.match.end);
      };
      s.selectRight = function(sentence) {
        var from, len;
        if (!sentence.match) {
          return;
        }
        from = sentence.match.end;
        len = sentence.tokens.length;
        return sentence.tokens.slice(from, len);
      };
      s.downloadFormats = settings.downloadFormats;
      s.downloadFormat = s.downloadFormats[0];
      s.downloadFormatPhysical = {};
      ref = settings.downloadFormatParams;
      for (fmtname in ref) {
        params = ref[fmtname];
        s.downloadFormatPhysical[fmtname] = params.physical_formats;
      }
      s.downloadKwic = function(downloadFormat) {
        s.instance.downloadKwic({
          format: downloadFormat,
          physical_format: s.downloadFormatPhysical[downloadFormat].selected
        });
      };
    }

    return KwicCtrl;

  })();

  korpApp.directive("kwicCtrl", function() {
    return {
      controller: KwicCtrl
    };
  });

  ExampleCtrl = (function(superClass) {
    extend(ExampleCtrl, superClass);

    ExampleCtrl.$inject = ['$scope', "utils", "$location"];

    function ExampleCtrl(scope, utils, $location) {
      var s;
      this.scope = scope;
      ExampleCtrl.__super__.constructor.call(this, this.scope, utils, $location);
      s = this.scope;
      s.hitspictureClick = function(pageNumber) {
        s.page = Number(pageNumber);
        return s.pageChange(null, pageNumber);
      };
      s.pageChange = function($event, page) {
        if ($event != null) {
          $event.stopPropagation();
        }
        s.instance.current_page = page;
        return s.instance.makeRequest();
      };
      s.exampleReadingMode = s.kwicTab.readingMode;
      s.toggleReading = function() {
        var ref;
        s.exampleReadingMode = !s.exampleReadingMode;
        s.instance.centerScrollbar();
        if ((ref = s.instance) != null ? ref.getProxy().pendingRequests.length : void 0) {
          window.pending = s.instance.getProxy().pendingRequests;
          return $.when.apply($, s.instance.getProxy().pendingRequests).then(function() {
            return s.instance.makeRequest();
          });
        }
      };
    }

    ExampleCtrl.prototype.initPage = function() {
      this.scope.pageObj = {
        pager: 0
      };
      return this.scope.page = 0;
    };

    ExampleCtrl.prototype.setupHash = function() {};

    return ExampleCtrl;

  })(KwicCtrl);

  korpApp.directive("exampleCtrl", function() {
    return {
      controller: ExampleCtrl
    };
  });

  korpApp.directive("statsResultCtrl", function() {
    return {
      controller: function($scope, utils, $location, backend, searches, $rootScope) {
        var s;
        s = $scope;
        s.onGraphShow = function(data) {
          c.log("show graph!", arguments);
          return $rootScope.graphTabs.push(data);
        };
        s.newMapEnabled = settings.newMapEnabled;
        s.getGeoAttributes = function(corpora) {
          var attr, attrs, corpus, k, l, len1, len2, ref, ref1;
          attrs = [];
          ref = settings.corpusListing.subsetFactory(corpora).selected;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            corpus = ref[k];
            ref1 = corpus.private_struct_attributes;
            for (l = 0, len2 = ref1.length; l < len2; l++) {
              attr = ref1[l];
              if (attr.indexOf("geo" !== -1)) {
                attrs.push(attr);
              }
            }
          }
          attrs = _.map(attrs, function(attr) {
            return {
              label: attr
            };
          });
          if (attrs && attrs.length > 0) {
            attrs[0].selected = true;
          }
          s.searchCorpora = corpora;
          return s.mapAttributes = attrs;
        };
        s.mapToggleSelected = function(index, event) {
          var attr;
          _.map(s.mapAttributes, function(attr) {
            return attr.selected = false;
          });
          attr = s.mapAttributes[index];
          attr.selected = true;
          return event.stopPropagation();
        };
        return s.showMap = function() {
          var cell, chk, cqp, cqpExprs, getCqpExpr, k, len1, ref, texts;
          getCqpExpr = function() {
            var cqpExpr, search;
            search = searches.activeSearch;
            cqpExpr = null;
            if (search) {
              if (search.type === "word" || search.type === "lemgram") {
                cqpExpr = simpleSearch.getCQP(search.val);
              } else {
                cqpExpr = search.val;
              }
            }
            return cqpExpr;
          };
          cqpExprs = {};
          ref = angular.element("#myGrid .slick-cell > input:checked");
          for (k = 0, len1 = ref.length; k < len1; k++) {
            chk = ref[k];
            cell = angular.element(chk).parent();
            cqp = decodeURIComponent(cell.next().find(" > .statistics-link").data("query"));
            if (cqp === "undefined") {
              continue;
            }
            texts = _.map(cell.parent().find('.parameter-column'), function(elem) {
              return angular.element(elem).text();
            });
            cqpExprs[cqp] = texts.join(", ");
          }
          return $rootScope.mapTabs.push(backend.requestMapData(s.searchCorpora, getCqpExpr(), cqpExprs, _.filter(s.mapAttributes, "selected")));
        };
      }
    };
  });

  korpApp.directive("wordpicCtrl", function() {
    return {
      controller: function($scope, $rootScope, $location, utils, searches) {
        $scope.word_pic = $location.search().word_pic != null;
        $scope.$watch((function() {
          return $location.search().word_pic;
        }), function(val) {
          return $scope.word_pic = Boolean(val);
        });
        $scope.activate = function() {
          var search;
          $location.search("word_pic", true);
          search = searches.activeSearch;
          return $scope.instance.makeRequest(search.val, search.type);
        };
        $scope.settings = {
          showNumberOfHits: "15"
        };
        $scope.hitSettings = ["15"];
        $scope.minimize = function(table) {
          return table.slice(0, $scope.settings.showNumberOfHits);
        };
        $scope.onClickExample = function(event, row) {
          var data, opts;
          data = row;
          opts = {};
          opts.ajaxParams = {
            start: 0,
            end: 24,
            command: "relations_sentences",
            source: data.source.join(","),
            head: data.head,
            dep: data.dep,
            rel: data.rel,
            depextra: data.depextra,
            corpus: data.corpus
          };
          return $rootScope.kwicTabs.push({
            queryParams: opts
          });
        };
        $scope.showWordClass = false;
        $rootScope.$on("word_picture_data_available", function(event, data) {
          var max;
          $scope.data = data;
          max = 0;
          _.map(data, function(form) {
            return _.map(form, function(something) {
              if (something instanceof Array) {
                return _.map(something, function(asdf) {
                  return _.map(asdf, function(qwerty) {
                    if (qwerty.table && (qwerty.table.length > max)) {
                      return max = qwerty.table.length;
                    }
                  });
                });
              }
            });
          });
          $scope.hitSettings = [];
          if (max < 15) {
            $scope.settings = {
              showNumberOfHits: "1000"
            };
          } else {
            $scope.hitSettings.push("15");
            $scope.settings = {
              showNumberOfHits: "15"
            };
          }
          if (max > 50) {
            $scope.hitSettings.push("50");
          }
          if (max > 100) {
            $scope.hitSettings.push("100");
          }
          if (max > 500) {
            $scope.hitSettings.push("500");
          }
          return $scope.hitSettings.push("1000");
        });
        $scope.localeString = function(lang, hitSetting) {
          if (hitSetting === "1000") {
            return util.getLocaleString("word_pic_show_all", lang);
          } else {
            return util.getLocaleString("word_pic_show_some", lang) + " " + hitSetting + " " + util.getLocaleString("word_pic_hits", lang);
          }
        };
        $scope.isLemgram = function(word) {
          return util.isLemgramId(word);
        };
        $scope.renderTable = function(obj) {
          return obj instanceof Array;
        };
        $scope.parseLemgram = function(row, allLemgrams) {
          var concept, hasHomograph, infixIndex, lemgram, match, prefix, ref, set, type, word;
          set = row[row.show_rel].split('|');
          lemgram = set[0];
          word = _.str.trim(lemgram);
          infixIndex = "";
          concept = lemgram;
          infixIndex = "";
          type = "-";
          hasHomograph = (ref = lemgram.slice(0, -1), indexOf.call(allLemgrams, ref) >= 0);
          prefix = row.depextra;
          if (util.isLemgramId(lemgram)) {
            match = util.splitLemgram(lemgram);
            infixIndex = match.index;
            if (row.dep) {
              concept = match.form.replace(/_/g, " ");
            } else {
              concept = "-";
            }
            type = match.pos.slice(0, 2);
          }
          return {
            label: prefix + " " + concept,
            pos: type,
            idx: infixIndex,
            showIdx: !(infixIndex === "" || infixIndex === "1")
          };
        };
        $scope.getTableClass = function(wordClass, parentIdx, idx) {
          return settings.wordPictureConf[wordClass][parentIdx][idx].css_class;
        };
        $scope.getHeaderLabel = function(header, section, idx) {
          if (header.alt_label) {
            return header.alt_label;
          } else {
            return "rel_" + section[idx].rel;
          }
        };
        $scope.getHeaderClasses = function(header, token) {
          var classes;
          if (header !== '_') {
            return "lemgram_header_item " + header.css_class;
          } else {
            classes = "hit";
            if ($scope.isLemgram(token)) {
              classes += " lemgram";
            }
            return classes;
          }
        };
        $scope.renderResultHeader = function(parentIndex, section, wordClass, index) {
          var headers;
          headers = settings.wordPictureConf[wordClass][parentIndex];
          return section[index] && section[index].table;
        };
        $scope.getResultHeader = function(index, wordClass) {
          return settings.wordPictureConf[wordClass][index];
        };
        return $scope.fromLemgram = function(maybeLemgram) {
          if (util.isLemgramId(maybeLemgram)) {
            return util.splitLemgram(maybeLemgram).form;
          } else {
            return maybeLemgram;
          }
        };
      }
    };
  });

  korpApp.directive("graphCtrl", function() {
    return {
      controller: function($scope) {
        var s;
        s = $scope;
        s.active = true;
        s.mode = "line";
        s.isGraph = function() {
          var ref;
          return (ref = s.mode) === "line" || ref === "bar";
        };
        return s.isTable = function() {
          return s.mode === "table";
        };
      }
    };
  });

  korpApp.directive("compareCtrl", function() {
    return {
      controller: function($scope, $rootScope) {
        var s;
        s = $scope;
        s.loading = true;
        s.active = true;
        s.resultOrder = function(item) {
          return Math.abs(item.loglike);
        };
        return s.promise.then((function(arg, xhr) {
          var attributes, cl, cmp1, cmp2, cmps, max, reduce, tables;
          tables = arg[0], max = arg[1], cmp1 = arg[2], cmp2 = arg[3], reduce = arg[4];
          s.loading = false;
          s.tables = tables;
          s.reduce = reduce;
          cl = settings.corpusListing.subsetFactory([].concat(cmp1.corpora, cmp2.corpora));
          attributes = _.extend({}, cl.getCurrentAttributes(), cl.getStructAttrs());
          s.stringify = _.map(reduce, function(item) {
            var ref;
            return ((ref = attributes[_.str.strip(item, "_.")]) != null ? ref.stringify : void 0) || angular.identity;
          });
          s.max = max;
          s.cmp1 = cmp1;
          s.cmp2 = cmp2;
          cmps = [cmp1, cmp2];
          s.reduceIsStructAttr = _.map(reduce, function(attr) {
            var ref;
            return (ref = attributes[attr]) != null ? ref.isStructAttr : void 0;
          });
          return s.rowClick = function(row, cmp_index) {
            var cmp, cqp, cqps, k, opts, ref, results, splitTokens, tokenLength, tokens;
            cmp = cmps[cmp_index];
            splitTokens = _.map(row.elems, function(elem) {
              return util.splitCompareKey(elem, reduce, s.reduceIsStructAttr);
            });
            tokenLength = splitTokens[0][0].length;
            tokens = _.map((function() {
              results = [];
              for (var k = 0, ref = tokenLength - 1; 0 <= ref ? k <= ref : k >= ref; 0 <= ref ? k++ : k--){ results.push(k); }
              return results;
            }).apply(this), function(tokenIdx) {
              tokens = _.map(reduce, function(reduceAttr, attrIdx) {
                return _.unique(_.map(splitTokens, function(res) {
                  return res[attrIdx][tokenIdx];
                }));
              });
              return tokens;
            });
            cqps = _.map(tokens, function(token) {
              var cqpAnd, l, ref1, results1;
              cqpAnd = _.map((function() {
                results1 = [];
                for (var l = 0, ref1 = token.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; 0 <= ref1 ? l++ : l--){ results1.push(l); }
                return results1;
              }).apply(this), function(attrI) {
                var attrKey, attrVal, attribute, key, op, type, val, variants;
                attrKey = reduce[attrI];
                attrVal = token[attrI];
                if (indexOf.call(attrKey, "_.") >= 0) {
                  c.log("error, attribute key contains _.");
                }
                attribute = attributes[attrKey];
                if (attribute) {
                  type = attribute.type;
                  if (attribute.isStructAttr) {
                    attrKey = "_." + attrKey;
                  }
                }
                op = type === "set" ? "contains" : "=";
                if (type === "set" && attrVal.length > 1) {
                  variants = _.flatten(_.map(attrVal, function(val) {
                    return regescape(val.split(":")[1]);
                  }));
                  key = attrVal[0].split(":")[0];
                  val = key + ":" + "(" + variants.join("|") + ")";
                } else {
                  val = regescape(attrVal[0]);
                }
                if (type === "set" && val === "|") {
                  return "ambiguity(" + attrKey + ") = 0";
                } else {
                  return attrKey + " " + op + " \"" + val + "\"";
                }
              });
              return "[" + cqpAnd.join(" & ") + "]";
            });
            cqp = cqps.join(" ");
            cl = settings.corpusListing.subsetFactory(cmp.corpora);
            opts = {
              start: 0,
              end: 24,
              ajaxParams: {
                command: "query",
                cqp: cmp.cqp,
                cqp2: cqp,
                corpus: cl.stringifySelectedEncode(),
                show_struct: util.encodeListParam(_.sortBy(_.keys(cl.getStructAttrs()))),
                expand_prequeries: false
              }
            };
            return $rootScope.kwicTabs.push({
              queryParams: opts
            });
          };
        }), function() {
          s.loading = false;
          return s.error = true;
        });
      }
    };
  });

  korpApp.directive("mapCtrl", function() {
    return {
      controller: function($scope, $rootScope, $location, $timeout, searches, nameEntitySearch, markers, nameMapper) {
        var fixData, getCqpExpr, s, updateMapData;
        s = $scope;
        s.loading = false;
        s.hasResult = false;
        s.aborted = false;
        $(document).keyup(function(event) {
          var ref;
          if (event.keyCode === 27 && s.showMap && s.loading) {
            if ((ref = s.proxy) != null) {
              ref.abort();
            }
            return $timeout((function() {
              s.aborted = true;
              return s.loading = false;
            }), 0);
          }
        });
        s.$watch((function() {
          return $location.search().result_tab;
        }), function(val) {
          return $timeout((function() {
            return s.tabVisible = val === 1;
          }), 0);
        });
        s.showMap = $location.search().show_map != null;
        s.$watch((function() {
          return $location.search().show_map;
        }), function(val) {
          var currentCorpora, currentCqp, ref, ref1;
          if (val === s.showMap) {
            return;
          }
          s.showMap = Boolean(val);
          if (s.showMap) {
            currentCqp = getCqpExpr();
            currentCorpora = settings.corpusListing.stringifySelectedEncode(true);
            if (currentCqp !== ((ref = s.lastSearch) != null ? ref.cqp : void 0) || currentCorpora !== ((ref1 = s.lastSearch) != null ? ref1.corpora : void 0)) {
              return s.hasResult = false;
            }
          }
        });
        s.activate = function() {
          var cqpExpr;
          $location.search("show_map", true);
          s.showMap = true;
          cqpExpr = getCqpExpr();
          if (cqpExpr) {
            return nameEntitySearch.request(cqpExpr);
          }
        };
        getCqpExpr = function() {
          var cqpExpr, search;
          search = searches.activeSearch;
          cqpExpr = null;
          if (search) {
            if (search.type === "word" || search.type === "lemgram") {
              cqpExpr = simpleSearch.getCQP(search.val);
            } else {
              cqpExpr = search.val;
            }
          }
          return cqpExpr;
        };
        s.center = settings.mapCenter;
        s.hoverTemplate = "<div class=\"hover-info\" ng-repeat=\"(name, values) in names\">\n   <div><span>{{ 'map_name' | loc:lang }}: </span> <span>{{name}}</span></div>\n   <div><span>{{ 'map_abs_occurrences' | loc:lang }}: </span> <span>{{values.abs_occurrences}}</span></div>\n   <div><span>{{ 'map_rel_occurrences' | loc:lang }}: </span> <span>{{values.rel_occurrences}}</span></div>\n</div>";
        s.markers = {};
        s.mapSettings = {
          baseLayer: "Stamen Watercolor"
        };
        s.numResults = 0;
        s.showTime = true;
        s.$on("map_progress", function(event, progress) {
          return s.progress = Math.round(progress["stats"]);
        });
        s.$on("map_data_available", function(event, cqp, corpora) {
          s.aborted = false;
          if (s.showMap) {
            s.proxy = nameEntitySearch.proxy;
            s.lastSearch = {
              cqp: cqp,
              corpora: corpora
            };
            s.loading = true;
            updateMapData();
            return s.hasResult = true;
          }
        });
        s.countCorpora = function() {
          var ref, ref1;
          return (ref = s.proxy) != null ? (ref1 = ref.prevParams) != null ? ref1.corpus.split(/[,.]/).length : void 0 : void 0;
        };
        fixData = function(data) {
          var abs, fixedData, k, len1, name, names, rel;
          fixedData = {};
          abs = data.total.absolute;
          rel = data.total.relative;
          names = _.keys(abs);
          for (k = 0, len1 = names.length; k < len1; k++) {
            name = names[k];
            fixedData[name] = {
              rel_occurrences: Math.round((data.total.relative[name] + 0.00001) * 1000) / 1000,
              abs_occurrences: data.total.absolute[name]
            };
          }
          return fixedData;
        };
        return updateMapData = function() {
          return nameEntitySearch.promise.then(function(data) {
            var fixedData;
            if (data.count !== 0) {
              fixedData = fixData(data);
              return markers(fixedData).then(function(markers) {
                var fn, key, value;
                fn = function(key, value) {
                  var html, msgScope, name;
                  html = "";
                  msgScope = value.getMessageScope();
                  for (name in msgScope.names) {
                    html += '<div class="link" ng-click="newKWICSearch(\'' + name + '\')">' + name + '</div>';
                  }
                  msgScope.newKWICSearch = function(query) {
                    var cl, opts;
                    cl = settings.corpusListing;
                    opts = {
                      start: 0,
                      end: 24,
                      ajaxParams: {
                        command: "query",
                        cqp: getCqpExpr(),
                        cqp2: "[" + settings.placenameAttr + "='" + query + "' & (" + settings.placenameConstraint + ")]",
                        corpus: cl.stringifySelectedEncode(),
                        show_struct: util.encodeListParam(_.sortBy(_.keys(cl.getStructAttrs()))),
                        expand_prequeries: true
                      }
                    };
                    return $rootScope.kwicTabs.push({
                      queryParams: opts
                    });
                  };
                  return markers[key]["message"] = html;
                };
                for (key in markers) {
                  if (!hasProp.call(markers, key)) continue;
                  value = markers[key];
                  fn(key, value);
                }
                s.markers = markers;
                s.numResults = _.keys(markers).length;
                return s.loading = false;
              });
            } else {
              s.markers = {};
              s.numResults = 0;
              return s.loading = false;
            }
          });
        };
      }
    };
  });

  korpApp.directive("newMapCtrl", function($timeout, searches) {
    return {
      controller: function($scope, $rootScope) {
        var getCqpExpr, getGroups, getMarkers, s;
        s = $scope;
        s.loading = true;
        s.active = true;
        s.center = settings.mapCenter;
        s.hoverTemplate = "<div class=\"hover-info\">\n   <div style=\"font-weight: bold; font-size: 15px\">{{label}}</div>\n   <div><span>{{ 'map_name' | loc }}: </span> <span>{{point.name}}</span></div>\n   <div><span>{{ 'map_abs_occurrences' | loc }}: </span> <span>{{point.abs}}</span></div>\n   <div><span>{{ 'map_rel_occurrences' | loc }}: </span> <span>{{point.abs}}</span></div>\n</div>";
        s.markers = {};
        s.markerGroups = [];
        s.mapSettings = {
          baseLayer: "Stamen Watercolor"
        };
        s.numResults = 0;
        s.promise.then(((function(_this) {
          return function(arg, xhr) {
            var result;
            result = arg[0];
            s.loading = false;
            s.numResults = 20;
            s.result = result;
            s.groups = getGroups(result);
            return s.markers = getMarkers(result);
          };
        })(this)), (function(_this) {
          return function() {
            s.loading = false;
            return s.error = true;
          };
        })(this));
        getCqpExpr = function() {
          var cqpExpr, search;
          search = searches.activeSearch;
          cqpExpr = null;
          if (search) {
            if (search.type === "word" || search.type === "lemgram") {
              cqpExpr = simpleSearch.getCQP(search.val);
            } else {
              cqpExpr = search.val;
            }
          }
          return cqpExpr;
        };
        s.toggleGroup = function(groupName) {
          var old;
          old = _.values(s.markers).length;
          s.groups[groupName].selected = !s.groups[groupName].selected;
          return s.markers = getMarkers(s.result);
        };
        getGroups = function(result) {
          var groups, palette;
          palette = new Rickshaw.Color.Palette("colorwheel");
          groups = {};
          _.map(result.data, function(res, idx) {
            return groups[res.label] = {
              selected: true,
              color: palette.color(),
              cqp: res.cqp
            };
          });
          return groups;
        };
        return getMarkers = function(result) {
          var markers;
          markers = {};
          _.map(result.data, function(res, idx) {
            var group, icon, k, len1, point, ref, results;
            group = s.groups[res.label];
            if (!group.selected) {
              return;
            }
            icon = {
              iconUrl: 'http://api.tiles.mapbox.com/v3/marker/pin-m+' + group.color.split("#")[1] + '.png'
            };
            ref = res.points;
            results = [];
            for (k = 0, len1 = ref.length; k < len1; k++) {
              point = ref[k];
              results.push((function(point) {
                var childScope, html, id;
                childScope = $rootScope.$new(true);
                childScope.point = point;
                childScope.cqp = res.cqp;
                childScope.label = res.label;
                id = point.name.replace(/-/g, "") + idx;
                markers[id] = {
                  layer: "clusterlayer",
                  icon: icon,
                  lat: point.lat,
                  lng: point.lng
                };
                html = '<div class="link" ng-click="newKWICSearch(\'' + point.name + '\')">' + point.name + '</div>';
                childScope.newKWICSearch = function(query) {
                  var cl, opts;
                  cl = settings.corpusListing.subsetFactory(result.corpora);
                  opts = {
                    start: 0,
                    end: 24,
                    ajaxParams: {
                      command: "query",
                      cqp: getCqpExpr(),
                      cqp2: "[_." + result.attribute + " contains " + "'" + [point.name, point.countryCode, point.lat, point.lng].join(";") + "']",
                      cqp3: res.cqp,
                      corpus: cl.stringifySelectedEncode(),
                      show_struct: util.encodeListParam(_.sortBy(_.keys(cl.getStructAttrs()))),
                      expand_prequeries: true,
                      within: "paragraph"
                    }
                  };
                  return $rootScope.kwicTabs.push({
                    readingMode: true,
                    queryParams: opts
                  });
                };
                markers[id].message = html;
                return markers[id].getMessageScope = function() {
                  return childScope;
                };
              })(point));
            }
            return results;
          });
          return markers;
        };
      }
    };
  });

  korpApp.controller("VideoCtrl", function($scope, $uibModal) {
    $scope.videos = [];
    $scope.open = function() {
      var modalInstance;
      return modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'markup/sidebar_video.html',
        controller: 'VideoInstanceCtrl',
        size: 'modal-lg',
        windowClass: 'video-modal-bootstrap',
        resolve: {
          items: function() {
            return $scope.videos;
          },
          startTime: function() {
            return $scope.startTime;
          },
          endTime: function() {
            return $scope.endTime;
          },
          fileName: function() {
            return $scope.fileName;
          },
          sentence: function() {
            return $scope.sentence;
          }
        }
      });
    };
    return $scope.startTime = 0;
  });

  korpApp.controller("VideoInstanceCtrl", function($scope, $compile, $timeout, $uibModalInstance, items, startTime, endTime, fileName, sentence) {
    var transformSeconds;
    $scope.fileName = fileName;
    $scope.sentence = sentence;
    transformSeconds = function(seconds) {
      var d, hours, mins, secs;
      d = moment.duration(seconds, 'seconds');
      hours = Math.floor(d.asHours());
      mins = Math.floor(d.asMinutes()) - hours * 60;
      secs = Math.floor(d.asSeconds()) - hours * 3600 - mins * 60;
      return hours + ":" + mins + ":" + secs;
    };
    if (startTime) {
      $scope.startTime = transformSeconds(startTime);
    }
    if (endTime) {
      $scope.endTime = transformSeconds(endTime);
    }
    $scope.init = function() {
      var k, len1, srcElem, video, videoData, videoElem;
      videoElem = angular.element("#korp-video");
      for (k = 0, len1 = items.length; k < len1; k++) {
        videoData = items[k];
        srcElem = angular.element('<source>');
        srcElem.attr('src', videoData.url);
        srcElem.attr('type', videoData.type);
        $compile(srcElem)($scope);
        videoElem.append(srcElem);
      }
      video = videoElem[0];
      video.addEventListener("durationchange", function() {
        video.currentTime = startTime;
        return video.play();
      });
      video.addEventListener("timeupdate", (function(_this) {
        return function() {
          if ($scope.pauseAfterEndTime && endTime && video.currentTime >= endTime) {
            video.pause();
            return $timeout((function() {
              return $scope.isPaused = true;
            }), 0);
          }
        };
      })(this));
      $scope.goToStartTime = function() {
        video.currentTime = startTime;
        $scope.isPaused = false;
        return video.play();
      };
      return $scope.continuePlay = function() {
        $scope.pauseAfterEndTime = false;
        $scope.isPaused = false;
        return video.play();
      };
    };
    $scope.isPaused = false;
    $scope.pauseAfterEndTime = true;
    return $scope.ok = function() {
      return $uibModalInstance.close();
    };
  });

  korpApp.directive("nameClassificationCtrl", function() {
    return {
      controller: function($scope, $location, utils, searches) {
        c.log("NameClassificationCtrl");
        $scope.name_class = $location.search().name_class != null;
        $scope.$watch((function() {
          return $location.search().name_class;
        }), function(val) {
          return $scope.name_class = Boolean(val);
        });
        return $scope.activate = function() {
          var search;
          c.log("NameClassificationCtrl.activate: $location", $location);
          search = searches.activeSearch;
          return $scope.instance.makeRequest(search.val, search.type);
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=result_controllers.js.map
