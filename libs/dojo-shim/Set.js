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
        var Set = (function () {
            function Set(iterable) {
                var _this = this;
                this._setData = [];
                this[Symbol.toStringTag] = 'Set';
                if (iterable) {
                    iterator_1.forOf(iterable, function (value) { return _this.add(value); });
                }
            }
            ;
            Set.prototype.add = function (value) {
                if (this.has(value)) {
                    return this;
                }
                this._setData.push(value);
                return this;
            };
            ;
            Set.prototype.clear = function () {
                this._setData.length = 0;
            };
            ;
            Set.prototype.delete = function (value) {
                var idx = this._setData.indexOf(value);
                if (idx === -1) {
                    return false;
                }
                this._setData.splice(idx, 1);
                return true;
            };
            ;
            Set.prototype.entries = function () {
                return new iterator_1.ShimIterator(this._setData.map(function (value) { return [value, value]; }));
            };
            ;
            Set.prototype.forEach = function (callbackfn, thisArg) {
                var iterator = this.values();
                var result = iterator.next();
                while (!result.done) {
                    callbackfn.call(thisArg, result.value, result.value, this);
                    result = iterator.next();
                }
            };
            ;
            Set.prototype.has = function (value) {
                return this._setData.indexOf(value) > -1;
            };
            ;
            Set.prototype.keys = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            ;
            Object.defineProperty(Set.prototype, "size", {
                get: function () {
                    return this._setData.length;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Set.prototype.values = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            ;
            Set.prototype[Symbol.iterator] = function () {
                return new iterator_1.ShimIterator(this._setData);
            };
            ;
            return Set;
        }());
        Shim.Set = Set;
    })(Shim = exports.Shim || (exports.Shim = {}));
    var Set = (function () {
        /* istanbul ignore next */
        function Set(iterable) {
            /* istanbul ignore next */
            this[Symbol.toStringTag] = 'Set';
        }
        ;
        /* istanbul ignore next */
        Set.prototype.add = function (value) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.clear = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.delete = function (value) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.entries = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.forEach = function (callbackfn, thisArg) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.has = function (value) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype.keys = function () { throw new Error('Abstract method'); };
        ;
        Object.defineProperty(Set.prototype, "size", {
            /* istanbul ignore next */
            get: function () { throw new Error('Abstract method'); },
            enumerable: true,
            configurable: true
        });
        ;
        /* istanbul ignore next */
        Set.prototype.values = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Set.prototype[Symbol.iterator] = function () { throw new Error('Abstract method'); };
        ;
        Set = __decorate([
            decorators_1.hasClass('es6-set', global_1.default.Set, Shim.Set)
        ], Set);
        return Set;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Set;
});
//# sourceMappingURL=Set.js.map