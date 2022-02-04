import { BigNumber } from "ethers";
import { TDerivative } from "../types";
export declare const mulDiv: (amountX: BigNumber, amountY: BigNumber, scalingFactor?: BigNumber) => BigNumber;
export declare const getDerivativeHash: (derivative: TDerivative) => string;
export declare const derivativeFactory: (derivative: Partial<TDerivative>) => TDerivative;
