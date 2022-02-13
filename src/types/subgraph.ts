import { TAddress } from '.';

// positions
export type TPosition = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
  // LibDerivative.Derivative-related data
  margin: string;
  endTime: string;
  params: string[];
  oracleId: TAddress;
  token: TAddress;
  syntheticId: TAddress;
  //  on-chain action-related metadata
  createdAt: string;
  createdTx: string;
};

export interface TDerivativeBalance {
  id: string;
  derivativeHash: string;
  balance: string;
}

// buyer and seller
export type TBuyer = {
  address: TAddress;
  id: string;
  p2pVaultBalances: TDerivativeBalance[];
};

export type TSeller = TBuyer;
