import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";

dotenv.config();

const {
  SEPOLIA_ETHERSCAN_API_KEY,
  SEPOLIA_ALCHEMY_API_KEY,
  SEPOLIA_PRIVATE_KEY,
} = process.env as any;

const config = {
  solidity: "0.8.25",
  // should use etherscan api key
  etherscan: {
    apiKey: {
      sepolia: SEPOLIA_ETHERSCAN_API_KEY,
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
