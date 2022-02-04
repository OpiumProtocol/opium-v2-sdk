import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface RegistryManagerInterface extends utils.Interface {
    contractName: "RegistryManager";
    functions: {
        "getRegistry()": FunctionFragment;
        "setRegistry(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "setRegistry", values: [string]): string;
    decodeFunctionResult(functionFragment: "getRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRegistry", data: BytesLike): Result;
    events: {
        "LogRegistryChanged(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "LogRegistryChanged"): EventFragment;
}
export declare type LogRegistryChangedEvent = TypedEvent<[
    string,
    string
], {
    _changer: string;
    _newRegistryAddress: string;
}>;
export declare type LogRegistryChangedEventFilter = TypedEventFilter<LogRegistryChangedEvent>;
export interface RegistryManager extends BaseContract {
    contractName: "RegistryManager";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: RegistryManagerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        getRegistry(overrides?: CallOverrides): Promise<[string]>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    getRegistry(overrides?: CallOverrides): Promise<string>;
    setRegistry(_registry: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getRegistry(overrides?: CallOverrides): Promise<string>;
        setRegistry(_registry: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "LogRegistryChanged(address,address)"(_changer?: string | null, _newRegistryAddress?: string | null): LogRegistryChangedEventFilter;
        LogRegistryChanged(_changer?: string | null, _newRegistryAddress?: string | null): LogRegistryChangedEventFilter;
    };
    estimateGas: {
        getRegistry(overrides?: CallOverrides): Promise<BigNumber>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
