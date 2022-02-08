// theirs
import { omit } from 'lodash';
// types
import { TProtocolAddresses, TProtocolParameters } from '../../types/contracts';
// utils
import { struct } from '../../utils/misc';
// services
import { Registry } from '../../types/typechain';
import { ContractService } from '../../sdk/contractService';

export class WrappedRegistry {
  private registryService$: ContractService<Registry>;

  constructor(_registryService: ContractService<Registry>) {
    this.registryService$ = _registryService;
  }

  public async getProtocolParameters(): Promise<TProtocolParameters> {
    return struct(
      omit(
        await this.registryService$.contract.getProtocolParameters(),
        '__gapOne',
        '__gapTwo',
        '__gapThree',
        '__gapFour',
      ),
    );
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    return struct(omit(await this.registryService$.contract.getProtocolAddresses(), '__gapOne', '__gapTwo'));
  }

  public async getCore(): Promise<string> {
    return this.registryService$.contract.getCore();
  }
}
