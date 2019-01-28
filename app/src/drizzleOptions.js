import Bounty from "./contracts/Bounty.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [],
  events: {
    Bounty: ["LogNewBounty", "LogNewOffer", "LogFulfilled", "LogPayedReward"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
