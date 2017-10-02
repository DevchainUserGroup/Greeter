//var HeartCoin = artifacts.require("./HeartCoin.sol");
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Greeter = artifacts.require("./Greeter.sol");

module.exports = function(deployer) {
  deployer.deploy(Greeter, {from: web3.eth.accounts[0],gas: 4000000});
};
