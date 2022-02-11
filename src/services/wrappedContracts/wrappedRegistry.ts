// theirs
import { omit } from 'lodash';
// types
import { isErrorReasonExplicit } from '../../types/misc';
import { TProtocolAddresses, TProtocolParameters } from '../../types/contracts';
// utils
import { struct } from '../../utils/misc';
import { SDKError } from '../../common';
import { pickError } from '../../utils';
// services
import { Registry } from '../../types/typechain';
import { ContractService } from '../factoryService/contractService';

export class WrappedRegistry {
  private registryService$: ContractService<Registry>;

  constructor(_registryService: ContractService<Registry>) {
    this.registryService$ = _registryService;
  }

  public async getProtocolParameters(): Promise<TProtocolParameters> {
    try {
      return struct(
        omit(
          await this.registryService$.contract.getProtocolParameters(),
          '__gapOne',
          '__gapTwo',
          '__gapThree',
          '__gapFour',
        ),
      );
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    try {
      return struct(omit(await this.registryService$.contract.getProtocolAddresses(), '__gapOne', '__gapTwo'));
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }

  public async getCore(): Promise<string> {
    try {
      return this.registryService$.contract.getCore();
    } catch (error) {
      if (isErrorReasonExplicit(error)) {
        if (pickError(error.reason)) {
          throw new SDKError(pickError(error.reason));
        }
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error;
    }
  }
}
