// theirs
import { BigNumberish, BigNumber, providers } from 'ethers';
// services
import { ContractService } from './contractService';
import { TAddress, TDerivative } from '../../types';
import { IDerivativeLogic, ILiveFeedOracleId } from '../../types/typechain';
// types
import { IDerivativeLogicAbi, ILiveFeedOracleIdABI } from '../../abi';

export class DerivativeLensFactory {
  private readonly provider$: providers.JsonRpcProvider;

  constructor(_provider: providers.JsonRpcProvider) {
    this.provider$ = _provider;
  }

  public async getOracleIdResult(_oracleIdAddress: TAddress): Promise<BigNumberish> {
    const oracleId = new ContractService<ILiveFeedOracleId>(_oracleIdAddress, ILiveFeedOracleIdABI, this.provider$);
    // TODO: to be changed once the ILiveFeedOracleId.getResult() will be of `view` type
    return oracleId.contract.callStatic.getResult();
  }

  public async getSyntheticIdExecutionPayout(
    _derivative: TDerivative,
    _strikeResult: BigNumberish,
  ): Promise<[BigNumber, BigNumber]> {
    const syntheticId = new ContractService<IDerivativeLogic>(
      _derivative.syntheticId,
      IDerivativeLogicAbi,
      this.provider$,
    );
    return syntheticId.contract.getExecutionPayout(_derivative, _strikeResult);
  }
}
