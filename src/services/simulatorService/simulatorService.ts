// services
import { ContractService } from '../factoryService/contractService';
// types
import { TDerivative, TPositionsAddressesOutput } from '../../types';
import { OnChainPositionsLens } from '../../types/typechain/OnChainPositionsLens';
import { OnChainPositionsLensABI } from '../../abi';
// utils
import { getDerivativeHash } from '../../utils';
import { SDKContext } from '../../common/sdkContext';

export class SimulatorService {
  private readonly sdkCtx$: SDKContext;

  constructor(_sdkCtx: SDKContext) {
    this.sdkCtx$ = _sdkCtx;
  }

  public static computeDerivativeHash(_derivative: TDerivative): string {
    return getDerivativeHash(_derivative);
  }

  // TODO: add static methods that allow to compute the positions' addresses locally via ether.js utils

  public async computePositionsAddressesByDerivative(_derivative: TDerivative): Promise<TPositionsAddressesOutput> {
    // TODO: remove hardcoded address
    const onChainPositionsLens = new ContractService<OnChainPositionsLens>(
      this.sdkCtx$,
      this.sdkCtx$.getNetworkConfig().onChainPositionLensAddress,
      OnChainPositionsLensABI,
    );

    const [longPositionAddress, shortPositionAddress] =
      await onChainPositionsLens.contract.predictPositionsAddressesByDerivative(_derivative);

    return {
      longPositionAddress,
      shortPositionAddress,
    };
  }

  public async computePositionsAddressesByDerivativeHash(_derivativeHash: string): Promise<TPositionsAddressesOutput> {
    // TODO: remove hardcoded address
    const onChainPositionsLens = new ContractService<OnChainPositionsLens>(
      this.sdkCtx$,
      this.sdkCtx$.getNetworkConfig().onChainPositionLensAddress,
      OnChainPositionsLensABI,
    );

    const [longPositionAddress, shortPositionAddress] =
      await onChainPositionsLens.contract.predictPositionsAddressesByDerivativeHash(_derivativeHash);

    return {
      longPositionAddress,
      shortPositionAddress,
    };
  }
}
