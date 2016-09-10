export declare namespace Shim {
    function acosh(n: number): number;
    function asinh(n: number): number;
    function atanh(n: number): number;
    function cbrt(n: number): number;
    function clz32(n: number): number;
    function cosh(n: number): number;
    function expm1(n: number): number;
    const fround: (n: number) => number;
    function hypot(...args: number[]): number;
    function imul(n: number, m: number): number;
    function log2(n: number): number;
    function log10(n: number): number;
    function log1p(n: number): number;
    function sign(n: number): number;
    function sinh(n: number): number;
    function tanh(n: number): number;
    function trunc(n: number): number;
}
/**
 * Returns the hyperbolic arccosine of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const acosh: (n: number) => number;
/**
 * Returns the hyperbolic arcsine of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const asinh: (n: number) => number;
/**
 * Returns the hyperbolic arctangent of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const atanh: (n: number) => number;
/**
 * Returns the cube root of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const cbrt: (n: number) => number;
/**
 * Returns the number of leading zero bits in the 32-bit
 * binary representation of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const clz32: (n: number) => number;
/**
 * Returns the hyperbolic cosine of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const cosh: (n: number) => number;
/**
 * Returns e raised to the specified power minus one.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const expm1: (n: number) => number;
/**
 * Returns the nearest single-precision float representation of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const fround: (n: number) => number;
/**
 * Returns the square root of the sum of squares of its arguments.
 *
 * @return The result
 */
export declare const hypot: (...args: number[]) => number;
/**
 * Returns the result of the 32-bit multiplication of the two parameters.
 *
 * @param n The number to use in calculation
 * @param m The number to use in calculation
 * @return The result
 */
export declare const imul: (n: number, m: number) => number;
/**
 * Returns the base 2 logarithm of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const log2: (n: number) => number;
/**
 * Returns the base 10 logarithm of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const log10: (n: number) => number;
/**
 * Returns the natural logarithm of 1 + a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const log1p: (n: number) => number;
/**
 * Returns the sign of a number, indicating whether the number is positive.
 *
 * @param n The number to use in calculation
 * @return 1 if the number is positive, -1 if the number is negative, or 0 if the number is 0
 */
export declare const sign: (n: number) => number;
/**
 * Returns the hyperbolic sine of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const sinh: (n: number) => number;
/**
 * Returns the hyperbolic tangent of a number.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const tanh: (n: number) => number;
/**
 * Returns the integral part of a number by removing any fractional digits.
 *
 * @param n The number to use in calculation
 * @return The result
 */
export declare const trunc: (n: number) => number;
