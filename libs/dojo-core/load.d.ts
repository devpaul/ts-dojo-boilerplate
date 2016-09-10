import P from 'dojo-shim/Promise';
import { Require } from './loader';
export interface NodeRequire {
    (moduleId: string): any;
}
export declare type Require = Require | NodeRequire;
export interface Load {
    (require: Require, ...moduleIds: string[]): P<any[]>;
    (...moduleIds: string[]): P<any[]>;
}
declare const load: Load;
export default load;
