import { Signer } from "ethers";
import { TDerivative } from "../types/index";
import { ContractService } from "../sdk";
import { SyntheticAggregator } from "../types/typechain/SyntheticAggregator";
export declare class SyntheticAggregatorContract {
    private _syntheticAggregator;
    constructor(_syntheticAggregatorService: ContractService<SyntheticAggregator>);
    getMargin(_derivative: TDerivative, _account: Signer): Promise<import("ethers").ContractTransaction>;
    getSyntheticCache(_derivative: TDerivative, _account: Signer): Promise<any>;
}
