import { JsonRpcProvider } from '@ethersproject/providers';

export const isProvider = (arg: JsonRpcProvider | undefined): arg is JsonRpcProvider => true;

export enum ENetworks {
  // GANACHE = "GANACHE",
  GOERLI = 'GOERLI',
  ARBITRUM_TESTNET = 'ARBITRUM_TESTNET',
}

export type valueof<T> = T[keyof T];

export type TAddress = string;

export type TConfigByChain = {
  registryAddress: TAddress;
  subgraphEndpoint: string;
};

export type TConfigByChainOrUndefined = TConfigByChain | undefined;

export type TPositionsAddressesOutput = {
  longPositionAddress: TAddress;
  shortPositionAddress: TAddress;
};

export interface ErrorWithReason extends Error {
  reason: any;
}

// type-guard to assert the `.reason` field in an Error object at run-time
export const isErrorReasonExplicit = (error: any): error is ErrorWithReason => error && error.reason;
