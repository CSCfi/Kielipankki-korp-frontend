
// Load custom styles (modifications) from ../styles using Webpack
// require

function requireAll(r) { r.keys().forEach(r) }

// Load all styles under ../styles/kielipankki
requireAll(require.context("../styles/kielipankki", true, /\.s?css$/))

// Sidebar style modifications
require("../styles/sidebar_mods.scss")
