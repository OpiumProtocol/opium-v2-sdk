// theirs
import { BigNumberish, BigNumber } from 'ethers';
// services
import { ContractService } from './contractService';
import { TAddress, TDerivative } from '../../types';
import { IDerivativeLogic, ILiveFeedOracleId } from '../../types/typechain';
// types
import { isErrorReasonExplicit } from '../../types/misc';
import { IDerivativeLogicAbi, ILiveFeedOracleIdABI } from '../../abi';
// utils
import { SDKContext } from '../../common/sdkContext';
import { SDKError } from '../../common';
import { pickError } from '../../utils';

export class DerivativeLensFactory {
  private readonly sdkCtx$: SDKContext;

  constructor(_sdkCtx: SDKContext) {
    this.sdkCtx$ = _sdkCtx;
  }

  public async getOracleIdResult(_oracleIdAddress: TAddress): Promise<BigNumberish> {
    try {
      const oracleId = new ContractService<ILiveFeedOracleId>(this.sdkCtx$, _oracleIdAddress, ILiveFeedOracleIdABI);
      return oracleId.contract.getResult();
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

  public async getSyntheticIdExecutionPayout(
    _derivative: TDerivative,
    _strikeResult: BigNumberish,
  ): Promise<[BigNumber, BigNumber]> {
    try {
      const syntheticId = new ContractService<IDerivativeLogic>(
        this.sdkCtx$,
        _derivative.syntheticId,
        IDerivativeLogicAbi,
      );
      return syntheticId.contract.getExecutionPayout(_derivative, _strikeResult);
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
