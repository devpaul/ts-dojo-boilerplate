(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './support/has', './support/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var has_1 = require('./support/has');
    var util_1 = require('./support/util');
    /**
     * The minimum location of high surrogates
     */
    exports.HIGH_SURROGATE_MIN = 0xD800;
    /**
     * The maximum location of high surrogates
     */
    exports.HIGH_SURROGATE_MAX = 0xDBFF;
    /**
     * The minimum location of low surrogates
     */
    exports.LOW_SURROGATE_MIN = 0xDC00;
    /**
     * The maximum location of low surrogates
     */
    exports.LOW_SURROGATE_MAX = 0xDFFF;
    var Shim;
    (function (Shim) {
        /**
         * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
         * Used by startsWith, includes, and endsWith.
         *
         * @return Normalized position.
         */
        function normalizeSubstringArgs(name, text, search, position, isEnd) {
            if (isEnd === void 0) { isEnd = false; }
            if (text == null) {
                throw new TypeError('string.' + name + ' requires a valid string to search against.');
            }
            var length = text.length;
            position = position !== position ? (isEnd ? length : 0) : position;
            return [text, String(search), Math.min(Math.max(position, 0), length)];
        }
        function raw(callSite) {
            var substitutions = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                substitutions[_i - 1] = arguments[_i];
            }
            var rawStrings = callSite.raw;
            var result = '';
            var numSubstitutions = substitutions.length;
            if (callSite == null || callSite.raw == null) {
                throw new TypeError('string.raw requires a valid callSite object with a raw value');
            }
            for (var i = 0, length_1 = rawStrings.length; i < length_1; i++) {
                result += rawStrings[i] + (i < numSubstitutions && i < length_1 - 1 ? substitutions[i] : '');
            }
            return result;
        }
        Shim.raw = raw;
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i - 0] = arguments[_i];
            }
            // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
            var length = arguments.length;
            if (!length) {
                return '';
            }
            var fromCharCode = String.fromCharCode;
            var MAX_SIZE = 0x4000;
            var codeUnits = [];
            var index = -1;
            var result = '';
            while (++index < length) {
                var codePoint = Number(arguments[index]);
                // Code points must be finite integers within the valid range
                var isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint &&
                    codePoint >= 0 && codePoint <= 0x10FFFF;
                if (!isValid) {
                    throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
                }
                if (codePoint <= 0xFFFF) {
                    // BMP code point
                    codeUnits.push(codePoint);
                }
                else {
                    // Astral code point; split in surrogate halves
                    // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    codePoint -= 0x10000;
                    var highSurrogate = (codePoint >> 10) + exports.HIGH_SURROGATE_MIN;
                    var lowSurrogate = (codePoint % 0x400) + exports.LOW_SURROGATE_MIN;
                    codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                    result += fromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result;
        }
        Shim.fromCodePoint = fromCodePoint;
        function codePointAt(text, position) {
            if (position === void 0) { position = 0; }
            // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
            if (text == null) {
                throw new TypeError('string.codePointAt requries a valid string.');
            }
            var length = text.length;
            if (position !== position) {
                position = 0;
            }
            if (position < 0 || position >= length) {
                return undefined;
            }
            // Get the first code unit
            var first = text.charCodeAt(position);
            if (first >= exports.HIGH_SURROGATE_MIN && first <= exports.HIGH_SURROGATE_MAX && length > position + 1) {
                // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                var second = text.charCodeAt(position + 1);
                if (second >= exports.LOW_SURROGATE_MIN && second <= exports.LOW_SURROGATE_MAX) {
                    return (first - exports.HIGH_SURROGATE_MIN) * 0x400 + second - exports.LOW_SURROGATE_MIN + 0x10000;
                }
            }
            return first;
        }
        Shim.codePointAt = codePointAt;
        /* TODO: Missing normalize */
        function repeat(text, count) {
            if (count === void 0) { count = 0; }
            // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
            if (text == null) {
                throw new TypeError('string.repeat requires a valid string.');
            }
            if (count !== count) {
                count = 0;
            }
            if (count < 0 || count === Infinity) {
                throw new RangeError('string.repeat requires a non-negative finite count.');
            }
            var result = '';
            while (count) {
                if (count % 2) {
                    result += text;
                }
                if (count > 1) {
                    text += text;
                }
                count >>= 1;
            }
            return result;
        }
        Shim.repeat = repeat;
        function startsWith(text, search, position) {
            if (position === void 0) { position = 0; }
            search = String(search);
            _a = normalizeSubstringArgs('startsWith', text, search, position), text = _a[0], search = _a[1], position = _a[2];
            var end = position + search.length;
            if (end > text.length) {
                return false;
            }
            return text.slice(position, end) === search;
            var _a;
        }
        Shim.startsWith = startsWith;
        function endsWith(text, search, endPosition) {
            if (endPosition == null) {
                endPosition = text.length;
            }
            _a = normalizeSubstringArgs('endsWith', text, search, endPosition, true), text = _a[0], search = _a[1], endPosition = _a[2];
            var start = endPosition - search.length;
            if (start < 0) {
                return false;
            }
            return text.slice(start, endPosition) === search;
            var _a;
        }
        Shim.endsWith = endsWith;
        function includes(text, search, position) {
            if (position === void 0) { position = 0; }
            _a = normalizeSubstringArgs('includes', text, search, position), text = _a[0], search = _a[1], position = _a[2];
            return text.indexOf(search, position) !== -1;
            var _a;
        }
        Shim.includes = includes;
    })(Shim = exports.Shim || (exports.Shim = {}));
    /**
     * A tag function for template strings to get the template string's raw string form.
     *
     * @param callSite Call site object (or a template string in TypeScript, which will transpile to one)
     * @param substitutions Values to substitute within the template string (TypeScript will generate these automatically)
     * @return String containing the raw template string with variables substituted
     *
     * @example
     * // Within TypeScript; logs 'The answer is:\\n42'
     * let answer = 42;
     * console.log(string.raw`The answer is:\n${answer}`);
     *
     * @example
     * // The same example as above, but directly specifying a JavaScript object and substitution
     * console.log(string.raw({ raw: [ 'The answer is:\\n', '' ] }, 42));
     */
    exports.raw = has_1.default('es6-string-raw')
        ? String.raw
        : Shim.raw;
    /**
     * Returns the UTF-16 encoded code point value of a given position in a string.
     *
     * @param text The string containing the element whose code point is to be determined
     * @param position Position of an element within the string to retrieve the code point value from
     * @return A non-negative integer representing the UTF-16 encoded code point value
     */
    exports.fromCodePoint = has_1.default('es6-string-fromcodepoint')
        ? String.fromCodePoint
        : Shim.fromCodePoint;
    /**
     * Returns the UTF-16 encoded code point value of a given position in a string.
     *
     * @param text The string containing the element whose code point is to be determined
     * @param position Position of an element within the string to retrieve the code point value from
     * @return A non-negative integer representing the UTF-16 encoded code point value
     */
    exports.codePointAt = has_1.default('es6-string-codepointat')
        ? util_1.wrapNative(String.prototype.codePointAt)
        : Shim.codePointAt;
    /**
     * Returns a string containing the given string repeated the specified number of times.
     *
     * @param text The string to repeat
     * @param count The number of times to repeat the string
     * @return A string containing the input string repeated count times
     */
    exports.repeat = has_1.default('es6-string-repeat')
        ? util_1.wrapNative(String.prototype.repeat)
        : Shim.repeat;
    /**
     * Determines whether a string begins with the given substring (optionally starting from a given index).
     *
     * @param text The string to look for the search string within
     * @param search The string to search for
     * @param position The index to begin searching at
     * @return Boolean indicating if the search string was found at the beginning of the given string
     */
    exports.startsWith = has_1.default('es6-string-startswith')
        ? util_1.wrapNative(String.prototype.startsWith)
        : Shim.startsWith;
    /**
     * Determines whether a string ends with the given substring.
     *
     * @param text The string to look for the search string within
     * @param search The string to search for
     * @param endPosition The index searching should stop before (defaults to text.length)
     * @return Boolean indicating if the search string was found at the end of the given string
     */
    exports.endsWith = has_1.default('es6-string-endswith')
        ? util_1.wrapNative(String.prototype.endsWith)
        : Shim.endsWith;
    /**
     * Determines whether a string includes the given substring (optionally starting from a given index).
     *
     * @param text The string to look for the search string within
     * @param search The string to search for
     * @param position The index to begin searching at
     * @return Boolean indicating if the search string was found within the given string
     */
    exports.includes = has_1.default('es6-string-includes')
        ? util_1.wrapNative(String.prototype.includes)
        : Shim.includes;
});
//# sourceMappingURL=string.js.map