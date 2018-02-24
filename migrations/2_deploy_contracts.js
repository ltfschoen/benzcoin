var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./BenzCoin.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  if (network == "live") {
    // TODO
  }
  console.log("Deploying Contract on Network: ", network);
  console.log("Deploying Contract on using Accounts: ", accounts);
};
