/**
 * Escapes a string so that it can safely be passed to the RegExp constructor.
 * @param text The string to be escaped
 * @return The escaped string
 */
export declare function escapeRegExp(text: string): string;
/**
 * Sanitizes a string to protect against tag injection.
 * @param xml The string to be escaped
 * @param forAttribute Whether to also escape ', ", and > in addition to < and &
 * @return The escaped string
 */
export declare function escapeXml(xml: string, forAttribute?: boolean): string;
/**
 * Adds padding to the end of a string to ensure it is a certain length.
 * @param text The string to pad
 * @param length The target minimum length of the string
 * @param character The character to pad onto the end of the string
 * @return The string, padded to the given length if necessary
 */
export declare function padEnd(text: string, length: number, character?: string): string;
/**
 * Adds padding to the beginning of a string to ensure it is a certain length.
 * @param text The string to pad
 * @param length The target minimum length of the string
 * @param character The character to pad onto the beginning of the string
 * @return The string, padded to the given length if necessary
 */
export declare function padStart(text: string, length: number, character?: string): string;
