import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
require("dotenv").config();
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mantle: {
      url: `${process.env.MANTLE_RPC}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    goerli: {
      url: `${process.env.GOERLI_RPC}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.GOERLI_ETHERSCAN}`,
    },
  },
};

export default config;
