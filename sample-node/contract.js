// Compilation artifacts of the following contract in remix.
//
// pragma solidity 0.4.18;
// contract Demo {
//   address public owner = msg.sender;
//   uint public value = 0;
//   function increment() public { value ++; }
// }

const abi = [
  { "constant": true, "inputs": [], "name": "value", "outputs": [{ "name": "", "type": "uint256" }], "payable":false, "stateMutability": "view", "type": "function" },
  { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable":false, "stateMutability": "view", "type": "function" },
  { "constant": false, "inputs": [], "name": "increment", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
];

const bytecode = '0x6060604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600155341561005457600080fd5b61015a806100636000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f2451461005c5780638da5cb5b14610085578063d09de08a146100da575b600080fd5b341561006757600080fd5b61006f6100ef565b6040518082815260200191505060405180910390f35b341561009057600080fd5b6100986100f5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e557600080fd5b6100ed61011a565b005b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001600081548092919060010191905055505600a165627a7a723058205ce92a47fc559b4bb0755893313c865c2940e40612af7b8f306f1ec6f5d90f980029';

module.exports = { abi, bytecode };
