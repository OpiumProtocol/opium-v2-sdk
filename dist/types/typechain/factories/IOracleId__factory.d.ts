import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IOracleId, IOracleIdInterface } from "../IOracleId";
export declare class IOracleId__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IOracleIdInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IOracleId;
}
