import { providers } from 'ethers';
import { TDerivative, TPositionsAddressesOutput } from '../../types';
export declare class SimulatorService {
    private readonly provider$;
    constructor(_provider: providers.JsonRpcProvider);
    static computeDerivativeHash(_derivative: TDerivative): string;
    computePositionsAddressesByDerivative(_derivative: TDerivative): Promise<TPositionsAddressesOutput>;
    computePositionsAddressesByDerivativeHash(_derivativeHash: string): Promise<TPositionsAddressesOutput>;
}
