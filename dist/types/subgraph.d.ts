import { TAddress } from ".";
export declare type TPosition = {
    id: string;
    name: string;
    symbol: string;
    totalSupply: string;
    margin: string;
    endTime: string;
    params: string[];
    oracleId: TAddress;
    token: TAddress;
    syntheticId: TAddress;
    createdAt: string;
    createdTx: string;
};
export interface TDerivativeBalance {
    id: string;
    derivativeHash: string;
    balance: string;
}
export declare type TBuyer = {
    address: TAddress;
    id: string;
    p2pVaultBalances: TDerivativeBalance[];
};
export declare type TSeller = TBuyer;
