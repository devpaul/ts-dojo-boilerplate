(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './global'], factory);
    }
})(function (require, exports) {
    "use strict";
    var global_1 = require('./global');
    /* tslint:disable-next-line:variable-name */
    var Promise = 'Promise' in global_1.default
        ? global_1.default.Promise
        : typeof process === 'object' && process.versions && process.versions.node
            ? require('dojo-shim/dist/umd/Promise').default
            : require('dojo-shim/Promise').default;
    var load = (function () {
        if (typeof module === 'object' && typeof module.exports === 'object') {
            return function (contextualRequire) {
                var moduleIds = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    moduleIds[_i - 1] = arguments[_i];
                }
                if (typeof contextualRequire === 'string') {
                    moduleIds.unshift(contextualRequire);
                    contextualRequire = require;
                }
                return new Promise(function (resolve, reject) {
                    try {
                        resolve(moduleIds.map(function (moduleId) {
                            return contextualRequire(moduleId);
                        }));
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            };
        }
        else if (typeof define === 'function' && define.amd) {
            return function (contextualRequire) {
                var moduleIds = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    moduleIds[_i - 1] = arguments[_i];
                }
                if (typeof contextualRequire === 'string') {
                    moduleIds.unshift(contextualRequire);
                    contextualRequire = require;
                }
                return new Promise(function (resolve) {
                    // TODO: Error path once https://github.com/dojo/loader/issues/14 is figured out
                    contextualRequire(moduleIds, function () {
                        var modules = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            modules[_i - 0] = arguments[_i];
                        }
                        resolve(modules);
                    });
                });
            };
        }
        else {
            return function () {
                return Promise.reject(new Error('Unknown loader'));
            };
        }
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = load;
});
//# sourceMappingURL=load.js.map