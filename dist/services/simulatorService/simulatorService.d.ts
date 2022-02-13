import { TDerivative, TPositionsAddressesOutput } from '../../types';
import { SDKContext } from '../../common/sdkContext';
export declare class SimulatorService {
    private readonly sdkCtx$;
    constructor(_sdkCtx: SDKContext);
    static computeDerivativeHash(_derivative: TDerivative): string;
    computePositionsAddressesByDerivative(_derivative: TDerivative): Promise<TPositionsAddressesOutput>;
    computePositionsAddressesByDerivativeHash(_derivativeHash: string): Promise<TPositionsAddressesOutput>;
}
