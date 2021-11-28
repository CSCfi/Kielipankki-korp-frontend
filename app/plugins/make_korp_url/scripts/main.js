
// Plugin make_korp_url
//
// Callback method to add function makeKorpUrl to the header
// controller, so that it can be used in the cog menu.


console.log("plugin make_korp_url")


// Plugin class

class MakeKorpUrl {

    // Callback method

    // Add function makeKorpUrl to the header contoller
    modifyHeaderController (scope) {
        // Make the Korp and Korp Labs URL for the cog menu links
        // preserving the current interface language.
        // TODO: Also retain other search parameters
        scope.makeKorpUrl = function (variant) {
            c.log("makeKorpUrl", variant)
            let url = settings.korpUrl[variant] || settings.korpUrl["main"]
            // TODO: Check if this works; change short_url -> shortUrl
            if (window.short_url) {
                if (url.slice(-1) !== "/") {
                    url += "/"
                }
                url += window.short_url + "/"
            }
            const lang = locationSearch().lang
            if (lang && lang !== settings.defaultLanguage) {
                url += "#?lang=" + lang
            }
            c.log("makeKorpUrl return", url)
            return url
        }
    }

}


// Register the plugin
plugins.register(new MakeKorpUrl())
