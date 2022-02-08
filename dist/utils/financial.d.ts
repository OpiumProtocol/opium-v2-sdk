import { BigNumberish } from 'ethers';
import { TDerivative } from '../types';
export declare const mulDiv: (amountX: BigNumberish, amountY: BigNumberish, scalingFactor?: BigNumberish) => BigNumberish;
export declare const getDerivativeHash: (derivative: TDerivative) => string;
export declare const derivativeFactory: (derivative: Partial<TDerivative>) => TDerivative;
