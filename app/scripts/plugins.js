
// Class for a simple plugin facility
//
// Plugins are objects containing function properties which correspond
// to plugin callback functions for named hook points. A plugin can be
// either a simple object or an object created from a prototype. Each
// plugin must be registered with Plugins.register(plugin).
//
// Callback functions in a plugin object may be mapped to hook points
// in two ways:
// 1. If plugin contains property "callbacks", its keys are regarded
//    as hook point names and their values are the callback functions
//    in plugin to be registered for the hook point. The values may
//    be either single functions (function references), lists of
//    them or strings (the name of the function property in plugin).
// 2. If plugin does not contain property "callbacks", all function
//    properties whose names do not begin or end with an
//    underscore in plugin and its direct prototype are added as
//    callbacks, taking the function name as the name of the hook
//    point.
//
// Callback functions for a hook point are called via
// Plugins.callActions (for functions not returning a value or whose
// return value is discarded) or Plugins.callFilters (functions
// returning a value); see the descriptions of these functions below
// for more information.
//
// Plugin callbacks are called in the order in which the plugins have
// been registered. A rudimentary way of controlling the registration
// order is to specify arrays providesFeatures and requiresFeatures in
// the plugin objects: if a plugin has a value (string) in
// requiresFeatures that has not yet appeared in the providesFeatures
// of a registered plugin, registering it is deferred until a plugin
// providing the feature has been registered.
//
// If a plugin has the property "name" (a string), it can be
// explicitly enabled or disabled by including the name in the array
// settings.pluginsEnabled or settings.pluginsDisabled, respectively.
// If settings.pluginsEnabled is defined, only the plugins listed in
// it are enabled.

// A plugin can also be disabled by setting its property "disabled" to
// true in the plugin class constructor. This can be used to disable a
// plugin if the configuration does not contain settings required by
// the plugin, for example.
//
// A plugin may contain method "initialize", which is called (without
// arguments) only for enabled plugins, unlike "constructor", which is
// called at object creation time, regardless of whether the plugin is
// enabled or not.
//
// TODO: Allow specifying the order in which individual callbacks are
// called, as callback A of plugin X might need to be called before
// that of plugin Y, but callback B of plugin Y before that of plugin
// X.


const Plugins = class Plugins {

    constructor () {
        // Plugin callback function object: each property corresponds to a
        // hook point (a type of plugin function) and its value is an
        // array of functions to be called at the hook point.
        this.callbacks = {}
        // Array of registered plugin objects in the order in which
        // they have been registered and in which their callbacks are
        // called
        this.registeredPlugins = []
        // Registered plugin objects with their name as the key
        // (object property name); this lists only plugins with a
        // "name" property
        this.registeredPluginsByName = {}
        // The features provided by the plugins registered this far
        // (array of strings)
        this.providedFeatures = []
        // Plugins whose registering has been deferred as their
        // required features have not yet been provided by other
        // plugins: an object whose property names are feature names
        // and their values are arrays of plugin objects requiring the
        // named feature. A plugin object occurs in the value of
        // multiple properties if it is waiting for multiple features.
        this.pluginsWaitingForFeatures = {}
        // Names of AngularJS modules defined by plugins, to be added
        // as dependencies to the Korp app
        this.angularModules = []
        // Normalize plugin names in settings.pluginsEnabled and
        // settings.pluginsDisabled
        for (const setting of ["pluginsEnabled", "pluginsDisabled"]) {
            if (settings[setting]) {
                settings[setting] =
                    settings[setting].map((val) => this.normalizePluginName(val))
            }
        }
    }

    // Return pluginName normalized to an underscored, lower-cased
    // variant: PluginName -> plugin_name, plugin-name -> plugin_name
    normalizePluginName (pluginName) {
        if (pluginName) {
            return (pluginName
                    .replaceAll(/([A-Z])/g, "_$1")
                    .replaceAll("-", "_")
                    .replaceAll(/_+/g, "_")
                    .replace(/^_/, "")
                    .toLowerCase())
        } else {
            return pluginName
        }
    }

    // Add (append) callback function func in object plugin to hook point
    // hookPoint.
    addCallback (hookPoint, func, plugin) {
        if (! (hookPoint in this.callbacks)) {
            this.callbacks[hookPoint] = []
        }
        // Add a reference to the plugin object as the property
        // "plugin" of the bound function
        const bound_func = func.bind(plugin)
        bound_func.plugin = plugin
        this.callbacks[hookPoint].push(bound_func)
    }

    // Register a plugin object containing function properties which
    // correspond to plugin callback functions and are added to
    // this.callbacks, each to the array of the property with the name
    // of the hook point.
    register (plugin) {

        // Return true if the plugin is enabled, by checking if its
        // name is contained in settings.pluginsEnabled (enable only
        // the listed plugins) or settings.pluginsDisabled (enable all
        // plugins except the listed ones) and if its property
        // "disabled" is falsey.
        const isEnabled = (plugin) => {
            // The plugin name has to be specified explicitly, as
            // plugin.constructor.name is not the original class name
            // in minified code
            const pluginName = this.normalizePluginName(plugin.name)
            const enabled =
                  (! plugin.disabled &&
                   (! pluginName ||
                    (settings.pluginsEnabled
                     && settings.pluginsEnabled.includes(pluginName)) ||
                    (settings.pluginsDisabled
                     && ! settings.pluginsDisabled.includes(pluginName)) ||
                    (! settings.pluginsEnabled && ! settings.pluginsDisabled)))
            if (! enabled) {
                c.log("Plugin", plugin.name || plugin.constructor.name,
                      "is disabled")
            }
            return enabled
        }

        // Return the names of methods in obj and its direct
        // prototype. Modified from
        // https://flaviocopes.com/how-to-list-object-methods-javascript/
        // to ignore methods further up the prototype chain.
        const getMethods = (obj) => {
            let properties = new Set()
            for (let obj2 of [obj, Object.getPrototypeOf(obj)]) {
                Object.getOwnPropertyNames(obj2)
                    .map(item => properties.add(item));
            }
            return [...properties.keys()].filter(
                item => typeof obj[item] === 'function')
        }

        // If plugin has specified the requiresFeatures property (an
        // array of strings), check if all the features have already
        // been provided by a previously registered plugin in its
        // providesFeatures property. If yes, return true; if not, add
        // the plugin to this.pluginsWaitingForFeatures and show a
        // message informing that registering the plugin is being
        // deferred.
        const checkRequiredFeatures = (plugin) => {
            if (plugin.requiresFeatures) {
                const unmet = _.difference(plugin.requiresFeatures,
                                           this.providedFeatures)
                if (unmet.length) {
                    plugin.waitingForFeatures = unmet
                    for (let feat of unmet) {
                        if (! (feat in this.pluginsWaitingForFeatures)) {
                            this.pluginsWaitingForFeatures[feat] = []
                        }
                        this.pluginsWaitingForFeatures[feat].push(plugin)
                    }
                    c.info("Deferring registering plugin",
                           plugin.constructor.name,
                           "as features required by it have not yet been",
                           "provided:", unmet.join(", "))
                    return false
                }
            }
            return true
        }

        // If plugin provides some features (has property
        // providesFeatures), add them to this.providedFeatures. If
        // other plugins have been waiting for the features and if all
        // their requirements have been provided, register them.
        const checkProvidedFeatures = (plugin) => {
            if (! plugin.providesFeatures || ! plugin.providesFeatures.length) {
                return
            }
            this.providedFeatures = _.union(this.providedFeatures,
                                            plugin.providesFeatures)
            const newlyRegisteredPlugins = []
            for (let feat of plugin.providesFeatures) {
                if (feat in this.pluginsWaitingForFeatures) {
                    for (let waitingPlugin of
                         this.pluginsWaitingForFeatures[feat]) {
                        // Remove this feature from the waitingForFeatures
                        // array of the waiting plugin
                        let featIdx =
                            waitingPlugin.waitingForFeatures.indexOf(feat)
                        waitingPlugin.waitingForFeatures.splice(featIdx, 1)
                        if (waitingPlugin.waitingForFeatures.length == 0) {
                            c.info("All features required by plugin",
                                   waitingPlugin.constructor.name,
                                   "provided; registering the plugin")
                            this.register(waitingPlugin)
                            newlyRegisteredPlugins.push(waitingPlugin)
                        }
                    }
                }
            }
            // Remove the newly registered plugins from
            // pluginsWaitingForFeatures
            for (let regPlugin of newlyRegisteredPlugins) {
                // Remove from all features listed in the
                // requiresFeatures property of the plugin
                for (let featNum in regPlugin.requiresFeatures) {
                    let feat = regPlugin.requiresFeatures[featNum]
                    let pluginIdx =
                        this.pluginsWaitingForFeatures[feat].indexOf(regPlugin)
                    this.pluginsWaitingForFeatures[feat].splice(pluginIdx, 1)
                }
            }
        }

        c.log("Plugins.register", plugin.constructor.name, plugin)
        if (! isEnabled(plugin) || ! checkRequiredFeatures(plugin)) {
            return
        }
        if (_.isFunction(plugin.initialize)) {
            plugin.initialize()
        }
        if (plugin.callbacks) {
            for (let propname of Object.getOwnPropertyNames(plugin.callbacks)) {
                let callbacks = plugin.callbacks[propname]
                if (! _.isArray(callbacks)) {
                    callbacks = [callbacks]
                }
                for (let callback of callbacks) {
                    if (_.isString(callback)) {
                        callback = plugin[callback]
                    }
                    this.addCallback(propname, callback, plugin)
                }
            }
        } else {
            for (let propname of getMethods(plugin)) {
                c.log(propname, plugin[propname],
                      _.isFunction(plugin[propname]))
                if (propname != "constructor" && propname != "initialize"
                        && ! propname.startsWith("_")
                        && ! propname.endsWith("_")
                        && _.isFunction(plugin[propname])) {
                    this.addCallback(propname, plugin[propname], plugin)
                }
            }
        }
        // c.log("callbacks", this.callbacks)
        checkProvidedFeatures(plugin)
        this.registeredPlugins.push(plugin)
        if (plugin.name) {
            const pluginName = this.normalizePluginName(plugin.name)
            if (pluginName in this.registeredPluginsByName) {
                c.warn("Duplicate plugin name:", pluginName)
            }
            this.registeredPluginsByName[pluginName] = plugin
        }
    }

    // Return the plugin with the given name if it has been registered
    // (and has the "name" property).
    getPlugin (name) {
        return this.registeredPluginsByName[this.normalizePluginName(name)]
    }

    // Call plugin callback functions (actions) registered for
    // hookPoint in the order they are in listed this.callbacks, with
    // the (optional) arguments args... The possible return value of
    // the functions is ignored.
    callActions (hookPoint, ...args) {
        // c.log("callActions", hookPoint, args, this.callbacks[hookPoint])
        for (let func of this.callbacks[hookPoint] || []) {
            // Would this be needed?
            // func(...Array.from(args || []))
            func(...args)
        }
    }

    // Call plugin callback functions (filters) registered for
    // hookPoint in the order they are in listed this.callbacks, with
    // the argument arg1 and optional rest... Each callback function
    // gets as its arg1 the return value of the previous function, and
    // this function returns the value returned by the last callback
    // function.
    callFilters (hookPoint, arg1, ...rest) {
        // c.log("callFilters", hookPoint, arg1, ...rest)
        for (let func of this.callbacks[hookPoint] || []) {
            // arg1 = func(arg1, ...Array.from(rest));
            arg1 = func(arg1, ...rest)
        }
        return arg1
    }

    // Use default_settings as defaults for settings_obj (defaulting
    // to global settings): for each key in default_settings, if
    // settings_obj[key] is undefined, set it to
    // default_settings[key].
    // This function could also be used outside plugins, so it could
    // be in util or window, for example. However, having it in
    // plugins ensures that it is available for plugins.
    setDefaultSettings (default_settings, settings_obj = settings) {
        for (let key in default_settings) {
            if (settings_obj[key] === undefined) {
                settings_obj[key] = default_settings[key]
            }
        }
    }

    // Create and return an AngularJS module name with args and
    // register it to be added as a depencency to the Korp app.
    // Plugins should typically use this instead of "angular.module".
    // This should be called from the initialize method of a plugin to
    // allow enabling and disabling the plugin.
    // Inspired by https://stackoverflow.com/a/17944566
    registerAngularModule (name, ...args) {
        // c.log("plugins.registerAngularModule", name, ...args)
        this.angularModules.push(name)
        return angular.module(name, ...args)
    }

}

// Create a global Plugins instance to which all plugins should be
// registered.
window.plugins = new Plugins()
