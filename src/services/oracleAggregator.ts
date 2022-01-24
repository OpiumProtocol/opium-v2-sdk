import { CallOverrides } from "@ethersproject/contracts";
import ethers, { BigNumber, ContractTransaction } from "ethers";
import { ContractService } from "../sdk";
import { OracleAggregator } from "../types/typechain/OracleAggregator";

export class OracleAggregatorContract {
  private _oracleAggregator: OracleAggregator;

  constructor(_oracleAggregatorService: ContractService<OracleAggregator>) {
    this._oracleAggregator = _oracleAggregatorService.contract;
  }

  public async pushData(
    _timestamp: BigNumber,
    _data: BigNumber,
    _account: ethers.Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._oracleAggregator.connect(_account).__callback(_timestamp, _data, _overrides);
  }

  public async getData(
    _oracleId: string,
    _timestamp: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<BigNumber> {
    return this._oracleAggregator.getData(_oracleId, _timestamp, _overrides);
  }

  public async hasData(
    _oracleId: string,
    _timestamp: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<boolean> {
    return this._oracleAggregator.hasData(_oracleId, _timestamp, _overrides);
  }
}
