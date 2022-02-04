import { ExternalProvider, JsonRpcProvider } from "@ethersproject/providers";
import { findKey } from "lodash";
import {
  CoreContract,
  OracleAggregatorContract,
  SyntheticAggregatorContract,
} from "../services";
import { ContractService } from ".";
import RegistryABI from "../abi/Registry.json";
import CoreABI from "../abi/Core.json";
import OracleAggregatorABI from "../abi/OracleAggregator.json";
import SyntheticAggregatorABI from "../abi/SyntheticAggregator.json";
import { Core, OracleAggregator, Registry } from "../types/typechain";
import { SyntheticAggregator } from "../types/typechain/SyntheticAggregator";
import { RegistryContract } from "../services/registry";
import { chainIds, registryAddresses } from "../constants";
import { ENetworks, valueof } from "../types";
import { providers } from "ethers";

export interface IOpiumV2SDKConfig {
  //use a known network or provide an entirely custom config
  rpcUrl: string;
  chainId: typeof chainIds[keyof typeof chainIds];
  override?: ExternalProvider;
}

export class OpiumV2SDK {
  public readonly _provider: JsonRpcProvider;
  public registryInstance: RegistryContract;
  public coreInstance: CoreContract | undefined;
  public oracleAggregatorInstance: OracleAggregatorContract | undefined;
  public syntheticAggregatorInstance: SyntheticAggregatorContract | undefined;

  constructor(_config: IOpiumV2SDKConfig) {
    if (_config.override) {
      this._provider = new providers.Web3Provider(_config.override);
    } else {
      this._provider = new JsonRpcProvider(_config.rpcUrl);
    }
    const network = findKey(chainIds, (item) => {
      return item === _config.chainId;
    });
    if (!network) {
      throw new Error("unsupported chainId");
    }

    this.registryInstance = new RegistryContract(
      new ContractService<Registry>(
        registryAddresses[network as ENetworks],
        RegistryABI,
        this._provider
      )
    );
  }

  public async setup(): Promise<void> {
    const protocolAddresses =
      await this.registryInstance.getProtocolAddresses();

    this.coreInstance = new CoreContract(
      new ContractService<Core>(
        protocolAddresses.core,
        CoreABI.abi,
        this._provider
      )
    );

    this.oracleAggregatorInstance = new OracleAggregatorContract(
      new ContractService<OracleAggregator>(
        protocolAddresses.oracleAggregator,
        OracleAggregatorABI.abi,
        this._provider
      )
    );

    this.syntheticAggregatorInstance = new SyntheticAggregatorContract(
      new ContractService<SyntheticAggregator>(
        protocolAddresses.syntheticAggregator,
        SyntheticAggregatorABI.abi,
        this._provider
      )
    );
  }
}
