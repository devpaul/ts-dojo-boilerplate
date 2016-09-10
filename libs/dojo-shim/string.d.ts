/**
 * The minimum location of high surrogates
 */
export declare const HIGH_SURROGATE_MIN: number;
/**
 * The maximum location of high surrogates
 */
export declare const HIGH_SURROGATE_MAX: number;
/**
 * The minimum location of low surrogates
 */
export declare const LOW_SURROGATE_MIN: number;
/**
 * The maximum location of low surrogates
 */
export declare const LOW_SURROGATE_MAX: number;
export declare namespace Shim {
    function raw(callSite: TemplateStringsArray, ...substitutions: any[]): string;
    function fromCodePoint(...codePoints: number[]): string;
    function codePointAt(text: string, position?: number): number | undefined;
    function repeat(text: string, count?: number): string;
    function startsWith(text: string, search: string, position?: number): boolean;
    function endsWith(text: string, search: string, endPosition?: number): boolean;
    function includes(text: string, search: string, position?: number): boolean;
}
/**
 * A tag function for template strings to get the template string's raw string form.
 *
 * @param callSite Call site object (or a template string in TypeScript, which will transpile to one)
 * @param substitutions Values to substitute within the template string (TypeScript will generate these automatically)
 * @return String containing the raw template string with variables substituted
 *
 * @example
 * // Within TypeScript; logs 'The answer is:\\n42'
 * let answer = 42;
 * console.log(string.raw`The answer is:\n${answer}`);
 *
 * @example
 * // The same example as above, but directly specifying a JavaScript object and substitution
 * console.log(string.raw({ raw: [ 'The answer is:\\n', '' ] }, 42));
 */
export declare const raw: (callSite: TemplateStringsArray, ...substitutions: any[]) => string;
/**
 * Returns the UTF-16 encoded code point value of a given position in a string.
 *
 * @param text The string containing the element whose code point is to be determined
 * @param position Position of an element within the string to retrieve the code point value from
 * @return A non-negative integer representing the UTF-16 encoded code point value
 */
export declare const fromCodePoint: (...codePoints: number[]) => string;
/**
 * Returns the UTF-16 encoded code point value of a given position in a string.
 *
 * @param text The string containing the element whose code point is to be determined
 * @param position Position of an element within the string to retrieve the code point value from
 * @return A non-negative integer representing the UTF-16 encoded code point value
 */
export declare const codePointAt: (text: string, position?: number) => number;
/**
 * Returns a string containing the given string repeated the specified number of times.
 *
 * @param text The string to repeat
 * @param count The number of times to repeat the string
 * @return A string containing the input string repeated count times
 */
export declare const repeat: (text: string, count?: number) => string;
/**
 * Determines whether a string begins with the given substring (optionally starting from a given index).
 *
 * @param text The string to look for the search string within
 * @param search The string to search for
 * @param position The index to begin searching at
 * @return Boolean indicating if the search string was found at the beginning of the given string
 */
export declare const startsWith: (text: string, search: string, position?: number) => boolean;
/**
 * Determines whether a string ends with the given substring.
 *
 * @param text The string to look for the search string within
 * @param search The string to search for
 * @param endPosition The index searching should stop before (defaults to text.length)
 * @return Boolean indicating if the search string was found at the end of the given string
 */
export declare const endsWith: (text: string, search: string, endPosition?: number) => boolean;
/**
 * Determines whether a string includes the given substring (optionally starting from a given index).
 *
 * @param text The string to look for the search string within
 * @param search The string to search for
 * @param position The index to begin searching at
 * @return Boolean indicating if the search string was found within the given string
 */
export declare const includes: (text: string, search: string, position?: number) => boolean;
