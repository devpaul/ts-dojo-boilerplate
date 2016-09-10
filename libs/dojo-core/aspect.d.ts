import { Handle } from './interfaces';
/**
 * An object that provides the necessary APIs to be MapLike
 */
export interface MapLike<K, V> {
    get(key: K): V;
    set(key: K, value?: V): this;
}
export interface Indexable {
    [method: string]: any;
}
/**
 * The types of objects or maps where advice can be applied
 */
export declare type Targetable = MapLike<string, any> | Indexable;
/**
 * Attaches "after" advice to be executed after the original method.
 * The advising function will receive the original method's return value and arguments object.
 * The value it returns will be returned from the method when it is called (even if the return value is undefined).
 *
 * @param target Object whose method will be aspected
 * @param methodName Name of method to aspect
 * @param advice Advising function which will receive the original method's return value and arguments object
 * @return A handle which will remove the aspect when destroy is called
 */
export declare function after(target: Targetable, methodName: string, advice: (originalReturn: any, originalArgs: IArguments) => any): Handle;
/**
 * Attaches "around" advice around the original method.
 *
 * @param target Object whose method will be aspected
 * @param methodName Name of method to aspect
 * @param advice Advising function which will receive the original function
 * @return A handle which will remove the aspect when destroy is called
 */
export declare function around(target: Targetable, methodName: string, advice: ((previous: Function) => Function)): Handle;
/**
 * Attaches "before" advice to be executed before the original method.
 *
 * @param target Object whose method will be aspected
 * @param methodName Name of method to aspect
 * @param advice Advising function which will receive the same arguments as the original, and may return new arguments
 * @return A handle which will remove the aspect when destroy is called
 */
export declare function before(target: Targetable, methodName: string, advice: (...originalArgs: any[]) => any[] | void): Handle;
/**
 * Attaches advice to be executed after the original method.
 * The advising function will receive the same arguments as the original method.
 * The value it returns will be returned from the method when it is called *unless* its return value is undefined.
 *
 * @param target Object whose method will be aspected
 * @param methodName Name of method to aspect
 * @param advice Advising function which will receive the same arguments as the original method
 * @return A handle which will remove the aspect when destroy is called
 */
export declare function on(target: Targetable, methodName: string, advice: (...originalArgs: any[]) => any): Handle;
