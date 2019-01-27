/*
 The following code is a part of the smart contract patterns library:
   http://www.github.com/blockchaindev/smart-contract-patterns
*/
pragma solidity ^0.5.0;

import "./owned.sol";

contract circuit_breaker is owned {
  constructor() public {
    stopped = false;
  }
  function toggle_active() only_owner public {
      stopped = !stopped;
  }
  modifier stop_if_emergency() {
    require(!stopped); _;
  }
  modifier emergency_only() {
    require(stopped); _;
  }
  bool stopped;
}