var __decorate = /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ /* istanbul ignore next */ (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './support/decorators', './support/global', './iterator', './Symbol'], factory);
    }
})(function (require, exports) {
    "use strict";
    var decorators_1 = require('./support/decorators');
    var global_1 = require('./support/global');
    var iterator_1 = require('./iterator');
    require('./Symbol');
    var Shim;
    (function (Shim) {
        var DELETED = {};
        function getUID() {
            return Math.floor(Math.random() * 100000000);
        }
        var generateName = (function () {
            var startId = Math.floor(Date.now() % 100000000);
            return function generateName() {
                return '__wm' + getUID() + (startId++ + '__');
            };
        })();
        var WeakMap = (function () {
            function WeakMap(iterable) {
                var _this = this;
                this[Symbol.toStringTag] = 'WeakMap';
                Object.defineProperty(this, '_name', {
                    value: generateName()
                });
                if (iterable) {
                    iterator_1.forOf(iterable, function (_a) {
                        var key = _a[0], value = _a[1];
                        return _this.set(key, value);
                    });
                }
            }
            WeakMap.prototype.delete = function (key) {
                var entry = key[this._name];
                if (entry && entry.key === key && entry.value !== DELETED) {
                    entry.value = DELETED;
                    return true;
                }
                return false;
            };
            WeakMap.prototype.get = function (key) {
                var entry = key[this._name];
                if (entry && entry.key === key && entry.value !== DELETED) {
                    return entry.value;
                }
            };
            WeakMap.prototype.has = function (key) {
                var entry = key[this._name];
                return Boolean(entry && entry.key === key && entry.value !== DELETED);
            };
            WeakMap.prototype.set = function (key, value) {
                if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                    throw new TypeError('Invalid value used as weak map key');
                }
                var entry = key[this._name];
                if (!entry || entry.key !== key) {
                    entry = Object.create(null, {
                        key: { value: key }
                    });
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
                entry.value = value;
                return this;
            };
            return WeakMap;
        }());
        Shim.WeakMap = WeakMap;
    })(Shim || (Shim = {}));
    var WeakMap = (function () {
        /* istanbul ignore next */
        function WeakMap(iterable) {
            /* istanbul ignore next */
            this[Symbol.toStringTag] = 'WeakMap';
        }
        /* istanbul ignore next */
        WeakMap.prototype.delete = function (key) { throw new Error(); };
        /* istanbul ignore next */
        WeakMap.prototype.get = function (key) { throw new Error(); };
        /* istanbul ignore next */
        WeakMap.prototype.has = function (key) { throw new Error(); };
        /* istanbul ignore next */
        WeakMap.prototype.set = function (key, value) { throw new Error(); };
        WeakMap = __decorate([
            decorators_1.hasClass('es6-weakmap', global_1.default.WeakMap, Shim.WeakMap)
        ], WeakMap);
        return WeakMap;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WeakMap;
});
//# sourceMappingURL=WeakMap.js.map