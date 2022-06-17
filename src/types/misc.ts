import { providers } from 'ethers';

export const isProvider = (arg: providers.JsonRpcProvider | undefined): arg is providers.JsonRpcProvider => true;

// eslint-disable-next-line no-shadow
export enum ENetworks {
  // GANACHE = "GANACHE",
  // eslint-disable-next-line no-unused-vars
  GOERLI = 'GOERLI',
  // eslint-disable-next-line no-unused-vars
  ARBITRUM_TESTNET = 'ARBITRUM_TESTNET',
  // eslint-disable-next-line no-unused-vars
  ARBITRUM_ONE = 'ARBITRUM_ONE',
  // eslint-disable-next-line no-unused-vars
  ETHEREUM = 'ETHEREUM',
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
