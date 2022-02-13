import { ethers, BigNumber, BigNumberish } from 'ethers';

export const toBN = (value: string): BigNumber => ethers.utils.parseEther(value);

export const fromBN = (value: BigNumber): string => ethers.utils.formatEther(value);

export const cast = (x: BigNumberish): BigNumber => BigNumber.from(x);
