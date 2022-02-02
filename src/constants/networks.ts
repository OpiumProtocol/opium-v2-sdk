import { ENetworks } from "../types";

export const chainIds = {
  [ENetworks.GOERLI]: 5,
  [ENetworks.ARBITRUM_TESTNET]: 421611,
};

// TODO: add proxies?
// implementation addresses
export const registryAddresses = {
  [ENetworks.GOERLI]: "0x6E585aa374D92fEd6CA148EA3e5fB2E2DC53FFB5",
  [ENetworks.ARBITRUM_TESTNET]: "0x7C40069bdC198925007786414343681bceCFd91D",
};
