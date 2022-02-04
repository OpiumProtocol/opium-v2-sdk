import { omit } from "lodash";
import {
  Contract,
  CallOverrides,
  ContractReceipt,
} from "@ethersproject/contracts";
import { BigNumber } from "ethers";
import { Core, IERC20 } from "../types/typechain";
import { TDerivative } from "../types/index";
import { mulDiv } from "../utils/financial";
import { struct } from "../utils/misc";
import { getDerivativeHash } from "../utils/financial";
import { TProtocolAddresses, TProtocolParameters } from "../types/contracts";
import { ContractService } from "../sdk";
import { IDerivativeLogic } from "../types/typechain/IDerivativeLogic";
import IERC20Abi from "../abi/IERC20.json";
import IDerivativeLogicAbi from "../abi/IDerivativeLogic.json";

export class CoreContract {
  private _coreService: ContractService<Core>;
  private _core: Core;

  constructor(_coreService: ContractService<Core>) {
    this._coreService = _coreService;
    this._core = _coreService.contract;
  }

  // ******** public methods ********

  public async create(
    _derivative: TDerivative,
    _amount: BigNumber,
    _positionsOwners: [string, string],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tokenSpenderAddress = await this._core.getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi.abi,
        this._coreService.getProvider()
      )
    );

    const requiredMargin = await this._computeDerivativeMargin(
      _derivative,
      _amount
    );
    await token.approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this._core.create(_derivative, _amount, _positionsOwners);
    return tx.wait();
  }
  public async createAndMint(
    _derivative: TDerivative,
    _amount: BigNumber,
    _positionsOwners: [string, string],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tokenSpenderAddress = await this._core.getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi.abi,
        this._coreService.getProvider()
      )
    );
    const SyntheticIdContract = <IDerivativeLogic>(
      new Contract(
        _derivative.syntheticId,
        IDerivativeLogicAbi,
        this._coreService.getProvider()
      )
    );
    const requiredMargin = await this._computeDerivativeMargin(
      _derivative,
      _amount
    );
    await token.approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this._core.createAndMint(
      _derivative,
      _amount,
      _positionsOwners,
      _overrides
    );
    return tx.wait();
  }
  public async mint(
    _amount: BigNumber,
    _positionsAddresses: [string, string],
    _positionsOwners: [string, string],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    // TODO: improve (it does not include the ERC20 approval)
    const tx = await this._core.mint(
      _amount,
      _positionsAddresses,
      _positionsOwners,
      _overrides
    );
    return tx.wait();
  }
  public async redeem(
    _amount: BigNumber,
    _positionsAddresses: [string, string],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["redeem(address[2],uint256)"](
      _positionsAddresses,
      _amount,
      _overrides
    );
    return tx.wait();
  }
  public async redeemMany(
    _amounts: BigNumber[],
    _positionsAddresses: [string, string][],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["redeem(address[2][],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
    return tx.wait();
  }
  public async executeOne(
    _amount: BigNumber,
    _positionAddress: string,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["execute(address,uint256)"](
      _positionAddress,
      _amount,
      _overrides
    );
    return tx.wait();
  }
  public async executeOneWithAddress(
    _positionOwner: string,
    _amount: BigNumber,
    _positionAddress: string,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["execute(address,address,uint256)"](
      _positionOwner,
      _positionAddress,
      _amount,
      _overrides
    );
    return tx.wait();
  }
  public async executeMany(
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["execute(address[],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
    return tx.wait();
  }
  public async executeManyWithAddress(
    _positionOwner: string,
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["execute(address,address[],uint256[])"](
      _positionOwner,
      _positionsAddresses,
      _amounts,
      _overrides
    );
    return tx.wait();
  }
  public async cancelOne(
    _positionAddress: string,
    _amount: BigNumber,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["cancel(address,uint256)"](
      _positionAddress,
      _amount,
      _overrides
    );
    return tx.wait();
  }
  public async cancelMany(
    _amounts: BigNumber[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._core["cancel(address[],uint256[])"](
      _positionsAddresses,
      _amounts,
      _overrides
    );
    return tx.wait();
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

  // helpers
  public async computeDerivativeMargin(
    _derivative: TDerivative,
    _amount: BigNumber
  ) {
    return this._computeDerivativeMargin(_derivative, _amount);
  }

  // ******** private methods ********

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

  private async _computeDerivativeMargin(
    _derivative: TDerivative,
    _amount: BigNumber
  ): Promise<BigNumber> {
    const syntheticId = <IDerivativeLogic>(
      new Contract(
        _derivative.syntheticId,
        IDerivativeLogicAbi,
        this._coreService.getProvider()
      )
    );
    const [buyerMargin, sellerMargin] = await syntheticId.getMargin(
      _derivative
    );
    return mulDiv(buyerMargin.add(sellerMargin), _amount);
  }
}
