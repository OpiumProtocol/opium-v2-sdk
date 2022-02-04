import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace LibDerivative {
    type DerivativeStruct = {
        margin: BigNumberish;
        endTime: BigNumberish;
        params: BigNumberish[];
        oracleId: string;
        token: string;
        syntheticId: string;
    };
    type DerivativeStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber[],
        string,
        string,
        string
    ] & {
        margin: BigNumber;
        endTime: BigNumber;
        params: BigNumber[];
        oracleId: string;
        token: string;
        syntheticId: string;
    };
}
export declare namespace SyntheticAggregator {
    type SyntheticCacheStruct = {
        buyerMargin: BigNumberish;
        sellerMargin: BigNumberish;
        authorCommission: BigNumberish;
        authorAddress: string;
        init: boolean;
    };
    type SyntheticCacheStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        boolean
    ] & {
        buyerMargin: BigNumber;
        sellerMargin: BigNumber;
        authorCommission: BigNumber;
        authorAddress: string;
        init: boolean;
    };
}
export interface SyntheticAggregatorInterface extends utils.Interface {
    contractName: "SyntheticAggregator";
    functions: {
        "getMargin(bytes32,(uint256,uint256,uint256[],address,address,address))": FunctionFragment;
        "getRegistry()": FunctionFragment;
        "getSyntheticCache(bytes32,(uint256,uint256,uint256[],address,address,address))": FunctionFragment;
        "initialize(address)": FunctionFragment;
        "setRegistry(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getMargin", values: [BytesLike, LibDerivative.DerivativeStruct]): string;
    encodeFunctionData(functionFragment: "getRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "getSyntheticCache", values: [BytesLike, LibDerivative.DerivativeStruct]): string;
    encodeFunctionData(functionFragment: "initialize", values: [string]): string;
    encodeFunctionData(functionFragment: "setRegistry", values: [string]): string;
    decodeFunctionResult(functionFragment: "getMargin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSyntheticCache", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRegistry", data: BytesLike): Result;
    events: {
        "LogRegistryChanged(address,address)": EventFragment;
        "LogSyntheticInit(tuple,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "LogRegistryChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogSyntheticInit"): EventFragment;
}
export declare type LogRegistryChangedEvent = TypedEvent<[
    string,
    string
], {
    _changer: string;
    _newRegistryAddress: string;
}>;
export declare type LogRegistryChangedEventFilter = TypedEventFilter<LogRegistryChangedEvent>;
export declare type LogSyntheticInitEvent = TypedEvent<[
    LibDerivative.DerivativeStructOutput,
    string
], {
    derivative: LibDerivative.DerivativeStructOutput;
    derivativeHash: string;
}>;
export declare type LogSyntheticInitEventFilter = TypedEventFilter<LogSyntheticInitEvent>;
export interface SyntheticAggregator extends BaseContract {
    contractName: "SyntheticAggregator";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SyntheticAggregatorInterface;
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
        getMargin(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getRegistry(overrides?: CallOverrides): Promise<[string]>;
        getSyntheticCache(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        initialize(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    getMargin(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getRegistry(overrides?: CallOverrides): Promise<string>;
    getSyntheticCache(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    initialize(_registry: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setRegistry(_registry: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getMargin(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            buyerMargin: BigNumber;
            sellerMargin: BigNumber;
        }>;
        getRegistry(overrides?: CallOverrides): Promise<string>;
        getSyntheticCache(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: CallOverrides): Promise<SyntheticAggregator.SyntheticCacheStructOutput>;
        initialize(_registry: string, overrides?: CallOverrides): Promise<void>;
        setRegistry(_registry: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "LogRegistryChanged(address,address)"(_changer?: string | null, _newRegistryAddress?: string | null): LogRegistryChangedEventFilter;
        LogRegistryChanged(_changer?: string | null, _newRegistryAddress?: string | null): LogRegistryChangedEventFilter;
        "LogSyntheticInit(tuple,bytes32)"(derivative?: LibDerivative.DerivativeStruct | null, derivativeHash?: BytesLike | null): LogSyntheticInitEventFilter;
        LogSyntheticInit(derivative?: LibDerivative.DerivativeStruct | null, derivativeHash?: BytesLike | null): LogSyntheticInitEventFilter;
    };
    estimateGas: {
        getMargin(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getRegistry(overrides?: CallOverrides): Promise<BigNumber>;
        getSyntheticCache(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        initialize(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getMargin(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSyntheticCache(_derivativeHash: BytesLike, _derivative: LibDerivative.DerivativeStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        initialize(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setRegistry(_registry: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
