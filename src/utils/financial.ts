import { utils, BigNumberish, BigNumber } from 'ethers';
import { cast, toBN } from './math';
import { zeroAddress } from '../constants';
import { TDerivative } from '../types';

export const mulDiv = (
  amountX: BigNumberish,
  amountY: BigNumberish,
  scalingFactor: BigNumberish = utils.parseUnits('1', 18),
): BigNumber => {
  const result = cast(amountX).mul(cast(amountY));
  return result.div(scalingFactor);
};

export const getDerivativeHash = (derivative: TDerivative): string =>
  utils.solidityKeccak256(
    ['uint256', 'uint256', 'uint256[]', 'address', 'address', 'address'],
    [
      derivative.margin,
      derivative.endTime,
      derivative.params,
      derivative.oracleId,
      derivative.token,
      derivative.syntheticId,
    ],
  );

export const derivativeFactory = (derivative: Partial<TDerivative>): TDerivative => {
  const def = {
    margin: toBN('0'),
    endTime: 0,
    params: [],
    oracleId: zeroAddress,
    token: zeroAddress,
    syntheticId: zeroAddress,
  };

  return {
    ...def,
    ...derivative,
  };
};
