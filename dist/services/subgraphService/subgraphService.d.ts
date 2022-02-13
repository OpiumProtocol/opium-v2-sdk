import { SDKContext } from '../../common/sdkContext';
import { TBuyer, TPosition, TSeller } from '../../types/subgraph';
export declare class SubgraphService {
    private readonly sdkCtx$;
    constructor(_sdkCtx: SDKContext);
    queryPositions(): Promise<TPosition[]>;
    queryBuyers(): Promise<TBuyer[]>;
    querySellers(): Promise<TSeller[]>;
}
