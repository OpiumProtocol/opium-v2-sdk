import { ExternalProvider, JsonRpcProvider } from "@ethersproject/providers";
import { CoreContract, OracleAggregatorContract, SyntheticAggregatorContract } from "../services";
import { RegistryContract } from "../services/registry";
import { chainIds } from "../constants";
export interface IOpiumV2SDKConfig {
    rpcUrl: string;
    chainId: typeof chainIds[keyof typeof chainIds];
    override?: ExternalProvider;
}
export declare class OpiumV2SDK {
    readonly _provider: JsonRpcProvider;
    registryInstance: RegistryContract;
    coreInstance: CoreContract | undefined;
    oracleAggregatorInstance: OracleAggregatorContract | undefined;
    syntheticAggregatorInstance: SyntheticAggregatorContract | undefined;
    constructor(_config: IOpiumV2SDKConfig);
    setup(): Promise<void>;
}
