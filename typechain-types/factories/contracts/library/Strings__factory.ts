/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Strings,
  StringsInterface,
} from "../../../contracts/library/Strings";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        internalType: "string",
        name: "b",
        type: "string",
      },
    ],
    name: "equals",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x61024461003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c806388d8da5f1461003a575b600080fd5b61004d610048366004610159565b610061565b604051901515815260200160405180910390f35b60008151835114610074575060006100c6565b8160405160200161008591906101bd565b60405160208183030381529060405280519060200120836040516020016100ac91906101bd565b604051602081830303815290604052805190602001201490505b92915050565b600082601f8301126100dd57600080fd5b813567ffffffffffffffff808211156100f8576100f86101f8565b604051601f8301601f19908116603f01168101908282118183101715610120576101206101f8565b8160405283815286602085880101111561013957600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561016c57600080fd5b823567ffffffffffffffff8082111561018457600080fd5b610190868387016100cc565b935060208501359150808211156101a657600080fd5b506101b3858286016100cc565b9150509250929050565b6000825160005b818110156101de57602081860181015185830152016101c4565b818111156101ed576000828501525b509190910192915050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220b2bc8ca3f77688046c0a1b8c08d4a8a81bd9c82e96db6d3b5b70bbb3b9ed0ed964736f6c63430008060033";

type StringsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StringsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Strings__factory extends ContractFactory {
  constructor(...args: StringsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Strings> {
    return super.deploy(overrides || {}) as Promise<Strings>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Strings {
    return super.attach(address) as Strings;
  }
  override connect(signer: Signer): Strings__factory {
    return super.connect(signer) as Strings__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StringsInterface {
    return new utils.Interface(_abi) as StringsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Strings {
    return new Contract(address, _abi, signerOrProvider) as Strings;
  }
}
