/** @format */
// SB-newsdesk 1.0b
// Requirements: JQuery, JQuery.ui.position, trust filter, loc filter, Font Awesome

angular.module("newsdesk", []).directive("newsDesk", ($window, $document, $rootElement, $http, $location) => ({
    template: `
            <div>
                <div ng-if="shouldUseThis" class="newsdesk-opener" 
                     ng-click="togglePopover($event)" 
                     ng-class="{'newsdesk-new-news': numNewNews != 0, 'newsdesk-no-new-news' : numNewNews == 0}">
                    <i class="fa fa-bell newsdesk-bell"></i>
                    <div class="newsdesk-arrow-box">
                        <span>{{numNewNews}}</span>
                    </div>&nbsp;
                </div>
                <div class="popover newsdesk-popover" ng-click="onPopoverClick($event)" to-body>
                    <div class="arrow"></div>
                    <h2 class="popover-title">{{header | loc:lang}}<span style="float:right;cursor:pointer" ng-click="popHide()">×</span></h2>
                    <div class="newsdesk-around-items">
                        <div class="newsdesk-news-item" ng-repeat="item in newsitems" 
                             ng-class="{'newsdesk-new-news-item': (item.d > lastChecked)}">
                            <h4>{{item.t[currentLang]}}</h4>
                            <span class="newsdesk-item-date">{{item.d}}</span>
                            <div ng-bind-html="item.h[currentLang] | trust"></div>
                        </div>
                    </div>
                </div>
        </div>`,
    restrict: "EA",
    replace: true,
    scope: { header: "=", storage: "=" },
    link(scope, elem, attr) {
        const s = scope
        s.shouldUseThis = settings.newsDeskUrl != null

        if (!s.shouldUseThis) {
            return
        }

        s.onPopoverClick = (event) => event.stopPropagation()

        s.newsitems = []
        function initData() {
            let d
            s.lastChecked = localStorage.getItem(s.storage)
            if (!s.lastChecked) {
                d = new Date()
                d.setFullYear(d.getFullYear() - 1)
                s.lastChecked = d.toISOString().slice(0, 10)
            }
            $.ajax({
                type: "GET",
                url: settings.newsDeskUrl,
                async: false,
                jsonpCallback: "newsdata",
                contentType: "application/json",
                dataType: "jsonp",
                success(json) {
                    const currentDate = new Date().toISOString().slice(0, 10)
                    s.newsitems = _.filter(json, (newsitem) => {
                        return !newsitem.e || newsitem.e >= currentDate
                    })
                    let n = 0
                    for (let nItem of s.newsitems) {
                        if (nItem.d > s.lastChecked) {
                            n += 1
                        }
                    }

                    safeApply(s, () => (s.numNewNews = n))
                },

                error(e) {
                    console.log("error, couldn't fetch news", e.message)
                },
            })
        }

        s.currentLang = $location.search().lang || settings.defaultLanguage

        s.numNewNews = 0
        initData()

        s.togglePopover = function (event) {
            if (s.isPopoverVisible) {
                s.popHide()
            } else {
                s.currentLang = $location.search().lang || settings.defaultLanguage
                s.popShow()
                s.numNewNews = 0
            }
            event.preventDefault()
            event.stopPropagation()
        }

        const popover = $(".newsdesk-popover")
        s.isPopoverVisible = false

        const handleEscape = function (event) {
            if (event.which === 27) {
                s.popHide()
                return false
            }
        }

        s.popShow = function () {
            s.isPopoverVisible = true

            popover.show().focus().position({
                my: "right top",
                at: "right-10 top+10",
                of: window,
            })
            $rootElement.on("keydown", handleEscape)
            $rootElement.on("click", s.popHide)

            localStorage.setItem(s.storage, s.newsitems[0].d)
        }

        s.popHide = function () {
            s.isPopoverVisible = false
            popover.hide()
            $rootElement.off("keydown", handleEscape)
            $rootElement.off("click", s.popHide)
        }
    },
}))
