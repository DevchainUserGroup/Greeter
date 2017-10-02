var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Greeter = artifacts.require("./Greeter.sol");

module.exports = function(deployer) {
  	deployer.deploy(Greeter,{from: '0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0',gas: 4712388, gasPrice: 20000000000});
};


//personal.unlockAccount('0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0')
//personal.unlockAccount('0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0','firenze56',15000)
//eth.getBalance('0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0')

//gi = Greeter.at(’0xc733052321f3b8a958365ecdbf53d6569fd214fb')

