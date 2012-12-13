var view = {};




//**************
// Search view objects
//**************

view.lemgramSort = function(first, second) {
	var match1 = util.splitLemgram(first);
	var match2 = util.splitLemgram(second);
	if(match1.form == match2.form)
		return parseInt(match1.index) - parseInt(match2.index);
	return first.length - second.length;
};

view.saldoSort = function(first, second) {
	var match1 = util.splitSaldo(first);
	var match2 = util.splitSaldo(second);
	if(match1[1] == match2[1])
		return parseInt(match1[2]) - parseInt(match2[2]);
	return first.length - second.length;
};

view.updateSearchHistory = function(value) {
	var searches = $.jStorage.get("searches") || [];
	function filterParam(url) {
		return $.grep($.param.fragment(url).split("&"), function(item) {
			return item.split("=")[0] == "search" || item.split("=")[0] == "corpus";
		}).join("&");
	}
	var searchLocations = $.map(searches, function(item) {
		return filterParam(item.location);
	});
	if(value != null && $.inArray(filterParam(location.href), searchLocations) == -1) {
		searches.splice(0, 0, {label : value, location : location.href});
		$.jStorage.set("searches", searches);
	}

	if(!searches.length) return;
	var opts = $.map(searches, function(item) {
		var output = $("<option />", {value : item.location}).text(item.label).get(0);
		return output;
	});
	var placeholder = $("<option>").localeKey("search_history").get(0);
	$("#search_history").html([placeholder].concat(opts));
};
view.enableSearch = function(bool) {
	if(bool) {
		$("#search-tab").tabs("enable").removeClass("ui-state-disabled").uncover();
	} else {
		$("#search-tab").tabs("disable").addClass("ui-state-disabled").cover();
	}

};

view.initSearchOptions = function() {
	var selects = $("#search_options > div:first select").customSelect();
	view.updateReduceSelect();
	$("#search_options select").each(function() {
		var state = $.bbq.getState($(this).data("history"));
		if(!!state) {
			$(this).val(state)
			.change();
		} else {
			$(this).prop("selectedIndex", 0)
			.change();
		}
	});


	$("#search_options").css("background-color", settings.primaryLight)
	.change(function(event) {
		simpleSearch.enableSubmit();
		extendedSearch.enableSubmit();
		advancedSearch.enableSubmit();
		var target = $(event.target);

		var state = {};
		state[target.data("history")] = target.val();
		if(target.prop("selectedIndex") != 0)
			$.bbq.pushState(state);
		else
			$.bbq.removeState(target.data("history"));
	});

};

view.updateContextSelect = function(withinOrContext) {
	var intersect = settings.corpusListing.getAttrIntersection(withinOrContext);
	var union = settings.corpusListing.getAttrUnion(withinOrContext);
	var opts = $("." + withinOrContext + "_select option");
	opts.data('locSuffix', null).attr("disabled", null).removeClass("limited");
		// all support enhanced context
	if(union.length > intersect.length) {
		// partial support for enhanced context
		opts.each(function() {
			if($.inArray($(this).attr("value"), intersect) == -1) {
				$(this).addClass("limited").data("locSuffix", "asterix")

			}

		});


	} else if(union.length == 1 && intersect.length == 1) {
		// no support

		opts.each(function() {
			if($.inArray($(this).attr("value"), intersect) != -1)
				$(this).attr("disabled", null);
			else
				$(this).attr("disabled", "disabled").parent().val("sentence").change();
		});
	}
	$("." + withinOrContext + "_select").localize();
};

view.updateReduceSelect = function() {
	var groups = $.extend({
		word : {
			word : {label : "word"},
			word_insensitive : {label : "word_insensitive"}
		}},
		{
		"word_attr" : settings.corpusListing.getCurrentAttributes(),
		"sentence_attr" : $.grepObj(settings.corpusListing.getStructAttrs(), function(val, key) {
							 if(val.displayType == "date_interval") return false;
							 return val.disabled !== true;
						  })
		});
	var prevVal = $("#reduceSelect select").val();
	var select = util.makeAttrSelect(groups);
	$("#reduceSelect").html(select);
	c.log("updateReduceSelect", groups, select);

	select.attr("data-history", "stats_reduce")
	.attr("data-prefix", "reduce_text")
	.customSelect();
	if(prevVal) {
		select.val(prevVal);
		select.trigger("change");
	}
	return select;
};

var BaseSearch = {
	initialize : function(mainDivId) {
		this.$main = $(mainDivId);
		this.$main.find("#sendBtn:submit").click($.proxy(this.onSubmit, this));
		this._enabled = true;
	},

	refreshSearch : function() {
		$.bbq.removeState("search");
		$(window).trigger("hashchange");
	},

	onSubmit : function() {
		this.refreshSearch();
	},

	isVisible : function() {
		return this.$main.is(":visible");
	},
	isEnabled : function() {
		return this._enabled;
	},
	enableSubmit : function() {
		this._enabled = true;
		this.$main.find("#sendBtn").attr("disabled", false);
	},

	disableSubmit : function() {
		this._enabled = false;
		this.$main.find("#sendBtn").attr("disabled", "disabled");
	}
};

view.BaseSearch = new Class(BaseSearch);
delete BaseSearch;

var SimpleSearch = {
	Extends : view.BaseSearch,
	initialize : function(mainDivId) {
		this.parent(mainDivId);
		$("#similar_lemgrams").css("background-color", settings.primaryColor);
		var self = this;
		$("#simple_text").keyup($.proxy(this.onSimpleChange, this));
		this.onSimpleChange();
		$("#similar_lemgrams").hide();
		this.savedSelect = null;
		var textinput = $("#simple_text").bind("keydown.autocomplete", function(event) {
			var keyCode = $.ui.keyCode;
			if(!self.isVisible() || $("#ui-active-menuitem").length !== 0) return;

			switch(event.keyCode) {
			case keyCode.ENTER:
				if($("#search-tab").data("cover") == null)
					self.onSubmit();
				break;
			}
		});
		if(settings.autocomplete)
			textinput.korp_autocomplete({
				type : "lem",
				select : $.proxy(this.selectLemgram, this),
				middleware : function(request, idArray) {
					var dfd = $.Deferred();
					lemgramProxy.lemgramCount(idArray, self.isSearchPrefix(), self.isSearchSuffix()).done(function(freqs) {
						delete freqs["time"];
						if(currentMode == "law") {
							idArray = _.filter(idArray, function(item) {
								return item in freqs;
							});
						}
						var has_morphs = settings.corpusListing.getMorphology().split("|").length > 1;
						if(has_morphs) {
							idArray.sort(function(a, b) {
								var first = a.split("--").length > 1 ? a.split("--")[0] : "saldom";
								var second = b.split("--").length > 1 ? b.split("--")[0] : "saldom";
								if(first == second) return (freqs[b] || 0) - (freqs[a] || 0);
								return second < first;

							});
						} else {
							idArray.sort(function(first, second) {
								return (freqs[second] || 0) - (freqs[first] || 0);
							});
						}

						var labelArray = util.sblexArraytoString(idArray, util.lemgramToString);
						var listItems = $.map(idArray, function(item, i) {
							var out = {
								label : labelArray[i],
								value : item,
								input : request.term,
								enabled : item in freqs
							};
							if(has_morphs)
								out["category"] = item.split("--").length > 1 ? item.split("--")[0] : "saldom";
							return out;
						});

						dfd.resolve(listItems);
					})
					.fail(function() {
						c.log("reject");
						dfd.reject();
						textinput.preloader("hide");
					});
					return dfd.promise();
				},
				"sw-forms" : false
			});

		$("#prefixChk, #suffixChk, #caseChk").click(function() {
			if($("#simple_text").attr("placeholder") && $("#simple_text").text() == "" ) {
				self.enableSubmit();
			} else {
				self.onSimpleChange();
			}
		});

		$("#keyboard").click(function() {
			c.log("click", arguments);
			$("#char_table").toggle("slide", {direction : "up"}, "fast");

		});
		$("#char_table td").click(function() {
			$("#simple_text").val($("#simple_text").val() + $(this).text());
		});
	},

	isSearchPrefix : function() {
		return $("#prefixChk").is(":checked");
	},
	isSearchSuffix : function() {
		return $("#suffixChk").is(":checked");
	},

	makeLemgramSelect : function(lemgram) {
		var self = this;

		var promise = $("#simple_text").data("promise")
			|| lemgramProxy.karpSearch(lemgram || $("#simple_text").val(), false);

		promise.done(function(lemgramArray) {
			$("#lemgram_select").prev("label").andSelf().remove();
			self.savedSelect = null;
			if(lemgramArray.length == 0) return;
			lemgramArray.sort(view.lemgramSort);
			lemgramArray = $.map(lemgramArray, function(item) {
				return {label : util.lemgramToString(item, true), value : item};
			});
			var select = self.buildLemgramSelect(lemgramArray)
			.appendTo("#korp-simple")
			.addClass("lemgram_select")
			.prepend(
				$("<option>").localeKey("none_selected")
			)
			.change(function() {
				if(this.selectedIndex != 0) {
					self.savedSelect = lemgramArray;
					self.selectLemgram($(this).val());
				}
				$(this).prev("label").andSelf().remove();
			});

			select.get(0).selectedIndex = 0;

			var label = $("<label />", {"for" : "lemgram_select"})
			.html($.format("<i>%s</i> <span rel='localize[autocomplete_header]'>%s</span>",
					[$("#simple_text").val(), util.getLocaleString("autocomplete_header")]
			))
			.css("margin-right", 8);
			select.before( label );
		});
	},

	onSubmit : function() {
		this.parent();
		$("#simple_text").korp_autocomplete("abort");
		if($("#simple_text").val() != "")
			util.searchHash("word", $("#simple_text").val());
		else if($("#simple_text").attr("placeholder") != null)
			this.selectLemgram($("#simple_text").data("lemgram"));
	},

	selectLemgram : function(lemgram) {
		if($("#search-tab").data("cover") != null) return;
		this.refreshSearch();
		util.searchHash("lemgram", lemgram);
	},

	buildLemgramSelect : function(lemgrams) {
		$("#lemgram_select").prev("label").andSelf().remove();
		var optionElems = $.map(lemgrams, function(item) {
			return $("<option>", {value : item.value}).html(item.label).get(0);
		});
		return $("<select id='lemgram_select' />").html(optionElems).data("dataprovider", lemgrams);;
	},

	renderSimilarHeader : function(selectedItem, data) {
		c.log("renderSimilarHeader");
		var self = this;

		$("#similar_lemgrams").empty().append("<div id='similar_header' />");
		$("<p/>")
		.localeKey("similar_header")
		.css("float", "left")
		.appendTo("#similar_header");

		var lemgrams = self.savedSelect || $( "#simple_text" ).data("dataArray");
		self.savedSelect = null;
		if(lemgrams != null && lemgrams.length ) {
			this.buildLemgramSelect(lemgrams).appendTo("#similar_header")
			.css("float", "right")
			.change(function(){
				self.savedSelect = lemgrams;
				self.selectLemgram($(this).val());
			})
			.val(selectedItem);
			$( "#simple_text" ).data("dataArray", null);
		}
		$("<div name='wrapper' style='clear : both;' />").appendTo("#similar_header");

		// wordlist
		data = $.grep(data, function(item) {
			return !!item.rel.length;
		});
		// find the first 30 words
		var count = 0;
		var index = 0;
		var sliced = $.extend(true, [], data);
		var isSliced = false;
		$.each(sliced, function(i, item) {
			index = i;
			if(count + item.rel.length > 30) {
				item.rel = item.rel.slice(0, 30 - count);
				isSliced = true;
				return false;
			}
			count += item.rel.length;
		});

		var list = $("<ul />").appendTo("#similar_lemgrams");
		$("#similarTmpl").tmpl(sliced.slice(0, index + 1)).appendTo(list)
		.find("a")
		.click(function() {
			self.selectLemgram($(this).data("lemgram"));
		});

		$("#show_more").remove();

		var div = $("#similar_lemgrams").show().height("auto").slideUp(0);

		if(isSliced) {
			div.after(
				$("<div id='show_more' />")
				.css("background-color", settings.primaryColor)
				.append($("<a href='javascript:' />").localeKey("show_more"))
				.click(function() {
					$(this).remove();
					var h = $("#similar_lemgrams").outerHeight();

					list.html( $("#similarTmpl").tmpl(data) )
					.find("a")
					.click(function() {
						self.selectLemgram($(this).data("lemgram"));
					});
					$("#similar_lemgrams").height("auto");
					var newH = $("#similar_lemgrams").outerHeight();
					$("#similar_lemgrams").height(h);

					$("#similar_lemgrams").animate({height : newH}, "fast");
				})
			);
		}
		div.slideDown("fast");
	},

	removeSimilarHeader : function() {
		$("#similar_lemgrams").slideUp(function() {
			$(this).empty();
		});
	},

	onSimpleChange : function(event) {
		$("#simple_text").data("promise", null);
		if(event && event.keyCode == 27) { //escape
			c.log("key", event.keyCode);
			return;
		}

		var currentText = $("#simple_text").val();
		currentText = $.trim(currentText, '"');
		var val;
		var suffix = $("#caseChk").is(":checked") ? " %c" : "";
		if(util.isLemgramId(currentText)) { // if the input is a lemgram, do semantic search.
			val = $.format('[lex contains "%s"]', currentText);
		} else if(this.isSearchPrefix() || this.isSearchSuffix()) {
			var query = [];
			this.isSearchPrefix() && query.push("%s.*");
			this.isSearchSuffix() && query.push(".*%s");
			val = $.map(currentText.split(" "), function(wd) {
				return "[" + $.map(query, function(q) {
					q = $.format(q, wd);
					return $.format('word = "%s"%s', [q, suffix]);
				}).join(" | ")  + "]";
			}).join(" ");

		}
		else {
			var wordArray = currentText.split(" ");
			var cqp = $.map(wordArray, function(item, i){
				return $.format('[word = "%s"%s]', [regescape(item), suffix]);
			});
			val = cqp.join(" ");
		}
		$("#cqp_string").val(val);
		if(currentText != "") {
			this.enableSubmit();
		} else {
			this.disableSubmit();
		}
	},

	resetView : function() {
		$("#similar_lemgrams").empty().height("auto");
		$("#show_more").remove();
		this.setPlaceholder(null, null);
//		$("#lemgram_select").prev("label").andSelf().remove();
		return this;
	},

	setPlaceholder : function(str, data) {
		$("#simple_text").data("lemgram", data).attr("placeholder", str)
		.placeholder();
		return this;
	},

	clear : function() {
		$("#simple_text").val("")
        .get(0).blur();
		this.disableSubmit();
		return this;
	}

};


var ExtendedSearch = {
	Extends : view.BaseSearch,
	initialize : function(mainDivId) {
		this.parent(mainDivId);
		var self = this;
		$("#korp-extended").keyup(function(event) {
			if(event.keyCode == "13" && $("#search-tab").data("cover") != null) {
				self.onSubmit();
			}
			return false;
		});

		this.$main.find("#strict_chk").change(function() {
			advancedSearch.updateCQP();
		});

		this.setupContainer("#query_table");

	},

	setupContainer : function(selector) {
		var self = this;
		var insert_token_button = $('<img src="img/plus.png"/>')
        .addClass("image_button")
        .addClass("insert_token")
	    .click(function(){
	    	self.insertToken(this);
		});

	    $(selector).append(insert_token_button).sortable({
	    	items : ".query_token",
	    	delay : 50,
	    	tolerance : "pointer"
	    });
	    insert_token_button.click();
	},

	reset : function() {
		//$("#search-tab ul li:nth(2)").click()
		this.$main.find(".query_token").remove();
		$(".insert_token").click();
		advancedSearch.updateCQP();
	},

	onentry : function() {
	},

	onSubmit : function() {
		this.parent();
		if(this.$main.find(".query_token, .or_arg").length > 1) {
			var query = advancedSearch.updateCQP();
			util.searchHash("cqp", query);
		} else {
			var $select = this.$main.find("select.arg_type");
			switch($select.val()) {
			case "lex":
				var searchType = $select.val() == "lex" ? "lemgram"  : $select.val();
				util.searchHash(searchType, $select.parent().next().data("value"));
				break;
			default:
				var query = advancedSearch.updateCQP();
				util.searchHash("cqp", query);
			}
		}
	},

	setOneToken : function(key, val) {
		$("#search-tab").find("a[href=#korp-extended]").click().end()
		.find("select.arg_type:first").val(key)
		.next().val(val);
		advancedSearch.updateCQP();
	},

	insertToken : function(button) {
		var self = this;
		try {
			$.tmpl($("#tokenTmpl"))
			.insertBefore(button)
		    .extendedToken({
		    	close : function() {
		    		advancedSearch.updateCQP();
		    	},
		    	change : function() {
		    		if(self.$main.is(":visible"))
		    			advancedSearch.updateCQP();
		    	}
		    });
		} catch(error) {
			c.log("error creating extendedToken", error);
			this.$main.find("*").remove();
			$("<div>Extended search is broken on this browser.</div>").prependTo(this.$main)
			.nextAll().remove();
		}
//	    .quickLocalize();
		util.localize();
	},

	refreshTokens : function() {
		$(".query_token").extendedToken("refresh");
	}

};

var AdvancedSearch = {
	Extends : view.BaseSearch,
	initialize : function(mainDivId) {
		this.parent(mainDivId);
	},

	setCQP : function(query) {
		c.log("setCQP", query)
		$("#cqp_string").val(query);
	},

	updateCQP : function() {
	    var query = $(".query_token").map(function() {
	    	return $(this).extendedToken("getCQP", $("#strict_chk").is(":checked"));
	    }).get().join(" ");
	    this.setCQP(query);
	    return query;
	},

	onSubmit : function() {
		this.parent();
		util.searchHash("cqp", $("#cqp_string").val());
	}

};


view.SimpleSearch = new Class(SimpleSearch);
view.ExtendedSearch = new Class(ExtendedSearch);
view.AdvancedSearch = new Class(AdvancedSearch);
delete SimpleSearch;
delete ExtendedSearch;
delete AdvancedSearch;