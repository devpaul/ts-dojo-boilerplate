(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './support/has', './support/global', './support/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var has_1 = require('./support/has');
    var global_1 = require('./support/global');
    var util_1 = require('./support/util');
    var Shim;
    (function (Shim) {
        /* tslint:disable-next-line:variable-name */
        var Symbol;
        /* tslint:disable-next-line:variable-name */
        var InternalSymbol;
        var defineProperties = Object.defineProperties;
        var defineProperty = Object.defineProperty;
        var create = Object.create;
        var objPrototype = Object.prototype;
        var globalSymbols = {};
        var getSymbolName = (function () {
            var created = create(null);
            return function (desc) {
                var postfix = 0;
                var name;
                while (created[String(desc) + (postfix || '')]) {
                    ++postfix;
                }
                desc += String(postfix || '');
                created[desc] = true;
                name = '@@' + desc;
                // FIXME: Temporary guard until the duplicate execution when testing can be
                // pinned down.
                if (!Object.getOwnPropertyDescriptor(objPrototype, name)) {
                    defineProperty(objPrototype, name, {
                        set: function (value) {
                            defineProperty(this, name, util_1.getValueDescriptor(value));
                        }
                    });
                }
                return name;
            };
        }());
        InternalSymbol = function Symbol(description) {
            if (this instanceof InternalSymbol) {
                throw new TypeError('TypeError: Symbol is not a constructor');
            }
            return Symbol(description);
        };
        Symbol = function Symbol(description) {
            if (this instanceof Symbol) {
                throw new TypeError('TypeError: Symbol is not a constructor');
            }
            var sym = Object.create(InternalSymbol.prototype);
            description = (description === undefined ? '' : String(description));
            return defineProperties(sym, {
                __description__: util_1.getValueDescriptor(description),
                __name__: util_1.getValueDescriptor(getSymbolName(description))
            });
        };
        /**
         * A custom guard function that determines if an object is a symbol or not
         * @param  {any}       value The value to check to see if it is a symbol or not
         * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
         */
        function isSymbol(value) {
            return (value && ((typeof value === 'symbol') || (value['@@toStringTag'] === 'Symbol'))) || false;
        }
        Shim.isSymbol = isSymbol;
        /**
         * Throws if the value is not a symbol, used internally within the Shim
         * @param  {any}    value The value to check
         * @return {symbol}       Returns the symbol or throws
         */
        function validateSymbol(value) {
            if (!isSymbol(value)) {
                throw new TypeError(value + ' is not a symbol');
            }
            return value;
        }
        /* Decorate the Symbol function with the appropriate properties */
        defineProperty(Symbol, 'for', util_1.getValueDescriptor(function (key) {
            if (globalSymbols[key]) {
                return globalSymbols[key];
            }
            return (globalSymbols[key] = Symbol(String(key)));
        }));
        defineProperties(Symbol, {
            keyFor: util_1.getValueDescriptor(function (sym) {
                var key;
                validateSymbol(sym);
                for (key in globalSymbols) {
                    if (globalSymbols[key] === sym) {
                        return key;
                    }
                }
            }),
            hasInstance: util_1.getValueDescriptor(Symbol.for('hasInstance'), false, false),
            isConcatSpreadable: util_1.getValueDescriptor(Symbol.for('isConcatSpreadable'), false, false),
            iterator: util_1.getValueDescriptor(Symbol.for('iterator'), false, false),
            match: util_1.getValueDescriptor(Symbol.for('match'), false, false),
            replace: util_1.getValueDescriptor(Symbol.for('replace'), false, false),
            search: util_1.getValueDescriptor(Symbol.for('search'), false, false),
            species: util_1.getValueDescriptor(Symbol.for('species'), false, false),
            split: util_1.getValueDescriptor(Symbol.for('split'), false, false),
            toPrimitive: util_1.getValueDescriptor(Symbol.for('toPrimitive'), false, false),
            toStringTag: util_1.getValueDescriptor(Symbol.for('toStringTag'), false, false),
            unscopables: util_1.getValueDescriptor(Symbol.for('unscopables'), false, false)
        });
        /* Decorate the InternalSymbol object */
        defineProperties(InternalSymbol.prototype, {
            constructor: util_1.getValueDescriptor(Symbol),
            toString: util_1.getValueDescriptor(function () { return this.__name__; }, false, false)
        });
        /* Decorate the Symbol.prototype */
        defineProperties(Symbol.prototype, {
            toString: util_1.getValueDescriptor(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
            valueOf: util_1.getValueDescriptor(function () { return validateSymbol(this); })
        });
        defineProperty(Symbol.prototype, Symbol.toPrimitive, util_1.getValueDescriptor(function () { return validateSymbol(this); }));
        defineProperty(Symbol.prototype, Symbol.toStringTag, util_1.getValueDescriptor('Symbol', false, false, true));
        defineProperty(InternalSymbol.prototype, Symbol.toPrimitive, util_1.getValueDescriptor(Symbol.prototype[Symbol.toPrimitive], false, false, true));
        defineProperty(InternalSymbol.prototype, Symbol.toStringTag, util_1.getValueDescriptor(Symbol.prototype[Symbol.toStringTag], false, false, true));
        /* tslint:disable-next-line:variable-name */
        Shim.Exposed = Symbol;
    })(Shim = exports.Shim || (exports.Shim = {}));
    /* tslint:disable-next-line:variable-name */
    var SymbolShim = has_1.default('es6-symbol') ? global_1.default.Symbol : global_1.default.Symbol = Shim.Exposed;
    /**
     * Fill any missing well known symbols if the native Symbol is missing them
     */
    ['hasInstance', 'isConcatSpreadable', 'iterator', 'species', 'replace', 'search', 'split', 'match', 'toPrimitive',
        'toStringTag', 'unscopables'].forEach(function (wellKnown) {
        if (!Symbol[wellKnown]) {
            Object.defineProperty(Symbol, wellKnown, util_1.getValueDescriptor(Symbol.for(wellKnown), false, false));
        }
    });
    exports.isSymbol = Shim.isSymbol;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SymbolShim;
});
//# sourceMappingURL=Symbol.js.map