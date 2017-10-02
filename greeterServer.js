var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var dnode = require('dnode');
var mysql = require('mysql');

var abiGreet = JSON.parse('[{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"greetCostly","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_numAnswers","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"popularity","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"otherGreeterAddress","type":"address"}],"name":"greetAnotherPopularity","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"greeting","type":"string"}],"name":"setGreeting","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_otherGreet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_greet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"requester","type":"address"},{"indexed":false,"name":"greeting","type":"string"}],"name":"NewGreetProvided","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"requester","type":"address"},{"indexed":false,"name":"greeting","type":"string"}],"name":"GreetAnswered","type":"event"}]');


//Testrpc
var addContract = '0x04d858ead82a4f236ca7a940eef5e5233f683002';
var myAccount = '00xd4e959737568b2a015005aa1599ed41ef88cfb5d';

//B9Lab
//var addContract = '0xf355a9f2a6e41d345674111d7ff60d92b5800da0';
//var myAccount = '0xb386dce5b5eead8db51c220e1b43ac83e20031f2';

//Homestead
//var addContract = '0xc733052321f3b8a958365ecdbf53d6569fd214fb';
//var myAccount = '0xDf3BCdbe4669dE9E0baBf269424250d40c9E3De0';

function waitForTx(tx_hash, secondsDuration) 
{
      var d = new Date();
      var n = d.getTime()/1000;
      var m = n;
      var result = null;

      // This is not really efficient but nodejs cannot pause the running process
      while(result == null && (m - n < secondsDuration)) 
      {
          result = web3.eth.getTransactionReceipt(tx_hash);
          m = d.getTime()/1000;
      }

      if ( result != null)
        return true;
      else
        return false;
}

function waitForSecs(secondsDuration) 
{
      var d = new Date();
      var n = d.getTime()/1000;
      var m = n;

      // This is not really efficient but nodejs cannot pause the running process
      while(m - n < secondsDuration) 
      {
          m = d.getTime()/1000;
      }

      return;
}


var server = dnode({

  greet: function(receivedText,callBack)
  {
    console.log(receivedText);
    //===============================================
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      port : '8889',
      user: 'greeter',
      password: 'greeter',
      database: 'greeter'     
    });

    //===============================================
    connection.connect((err) => {
      if (err) {
          console.log('NOT Connected!'); 
          throw err;
      }
      console.log('Connected!');

   
   if (receivedText.toUpperCase() != "HELLO")
   {
      callBack("I do not understand your question");
   }
    //===============================================
        
            console.log("My Account:"+myAccount);

            var GreeterContract = web3.eth.contract(abiGreet);
            var contractInstance = GreeterContract.at(addContract);
              //var event = contractInstance.GreetAnswered({retVal: false});
              var text = contractInstance.greet(); //560759 value proposed by testrpc. If no all used, reset back to me

              // watch for changes
              //event.watch(function(error, result)
              //{
                  //if (!error)
                  //{
                      //console.log('RESULT: '+JSON.stringify(result));

                      //if ( result.args.retVal == true )
                      {
                          console.log("Text: " + text);

                          //if ( waitForTx(txnHash,20))
                          {
                            console.log("SUCCESS");

                                      //=============================
                            var currentdate = new Date();
                            var stringRes = text; 
                            //var stringRes = JSON.stringify(result);

                            var queryInsert = "INSERT INTO greet (text,jsonEventResult,d_cre) values ('" +receivedText+ "','" +stringRes+ "','"+currentdate+"')";
                            console.log(queryInsert);

                            connection.query(queryInsert, (err,rows) => {                                  
                                    if(err)
                                    {
                                        console.log("Query failed", err);
                                        connection.end(function(err)
                                        {
                                          callBack("Error");
                                        });
                                    }
                                    else
                                    {
                                      //Disconnect and exit with success.
                                      connection.end(function(err)
                                      {         
                                        if(err)
                                        {
                                          console.log("Warning: disconnection failed", err);
                                          callBack("Error");
                                        }
                                        else
                                          callBack(stringRes);
                                      });
                                    }                             
                            });
                          }
                          /*else
                          {
                            console.log("FAILURE");
                            connection.end();
                            callBack("Error");
                            return;
                          }*/
                      }
                      /*else
                      {
                          console.log("FAILURE");
                          connection.end();
                          callBack("Error");
                          return;
                      }*/
                  //}

              //});

           });

  }, //Greet

  //SET GREETING
   setGreeting: function(receivedText,callBack)
  {
    console.log(receivedText);

    //===============================================

    console.log("My Account:"+myAccount);

    var GreeterContract = web3.eth.contract(abiGreet);
    var contractInstance = GreeterContract.at(addContract);
      //var event = contractInstance.GreetAnswered({retVal: false});
      var acc = myAccount;
      var txnHash = contractInstance.setGreeting(receivedText,{from: acc}); //560759 value proposed by testrpc. If no all used, reset back to me

      if ( waitForTx(txnHash,20))
      {
          callBack(txnHash);
      }

  } ,//setGreeting

  greetAnotherPopularity: function(greeterAddress, callBack)
  {
    console.log('Greeter adress: ' + greeterAddress);

    //==============================================
  
    var GreeterContract = web3.eth.contract(abiGreet);
    var contractInstance = GreeterContract.at(greeterAddress);

      var text = contractInstance.greetAnotherPopularity(greeterAddress); //560759 value proposed by testrpc. If no all used, reset back to me
      callBack(text);

  } //getGreeting

});
server.listen(7070);
