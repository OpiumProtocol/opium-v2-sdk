// theirs
import axios from 'axios';
import { SDKContext } from '../../common/sdkContext';
// types
import { THolderPositionsQueryResponse, TTickersQueryResponse } from '../../types/subgraph';
// utils
import { holderPositionsQuery, tickersByDerivativeHashQuery, tickersByLongPositionAddressQuery, tickersByShortPositionAddressQuery } from './queries';

export class SubgraphService {
  private readonly sdkCtx$: SDKContext;

  constructor(_sdkCtx: SDKContext) {
    this.sdkCtx$ = _sdkCtx;
  }

  public async queryHolderPositions(holderAddress: string): Promise<THolderPositionsQueryResponse> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: holderPositionsQuery(holderAddress),
      variables: {},
    };

    const response = await axios({
      url: this.sdkCtx$.getNetworkConfig().subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }

  public async queryTickersByDerivativeHash(derivativeHash: string): Promise<TTickersQueryResponse> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: tickersByDerivativeHashQuery(derivativeHash),
      variables: {},
    };

    const response = await axios({
      url: this.sdkCtx$.getNetworkConfig().subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }

  public async queryTickersByLongPositionAddress(longPositionAddress: string): Promise<TTickersQueryResponse> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: tickersByLongPositionAddressQuery(longPositionAddress),
      variables: {},
    };

    const response = await axios({
      url: this.sdkCtx$.getNetworkConfig().subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }

  public async queryTickersByShortPositionAddress(shortPositionAddress: string): Promise<TTickersQueryResponse> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: tickersByShortPositionAddressQuery(shortPositionAddress),
      variables: {},
    };

    const response = await axios({
      url: this.sdkCtx$.getNetworkConfig().subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }
}
