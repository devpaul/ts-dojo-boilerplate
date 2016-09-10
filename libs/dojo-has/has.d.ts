import { Require, Config } from './loader';
/**
 * The valid return types from a feature test
 */
export declare type FeatureTestResult = boolean | string | number | undefined;
/**
 * A function that tests for a feature and returns a result
 */
export declare type FeatureTest = () => FeatureTestResult;
/**
 * A cache of results of feature tests
 */
export declare const testCache: {
    [feature: string]: FeatureTestResult;
};
/**
 * A cache of the un-resolved feature tests
 */
export declare const testFunctions: {
    [feature: string]: FeatureTest;
};
/**
 * AMD plugin function.
 *
 * Conditional loads modules based on a has feature test value.
 *
 * @param resourceId Gives the resolved module id to load.
 * @param require The loader require function with respect to the module that contained the plugin resource in its
 *                dependency list.
 * @param load Callback to loader that consumes result of plugin demand.
 */
export declare function load(resourceId: string, require: Require, load: (value?: any) => void, config?: Config): void;
/**
 * AMD plugin function.
 *
 * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
 * value(s).
 *
 * @param resourceId The id of the module
 * @param normalize Resolves a relative module id into an absolute module id
 */
export declare function normalize(resourceId: string, normalize: (moduleId: string) => string): string | null;
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
export declare function exists(feature: string): boolean;
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
export declare function add(feature: string, value: FeatureTest | FeatureTestResult, overwrite?: boolean): void;
/**
 * Return the current value of a named feature.
 *
 * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
 */
export default function has(feature: string): FeatureTestResult;
