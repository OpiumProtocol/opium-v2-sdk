import { omit } from "lodash";
import { Registry } from "../types/typechain";
import { struct } from "../utils/misc";
import { ContractService } from "../sdk";
import { TProtocolAddresses, TProtocolParameters } from "../types/contracts";

export class RegistryContract {
  private _registryService: ContractService<Registry>;

  constructor(_registryService: ContractService<Registry>) {
    this._registryService = _registryService;
  }

  public async getProtocolParameters(): Promise<TProtocolParameters> {
    return struct(
      omit(
        await this._registryService.contract.getProtocolParameters(),
        "__gapOne",
        "__gapTwo",
        "__gapThree",
        "__gapFour"
      )
    );
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    return struct(
      omit(
        await this._registryService.contract.getProtocolAddresses(),
        "__gapOne",
        "__gapTwo"
      )
    );
  }

  public async getCore(): Promise<string> {
    return this._registryService.contract.getCore();
  }
}
