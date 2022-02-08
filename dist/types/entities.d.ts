import { BigNumberish } from 'ethers';
export declare type TDerivative = {
    margin: BigNumberish;
    endTime: number;
    params: BigNumberish[];
    oracleId: string;
    token: string;
    syntheticId: string;
};
