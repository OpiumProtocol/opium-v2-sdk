// theirs
import { BigNumber, BigNumberish, ContractTransaction, CallOverrides } from 'ethers';
// services
import { ContractService } from '../factoryService/contractService';
// types
import { isErrorReasonExplicit } from '../../types/misc';
import { OracleAggregator } from '../../types/typechain/OracleAggregator';
// utils
import { SDKError } from '../../common';
import { pickError } from '../../utils';

export class WrappedOracleAggregator {
  private oracleAggregatorService$: ContractService<OracleAggregator>;

  constructor(_oracleAggregatorService: ContractService<OracleAggregator>) {
    this.oracleAggregatorService$ = _oracleAggregatorService;
  }

  public async pushData(
    _timestamp: BigNumberish,
    _data: BigNumberish,
    _overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    try {
      const signer = (await this.oracleAggregatorService$.getProvider()).getSigner();
      // eslint-disable-next-line no-underscore-dangle
      return this.oracleAggregatorService$.contract.connect(signer).__callback(_timestamp, _data, _overrides);
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }

  public async getData(
    _oracleId: string,
    _timestamp: BigNumberish,
    _overrides: CallOverrides = {},
  ): Promise<BigNumber> {
    try {
      return this.oracleAggregatorService$.contract.getData(_oracleId, _timestamp, _overrides);
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }

  public async hasData(_oracleId: string, _timestamp: BigNumberish, _overrides: CallOverrides = {}): Promise<boolean> {
    try {
      return this.oracleAggregatorService$.contract.hasData(_oracleId, _timestamp, _overrides);
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }
}
