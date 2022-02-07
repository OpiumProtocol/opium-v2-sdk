import { omit } from "lodash";
import {
  Contract,
  CallOverrides,
  ContractReceipt,
} from "@ethersproject/contracts";
import { BigNumberish } from "ethers";
import { Core, IERC20 } from "../../types/typechain";
import { TDerivative, TAddress } from "../../types/index";
import { mulDiv } from "../../utils/financial";
import { struct } from "../../utils/misc";
import { getDerivativeHash } from "../../utils/financial";
import { TProtocolAddresses, TProtocolParameters } from "../../types/contracts";
import { ContractService } from "../../sdk";
import { IDerivativeLogic } from "../../types/typechain/IDerivativeLogic";
import IERC20Abi from "../../abi/IERC20.json";
import IDerivativeLogicAbi from "../../abi/IDerivativeLogic.json";

export class CoreContract {
  private _coreService: ContractService<Core>;

  constructor(_coreService: ContractService<Core>) {
    this._coreService = _coreService;
  }

  // ******** public methods ********

  public async create(
    _derivative: TDerivative,
    _amount: BigNumberish,
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tokenSpenderAddress =
      await this._coreService.contract.getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi,
        this._coreService.getProvider()
      )
    );

    const requiredMargin = await this._computeDerivativeMargin(
      _derivative,
      _amount
    );
    await token
      .connect(signer)
      .approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this._coreService.contract
      .connect(signer)
      .create(_derivative, _amount, _positionsOwners);
    return tx.wait();
  }
  public async createAndMint(
    _derivative: TDerivative,
    _amount: BigNumberish,
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tokenSpenderAddress =
      await this._coreService.contract.getProtocolAddresses();
    const token = <IERC20>(
      new Contract(
        _derivative.token,
        IERC20Abi,
        this._coreService.getProvider()
      )
    );
    const requiredMargin = await this._computeDerivativeMargin(
      _derivative,
      _amount
    );
    await token
      .connect(signer)
      .approve(tokenSpenderAddress.tokenSpender, requiredMargin);
    const tx = await this._coreService.contract
      .connect(signer)
      .createAndMint(_derivative, _amount, _positionsOwners, _overrides);
    return tx.wait();
  }

  public async mint(
    _amount: BigNumberish,
    _positionsAddresses: [TAddress, TAddress],
    _positionsOwners: [TAddress, TAddress],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    // TODO: improve (it does not include the ERC20 approval)
    const tx = await this._coreService.contract
      .connect(signer)
      .mint(_amount, _positionsAddresses, _positionsOwners, _overrides);
    return tx.wait();
  }

  public async redeem(
    _amount: BigNumberish,
    _positionsAddresses: [TAddress, TAddress],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["redeem(address[2],uint256)"](_positionsAddresses, _amount, _overrides);
    return tx.wait();
  }

  public async redeemMany(
    _amounts: BigNumberish[],
    _positionsAddresses: [TAddress, TAddress][],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["redeem(address[2][],uint256[])"](
        _positionsAddresses,
        _amounts,
        _overrides
      );
    return tx.wait();
  }

  public async executeOne(
    _amount: BigNumberish,
    _positionAddress: string,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["execute(address,uint256)"](_positionAddress, _amount, _overrides);
    return tx.wait();
  }
  public async executeOneWithAddress(
    _positionOwner: string,
    _amount: BigNumberish,
    _positionAddress: string,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const tx = await this._coreService.contract[
      "execute(address,address,uint256)"
    ](_positionOwner, _positionAddress, _amount, _overrides);
    return tx.wait();
  }

  public async executeMany(
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["execute(address[],uint256[])"](
        _positionsAddresses,
        _amounts,
        _overrides
      );
    return tx.wait();
  }

  public async executeManyWithAddress(
    _positionOwner: string,
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["execute(address,address[],uint256[])"](
        _positionOwner,
        _positionsAddresses,
        _amounts,
        _overrides
      );
    return tx.wait();
  }

  public async cancelOne(
    _positionAddress: string,
    _amount: BigNumberish,
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract
      .connect(signer)
      ["cancel(address,uint256)"](_positionAddress, _amount, _overrides);
    return tx.wait();
  }

  public async cancelMany(
    _amounts: BigNumberish[],
    _positionsAddresses: string[],
    _overrides: CallOverrides = {}
  ): Promise<ContractReceipt> {
    const signer = (await this._coreService.getProvider()).getSigner();
    const tx = await this._coreService.contract.connect(signer)["cancel(address[],uint256[])"](
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
  ): Promise<[BigNumberish, BigNumberish]> {
    const derivativeHash = getDerivativeHash(_derivative);
    return this._getDerivativePayouts(derivativeHash);
  }

  public async getDerivativePayoutsByDerivativeHash(
    _derivativeHash: string
  ): Promise<[BigNumberish, BigNumberish]> {
    return this._getDerivativePayouts(_derivativeHash);
  }

  public async getReservesVaultBalance(
    _reseveRecipient: string,
    _tokenAddress: string
  ): Promise<BigNumberish> {
    return this._coreService.contract.getReservesVaultBalance(
      _reseveRecipient,
      _tokenAddress
    );
  }

  public async getProtocolAddresses(): Promise<TProtocolAddresses> {
    return struct(
      omit(
        await this._coreService.contract.getProtocolAddresses(),
        "__gapOne",
        "__gapTwo"
      )
    );
  }

  public async getProtocolParametersArgs(): Promise<TProtocolParameters> {
    return struct(
      omit(
        await this._coreService.contract.getProtocolParametersArgs(),
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
    _amount: BigNumberish
  ) {
    return this._computeDerivativeMargin(_derivative, _amount);
  }

  // ******** private methods ********

  private async _getDerivativePayouts(
    _derivativeHash: string
  ): Promise<[BigNumberish, BigNumberish]> {
    return this._coreService.contract.getDerivativePayouts(_derivativeHash);
  }

  private async _isDerivativeCancelled(
    _derivativeHash: string
  ): Promise<boolean> {
    return this._coreService.contract.isDerivativeCancelled(_derivativeHash);
  }

  private async _computeDerivativeMargin(
    _derivative: TDerivative,
    _amount: BigNumberish
  ): Promise<BigNumberish> {
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
