/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  OnChainPositionsLens,
  OnChainPositionsLensInterface,
} from "../OnChainPositionsLens";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_derivativeHash",
        type: "bytes32",
      },
    ],
    name: "getDerivativePositionsData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "positionAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "margin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256",
              },
              {
                internalType: "uint256[]",
                name: "params",
                type: "uint256[]",
              },
              {
                internalType: "address",
                name: "oracleId",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "address",
                name: "syntheticId",
                type: "address",
              },
            ],
            internalType: "struct LibDerivative.Derivative",
            name: "derivative",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        internalType: "struct PositionData[2]",
        name: "",
        type: "tuple[2]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_derivativesHash",
        type: "bytes32[]",
      },
    ],
    name: "getDerivativesPositionsData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "positionAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "margin",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256",
              },
              {
                internalType: "uint256[]",
                name: "params",
                type: "uint256[]",
              },
              {
                internalType: "address",
                name: "oracleId",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "address",
                name: "syntheticId",
                type: "address",
              },
            ],
            internalType: "struct LibDerivative.Derivative",
            name: "derivative",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        internalType: "struct PositionData[2][]",
        name: "",
        type: "tuple[2][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "margin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "params",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "oracleId",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "syntheticId",
            type: "address",
          },
        ],
        internalType: "struct LibDerivative.Derivative",
        name: "_derivative",
        type: "tuple",
      },
    ],
    name: "predictPositionsAddressesByDerivative",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_derivativeHash",
        type: "bytes32",
      },
    ],
    name: "predictPositionsAddressesByDerivativeHash",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "contract IRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class OnChainPositionsLens__factory {
  static readonly abi = _abi;
  static createInterface(): OnChainPositionsLensInterface {
    return new utils.Interface(_abi) as OnChainPositionsLensInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OnChainPositionsLens {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OnChainPositionsLens;
  }
}
