// theirs
import { BigNumber, ContractTransaction, CallOverrides } from 'ethers';
// services
import { ContractService } from '../../sdk/contractService';
// types
import { OracleAggregator } from '../../types/typechain/OracleAggregator';

export class WrappedOracleAggregator {
  private oracleAggregatorService$: ContractService<OracleAggregator>;

  constructor(_oracleAggregatorService: ContractService<OracleAggregator>) {
    this.oracleAggregatorService$ = _oracleAggregatorService;
  }

  public async pushData(
    _timestamp: BigNumber,
    _data: BigNumber,
    _overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    const signer = (await this.oracleAggregatorService$.getProvider()).getSigner();
    // eslint-disable-next-line no-underscore-dangle
    return this.oracleAggregatorService$.contract.connect(signer).__callback(_timestamp, _data, _overrides);
  }

  public async getData(_oracleId: string, _timestamp: BigNumber, _overrides: CallOverrides = {}): Promise<BigNumber> {
    return this.oracleAggregatorService$.contract.getData(_oracleId, _timestamp, _overrides);
  }

  public async hasData(_oracleId: string, _timestamp: BigNumber, _overrides: CallOverrides = {}): Promise<boolean> {
    return this.oracleAggregatorService$.contract.hasData(_oracleId, _timestamp, _overrides);
  }
}
