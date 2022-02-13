import { providers } from 'ethers';
export declare const isProvider: (arg: providers.JsonRpcProvider | undefined) => arg is providers.JsonRpcProvider;
export declare enum ENetworks {
    GOERLI = "GOERLI",
    ARBITRUM_TESTNET = "ARBITRUM_TESTNET"
}
export interface IOpiumV2SDKConfig {
    rpcUrl: string;
    chainId: number;
    override?: providers.ExternalProvider;
}
export declare type valueof<T> = T[keyof T];
export declare type TAddress = string;
export declare type TConfigByChain = {
    registryProxyAddress: TAddress;
    onChainPositionLensAddress: TAddress;
    subgraphEndpoint: string;
};
export declare type TConfigByChainOrUndefined = TConfigByChain | undefined;
export declare type TPositionsAddressesOutput = {
    longPositionAddress: TAddress;
    shortPositionAddress: TAddress;
};
export interface ErrorWithReason extends Error {
    reason: any;
}
export declare const isErrorReasonExplicit: (error: any) => error is ErrorWithReason;
