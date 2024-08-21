import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const owner = process.env.INITIAL_OWNER_ADDRESS;

const AgentNftContractModule = buildModule(
  "AgentNftContractModule",
  (m: any) => {
    const initialOwner = m.getParameter("initialOwner", owner);

    // Deploy the AiAgentNFT contract and set the constructor arguments
    const aiAgentNFT = m.contract("AiAgentNFT", [initialOwner]);

    return { aiAgentNFT };
  }
);

export default AgentNftContractModule;
