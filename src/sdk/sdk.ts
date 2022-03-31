// services
import { WrappedCore } from '../services/wrappedContracts/wrappedCore';
import { WrappedOracleAggregator } from '../services/wrappedContracts/wrappedOracleAggregator';
import { WrappedSyntheticAggregator } from '../services/wrappedContracts/wrappedSyntheticAggregator';
import { WrappedRegistry } from '../services/wrappedContracts/wrappedRegistry';
import { SubgraphService } from '../services/subgraphService/subgraphService';
import { SimulatorService } from '../services/simulatorService/simulatorService';
import { ContractService } from '../services/factoryService/contractService';
import { DerivativeLensFactory } from '../services/factoryService';
// types
import { TProtocolAddresses } from '../types/contracts';
import { IOpiumV2SDKConfig } from '../types/misc';
import { RegistryABI, CoreABI, OracleAggregatorABI, SyntheticAggregatorABI } from '../abi';
import { Core, OracleAggregator, Registry } from '../types/typechain';
import { SyntheticAggregator } from '../types/typechain/SyntheticAggregator';
// utils & constant
import { SDKContext } from '../common/sdkContext';

export class OpiumV2SDK {
  /** ***********
   * SDK CONTEXT
   * it exposes getters to fetch web3 config with which the SDK has been initialized
   ************** */
  public readonly sdkCtx: SDKContext;

  /** ***********
   * SMART CONTRACT SERVICE INSTANCES
   * it exposes type-safe class wrappers around the Opium V2 core contracts
   ************** */
  public registryInstance: WrappedRegistry;

  public coreInstance: WrappedCore | undefined;

  public oracleAggregatorInstance: WrappedOracleAggregator | undefined;

  public syntheticAggregatorInstance: WrappedSyntheticAggregator | undefined;

  /** ***********
   * SUBGRAPH SERVICE INSTANCE
   * it exposes functions to query the Opium V2 subgraph
   ************** */
  public subgraphService: SubgraphService;

  /** ***********
   * SIMULATOR SERVICE INSTANCE
   * it exposes functions to obtain information about the state of the Opium V2 protocol either by sending JSON-RPC calls to an Ethereum network or by performing some local computation
   ************** */
  public simulatorService: SimulatorService;

  /** ***********
   * DERIVATIVELENSFACTORY SERVICE INSTANCE
   * it exposes functions to obtain information about Opium V2 tickers by querying SyntheticID contracts or OracleID contracts
   ************** */
  public derivativeLensFactory: DerivativeLensFactory;

  constructor(_config: IOpiumV2SDKConfig) {
    this.sdkCtx = new SDKContext(_config);

    this.registryInstance = new WrappedRegistry(
      new ContractService<Registry>(this.sdkCtx, this.sdkCtx.getNetworkConfig().registryProxyAddress, RegistryABI),
    );

    this.subgraphService = new SubgraphService(this.sdkCtx);

    this.simulatorService = new SimulatorService(this.sdkCtx);

    this.derivativeLensFactory = new DerivativeLensFactory(this.sdkCtx);
  }

  public async setup(): Promise<{
    coreInstance: WrappedCore;
    oracleAggregatorInstance: WrappedOracleAggregator;
    syntheticAggregatorInstance: WrappedSyntheticAggregator;
    protocolAddresses: TProtocolAddresses;
  }> {
    const protocolAddresses = await this.registryInstance.getProtocolAddresses();

    this.coreInstance = new WrappedCore(new ContractService<Core>(this.sdkCtx, protocolAddresses.core, CoreABI));

    this.oracleAggregatorInstance = new WrappedOracleAggregator(
      new ContractService<OracleAggregator>(this.sdkCtx, protocolAddresses.oracleAggregator, OracleAggregatorABI),
    );

    this.syntheticAggregatorInstance = new WrappedSyntheticAggregator(
      new ContractService<SyntheticAggregator>(
        this.sdkCtx,
        protocolAddresses.syntheticAggregator,
        SyntheticAggregatorABI,
      ),
    );
    return {
      coreInstance: this.coreInstance,
      oracleAggregatorInstance: this.oracleAggregatorInstance,
      syntheticAggregatorInstance: this.syntheticAggregatorInstance,
      protocolAddresses,
    };
  }
}
