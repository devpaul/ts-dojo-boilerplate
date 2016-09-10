(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * A cache of results of feature tests
     */
    exports.testCache = {};
    /**
     * A cache of the un-resolved feature tests
     */
    exports.testFunctions = {};
    /**
     * AMD plugin function.
     *
     * Conditional loads modules based on a has feature test value.
     *
     * @param resourceId Gives the resolved module id to load.
     * @param require The loader require function with respect to the module that contained the plugin resource in its
     *                dependency list.
     * @param load Callback to loader that consumes result of plugin demand.
     */
    function load(resourceId, require, load, config) {
        resourceId ? require([resourceId], load) : load();
    }
    exports.load = load;
    /**
     * AMD plugin function.
     *
     * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
     * value(s).
     *
     * @param resourceId The id of the module
     * @param normalize Resolves a relative module id into an absolute module id
     */
    function normalize(resourceId, normalize) {
        var tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
        var i = 0;
        function get(skip) {
            var term = tokens[i++];
            if (term === ':') {
                // empty string module name, resolves to null
                return null;
            }
            else {
                // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
                if (tokens[i++] === '?') {
                    if (!skip && has(term)) {
                        // matched the feature, get the first value from the options
                        return get();
                    }
                    else {
                        // did not match, get the second value, passing over the first
                        get(true);
                        return get(skip);
                    }
                }
                // a module
                return term;
            }
        }
        var id = get();
        return id && normalize(id);
    }
    exports.normalize = normalize;
    /**
     * Check if a feature has already been registered
     *
     * @param feature the name of the feature
     */
    function exists(feature) {
        return Boolean(feature in exports.testCache || exports.testFunctions[feature]);
    }
    exports.exists = exists;
    /**
     * Register a new test for a named feature.
     *
     * @example
     * has.add('dom-addeventlistener', !!document.addEventListener);
     *
     * @example
     * has.add('touch-events', function () {
     *    return 'ontouchstart' in document
     * });
     *
     * @param feature the name of the feature
     * @param value the value reported of the feature, or a function that will be executed once on first test
     * @param overwrite if an existing value should be overwritten. Defaults to false.
     */
    function add(feature, value, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        if (exists(feature) && !overwrite) {
            throw new TypeError("Feature \"" + feature + "\" exists and overwrite not true.");
        }
        if (typeof value === 'function') {
            exports.testFunctions[feature] = value;
        }
        else {
            exports.testCache[feature] = value;
            delete exports.testFunctions[feature];
        }
    }
    exports.add = add;
    /**
     * Return the current value of a named feature.
     *
     * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
     */
    function has(feature) {
        var result;
        if (exports.testFunctions[feature]) {
            result = exports.testCache[feature] = exports.testFunctions[feature].call(null);
            delete exports.testFunctions[feature];
        }
        else if (feature in exports.testCache) {
            result = exports.testCache[feature];
        }
        else {
            throw new TypeError("Attempt to detect unregistered has feature \"" + feature + "\"");
        }
        return result;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = has;
    /*
     * Out of the box feature tests
     */
    /* Evironments */
    add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
    add('host-node', function () {
        if (typeof process === 'object' && process.versions && process.versions.node) {
            return process.versions.node;
        }
    });
});
//# sourceMappingURL=has.js.map