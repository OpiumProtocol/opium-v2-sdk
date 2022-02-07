import { JsonRpcProvider } from "@ethersproject/providers";
export declare const isProvider: (arg: JsonRpcProvider | undefined) => arg is JsonRpcProvider;
export declare enum ENetworks {
    GOERLI = "GOERLI",
    ARBITRUM_TESTNET = "ARBITRUM_TESTNET"
}
export declare type valueof<T> = T[keyof T];
export declare type TAddress = string;
export declare type TConfigByChain = {
    registryAddress: TAddress;
    subgraphEndpoint: string;
};
export declare type TConfigByChainOrUndefined = TConfigByChain | undefined;
