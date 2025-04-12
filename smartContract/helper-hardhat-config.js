const { ethers } = require("hardhat");

const networkConfig = {
  11155111: {
    name: "sepolia",
  },
  31337: {
    name: "hardhat",
  },
};

const INITIAL_SUPPLY = "21000000000000000000000" // 21 million
const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  INITIAL_SUPPLY,
  developmentChains,
};
