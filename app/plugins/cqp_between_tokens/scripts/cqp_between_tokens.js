
    // Update the CQP token expression to be ignored between tokens: it
    // takes effect only if all the selected corpora have the same
    // ignore expression (property ignore_between_tokens_cqp).
    // (Jyrki Niemi 2015-09-25, 2016-03-17)
    updateIgnoreBetweenTokensCQP() {
        const ignore_cqps =
            _(this.selected)
            .pluck("ignore_between_tokens_cqp")
            .uniq()
            .value();
        // c.log "ignore_cqps", ignore_cqps
        this.ignore_between_tokens_cqp =
            ignore_cqps.length === 1 ?
                ignore_cqps[0]
            :
                "";
        c.log("ignore_between_tokens_cqp", this.ignore_between_tokens_cqp);
        return this.ignore_between_tokens_cqp;
    }

    // Add a CQP token expression to be ignored between the individual
    // token expressions in cqp, based on the property
    // ignore_between_tokens_cqp of the corpus configuration. The
    // expression to be ignored is added only if all the selected
    // corpora have the same ignore expression and only in the extended
    // search (could be in the simple search as well) or if the
    // argument force is true.
    // CHECK: Is this the proper place to have this functionality?
    // (Jyrki Niemi 2015-09-25, 2016-03-17)
    addIgnoreBetweenTokensCQP(cqp, force = false) {
        // c.log "addIgnoreCQPBetweenTokens called", cqp, @ignore_between_tokens_cqp, search().search_tab
        // The value of search_tab seems to be sometimes an integer and
        // sometimes a string.
        if (this.ignore_between_tokens_cqp &&
                (force || (Number(search().search_tab) === 1))) {
            // c.log "addIgnoreCQPBetweenTokens before:", cqp
            cqp = this.insertBetweenCQPTokens(cqp, this.ignore_between_tokens_cqp);
            c.log("addIgnoreCQPBetweenTokens after:", cqp);
        }
        return cqp;
    }

    // Insert the CQP expression insert_cqp between each pair of token
    // expressions in the CQP expression base_cqp (Jyrki Niemi
    // 2015-09-25, 2016-03-17)
    insertBetweenCQPTokens(base_cqp, insert_cqp) {
        // Split the original CQP expression so that each token
        // expression [...] and each string between them is a separate
        // string.
        let token;
        const cqp_tokens = base_cqp.match(
            /\[([^\]\"\']*("([^\\\"]|\\.)*"|'([^\\\']|\\.)*'))*[^\]\"\']*\]|([^\[]+)/g);
        // Find the last token proper, which need not be followed by
        // the insert expression, although it does not make a
        // difference in the result if it is optional.
        const last_token_num = _(cqp_tokens)
                         .map(token => token.charAt(0) === "[")
                         .lastIndexOf(true);
        // Append the insert expression to each token expression and
        // enclose them together in parentheses, so that repetition and
        // other regexp operators work correctly for the augmented
        // token expression.
        const result = (() => {
            const result1 = [];
            for (let token_num = 0; token_num < cqp_tokens.length; token_num++) {
                token = cqp_tokens[token_num];
                 if ((token.charAt(0) === "[") && (token_num < last_token_num)) {
                     result1.push("(" + token + " " + insert_cqp + ")");
                 } else {
                     result1.push(token);
                }
            }
            return result1;
        })();
        return result.join("");
    }
