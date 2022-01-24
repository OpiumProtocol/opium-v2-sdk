import "reflect-metadata";
import { JsonRpcProvider, Network } from "@ethersproject/providers";
import { Service } from "typedi";
import {
  CoreContract,
  OracleAggregatorContract,
  SyntheticAggregatorContract,
} from "../services";
import { ContractService } from ".";
import CoreABI from "../abi/Core.json";
import OracleAggregatorABI from "../abi/OracleAggregator.json";
import SyntheticAggregatorABI from "../abi/SyntheticAggregator.json";
import { Core, OracleAggregator } from "../types/typechain";
import { SyntheticAggregator } from "../types/typechain/SyntheticAggregator";

export interface IOpiumV2SDKConfig {
  //use a known network or provide an entirely custom config
  network: Network;
  rpcUrl: string;
}

@Service()
export class OpiumV2SDK {
  private readonly _rpcUrl: string;
  public readonly _provider: JsonRpcProvider;
  public coreInstance: CoreContract;
  public oracleAggregatorInstance: OracleAggregatorContract;
  public syntheticAggregatorInstance: SyntheticAggregatorContract;

  constructor(
    _config: IOpiumV2SDKConfig,
    coreAddress: string,
    oracleAggregatorAddress: string,
    syntheticAggregatorAddress: string
  ) {
    this._rpcUrl = _config.rpcUrl;
    this._provider = new JsonRpcProvider(_config.rpcUrl);
    this.coreInstance = new CoreContract(
      new ContractService<Core>(coreAddress, CoreABI.abi, this._provider)
    );

    this.oracleAggregatorInstance = new OracleAggregatorContract(
      new ContractService<OracleAggregator>(
        oracleAggregatorAddress,
        OracleAggregatorABI.abi,
        this._provider
      )
    );

    this.syntheticAggregatorInstance = new SyntheticAggregatorContract(
      new ContractService<SyntheticAggregator>(
        syntheticAggregatorAddress,
        SyntheticAggregatorABI.abi,
        this._provider
      )
    );
  }
}
