/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface StringsInterface extends utils.Interface {
  functions: {
    "equals(string,string)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "equals"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "equals",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "equals", data: BytesLike): Result;

  events: {};
}

export interface Strings extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StringsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    equals(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  equals(
    a: PromiseOrValue<string>,
    b: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    equals(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    equals(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    equals(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
