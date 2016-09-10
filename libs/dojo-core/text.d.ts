import Promise from 'dojo-shim/Promise';
import { Config, Require } from './loader';
export declare function get(url: string): Promise<string>;
export declare function normalize(id: string, toAbsMid: (moduleId: string) => string): string;
export declare function load(id: string, require: Require, load: (value?: any) => void, config?: Config): void;
