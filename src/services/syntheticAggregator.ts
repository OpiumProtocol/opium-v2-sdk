import "reflect-metadata";
import { Signer } from "ethers";
import { TDerivative } from "../types/index";
import { struct } from "../utils/misc";
import { getDerivativeHash } from "../utils/financial";
import { ContractService } from "../sdk";
import { SyntheticAggregator } from "../types/typechain/SyntheticAggregator";

export class SyntheticAggregatorContract {
  private _syntheticAggregator: SyntheticAggregator;

  constructor(
    _syntheticAggregatorService: ContractService<SyntheticAggregator>
  ) {
    this._syntheticAggregator = _syntheticAggregatorService.contract;
  }

  // TODO: update the name/abi
  public async getMargin(_derivative: TDerivative, _account: Signer) {
    const derivativeHash = getDerivativeHash(_derivative);
    return this._syntheticAggregator.connect(_account).getMargin(derivativeHash, _derivative);
  }

  // TODO: update the name/abi
  public async getSyntheticCache(_derivative: TDerivative, _account: Signer) {
    const derivativeHash = getDerivativeHash(_derivative);
    return struct(
      await this._syntheticAggregator.connect(_account).getSyntheticCache(
        derivativeHash,
        _derivative
      )
    );
  }
}
