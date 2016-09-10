(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './array', './iterator', './Map', './math', './number', './object', './Set', './string', './Symbol', './WeakMap'], factory);
    }
})(function (require, exports) {
    "use strict";
    var array = require('./array');
    exports.array = array;
    var iterator = require('./iterator');
    exports.iterator = iterator;
    var Map_1 = require('./Map');
    exports.Map = Map_1.default;
    var math = require('./math');
    exports.math = math;
    var number = require('./number');
    exports.number = number;
    var object = require('./object');
    exports.object = object;
    var Set_1 = require('./Set');
    exports.Set = Set_1.default;
    var string = require('./string');
    exports.string = string;
    var Symbol_1 = require('./Symbol');
    exports.Symbol = Symbol_1.default;
    var WeakMap_1 = require('./WeakMap');
    exports.WeakMap = WeakMap_1.default;
});
//# sourceMappingURL=main.js.map