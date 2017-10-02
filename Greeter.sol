pragma solidity ^0.4.11;
   
contract AnotherGreeter
{
  function popularity()  constant returns (uint) ;  
}

 
contract Greeter
 {
    //Sentence to answer on request
   string  public  _greet 	  = "noGreetSentenceProvided";
   uint    public  _numAnswers = 0;
   string  public  _otherGreet;
   // Owner of this Greeter contract
   address public _owner;
 
   // Functions with this modifier can only be executed by the owner
   modifier onlyOwner() 
   {
       if (msg.sender != _owner) {
           throw;
       }
       _;
   }
 
 	// Events to rrigger for outside world
  event NewGreetProvided(address requester, string greeting);
 	event GreetAnswered(address requester, string greeting);

   // Constructor
   function Greeter() public {
    _owner = msg.sender;
   }
 
 
   // Provide  the sentence provided at contract deployement time
   function setGreeting(string greeting)  onlyOwner
   {
       _greet = greeting;
       NewGreetProvided(_owner, _greet);
   }
 
   // Answer the sentence provided at contract deployement time
   function greet()   constant returns (string) 
   {   
       GreetAnswered(msg.sender, _greet);
       return _greet;
   }

  // Answer the sentence provided at contract deployement time
   function greetCostly()   returns (string) 
   {   
       GreetAnswered(msg.sender, _greet);
       _numAnswers = _numAnswers +1; //Highlight the fact that due to constant modifyer, the operation which needs to be mined is not executed
       return _greet;
   }

   // Answer the sentence provided at contract deployement time
   function popularity()  constant returns (uint) 
   {
       return _numAnswers;
   }

  //Call another greeter contract
   function greetAnotherPopularity(address otherGreeterAddress)  constant returns (uint)
   {
      AnotherGreeter otherGreeterContract = AnotherGreeter(otherGreeterAddress);

      return otherGreeterContract.popularity();

   }

   
    //Function to render the contract unusable 
    function kill() onlyOwner { if (msg.sender == _owner) suicide(_owner); }
}