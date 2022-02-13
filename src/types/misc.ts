import { providers } from 'ethers';

export const isProvider = (arg: providers.JsonRpcProvider | undefined): arg is providers.JsonRpcProvider => true;

export enum ENetworks {
  // GANACHE = "GANACHE",
  GOERLI = 'GOERLI',
  ARBITRUM_TESTNET = 'ARBITRUM_TESTNET',
}

export interface IOpiumV2SDKConfig {
  // use a known network or provide an entirely custom config
  rpcUrl: string;
  chainId: number;
  override?: providers.ExternalProvider;
}

export type valueof<T> = T[keyof T];

export type TAddress = string;

export type TConfigByChain = {
  registryProxyAddress: TAddress;
  onChainPositionLensAddress: TAddress;
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
