import { run } from "hardhat";

async function main() {
  const address = process.env.CONTRACT_ADDRESS!;
  const initialSupply = process.env.INITIAL_SUPPLY || "1000000";

  if (!address) {
    throw new Error("Set CONTRACT_ADDRESS in env");
  }

  await run("verify:verify", {
    address,
    constructorArguments: [initialSupply]
  });

  console.log("Verified:", address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
