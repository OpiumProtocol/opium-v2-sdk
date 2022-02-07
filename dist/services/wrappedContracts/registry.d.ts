import { Registry } from "../../types/typechain";
import { ContractService } from "../../sdk";
import { TProtocolAddresses, TProtocolParameters } from "../../types/contracts";
export declare class RegistryContract {
    private _registryService;
    constructor(_registryService: ContractService<Registry>);
    getProtocolParameters(): Promise<TProtocolParameters>;
    getProtocolAddresses(): Promise<TProtocolAddresses>;
    getCore(): Promise<string>;
}
