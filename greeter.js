var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Greeter = artifacts.require("./Greeter.sol");

contract('Greeter', 
        function() 
        {
          it("Should say that no greeting has been yet provided", 
          function() 
          {
              return 
              Greeter.deployed()
                     .then(function(instance) 
                          {
                             return instance.greet.call();
                          })
                    .then(function(greeting) 
                          {
                            assert.equal(greeting.valueOf(), "noGreetSentenceProvided", "A greeting sentence has been provided");
                          });
          });


          it("Should set a greeting sentence, retrieve it", 
          function() 
          {
              //Contract instance
              var meta;
              // Greeting to set
              var greeting = "Hello Dolly";

              return Greeter.deployed()
                            .then(function(instance) 
                                  {
                                    console.log("Set new greeting sentence");
                                    meta = instance;
                                    meta.setGreeting(greeting,{from: web3.eth.accounts[0],gas: 4000000});
                                  })
                            .then(function() 
                                  {
                                    console.log("Requesting greet");
                                    retGreet = meta.greet();
                                    return retGreet;
                                  })
                            .then(function(retGreet) 
                                  {
                                    console.log("Testing returned greet sentence");
                                    assert.equal(retGreet, greeting, "Provided and Requested greeting differs");
                                  });
          });
});
