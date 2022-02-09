// theirs
import { providers } from 'ethers';
// services
import { WrappedCore } from '../services/wrappedContracts/wrappedCore';
import { WrappedOracleAggregator } from '../services/wrappedContracts/wrappedOracleAggregator';
import { WrappedSyntheticAggregator } from '../services/wrappedContracts/wrappedSyntheticAggregator';
import { WrappedRegistry } from '../services/wrappedContracts/wrappedRegistry';
import { SubgraphService } from '../services/subgraphService/subgraphService';
import { SimulatorService } from '../services/simulatorService/simulatorService';
import { ContractService } from '../services/factoryService/contractService';
// types
import { RegistryABI, CoreABI, OracleAggregatorABI, SyntheticAggregatorABI } from '../abi';
import { Core, OracleAggregator, Registry } from '../types/typechain';
import { SyntheticAggregator } from '../types/typechain/SyntheticAggregator';
// utils
import { chainIds } from '../constants';
import { configByChain } from '../utils';
import { DerivativeLensFactory } from '../services/factoryService';

export interface IOpiumV2SDKConfig {
  // use a known network or provide an entirely custom config
  rpcUrl: string;
  chainId: typeof chainIds[keyof typeof chainIds];
  override?: providers.ExternalProvider;
}

export class OpiumV2SDK {
  private readonly provider$: providers.JsonRpcProvider;

  // smart contracts' services
  public registryInstance: WrappedRegistry;

  public coreInstance: WrappedCore | undefined;

  public oracleAggregatorInstance: WrappedOracleAggregator | undefined;

  public syntheticAggregatorInstance: WrappedSyntheticAggregator | undefined;

  // subgraph service
  public subgraphService: SubgraphService;

  // simulator service
  public simulatorService: SimulatorService;

  public derivativeLensFactory: DerivativeLensFactory;

  constructor(_config: IOpiumV2SDKConfig) {
    if (_config.override) {
      this.provider$ = new providers.Web3Provider(_config.override);
    } else {
      this.provider$ = new providers.JsonRpcProvider(_config.rpcUrl);
    }
    const networkConfig = configByChain(chainIds, _config.chainId);
    if (!networkConfig) {
      throw new Error('unsupported chainId');
    }

    this.registryInstance = new WrappedRegistry(
      new ContractService<Registry>(networkConfig.registryAddress, RegistryABI, this.provider$),
    );

    this.subgraphService = new SubgraphService(networkConfig.subgraphEndpoint);

    this.simulatorService = SimulatorService;

    this.derivativeLensFactory = new DerivativeLensFactory(this.provider$);
  }

  public async setup(): Promise<void> {
    const protocolAddresses = await this.registryInstance.getProtocolAddresses();

    this.coreInstance = new WrappedCore(new ContractService<Core>(protocolAddresses.core, CoreABI, this.provider$));

    this.oracleAggregatorInstance = new WrappedOracleAggregator(
      new ContractService<OracleAggregator>(protocolAddresses.oracleAggregator, OracleAggregatorABI, this.provider$),
    );

    this.syntheticAggregatorInstance = new WrappedSyntheticAggregator(
      new ContractService<SyntheticAggregator>(
        protocolAddresses.syntheticAggregator,
        SyntheticAggregatorABI,
        this.provider$,
      ),
    );
  }
}
