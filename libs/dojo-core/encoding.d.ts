export declare type ByteBuffer = Uint8Array | Buffer | number[];
export interface Codec {
    encode(data: string): number[];
    decode(data: ByteBuffer): string;
}
/**
 * Provides facilities for encoding a string into an ASCII-encoded byte buffer and
 * decoding an ASCII-encoded byte buffer into a string.
 */
export declare const ascii: Codec;
/**
 * Provides facilities for encoding a string into a Base64-encoded byte buffer and
 * decoding a Base64-encoded byte buffer into a string.
 */
export declare const base64: Codec;
/**
 * Provides facilities for encoding a string into a hex-encoded byte buffer and
 * decoding a hex-encoded byte buffer into a string.
 */
export declare const hex: Codec;
/**
 * Provides facilities for encoding a string into a UTF-8-encoded byte buffer and
 * decoding a UTF-8-encoded byte buffer into a string.
 * Inspired by the work of: https://github.com/mathiasbynens/utf8.js
 */
export declare const utf8: Codec;
