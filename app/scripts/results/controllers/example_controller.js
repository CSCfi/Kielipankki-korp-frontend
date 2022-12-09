/** @format */
import { KwicCtrl } from "./kwic_controller"

const korpApp = angular.module("korpApp")

class ExampleCtrl extends KwicCtrl {
    static initClass() {
        this.$inject = ["$scope", "utils", "$location", "$rootScope", "$timeout"]
    }
    constructor(scope, utils, $location, $rootScope, $timeout) {
        super(scope, utils, $location, $rootScope, $timeout)
        const s = this.scope

        s.tabindex = s.$parent.$parent.tabset.tabs.length - 1 + s.$parent.$index

        s.newDynamicTab()

        s.isReadingMode = () => {
            return s.exampleReadingMode
        }

        s.hitspictureClick = function (pageNumber) {
            s.pageChange(Number(pageNumber))
        }

        s.pageChange = function (page) {
            s.page = page
            s.makeRequest()
        }

        s.exampleReadingMode = s.kwicTab.readingMode

        s.toggleReading = function () {
            s.exampleReadingMode = !s.exampleReadingMode
            if (s.getProxy().pendingRequests.length) {
                return $.when(...(s.getProxy().pendingRequests || [])).then(() => s.makeRequest())
            }
        }

        s.closeTab = function (idx, e) {
            e.preventDefault()
            s.kwicTabs.splice(idx, 1)
            s.closeDynamicTab()
        }

        s.setupReadingWatch = _.once(function () {
            let init = true
            return s.$watch("reading_mode", function () {
                if (!init) {
                    s.readingChange()
                }
                init = false
            })
        })

        s.superRenderResult = s.renderResult
        s.renderResult = (data) => {
            s.superRenderResult(data)
            s.setupReadingWatch()
        }

        s.makeRequest = () => {
            const items_per_page = parseInt(locationSearch().hpp || settings["hits_per_page_default"])
            const opts = s.kwicTab.queryParams

            s.hasData = false
            // example tab cannot handle incremental = true
            opts.ajaxParams.incremental = false

            opts.ajaxParams.start = s.$parent.page * items_per_page
            opts.ajaxParams.end = opts.ajaxParams.start + items_per_page - 1

            let avoidContext, preferredContext
            if (s.isReadingMode()) {
                preferredContext = settings["default_reading_context"]
                avoidContext = settings["default_overview_context"]
            } else {
                preferredContext = settings["default_overview_context"]
                avoidContext = settings["default_reading_context"]
            }

            const context = settings.corpusListing.getContextQueryStringFromCorpusId(
                (opts.ajaxParams.corpus || "").split(","),
                preferredContext,
                avoidContext
            )
            _.extend(opts.ajaxParams, { context, default_context: preferredContext })

            s.loading = true
            if (opts.command == "relations_sentences") {
                s.onExampleProgress = () => {}
            } else {
                s.onExampleProgress = s.onProgress
            }

            const def = s.proxy.makeRequest(
                opts,
                null,
                (progressObj) => $timeout(() => s.onExampleProgress(progressObj)),
                (data) => {
                    $timeout(() => {
                        s.renderResult(data, opts.cqp)
                        s.renderCompleteResult(data)
                        s.loading = false
                    })
                }
            )

            def.fail(() => {
                $timeout(() => s.loading = false)
            })

            return def
        }

        s.isActive = () => {
            return s.tabindex == s.$parent.$parent.tabset.active
        }

        if (s.kwicTab.queryParams) {
            s.makeRequest().then(() => {
                s.onentry()
            })
        }
    }

    initPage() {
        this.scope.page = 0
    }
    setupHash() {}
}
ExampleCtrl.initClass()

korpApp.directive("exampleCtrl", () => ({ controller: ExampleCtrl }))
