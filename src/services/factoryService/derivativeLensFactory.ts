// theirs
import { BigNumberish, providers } from 'ethers';
// services
import { ContractService } from './contractService';
import { TAddress, TDerivative } from '../../types';
import { IDerivativeLogic, IOracleId } from '../../types/typechain';
// types
import { IDerivativeLogicAbi, ILiveFeedOracleIdABI } from '../../abi';

export class DerivativeLensFactory {
  private readonly provider$: providers.JsonRpcProvider;

  constructor(_provider: providers.JsonRpcProvider) {
    this.provider$ = _provider;
  }

  public async getOracleIdResult(_oracleIdAddress: TAddress): Promise<BigNumberish> {
    const oracleAggregatorId = new ContractService<IOracleId>(_oracleIdAddress, ILiveFeedOracleIdABI, this.provider$);
    return oracleAggregatorId.contract.getResult();
  }

  public async getSyntheticIdExecutionPayout(
    _derivative: TDerivative,
    _strikeResult: BigNumberish,
  ): Promise<[BigNumberish, BigNumberish]> {
    const syntheticId = new ContractService<IDerivativeLogic>(
      _derivative.syntheticId,
      IDerivativeLogicAbi,
      this.provider$,
    );
    return syntheticId.contract.getExecutionPayout(_derivative, _strikeResult);
  }
}
