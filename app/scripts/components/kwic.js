/** @format */
import statemachine from "../statemachine"

let html = String.raw

// show no hits
// this.$result.addClass("zero_results").click()
// return this.$result.find(".hits_picture").html("")

export const kwicComponent = {
    template: html`
        <div ng-click="$ctrl.onKwicClick($event)">
            <div class="result_controls">
                <warning ng-if="$ctrl.aborted && !$ctrl.loading">{{'search_aborted' | loc:lang}}</warning>
                <div class="controls_n" ng-show="$ctrl.hitsDisplay">
                    <span>{{'num_results' | loc:lang}}: </span>
                    <span ng-bind-html="$ctrl.hitsDisplay | trust"></span>
                </div>
                <div class="hits_picture" ng-if="$ctrl.hitsPictureData.length > 1">
                    <table class="hits_picture_table">
                        <tbody>
                            <tr>
                                <td
                                    class="hits_picture_corp"
                                    ng-repeat="corpus in $ctrl.hitsPictureData"
                                    ng-style='{width : corpus.relative + "%"}'
                                    ng-class="{odd : $index % 2 != 0, even : $index % 2 == 0}"
                                    ng-click="$ctrl.pageChange(corpus.page)"
                                    uib-tooltip="{{corpus.rtitle | locObj:lang}}: {{corpus.abs}}"
                                    uib-tooltip-placement='{{$last? "left":"top"}}'
                                    append-to-body="false"
                                ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <kwic-pager
                ng-if="$ctrl.hits"
                total-hits="$ctrl.hits"
                current-page="$ctrl.page"
                page-change="$ctrl.pageChange(page)"
                hits-per-page="$ctrl.hitsPerPage"
            ></kwic-pager>
            <span
                ng-if="!$ctrl.readingMode"
                class="reading_btn link"
                ng-hide="$ctrl.loading"
                ng-click="$ctrl.toggleReading()"
            >
                {{'show_reading' | loc:lang}}
            </span>
            <span
                ng-if="$ctrl.readingMode"
                class="reading_btn link"
                ng-hide="$ctrl.loading"
                ng-click="$ctrl.toggleReading()"
            >
                {{'show_kwic' | loc:lang}}
            </span>
            <div class="table_scrollarea">
                <table class="results_table kwic" ng-if="$ctrl.kwic.length > 0" cellspacing="0">
                    <tr
                        class="sentence"
                        ng-repeat="sentence in $ctrl.kwic"
                        ng-class="{corpus_info : sentence.newCorpus, not_corpus_info : !sentence.newCorpus, linked_sentence : sentence.isLinked, even : $even, odd : $odd}"
                    >
                        <td class="empty_td"></td>
                        <td class="corpus_title text-gray-600 uppercase text-sm" colspan="3">
                            <div>
                                {{sentence.newCorpus | locObj:lang}}
                                <span class="corpus_title_warn" ng-if="::sentence.noContext"
                                    >{{'no_context_support' | loc:lang}}</span
                                >
                            </div>
                        </td>
                        <td class="empty_td"></td>
                        <td class="lnk" colspan="3" ng-if="::sentence.isLinked">
                            <span kwic-word="kwic-word" ng-repeat="wd in sentence.tokens"></span>
                        </td>
                        <td class="left" ng-if="::!sentence.newCorpus">
                            <span kwic-word="kwic-word" ng-repeat="wd in $ctrl.selectLeft(sentence)"></span>
                        </td>
                        <td class="match" ng-if="::!sentence.newCorpus">
                            <span kwic-word="kwic-word" ng-repeat="wd in $ctrl.selectMatch(sentence)"></span>
                        </td>
                        <td class="right" ng-if="::!sentence.newCorpus">
                            <span kwic-word="kwic-word" ng-repeat="wd in $ctrl.selectRight(sentence)"> </span>
                        </td>
                    </tr>
                </table>
                <div class="results_table reading" ng-if="$ctrl.contextKwic.length > 0">
                    <p
                        class="sentence"
                        ng-repeat="sentence in $ctrl.contextKwic"
                        ng-class="{corpus_info : sentence.newCorpus, not_corpus_info : !sentence.newCorpus, linked_sentence : sentence.isLinked,         even : $even,         odd : $odd}"
                    >
                        <span class="corpus_title" colspan="0"
                            >{{sentence.newCorpus | locObj:lang}}<span
                                class="corpus_title_warn"
                                ng-if="::sentence.noContext"
                                >{{'no_context_support' | loc:lang}}</span
                            ></span
                        >
                        <span ng-repeat="wd in sentence.tokens" kwic-word="kwic-word"></span>
                    </p>
                </div>
            </div>
            <kwic-pager
                ng-if="$ctrl.hits"
                total-hits="$ctrl.hits"
                current-page="$ctrl.page"
                page-change="$ctrl.pageChange(page)"
                hits-per-page="$ctrl.hitsPerPage"
            ></kwic-pager>
            <div id="download-links-container">
                <select id="download-links" ng-if="_settings['enable_backend_kwic_download']"></select>
                <select
                    id="frontendDownloadLinks"
                    ng-if="$ctrl._settings['enable_frontend_kwic_download']"
                    ng-change="$ctrl.download.init($ctrl.download.selected, $ctrl.hitsDisplay)"
                    ng-model="$ctrl.download.selected"
                    ng-options="item.value as item.label | loc:lang disable when item.disabled for item in $ctrl.download.options"
                ></select>
                <a
                    class="kwicDownloadLink"
                    ng-if="$ctrl._settings['enable_frontend_kwic_download']"
                    href="{{$ctrl.download.blobName}}"
                    download="{{$ctrl.download.fileName}}"
                    target="_self"
                    style="display: none;"
                ></a>
            </div>
        </div>
    `,
    bindings: {
        aborted: "<",
        loading: "<",
        hitsDisplay: "<",
        hitsPictureData: "<",
        hits: "<",
        kwic: "<",
        contextKwic: "<",
        isReading: "<",
        pageEvent: "<",
        contextChangeEvent: "<",
        hitsPerPage: "<",
    },
    controller: [
        "$location",
        "$element",
        "$scope",
        function ($location, $element, $scope) {
            let $ctrl = this

            const selectionManager = new util.SelectionManager()

            $ctrl.onKwicClick = (event) => {
                if (event.target.classList.contains("word")) {
                    onWordClick(event)
                } else {
                    if (
                        event.target.id === "frontendDownloadLinks" ||
                        event.target.classList.contains("kwicDownloadLink")
                    ) {
                        return
                    }
                    if (!selectionManager.hasSelected()) {
                        return
                    }
                    selectionManager.deselect()
                    statemachine.send("DESELECT_WORD")
                }
            }

            $ctrl._settings = settings

            $ctrl.page = Number($location.search().page) || 0

            $ctrl.pageChange = (page) => {
                $ctrl.page = page
                $ctrl.pageEvent(page)
            }

            const isParallelMode = window.currentModeParallel

            $ctrl.toggleReading = () => {
                $ctrl.readingMode = !$ctrl.readingMode
                $ctrl.contextChangeEvent()
            }

            $ctrl.readingMode = $location.search().reading_mode

            $ctrl.download = {
                options: [
                    { value: "", label: "download_kwic" },
                    { value: "kwic/csv", label: "download_kwic_csv" },
                    { value: "kwic/tsv", label: "download_kwic_tsv" },
                    { value: "annotations/csv", label: "download_annotations_csv", disabled: isParallelMode },
                    { value: "annotations/tsv", label: "download_annotations_tsv", disabled: isParallelMode },
                ],
                selected: "",
                init: (value, hitsDisplay) => {
                    if (s.download.blobName) {
                        URL.revokeObjectURL(s.download.blobName)
                    }
                    if (value === "") {
                        return
                    }
                    const requestData = s.instance.getProxy().prevParams
                    const [fileName, blobName] = this.kwicDownload.makeDownload(
                        ...value.split("/"),
                        s.kwic.length > 0 ? s.kwic : s.contextKwic,
                        requestData,
                        hitsDisplay
                    )
                    s.download.fileName = fileName
                    s.download.blobName = blobName
                    s.download.selected = ""
                    // TODO this needs to be fixed
                    // this.timeout(() => s.instance.$result[0].getElementsByClassName("kwicDownloadLink")[0].click(), 0)
                },
            }

            $ctrl.selectLeft = function (sentence) {
                if (!sentence.match) {
                    return
                }
                return sentence.tokens.slice(0, sentence.match.start)
            }

            $ctrl.selectMatch = function (sentence) {
                if (!sentence.match) {
                    return
                }
                const from = sentence.match.start
                return sentence.tokens.slice(from, sentence.match.end)
            }

            $ctrl.selectRight = function (sentence) {
                if (!sentence.match) {
                    return
                }
                const from = sentence.match.end
                const len = sentence.tokens.length
                return sentence.tokens.slice(from, len)
            }

            function onWordClick(event) {
                event.stopPropagation()
                // if (this.isActive()) {
                // }
                const scope = $(event.target).scope()
                const obj = scope.wd
                const sent = scope.sentence
                const word = $(event.target)

                statemachine.send("SELECT_WORD", {
                    sentenceData: sent.structs,
                    wordData: obj,
                    corpus: sent.corpus.toLowerCase(),
                    tokens: sent.tokens,
                    inReadingMode: false,
                })
                selectWord(word, scope, sent)
            }

            function selectWord(word, scope) {
                const obj = scope.wd
                let aux = null
                if (obj.dephead != null) {
                    const i = Number(obj.dephead)

                    const paragraph = word.closest(".sentence").find(".word")
                    let sent_start = 0
                    const querySentStart = ".open_sentence"
                    if (word.is(querySentStart)) {
                        sent_start = paragraph.index(word)
                    } else {
                        const l = paragraph.filter((__, item) => $(item).is(word) || $(item).is(querySentStart))
                        sent_start = paragraph.index(l.eq(l.index(word) - 1))
                    }
                    aux = $(paragraph.get(sent_start + i - 1))
                }
                selectionManager.select(word, aux)
            }

            function centerScrollbar() {
                const m = $element.find(".match:first")
                if (!m.length) {
                    return
                }
                const area = $element.find(".table_scrollarea").scrollLeft(0)
                const match = m.first().position().left + m.width() / 2
                const sidebarWidth = $("#sidebar").outerWidth() || 0
                area.stop(true, true).scrollLeft(match - ($("body").innerWidth() - sidebarWidth) / 2)
            }

            function centerScrollbarParallel() {
                const scrollLeft = $(".table_scrollarea", this.$result).scrollLeft() || 0
                let changed = true
                const prevValues = []

                // loop until the placement of linked sentences have settled
                while (changed) {
                    changed = false
                    let i = 0
                    for (let linked of $(".table_scrollarea > .kwic .linked_sentence").get()) {
                        const mainrow = $(linked).prev()
                        if (!mainrow.length) {
                            continue
                        }
                        let firstWord = mainrow.find(".left .word:first")
                        if (!firstWord.length) {
                            firstWord = mainrow.find(".match .word:first")
                        }
                        const offset = Math.round(firstWord.position().left + scrollLeft - 25)
                        $(linked).find(".lnk").css("padding-left", offset)

                        const threshold = 25
                        if (offset - (prevValues[i] || 0) > threshold) {
                            changed = true
                        }

                        prevValues[i] = offset
                        i++
                    }
                }
            }

            $ctrl.$onChanges = (changeObj) => {
                if ("kwic" in changeObj) {
                    if (!$ctrl.isReading) {
                        if (currentMode === "parallel") {
                            centerScrollbarParallel()
                        } else {
                            centerScrollbar()
                        }
                    }
                }
                // TODO backend download, make sure it still works, maybe rewrite to angular
                // if (settings["enable_backend_kwic_download"]) {
                //     util.setDownloadLinks(this.proxy.prevRequest, data)
                // }
            }
        },
    ],
}
