pragma solidity ^0.5.0;

contract Bounty {
  address owner;
  uint amount;
  string description;


  constructor(string memory _description) public payable {
    require(msg.value >= 0, "Amount for bounty cannot be set to negative number");
    
    owner = msg.sender;
    amount = msg.value;
    description = _description;  
  }
}
