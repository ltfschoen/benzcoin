pragma solidity ^0.4.17;

contract OwnedLib {
    address public owner;

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    function OwnedLib() public { 
      owner = msg.sender;
    }
}