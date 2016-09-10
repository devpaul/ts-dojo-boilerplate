(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'dojo-shim/string'], factory);
    }
})(function (require, exports) {
    "use strict";
    var string_1 = require('dojo-shim/string');
    var escapeRegExpPattern = /[[\]{}()|\/\\^$.*+?]/g;
    var escapeXmlPattern = /[&<]/g;
    var escapeXmlForPattern = /[&<>'"]/g;
    var escapeXmlMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
    };
    /**
     * Performs validation and padding operations used by padStart and padEnd.
     */
    function getPadding(name, text, length, character) {
        if (character === void 0) { character = '0'; }
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string.');
        }
        if (character.length !== 1) {
            throw new TypeError('string.' + name + ' requires a valid padding character.');
        }
        if (length < 0 || length === Infinity) {
            throw new RangeError('string.' + name + ' requires a valid length.');
        }
        length -= text.length;
        return length < 1 ? '' : string_1.repeat(character, length);
    }
    /**
     * Escapes a string so that it can safely be passed to the RegExp constructor.
     * @param text The string to be escaped
     * @return The escaped string
     */
    function escapeRegExp(text) {
        return !text ? text : text.replace(escapeRegExpPattern, '\\$&');
    }
    exports.escapeRegExp = escapeRegExp;
    /**
     * Sanitizes a string to protect against tag injection.
     * @param xml The string to be escaped
     * @param forAttribute Whether to also escape ', ", and > in addition to < and &
     * @return The escaped string
     */
    function escapeXml(xml, forAttribute) {
        if (forAttribute === void 0) { forAttribute = true; }
        if (!xml) {
            return xml;
        }
        var pattern = forAttribute ? escapeXmlForPattern : escapeXmlPattern;
        return xml.replace(pattern, function (character) {
            return escapeXmlMap[character];
        });
    }
    exports.escapeXml = escapeXml;
    /**
     * Adds padding to the end of a string to ensure it is a certain length.
     * @param text The string to pad
     * @param length The target minimum length of the string
     * @param character The character to pad onto the end of the string
     * @return The string, padded to the given length if necessary
     */
    function padEnd(text, length, character) {
        if (character === void 0) { character = '0'; }
        return text + getPadding('padEnd', text, length, character);
    }
    exports.padEnd = padEnd;
    /**
     * Adds padding to the beginning of a string to ensure it is a certain length.
     * @param text The string to pad
     * @param length The target minimum length of the string
     * @param character The character to pad onto the beginning of the string
     * @return The string, padded to the given length if necessary
     */
    function padStart(text, length, character) {
        if (character === void 0) { character = '0'; }
        return getPadding('padStart', text, length, character) + text;
    }
    exports.padStart = padStart;
});
//# sourceMappingURL=stringExtras.js.map