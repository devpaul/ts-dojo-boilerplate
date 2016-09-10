import { ArrayLike } from './interfaces';
import { Iterable } from './iterator';
import './Symbol';
export default class WeakMap<K, V> {
    constructor(iterable?: ArrayLike<[K, V]> | Iterable<[K, V]>);
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
    [Symbol.toStringTag]: string;
}
