import Task from './async/Task';
import { Handle } from './interfaces';
import Registry, { Test } from './Registry';
import { ParamList } from './UrlSearchParams';
export declare class FilterRegistry extends Registry<RequestFilter> {
    register(test: string | RegExp | RequestFilterTest | null, value: RequestFilter, first?: boolean): Handle;
}
export declare class ProviderRegistry extends Registry<RequestProvider> {
    private _providerPromise;
    constructor();
    register(test: string | RegExp | RequestProviderTest | null, value: RequestProvider, first?: boolean): Handle;
}
/**
 * Request filters, which filter or modify responses. The default filter simply passes a response through unchanged.
 */
export declare const filterRegistry: FilterRegistry;
/**
 * Request providers, which fulfill requests.
 */
export declare const providerRegistry: ProviderRegistry;
export interface RequestError<T> extends Error {
    response: Response<T>;
}
export interface RequestFilter {
    <T>(response: Response<T>, url: string, options?: RequestOptions): T;
}
export interface RequestFilterTest extends Test {
    <T>(response: Response<any>, url: string, options?: RequestOptions): boolean | null;
}
export interface RequestOptions {
    auth?: string;
    cacheBust?: any;
    data?: any;
    headers?: {
        [name: string]: string;
    };
    method?: string;
    password?: string;
    query?: string | ParamList;
    responseType?: string;
    timeout?: number;
    user?: string;
}
export interface RequestProvider {
    <T>(url: string, options?: RequestOptions): ResponsePromise<T>;
}
export interface RequestProviderTest extends Test {
    (url: string, options?: RequestOptions): boolean | null;
}
export interface Response<T> {
    data: T | null;
    nativeResponse?: any;
    requestOptions: RequestOptions;
    statusCode: number | null | undefined;
    statusText?: string | null;
    url: string;
    getHeader(name: string): null | string;
}
/**
 * The task returned by a request, which will resolve to a Response
 */
export interface ResponsePromise<T> extends Task<Response<T>> {
}
/**
 * Make a request, returning a Promise that will resolve or reject when the request completes.
 */
declare const request: {
    <T>(url: string, options?: RequestOptions): ResponsePromise<T>;
    delete<T>(url: string, options?: RequestOptions): ResponsePromise<T>;
    get<T>(url: string, options?: RequestOptions): ResponsePromise<T>;
    post<T>(url: string, options?: RequestOptions): ResponsePromise<T>;
    put<T>(url: string, options?: RequestOptions): ResponsePromise<T>;
};
export default request;
