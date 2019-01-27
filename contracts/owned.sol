/*
 The following code is a part of the smart contract patterns library:
   http://www.github.com/blockchaindev/smart-contract-patterns
*/
pragma solidity ^0.5.0;

contract owned {
  constructor() public {
    owner = msg.sender;
  }
  modifier only_owner() {
    require(msg.sender == owner);
    _;
  }
  address owner;
}