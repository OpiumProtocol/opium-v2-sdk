import { ENetworks } from '../types';

export const chainIds = {
  [ENetworks.GOERLI]: 5,
  [ENetworks.ARBITRUM_TESTNET]: 421611,
  [ENetworks.ARBITRUM_ONE]: 42161,
};

export const networksConfig = {
  [ENetworks.GOERLI]: {
    registryProxyAddress: '0x7A667f935f767CbcBBd3B005a38C13448BfFEA70',
    onChainPositionLensAddress: '',
    subgraphEndpoint: '',
  },
  [ENetworks.ARBITRUM_TESTNET]: {
    registryProxyAddress: '0x9285CAA6F92D9Ba197966E854174e9B27B2061e5',
    onChainPositionLensAddress: '0x4b214b8aafbdeb170b550bb2dfed41aadd9acf74',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/riccardobiosas/opium-v2-subgraph',
  },
  [ENetworks.ARBITRUM_ONE]: {
    registryProxyAddress: '0x17b6ffe276e8A4a299a5a87a656aFc5b8FA3ee4a',
    onChainPositionLensAddress: '0xfa01Fd6118445F811753D96178F2ef8AE77caa53',
    subgraphEndpoint: '',
  },
};
