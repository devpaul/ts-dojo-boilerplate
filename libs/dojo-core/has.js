(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './global', 'dojo-shim/support/has', 'dojo-shim/support/has'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var global_1 = require('./global');
    var has_1 = require('dojo-shim/support/has');
    __export(require('dojo-shim/support/has'));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = has_1.default;
    has_1.add('object-assign', typeof global_1.default.Object.assign === 'function');
    has_1.add('raf', typeof requestAnimationFrame === 'function');
    has_1.add('arraybuffer', typeof global_1.default.ArrayBuffer !== 'undefined');
    has_1.add('formdata', typeof global_1.default.FormData !== 'undefined');
    has_1.add('xhr', typeof global_1.default.XMLHttpRequest !== 'undefined');
    has_1.add('xhr2', has_1.default('xhr') && 'responseType' in global_1.default.XMLHttpRequest.prototype);
    has_1.add('xhr2-blob', function () {
        if (!has_1.default('xhr2')) {
            return false;
        }
        var request = new XMLHttpRequest();
        request.open('GET', '/', true);
        request.responseType = 'blob';
        request.abort();
        return request.responseType === 'blob';
    });
});
//# sourceMappingURL=has.js.map