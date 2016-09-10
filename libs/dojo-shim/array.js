(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './support/has', './support/util', './iterator', './number'], factory);
    }
})(function (require, exports) {
    "use strict";
    var has_1 = require('./support/has');
    var util_1 = require('./support/util');
    var iterator_1 = require('./iterator');
    var number_1 = require('./number');
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    function toLength(length) {
        length = Number(length);
        if (isNaN(length)) {
            return 0;
        }
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), number_1.MAX_SAFE_INTEGER);
    }
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    }
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    }
    /**
     * A namespace that contains the polyfilled functionality that is then exported below, depending on if
     * the functionality is required or not.
     */
    var Shim;
    (function (Shim) {
        function from(arrayLike, mapFunction, thisArg) {
            if (arrayLike == null) {
                throw new TypeError('from: requires an array-like object');
            }
            if (mapFunction && thisArg) {
                mapFunction = mapFunction.bind(thisArg);
            }
            /* tslint:disable-next-line:variable-name */
            var Constructor = this;
            var length = toLength(arrayLike.length);
            // Support extension
            var array = (typeof Constructor === 'function') ? Object(new Constructor(length)) : new Array(length);
            if (!iterator_1.isArrayLike(arrayLike) && !iterator_1.isIterable(arrayLike)) {
                return array;
            }
            var i = 0;
            iterator_1.forOf(arrayLike, function (value) {
                array[i] = mapFunction ? mapFunction(value, i) : value;
                i++;
            });
            if (arrayLike.length !== undefined) {
                array.length = length;
            }
            return array;
        }
        Shim.from = from;
        function of() {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            return Array.prototype.slice.call(items);
        }
        Shim.of = of;
        function copyWithin(target, offset, start, end) {
            if (target == null) {
                throw new TypeError('copyWithin: target must be an array-like object');
            }
            var length = toLength(target.length);
            offset = normalizeOffset(toInteger(offset), length);
            start = normalizeOffset(toInteger(start), length);
            end = normalizeOffset(end === undefined ? length : toInteger(end), length);
            var count = Math.min(end - start, length - offset);
            var direction = 1;
            if (offset > start && offset < (start + count)) {
                direction = -1;
                start += count - 1;
                offset += count - 1;
            }
            while (count > 0) {
                if (start in target) {
                    target[offset] = target[start];
                }
                else {
                    delete target[offset];
                }
                offset += direction;
                start += direction;
                count--;
            }
            return target;
        }
        Shim.copyWithin = copyWithin;
        function fill(target, value, start, end) {
            var length = toLength(target.length);
            var i = normalizeOffset(toInteger(start), length);
            end = normalizeOffset(end === undefined ? length : toInteger(end), length);
            while (i < end) {
                target[i++] = value;
            }
            return target;
        }
        Shim.fill = fill;
        function find(target, callback, thisArg) {
            var index = findIndex(target, callback, thisArg);
            return index !== -1 ? target[index] : undefined;
        }
        Shim.find = find;
        function findIndex(target, callback, thisArg) {
            var length = toLength(target.length);
            if (!callback) {
                throw new TypeError('find: second argument must be a function');
            }
            if (thisArg) {
                callback = callback.bind(thisArg);
            }
            for (var i = 0; i < length; i++) {
                if (callback(target[i], i, target)) {
                    return i;
                }
            }
            return -1;
        }
        Shim.findIndex = findIndex;
        function includes(target, searchElement, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            var len = toLength(target.length);
            for (var i = fromIndex; i < len; ++i) {
                var currentElement = target[i];
                if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)) {
                    return true;
                }
            }
            return false;
        }
        Shim.includes = includes;
    })(Shim = exports.Shim || (exports.Shim = {}));
    exports.from = has_1.default('es6-array-from')
        ? Array.from
        : Shim.from;
    /**
     * Creates a new array from the function parameters.
     *
     * @param arguments Any number of arguments for the array
     * @return An array from the given arguments
     */
    exports.of = has_1.default('es6-array-of')
        ? Array.of
        : Shim.of;
    /* ES6 Array instance methods */
    /**
     * Copies data internally within an array or array-like object.
     *
     * @param target The target array-like object
     * @param offset The index to start copying values to; if negative, it counts backwards from length
     * @param start The first (inclusive) index to copy; if negative, it counts backwards from length
     * @param end The last (exclusive) index to copy; if negative, it counts backwards from length
     * @return The target
     */
    exports.copyWithin = has_1.default('es6-array-copywithin')
        ? util_1.wrapNative(Array.prototype.copyWithin)
        : Shim.copyWithin;
    /**
     * Fills elements of an array-like object with the specified value.
     *
     * @param target The target to fill
     * @param value The value to fill each element of the target with
     * @param start The first index to fill
     * @param end The (exclusive) index at which to stop filling
     * @return The filled target
     */
    exports.fill = has_1.default('es6-array-fill')
        ? util_1.wrapNative(Array.prototype.fill)
        : Shim.fill;
    /**
     * Finds and returns the first instance matching the callback or undefined if one is not found.
     *
     * @param target An array-like object
     * @param callback A function returning if the current value matches a criteria
     * @param [thisArg] The execution context for the find function
     * @return The first element matching the callback, or undefined if one does not exist
     */
    exports.find = has_1.default('es6-array-find')
        ? util_1.wrapNative(Array.prototype.find)
        : Shim.find;
    /**
     * Performs a linear search and returns the first index whose value satisfies the passed callback,
     * or -1 if no values satisfy it.
     *
     * @param target An array-like object
     * @param callback A function returning true if the current value satisfies its criteria
     * @param [thisArg] The execution context for the find function
     * @return The first index whose value satisfies the passed callback, or -1 if no values satisfy it
     */
    exports.findIndex = has_1.default('es6-array-findindex')
        ? util_1.wrapNative(Array.prototype.findIndex)
        : Shim.findIndex;
    /* ES7 Array instance methods */
    /**
     * Determines whether an array includes a given value
     *
     * @param target the target array-like object
     * @param searchElement the item to search for
     * @param fromIndex the starting index to search from
     * @return `true` if the array includes the element, otherwise `false`
     */
    exports.includes = has_1.default('es7-array-includes')
        ? util_1.wrapNative(Array.prototype.includes)
        : Shim.includes;
});
//# sourceMappingURL=array.js.map