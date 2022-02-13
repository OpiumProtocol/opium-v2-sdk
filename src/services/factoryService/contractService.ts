import { Contract, ContractInterface } from 'ethers';
import { SDKContext } from '../../common/sdkContext';

export class ContractService<T extends Contract> {
  public readonly sdkCtx: SDKContext;

  private readonly address$: string;

  private readonly abi$: ContractInterface;

  public readonly contract: T;

  constructor(_sdkCtx: SDKContext, _address: string, _abi: ContractInterface) {
    this.sdkCtx = _sdkCtx;
    this.address$ = _address;
    this.abi$ = _abi;
    this.contract = <T>new Contract(this.address$, this.abi$, this.sdkCtx.getProvider());
  }

  public getAddress(): string {
    return this.address$;
  }
}
