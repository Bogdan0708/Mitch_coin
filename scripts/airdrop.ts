import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

/**
 * Airdrop Script - Send MTC to multiple addresses
 *
 * Usage:
 * 1. Create airdrop.csv in the root directory with format:
 *    address,amount
 *    0x123...,100
 *    0x456...,50
 *
 * 2. Set CONTRACT_ADDRESS environment variable
 * 3. Run: npx hardhat run scripts/airdrop.ts --network polygonAmoy
 */

interface AirdropEntry {
  address: string;
  amount: string;
}

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("Set CONTRACT_ADDRESS environment variable");
  }

  const airdropFile = path.join(__dirname, "..", "airdrop.csv");

  if (!fs.existsSync(airdropFile)) {
    throw new Error(
      "Create airdrop.csv file with format:\naddress,amount\n0x123...,100\n0x456...,50"
    );
  }

  // Read and parse CSV
  const csvContent = fs.readFileSync(airdropFile, "utf-8");
  const lines = csvContent.split("\n").filter(line => line.trim());

  // Skip header
  const entries: AirdropEntry[] = lines.slice(1).map(line => {
    const [address, amount] = line.split(",");
    return { address: address.trim(), amount: amount.trim() };
  });

  if (entries.length === 0) {
    throw new Error("No entries found in airdrop.csv");
  }

  console.log(`📋 Found ${entries.length} addresses to airdrop`);

  // Get contract
  const MitchCoin = await ethers.getContractFactory("MitchCoin");
  const token = MitchCoin.attach(contractAddress);

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log(`🔑 Airdropping from: ${deployer.address}`);

  // Verify deployer is owner
  const owner = await token.owner();
  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error("You are not the contract owner");
  }

  let successCount = 0;
  let failCount = 0;
  let totalAmount = 0n;

  console.log("\n🎁 Starting airdrop...\n");

  for (const entry of entries) {
    try {
      // Validate address
      if (!ethers.isAddress(entry.address)) {
        console.log(`  ❌ Invalid address: ${entry.address}`);
        failCount++;
        continue;
      }

      // Parse amount
      const amountInWei = ethers.parseEther(entry.amount);
      totalAmount += amountInWei;

      console.log(`  Sending ${entry.amount} MTC to ${entry.address}...`);

      // Mint tokens
      const tx = await token.mint(entry.address, amountInWei);
      await tx.wait();

      console.log(`  ✅ Success! TX: ${tx.hash}`);
      successCount++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err: any) {
      console.log(`  ❌ Failed for ${entry.address}: ${err.message}`);
      failCount++;
    }
  }

  console.log("\n📊 Airdrop Summary:");
  console.log(`  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`  💰 Total minted: ${ethers.formatEther(totalAmount)} MTC`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
