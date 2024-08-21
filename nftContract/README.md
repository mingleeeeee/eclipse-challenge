# deployed contract infomation

contract address: 0x99073732309cD2404d4f42Ce638F80342378E2f2

sepolia etherscan: https://sepolia.etherscan.io/address/0x99073732309cD2404d4f42Ce638F80342378E2f2#code

contract abi:
```shell
cd nftContract/artifacts/contracts/AgentNftContract.sol/AiAgentNFT.json
```

# basic commnads

compile the contract
```shell
npx hardhat compile
```

run the test (test code not implemented yet)
```shell
npx hardhat test
```

deploy the contract to remote network, this project is using sepolia network
```shell
npx hardhat ignition deploy ./ignition/modules/<contract-name>.ts --network <network-name>
```

deploy the contract to hardhat network
```shell
npx hardhat ignition deploy ./ignition/modules/<contract-name>.ts
```

verify the contract on etherscan
```shell
npx hardhat run ./verify/verifyContract.ts --network <network-name>
```

-----------------

# setup the remote network

1. edit .env file
2. setup the test network
   
```shell
cd nftContract/hardhat.config.ts
```

edit the network configuration & also the etherscan

```typescript
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
```




-----------------
# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
