(function() {
  var Sidebar;

  Sidebar = {
    _init: function() {},
    updateContent: function(sentenceData, wordData, corpus, tokens) {
      var corpusObj, formattedCorpusInfo, posData, ref, ref1, sentence, token_data, word;
      this.element.html("<div id=\"selected_sentence\" />\n<div id=\"selected_word\" />\n<div id=\"deptree_link\" />\n<div id=\"selected_links\" />");
      corpusObj = settings.corpora[corpus];
      formattedCorpusInfo = (typeof settings !== "undefined" && settings !== null ? settings.corpusExtraInfo : void 0) ? util.formatCorpusExtraInfo(corpusObj, {
        info_items: (ref = settings.corpusExtraInfo) != null ? ref.sidebar : void 0,
        item_paragraphs: true
      }) : "";
      if (formattedCorpusInfo) {
        formattedCorpusInfo = "<br/>" + formattedCorpusInfo;
      }
      $("<div />").html("<h4 rel='localize[corpus]'></h4> <p>" + corpusObj.title + "</p><div id='sidebar-corpus-info'>" + formattedCorpusInfo + "</div>").prependTo("#selected_sentence");
      token_data = {
        pos_attrs: wordData,
        struct_attrs: sentenceData,
        tokens: tokens
      };
      if (!$.isEmptyObject(corpusObj.attributes)) {
        $("#selected_word").append($("<h4>").localeKey("word_attr"));
        posData = this.renderCorpusContent("pos", wordData, sentenceData, corpusObj.attributes, tokens, corpusObj.synthetic_attr_names.attributes, token_data);
        $("#selected_word").append(posData);
      }
      if (!$.isEmptyObject(corpusObj.struct_attributes)) {
        $("#selected_sentence").append($("<h4>").localeKey("sentence_attr"));
        this.renderCorpusContent("struct", wordData, sentenceData, corpusObj.struct_attributes, tokens, corpusObj.synthetic_attr_names.struct_attributes, token_data).appendTo("#selected_sentence");
      }
      if (!$.isEmptyObject(corpusObj.custom_attributes)) {
        ref1 = this.renderCustomContent(wordData, sentenceData, corpusObj.custom_attributes, tokens), word = ref1[0], sentence = ref1[1];
        word.appendTo("#selected_word");
        sentence.appendTo("#selected_sentence");
      }
      if (!$.isEmptyObject(corpusObj.link_attributes)) {
        this.renderCorpusContent("link", wordData, sentenceData, corpusObj.link_attributes, tokens, corpusObj.synthetic_attr_names.link_attributes, token_data).appendTo("#selected_links");
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
      }).appendTo("#deptree_link");
    },
    renderCorpusContent: function(type, wordData, sentenceData, corpus_attrs, tokens, synthetic_attr_names, token_data) {
      var base, item, items, j, k, key, len, len1, pairs, ref, ref1, synthetic, val, value;
      if (type === "struct" || type === "link") {
        pairs = _.pairs(sentenceData);
      } else if (type === "pos") {
        pairs = _.pairs(wordData);
        ref = wordData._struct || [];
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          key = item.substring(0, item.indexOf(" "));
          val = item.substring(item.indexOf(" ") + 1);
          if (key in corpus_attrs) {
            pairs.push([key, val]);
          }
        }
      }
      pairs = _.filter(pairs, function(arg) {
        var key, val;
        key = arg[0], val = arg[1];
        return corpus_attrs[key];
      });
      pairs.sort(function(arg, arg1) {
        var a, b, ord1, ord2;
        a = arg[0];
        b = arg1[0];
        ord1 = corpus_attrs[a].order;
        ord2 = corpus_attrs[b].order;
        if (ord1 === ord2) {
          return 0;
        }
        if (!ord1) {
          return 1;
        }
        if (!ord2) {
          return -1;
        } else {
          return ord2 - ord1;
        }
      });
      items = [];
      for (k = 0, len1 = pairs.length; k < len1; k++) {
        ref1 = pairs[k], key = ref1[0], value = ref1[1];
        items = items.concat(typeof (base = this.renderItem(key, value, corpus_attrs[key], wordData, sentenceData, token_data, tokens)).get === "function" ? base.get(0) : void 0);
      }
      items = _.compact(items);
      if (synthetic_attr_names.length) {
        synthetic = (function() {
          var l, len2, results;
          results = [];
          for (l = 0, len2 = synthetic_attr_names.length; l < len2; l++) {
            key = synthetic_attr_names[l];
            results.push(this.renderItem(key, null, corpus_attrs[key], wordData, sentenceData, tokens, token_data));
          }
          return results;
        }).call(this);
        items = items.concat(synthetic);
      }
      return $(items);
    },
    renderCustomContent: function(wordData, sentenceData, corpus_attrs, tokens) {
      var attrs, key, output, pos_items, struct_items;
      struct_items = [];
      pos_items = [];
      for (key in corpus_attrs) {
        attrs = corpus_attrs[key];
        output = this.renderItem(key, null, attrs, wordData, sentenceData, tokens);
        if (attrs.customType === "struct") {
          struct_items.push(output);
        } else if (attrs.customType === "pos") {
          pos_items.push(output);
        }
      }
      return [$(pos_items), $(struct_items)];
    },
    renderItem: function(key, value, attrs, wordData, sentenceData, tokens, token_data) {
      var address, attrSettings, class_attr, encodeHtmlEntities, getStringVal, idx, inner, itr, j, k, karpLink, l, len, len1, len2, li, link_text, lis, mapViaDataset, outerIdx, output, pattern, prefix, prob, ref, ref1, ref2, ref3, ref4, ref5, showAll, showOne, str_value, subValue, subValues, taginfo_url, target, ul, url, url_opts, val, valueArray, x;
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
      if (((ref = attrs.displayType) === "hidden" || ref === "date_interval") || attrs.displayOnly === "search" || attrs.hideSidebar) {
        return "";
      }
      if (attrs.type === "url" && (attrs != null ? (ref1 = attrs.url_opts) != null ? ref1.hide_url : void 0 : void 0)) {
        if (value === "") {
          return "";
        }
        output = $("<p></p>");
      } else if (attrs.label) {
        output = $("<p><span rel='localize[" + attrs.label + "]'></span>: </p>");
      } else {
        output = $("<p></p>");
      }
      if (attrs.renderItem) {
        return output.append(attrs.renderItem(key, value, attrs, wordData, sentenceData, tokens));
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
      if (attrs.type === "set" && attrs.taginfo_url) {
        output.append("<a href='" + attrs.taginfo_url + "' target='_blank'>\n    <span id='sidbar_info' class='ui-icon ui-icon-info'></span>\n</a>");
      }
      if (attrs.type === "set" && ((ref3 = attrs.display) != null ? ref3.expandList : void 0)) {
        valueArray = _.filter((value != null ? value.split("|") : void 0) || [], Boolean);
        attrSettings = attrs.display.expandList;
        if (attrs.ranked) {
          valueArray = _.map(valueArray, function(value) {
            var val;
            val = value.split(":");
            return [val[0], val[val.length - 1]];
          });
          lis = [];
          for (outerIdx = j = 0, len = valueArray.length; j < len; outerIdx = ++j) {
            ref4 = valueArray[outerIdx], value = ref4[0], prob = ref4[1];
            li = $("<li></li>");
            subValues = attrSettings.splitValue ? attrSettings.splitValue(value) : [value];
            for (idx = k = 0, len1 = subValues.length; k < len1; idx = ++k) {
              subValue = subValues[idx];
              val = (attrs.stringify || attrSettings.stringify || _.identity)(subValue);
              inner = $("<span>" + val + "</span>");
              if (attrs.internalSearch && (attrSettings.linkAllValues || outerIdx === 0)) {
                inner.data("key", subValue);
                inner.addClass("link").click(function() {
                  var cqpExpr, cqpVal, searchKey;
                  searchKey = attrSettings.searchKey || key;
                  cqpVal = $(this).data("key");
                  cqpExpr = attrSettings.internalSearch ? attrSettings.internalSearch(searchKey, cqpVal) : "[" + searchKey + " contains '" + cqpVal + "']";
                  return search({
                    "search": "cqp|" + cqpExpr
                  });
                });
              }
              if (attrs.externalSearch) {
                address = _.template(attrs.externalSearch, {
                  val: subValue
                });
                karpLink = $("<a href='" + address + "' class='external_link' target='_blank' style='margin-top: -6px'></a>");
              }
              li.append(inner);
              if (attrSettings.joinValues && idx !== subValues.length - 1) {
                li.append(attrSettings.joinValues);
              }
            }
            li.append("<span class='prob'> (" + prob + ")</span>");
            if (karpLink) {
              li.append(karpLink);
            }
            lis.push(li);
          }
        } else {
          lis = [];
          for (l = 0, len2 = valueArray.length; l < len2; l++) {
            value = valueArray[l];
            li = $("<li></li>");
            li.append(value);
            lis.push(li);
          }
        }
        if (lis.length === 0) {
          ul = $('<i rel="localize[empty]" style="color : grey"></i>');
        } else {
          ul = $("<ul class='hide-prob' style='list-style:initial'>");
          ul.append(lis);
          if (lis.length !== 1) {
            _.map(lis, function(li, idx) {
              if (idx !== 0) {
                return li.css('display', 'none');
              }
            });
            showAll = $("<span class='link' rel='localize[complemgram_show_all]'></span><span> (" + (lis.length - 1) + ")</span>");
            ul.append(showAll);
            showOne = $("<span class='link' rel='localize[complemgram_show_one]'></span>");
            showOne.css("display", "none");
            ul.append(showOne);
            showAll.click(function() {
              showAll.css("display", "none");
              showOne.css("display", "inline");
              ul.removeClass("hide-prob");
              return _.map(lis, function(li) {
                return li.css("display", "list-item");
              });
            });
            showOne.click(function() {
              showAll.css("display", "inline");
              showOne.css("display", "none");
              ul.addClass("hide-prob");
              return _.map(lis, function(li, i) {
                if (i !== 0) {
                  return li.css("display", "none");
                }
              });
            });
          }
        }
        output.append(ul);
        return output;
      } else if (attrs.type === "set") {
        pattern = attrs.pattern || '<span data-key="<%= key %>"><%= val %></span>';
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
          var len3, m, results;
          results = [];
          for (m = 0, len3 = itr.length; m < len3; m++) {
            x = itr[m];
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
            if (attrs.internalSearch) {
              inner.addClass("link").click(function() {
                var cqpVal;
                cqpVal = $(this).data("key");
                return search({
                  "search": "cqp|[" + key + " contains '" + cqpVal + "']"
                });
              });
            }
            li = $("<li></li>").data("key", x).append(inner);
            if (attrs.externalSearch) {
              address = _.template(attrs.externalSearch, {
                val: x
              });
              li.append($("<a href='" + address + "' class='external_link' target='_blank'></a>"));
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
        if (!str_value && (attrs != null ? (ref5 = attrs.url_opts) != null ? ref5.hide_url : void 0 : void 0)) {
          return "";
        }
        url_opts = attrs.url_opts || {};
        target = url_opts.new_window ? " target='_blank'" : "";
        class_attr = "class='exturl sidebar_" + (url_opts.hide_url ? "link" : "url") + "'";
        if (url_opts.stringify_link) {
          return output.append(attrs.url_opts.stringify_link(key, str_value, attrs, "" + class_attr + target));
        }
        url = (attrs.url_prefix || "") + str_value;
        link_text = url_opts.hide_url ? "<span rel='localize[" + attrs.label + "]'>" + key + "</span>" : decodeURI(str_value);
        return output.append("<a href='" + url + "' " + class_attr + target + ">" + link_text + "</a>");
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

//# sourceMappingURL=widgets.js.map
