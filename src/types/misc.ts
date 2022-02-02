import { JsonRpcProvider } from "@ethersproject/providers";

export const isProvider = (
  arg: JsonRpcProvider | undefined
): arg is JsonRpcProvider => {
  return true;
};

export enum ENetworks {
  // GANACHE = "GANACHE",
  GOERLI = "GOERLI",
  ARBITRUM_TESTNET = "ARBITRUM_TESTNET",
}

export type valueof<T> = T[keyof T];
