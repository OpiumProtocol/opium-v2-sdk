import { ENetworks } from '../types';

export const chainIds = {
  [ENetworks.GOERLI]: 5,
  [ENetworks.ARBITRUM_TESTNET]: 421611,
};

// proxy addresses
export const registryAddresses = {
  [ENetworks.GOERLI]: '0x7A667f935f767CbcBBd3B005a38C13448BfFEA70',
  [ENetworks.ARBITRUM_TESTNET]: '0x9285CAA6F92D9Ba197966E854174e9B27B2061e5',
};

// proxy addresses
export const onChainPositionLensAddresses = {
  [ENetworks.GOERLI]: '',
  [ENetworks.ARBITRUM_TESTNET]: '0x4b214b8aafbdeb170b550bb2dfed41aadd9acf74',
};

// subgraph endpoints
export const subgraphEndpoints = {
  [ENetworks.GOERLI]: '',
  [ENetworks.ARBITRUM_TESTNET]: 'https://api.thegraph.com/subgraphs/name/riccardobiosas/opium-v2-subgraph',
};
