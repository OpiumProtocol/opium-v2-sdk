import { BigNumberish, providers } from 'ethers';
import { TAddress, TDerivative } from '../../types';
export declare class DerivativeLensFactory {
    private readonly provider$;
    constructor(_provider: providers.JsonRpcProvider);
    getOracleIdResult(_oracleIdAddress: TAddress): Promise<BigNumberish>;
    getSyntheticIdExecutionPayout(_derivative: TDerivative, _strikeResult: BigNumberish): Promise<[BigNumberish, BigNumberish]>;
}
