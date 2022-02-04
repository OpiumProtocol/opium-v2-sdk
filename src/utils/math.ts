import { ethers, BigNumber, BigNumberish } from "ethers";

export const toBN = (value: string): BigNumber => {
  return ethers.utils.parseEther(value);
};

export const fromBN = (value: BigNumber): string => {
  return ethers.utils.formatEther(value);
};

export const cast = (x: BigNumberish): BigNumber => {
  return BigNumber.from(x);
};
