export declare type TProtocolContractAddresses = {
    core: string;
    opiumProxyFactory: string;
    oracleAggregator: string;
    syntheticAggregator: string;
    tokenSpender: string;
};
export declare type TProtocolAgents = {
    protocolExecutionReserveClaimer: string;
    protocolRedemptionReserveClaimer: string;
};
export declare type TProtocolAddresses = TProtocolContractAddresses & TProtocolAgents;
export declare type TProtocolParameters = {
    noDataCancellationPeriod: number;
    derivativeAuthorExecutionFeeCap: number;
    derivativeAuthorRedemptionReservePart: number;
    protocolExecutionReservePart: number;
    protocolRedemptionReservePart: number;
};
