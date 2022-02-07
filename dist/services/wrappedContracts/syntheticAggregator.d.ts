import { CallOverrides } from "@ethersproject/contracts";
import { TDerivative } from "../../types/index";
import { ContractService } from "../../sdk";
import { SyntheticAggregator } from "../../types/typechain/SyntheticAggregator";
export declare class SyntheticAggregatorContract {
    private _syntheticAggregatorService;
    constructor(_syntheticAggregatorService: ContractService<SyntheticAggregator>);
    getOrCacheMargin(_derivative: TDerivative, _overrides?: CallOverrides): Promise<import("@ethersproject/contracts").ContractTransaction>;
    getOrCacheSyntheticCache(_derivative: TDerivative, _overrides?: CallOverrides): Promise<any>;
}
