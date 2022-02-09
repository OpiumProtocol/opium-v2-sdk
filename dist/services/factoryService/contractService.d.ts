import { providers, Contract, ContractInterface } from 'ethers';
export declare class ContractService<T extends Contract> {
    private readonly address$;
    private readonly abi$;
    private readonly provider$;
    readonly contract: T;
    constructor(_address: string, _abi: ContractInterface, _provider: providers.JsonRpcProvider);
    getAddress(): string;
    getProvider(): providers.JsonRpcProvider;
}
