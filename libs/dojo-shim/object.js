(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Symbol'], factory);
    }
})(function (require, exports) {
    "use strict";
    require('./Symbol');
    var Shim;
    (function (Shim) {
        function is(value1, value2) {
            if (value1 === value2) {
                return value1 !== 0 || 1 / value1 === 1 / value2; // -0
            }
            return value1 !== value1 && value2 !== value2; // NaN
        }
        Shim.is = is;
        function getOwnPropertySymbols(o) {
            return Object.getOwnPropertyNames(o).filter(function (key) { return Boolean(key.match(/^@@.+/)); })
                .map(function (key) { return Symbol.for(key.substring(2)); });
        }
        Shim.getOwnPropertySymbols = getOwnPropertySymbols;
        function getOwnPropertyNames(o) {
            return Object.getOwnPropertyNames(o).filter(function (key) { return !Boolean(key.match(/^@@.+/)); });
        }
        Shim.getOwnPropertyNames = getOwnPropertyNames;
    })(Shim || (Shim = {}));
    /**
     * Determines whether two values are the same value.
     *
     * @param value1 The first value to compare
     * @param value2 The second value to compare
     * @return true if the values are the same; false otherwise
     */
    exports.is = 'is' in Object
        ? Object.is
        : Shim.is;
    /**
     * Returns an array of own properties who key is a symbol
     *
     * @param o The object to return the properties for
     */
    exports.getOwnPropertySymbols = 'getOwnPropertySymbols' in Object
        ? Object.getOwnPropertySymbols
        : Shim.getOwnPropertySymbols;
    /**
     * Returns an array of own properties who key is a string
     *
     * @param o The object to return the properties for
     */
    /* intentionally detecting `getOwnPropertySymbols` because we should should provide the shim
     * when there is no support for symbols */
    exports.getOwnPropertyNames = 'getOwnPropertySymbols' in Object
        ? Object.getOwnPropertyNames
        : Shim.getOwnPropertyNames;
});
//# sourceMappingURL=object.js.map