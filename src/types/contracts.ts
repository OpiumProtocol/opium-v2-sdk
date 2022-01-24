export type TProtocolContractAddresses = {
  core: string;
  opiumProxyFactory: string;
  oracleAggregator: string;
  syntheticAggregator: string;
  tokenSpender: string;
};

export type TProtocolAgents = {
  protocolExecutionReserveClaimer: string;
  protocolRedemptionReserveClaimer: string;
};

export type TProtocolAddresses = TProtocolContractAddresses & TProtocolAgents;

export type TProtocolParameters = {
  noDataCancellationPeriod: number;
  derivativeAuthorExecutionFeeCap: number;
  derivativeAuthorRedemptionReservePart: number;
  protocolExecutionReservePart: number;
  protocolRedemptionReservePart: number;
};