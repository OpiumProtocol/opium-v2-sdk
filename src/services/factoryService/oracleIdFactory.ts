// theirs
import { BigNumber, providers } from 'ethers';
// services
import { ContractService } from './contractService';
import { TAddress } from '../../types';
import { IOracleId } from '../../types/typechain';
// types
import { ILiveFeedOracleIdABI } from '../../abi';

export class OracleIdFactory {
  private oracleAggregatorId$: ContractService<IOracleId>;

  constructor(_oracleIdAddress: TAddress, _provider: providers.JsonRpcProvider) {
    this.oracleAggregatorId$ = new ContractService<IOracleId>(_oracleIdAddress, ILiveFeedOracleIdABI, _provider);
  }

  public async getResult(): Promise<BigNumber> {
    return this.oracleAggregatorId$.contract.getResult();
  }
}
