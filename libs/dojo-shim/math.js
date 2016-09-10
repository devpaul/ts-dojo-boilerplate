(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './support/has'], factory);
    }
})(function (require, exports) {
    "use strict";
    var has_1 = require('./support/has');
    var FRACTION_UNITS = Math.pow(2, 23);
    var MAX_FLOAT32 = 3.4028234663852886e+38;
    var MIN_FLOAT32 = 1.401298464324817e-45;
    var Shim;
    (function (Shim) {
        function acosh(n) {
            return Math.log(n + Math.sqrt(n * n - 1));
        }
        Shim.acosh = acosh;
        function asinh(n) {
            if (n === -Infinity) {
                return n;
            }
            else {
                return Math.log(n + Math.sqrt(n * n + 1));
            }
        }
        Shim.asinh = asinh;
        function atanh(n) {
            return Math.log((1 + n) / (1 - n)) / 2;
        }
        Shim.atanh = atanh;
        function cbrt(n) {
            var y = Math.pow(Math.abs(n), 1 / 3);
            return n < 0 ? -y : y;
        }
        Shim.cbrt = cbrt;
        function clz32(n) {
            n = Number(n) >>> 0;
            return n ? 32 - n.toString(2).length : 32;
        }
        Shim.clz32 = clz32;
        function cosh(n) {
            var m = Math.exp(n);
            return (m + 1 / m) / 2;
        }
        Shim.cosh = cosh;
        function expm1(n) {
            return Math.exp(n) - 1;
        }
        Shim.expm1 = expm1;
        Shim.fround = has_1.default('float32array') ? function (n) {
            return new Float32Array([n])[0];
        } :
            function (n) {
                // Further fallback for IE9, which doesn't support Float32Array.
                // This gives a fair approximation in most cases.
                if (n === 0 || !isFinite(n)) {
                    return n;
                }
                if (Math.abs(n) > MAX_FLOAT32) {
                    return n > 0 ? Infinity : -Infinity;
                }
                if (Math.abs(n) < MIN_FLOAT32) {
                    return 0;
                }
                var exponent = Math.floor(log2(Math.abs(n)));
                return (Math.round((n / Math.pow(2, exponent) - 1) * FRACTION_UNITS) / FRACTION_UNITS + 1) * Math.pow(2, exponent);
            };
        function hypot() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // See: http://mzl.la/1HDi6xP
            var n = 0;
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var arg = args_1[_a];
                if (arg === Infinity || arg === -Infinity) {
                    return Infinity;
                }
                n += arg * arg;
            }
            return Math.sqrt(n);
        }
        Shim.hypot = hypot;
        function imul(n, m) {
            // See: http://mzl.la/1K279FK
            var ah = (n >>> 16) & 0xffff;
            var al = n & 0xffff;
            var bh = (m >>> 16) & 0xffff;
            var bl = m & 0xffff;
            return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
        }
        Shim.imul = imul;
        function log2(n) {
            return Math.log(n) / Math.LN2;
        }
        Shim.log2 = log2;
        function log10(n) {
            return Math.log(n) / Math.LN10;
        }
        Shim.log10 = log10;
        function log1p(n) {
            return Math.log(1 + n);
        }
        Shim.log1p = log1p;
        function sign(n) {
            n = Number(n);
            if (n === 0 || n !== n) {
                return n;
            }
            return n > 0 ? 1 : -1;
        }
        Shim.sign = sign;
        function sinh(n) {
            var m = Math.exp(n);
            return (m - 1 / m) / 2;
        }
        Shim.sinh = sinh;
        function tanh(n) {
            if (n === Infinity) {
                return 1;
            }
            else if (n === -Infinity) {
                return -1;
            }
            else {
                var y = Math.exp(2 * n);
                return (y - 1) / (y + 1);
            }
        }
        Shim.tanh = tanh;
        function trunc(n) {
            return n < 0 ? Math.ceil(n) : Math.floor(n);
        }
        Shim.trunc = trunc;
    })(Shim = exports.Shim || (exports.Shim = {}));
    /**
     * Returns the hyperbolic arccosine of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.acosh = has_1.default('es6-math-acosh')
        ? Math.acosh
        : Shim.acosh;
    /**
     * Returns the hyperbolic arcsine of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.asinh = 'asinh' in Math
        ? Math.asinh
        : Shim.asinh;
    /**
     * Returns the hyperbolic arctangent of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.atanh = 'atanh' in Math
        ? Math.atanh
        : Shim.atanh;
    /**
     * Returns the cube root of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.cbrt = 'cbrt' in Math
        ? Math.cbrt
        : Shim.cbrt;
    /**
     * Returns the number of leading zero bits in the 32-bit
     * binary representation of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.clz32 = 'clz32' in Math
        ? Math.clz32
        : Shim.clz32;
    /**
     * Returns the hyperbolic cosine of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.cosh = 'cosh' in Math
        ? Math.cosh
        : Shim.cosh;
    /**
     * Returns e raised to the specified power minus one.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.expm1 = 'expm1' in Math
        ? Math.expm1
        : Shim.expm1;
    /**
     * Returns the nearest single-precision float representation of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.fround = 'fround' in Math
        ? Math.fround
        : Shim.fround;
    /**
     * Returns the square root of the sum of squares of its arguments.
     *
     * @return The result
     */
    exports.hypot = 'hypot' in Math
        ? Math.hypot
        : Shim.hypot;
    /**
     * Returns the result of the 32-bit multiplication of the two parameters.
     *
     * @param n The number to use in calculation
     * @param m The number to use in calculation
     * @return The result
     */
    exports.imul = has_1.default('es6-math-imul')
        ? Math.imul
        : Shim.imul;
    /**
     * Returns the base 2 logarithm of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.log2 = 'log2' in Math
        ? Math.log2
        : Shim.log2;
    /**
     * Returns the base 10 logarithm of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.log10 = 'log10' in Math
        ? Math.log10
        : Shim.log10;
    /**
     * Returns the natural logarithm of 1 + a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.log1p = 'log1p' in Math
        ? Math.log1p
        : Shim.log1p;
    /**
     * Returns the sign of a number, indicating whether the number is positive.
     *
     * @param n The number to use in calculation
     * @return 1 if the number is positive, -1 if the number is negative, or 0 if the number is 0
     */
    exports.sign = 'sign' in Math
        ? Math.sign
        : Shim.sign;
    /**
     * Returns the hyperbolic sine of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.sinh = 'sinh' in Math
        ? Math.sinh
        : Shim.sinh;
    /**
     * Returns the hyperbolic tangent of a number.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.tanh = 'tanh' in Math
        ? Math.tanh
        : Shim.tanh;
    /**
     * Returns the integral part of a number by removing any fractional digits.
     *
     * @param n The number to use in calculation
     * @return The result
     */
    exports.trunc = 'trunc' in Math
        ? Math.trunc
        : Shim.trunc;
});
//# sourceMappingURL=math.js.map