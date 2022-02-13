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
    readonly sdkCtx: SDKContext;
    registryInstance: WrappedRegistry;
    coreInstance: WrappedCore | undefined;
    oracleAggregatorInstance: WrappedOracleAggregator | undefined;
    syntheticAggregatorInstance: WrappedSyntheticAggregator | undefined;
    subgraphService: SubgraphService;
    simulatorService: SimulatorService;
    derivativeLensFactory: DerivativeLensFactory;
    constructor(_config: IOpiumV2SDKConfig);
    setup(): Promise<{
        coreInstance: WrappedCore;
        oracleAggregatorInstance: WrappedOracleAggregator;
        syntheticAggregatorInstance: WrappedSyntheticAggregator;
    }>;
}
