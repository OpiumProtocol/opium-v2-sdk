import "reflect-metadata";
import { omit } from "lodash";
import { Contract, CallOverrides } from "@ethersproject/contracts";
import { BigNumber, ContractTransaction, Signer } from "ethers";
import { Core, IERC20 } from "../types/typechain";
import { TDerivative } from "../types/index";
import { computeDerivativeMargin } from "../utils/financial";
import { struct } from "../utils/misc";
import { getDerivativeHash } from "../utils/financial";
import { TProtocolAddresses, TProtocolParameters } from "../types/contracts";
import { ContractService } from "../sdk";
import IERC20Abi from "../abi/IERC20.json";

export class CoreContract {
  private _coreService: ContractService<Core>;
  private _core: Core;

  constructor(_coreService: ContractService<Core>) {
    this._coreService = _coreService;
    this._core = _coreService.contract;
  }

  public async create(
    _derivative: TDerivative,
    _amount: BigNumber,
    _positionsOwners: [string, string],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    const tokenSpenderAddress = await this._core
      .connect(_account)
      .getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi.abi,
        this._coreService.getProvider()
      )
    );
    await token
      .connect(_account)
      .approve(
        tokenSpenderAddress.tokenSpender,
        computeDerivativeMargin(_derivative.margin, _amount)
      );
    return this._core
      .connect(_account)
      .create(_derivative, _amount, _positionsOwners);
  }
  public async createAndMint(
    _derivative: TDerivative,
    _amount: BigNumber,
    _positionsOwners: [string, string],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    const tokenSpenderAddress = await this._core
      .connect(_account)
      .getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi.abi,
        this._coreService.getProvider()
      )
    );
    await token
      .connect(_account)
      .approve(
        tokenSpenderAddress.tokenSpender,
        computeDerivativeMargin(_derivative.margin, _amount)
      );
    return this._core
      .connect(_account)
      .createAndMint(_derivative, _amount, _positionsOwners, _overrides);
  }
  public async mint(
    _amount: BigNumber,
    _positionsAddresses: [string, string],
    _positionsOwners: [string, string],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core
      .connect(_account)
      .mint(_amount, _positionsAddresses, _positionsOwners, _overrides);
  }
  public async redeem(
    _amount: BigNumber,
    _positionsAddresses: [string, string],
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["redeem(address[2],uint256)"](
      _positionsAddresses,
      _amount,
      _overrides
    );
  }
  public async redeemMany(
    _amounts: BigNumber[],
    _positionsAddresses: [string, string][],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["redeem(address[2][],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
  }
  public async executeOne(
    _amount: BigNumber,
    _positionAddress: string,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["execute(address,uint256)"](
      _positionAddress,
      _amount,
      _overrides
    );
  }
  public async executeOneWithAddress(
    _positionOwner: string,
    _amount: BigNumber,
    _positionAddress: string,
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["execute(address,address,uint256)"](
      _positionOwner,
      _positionAddress,
      _amount,
      _overrides
    );
  }
  public async executeMany(
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["execute(address[],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
  }
  public async executeManyWithAddress(
    _positionOwner: string,
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["execute(address,address[],uint256[])"](
      _positionOwner,
      _positionsAddresses,
      _amounts,
      _overrides
    );
  }
  public async cancelOne(
    _positionAddress: string,
    _amount: BigNumber,
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["cancel(address,uint256)"](
      _positionAddress,
      _amount,
      _overrides
    );
  }
  public async cancelMany(
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _account: Signer,
    _overrides: CallOverrides = {}
  ): Promise<ContractTransaction> {
    return this._core["cancel(address[],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
  }

  // getters

  public async isDerivativeCancelledByDerivative(
    _derivative: TDerivative
  ): Promise<boolean> {
    const derivativeHash = getDerivativeHash(_derivative);
    return this._isDerivativeCancelled(derivativeHash);
  }

  public async isDerivativeCancelledByDerivativeHash(
    _derivativeHash: string
  ): Promise<boolean> {
    return this._isDerivativeCancelled(_derivativeHash);
  }

  public async getDerivativePayoutsByDerivative(
    _derivative: TDerivative
  ): Promise<[BigNumber, BigNumber]> {
    const derivativeHash = getDerivativeHash(_derivative);
    return this._getDerivativePayouts(derivativeHash);
  }

  public async getDerivativePayoutsByDerivativeHash(
    _derivativeHash: string
  ): Promise<[BigNumber, BigNumber]> {
    return this._getDerivativePayouts(_derivativeHash);
  }

  public async getReservesVaultBalance(
    _reseveRecipient: string,
    _tokenAddress: string
  ): Promise<BigNumber> {
    return this._core.getReservesVaultBalance(_reseveRecipient, _tokenAddress);
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    return struct(
      omit(await this._core.getProtocolAddresses(), "__gapOne", "__gapTwo")
    );
  }

  public async getProtocolParametersArgs(): Promise<TProtocolParameters> {
    return struct(
      omit(
        await this._core.getProtocolParametersArgs(),
        "__gapOne",
        "__gapTwo",
        "__gapThree",
        "__gapFour"
      )
    );
  }

  private async _getDerivativePayouts(
    _derivativeHash: string
  ): Promise<[BigNumber, BigNumber]> {
    return this._core.getDerivativePayouts(_derivativeHash);
  }

  private async _isDerivativeCancelled(
    _derivativeHash: string
  ): Promise<boolean> {
    return this._core.isDerivativeCancelled(_derivativeHash);
  }
}
