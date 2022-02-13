import { WrappedCore } from '../services/wrappedContracts/wrappedCore';
import { WrappedOracleAggregator } from '../services/wrappedContracts/wrappedOracleAggregator';
import { WrappedSyntheticAggregator } from '../services/wrappedContracts/wrappedSyntheticAggregator';
import { WrappedRegistry } from '../services/wrappedContracts/wrappedRegistry';
import { SubgraphService } from '../services/subgraphService/subgraphService';
import { SimulatorService } from '../services/simulatorService/simulatorService';
import { DerivativeLensFactory } from '../services/factoryService';
import { IOpiumV2SDKConfig } from '../types/misc';
import { SDKContext } from '../common/sdkContext';
export declare class OpiumV2SDK {
    /** ***********
     * SDK CONTEXT
     * it exposes getters to fetch web3 config with which the SDK has been initialized
     ************** */
    readonly sdkCtx: SDKContext;
    /** ***********
     * SMART CONTRACT SERVICE INSTANCES
     * it exposes type-safe class wrappers around the Opium V2 core contracts
     ************** */
    registryInstance: WrappedRegistry;
    coreInstance: WrappedCore | undefined;
    oracleAggregatorInstance: WrappedOracleAggregator | undefined;
    syntheticAggregatorInstance: WrappedSyntheticAggregator | undefined;
    /** ***********
     * SUBGRAPH SERVICE INSTANCE
     * it exposes functions to query the Opium V2 subgraph
     ************** */
    subgraphService: SubgraphService;
    /** ***********
     * SIMULATOR SERVICE INSTANCE
     * it exposes functions to obtain information about the state of the Opium V2 protocol either by sending JSON-RPC calls to an Ethereum network or by performing some local computation
     ************** */
    simulatorService: SimulatorService;
    /** ***********
     * DERIVATIVELENSFACTORY SERVICE INSTANCE
     * it exposes functions to obtain information about Opium V2 tickers by querying SyntheticID contracts or OracleID contracts
     ************** */
    derivativeLensFactory: DerivativeLensFactory;
    constructor(_config: IOpiumV2SDKConfig);
    setup(): Promise<{
        coreInstance: WrappedCore;
        oracleAggregatorInstance: WrappedOracleAggregator;
        syntheticAggregatorInstance: WrappedSyntheticAggregator;
    }>;
}
