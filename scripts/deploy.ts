import { ethers } from "hardhat";

async function main() {
  const initialSupply = process.env.INITIAL_SUPPLY
    ? BigInt(process.env.INITIAL_SUPPLY)
    : 1_000_000n;

  console.log("Deploying MitchCoin with initial supply:", initialSupply.toString());

  const MitchCoin = await ethers.getContractFactory("MitchCoin");
  const contract = await MitchCoin.deploy(initialSupply);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("MitchCoin deployed to:", address);

  // Helpful output for the frontend
  console.log("\n--- FRONTEND ENV SNIPPET ---");
  console.log(`NEXT_PUBLIC_TOKEN_ADDRESS=${address}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
