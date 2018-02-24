var Owned = artifacts.require("./Owned.sol");
var ConvertLib = artifacts.require("./ConvertLib.sol");
var BenzCoin = artifacts.require("./BenzCoin.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Owned);
  deployer.link(Owned, BenzCoin);
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, BenzCoin);
  deployer.deploy(BenzCoin);
  if (network == "live") {
    // TODO
  }
  console.log("Deploying Contract on Network: ", network);
  console.log("Deploying Contract on using Accounts: ", accounts);
};
