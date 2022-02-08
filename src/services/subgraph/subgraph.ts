import axios from 'axios';
import { TBuyer, TPosition, TSeller } from '../../types/subgraph';
import { buyersQuery, positionsQuery, sellersQuery } from './queries';

export class SubgraphService {
  private readonly subgraphEndpoint: string;

  constructor(_subgraphEndpoint: string) {
    this.subgraphEndpoint = _subgraphEndpoint;
  }

  public async queryPositions(): Promise<TPosition[]> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: positionsQuery,
      variables: {},
    };

    const response = await axios({
      url: this.subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }

  public async queryBuyers(): Promise<TBuyer[]> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: buyersQuery,
      variables: {},
    };

    const response = await axios({
      url: this.subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }

  public async querySellers(): Promise<TSeller[]> {
    const headers = {
      'content-type': 'application/json',
    };
    const graphqlQuery = {
      query: sellersQuery,
      variables: {},
    };

    const response = await axios({
      url: this.subgraphEndpoint,
      method: 'post',
      headers,
      data: graphqlQuery,
    });

    return response.data.data;
  }
}
