
// Load custom styles (modifications) from ../styles using Webpack
// require

function requireAll(r) { r.keys().forEach(r) }

// Load all styles under ../styles/kielipankki
requireAll(require.context("../styles/kielipankki", true, /\.s?css$/))

// Generic style modifications
require("../styles/styles_mods.scss")

// Sidebar style modifications
require("../styles/sidebar_mods.scss")

// Newsdesk style modifications
require("../styles/newsdesk_mods.scss")
