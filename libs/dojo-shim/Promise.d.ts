import { Thenable } from './interfaces';
import { Iterable } from './iterator';
import './Symbol';
/**
 * The State enum represents the possible states of a promise.
 */
export declare const enum State {
    Fulfilled = 0,
    Pending = 1,
    Rejected = 2,
}
/**
 * Executor is the interface for functions used to initialize a Promise.
 */
export interface Executor<T> {
    /**
     * The executor for the promise
     *
     * @param resolve The resolver callback of the promise
     * @param reject The rejector callback of the promise
     */
    (resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void): void;
}
/**
 * Returns true if a given value has a `then` method.
 * @param {any} value The value to check if is Thenable
 * @returns {is Thenable<T>} A type guard if the value is thenable
 */
export declare function isThenable<T>(value: any): value is Thenable<T>;
/**
 * PromiseShim is a partial implementation of the ES2015 Promise specification. It relies on Promise to do some safety
 * checks such as verifying that a Promise isn't resolved with itself. This class is exported for testability, and is
 * not intended to be used directly.
 *
 * @borrows Promise.all as PromiseShim.all
 * @borrows Promise.race as PromiseShim.race
 * @borrows Promise.reject as PromiseShim.reject
 * @borrows Promise.resolve as PromiseShim.resolve
 * @borrows Promise#catch as PromiseShim#catch
 * @borrows Promise#then as PromiseShim#then
 */
export declare class PromiseShim<T> implements Thenable<T> {
    static all<T>(iterable: Iterable<(T | Thenable<T>)> | (T | Thenable<T>)[]): PromiseShim<T[]>;
    static race<T>(iterable: Iterable<(T | Thenable<T>)> | (T | Thenable<T>)[]): PromiseShim<T[]>;
    static reject<T>(reason?: Error): PromiseShim<T>;
    static resolve(): PromiseShim<void>;
    static resolve<T>(value: (T | Thenable<T>)): PromiseShim<T>;
    /**
     * Creates a new PromiseShim.
     *
     * @constructor
     *
     * @param executor
     * The executor function is called immediately when the PromiseShim is instantiated. It is responsible for
     * starting the asynchronous operation when it is invoked.
     *
     * The executor must call either the passed `resolve` function when the asynchronous operation has completed
     * successfully, or the `reject` function when the operation fails.
     */
    constructor(executor: Executor<T>);
    /**
     * The current state of this promise.
     */
    private state;
    /**
     * The resolved value for this promise.
     *
     * @type {T|Error}
     */
    private resolvedValue;
    then: <U>(onFulfilled?: (value?: T) => (U | Thenable<U>), onRejected?: (reason?: Error) => (U | Thenable<U>)) => PromiseShim<U>;
    [Symbol.toStringTag]: string;
}
/**
 * PlatformPromise is a very thin wrapper around either a native promise implementation or PromiseShim.
 */
export default class Promise<T> implements Thenable<T> {
    /**
     * Points to the promise constructor this platform should use.
     */
    static PromiseConstructor: any;
    /**
     * Converts an iterable object containing promises into a single promise that resolves to a new iterable object
     * containing the fulfilled values of all the promises in the iterable, in the same order as the Promises in the
     * iterable. Iterable values that are not promises are converted to promises using PromiseShim.resolve.
     *
     * @example
     * PromiseShim.all([ PromiseShim.resolve('foo'), 'bar' ]).then(function (value) {
     *     value[0] === 'foo'; // true
     *     value[1] === 'bar'; // true
     * });
     *
     * @example
     * PromiseShim.all({
     *     foo: PromiseShim.resolve('foo'),
     *     bar: 'bar'
     * }).then((value) => {
     *     value.foo === 'foo'; // true
     *     value.bar === 'bar'; // true
     * });
     */
    static all<T>(iterable: Iterable<(T | Thenable<T>)> | (T | Thenable<T>)[]): Promise<T[]>;
    /**
     * Converts an iterable object containing promises into a single promise that resolves or rejects as soon as one of
     * the promises in the iterable resolves or rejects, with the value of the resolved or rejected promise. Values in
     * the iterable that are not Promises are converted to Promises with PromiseShim.resolve.
     *
     * @example
     * PromiseShim.race([ PromiseShim.resolve('foo'), PromiseShim.resolve('bar') ]).then((value) => {
     *     value === 'foo'; // true
     * });
     *
     * @example
     * PromiseShim.race({
     *     foo: PromiseShim.resolve('foo'),
     *     bar: PromiseShim.resolve('bar')
     * }).then((value) => {
     *     value === 'foo'; // true
     * });
     */
    static race<T>(iterable: Iterable<(T | Thenable<T>)> | (T | Thenable<T>)[]): Promise<T>;
    /**
     * Creates a new promise that is rejected with the given error.
     */
    static reject<T>(reason: Error): Promise<any>;
    /**
     * Creates a new promise that is resolved with the given value. If the passed value is already a PromiseShim, it
     * will be returned as-is.
     */
    static resolve(): Promise<void>;
    static resolve<T>(value: (T | Thenable<T>)): Promise<T>;
    /**
     * Copies another Promise, taking on its inner state.
     */
    protected static copy<U>(other: Promise<U>): Promise<U>;
    /**
     * Creates a new Promise.
     *
     * @constructor
     *
     * @param executor
     * The executor function is called immediately when the PromiseShim is instantiated. It is responsible for
     * starting the asynchronous operation when it is invoked.
     *
     * The executor must call either the passed `resolve` function when the asynchronous operation has completed
     * successfully, or the `reject` function when the operation fails.
     */
    constructor(executor: Executor<T>);
    /**
     * An object wrapped by this class that actually implements the Promise API.
     */
    promise: any;
    /**
     * The internal state of this promise. This may be updated directly by subclasses.
     */
    protected _state: State;
    /**
     * Adds a callback to the promise to be invoked when the asynchronous operation throws an error.
     */
    catch<U>(onRejected: (reason?: Error) => (U | Thenable<U>)): Promise<U>;
    /**
     * Allows for cleanup actions to be performed after resolution of a Promise.
     */
    finally(callback: () => void | Thenable<any>): Promise<T>;
    /**
     * The current Promise state.
     */
    readonly state: State;
    /**
     * Adds a callback to the promise to be invoked when the asynchronous operation completes successfully.
     */
    then<U>(onFulfilled?: ((value?: T) => (U | Thenable<U> | null | undefined)) | null | undefined, onRejected?: (reason?: Error) => void): Promise<U>;
}
