import settings from "@/settings"

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
                        <h3 class="modal-title">{{'msd_long' | loc:$root.lang}}</h3>
                        <span ng-click="clickX()" class="close-x">×</span>
                    </div>
                    <div class="modal-body msd-modal" ng-click="msdClick($event)">${msdHTML}</div>
                </div>`

            $scope.onIconClick = () => {
                modal = $uibModal.open({
                    template: template,
                    scope: $scope
                })
                // Ignore rejection from dismissing the modal
                modal.result.catch(() => {})
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
    npeglECat: {
        controller: [
            "$scope", function($scope) {
                const labels = [
                    "Noun (N)",
                    "Common noun (N.C)",
                    "Proper noun (N.P)",
                    "Nordic \"hinn\" (H)",
                    "Personal pronoun (Per)",
                    "Demonstrative pronoun (Dem)",
                    "Possesive pronoun (Poss)",
                    "(Strong) Quantifier (Q)",
                    "Modifier (Md)",
                    "Positional predicate (Md.Pos)",
                    "Numeral or weak quantifier (Md.Nu/WQ)",
                    "Cardinal numeral (Md.Nu/WQ.Nu)",
                    "Weak quantifier (Md.Nu/WQ.WQ)",
                    "Adjective (Md.Aj)",
                    "Functional adjective (Md.Aj.Fn)",
                    "Ordinal numeral (Md.Aj.Fn.Ord)",
                    "Defective adjective (Md.Aj.Fn.Df)",
                    "Determiner-like adjective (Md.Aj.Fn.Dt)",
                    "Lexical adjective (Md.Aj.Lx)",
                    "Past participle (Md.Aj.Lx.Pst)",
                    "Present participle (Md.Aj.Lx.Pre)",
                    "Other derived adjective (Md.Aj.Lx.Der)",
                    "Prototypical adjective (Md.Aj.Lx.Pro)",
                    "Noun phrase (NP)",
                    "Adjectival associate (Assoc)",
                    "Genitival phrase (GenP)",
                    "Prepositional phrase (PP)",
                    "Apposition (App)",
                    "Relative clause (RC)",
                    "Complement clause (CC)",
                    "Finite complement clause (CC.Fi)",
                    "Non-finite complement clause (CC.Nf)",
                    "Adverbial (Adv)",
                    "Modifier of modifier (Mdmd)",
                    "Complement of modifier (Mdcm)",
                    "Nominal complement of modifier (Mdcm.N)",
                    "Prepositional complement of modifier (Mdcm.P)",
                    "Complement of degree element (Dgcm)",
                    "Bare complement of degree element (Dgcm.Br)",
                    "Marked complement of degree element (Dgcm.Mk)",
                    "Coordinator (&)",
                    "Coordinator of Noun phrases (&.NP)",
                    "Coordinator of Nouns (&.N)",
                    "Coordinator of Possessives (&.Poss)",
                    "Coordinator of Adjectives (&.Aj)",
                    "Coordinator of Numericals (&.Nu)",
                    "Initial part of a discontinuous coordinator (&.Init)",
                    "Other or uncertain coordinator (&.Other)"
                ];
    
                const exactMatching = _.fromPairs([
                    "N:[0-9]+",
                    "N[.]C:[0-9]+",
                    "N[.]P:[0-9]+",
                    "H:[0-9]+",
                    "Per:[0-9]+",
                    "Dem:[0-9]+",
                    "Poss:[0-9]+",
                    "Q:[0-9]+",
                    "Md:[0-9]+",
                    "Md[.]Pos:[0-9]+",
                    "Md[.]Nu/WQ:[0-9]+",
                    "Md[.]Nu/WQ[.]Nu:[0-9]+",
                    "Md[.]Nu/WQ[.]WQ:[0-9]+",
                    "Md[.]Aj:[0-9]+",
                    "Md[.]Aj[.]Fn:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Ord:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Df:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Dt:[0-9]+",
                    "Md[.]Aj[.]Lx:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pst:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pre:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Der:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pro:[0-9]+",
                    "NP:[0-9]+",
                    "Assoc:[0-9]+",
                    "GenP:[0-9]+",
                    "PP:[0-9]+",
                    "App:[0-9]+",
                    "RC:[0-9]+",
                    "CC:[0-9]+",
                    "CC[.]Fi:[0-9]+",
                    "CC[.]Nf:[0-9]+",
                    "Adv:[0-9]+",
                    "Mdmd:[0-9]+",
                    "Mdcm:[0-9]+",
                    "Mdcm[.]N:[0-9]+",
                    "Mdcm[.]P:[0-9]+",
                    "Dgcm:[0-9]+",
                    "Dgcm[.]Br:[0-9]+",
                    "Dgcm[.]Mk:[0-9]+",
                    "&:[0-9]+",
                    "&[.]NP:[0-9]+",
                    "&[.]N:[0-9]+",
                    "&[.]Poss:[0-9]+",
                    "&[.]Aj:[0-9]+",
                    "&[.]Nu:[0-9]+",
                    "&[.]Init:[0-9]+",
                    "&[.]Other:[0-9]+"
                ].map((elem, idx) => [elem, idx]));
    
                const matching = _.fromPairs([
                    "N([.][^:]+)?:[0-9]+",
                    "N[.]C:[0-9]+",
                    "N[.]P:[0-9]+",
                    "H:[0-9]+",
                    "Per:[0-9]+",
                    "Dem:[0-9]+",
                    "Poss:[0-9]+",
                    "Q:[0-9]+",
                    "Md([.][^:]+)?:[0-9]+",
                    "Md[.]Pos:[0-9]+",
                    "Md[.]Nu/WQ([.][^:]+)?:[0-9]+",
                    "Md[.]Nu/WQ[.]Nu:[0-9]+",
                    "Md[.]Nu/WQ[.]WQ:[0-9]+",
                    "Md[.]Aj([.][^:]+)?:[0-9]+",
                    "Md[.]Aj[.]Fn([.][^:]+)?:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Ord:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Df:[0-9]+",
                    "Md[.]Aj[.]Fn[.]Dt:[0-9]+",
                    "Md[.]Aj[.]Lx([.][^:]+)?:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pst:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pre:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Der:[0-9]+",
                    "Md[.]Aj[.]Lx[.]Pro:[0-9]+",
                    "NP:[0-9]+",
                    "Assoc:[0-9]+",
                    "GenP:[0-9]+",
                    "PP:[0-9]+",
                    "App:[0-9]+",
                    "RC:[0-9]+",
                    "CC([.][^:]+)?:[0-9]+",
                    "CC[.]Fi:[0-9]+",
                    "CC[.]Nf:[0-9]+",
                    "Adv:[0-9]+",
                    "Mdmd:[0-9]+",
                    "Mdcm([.][^:]+)?:[0-9]+",
                    "Mdcm[.]N:[0-9]+",
                    "Mdcm[.]P:[0-9]+",
                    "Dgcm([.][^:]+)?:[0-9]+",
                    "Dgcm[.]Br:[0-9]+",
                    "Dgcm[.]Mk:[0-9]+",
                    "&([.][^:]+)?:[0-9]+",
                    "&[.]NP:[0-9]+",
                    "&[.]N:[0-9]+",
                    "&[.]Poss:[0-9]+",
                    "&[.]Aj:[0-9]+",
                    "&[.]Nu:[0-9]+",
                    "&[.]Init:[0-9]+",
                    "&[.]Other:[0-9]+"
                ].map((elem, idx) => [elem, idx]));
    
                const data = { "=": exactMatching, "*=": matching, "!=": exactMatching, "!*=": matching }
    
                $scope.$watch("input", () => {
                    $scope.model = Object.keys(data[$scope.orObj.op])[$scope.input]
                })
    
                $scope.$watch("orObj.op", (op, prevOp) => {
                    if (op != prevOp) {
                        // translate value from previous operator to new
                        $scope.model = Object.keys(data[op])[$scope.input]
                    }  
                })
    
                if ($scope.model) {
                    $scope.input = data[$scope.orObj.op][$scope.model]
                } else {
                    $scope.input = 0
                }
    
                $scope.dataset = labels.map((value, idx) => [idx, value])
        }],
        template: `<select ng-model="input" ng-options="tuple[0] as tuple[1] for tuple in dataset"></select>`,
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
        template: `
            <input class="arg_value arg_value_wordselector"
                ng-model="input"
                ng-model-options='{debounce : {default : 300, blur : 0}, updateOn: "default blur"}'
                ng-change="inputChange()" escaper
                placeholder='<{{"any" | loc:lang}}>'>
            <span ng-click="onIconClick()" class="fa fa-list list-link-icon"
                title="{{'scotscorr_open_wordlist' | loc:lang}}"></span>
            <a href="http://www.dsl.ac.uk/" target="_blank"
                title="Dictionary of the Scots Language">
                <span class="fa fa-book book-link-icon"></span>
            </a>
            <span class="val_mod" popper
                ng-class='{sensitive : case == "sensitive", insensitive : case == "insensitive"}'>
                Aa
            </span>
            <ul class="mod_menu popper_menu dropdown-menu">
            <li><a ng-click="makeSensitive()">{{"case_sensitive" | loc:lang}}</a></li>
            <li><a ng-click="makeInsensitive()">{{"case_insensitive" | loc:lang}}</a></li>
            </ul>
        `,
        controller: ["$scope", "$uibModal", function ($scope, $uibModal) {
            let s = $scope;
            let modal = null;
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
                const pretty_num = function (val) {
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
            const make_word_list = function (data, groupstack) {
                // c.log("scotscorr_word data", data);
                let words_seen = false;
                for (let i = 0; i < data.length; i++) {
                    if (_.isArray(data[i][1])) {
                        let group = {
                            name: data[i][0],
                            words: [],
                            numwords: 0,
                            numselected: 0,
                            totalfreq: 0,
                            selectedfreq: 0,
                            shown: false
                        };
                        const groupnum = s.groups.length;
                        s.groups.push(group);
                        groupstack.push(group);
                        const groupref = 'groups[' + groupnum.toString() + ']';
                        // &#x2001; below is an em quad
                        s.group_template += `<li>
                            <span class="wordselector-group-arrow"></span>
                            <span class="wordselector-group-heading" ng-click="toggleGroup(${groupref})">
                            <img ng-src="{{${groupref}.shown ? '${extendedImg}' : '${collapsedImg}'}}"/> 
                            <span class="wordselector-group-name">${group.name}</span>
                            &#x2001;</span>
                            <span class="wordselector-group-extra">(` +
                                s.make_counts_template(groupref + '.numselected',
                                                       groupref + '.numwords',
                                                       groupref + '.selectedfreq',
                                                       groupref + '.totalfreq') +
                            `)</span>
                            <div ng-if="${groupref}.shown">
                            <ul>
                        `;
                        make_word_list(data[i][1], groupstack);
                        groupstack.pop();
                        s.group_template += '</ul></div></li>';
                    } else {
                        if (! words_seen) {
                            const groupref =
                                'groups[' + (s.groups.length - 1).toString() + ']';
                            // &#x2000; = en quad
                            s.group_template += `
                                <li ng-repeat="word in ${groupref}.words">
                                    <input type="checkbox" ng-model="word.selected" ng-change="update(e, word.word)">
                                        <span ng-class="'wordselector-word-' + (word.selected ? '' : 'un') + 'selected'">&#x2000;{{word.word}}</span>
                                        &#x2000;(<span class="wordselector-freq" ng-bind-html="pretty_num(word.freq) | trust"></span>)</input>
                                </li>
                            `;
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
                    for (let i = 0; i < s.words.length; i++) {
                        let word = s.words[i];
                        s.total_freq += word.freq;
                        for (let j = 0; j < word.groups.length; j++) {
                            let group = word.groups[j];
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
                    template: `
                        <div>
                            <div class="modal-header">
                                <h3 class="modal-title">{{'wordlist' | loc:lang}} (ScotsCorr)</h3>
                                <span ng-click="done()" class="close-x">×</span>
                            </div>
                            <div class="modal-header">
                                <div class="modal-value">
                                    <a href="http://www.dsl.ac.uk/" target="_blank"><span class="fa fa-book book-link-icon"></span> Dictionary of the Scots Language</a>
                                </div>
                                <div class="modal-value">
                                    <p><span class="modal-value-heading">{{'selected_words' | loc:lang}}</span> (` +
                                    s.make_counts_template('selected_words.length',
                                                           'words.length',
                                                           'selected_freq',
                                                           'total_freq') +
                                    `): <span id="wordselector-selected-words"><span ng-bind-html="selected_words_str | trust"></span></span></p>
                                </div>
                                <div class="modal-buttons">
                                    <button type="button" class="btn btn-default" ng-click="done()">{{'button_done' | loc:lang}}</button>
                                    <button type="button" class="btn btn-default" ng-click="clearSelected()">{{'button_clear' | loc:lang}}</button>
                                    <button type="button" class="btn btn-default" ng-click="cancel()">{{'button_cancel' | loc:lang}}</button>
                                </div>
                            </div>
                            <div class="modal-body modal-wordselector" style="overflow-y: auto; font-size: 80%">
                                <ul>${s.group_template}</ul>
                            </div>
                        </div>`,
                    scope: s
                });
            };
            // Set the selected property of words based on the current
            // input value
            s.setSelected = function () {
                s.input_prev = s.input;
                const op = s.$parent.orObj.op;
                let select_fn = null;
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
                    let word_re = "";
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
                for (let i = 0; i < s.words.length; i++) {
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
                let flags = s.orObj.flags || {};
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
                const selected_words = _.filter(s.words, "selected");
                s.selected_words = _.map(selected_words, "word");
                for (let j = 0; j < s.groups.length; j++) {
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
                for (let i = 0; i < selected_words.length; i++) {
                    let selword = selected_words[i];
                    s.selected_freq += selword.freq;
                    for (let j = 0; j < selword.groups.length; j++) {
                        let group = selword.groups[j];
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
            // Update input value to the model
            s.inputChange = function () {
                s.model = escape(s.input);
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
                for (let i = 0; i < s.words.length; i++) {
                    s.words[i].selected = false;
                }
                s.selected_words = [];
                s.selected_words_str = "";
                s.selected_freq = 0;
                for (let j = 0; j < s.groups.length; j++) {
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
