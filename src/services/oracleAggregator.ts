import { CallOverrides } from "@ethersproject/contracts";
import { BigNumber, ContractTransaction } from "ethers";
import { ContractService } from "../sdk";
import { OracleAggregator } from "../types/typechain/OracleAggregator";

export class OracleAggregatorContract {
  private _oracleAggregatorService: ContractService<OracleAggregator>;

  constructor(_oracleAggregatorService: ContractService<OracleAggregator>) {
    this._oracleAggregatorService = _oracleAggregatorService;
  }

  public async pushData(
    _timestamp: BigNumber,
    _data: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    const signer = (
      await this._oracleAggregatorService.getProvider()
    ).getSigner();
    return this._oracleAggregatorService.contract
      .connect(signer)
      .__callback(_timestamp, _data, _overrides);
  }

  public async getData(
    _oracleId: string,
    _timestamp: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<BigNumber> {
    return this._oracleAggregatorService.contract.getData(
      _oracleId,
      _timestamp,
      _overrides
    );
  }

  public async hasData(
    _oracleId: string,
    _timestamp: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<boolean> {
    return this._oracleAggregatorService.contract.hasData(
      _oracleId,
      _timestamp,
      _overrides
    );
  }
}
