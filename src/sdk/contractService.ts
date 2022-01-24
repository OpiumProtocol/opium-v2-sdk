import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "@ethersproject/contracts";

export class ContractService<T extends Contract> {
  private readonly _address: string;
  private readonly _abi: ContractInterface;
  private readonly _provider: JsonRpcProvider;
  public readonly contract: T;

  constructor(
    _address: string,
    _abi: ContractInterface,
    _provider: JsonRpcProvider
  ) {
    this._address = _address;
    this._abi = _abi;
    this._provider = _provider;
    this.contract = <T>new Contract(this._address, this._abi, _provider);
  }

  public getAddress(): string {
    return this._address;
  }

  public getProvider(): JsonRpcProvider {
    return this._provider;
  }
}
