import { BigNumberish, BigNumber } from 'ethers';
import { TAddress, TDerivative } from '../../types';
import { SDKContext } from '../../common/sdkContext';
export declare class DerivativeLensFactory {
    private readonly sdkCtx$;
    constructor(_sdkCtx: SDKContext);
    getOracleIdResult(_oracleIdAddress: TAddress): Promise<BigNumber>;
    getSyntheticIdExecutionPayout(_derivative: TDerivative, _strikeResult: BigNumberish): Promise<[BigNumber, BigNumber]>;
}
