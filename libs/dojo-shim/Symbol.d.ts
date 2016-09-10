export declare namespace Shim {
    /**
     * A custom guard function that determines if an object is a symbol or not
     * @param  {any}       value The value to check to see if it is a symbol or not
     * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
     */
    function isSymbol(value: any): value is symbol;
    const Exposed: SymbolConstructor;
}
declare const SymbolShim: SymbolConstructor;
export declare const isSymbol: typeof Shim.isSymbol;
export default SymbolShim;
