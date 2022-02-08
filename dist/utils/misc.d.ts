import { TConfigByChainOrUndefined } from '../types';
export declare const configByChain: (chainIds: {
    [key: string]: number;
}, chainId: number) => TConfigByChainOrUndefined;
/**
 *
 *
 * below: taken from yearn
 */
export declare function struct(tuple: any): any;
export declare function structArray(tuples: any[]): any[];
