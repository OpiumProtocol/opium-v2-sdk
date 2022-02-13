import { BigNumberish } from 'ethers';

export type TDerivative = {
  margin: BigNumberish;
  endTime: number;
  params: BigNumberish[];
  oracleId: string;
  token: string;
  syntheticId: string;
};
