import { TDerivative } from '../../types';
import { getDerivativeHash } from '../../utils';

export class SimulatorService {
  public static computeDerivativeHash(_derivative: TDerivative): string {
    return getDerivativeHash(_derivative);
  }
}
