import './Symbol';
/**
 * Determines whether two values are the same value.
 *
 * @param value1 The first value to compare
 * @param value2 The second value to compare
 * @return true if the values are the same; false otherwise
 */
export declare const is: (value1: any, value2: any) => boolean;
/**
 * Returns an array of own properties who key is a symbol
 *
 * @param o The object to return the properties for
 */
export declare const getOwnPropertySymbols: (o: any) => symbol[];
/**
 * Returns an array of own properties who key is a string
 *
 * @param o The object to return the properties for
 */
export declare const getOwnPropertyNames: (o: any) => string[];
