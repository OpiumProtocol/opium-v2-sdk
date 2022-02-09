import { BigNumber, providers } from 'ethers';
import { TAddress } from '../../types';
export declare class OracleIdFactory {
    private oracleAggregatorId$;
    constructor(_oracleIdAddress: TAddress, _provider: providers.JsonRpcProvider);
    getResult(): Promise<BigNumber>;
}
