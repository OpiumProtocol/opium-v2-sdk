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

export type TTickerQueryData = {
  id: string
  margin: string
  endTime: string
  params: string[]
  oracleId: string
  token: string
  syntheticId: string
  longPosition: {
    id: string
    totalSupply: string
  }
  shortPosition: {
    id: string
    totalSupply: string
  }
}
export type TTickersQueryResponse = {
  tickers: TTickerQueryData[]
}
