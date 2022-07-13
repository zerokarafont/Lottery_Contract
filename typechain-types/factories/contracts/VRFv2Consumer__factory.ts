/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  VRFv2Consumer,
  VRFv2ConsumerInterface,
} from "../../contracts/VRFv2Consumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_randomValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_requestId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052600180546001600160a01b031916736168499c0cffcacd319c818142124b7a15e857ab1790557fd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc6002556003805466010003000186a06001600160501b031990911617905534801561007557600080fd5b50604051610522380380610522833981016040819052610094916100f6565b6001546001600160601b0319606082901b1660805260008054600680546001600160a01b031916331790556001600160401b03909316600160a01b026001600160e01b03199093166001600160a01b0390921691909117919091179055610126565b60006020828403121561010857600080fd5b81516001600160401b038116811461011f57600080fd5b9392505050565b60805160601c6103d861014a6000396000818160d4015261011601526103d86000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80631fe543e31461005c5780634f18bb0714610071578063e0c862891461008d578063e397824014610095578063e89e106a146100c0575b600080fd5b61006f61006a366004610283565b6100c9565b005b61007a60045481565b6040519081526020015b60405180910390f35b61006f610155565b6006546100a8906001600160a01b031681565b6040516001600160a01b039091168152602001610084565b61007a60055481565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146101475760405163073e64fd60e21b81523360048201526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016602482015260440160405180910390fd5b610151828261023b565b5050565b6006546001600160a01b0316331461016c57600080fd5b6000546002546003546040516305d3b1d360e41b81526004810192909252600160a01b830467ffffffffffffffff166024830152640100000000810461ffff16604483015263ffffffff808216606484015266010000000000009091041660848201526001600160a01b0390911690635d3b1d309060a401602060405180830381600087803b1580156101fe57600080fd5b505af1158015610212573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610236919061026a565b600555565b6127108160008151811061025157610251610376565b60200260200101516102639190610354565b6004555050565b60006020828403121561027c57600080fd5b5051919050565b6000806040838503121561029657600080fd5b8235915060208084013567ffffffffffffffff808211156102b657600080fd5b818601915086601f8301126102ca57600080fd5b8135818111156102dc576102dc61038c565b8060051b604051601f19603f830116810181811085821117156103015761030161038c565b604052828152858101935084860182860187018b101561032057600080fd5b600095505b83861015610343578035855260019590950194938601938601610325565b508096505050505050509250929050565b60008261037157634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220999645e661184d1bdf3389d92c19cc9783e5c5ae683d0bab635e9f0df1b6faf164736f6c63430008060033";

type VRFv2ConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VRFv2ConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VRFv2Consumer__factory extends ContractFactory {
  constructor(...args: VRFv2ConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    subscriptionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VRFv2Consumer> {
    return super.deploy(
      subscriptionId,
      overrides || {}
    ) as Promise<VRFv2Consumer>;
  }
  override getDeployTransaction(
    subscriptionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(subscriptionId, overrides || {});
  }
  override attach(address: string): VRFv2Consumer {
    return super.attach(address) as VRFv2Consumer;
  }
  override connect(signer: Signer): VRFv2Consumer__factory {
    return super.connect(signer) as VRFv2Consumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VRFv2ConsumerInterface {
    return new utils.Interface(_abi) as VRFv2ConsumerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VRFv2Consumer {
    return new Contract(address, _abi, signerOrProvider) as VRFv2Consumer;
  }
}