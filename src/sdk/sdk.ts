import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers';
import { providers } from 'ethers';
import {
  CoreContract,
  OracleAggregatorContract,
  SyntheticAggregatorContract,
  RegistryContract,
  SubgraphService,
} from '../services';
import { ContractService } from '.';
import RegistryABI from '../abi/Registry.json';
import CoreABI from '../abi/Core.json';
import OracleAggregatorABI from '../abi/OracleAggregator.json';
import SyntheticAggregatorABI from '../abi/SyntheticAggregator.json';
import { Core, OracleAggregator, Registry } from '../types/typechain';
import { SyntheticAggregator } from '../types/typechain/SyntheticAggregator';
import { chainIds } from '../constants';
import { configByChain } from '../utils';

export interface IOpiumV2SDKConfig {
  // use a known network or provide an entirely custom config
  rpcUrl: string;
  chainId: typeof chainIds[keyof typeof chainIds];
  override?: ExternalProvider;
}

export class OpiumV2SDK {
  public readonly _provider: JsonRpcProvider;

  // smart contracts' services
  public registryInstance: RegistryContract;

  public coreInstance: CoreContract | undefined;

  public oracleAggregatorInstance: OracleAggregatorContract | undefined;

  public syntheticAggregatorInstance: SyntheticAggregatorContract | undefined;

  // subgraph service
  public subgraphService: SubgraphService;

  constructor(_config: IOpiumV2SDKConfig) {
    if (_config.override) {
      this._provider = new providers.Web3Provider(_config.override);
    } else {
      this._provider = new JsonRpcProvider(_config.rpcUrl);
    }
    const networkConfig = configByChain(chainIds, _config.chainId);
    if (!networkConfig) {
      throw new Error('unsupported chainId');
    }

    this.registryInstance = new RegistryContract(
      new ContractService<Registry>(networkConfig.registryAddress, RegistryABI, this._provider),
    );

    this.subgraphService = new SubgraphService(networkConfig.subgraphEndpoint);
  }

  public async setup(): Promise<void> {
    const protocolAddresses = await this.registryInstance.getProtocolAddresses();

    this.coreInstance = new CoreContract(new ContractService<Core>(protocolAddresses.core, CoreABI, this._provider));

    this.oracleAggregatorInstance = new OracleAggregatorContract(
      new ContractService<OracleAggregator>(protocolAddresses.oracleAggregator, OracleAggregatorABI, this._provider),
    );

    this.syntheticAggregatorInstance = new SyntheticAggregatorContract(
      new ContractService<SyntheticAggregator>(
        protocolAddresses.syntheticAggregator,
        SyntheticAggregatorABI,
        this._provider,
      ),
    );
  }
}
