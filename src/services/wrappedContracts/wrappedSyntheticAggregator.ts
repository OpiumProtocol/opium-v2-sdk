// theirs
import { CallOverrides } from 'ethers';
// services
import { ContractService } from '../factoryService/contractService';
import { SyntheticAggregator } from '../../types/typechain/SyntheticAggregator';
// types
import { TDerivative } from '../../types/index';
// utils
import { struct } from '../../utils/misc';
import { getDerivativeHash } from '../../utils/financial';

export class WrappedSyntheticAggregator {
  private syntheticAggregatorService$: ContractService<SyntheticAggregator>;

  constructor(_syntheticAggregatorService: ContractService<SyntheticAggregator>) {
    this.syntheticAggregatorService$ = _syntheticAggregatorService;
  }

  public async getOrCacheMargin(_derivative: TDerivative, _overrides: CallOverrides = {}) {
    const signer = (await this.syntheticAggregatorService$.getProvider()).getSigner();
    const derivativeHash = getDerivativeHash(_derivative);
    return this.syntheticAggregatorService$.contract
      .connect(signer)
      .getOrCacheMargin(derivativeHash, _derivative, _overrides);
  }

  public async getOrCacheSyntheticCache(_derivative: TDerivative, _overrides: CallOverrides = {}) {
    const signer = (await this.syntheticAggregatorService$.getProvider()).getSigner();
    const derivativeHash = getDerivativeHash(_derivative);
    return struct(
      await this.syntheticAggregatorService$.contract
        .connect(signer)
        .getOrCacheSyntheticCache(derivativeHash, _derivative, _overrides),
    );
  }
}
