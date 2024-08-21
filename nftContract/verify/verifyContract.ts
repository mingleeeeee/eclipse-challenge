import hre from "hardhat";

// The contract address is the address of the deployed contract
const contractAddress = "0xf27024c298AEF5D404de6eF5B7C4Ba0944494323";
const INITIAL_OWNER = process.env.INITIAL_OWNER_ADDRESS;

async function main() {
  /* Verify the contract after deploying */
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [INITIAL_OWNER],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
