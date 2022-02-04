import { BigNumber } from "ethers";
export declare type TDerivative = {
    margin: BigNumber;
    endTime: number;
    params: BigNumber[];
    oracleId: string;
    token: string;
    syntheticId: string;
};
