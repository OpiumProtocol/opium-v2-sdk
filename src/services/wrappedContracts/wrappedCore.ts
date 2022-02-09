// theirs
import { omit } from 'lodash';
import { BigNumberish, Contract, CallOverrides, ContractReceipt } from 'ethers';
// services
import { ContractService } from '../factoryService/contractService';
// types
import { TProtocolAddresses, TProtocolParameters } from '../../types/contracts';
import { TDerivative, TAddress } from '../../types/index';
import { Core, IERC20 } from '../../types/typechain';
import { IDerivativeLogic } from '../../types/typechain/IDerivativeLogic';
import { IERC20Abi, IDerivativeLogicAbi } from '../../abi';
// utils
import { mulDiv, getDerivativeHash } from '../../utils/financial';
import { struct } from '../../utils/misc';

export class WrappedCore {
  private coreService$: ContractService<Core>;

  constructor(_coreService: ContractService<Core>) {
    this.coreService$ = _coreService;
  }

  // ******** public methods ********

  public async create(
    _derivative: TDerivative,
    _amount: BigNumberish,
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tokenSpenderAddress = await this.coreService$.contract.getProtocolAddresses();
    const token = <IERC20>new Contract(_derivative.token, IERC20Abi, this.coreService$.getProvider());

    const requiredMargin = await this.computeDerivativeMargin$(_derivative, _amount);
    await token.connect(signer).approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this.coreService$.contract
      .connect(signer)
      .create(_derivative, _amount, _positionsOwners, _overrides);
    return tx.wait();
  }

  public async createAndMint(
    _derivative: TDerivative,
    _amount: BigNumberish,
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tokenSpenderAddress = await this.coreService$.contract.getProtocolAddresses();
    const token = <IERC20>new Contract(_derivative.token, IERC20Abi, this.coreService$.getProvider());
    const requiredMargin = await this.computeDerivativeMargin$(_derivative, _amount);
    await token.connect(signer).approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this.coreService$.contract
      .connect(signer)
      .createAndMint(_derivative, _amount, _positionsOwners, _overrides);
    return tx.wait();
  }

  public async mint(
    _amount: BigNumberish,
    _positionsAddresses: [TAddress, TAddress],
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    // TODO: improve (it does not include the ERC20 approval)
    const tx = await this.coreService$.contract
      .connect(signer)
      .mint(_amount, _positionsAddresses, _positionsOwners, _overrides);
    return tx.wait();
  }

  public async redeem(
    _amount: BigNumberish,
    _positionsAddresses: [TAddress, TAddress],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['redeem(address[2],uint256)'](_positionsAddresses, _amount, _overrides);
    return tx.wait();
  }

  public async redeemMany(
    _amounts: BigNumberish[],
    _positionsAddresses: [TAddress, TAddress][],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['redeem(address[2][],uint256[])'](_positionsAddresses, _amounts, _overrides);
    return tx.wait();
  }

  public async executeOne(
    _amount: BigNumberish,
    _positionAddress: string,
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['execute(address,uint256)'](_positionAddress, _amount, _overrides);
    return tx.wait();
  }

  public async executeOneWithAddress(
    _positionOwner: string,
    _amount: BigNumberish,
    _positionAddress: string,
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const tx = await this.coreService$.contract['execute(address,address,uint256)'](
      _positionOwner,
      _positionAddress,
      _amount,
      _overrides,
    );
    return tx.wait();
  }

  public async executeMany(
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['execute(address[],uint256[])'](_positionsAddresses, _amounts, _overrides);
    return tx.wait();
  }

  public async executeManyWithAddress(
    _positionOwner: string,
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['execute(address,address[],uint256[])'](_positionOwner, _positionsAddresses, _amounts, _overrides);
    return tx.wait();
  }

  public async cancelOne(
    _positionAddress: string,
    _amount: BigNumberish,
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['cancel(address,uint256)'](_positionAddress, _amount, _overrides);
    return tx.wait();
  }

  public async cancelMany(
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {},
  ): Promise<ContractReceipt> {
    const signer = (await this.coreService$.getProvider()).getSigner();
    const tx = await this.coreService$.contract
      .connect(signer)
      ['cancel(address[],uint256[])'](_positionsAddresses, _amounts, _overrides);
    return tx.wait();
  }

  // getters

  public async isDerivativeCancelledByDerivative(_derivative: TDerivative): Promise<boolean> {
    const derivativeHash = getDerivativeHash(_derivative);
    return this.isDerivativeCancelled$(derivativeHash);
  }

  public async isDerivativeCancelledByDerivativeHash(_derivativeHash: string): Promise<boolean> {
    return this.isDerivativeCancelled$(_derivativeHash);
  }

  public async getDerivativePayoutsByDerivative(_derivative: TDerivative): Promise<[BigNumberish, BigNumberish]> {
    const derivativeHash = getDerivativeHash(_derivative);
    return this.getDerivativePayouts$(derivativeHash);
  }

  public async getDerivativePayoutsByDerivativeHash(_derivativeHash: string): Promise<[BigNumberish, BigNumberish]> {
    return this.getDerivativePayouts$(_derivativeHash);
  }

  public async getReservesVaultBalance(_reseveRecipient: string, _tokenAddress: string): Promise<BigNumberish> {
    return this.coreService$.contract.getReservesVaultBalance(_reseveRecipient, _tokenAddress);
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    return struct(omit(await this.coreService$.contract.getProtocolAddresses(), '__gapOne', '__gapTwo'));
  }

  public async getProtocolParametersArgs(): Promise<TProtocolParameters> {
    return struct(
      omit(
        await this.coreService$.contract.getProtocolParametersArgs(),
        '__gapOne',
        '__gapTwo',
        '__gapThree',
        '__gapFour',
      ),
    );
  }

  // helpers
  public async computeDerivativeMargin(_derivative: TDerivative, _amount: BigNumberish) {
    return this.computeDerivativeMargin$(_derivative, _amount);
  }

  // ******** private methods ********

  private async getDerivativePayouts$(_derivativeHash: string): Promise<[BigNumberish, BigNumberish]> {
    return this.coreService$.contract.getDerivativePayouts(_derivativeHash);
  }

  private async isDerivativeCancelled$(_derivativeHash: string): Promise<boolean> {
    return this.coreService$.contract.isDerivativeCancelled(_derivativeHash);
  }

  private async computeDerivativeMargin$(_derivative: TDerivative, _amount: BigNumberish): Promise<BigNumberish> {
    const syntheticId = <IDerivativeLogic>(
      new Contract(_derivative.syntheticId, IDerivativeLogicAbi, this.coreService$.getProvider())
    );
    const [buyerMargin, sellerMargin] = await syntheticId.getMargin(_derivative);
    return mulDiv(buyerMargin.add(sellerMargin), _amount);
  }
}
