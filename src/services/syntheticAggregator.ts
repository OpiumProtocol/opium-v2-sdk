import { CallOverrides } from "@ethersproject/contracts";
import { TDerivative } from "../types/index";
import { struct } from "../utils/misc";
import { getDerivativeHash } from "../utils/financial";
import { ContractService } from "../sdk";
import { SyntheticAggregator } from "../types/typechain/SyntheticAggregator";

export class SyntheticAggregatorContract {
  private _syntheticAggregatorService: ContractService<SyntheticAggregator>;

  constructor(
    _syntheticAggregatorService: ContractService<SyntheticAggregator>
  ) {
    this._syntheticAggregatorService = _syntheticAggregatorService;
  }

  public async getOrCacheMargin(
    _derivative: TDerivative,
    _overrides: CallOverrides = {}
  ) {
    const signer = (
      await this._syntheticAggregatorService.getProvider()
    ).getSigner();
    const derivativeHash = getDerivativeHash(_derivative);
    return this._syntheticAggregatorService.contract
      .connect(signer)
      .getOrCacheMargin(derivativeHash, _derivative);
  }

  public async getOrCacheSyntheticCache(
    _derivative: TDerivative,
    _overrides: CallOverrides = {}
  ) {
    const signer = (
      await this._syntheticAggregatorService.getProvider()
    ).getSigner();
    const derivativeHash = getDerivativeHash(_derivative);
    return struct(
      await this._syntheticAggregatorService.contract
        .connect(signer)
        .getOrCacheSyntheticCache(derivativeHash, _derivative)
    );
  }
}
