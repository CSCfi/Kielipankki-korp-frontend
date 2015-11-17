(function() {
  var added_corpora_ids,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.util = {};

  window.CorpusListing = (function() {
    function CorpusListing(corpora) {
      this.struct = corpora;
      this.corpora = _.values(corpora);
      this.selected = _.filter(this.corpora, function(corp) {
        return !corp.limited_access;
      });
    }

    CorpusListing.prototype.get = function(key) {
      return this.struct[key];
    };

    CorpusListing.prototype.list = function() {
      return this.corpora;
    };

    CorpusListing.prototype.map = function(func) {
      return _.map(this.corpora, func);
    };

    CorpusListing.prototype.subsetFactory = function(idArray) {
      var cl;
      idArray = _.invoke(idArray, "toLowerCase");
      cl = new CorpusListing(_.pick.apply(_, [this.struct].concat(__slice.call(idArray))));
      cl.selected = cl.corpora;
      return cl;
    };

    CorpusListing.prototype.getSelectedCorpora = function() {
      return corpusChooserInstance.corpusChooser("selectedItems");
    };

    CorpusListing.prototype.select = function(idArray) {
      return this.selected = _.values(_.pick.apply(this, [this.struct].concat(idArray)));
    };

    CorpusListing.prototype.mapSelectedCorpora = function(f) {
      return _.map(this.selected, f);
    };

    CorpusListing.prototype._mapping_intersection = function(mappingArray) {
      return _.reduce(mappingArray, (function(a, b) {
        var keys_intersect, to_mergea, to_mergeb;
        keys_intersect = _.intersection(_.keys(a), _.keys(b));
        to_mergea = _.pick.apply(_, [a].concat(__slice.call(keys_intersect)));
        to_mergeb = _.pick.apply(_, [b].concat(__slice.call(keys_intersect)));
        return _.merge({}, to_mergea, to_mergeb);
      }) || {});
    };

    CorpusListing.prototype._mapping_union = function(mappingArray) {
      return _.reduce(mappingArray, (function(a, b) {
        return _.merge(a, b);
      }), {});
    };

    CorpusListing.prototype.getCurrentAttributes = function() {
      var attrs;
      attrs = this.mapSelectedCorpora(function(corpus) {
        return corpus.attributes;
      });
      return this._invalidateAttrs(attrs);
    };

    CorpusListing.prototype.getCurrentAttributesIntersection = function() {
      var attrs;
      attrs = this.mapSelectedCorpora(function(corpus) {
        return corpus.attributes;
      });
      return this._mapping_intersection(attrs);
    };

    CorpusListing.prototype.getStructAttrsIntersection = function() {
      var attrs;
      attrs = this.mapSelectedCorpora(function(corpus) {
        var key, value, _ref;
        _ref = corpus.struct_attributes;
        for (key in _ref) {
          value = _ref[key];
          value["isStructAttr"] = true;
        }
        return corpus.struct_attributes;
      });
      return this._mapping_intersection(attrs);
    };

    CorpusListing.prototype.getStructAttrs = function() {
      var attrs, rest, withDataset;
      attrs = this.mapSelectedCorpora(function(corpus) {
        var key, pos_attrs, value, _ref;
        _ref = corpus.struct_attributes;
        for (key in _ref) {
          value = _ref[key];
          value["isStructAttr"] = true;
        }
        pos_attrs = _.pick(corpus.attributes, function(val, key) {
          return val.isStructAttr;
        });
        return _.extend({}, pos_attrs, corpus.struct_attributes);
      });
      rest = this._invalidateAttrs(attrs);
      withDataset = _.filter(_.pairs(rest), function(item) {
        return item[1].dataset;
      });
      $.each(withDataset, function(i, item) {
        var key, val;
        key = item[0];
        val = item[1];
        return $.each(attrs, function(j, origStruct) {
          var ds, _ref;
          if ((_ref = origStruct[key]) != null ? _ref.dataset : void 0) {
            ds = origStruct[key].dataset;
            if ($.isArray(ds)) {
              ds = _.object(ds, ds);
            }
            if (_.isArray(val.dataset)) {
              val.dataset = _.object(val.dataset, val.dataset);
            }
            return $.extend(val.dataset, ds);
          }
        });
      });
      return $.extend(rest, _.object(withDataset));
    };

    CorpusListing.prototype._invalidateAttrs = function(attrs) {
      var intersection, union;
      union = this._mapping_union(attrs);
      intersection = this._mapping_intersection(attrs);
      $.each(union, function(key, value) {
        if (intersection[key] == null) {
          return value["disabled"] = true;
        } else {
          return delete value["disabled"];
        }
      });
      return union;
    };

    CorpusListing.prototype.corpusHasAttr = function(corpus, attr) {
      return attr in $.extend({}, this.struct[corpus].attributes, this.struct[corpus].struct_attributes);
    };

    CorpusListing.prototype.stringifySelected = function() {
      return _(this.selected).pluck("id").invoke("toUpperCase").join(",");
    };

    CorpusListing.prototype.stringifyAll = function() {
      return _(this.corpora).pluck("id").invoke("toUpperCase").join(",");
    };

    CorpusListing.prototype.getAttrIntersection = function(attr) {
      var struct;
      struct = _.map(this.selected, function(corpus) {
        return _.keys(corpus[attr]);
      });
      return _.intersection.apply(null, struct);
    };

    CorpusListing.prototype.getAttrUnion = function(attr) {
      var struct;
      struct = _.map(this.selected, function(corpus) {
        return _.keys(corpus[attr]);
      });
      return _.union.apply(_, struct);
    };

    CorpusListing.prototype.minimizeDefaultAndCorpusQueryString = function(type, params) {
      var all_corpora, corp, corpname, corpora, corpval, default_corpora, default_val, lengths, lensum, maxval, nondefault_corpora, other_vals, val, value_corpora, _i, _j, _len, _len1, _ref, _ref1;
      if (!((params.corpus != null) && params[type])) {
        return params;
      }
      all_corpora = params.corpus.split(',');
      c.log('minimize', type, params.corpus, params['default' + type], params[type], params[type].length);
      default_val = params['default' + type];
      value_corpora = {};
      nondefault_corpora = [];
      _ref = params[type].split(',');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        corpval = _ref[_i];
        _ref1 = corpval.split(':'), corpname = _ref1[0], val = _ref1[1];
        if (value_corpora[val] == null) {
          value_corpora[val] = [];
        }
        value_corpora[val].push(corpname);
        nondefault_corpora.push(corpname);
      }
      default_corpora = _.difference(all_corpora, nondefault_corpora);
      value_corpora[default_val] = (value_corpora[default_val] || []).concat(default_corpora);
      lengths = [];
      for (val in value_corpora) {
        corpora = value_corpora[val];
        lensum = 0;
        for (_j = 0, _len1 = corpora.length; _j < _len1; _j++) {
          corp = corpora[_j];
          lensum += corp.length;
        }
        lengths.push({
          value: val,
          length: lensum + (corpora.length * (val.length + 6)) - (corpora.length === 1 ? 3 : 0)
        });
      }
      maxval = _.max(lengths, 'length').value;
      c.log('minimizing', type, value_corpora, lengths, maxval);
      if (maxval === default_val && default_corpora.length > 0) {
        return params;
      }
      params['default' + type] = maxval;
      other_vals = [];
      for (val in value_corpora) {
        corpora = value_corpora[val];
        if (val !== maxval) {
          other_vals = other_vals.concat([
            (function() {
              var _k, _len2, _results;
              _results = [];
              for (_k = 0, _len2 = corpora.length; _k < _len2; _k++) {
                corp = corpora[_k];
                _results.push(corp + ':' + val);
              }
              return _results;
            })()
          ]);
        }
      }
      params[type] = other_vals.join(',');
      c.log('minimized', type, params['default' + type], params[type], params[type].length);
      if (params[type] === '') {
        delete params[type];
      }
      return params;
    };

    CorpusListing.prototype.minimizeWithinQueryString = function(params) {
      return this.minimizeDefaultAndCorpusQueryString('within', params);
    };

    CorpusListing.prototype.minimizeContextQueryString = function(params) {
      return this.minimizeDefaultAndCorpusQueryString('context', params);
    };

    CorpusListing.prototype.getContextQueryString = function(prefer) {
      var context, contexts, corpus, output;
      output = (function() {
        var _i, _len, _ref, _results;
        _ref = this.selected;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          corpus = _ref[_i];
          contexts = _.keys(corpus.context);
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = contexts.length; _j < _len1; _j++) {
              context = contexts[_j];
              if (context && !(context in settings.defaultContext)) {
                _results1.push(corpus.id.toUpperCase() + ":" + context);
              } else {
                _results1.push(false);
              }
            }
            return _results1;
          })());
        }
        return _results;
      }).call(this);
      return _(output).flatten().compact().join();
    };

    CorpusListing.prototype.getWithinQueryString = function() {
      var corpus, output, prefer_within;
      prefer_within = search().within;
      if (prefer_within && !(prefer_within in settings.defaultWithin)) {
        output = (function() {
          var _i, _len, _ref, _results;
          _ref = this.selected;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            corpus = _ref[_i];
            if (prefer_within in corpus.within) {
              _results.push(corpus.id.toUpperCase() + ":" + prefer_within);
            } else {
              _results.push(false);
            }
          }
          return _results;
        }).call(this);
        return _(output).flatten().compact().join();
      } else {
        return null;
      }
    };

    CorpusListing.prototype.getMorphology = function() {
      return _(this.selected).map(function(corpus) {
        var morf;
        morf = corpus.morf || "saldom";
        return morf.split("|");
      }).flatten().unique().join("|");
    };

    CorpusListing.prototype.getTimeInterval = function() {
      var all;
      all = _(this.selected).pluck("time").filter(function(item) {
        return item != null;
      }).map(_.keys).flatten().map(Number).sort(function(a, b) {
        return a - b;
      }).value();
      return [_.first(all), _.last(all)];
    };

    CorpusListing.prototype.getMomentInterval = function() {
      var from, froms, infoGetter, to, toUnix, tos;
      toUnix = function(item) {
        return item.unix();
      };
      infoGetter = (function(_this) {
        return function(prop) {
          return _(_this.selected).pluck("info").pluck(prop).compact().map(function(item) {
            return moment(item);
          }).value();
        };
      })(this);
      froms = infoGetter("FirstDate");
      tos = infoGetter("LastDate");
      if (!froms.length) {
        from = null;
      } else {
        from = _.min(froms, toUnix);
      }
      if (!tos.length) {
        to = null;
      } else {
        to = _.max(tos, toUnix);
      }
      return [from, to];
    };

    CorpusListing.prototype.getNonProtected = function() {
      return _.filter(this.corpora, function(item) {
        return !item.limited_access;
      });
    };

    CorpusListing.prototype.getTitle = function(corpus) {
      var e;
      try {
        return this.struct[corpus].title;
      } catch (_error) {
        e = _error;
        return c.log("gettitle broken", corpus);
      }
    };

    CorpusListing.prototype.getAttributeGroups = function(lang) {
      var attrs, common, common_keys, key, obj, sent_attrs, word;
      word = {
        group: "word",
        value: "word",
        label: "word"
      };
      attrs = (function() {
        var _ref, _results;
        _ref = this.getCurrentAttributes(lang);
        _results = [];
        for (key in _ref) {
          obj = _ref[key];
          if (obj.displayType !== "hidden") {
            _results.push(_.extend({
              group: "word_attr",
              value: key
            }, obj));
          }
        }
        return _results;
      }).call(this);
      common_keys = _.compact(_.flatten(_.map(this.selected, function(corp) {
        return _.keys(corp.common_attributes);
      })));
      common = _.pick.apply(_, [settings.common_struct_types].concat(__slice.call(common_keys)));
      sent_attrs = (function() {
        var _ref, _results;
        _ref = _.extend({}, common, this.getStructAttrs(lang));
        _results = [];
        for (key in _ref) {
          obj = _ref[key];
          if (obj.displayType !== "hidden") {
            _results.push(_.extend({
              group: "sentence_attr",
              value: key
            }, obj));
          }
        }
        return _results;
      }).call(this);
      sent_attrs = _.sortBy(sent_attrs, function(item) {
        return util.getLocaleString(item.label);
      });
      return [word].concat(attrs, sent_attrs);
    };

    CorpusListing.prototype.getIgnoreBetweenTokens = function() {
      return _(this.selected).pluck("ignore_between_tokens_cqp").uniq().compact().value();
    };

    return CorpusListing;

  })();

  window.ParallelCorpusListing = (function(_super) {
    __extends(ParallelCorpusListing, _super);

    function ParallelCorpusListing(corpora) {
      ParallelCorpusListing.__super__.constructor.call(this, corpora);
    }

    ParallelCorpusListing.prototype.select = function(idArray) {
      this.selected = [];
      $.each(idArray, (function(_this) {
        return function(i, id) {
          var corp;
          corp = _this.struct[id];
          return _this.selected = _this.selected.concat(_this.getLinked(corp, true, false));
        };
      })(this));
      return this.selected = _.unique(this.selected);
    };

    ParallelCorpusListing.prototype.setActiveLangs = function(langlist) {
      return this.activeLangs = langlist;
    };

    ParallelCorpusListing.prototype.getCurrentAttributes = function(lang) {
      var corpora, struct;
      corpora = _.filter(this.selected, function(item) {
        return item.lang === lang;
      });
      struct = _.reduce(corpora, function(a, b) {
        return $.extend({}, a.attributes, b.attributes);
      }, {});
      return struct;
    };

    ParallelCorpusListing.prototype.getStructAttrs = function(lang) {
      var corpora, struct;
      corpora = _.filter(this.selected, function(item) {
        return item.lang === lang;
      });
      struct = _.reduce(corpora, function(a, b) {
        return $.extend({}, a.struct_attributes, b.struct_attributes);
      }, {});
      $.each(struct, function(key, val) {
        return val["isStructAttr"] = true;
      });
      return struct;
    };

    ParallelCorpusListing.prototype.getLinked = function(corp, andSelf, only_selected) {
      var output, target;
      if (andSelf == null) {
        andSelf = false;
      }
      if (only_selected == null) {
        only_selected = true;
      }
      target = only_selected ? this.selected : this.struct;
      output = _.filter(target, function(item) {
        var _ref;
        return _ref = item.id, __indexOf.call(corp.linked_to || [], _ref) >= 0;
      });
      if (andSelf) {
        output = [corp].concat(output);
      }
      return output;
    };

    ParallelCorpusListing.prototype.getEnabledByLang = function(lang, andSelf, flatten) {
      var corps, output;
      if (andSelf == null) {
        andSelf = false;
      }
      if (flatten == null) {
        flatten = true;
      }
      corps = _.filter(this.selected, function(item) {
        return item["lang"] === lang;
      });
      output = _(corps).map((function(_this) {
        return function(item) {
          return _this.getLinked(item, andSelf);
        };
      })(this)).value();
      if (flatten) {
        return _.flatten(output);
      } else {
        return output;
      }
    };

    ParallelCorpusListing.prototype.getLinksFromLangs = function(activeLangs) {
      var cps, lang, linked, main, other, output, _i, _j, _len, _len1, _ref;
      if (activeLangs.length === 1) {
        return this.getEnabledByLang(activeLangs[0], true, false);
      }
      main = _.filter(this.selected, function(corp) {
        return corp.lang === activeLangs[0];
      });
      output = [];
      _ref = activeLangs.slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lang = _ref[_i];
        other = _.filter(this.selected, function(corp) {
          return corp.lang === lang;
        });
        for (_j = 0, _len1 = other.length; _j < _len1; _j++) {
          cps = other[_j];
          linked = _(main).filter(function(mainCorpus) {
            var _ref1;
            return _ref1 = cps.id, __indexOf.call(mainCorpus.linked_to, _ref1) >= 0;
          }).value();
          output = output.concat(_.map(linked, function(item) {
            return [item, cps];
          }));
        }
      }
      return output;
    };

    ParallelCorpusListing.prototype.getAttributeQuery = function(attr) {
      var output, struct;
      struct = this.getLinksFromLangs(this.activeLangs);
      output = [];
      $.each(struct, function(i, corps) {
        var mainId, mainIsPivot, other, pair;
        mainId = corps[0].id.toUpperCase();
        mainIsPivot = !!corps[0].pivot;
        other = corps.slice(1);
        pair = _.map(other, function(corp) {
          var a;
          if (mainIsPivot) {
            a = _.keys(corp[attr])[0];
          } else {
            a = _.keys(corps[0][attr])[0];
          }
          return mainId + "|" + corp.id.toUpperCase() + ":" + a;
        });
        return output.push(pair);
      });
      return output.join(",");
    };

    ParallelCorpusListing.prototype.getContextQueryString = function() {
      return this.getAttributeQuery("context");
    };

    ParallelCorpusListing.prototype.getWithinQueryString = function() {
      return this.getAttributeQuery("within");
    };

    ParallelCorpusListing.prototype.stringifySelected = function(onlyMain) {
      var i, item, main, output, pair, struct, _i, _len;
      struct = this.getLinksFromLangs(this.activeLangs);
      if (onlyMain) {
        struct = _.map(struct, (function(_this) {
          return function(pair) {
            return _.filter(pair, function(item) {
              return item.lang === _this.activeLangs[0];
            });
          };
        })(this));
        return _(struct).flatten().pluck("id").invoke("toUpperCase").join(",");
      }
      c.log("struct", struct);
      output = [];
      for (i = _i = 0, _len = struct.length; _i < _len; i = ++_i) {
        item = struct[i];
        main = item[0];
        pair = _.map(item.slice(1), function(corp) {
          return main.id.toUpperCase() + "|" + corp.id.toUpperCase();
        });
        output.push(pair);
      }
      return output.join(",");
    };

    ParallelCorpusListing.prototype.getTitle = function(corpus) {
      return this.struct[corpus.split("|")[1]].title;
    };

    return ParallelCorpusListing;

  })(CorpusListing);

  settings.corpusListing = new CorpusListing(settings.corpora);

  window.applyTo = function(ctrl, f) {
    var s;
    s = getScope(ctrl);
    return s.$apply(f(s));
  };

  window.search = function(obj, val) {
    var ret, s;
    s = $("body").scope();
    ret = safeApply(s.$root, function() {
      if (!obj) {
        return s.$root.search();
      }
      if (_.isObject(obj)) {
        obj = _.extend({}, s.$root.search(), obj);
        return s.$root.search(obj);
      } else {
        return s.$root.search(obj, val);
      }
    });
    if (val === null) {
      onHashChange();
    }
    return ret;
  };

  window.initLocales = function() {
    var def, defs, lang, packages, pkg, prefix, _fn, _i, _j, _len, _len1, _ref;
    packages = ["locale", "corpora"];
    prefix = "translations";
    defs = [];
    window.loc_data = {};
    def = $.Deferred();
    _ref = settings.languages;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      lang = _ref[_i];
      loc_data[lang] = {};
      _fn = function(lang, pkg) {
        var file;
        file = pkg + "-" + lang + '.json';
        file = prefix + "/" + file;
        return defs.push($.ajax({
          url: file,
          dataType: "json",
          cache: false,
          success: function(data) {
            return _.extend(loc_data[lang], data);
          }
        }));
      };
      for (_j = 0, _len1 = packages.length; _j < _len1; _j++) {
        pkg = packages[_j];
        _fn(lang, pkg);
      }
    }
    $.when.apply($, defs).then(function() {
      return def.resolve(loc_data);
    });
    return def;
  };

  window.safeApply = function(scope, fn) {
    if (scope.$$phase || scope.$root.$$phase) {
      return fn(scope);
    } else {
      return scope.$apply(fn);
    }
  };

  window.util.setLogin = function() {
    var corp, _i, _len, _ref;
    $("body").toggleClass("logged_in not_logged_in");
    _ref = authenticationProxy.loginObj.credentials;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      corp = _ref[_i];
      $("#hpcorpus_" + (corp.toLowerCase())).closest(".boxdiv.disabled").removeClass("disabled");
    }
    if (window.corpusChooserInstance) {
      window.corpusChooserInstance.corpusChooser("updateAllStates");
    }
    $("#log_out .usrname").text(authenticationProxy.loginObj.name);
    return $(".err_msg", self).hide();
  };

  util.SelectionManager = function() {
    this.selected = $();
    this.aux = $();
  };

  util.SelectionManager.prototype.select = function(word, aux) {
    if ((word == null) || !word.length) {
      return;
    }
    if (this.selected.length) {
      this.selected.removeClass("word_selected token_selected");
      this.aux.removeClass("word_selected aux_selected");
    }
    this.selected = word;
    this.aux = aux || $();
    this.aux.addClass("word_selected aux_selected");
    return word.addClass("word_selected token_selected");
  };

  util.SelectionManager.prototype.deselect = function() {
    if (!this.selected.length) {
      return;
    }
    this.selected.removeClass("word_selected token_selected");
    this.selected = $();
    this.aux.removeClass("word_selected aux_selected");
    this.aux = $();
  };

  util.SelectionManager.prototype.hasSelected = function() {
    return this.selected.length > 0;
  };

  util.getLocaleString = function(key, lang) {
    var e;
    if (!lang) {
      lang = window.lang || settings.defaultLanguage || "sv";
    }
    try {
      return loc_data[lang][key] || key;
    } catch (_error) {
      e = _error;
      return key;
    }
  };

  util.localize = function(root) {
    root = root || "body";
    $(root).localize();
  };

  util.lemgramToString = function(lemgram, appendIndex) {
    var concept, infixIndex, match, type;
    lemgram = _.str.trim(lemgram);
    infixIndex = "";
    concept = lemgram;
    infixIndex = "";
    type = "";
    if (util.isLemgramId(lemgram)) {
      match = util.splitLemgram(lemgram);
      if ((appendIndex != null) && match.index !== "1") {
        infixIndex = $.format("<sup>%s</sup>", match.index);
      }
      concept = match.form.replace(/_/g, " ");
      type = match.pos.slice(0, 2);
    }
    return $.format("%s%s <span class='wordclass_suffix'>(<span rel='localize[%s]'>%s</span>)</span>", [concept, infixIndex, type, util.getLocaleString(type)]);
  };

  util.saldoRegExp = /(.*?)\.\.(\d\d?)(\:\d+)?$/;

  util.saldoToString = function(saldoId, appendIndex) {
    var infixIndex, match;
    match = saldoId.match(util.saldoRegExp);
    infixIndex = "";
    if ((appendIndex != null) && match[2] !== "1") {
      infixIndex = $.format("<sup>%s</sup>", match[2]);
    }
    return $.format("%s%s", [match[1].replace(/_/g, " "), infixIndex]);
  };

  util.sblexArraytoString = function(idArray, labelFunction) {
    labelFunction = labelFunction || util.lemgramToString;
    return _.map(idArray, function(lemgram) {
      return labelFunction(lemgram, true);
    });
  };

  util.lemgramRegexp = /\.\.\w+\.\d\d?(\:\d+)?$/;

  util.isLemgramId = function(lemgram) {
    return lemgram.search(util.lemgramRegexp) !== -1;
  };

  util.splitLemgram = function(lemgram) {
    var keys, splitArray;
    if (!util.isLemgramId(lemgram)) {
      throw new Error("Input to util.splitLemgram is not a lemgram: " + lemgram);
    }
    keys = ["morph", "form", "pos", "index", "startIndex"];
    splitArray = lemgram.match(/((\w+)--)?(.*?)\.\.(\w+)\.(\d\d?)(\:\d+)?$/).slice(2);
    return _.object(keys, splitArray);
  };

  util.splitSaldo = function(saldo) {
    return saldo.match(util.saldoRegExp);
  };

  util.setDownloadLinks = function(xhr_settings, result_data) {
    var corpus_id, corpus_ids, download_params, format, get_corpus_num, i, j, link_id, result_corpora, result_corpora_settings;
    if (!((xhr_settings != null) && (result_data != null) && (result_data.corpus_order != null) && (result_data.kwic != null))) {
      c.log('failed to do setDownloadLinks');
      return;
    }
    get_corpus_num = function(hit_num) {
      return result_data.corpus_order.indexOf(result_data.kwic[hit_num].corpus);
    };
    c.log('setDownloadLinks data:', result_data);
    $('#download-links').empty();
    result_corpora = result_data.corpus_order.slice(get_corpus_num(0), get_corpus_num(result_data.kwic.length - 1) + 1);
    result_corpora_settings = {};
    i = 0;
    while (i < result_corpora.length) {
      corpus_ids = result_corpora[i].toLowerCase().split('|');
      j = 0;
      while (j < corpus_ids.length) {
        corpus_id = corpus_ids[j];
        result_corpora_settings[corpus_id] = settings.corpora[corpus_id];
        j++;
      }
      i++;
    }
    i = 0;
    while (i < settings.downloadFormats.length) {
      format = settings.downloadFormats[i];
      link_id = format + '-link';
      $('#download-links').append('<a href="javascript:" ' + ' id="' + link_id + '"' + ' title="' + format + '"' + ' rel="localize[formatdescr_' + format + ']"' + ' class="download_link"><img src="img/' + format + '.png" alt="' + format.toUpperCase() + '" /></a>');
      download_params = {
        query_params: JSON.stringify($.deparam.querystring(xhr_settings.url)),
        format: format,
        korp_url: window.location.href,
        korp_server_url: settings.cgi_script,
        corpus_config: JSON.stringify(result_corpora_settings),
        corpus_config_info_keys: (settings.corpusExtraInfoItems || []).join(','),
        urn_resolver: settings.urnResolver
      };
      if ('downloadFormatParams' in settings) {
        if ('*' in settings.downloadFormatParams) {
          $.extend(download_params, settings.downloadFormatParams['*']);
        }
        if (format in settings.downloadFormatParams) {
          $.extend(download_params, settings.downloadFormatParams[format]);
        }
      }
      $('#' + link_id).click((function(params) {
        return function(e) {
          $.generateFile(settings.download_cgi_script, params);
          e.preventDefault();
        };
      })(download_params));
      i++;
    }
    $('#download-links').localize();
    $('#download-links').show();
    $('#download-links-container').show();
  };

  util.searchHash = function(type, value) {
    search({
      search: type + "|" + value,
      page: 0
    });
  };

  added_corpora_ids = [];

  util.loadCorporaFolderRecursive = function(first_level, folder) {
    var cont, folder_descr, format_licence_type, outHTML, usedid, val;
    format_licence_type = function(corpus_id) {
      var licence_type;
      licence_type = settings.corpora[corpus_id]["licence_type"];
      if (licence_type) {
        return " [" + licence_type.toUpperCase() + "]";
      } else {
        return "";
      }
    };
    outHTML = void 0;
    if (first_level) {
      outHTML = "<ul>";
    } else {
      folder_descr = (folder.description || "") + (folder.info && settings.corpusExtraInfo ? (folder.description ? "<br/><br/>" : "") + util.formatCorpusExtraInfo(folder.info, settings.corpusExtraInfo.corpus_infobox) : "");
      outHTML = "<ul title=\"" + folder.title + "\" description=\"" + escape(folder_descr) + "\">";
    }
    if (folder) {
      $.each(folder, function(fol, folVal) {
        if (fol !== "contents" && fol !== "title" && fol !== "description" && fol !== "info") {
          outHTML += "<li>" + util.loadCorporaFolderRecursive(false, folVal) + "</li>";
        }
      });
      if (folder["contents"] && folder["contents"].length > 0) {
        $.each(folder.contents, function(key, value) {
          outHTML += "<li id=\"" + value + "\">" + settings.corpora[value]["title"] + format_licence_type(value) + "</li>";
          added_corpora_ids.push(value);
        });
      }
    }
    if (first_level) {
      for (val in settings.corpora) {
        cont = false;
        for (usedid in added_corpora_ids) {
          if (added_corpora_ids[usedid] === val || settings.corpora[val].hide) {
            cont = true;
          }
        }
        if (cont) {
          continue;
        }
        outHTML += "<li id='" + val + "'>" + (settings.corpora[val].title + format_licence_type(val)) + "</li>";
      }
    }
    outHTML += "</ul>";
    return outHTML;
  };

  util.prettyNumbers = function(numstring) {
    var outStrNum, regex;
    regex = /(\d+)(\d{3})/;
    outStrNum = numstring.toString();
    while (regex.test(outStrNum)) {
      outStrNum = outStrNum.replace(regex, "$1" + "<span rel=\"localize[util_numbergroupseparator]\">" + util.getLocaleString("util_numbergroupseparator") + "</span>" + "$2");
    }
    return outStrNum;
  };

  util.suffixedNumbers = function(num) {
    var out;
    out = "";
    if (num < 1000) {
      out = num.toString();
    } else if ((1000 <= num && num < 1e6)) {
      out = (num / 1000).toFixed(2).toString() + "K";
    } else if ((1e6 <= num && num < 1e9)) {
      out = (num / 1e6).toFixed(2).toString() + "M";
    } else if ((1e9 <= num && num < 1e12)) {
      out = (num / 1e9).toFixed(2).toString() + "G";
    } else if (1e12 <= num) {
      out = (num / 1e12).toFixed(2).toString() + "T";
    }
    return out.replace(".", "<span rel=\"localize[util_decimalseparator]\">" + util.getLocaleString("util_decimalseparator") + "</span>");
  };

  util.loadCorpora = function() {
    var outStr, selected;
    added_corpora_ids = [];
    outStr = util.loadCorporaFolderRecursive(true, settings.corporafolders);
    window.corpusChooserInstance = $("#corpusbox").corpusChooser({
      template: outStr,
      infoPopup: function(corpusID) {
        var baseLang, baseLangSentenceHTML, baseLangTokenHTML, baseLangs, corpusExtraInfo, corpusObj, lang, lastUpdate, maybeInfo, numSentences, numTokens, output, sentenceString, supportsContext, _i, _len, _ref;
        corpusObj = settings.corpora[corpusID];
        maybeInfo = "";
        if (corpusObj.description) {
          maybeInfo = "<br/><br/>" + corpusObj.description;
        }
        corpusExtraInfo = settings.corpusExtraInfo ? util.formatCorpusExtraInfo(corpusObj, settings.corpusExtraInfo.corpus_infobox) : void 0;
        if (corpusExtraInfo) {
          maybeInfo += (maybeInfo ? "<br/><br/>" : "") + corpusExtraInfo;
        }
        numTokens = corpusObj.info.Size;
        baseLangTokenHTML = "";
        baseLangSentenceHTML = "";
        baseLangs = (_ref = settings.corpora[corpusID]) != null ? _ref.linked_to : void 0;
        if (baseLangs) {
          lang = " (" + util.getLocaleString(settings.corpora[corpusID].lang) + ")";
          for (_i = 0, _len = baseLangs.length; _i < _len; _i++) {
            baseLang = baseLangs[_i];
            baseLangTokenHTML += "" + (util.getLocaleString("corpselector_numberoftokens")) + ": <b>" + (util.prettyNumbers(settings.corpora[baseLang].info.Size)) + "\n</b> (" + (util.getLocaleString(settings.corpora[baseLang].lang)) + ")<br/>";
            baseLangSentenceHTML += "" + (util.getLocaleString("corpselector_numberofsentences")) + ": <b>" + (util.prettyNumbers(settings.corpora[baseLang].info.Sentences)) + "\n</b> (" + (util.getLocaleString(settings.corpora[baseLang].lang)) + ")<br/>";
          }
        } else {
          lang = "";
        }
        numSentences = corpusObj["info"]["Sentences"];
        lastUpdate = corpusObj["info"]["Updated"];
        if (!lastUpdate) {
          lastUpdate = "?";
        }
        sentenceString = "-";
        if (numSentences) {
          sentenceString = util.prettyNumbers(numSentences.toString());
        }
        output = "<b>\n    <img class=\"popup_icon\" src=\"img/korp_icon.png\" />\n    " + corpusObj.title + "\n</b>\n" + maybeInfo + "\n<br/><br/>" + baseLangTokenHTML + "\n" + (util.getLocaleString("corpselector_numberoftokens")) + ":\n<b>" + (util.prettyNumbers(numTokens)) + "</b>" + lang + "\n<br/>" + baseLangSentenceHTML + "\n" + (util.getLocaleString("corpselector_numberofsentences")) + ": \n<b>" + sentenceString + "</b>" + lang + "\n<br/>\n" + (util.getLocaleString("corpselector_lastupdate")) + ": \n<b>" + lastUpdate + "</b>\n<br/><br/>";
        supportsContext = _.keys(corpusObj.context).length > 1;
        if (supportsContext) {
          output += $("<div>").localeKey("corpselector_supports").html() + "<br>";
        }
        if (corpusObj.limited_access) {
          output += $("<div>").localeKey("corpselector_limited").html();
        }
        return output;
      },
      infoPopupFolder: function(indata) {
        var corporaID, desc, glueString, maybeInfo, missingSentenceData, totalSentences, totalSentencesString, totalTokens;
        corporaID = indata.corporaID;
        desc = indata.description;
        totalTokens = 0;
        totalSentences = 0;
        missingSentenceData = false;
        $(corporaID).each(function(key, oneID) {
          var oneCorpusSentences;
          totalTokens += parseInt(settings.corpora[oneID]["info"]["Size"]);
          oneCorpusSentences = settings.corpora[oneID]["info"]["Sentences"];
          if (oneCorpusSentences) {
            totalSentences += parseInt(oneCorpusSentences);
          } else {
            missingSentenceData = true;
          }
        });
        totalSentencesString = util.prettyNumbers(totalSentences.toString());
        if (missingSentenceData) {
          totalSentencesString += "+";
        }
        maybeInfo = "";
        if (desc && desc !== "") {
          maybeInfo = desc + "<br/><br/>";
        }
        glueString = "";
        if (corporaID.length === 1) {
          glueString = util.getLocaleString("corpselector_corporawith_sing");
        } else {
          glueString = util.getLocaleString("corpselector_corporawith_plur");
        }
        return "<b><img src=\"img/folder.png\" style=\"margin-right:4px; vertical-align:middle; margin-top:-1px\"/>" + indata.title + "</b><br/><br/>" + maybeInfo + "<b>" + corporaID.length + "</b> " + glueString + ":<br/><br/><b>" + util.prettyNumbers(totalTokens.toString()) + "</b> " + util.getLocaleString("corpselector_tokens") + "<br/><b>" + totalSentencesString + "</b> " + util.getLocaleString("corpselector_sentences");
      }
    }).bind("corpuschooserchange", function(evt, corpora) {
      c.log("corpuschooserchange", corpora);
      safeApply($("body").scope(), function(scope) {
        scope.$broadcast("corpuschooserchange", corpora);
      });
    });
    selected = corpusChooserInstance.corpusChooser("selectedItems");
    settings.corpusListing.select(selected);
  };

  window.regescape = function(s) {
    return s.replace(/[\.|\?|\+|\*|\|\'|\"\(\)\^\$]/g, "\\$&");
  };

  util.localizeFloat = function(float, nDec) {
    var lang, sep;
    lang = $("#languages").radioList("getSelected").data("lang");
    sep = null;
    nDec = nDec || float.toString().split(".")[1].length;
    if (lang === "sv") {
      sep = ",";
    } else {
      if (lang === "en") {
        sep = ".";
      }
    }
    return $.format("%." + nDec + "f", float).replace(".", sep);
  };

  util.formatDecimalString = function(x, mode, statsmode, stringOnly) {
    var decimalSeparator, parts;
    if (_.contains(x, ".")) {
      parts = x.split(".");
      decimalSeparator = util.getLocaleString("util_decimalseparator");
      if (stringOnly) {
        return parts[0] + decimalSeparator + parts[1];
      }
      if (mode) {
        return util.prettyNumbers(parts[0]) + "<span rel=\"localize[util_decimalseparator]\">" + decimalSeparator + "</span>" + parts[1];
      } else {
        return util.prettyNumbers(parts[0]) + decimalSeparator + parts[1];
      }
    } else {
      if (statsmode) {
        return x;
      } else {
        return util.prettyNumbers(x);
      }
    }
  };

  util.makeAttrSelect = function(groups) {
    var arg_select;
    arg_select = $("<select/>");
    $.each(groups, function(lbl, group) {
      var optgroup;
      if ($.isEmptyObject(group)) {
        return;
      }
      optgroup = $("<optgroup/>", {
        label: util.getLocaleString(lbl).toLowerCase(),
        rel: $.format("localize[%s]", lbl)
      }).appendTo(arg_select);
      $.each(group, function(key, val) {
        if (val.displayType === "hidden") {
          return;
        }
        $("<option/>", {
          rel: $.format("localize[%s]", val.label)
        }).val(key).text(util.getLocaleString(val.label) || "").appendTo(optgroup).data("dataProvider", val);
      });
    });
    return arg_select;
  };

  util.browserWarn = function() {
    $.reject({
      reject: {
        msie5: true,
        msie6: true,
        msie7: true,
        msie8: true,
        msie9: true
      },
      imagePath: "img/browsers/",
      display: ["firefox", "chrome", "safari", "opera"],
      browserInfo: {
        firefox: {
          text: "Firefox",
          url: "http://www.mozilla.com/firefox/"
        },
        safari: {
          text: "Safari",
          url: "http://www.apple.com/safari/download/"
        },
        opera: {
          text: "Opera",
          url: "http://www.opera.com/download/"
        },
        chrome: {
          text: "Chrome",
          url: "http://www.google.com/chrome/"
        },
        msie: {
          text: "Internet Explorer",
          url: "http://www.microsoft.com/windows/Internet-explorer/"
        }
      },
      header: "Du använder en omodern webbläsare",
      paragraph1: "Korp använder sig av moderna webbteknologier som inte stödjs av din webbläsare. En lista på de mest populära moderna alternativen visas nedan. Firefox rekommenderas varmt.",
      paragraph2: "",
      closeMessage: "Du kan fortsätta ändå – all funktionalitet är densamma – men så fort du önskar att Korp vore snyggare och snabbare är det bara att installera Firefox, det tar bara en minut.",
      closeLink: "Stäng varningen",
      closeCookie: true,
      cookieSettings: {
        path: "/",
        expires: 100000
      }
    });
  };

  util.convertLMFFeatsToObjects = function(structure, key) {
    var dArr, output, theType;
    if (structure != null) {
      output = null;
      theType = util.findoutType(structure);
      if (theType === "object") {
        output = {};
        $.each(structure, function(inkey, inval) {
          var innerType, keyName;
          if (inkey === "feat") {
            innerType = util.findoutType(inval);
            if (innerType === "array") {
              $.each(inval, function(fkey, fval) {
                var keyName;
                keyName = "feat_" + fval["att"];
                if (output[keyName] == null) {
                  output[keyName] = fval["val"];
                } else {
                  if ($.isArray(output[keyName])) {
                    output[keyName].push(fval["val"]);
                  } else {
                    output[keyName] = [output[keyName], fval["val"]];
                  }
                }
              });
            } else {
              keyName = "feat_" + inval["att"];
              if (output[keyName] == null) {
                output[keyName] = inval["val"];
              } else {
                if ($.isArray(output[keyName])) {
                  output[keyName].push(inval["val"]);
                } else {
                  output[keyName] = [output[keyName], inval["val"]];
                }
              }
            }
          } else {
            output[inkey] = util.convertLMFFeatsToObjects(inval);
          }
        });
      } else if (theType === "array") {
        dArr = new Array();
        $.each(structure, function(inkey, inval) {
          dArr.push(util.convertLMFFeatsToObjects(inval));
        });
        output = dArr;
      } else {
        output = structure;
      }
      return output;
    } else {
      return null;
    }
  };

  util.findoutType = function(variable) {
    if ($.isArray(variable)) {
      return "array";
    } else {
      return typeof variable;
    }
  };

  util.formatCorpusExtraInfo = function(corpusObj) {
    var getUrnOrUrl, i, info_item, info_items, info_obj, label, link_info, makeLinkItem, result;
    info_items = arguments.length > 1 && arguments[1] ? arguments[1] : (settings.corpusExtraInfoItems != null) || [];
    getUrnOrUrl = function(obj) {
      var prefix;
      prefix = arguments.length > 1 ? arguments[1] : '';
      if (prefix + 'urn' in obj) {
        return settings.urnResolver + obj[prefix + 'urn'];
      } else {
        return obj[prefix + 'url'];
      }
    };
    makeLinkItem = function(link_info) {
      var result;
      result = '';
      if (link_info.label) {
        result += link_info.label + ': ';
      }
      if (link_info.url) {
        result += '<a href=\'' + link_info.url + '\' target=\'_blank\'' + (link_info.tooltip ? ' title=\'' + link_info.tooltip + '\'' : '') + '>' + link_info.text + '</a>';
      } else if (link_info.text) {
        if (link_info.tooltip) {
          result += '<span class=\'has_hover_text\' title=\'' + link_info.tooltip + '\'>' + link_info.text + '</span>';
        } else {
          result += link_info.text;
        }
      }
      return result;
    };
    result = '';
    i = 0;
    while (i < info_items.length) {
      info_item = info_items[i];
      link_info = {};
      label = '';
      label = '<span rel=\'localize[corpus_' + info_item + ']\'>' + 'Corpus ' + info_item + '</span>';
      if (info_item === 'urn' && corpusObj.urn) {
        link_info = {
          url: settings.urnResolver + corpusObj.urn,
          text: corpusObj.urn,
          label: label
        };
      } else if (info_item === 'homepage' && !('homepage' in corpusObj) && corpusObj.url) {
        link_info = {
          url: corpusObj.url,
          text: label
        };
      } else if (corpusObj[info_item]) {
        info_obj = corpusObj[info_item];
        link_info = {
          url: getUrnOrUrl(info_obj)
        };
        if (info_obj.name) {
          link_info.text = info_obj.name;
          if (!info_obj.no_label) {
            link_info.label = label;
          }
        } else {
          link_info.text = label;
        }
        if (info_obj.description) {
          link_info.tooltip = info_obj.description;
        }
      } else if (corpusObj[info_item + '_urn'] || corpusObj[info_item + '_url']) {
        link_info = {
          url: getUrnOrUrl(corpusObj, info_item + '_'),
          text: label
        };
      }
      if (link_info.url || link_info.text) {
        if (result) {
          result += '<br/>';
        }
        result += makeLinkItem(link_info);
      }
      i++;
    }
    return result;
  };

  util.copyCorpusInfoToConfig = function(corpusObj) {
    var added_properties, corpusInfo, i, info_key_prefix, info_key_sects, info_subkeys, item, j, key, sect, sect_name, subkey, subobj, value;
    info_key_sects = (function() {
      var _i, _len, _ref, _results;
      _ref = settings.corpusExtraInfoItems;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item !== 'urn') {
          _results.push(item.charAt(0).toUpperCase() + item.slice(1));
        }
      }
      return _results;
    })();
    info_key_sects.push('');
    info_subkeys = ['Name', 'Description', 'URN', 'URL'];
    corpusInfo = corpusObj.info;
    i = 0;
    while (i < info_key_sects.length) {
      sect = info_key_sects[i];
      sect_name = sect.toLowerCase();
      subobj = corpusObj;
      if (sect !== '') {
        subobj = sect_name in corpusObj ? corpusObj[sect_name] : {};
      }
      info_key_prefix = sect + (sect === '' ? '' : '_');
      added_properties = false;
      j = 0;
      while (j < info_subkeys.length) {
        key = info_subkeys[j];
        subkey = key.toLowerCase();
        value = corpusInfo[info_key_prefix + key];
        if (value) {
          subobj[subkey] = value;
          added_properties = true;
        }
        j++;
      }
      if (sect !== '' && added_properties) {
        corpusObj[sect_name] = subobj;
      }
      i++;
    }
  };

  util.propagateCorpusFolderInfo = function(corpusFolder, info) {
    var addCorpusInfo, i, prop_name;
    addCorpusInfo = function(corpusConfig, info) {
      var prop_name;
      for (prop_name in info) {
        if (!(prop_name in corpusConfig)) {
          corpusConfig[prop_name] = info[prop_name];
        }
      }
    };
    if (corpusFolder.info) {
      info = $.extend(true, {}, info || {}, corpusFolder.info);
    }
    if (info) {
      corpusFolder.info = info;
    }
    if (info && corpusFolder.contents) {
      i = 0;
      while (i < corpusFolder.contents.length) {
        addCorpusInfo(settings.corpora[corpusFolder.contents[i]], info);
        i++;
      }
    }
    for (prop_name in corpusFolder) {
      if (prop_name !== 'title' && prop_name !== 'description' && prop_name !== 'contents' && prop_name !== 'info') {
        c.log('propagate ', prop_name);
        util.propagateCorpusFolderInfo(corpusFolder[prop_name], info);
      }
    }
  };

  util.initCorpusSettingsLinkAttrs = function() {
    var corpus;
    for (corpus in settings.corpora) {
      util.extractLinkAttrs(settings.corpora[corpus]);
    }
    return null;
  };

  util.extractLinkAttrs = function(corpusInfo) {
    var extractLinkAttrs, link_attrs;
    extractLinkAttrs = function(attrs, link_attrs) {
      var attr, attrname, _results;
      if (attrs != null) {
        _results = [];
        for (attrname in attrs) {
          attr = attrs[attrname];
          if (attr.type === "url" && (attr.url_opts != null) && attr.url_opts.in_link_section) {
            if (attr._link_attr) {
              _results.push(link_attrs[attrname] = attr._link_attr);
            } else {
              link_attrs[attrname] = $.extend(true, {}, attr);
              attrs[attrname].displayType = "hidden";
              _results.push(attrs[attrname]._link_attr = link_attrs[attrname]);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    link_attrs = {};
    extractLinkAttrs(corpusInfo.attributes, link_attrs);
    extractLinkAttrs(corpusInfo.struct_attributes, link_attrs);
    corpusInfo.link_attributes = link_attrs;
    return null;
  };

  util.initCorpusSettingsSyntheticAttrs = function() {
    var corpus;
    for (corpus in settings.corpora) {
      util.setSyntheticAttrsInfo(settings.corpora[corpus]);
    }
  };

  util.setSyntheticAttrsInfo = function(corpusInfo) {
    var attrtype, setSyntheticAttrs;
    setSyntheticAttrs = function(attrs, synthetic_list) {
      var attr, attrname;
      if (attrs !== void 0) {
        for (attrname in attrs) {
          attr = attrs[attrname];
          if (attr.synthetic && attr.displayType !== 'hidden') {
            synthetic_list.push(attrname);
          }
        }
      }
    };
    corpusInfo.synthetic_attr_names = {
      attributes: [],
      struct_attributes: [],
      link_attributes: []
    };
    for (attrtype in corpusInfo.synthetic_attr_names) {
      setSyntheticAttrs(corpusInfo[attrtype], corpusInfo.synthetic_attr_names[attrtype]);
    }
  };

  util.mapHashCorpusAliases = function() {
    var corpus, getUrlParam, mapCorpusAliasList, orig_corpus;
    getUrlParam = function(name) {
      var matches, param_re;
      param_re = RegExp("\\b" + name + "=([^&;]*)");
      matches = window.location.hash.match(param_re);
      if ((matches != null) && matches.length > 1) {
        return matches[1];
      } else {
        return null;
      }
    };
    mapCorpusAliasList = function(corpus) {
      return _.map(corpus.split(","), function(corpus_id) {
        return settings.corpus_aliases[corpus_id] || corpus_id;
      });
    };
    if (settings.corpus_aliases != null) {
      orig_corpus = getUrlParam("corpus");
      if (orig_corpus) {
        corpus = mapCorpusAliasList(orig_corpus);
        if (corpus !== orig_corpus) {
          window.location.hash = window.location.hash.replace("corpus=" + orig_corpus, "corpus=" + corpus);
        }
      }
    }
  };

  util.initCorpusSettingsAttrDisplayOrder = function() {
    var corpus;
    for (corpus in settings.corpora) {
      util.setAttrDisplayOrder(settings.corpora[corpus]);
    }
  };

  util.setAttrDisplayOrder = function(corpusInfo) {
    var attr_name, attr_names, attr_type, index, order, pattern, result, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
    _ref = ["attributes", "struct_attributes", "link_attributes"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attr_type = _ref[_i];
      order = ((_ref1 = corpusInfo.sidebar_display_order) != null ? _ref1[attr_type] : void 0) || ((_ref2 = settings.default_sidebar_display_order) != null ? _ref2[attr_type] : void 0);
      if (order) {
        attr_names = _.keys(corpusInfo[attr_type]);
        result = [];
        for (_j = 0, _len1 = order.length; _j < _len1; _j++) {
          pattern = order[_j];
          if ($.type(pattern === "regexp")) {
            index = 0;
            for (_k = 0, _len2 = attr_names.length; _k < _len2; _k++) {
              attr_name = attr_names[_k];
              if (attr_name.match(pattern)) {
                result.push(attr_name);
                attr_names[index] = "";
              }
              index += 1;
            }
          } else if ($.type(pattern === "string")) {
            index = $.inArray(pattern, attr_names);
            if (index !== -1) {
              result.push(attr_names[index]);
              attr_names[index] = "";
            }
          }
        }
        for (_l = 0, _len3 = attr_names.length; _l < _len3; _l++) {
          attr_name = attr_names[_l];
          if (attr_name !== "") {
            result.push(attr_name);
          }
        }
        if (!corpusInfo._sidebar_display_order) {
          corpusInfo._sidebar_display_order = {};
        }
        corpusInfo._sidebar_display_order[attr_type] = result.reverse();
      }
    }
  };

  util.addIgnoreCQPBetweenTokens = function(cqp) {
    var ignore_cqps, insertBetweenCQPTokens;
    insertBetweenCQPTokens = function(base_cqp, insert_cqp) {
      var cqp_tokens, insert_cqp_lpar, last_token_num, result, token, token_num;
      cqp_tokens = base_cqp.match(/\[([^\]\"\']*("([^\\\"]|\\.)*"|'([^\\\']|\\.)*'))*[^\]\"\']*\]|([^\[]+)/g);
      last_token_num = _(cqp_tokens).map(function(token) {
        return token.charAt(0) === '[';
      }).lastIndexOf(true);
      insert_cqp_lpar = " " + insert_cqp + ")";
      result = (function() {
        var _i, _len, _results;
        _results = [];
        for (token_num = _i = 0, _len = cqp_tokens.length; _i < _len; token_num = ++_i) {
          token = cqp_tokens[token_num];
          if (token.charAt(0) === '[' && token_num < last_token_num) {
            _results.push("(" + token + insert_cqp_lpar);
          } else {
            _results.push(token);
          }
        }
        return _results;
      })();
      return result.join("");
    };
    ignore_cqps = settings.corpusListing.getIgnoreBetweenTokens();
    c.log("ignore_cqps", ignore_cqps);
    if (ignore_cqps.length === 1) {
      return insertBetweenCQPTokens(cqp, ignore_cqps[0]);
    } else {
      return cqp;
    }
  };

  settings.common_struct_types = {
    date_interval: {
      label: "date_interval",
      displayType: "date_interval",
      opts: false,
      extended_template: '<div class="date_interval_arg_type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Från </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Till </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
      controller: [
        "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
          var cl, getTime, getYear, s, updateIntervals, _ref, _ref1, _ref2;
          s = $scope;
          cl = settings.corpusListing;
          updateIntervals = function() {
            var from, moments, to, _ref, _ref1;
            moments = cl.getMomentInterval();
            if (moments.length) {
              return _ref = _.invoke(moments, "toDate"), s.minDate = _ref[0], s.maxDate = _ref[1], _ref;
            } else {
              _ref1 = cl.getTimeInterval(), from = _ref1[0], to = _ref1[1];
              s.minDate = moment(from.toString(), "YYYY").toDate();
              return s.maxDate = moment(to.toString(), "YYYY").toDate();
            }
          };
          s.$on("corpuschooserchange", function() {
            return updateIntervals();
          });
          updateIntervals();
          s.from_click = function(event) {
            event.originalEvent.preventDefault();
            return event.originalEvent.stopPropagation();
          };
          c.log("model", s.model);
          getYear = function(val) {
            return moment(val.toString(), "YYYYMMDD").toDate();
          };
          getTime = function(val) {
            c.log("getTime", val, moment(val.toString(), "HHmmss").toDate());
            return moment(val.toString(), "HHmmss").toDate();
          };
          if (!s.model) {
            s.from_date = s.minDate;
            s.to_date = s.maxDate;
            _ref = _.invoke(cl.getMomentInterval(), "toDate"), s.from_time = _ref[0], s.to_time = _ref[1];
          } else if (s.model.length === 4) {
            _ref1 = _.map(s.model.slice(0, 3), getYear), s.from_date = _ref1[0], s.to_date = _ref1[1];
            _ref2 = _.map(s.model.slice(2), getTime), s.from_time = _ref2[0], s.to_time = _ref2[1];
          }
          return s.$watchGroup(["combined", "combined2"], function(_arg) {
            var combined, combined2;
            combined = _arg[0], combined2 = _arg[1];
            c.log("combined", combined);
            c.log("combined2", combined2);
            s.model = [moment(s.from_date).format("YYYYMMDD"), moment(s.to_date).format("YYYYMMDD"), moment(s.from_time).format("HHmmss"), moment(s.to_time).format("HHmmss")];
            return c.log("s.model", s.model);
          });
        }
      ]
    }
  };

}).call(this);
