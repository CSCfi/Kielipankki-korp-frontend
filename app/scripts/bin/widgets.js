(function() {
  var Sidebar;

  Sidebar = {
    options: {
      displayOrder: ["pos", "posset", "lemma", "lex", "saldo", "variants"].reverse()
    },
    _init: function() {},
    updateContent: function(sentenceData, wordData, corpus, tokens) {
      var corpusObj, formattedCorpusInfo, ref, ref1, ref2, ref3, ref4, sentence, token_data, word;
      this.element.html('<div id="selected_sentence" /><div id="selected_word" /><div id="selected_links" />');
      corpusObj = settings.corpora[corpus];
      formattedCorpusInfo = (typeof settings !== "undefined" && settings !== null ? settings.corpusExtraInfo : void 0) ? util.formatCorpusExtraInfo(corpusObj, (ref = settings.corpusExtraInfo) != null ? ref.sidebar : void 0) : "";
      if (formattedCorpusInfo) {
        formattedCorpusInfo = "<br/>" + formattedCorpusInfo;
      }
      $("<div />").html("<h4 rel='localize[corpus]'></h4> <p>" + corpusObj.title + "</p><p id='sidebar-corpus-info'>" + formattedCorpusInfo + "</p>").prependTo("#selected_sentence");
      token_data = {
        pos_attrs: wordData,
        struct_attrs: sentenceData,
        tokens: tokens
      };
      if (!$.isEmptyObject(corpusObj.attributes)) {
        $("#selected_word").append($("<h4>").localeKey("word_attr"));
        this.renderCorpusContent("pos", wordData, sentenceData, corpusObj.attributes, corpusObj.synthetic_attr_names.attributes, token_data, (ref1 = corpusObj._sidebar_display_order) != null ? ref1.attributes : void 0).appendTo("#selected_word");
      }
      if (!$.isEmptyObject(corpusObj.struct_attributes)) {
        $("#selected_sentence").append($("<h4>").localeKey("sentence_attr"));
        this.renderCorpusContent("struct", wordData, sentenceData, corpusObj.struct_attributes, corpusObj.synthetic_attr_names.struct_attributes, token_data, (ref2 = corpusObj._sidebar_display_order) != null ? ref2.struct_attributes : void 0).appendTo("#selected_sentence");
      }
      if (!$.isEmptyObject(corpusObj.custom_attributes)) {
        ref3 = this.renderCustomContent(wordData, sentenceData, corpusObj.custom_attributes), word = ref3[0], sentence = ref3[1];
        word.appendTo("#selected_word");
        sentence.appendTo("#selected_sentence");
      }
      if (!$.isEmptyObject(corpusObj.link_attributes)) {
        this.renderCorpusContent("link", wordData, sentenceData, corpusObj.link_attributes, corpusObj.synthetic_attr_names.link_attributes, token_data, (ref4 = corpusObj._sidebar_display_order) != null ? ref4.link_attributes : void 0).appendTo("#selected_links");
      }
      this.element.localize();
      this.applyEllipse();
      if (corpusObj.attributes.deprel) {
        return this.renderGraph(tokens);
      }
    },
    renderGraph: function(tokens) {
      var outerW;
      outerW = $(window).width() - 80;
      return $("<span class='link show_deptree'>Visa träd</button>").localeKey("show_deptree").click(function() {
        var iframe, info;
        info = $("<span class='info' />");
        iframe = $('<iframe src="lib/deptrees/deptrees.html"></iframe>').css("width", outerW - 40).load(function() {
          var wnd;
          wnd = this.contentWindow;
          tokens = tokens;
          return wnd.draw_deptree.call(wnd, tokens, function(msg) {
            var ref, type, val;
            ref = _.head(_.pairs(msg)), type = ref[0], val = ref[1];
            return info.empty().append($("<span>").localeKey(type), $("<span>: </span>"), $("<span>").localeKey(type + "_" + val));
          });
        });
        return $("#deptree_popup").empty().append(info, iframe).dialog({
          height: 300,
          width: outerW
        }).parent().find(".ui-dialog-title").localeKey("dep_tree");
      }).appendTo(this.element);
    },
    renderCorpusContent: function(type, wordData, sentenceData, corpus_attrs, synthetic_attr_names, token_data, attr_order) {
      var i, item, items, key, len, order, pairs, ref, ref1, synthetic, val, value;
      if (type === "struct" || type === "link") {
        pairs = _.pairs(sentenceData);
      } else if (type === "pos") {
        pairs = _.pairs(wordData);
        ref = wordData._struct || [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          ref1 = item.split(/ (.+)/, 2), key = ref1[0], val = ref1[1];
          if (key in corpus_attrs) {
            pairs.push([key, val]);
          }
        }
      }
      order = attr_order || this.options.displayOrder;
      pairs.sort(function(arg, arg1) {
        var a, b;
        a = arg[0];
        b = arg1[0];
        return $.inArray(b, order) - $.inArray(a, order);
      });
      items = (function() {
        var j, len1, ref2, results;
        results = [];
        for (j = 0, len1 = pairs.length; j < len1; j++) {
          ref2 = pairs[j], key = ref2[0], value = ref2[1];
          if (corpus_attrs[key]) {
            results.push(this.renderItem(key, value, corpus_attrs[key], wordData, sentenceData, token_data));
          }
        }
        return results;
      }).call(this);
      if (synthetic_attr_names.length) {
        synthetic = (function() {
          var j, len1, results;
          results = [];
          for (j = 0, len1 = synthetic_attr_names.length; j < len1; j++) {
            key = synthetic_attr_names[j];
            results.push(this.renderItem(key, null, corpus_attrs[key], wordData, sentenceData, token_data));
          }
          return results;
        }).call(this);
        items = items.concat(synthetic);
      }
      return $(items);
    },
    renderCustomContent: function(wordData, sentenceData, corpus_attrs) {
      var attrs, key, output, pos_items, struct_items;
      struct_items = [];
      pos_items = [];
      for (key in corpus_attrs) {
        attrs = corpus_attrs[key];
        output = this.renderItem(key, null, attrs, wordData, sentenceData);
        if (attrs.custom_type === "struct") {
          struct_items.push(output);
        } else if (attrs.custom_type === "pos") {
          pos_items.push(output);
        }
      }
      return [$(pos_items), $(struct_items)];
    },
    renderItem: function(key, value, attrs, wordData, sentenceData, token_data) {
      var address, encodeHtmlEntities, getStringVal, inner, itr, li, link_text, lis, mapViaDataset, output, pattern, prefix, ref, ref1, ref2, str_value, taginfo_url, target, ul, url, url_opts, val, valueArray, x;
      encodeHtmlEntities = function(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
      mapViaDataset = function(value) {
        if ((attrs.dataset != null) && !_.isArray(attrs.dataset)) {
          return attrs.dataset[value] || value;
        } else {
          return value;
        }
      };
      if (((ref = attrs.displayType) === "hidden" || ref === "date_interval") || attrs.displayOnly === "search") {
        return "";
      }
      if (attrs.type === "url" && (attrs != null ? (ref1 = attrs.url_opts) != null ? ref1.hide_url : void 0 : void 0)) {
        if (value === "") {
          return "";
        }
        output = $("<p></p>");
      } else {
        output = $("<p><span rel='localize[" + attrs.label + "]'></span>: </p>");
      }
      output.data("attrs", attrs);
      if (value == null) {
        value = "";
      }
      if ((value === "|" || value === "") && !((attrs.translationKey != null) && (((ref2 = attrs.dataset) != null ? ref2[value] : void 0) != null)) && (attrs.stringify_synthetic == null)) {
        output.append("<i rel='localize[empty]' style='color : grey'>${util.getLocaleString('empty')}</i>");
        return output;
      }
      if (attrs.transform != null) {
        value = attrs.transform(value);
      }
      if (attrs.type === "set") {
        if (attrs.taginfo_url) {
          output.append("<a href='" + attrs.taginfo_url + "' target='_blank'>\n    <span id='sidbar_info' class='ui-icon ui-icon-info'></span>\n</a>");
        }
        pattern = attrs.pattern || '<span data-key="<% key %>"><%= val %></span>';
        ul = $("<ul>");
        getStringVal = function(str) {
          return _.reduce(_.invoke(_.invoke(str, "charCodeAt", 0), "toString"), function(a, b) {
            return a + b;
          });
        };
        valueArray = _.filter((value != null ? value.split("|") : void 0) || [], Boolean);
        if (key === "variants") {
          valueArray.sort(function(a, b) {
            var splita, splitb, strvala, strvalb;
            splita = util.splitLemgram(a);
            splitb = util.splitLemgram(b);
            strvala = getStringVal(splita.form) + splita.index + getStringVal(splita.pos);
            strvalb = getStringVal(splitb.form) + splitb.index + getStringVal(splitb.pos);
            return parseInt(strvala) - parseInt(strvalb);
          });
        }
        itr = _.isArray(valueArray) ? valueArray : _.values(valueArray);
        lis = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = itr.length; i < len; i++) {
            x = itr[i];
            if (!x.length) {
              continue;
            }
            val = (attrs.stringify || encodeHtmlEntities)(x);
            inner = $(_.template(pattern, {
              key: x,
              val: val
            }));
            if (attrs.translationKey != null) {
              prefix = attrs.translationKey || "";
              val = mapViaDataset(val);
              inner.localeKey(prefix + val);
            }
            li = $("<li></li>").data("key", x).append(inner);
            if (attrs.externalSearch) {
              address = _.template(attrs.externalSearch, {
                val: x
              });
              li.append($("<a href='" + address + "' class='external_link' target='_blank'></a>")).click(function(event) {
                return event.stopImmediatePropagation();
              });
            }
            if (attrs.internalSearch) {
              li.addClass("link").click(function() {
                var cqpVal;
                cqpVal = $(this).data("key");
                return search({
                  "search": "cqp|[" + key + " contains '" + cqpVal + "']"
                });
              });
            }
            results.push(li);
          }
          return results;
        })();
        ul.append(lis);
        output.append(ul);
        return output;
      }
      str_value = attrs.stringify_synthetic ? attrs.stringify_synthetic(token_data) : (attrs.stringify || encodeHtmlEntities)(value);
      if (attrs.type === "url") {
        url_opts = attrs.url_opts || {};
        target = url_opts.new_window ? " target='_blank'" : "";
        if (url_opts.stringify_link) {
          return output.append(attrs.url_opts.stringify_link(key, str_value, attrs, "class='exturl sidebar_url'" + target));
        }
        url = (attrs.url_prefix || "") + str_value;
        link_text = url_opts.hide_url ? "<span rel='localize[" + attrs.label + "]'>" + key + "</span>" : decodeURI(str_value);
        return output.append("<a href='" + url + "' class='exturl sidebar_url'" + target + ">" + link_text + "</a>");
      } else if (attrs.taginfo_url || (key === "msd" && attrs.taginfo_url !== "")) {
        taginfo_url = attrs.taginfo_url || "markup/msdtags.html";
        return output.append("<span class='msd_sidebar'>" + str_value + "</span>\n    <a href='" + taginfo_url + "' target='_blank'>\n        <span id='sidbar_info' class='ui-icon ui-icon-info'></span>\n    </a>\n</span>");
      } else if (attrs.pattern) {
        return output.append(_.template(attrs.pattern, {
          key: key,
          val: str_value,
          pos_attrs: wordData,
          struct_attrs: sentenceData
        }));
      } else {
        if (attrs.translationKey != null) {
          str_value = mapViaDataset(str_value);
          return output.append("<span rel='localize[" + attrs.translationKey + str_value + "]'></span>");
        } else {
          return output.append("<span>" + (str_value || '') + "</span>");
        }
      }
    },
    applyEllipse: function() {
      var totalWidth;
      totalWidth = this.element.width();
      return this.element.find(".sidebar_url").css("white-space", "nowrap").each(function() {
        var a, domain, midsection, oldtext, results;
        results = [];
        while ($(this).width() > totalWidth) {
          oldtext = $(this).text();
          a = _.str.trim(oldtext, "/").replace("...", "").split("/");
          domain = a.slice(2, 3);
          midsection = a.slice(3).join("/");
          midsection = "..." + midsection.slice(2);
          $(this).text(["http:/"].concat(domain, midsection).join("/"));
          if (midsection === "...") {
            break;
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
    },
    refreshContent: function(mode) {
      if (mode === "lemgramWarning") {
        return $.Deferred((function(_this) {
          return function(dfd) {
            return _this.element.load("markup/parse_warning.html", function() {
              util.localize();
              _this.element.addClass("ui-state-highlight").removeClass("kwic_sidebar");
              return dfd.resolve();
            });
          };
        })(this)).promise();
      } else {
        return this.element.removeClass("ui-state-highlight").addClass("kwic_sidebar");
      }
    },
    updatePlacement: function() {
      var max;
      max = Math.round($("#columns").position().top);
      if ($(window).scrollTop() < max) {
        return this.element.removeClass("fixed");
      } else {
        if ($("#left-column").height() > $("#sidebar").height()) {
          return this.element.addClass("fixed");
        }
      }
    }
  };

  $.widget("korp.sidebar", Sidebar);

  $.widget("korp.radioList", {
    options: {
      change: $.noop,
      separator: "|",
      selected: "default"
    },
    _create: function() {
      var self;
      this._super();
      self = this;
      $.each(this.element, function() {
        return $(this).children().wrap("<li />").click(function() {
          if (!$(this).is(".radioList_selected")) {
            self.select($(this).data("mode"));
            return self._trigger("change", $(this).data("mode"));
          }
        }).parent().prepend($("<span>").text(self.options.separator)).wrapAll("<ul class='inline_list' />");
      });
      this.element.find(".inline_list span:first").remove();
      return this.select(this.options.selected);
    },
    select: function(mode) {
      var target;
      this.options.selected = mode;
      target = this.element.find("a").filter(function() {
        return $(this).data("mode") === mode;
      });
      this.element.find(".radioList_selected").removeClass("radioList_selected");
      this.element.find(target).addClass("radioList_selected");
      return this.element;
    },
    getSelected: function() {
      return this.element.find(".radioList_selected");
    }
  });

}).call(this);
