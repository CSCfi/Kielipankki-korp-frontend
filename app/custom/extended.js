
const collapsedImg = require("../img/collapsed.png")
const extendedImg = require("../img/extended.png")


export default {
    complemgramExtended: {
        template: `<autoc
        input='input'
        isRawInput='isRawInput'
        on-change='onChange(output, isRawOutput)'
        type='lemgram'
        variant='affix'
        error-on-empty='true'
        error-message='choose_value'/>
        `,
        controller: [
            "$scope", function($scope) {
                if($scope.model) {
                    $scope.currentVal = $scope.model.replace(/[\\+\.\*:]*$/, "").replace(/^\\\+/, "")
                    $scope.input = $scope.currentVal
                    $scope.isRawInput = false
                } else {
                    $scope.currentVal = ""
                }
                let setModel = () => {
                    if(["starts_with_contains", "not_starts_with_contains"].includes($scope.orObj.op)) {
                        $scope.model = $scope.currentVal + "\\+"
                    } else if(["ends_with_contains", "not_ends_with_contains"].includes($scope.orObj.op)) {
                        $scope.model = "\\+" + $scope.currentVal + ":.*"
                    } else if(["incontains_contains", "not_incontains_contains"].includes($scope.orObj.op)) {
                        $scope.model = "\\+" + $scope.currentVal + "\\+"
                    }
                }
                $scope.$watch("orObj.op", () => {
                    setModel()
                })
                $scope.onChange = (output, isRawOutput) => {
                    if(!isRawOutput) {
                        $scope.currentVal = output
                        setModel(output)
                    }
                }
        }],
    },
    msd: {
        template: `
            <input ng-model="input" class="arg_value" escaper ng-model-options='{debounce : {default : 300, blur : 0}, updateOn: "default blur"}'>
            <span ng-click="onIconClick()" class="fa fa-info-circle"></span>
        `,
        controller: ["$scope", "$uibModal", function($scope, $uibModal) {
            let modal = null
            const msdHTML = settings.markup.msd
            const template = `
                <div>
                    <div class="modal-header">
                        <h3 class="modal-title">{{'msd_long' | loc:lang}}</h3>
                        <span ng-click="clickX()" class="close-x">×</span>
                    </div>
                    <div class="modal-body msd-modal" ng-click="msdClick($event)">${msdHTML}</div>
                </div>`

            $scope.onIconClick = () => {
                modal = $uibModal.open({
                    template: template,
                    scope: $scope
                })
            }

            $scope.clickX = () => modal.close()

            $scope.msdClick = (event) => {
                const val = $(event.target).parent().data("value")
                if(!val) return
                $scope.input = val
                modal.close()
            }
        }]
    },
    compwf: {
        template: "<input ng-model='currentVal'>",
        controller: ["$scope", function($scope) {
            let strip = str => str.replace(/[\\+\.\*]*$/, "").replace(/^\\\+/, "")
            if($scope.model && strip($scope.model) != ".+?") {
                $scope.currentVal = strip($scope.model)
            }
            let setModel = () => {
                let val = $scope.currentVal || ".+?"
                if(["starts_with_contains", "not_starts_with_contains"].includes($scope.orObj.op)) {
                    $scope.model = val + "\\+"
                } else if(["ends_with_contains", "not_ends_with_contains"].includes($scope.orObj.op)) {
                    $scope.model = "\\+" + val
                } else if(["incontains_contains", "not_incontains_contains"].includes($scope.orObj.op)) {
                    $scope.model = "\\+" + val + "\\+"
                }
            }
            $scope.$watch("orObj.op", (newVal) => {
                setModel()
            })
            $scope.$watch("currentVal", (newVal) => {
                setModel()
            })
        }]
    },
    dateInterval: {
        template: `
        <div class="date_interval_arg_type">
            <h3>{{'simple' | loc}}</h3>
            <form ng-submit="commitDateInput()">
                <div class="" style="margin-bottom: 1rem;">
                    <span class="" style="display : inline-block; width: 32px; text-transform: capitalize;">{{'from' | loc}}</span> <input type="text" ng-blur="commitDateInput()" ng-model="fromDateString" placeholder="'1945' {{'or' | loc}} '1945-08-06'"/>
                </div>
                <div>
                    <span class="" style="display : inline-block; width: 32px; text-transform: capitalize;">{{'to' | loc}}</span> <input type="text" ng-blur="commitDateInput()" ng-model="toDateString" placeholder="'1968' {{'or' | loc}} '1968-04-04'"/>
                </div>
                <button type="submit" class="hidden" />
            </form>
            <div class="section mt-4"> 
                <h3>{{'advanced' | loc}}</h3>
                <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> 
                    <i class="fa fa-calendar"></i> <span style="text-transform: capitalize;">{{'from' | loc}} </span>
                </button> 
                {{combined.format("YYYY-MM-DD HH:mm")}} 
                <time-interval 
                    ng-click="from_click($event)" 
                    class="date_interval popper_menu dropdown-menu" 
                    date-model="from_date" 
                    time-model="from_time" 
                    model="combined" 
                    min-date="minDate" 
                    max-date="maxDate"></time-interval>
            </div>
                
            <div class="section"> 
                <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> 
                    <i class="fa fa-calendar"></i> <span style="text-transform: capitalize;">{{'to' | loc}} </span>
                </button> 
                {{combined2.format("YYYY-MM-DD HH:mm")}} 
                
                <time-interval 
                    ng-click="from_click($event)" 
                    class="date_interval popper_menu dropdown-menu" 
                    date-model="to_date" 
                    time-model="to_time" 
                    model="combined2" 
                    my="left top" 
                    at="right top"
                    min-date="minDate"
                    max-date="maxDate"></time-interval>
            </div>
        </div>`,
        controller: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                let s = $scope
                let cl = settings.corpusListing

                let updateIntervals = function() {
                    let moments = cl.getMomentInterval();
                    if (moments.length) {
                        let [fromYear, toYear] = _.invokeMap(moments, "toDate")
                        s.minDate = fromYear
                        s.maxDate = toYear
                    } else {
                        let [from, to] = cl.getTimeInterval()
                        s.minDate = moment(from.toString(), "YYYY").toDate();
                        s.maxDate = moment(to.toString(), "YYYY").toDate();
                    }
                };
                s.commitDateInput = () => {
                    if(s.fromDateString) {
                        let simpleFrom = s.fromDateString.length == 4
                        s.from_date = moment(s.fromDateString, simpleFrom ? "YYYY" : "YYYY-MM-DD" ).toDate()
                    }
                    if(s.toDateString) {
                        let simpleTo = s.toDateString.length == 4
                        if(simpleTo) {
                            var dateString = `${s.toDateString}-12-31`
                        }
                        s.to_date = moment(dateString || s.dateString).toDate()
                        s.to_time = moment("235959", "HHmmss").toDate()
                     }
                }
                s.$on("corpuschooserchange", function() {
                  updateIntervals()
                })

                updateIntervals()

                s.from_click = function(event) {
                  event.originalEvent.preventDefault()
                  event.originalEvent.stopPropagation()
                }

                let getYear = function(val) {
                  return moment(val.toString(), "YYYYMMDD").toDate();
                }

                let getTime = function(val) {
                  return moment(val.toString(), "HHmmss").toDate();
                }

                if (!s.model) {
                    s.from_date = s.minDate
                    s.to_date = s.maxDate
                    let [from, to] = _.invokeMap(cl.getMomentInterval(), "toDate")
                    s.from_time = from 
                    s.to_time = to
                } else if (s.model.length === 4) {
                    let [fromYear, toYear] = _.map(s.model.slice(0, 3), getYear)
                    s.from_date = fromYear
                    s.to_date = toYear
                    let [fromTime, toTime] = _.map(s.model.slice(2), getTime)
                    s.from_time = fromTime
                    s.to_time = toTime
                }
                s.$watchGroup(["combined", "combined2"], function([combined, combined2]) {
                    s.model = [
                        moment(s.from_date).format("YYYYMMDD"), 
                        moment(s.to_date).format("YYYYMMDD"), 
                        moment(s.from_time).format("HHmmss"), 
                        moment(s.to_time).format("HHmmss")
                   ]
                })
            }
        ]
    },

    // Extended component for the signum of the DMA corpus. The input
    // field also has an (i) link opening a list of signums as links
    // from which one can select. This has been copied and modified
    // from the "msd" component for the Swedish msd attribute.
    dmaSignum: {
        template: `
            <input ng-model="model" class="arg_value" escaper ng-model-options='{debounce : {default : 300, blur : 0}, updateOn: "default blur"}'>
            <span ng-click="onIconClick()" class="fa fa-info-circle"></span>
        `,
        controller: ["$scope", "$uibModal", function ($scope, $uibModal) {
            let modal = null
            const template = `
                <div>
                    <div class="modal-header">
                        <h3 class="modal-title">{{'signum_long' | loc:lang}}</h3>
                        <span ng-click="clickX()" class="close-x">×</span>
                    </div>
                    <div class="modal-body" ng-click="handleClick($event)" ng-include="'markup/dma_signumlist_links.html'" style="font-size: 80%;"></div>
                </div>`

            $scope.onIconClick = () => {
                modal = $uibModal.open({
                    template: template,
                    scope: $scope
                })
            }

            $scope.clickX = () => modal.close()

            $scope.handleClick = function(event) {
                const val = $(event.target).parents("td").data("value")
                // c.log ("signum selected:", val)
                if (! val) {
                    return;
                }
                $scope.model = val
                // c.log ("signum updated $scope:", $scope)
                modal.close()
            }
        }]
    },

    // ScotsCorr word: Add a multiple-selection list to the word, with
    // one level of collapsible grouping by the first character of the
    // word (required to make the list work reasonably fast for a
    // large number of words). The resulting value is a regular
    // expression. This could be generalized, maybe to an Angular
    // directive.
    scotscorrWord: {
        // The input field also has "list" icon, which is a link
        // opening a list of words with checkboxes from which the user
        // can select. This has been copied and modified from the code
        // for the the Swedish msd attribute.
        // TODO(?): Parametrize the default template in the directive
        // "tokenValue" so that possibly changes to it would be
        // reflected here automatically. The additional features here
        // could be simply parameter values
        template: '<input class="arg_value arg_value_wordselector"' +
            ' ng-model="input"' +
            ' ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'' +
            ' ng-change="inputChange()" escaper' +
            ' placeholder=\'<{{"any" | loc:lang}}>\'>' +
            '<span ng-click="onIconClick()" class="fa fa-list list-link-icon"' +
            ' title="{{\'scotscorr_open_wordlist\' | loc:lang}}"></span>' +
            '<a href="http://www.dsl.ac.uk/" target="_blank"' +
            ' title="Dictionary of the Scots Language">' +
            '<span class="fa fa-book book-link-icon"></span></a>' +
            ' <span class="val_mod" popper' +
            ' ng-class=\'{sensitive : case == "sensitive", insensitive : case == "insensitive"}\'>' +
            ' Aa ' +
            '</span>' +
            '<ul class="mod_menu popper_menu dropdown-menu">' +
            '<li><a ng-click="makeSensitive()">{{"case_sensitive" | loc:lang}}</a></li>' +
            '<li><a ng-click="makeInsensitive()">{{"case_insensitive" | loc:lang}}</a></li>' +
            '</ul>',
        controller: ["$scope", "$uibModal", function ($scope, $uibModal) {
            var s = $scope;
            var modal = null;
            s.words = [];
            s.groups = [];
            s.group_template = "";
            s.selected_words = [];
            s.selected_words_str = "";
            s.selected_freq = 0;
            s.total_freq = 0;
            s["case"] = "sensitive";
            // Add a thousands separator to a number
            s.pretty_num = function (num) {
                return util.prettyNumbers(num);
            };
            // Make a template for the counts of selected and all tokens
            // and their frequencies.
            s.make_counts_template = function (tokens_sel, tokens_all, freq_sel,
                                               freq_all) {
                var pretty_num = function (val) {
                    return ('<span ng-bind-html="pretty_num(' + val +
                            ') | trust"></span>');
                }
                // FIXME: Add thousands separators to the numbers shown in
                // the tooltip.
                return ('<span ng-attr-title="{{' + tokens_sel.toString() + '}}' +
                        ' {{\'scotscorr_selected_words_with_freq\' | loc:lang}} {{' +
                        freq_sel.toString() + '}}">' +
                        pretty_num(tokens_sel) +
                        // ' / ' +
                        // pretty_num(tokens_all) +
                        ';&nbsp; <span class="wordselector-freq"> ' +
                        pretty_num(freq_sel) +
                        // ' / ' +
                        // pretty_num(freq_all) +
                        '</span></span>');
            };
            // Process the word data (words and their frequencies grouped,
            // possibly hierarchically) and create s.words, s.groups and
            // s.group_template. The structure is represented as an array
            // of nested arrays, whose first item is the word or group
            // label and the second item the absolute frequency for a word
            // and an array of arrays for a group. Groups may be nested,
            // but a group may contain either groups or words, not both.
            // To make things simpler in Angular, s.group_template
            // contains all the groups explicitly written out but the
            // words are represented using ng-repeat.
            var make_word_list = function (data, groupstack) {
                // c.log("scotscorr_word data", data);
                var words_seen = false;
                for (var i = 0; i < data.length; i++) {
                    if (_.isArray(data[i][1])) {
                        var group = {
                            name: data[i][0],
                            words: [],
                            numwords: 0,
                            numselected: 0,
                            totalfreq: 0,
                            selectedfreq: 0,
                            shown: false
                        };
                        var groupnum = s.groups.length;
                        s.groups.push(group);
                        groupstack.push(group);
                        var groupref = 'groups[' + groupnum.toString() + ']';
                        s.group_template += '<li>' +
                            '<span class="wordselector-group-arrow"></span>' +
                            '<span class="wordselector-group-heading" ng-click="toggleGroup(' + groupref + ')">' +
                            '<img ng-src="{{' + groupref + '.shown ? \'' + extendedImg + '\' : \'' + collapsedImg + '\'}}"/> ' +
                            '<span class="wordselector-group-name">' + group.name + '</span>' +
                            // Em quad
                            '&#x2001;</span>' +
                            '<span class="wordselector-group-extra"> (' +
                            s.make_counts_template(groupref + '.numselected',
                                                   groupref + '.numwords',
                                                   groupref + '.selectedfreq',
                                                   groupref + '.totalfreq') +
                            ')</span>' +
                            '<div ng-if="' + groupref + '.shown">' +
                            '<ul>';
                        make_word_list(data[i][1], groupstack);
                        groupstack.pop();
                        s.group_template += '</ul></div></li>';
                    } else {
                        if (! words_seen) {
                            var groupref =
                                'groups[' + (s.groups.length - 1).toString() + ']';
                            s.group_template +=
                            '<li ng-repeat="word in ' + groupref + '.words">' +
                                '<input type="checkbox" ng-model="word.selected" ng-click="update(e, word.word)">' +
                                // &#x2000; = en quad
                                '<span ng-class="\'wordselector-word-\' + (word.selected ? \'\' : \'un\') + \'selected\'">&#x2000;{{word.word}}</span>' +
                                '&#x2000;(<span class="wordselector-freq" ng-bind-html="pretty_num(word.freq) | trust"></span>)</input>' +
                                '</li>';
                            words_seen = true;
                        }
                        s.words.push({word: data[i][0],
                                      freq: data[i][1],
                                      groups: groupstack.slice(),
                                      selected: false});
                    }
                }
            }
            $.getJSON(
                "corpus_info/scotscorr-words.json",
                function (data) {
                    make_word_list(data, []);
                    for (var i = 0; i < s.words.length; i++) {
                        var word = s.words[i];
                        s.total_freq += word.freq;
                        for (var j = 0; j < word.groups.length; j++) {
                            var group = word.groups[j];
                            group.words.push(word);
                            group.numwords += 1;
                            group.totalfreq += word.freq;
                        }
                    }
                    // c.log("scotscorr_word words", s.words);
                    // c.log("scotscorr_word groups", s.groups,
                    //       s.group_words);
                    c.log('scotscorr group_template', s.group_template);
                }
            );
            // Executed on clicking the list icon
            s.onIconClick = function () {
                s.setSelected();
                modal = $uibModal.open({
                    template: '<div>' +
                        '<div class="modal-header">' +
                        '<h3 class="modal-title">{{\'wordlist\' | loc:lang}} (ScotsCorr)</h3>' +
                        '<span ng-click="done()" class="close-x">×</span>' +
                        '</div>' +
                        '<div class="modal-header">' +
                        '<div class="modal-value">' +
                        '<a href="http://www.dsl.ac.uk/" target="_blank"><span class="fa fa-book book-link-icon"></span> Dictionary of the Scots Language</a>' +
                        '</div>' +
                        '<div class="modal-value">' +
                        '<p><span class="modal-value-heading">{{\'selected_words\' | loc:lang}}</span> (' +
                        s.make_counts_template('selected_words.length',
                                               'words.length',
                                               'selected_freq',
                                               'total_freq') +
                        '): <span id="wordselector-selected-words"><span ng-bind-html="selected_words_str | trust"></span></span></p>' +
                        '</div>' +
                        '<div class="modal-buttons">' +
                        '<button type="button" class="btn btn-default" ng-click="done()">{{\'button_done\' | loc:lang}}</button>' +
                        '<button type="button" class="btn btn-default" ng-click="clearSelected()">{{\'button_clear\' | loc:lang}}</button>' +
                        '<button type="button" class="btn btn-default" ng-click="cancel()">{{\'button_cancel\' | loc:lang}}</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="modal-body modal-wordselector" style="overflow-y: auto; font-size: 80%">' +
                        '<ul>' +
                        s.group_template +
                        '</ul>' +
                        '</div>' +
                        '</div>',
                    scope: s
                });
            };
            // Set the selected property of words based on the current
            // input value
            s.setSelected = function () {
                s.input_prev = s.input;
                var op = s.$parent.orObj.op;
                var select_fn = null;
                if (s.input == "" || op == "!=" || op == "!*=") {
                    // Nothing selected for the empty word nor the negated
                    // operations
                    s.selected_words = [];
                    select_fn = function (word) { return false; };
                } else if (op == "=") {
                    // Select only the word literally
                    s.selected_words = [s.input];
                    select_fn = function (word) { return word == s.input };
                } else {
                    // Construct a regular expression for testing if a
                    // word matches the condition. This assumes that the
                    // CQP regular expressions are are compatible with
                    // JavaScript RegExps, as they (mostly) are.
                    var word_re = "";
                    if (op == "*=") {
                        // Regular expression
                        word_re = "^(" + s.input + ")$";
                    } else if (op == "^=") {
                        // Starts with
                        word_re = "^(" + window.regescape(s.input) + ")";
                    } else if (op == "&=") {
                        // Ends with
                        word_re = "(" + window.regescape(s.input) + ")$";
                    } else if (op == "_=") {
                        // Contains
                        word_re = window.regescape(s.input)
                    }
                    // c.log("matching", word_re);
                    word_re = RegExp(word_re);
                    select_fn = function (word) { return word_re.test(word); };
                }
                // c.log("scotscorr_word setSelected", s.selected_words);
                for (var i = 0; i < s.words.length; i++) {
                    s.words[i].selected = select_fn(s.words[i].word);
                    // if (s.words[i].selected) {c.log("selected:", s.words[i].word);}
                }
                // s.selected_words_str = s.selected_words.join("\u2000");
                s.update();
            };
            // Clear the case-insensitive flag (restore the default)
            s.makeSensitive = function () {
                s["case"] = "sensitive";
                if (s.orObj.flags != null) {
                    delete s.orObj.flags.c;
                }
            };
            // Set the case-insensitive flag
            s.makeInsensitive = function () {
                var flags = s.orObj.flags || {};
                flags["c"] = true;
                s.orObj.flags = flags;
                s["case"] = "insensitive";
            };
            // Update s.selected_words based on the selected property
            // in the elements of s.words. The arguments are
            // currently not used.
            s.update = function (event, word) {
                c.log("scotscorr_word update", word, event,
                      _.filter(s.words, "selected"));
                // We could use the words in s.selected_words, but
                // how could we retain the order of the words, that is,
                // how could an added word be added at the right position
                // in the list?
                var selected_words = _.filter(s.words, "selected");
                s.selected_words = _.map(selected_words, "word");
                for (var j = 0; j < s.groups.length; j++) {
                    s.groups[j].numselected = s.groups[j].selectedfreq = 0;
                }
                // Join with an en quad
                s.selected_words_str =
                    _.map(selected_words,
                          function (word) {
                              return (word.word.replace(/&/g, "&amp;")
                                      .replace(/</g, "&lt;").replace(/>/g, "&gt;") +
                                      '&nbsp;(<span class="wordselector-freq">' +
                                      s.pretty_num(word.freq.toString()) +
                                      '</span>)');
                          })
                    .join("\u2000");
                s.selected_freq = 0;
                for (var i = 0; i < selected_words.length; i++) {
                    var selword = selected_words[i];
                    s.selected_freq += selword.freq;
                    for (var j = 0; j < selword.groups.length; j++) {
                        var group = selword.groups[j];
                        group.numselected += 1;
                        group.selectedfreq += selword.freq;
                    }
                }
                c.log("scotscorr_word selected", s.selected_words);
            };
            // Toggle a group
            s.toggleGroup = function (group, event) {
                group.shown = ! group.shown;
            }
            // Set the input value based on the selected words
            s.done = function (event) {
                modal.close();
                if (s.selected_words.length > 1) {
                    s.input = (
                        _.map(s.selected_words, window.regescape)
                            .join("|"));
                    // Force regular expression
                    s.$parent.orObj.op = "*=";
                } else {
                    s.input = (s.selected_words.length == 1
                               ? s.selected_words[0]
                               : "");
                    // For a single word, use "=" unless the word is the
                    // same as before
                    if (s.input != s.input_prev) {
                        s.$parent.orObj.op = "=";
                    }
                }
                // s.inputChange() (from escaper) seems to be needed to
                // update the input value to the model; specifying it in
                // the ng-change attribute of the template appears not to
                // suffice.
                s.inputChange();
                c.log("scotscorr_word input", s.input);
            };
            // Clear the selected words
            s.clearSelected = function (event) {
                for (var i = 0; i < s.words.length; i++) {
                    s.words[i].selected = false;
                }
                s.selected_words = [];
                s.selected_words_str = "";
                s.selected_freq = 0;
                for (var j = 0; j < s.groups.length; j++) {
                    s.groups[j].numselected = s.groups[j].selectedfreq = 0;
                }
                // s.update();
            };
            // Cancel: retain the original input value
            s.cancel = function (event) {
                modal.close();
            };
        }]
    },
}
