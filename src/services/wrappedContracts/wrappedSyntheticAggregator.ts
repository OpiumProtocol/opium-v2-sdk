// theirs
import { CallOverrides, ContractTransaction } from 'ethers';
// services
import { ContractService } from '../factoryService/contractService';
import { SyntheticAggregator } from '../../types/typechain/SyntheticAggregator';
// types
import { isErrorReasonExplicit } from '../../types/misc';
import { TDerivative } from '../../types/index';
// utils
import { SDKError } from '../../common';
import { struct } from '../../utils/misc';
import { getDerivativeHash } from '../../utils/financial';
import { pickError } from '../../utils';

export class WrappedSyntheticAggregator {
  private syntheticAggregatorService$: ContractService<SyntheticAggregator>;

  constructor(_syntheticAggregatorService: ContractService<SyntheticAggregator>) {
    this.syntheticAggregatorService$ = _syntheticAggregatorService;
  }

  public async getOrCacheMargin(
    _derivative: TDerivative,
    _overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    try {
      const signer = (await this.syntheticAggregatorService$.sdkCtx.getProvider()).getSigner();
      const derivativeHash = getDerivativeHash(_derivative);
      return this.syntheticAggregatorService$.contract
        .connect(signer)
        .getOrCacheMargin(derivativeHash, _derivative, _overrides);
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

  public async getOrCacheSyntheticCache(
    _derivative: TDerivative,
    _overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    try {
      const signer = (await this.syntheticAggregatorService$.sdkCtx.getProvider()).getSigner();
      const derivativeHash = getDerivativeHash(_derivative);
      return struct(
        await this.syntheticAggregatorService$.contract
          .connect(signer)
          .getOrCacheSyntheticCache(derivativeHash, _derivative, _overrides),
      );
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
