var BenzCoin = artifacts.require("./BenzCoin.sol");

contract('BenzCoin', function(accounts) {
  it("should put 100000000 BenzCoin in the first account", function() {
    return BenzCoin.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000000, "100000000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var benz;
    var benzCoinBalance;
    var benzCoinEthBalance;

    return BenzCoin.deployed().then(function(instance) {
      benz = instance;
      return benz.balanceOf.call(accounts[0]);
    }).then(function(outCoinBalance) {
      benzCoinBalance = outCoinBalance.toNumber();
      return benz.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      benzCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(benzCoinEthBalance, 2 * benzCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var benz;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return BenzCoin.deployed().then(function(instance) {
      benz = instance;
      return benz.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return benz.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return benz.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return benz.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return benz.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
