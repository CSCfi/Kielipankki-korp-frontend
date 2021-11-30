
// Custom statistics formatting functions that can be specified in the
// stats_cqp and stats_stringify properties of an attribute

export default {

    // Non-set word (positional) attribute: Only join the values
    stringifyPlainWordAttr: (values) => values.join(" "),

    // Non-set word attribute
    cqpPlainWordAttr: (tokens, ignoreCase, type) => (
        `${type} = "${regescape(tokens[0])}"` + (ignoreCase ? " %c" : "")),

}
