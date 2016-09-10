(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'dojo-shim/Promise'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Promise_1 = require('dojo-shim/Promise');
    console.log('hello world!');
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        app: Promise_1.default.resolve(null)
    };
});
//# sourceMappingURL=../_debug/main.js.map