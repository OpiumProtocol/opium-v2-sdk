import { JsonRpcProvider } from "@ethersproject/providers";

export const isProvider = (
  arg: JsonRpcProvider | undefined
): arg is JsonRpcProvider => {
  return true;
};
