import { providers } from 'ethers';
import { IOpiumV2SDKConfig, TConfigByChain } from '../types/misc';
export declare class SDKContext {
    private readonly provider$;
    private readonly chainId$;
    private readonly networkConfig$;
    constructor(_config: IOpiumV2SDKConfig);
    getProvider(): providers.JsonRpcProvider;
    getChainId(): number;
    getNetworkConfig(): TConfigByChain;
}
