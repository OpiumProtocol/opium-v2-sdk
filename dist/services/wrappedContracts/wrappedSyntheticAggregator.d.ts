import { CallOverrides } from 'ethers';
import { ContractService } from '../factoryService/contractService';
import { SyntheticAggregator } from '../../types/typechain/SyntheticAggregator';
import { TDerivative } from '../../types/index';
export declare class WrappedSyntheticAggregator {
    private syntheticAggregatorService$;
    constructor(_syntheticAggregatorService: ContractService<SyntheticAggregator>);
    getOrCacheMargin(_derivative: TDerivative, _overrides?: CallOverrides): Promise<import("ethers").ContractTransaction>;
    getOrCacheSyntheticCache(_derivative: TDerivative, _overrides?: CallOverrides): Promise<any>;
}
