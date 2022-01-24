import { utils, BigNumber } from "ethers";
import { toBN } from ".";
import { zeroAddress } from "../constants";
import { TDerivative } from "../types";

export const computeDerivativeMargin = (
  margin: BigNumber,
  amount: BigNumber
): BigNumber => {
  const result = margin.mul(amount);
  return result.div(utils.parseUnits("1", 18));
};

export const getDerivativeHash = (derivative: TDerivative): string => {
  return utils.solidityKeccak256(
    ["uint256", "uint256", "uint256[]", "address", "address", "address"],
    [
      derivative.margin,
      derivative.endTime,
      derivative.params,
      derivative.oracleId,
      derivative.token,
      derivative.syntheticId,
    ]
  );
};

export const derivativeFactory = (
  derivative: Partial<TDerivative>
): TDerivative => {
  const def = {
    margin: toBN("0"),
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
