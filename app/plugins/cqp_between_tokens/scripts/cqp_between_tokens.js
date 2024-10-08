
// Plugin cqp_between_tokens
//
// Callback methods to handle the "ignoreBetweenTokensCQP" property of
// corpus configurations: specify a CQP expression to insert between
// tokens in the extended search, effectively ignoring tokens matching
// it between tokens when searching.
//
// Converted from modifications to Korp 5 code. (Jyrki Niemi
// 2024-09-26)


// Plugin class

class CQPBetweenTokens {

    constructor () {
        // Plugin name
        this.name = "cqp_between_tokens"
        // Reference to the global corpus listing, initialized in
        // onCorpusListingConstructed
        this._corpusListing = null
    }

    // Callback methods called at hook points

    // Initialize ignoreBetweenTokens in CorpusListing
    onCorpusListingConstructed (corpusListing) {
        // The CorpusListing constructor is also called in
        // CorpusListing.subsetFactory to create a subset of a
        // CorpusListing, but we need to use the first, global
        // CorpusListing containing all the corpora, constructed in a
        // mode file. Thus, if this._corpusListing already has a
        // non-null value, do nothing.
        if (this._corpusListing) {
            return
        }
        this._corpusListing = corpusListing
        this._updateIgnoreBetweenTokensCQP()
    }

    // Update ignoreBetweenTokens in CorpusListing.select
    onCorpusListingSelect (corpusListing, idArray) {
        this._updateIgnoreBetweenTokensCQP()
    }

    // When corpus selection is changed, update the ignorable tokens
    // between tokens and set the CQP expression shown in the advanced
    // search for the extended search. If opts contains key
    // "updateExtendedCQP", its value should be a function that is
    // called without arguments to update the CQP expression
    // corresponding to the extended search. This makes the CQP
    // expression shown in the advanced search for the extended search
    // reflect the possible change in ignoreBetweenTokensCQP caused by
    // a change in selected corpora.
    onCorpusChooserChange (opts = {}) {
        this._updateIgnoreBetweenTokensCQP()
        if ("updateExtendedCQP" in opts) {
            opts.updateExtendedCQP()
        }
    }

    // Add the possible ignorable tokens between tokens to the CQP
    // expression after expanding operators.
    filterExpandedCQP (cqp) {
        return this._addIgnoreBetweenTokensCQP(cqp)
    }

    // Add the possible ignorable tokens between tokens (regardless of
    // the current search tab) to the CQP of the extended search. This
    // makes the modified version to be shown in the advanced search
    // as the extended search expression.
    // (Jyrki Niemi 2015-09-25, 2016-03-18)
    filterExtendedCQP (cqp) {
        return this._addIgnoreBetweenTokensCQP(cqp, true)
    }

    // Internal methods

    // Update the CQP token expression to be ignored between tokens: it
    // takes effect only if all the selected corpora have the same
    // ignore expression (property ignoreBetweenTokensCQP).
    // (Jyrki Niemi 2015-09-25, 2016-03-17, 2024-09-26)
    _updateIgnoreBetweenTokensCQP () {
        const ignoreCqps = (_(this._corpusListing.selected)
                            .map("ignoreBetweenTokensCQP")
                            .uniq().value())
        // c.log("ignoreCqps", ignoreCqps)
        this._corpusListing.ignoreBetweenTokensCQP =
            ignoreCqps.length === 1 ? ignoreCqps[0] : ""
        c.log("ignoreBetweenTokensCQP", this._corpusListing.ignoreBetweenTokensCQP)
        return this._corpusListing.ignoreBetweenTokensCQP
    }

    // Add a CQP token expression to be ignored between the individual
    // token expressions in cqp, based on the property
    // ignoreBetweenTokensCQP of the corpus confgiuration. The
    // expression to be ignored is added only if all the selected
    // corpora have the same ignore expression and only in the
    // extended search (could be in the simple search as well) or if
    // the argument force is true.
    // (Jyrki Niemi 2015-09-25, 2016-03-17, 2024-09-26)
    _addIgnoreBetweenTokensCQP (cqp, force = false) {
        // c.log("_addIgnoreCQPBetweenTokens called", cqp, this._corpusListing.ignoreBetweenTokensCQP, search().search_tab)
        // The value of search_tab seems to be sometimes an integer and
        // sometimes a string.
        if (this._corpusListing.ignoreBetweenTokensCQP
                && (force || Number(search().search_tab) === 1)) {
            // c.log("_addIgnoreCQPBetweenTokens before:", cqp)
            cqp = this._insertBetweenCQPTokens(
                cqp, this._corpusListing.ignoreBetweenTokensCQP)
            c.log("_addIgnoreCQPBetweenTokens after:", cqp)
        }
        return cqp;
    }

    // Insert the CQP expression insertCqp between each pair of token
    // expressions in the CQP expression baseCqp (Jyrki Niemi
    // 2015-09-25, 2016-03-17, 2024-09-26)
    _insertBetweenCQPTokens (baseCqp, insertCqp) {
        // Split the original CQP expression so that each token
        // expression [...] and each string between them is a separate
        // string.
        const cqpTokens = baseCqp.match(
            /\[([^\]\"\']*("([^\\\"]|\\.)*"|'([^\\\']|\\.)*'))*[^\]\"\']*\]|([^\[]+)/g)
        // Append the insert expression to each token expression and
        // enclose them together in parentheses, so that repetition
        // and other regexp operators work correctly for the augmented
        // token expression.
        const tokenCount = cqpTokens.length
        let result = []
        for (let tokenNum = 0; tokenNum < tokenCount; tokenNum++) {
            token = cqpTokens[tokenNum]
            // Test for tokenNum < tokenCount -1: the insert
            // expression need not be added to the last token
            // expression if it is not followed by anything (it would
            // not hurt, though); however, if it is followed by
            // repetition {n,m} or boundary </struct>, the insert
            // expression is added
            if (token.charAt(0) === "[" && tokenNum < tokenCount - 1) {
                result.push(`(${token} ${insertCqp})`)
            } else {
                result.push(token)
            }
        }
        return result.join("")
    }

}


// Register the plugin
plugins.register(new CQPBetweenTokens)
