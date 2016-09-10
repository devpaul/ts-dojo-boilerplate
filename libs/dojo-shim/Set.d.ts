import { ArrayLike } from './interfaces';
import { IterableIterator, Iterable } from './iterator';
import './Symbol';
export declare namespace Shim {
    class Set<T> {
        private _setData;
        constructor(iterable?: ArrayLike<T> | Iterable<T>);
        add(value: T): this;
        clear(): void;
        delete(value: T): boolean;
        entries(): IterableIterator<[T, T]>;
        forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
        has(value: T): boolean;
        keys(): IterableIterator<T>;
        readonly size: number;
        values(): IterableIterator<T>;
        [Symbol.iterator](): IterableIterator<T>;
        [Symbol.toStringTag]: string;
    }
}
export default class Set<T> {
    constructor(iterable?: ArrayLike<T> | Iterable<T>);
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    entries(): IterableIterator<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): IterableIterator<T>;
    readonly size: number;
    values(): IterableIterator<T>;
    [Symbol.iterator](): IterableIterator<T>;
    [Symbol.toStringTag]: string;
}
