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
        define(["require", "exports", './support/decorators', './support/global', './iterator', './object', './Symbol'], factory);
    }
})(function (require, exports) {
    "use strict";
    var decorators_1 = require('./support/decorators');
    var global_1 = require('./support/global');
    var iterator_1 = require('./iterator');
    var object_1 = require('./object');
    require('./Symbol');
    var Shim;
    (function (Shim) {
        /**
         * An implementation analogous to the Map specification in ES2015.
         */
        var Map = (function () {
            /**
             * Creates a new Map
             *
             * @constructor
             *
             * @param iterator
             * Array or iterator containing two-item tuples used to initially populate the map.
             * The first item in each tuple corresponds to the key of the map entry.
             * The second item corresponds to the value of the map entry.
             */
            function Map(iterable) {
                var _this = this;
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    iterator_1.forOf(iterable, function (value) {
                        _this.set(value[0], value[1]);
                    });
                }
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            Map.prototype._indexOfKey = function (keys, key) {
                for (var i = 0, length_1 = keys.length; i < length_1; i++) {
                    if (object_1.is(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            };
            Object.defineProperty(Map.prototype, "size", {
                /**
                 * Returns the number of key / value pairs in the Map.
                 *
                 * @return the number of key / value pairs in the Map
                 */
                get: function () {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Deletes all keys and their associated values.
             */
            Map.prototype.clear = function () {
                this._keys.length = this._values.length = 0;
            };
            /**
             * Deletes a given key and its associated value.
             *
             * @param key The key to delete
             * @return true if the key exists, false if it does not
             */
            Map.prototype.delete = function (key) {
                var index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            };
            /**
             * Returns an iterator that yields each key/value pair as an array.
             *
             * @return An iterator for each key/value pair in the instance.
             */
            Map.prototype.entries = function () {
                var _this = this;
                var values = this._keys.map(function (key, i) {
                    return [key, _this._values[i]];
                });
                return new iterator_1.ShimIterator(values);
            };
            /**
             * Executes a given function for each map entry. The function
             * is invoked with three arguments: the element value, the
             * element key, and the associated Map instance.
             *
             * @param callback The function to execute for each map entry,
             * @param context The value to use for `this` for each execution of the calback
             */
            Map.prototype.forEach = function (callback, context) {
                var keys = this._keys;
                var values = this._values;
                for (var i = 0, length_2 = keys.length; i < length_2; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            };
            /**
             * Returns the value associated with a given key.
             *
             * @param key The key to look up
             * @return The value if one exists or undefined
             */
            Map.prototype.get = function (key) {
                var index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            };
            /**
             * Checks for the presence of a given key.
             *
             * @param key The key to check for
             * @return true if the key exists, false if it does not
             */
            Map.prototype.has = function (key) {
                return this._indexOfKey(this._keys, key) > -1;
            };
            /**
             * Returns an iterator that yields each key in the map.
             *
             * @return An iterator containing the instance's keys.
             */
            Map.prototype.keys = function () {
                return new iterator_1.ShimIterator(this._keys);
            };
            /**
             * Sets the value associated with a given key.
             *
             * @param key The key to define a value to
             * @param value The value to assign
             * @return The Map instance
             */
            Map.prototype.set = function (key, value) {
                var index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            };
            /**
             * Returns an iterator that yields each value in the map.
             *
             * @return An iterator containing the instance's values.
             */
            Map.prototype.values = function () {
                return new iterator_1.ShimIterator(this._values);
            };
            Map.prototype[Symbol.iterator] = function () {
                return this.entries();
            };
            return Map;
        }());
        Shim.Map = Map;
    })(Shim = exports.Shim || (exports.Shim = {}));
    var Map = (function () {
        /* istanbul ignore next */
        function Map(iterable) {
            /* istanbul ignore next */
            this[Symbol.toStringTag] = 'Map';
        }
        ;
        Object.defineProperty(Map.prototype, "size", {
            /* istanbul ignore next */
            get: function () { throw new Error('Abstract method'); },
            enumerable: true,
            configurable: true
        });
        ;
        /* istanbul ignore next */
        Map.prototype.clear = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.delete = function (key) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.entries = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.forEach = function (callback, context) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.get = function (key) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.has = function (key) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.keys = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.set = function (key, value) { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype.values = function () { throw new Error('Abstract method'); };
        ;
        /* istanbul ignore next */
        Map.prototype[Symbol.iterator] = function () { throw new Error('Abstract method'); };
        ;
        Map = __decorate([
            decorators_1.hasClass('es6-map', global_1.default.Map, Shim.Map)
        ], Map);
        return Map;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Map;
});
//# sourceMappingURL=Map.js.map