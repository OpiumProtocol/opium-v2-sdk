import { Contract, ContractInterface } from 'ethers';
import { SDKContext } from '../../common/sdkContext';
export declare class ContractService<T extends Contract> {
    readonly sdkCtx: SDKContext;
    private readonly address$;
    private readonly abi$;
    readonly contract: T;
    constructor(_sdkCtx: SDKContext, _address: string, _abi: ContractInterface);
    getAddress(): string;
}
