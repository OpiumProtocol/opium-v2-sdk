# Opium V2 SDK

The `OpiumV2SDK` class is the entry-point to all the core functionality of the SDK.

The SDK is divided in 4 main services:

- Core protocol contract wrappers
- Subgraph service
- Simulator service
- DerivativeLensFactory

### Core protocol wrappers

It includes class wrappers to facilitate the interaction with the Opium V2 core contract, respectively **Registry**, **Core**, **SyntheticAggregator**, **OracleAggregator**. The address of the contracts will be automatically initialized according to the `chainId` with which the SDK class had been initialized.

### Subgraph wrappers

It allows to easily query the Opium V2 subgraph according to the `chainId` with which the SDK class had been initialized.

### Simulator wrappers

It allows to perform some useful queries about the protocol parameters - i.e.: calculate the derivative hash for a given derivative, calculate the LONG/SHORT positions addresses for a given derivative etc. - either locally via `ethers.js` or by calling a helper contract.

### DerivativeLensFactory

It allows to query the state of user-defined contracts running on the Opium V2 protocol - i.e: oracleIds and syntheticIds.

## Install

```shell
yarn add @opiumteam/opium-sdk-v2
```

## Example

You can easily initialize the `OpiumV2SDK` by passing a valid rpcUrl and its associated chainId, as in the following code snippet:

```ts
const main = async () => {
  const sdk = new OpiumV2SDK({
    rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
    chainId: 421611,
  });
  const { registryInstance, subgraphService, simulatorService, derivativeLensFactory } = sdk;
  const { coreInstance, oracleAggregatorInstance, syntheticAggregatorInstance } = await sdk.setup();
};
```

1. Note that the initialization is split in two phases:

- Upon initialization of the `OpiumV2SDK`, the **registryInstance**, **subgraphService**, **simulatorService**, **derivativeLensFactory** will be instantiated.
- In order to initialize the Opium V2's wrapped contracts (**Registry**, **Core**, **SyntheticAggregator**, **OracleAggregator**), the user has to manually call the `setup` function: this is because the addresses used for the initialization of the core wrapped contracts are fetched directly from the Opium V2 Registry contract as to avoid forcing the users to pass them manually.

2. Note that to allow the SDK to run seamlessly in a web3.js environment, it is possible to override the `JsonRpcProvider` provider by passing a web3.js provider in the `override` field. Read more [here](https://docs.ethers.io/v5/api/providers/other/#Web3Provider).

```ts
export interface IOpiumV2SDKConfig {
  rpcUrl: string;
  chainId: number;
  override?: providers.ExternalProvider;
}
```

## Maintainers

- [RiccardoBiosas](https://github.com/riccardobiosas)
- [Alirun](https://github.com/Alirun)

## Contribute / good first issues:

- [ ] Allow the `SimulatorService` class to calculate the LONG/SHORT positions addresses locally by using the `ethers.utils.getCreate2Address`
- [ ] Increase test coverage
