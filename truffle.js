module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
  
    //B9LB Network
    net42: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 42
    },
    //Ropsten test network
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: 3
    },
    //Ethereum Homestead Main Network
    net01: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 1,
      from: "0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0",
      gas: 5712388
    },
  }
};
