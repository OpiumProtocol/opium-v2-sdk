import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "@ethersproject/contracts";
export declare class ContractService<T extends Contract> {
    private readonly _address;
    private readonly _abi;
    private readonly _provider;
    readonly contract: T;
    constructor(_address: string, _abi: ContractInterface, _provider: JsonRpcProvider);
    getAddress(): string;
    getProvider(): JsonRpcProvider;
}
