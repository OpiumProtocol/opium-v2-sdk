import { BigNumberish, BigNumber } from 'ethers';
import { TDerivative } from '../types';
export declare const mulDiv: (amountX: BigNumberish, amountY: BigNumberish, scalingFactor?: BigNumberish) => BigNumber;
export declare const getDerivativeHash: (derivative: TDerivative) => string;
export declare const derivativeFactory: (derivative: Partial<TDerivative>) => TDerivative;
