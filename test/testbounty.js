var Bounty = artifacts.require("./Bounty.sol");

contract('Bounty', async (accounts) => {

  const owner = accounts[0]
  const alice = accounts[1];
  const bob = accounts[2];
  const deposit = web3.utils.toWei(web3.utils.toBN(1), 'ether');
  let bounty1;
  before(async () => {
    bounty1 = await Bounty.new("asdasd", {from: owner, value: deposit});
  });
  

  it("should be created with bounty of 1 ether.", async () => {
    const ownerBalance = web3.utils.fromWei(await web3.eth.getBalance(owner), 'ether');
    const contractBalance = web3.utils.fromWei(await web3.eth.getBalance(bounty1.address), 'ether');
    assert.equal(contractBalance, 1, "contract balance is 1 ether");
  });
  it("should accept offers", async () => {
    assert(await bounty1.offer("Offer #1", {from: alice}), "accepted alice's offer");
    assert(await bounty1.offer("Offer #2", {from: bob}), "accepted bob's offer");
  });
  it("should be able to fulfill a bounty with a chosen offer", async () => {
    assert(await bounty1.fulfill(bob, {from: owner}), "bob's offer was chosen by owner");
  });
  it("should let chosen offer's owner withdraw the money", async () => {
    const bobBalanceBefore = web3.utils.fromWei(await web3.eth.getBalance(bob), 'ether');
    assert(await bounty1.withdrawReward({from: bob}), "bob withdrew bounty reward successfully");
    const bobBalanceAfter = web3.utils.fromWei(await web3.eth.getBalance(bob), 'ether');
    assert(bobBalanceBefore < bobBalanceAfter, "check that bob's balance grew")
  });
  it("should fail to transfer bounty reward when circuit breaker is toggled on", async () => {
    const bounty = await Bounty.new("asdasd", {from: owner, value: deposit})
    await bounty.offer("Offer #2", {from: bob});
    const bountyMarkedFulfilled = await bounty.fulfill(bob, {from: owner});
    assert(bountyMarkedFulfilled, "bounty marked as fulfilled");
    const bobBalanceBefore = web3.utils.fromWei(await web3.eth.getBalance(bob), 'ether');
    await bounty.toggle_active({from: owner});
    try {
      await bounty.withdrawReward({from: bob})
    } catch(error) {
      const invalidJump = error.message.search('invalid JUMP') >= 0;
      // TODO: When we contract A calls contract B, and B throws, instead
      //       of an 'invalid jump', we get an 'out of gas' error. How do
      //       we distinguish this from an actual out of gas event? (The
      //       testrpc log actually show an 'invalid jump' event.)
      const outOfGas = error.message.search('out of gas') >= 0;
      assert(
        !(invalidJump || outOfGas),
        "Expected throw, got '" + error + "' instead"
        );
    }
  });
  
});
