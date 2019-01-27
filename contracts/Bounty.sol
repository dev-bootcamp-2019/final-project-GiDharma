pragma solidity ^0.5.0;

import "./circuit_breaker.sol";

contract Bounty is circuit_breaker {
  
  uint amount;
  string description;
  address payable chosenAddress;
  mapping ( address => string ) offers;

  modifier only_chosen_offer() {
    require(chosenAddress != address(0) && msg.sender == chosenAddress, "Sender is not chosen address");
    _;
  }

  event LogNewBounty(uint, string);
  event LogNewOffer(address, string);
  event LogFulfilled(address, string);
  event LogPayedReward();

  constructor(string memory _description) circuit_breaker() public payable {
    require(msg.value >= 0, "Amount for bounty cannot be set to negative number");
    amount = msg.value;
    description = _description;
    emit LogNewBounty(amount, description);
  }

  function offer(string memory _description) public returns(bool) {
    bytes memory alreadyExistantOffer = bytes(offers[msg.sender]);
    require(alreadyExistantOffer.length == 0, "Offer already exists");

    bytes memory _bytesDescription = bytes(_description);
    require(_bytesDescription.length != 0, "Description");
    
    offers[msg.sender] = _description;
    return true;
  }

  function fulfill(address payable chosenOffer) external only_owner returns(bool) {
    bytes memory offerExists = bytes(offers[chosenOffer]);
    require(offerExists.length != 0, "Chosen offer does not exist");
    chosenAddress = chosenOffer;
    emit LogFulfilled(chosenOffer, offers[chosenOffer]);
    return true;
  }

  function withdrawReward() external stop_if_emergency only_chosen_offer {
    msg.sender.transfer(amount);
    emit LogPayedReward();
  }

  function() external payable {
    revert();
  }

}
