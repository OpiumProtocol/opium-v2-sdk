import { providers, Contract, ContractInterface } from 'ethers';

export class ContractService<T extends Contract> {
  private readonly address$: string;

  private readonly abi$: ContractInterface;

  private readonly provider$: providers.JsonRpcProvider;

  public readonly contract: T;

  constructor(_address: string, _abi: ContractInterface, _provider: providers.JsonRpcProvider) {
    this.address$ = _address;
    this.abi$ = _abi;
    this.provider$ = _provider;
    this.contract = <T>new Contract(this.address$, this.abi$, this.provider$);
  }

  public getAddress(): string {
    return this.address$;
  }

  public getProvider(): providers.JsonRpcProvider {
    return this.provider$;
  }
}
