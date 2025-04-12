// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

error Token__NotEnoughBalance();
error Token__NotEnoughAllowance();

contract MyToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function transfer(address from, address to, uint256 amount) public {
        if (balanceOf[from] < amount) revert Token__NotEnoughBalance();

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
    }    

    function transferFrom(address from, address to, uint256 amount) public returns (bool success) {
        if (allowance[from][msg.sender] < amount) revert Token__NotEnoughAllowance();

        allowance[from][msg.sender] -= amount;
        transfer(from, to, amount);
        return true;
    }
}
