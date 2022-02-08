import { TProtocolAddresses, TProtocolParameters } from '../../types/contracts';
import { Registry } from '../../types/typechain';
import { ContractService } from '../../sdk/contractService';
export declare class WrappedRegistry {
    private registryService$;
    constructor(_registryService: ContractService<Registry>);
    getProtocolParameters(): Promise<TProtocolParameters>;
    getProtocolAddresses(): Promise<TProtocolAddresses>;
    getCore(): Promise<string>;
}
