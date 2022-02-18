import { TAddress } from '.';

export type THolderPositionsQueryResponse = {
  holderPositions: {
    longBalance: string;
    shortBalance: string;
    ticker: {
      margin: string;
      endTime: string;
      params: string[];
      oracleId: TAddress;
      token: TAddress;
      syntheticId: TAddress;
      longPosition: {
        id: TAddress;
      };
      shortPosition: {
        id: string;
      };
    };
  }[];
};
