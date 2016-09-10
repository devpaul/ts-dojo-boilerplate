import { ArrayLike } from './interfaces';
import { Iterable, IterableIterator } from './iterator';
import './Symbol';
export declare namespace Shim {
    /**
     * An implementation analogous to the Map specification in ES2015.
     */
    class Map<K, V> {
        protected _keys: K[];
        protected _values: V[];
        /**
         * An alternative to Array.prototype.indexOf using Object.is
         * to check for equality. See http://mzl.la/1zuKO2V
         */
        protected _indexOfKey(keys: K[], key: K): number;
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
        constructor(iterable?: ArrayLike<[K, V]> | Iterable<[K, V]>);
        /**
         * Returns the number of key / value pairs in the Map.
         *
         * @return the number of key / value pairs in the Map
         */
        readonly size: number;
        /**
         * Deletes all keys and their associated values.
         */
        clear(): void;
        /**
         * Deletes a given key and its associated value.
         *
         * @param key The key to delete
         * @return true if the key exists, false if it does not
         */
        delete(key: K): boolean;
        /**
         * Returns an iterator that yields each key/value pair as an array.
         *
         * @return An iterator for each key/value pair in the instance.
         */
        entries(): IterableIterator<[K, V]>;
        /**
         * Executes a given function for each map entry. The function
         * is invoked with three arguments: the element value, the
         * element key, and the associated Map instance.
         *
         * @param callback The function to execute for each map entry,
         * @param context The value to use for `this` for each execution of the calback
         */
        forEach(callback: (value: V, key: K, mapInstance: Map<K, V>) => any, context?: {}): void;
        /**
         * Returns the value associated with a given key.
         *
         * @param key The key to look up
         * @return The value if one exists or undefined
         */
        get(key: K): V | undefined;
        /**
         * Checks for the presence of a given key.
         *
         * @param key The key to check for
         * @return true if the key exists, false if it does not
         */
        has(key: K): boolean;
        /**
         * Returns an iterator that yields each key in the map.
         *
         * @return An iterator containing the instance's keys.
         */
        keys(): IterableIterator<K>;
        /**
         * Sets the value associated with a given key.
         *
         * @param key The key to define a value to
         * @param value The value to assign
         * @return The Map instance
         */
        set(key: K, value: V): Map<K, V>;
        /**
         * Returns an iterator that yields each value in the map.
         *
         * @return An iterator containing the instance's values.
         */
        values(): IterableIterator<V>;
        [Symbol.iterator](): IterableIterator<[K, V]>;
        [Symbol.toStringTag]: string;
    }
}
export default class Map<K, V> {
    constructor(iterable?: ArrayLike<[K, V]> | Iterable<[K, V]>);
    readonly size: number;
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    forEach(callback: (value: V, key: K, mapInstance: Map<K, V>) => any, context?: {}): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value: V): Map<K, V>;
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    [Symbol.toStringTag]: string;
}
