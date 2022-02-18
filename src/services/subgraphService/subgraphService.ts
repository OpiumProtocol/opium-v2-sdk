// theirs
import axios from 'axios';
import { SDKContext } from '../../common/sdkContext';
// types
import { THolderPositionsQueryResponse } from '../../types/subgraph';
// utils
import { holderPositionsQuery } from './queries';

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
}
