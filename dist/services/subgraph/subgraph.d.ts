import { TBuyer, TPosition, TSeller } from "../../types/subgraph";
export declare class SubgraphService {
    private readonly subgraphEndpoint;
    constructor(_subgraphEndpoint: string);
    queryPositions(): Promise<TPosition[]>;
    queryBuyers(): Promise<TBuyer[]>;
    querySellers(): Promise<TSeller[]>;
}
