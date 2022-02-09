import { BigNumber, ContractTransaction, CallOverrides } from 'ethers';
import { ContractService } from '../factoryService/contractService';
import { OracleAggregator } from '../../types/typechain/OracleAggregator';
export declare class WrappedOracleAggregator {
    private oracleAggregatorService$;
    constructor(_oracleAggregatorService: ContractService<OracleAggregator>);
    pushData(_timestamp: BigNumber, _data: BigNumber, _overrides?: CallOverrides): Promise<ContractTransaction>;
    getData(_oracleId: string, _timestamp: BigNumber, _overrides?: CallOverrides): Promise<BigNumber>;
    hasData(_oracleId: string, _timestamp: BigNumber, _overrides?: CallOverrides): Promise<boolean>;
}
