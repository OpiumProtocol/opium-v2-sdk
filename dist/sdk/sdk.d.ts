import { providers } from 'ethers';
import { WrappedCore } from '../services/wrappedContracts/wrappedCore';
import { WrappedOracleAggregator } from '../services/wrappedContracts/wrappedOracleAggregator';
import { WrappedSyntheticAggregator } from '../services/wrappedContracts/wrappedSyntheticAggregator';
import { WrappedRegistry } from '../services/wrappedContracts/wrappedRegistry';
import { SubgraphService } from '../services/subgraphService/subgraphService';
import { SimulatorService } from '../services/simulatorService/simulatorService';
import { DerivativeLensFactory } from '../services/factoryService';
import { chainIds } from '../constants';
export interface IOpiumV2SDKConfig {
    rpcUrl: string;
    chainId: typeof chainIds[keyof typeof chainIds];
    override?: providers.ExternalProvider;
}
export declare class OpiumV2SDK {
    readonly provider$: providers.JsonRpcProvider;
    registryInstance: WrappedRegistry;
    coreInstance: WrappedCore | undefined;
    oracleAggregatorInstance: WrappedOracleAggregator | undefined;
    syntheticAggregatorInstance: WrappedSyntheticAggregator | undefined;
    subgraphService: SubgraphService;
    simulatorService: SimulatorService;
    derivativeLensFactory: DerivativeLensFactory;
    constructor(_config: IOpiumV2SDKConfig);
    setup(): Promise<void>;
}
