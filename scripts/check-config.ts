import * as dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

async function checkConfig() {
  console.log("🔍 Checking MitchCoin Configuration...\n");

  let hasErrors = false;

  // Check environment variables
  console.log("📋 Environment Variables:");

  const privateKey = process.env.PRIVATE_KEY || "";
  if (!privateKey || privateKey === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    console.log("  ❌ PRIVATE_KEY not set or is placeholder");
    hasErrors = true;
  } else if (!privateKey.startsWith("0x")) {
    console.log("  ❌ PRIVATE_KEY must start with 0x");
    hasErrors = true;
  } else if (privateKey.length !== 66) {
    console.log("  ❌ PRIVATE_KEY must be 66 characters (including 0x)");
    hasErrors = true;
  } else {
    console.log("  ✅ PRIVATE_KEY is set");

    // Get wallet address from private key
    try {
      const wallet = new ethers.Wallet(privateKey);
      console.log(`     Wallet Address: ${wallet.address}`);
    } catch (err) {
      console.log("  ❌ PRIVATE_KEY is invalid");
      hasErrors = true;
    }
  }

  const alchemyKey = process.env.ALCHEMY_API_KEY || "";
  if (!alchemyKey || alchemyKey === "placeholder_get_from_alchemy") {
    console.log("  ❌ ALCHEMY_API_KEY not set or is placeholder");
    hasErrors = true;
  } else {
    console.log("  ✅ ALCHEMY_API_KEY is set");
  }

  const polygonscanKey = process.env.POLYGONSCAN_API_KEY || "";
  if (!polygonscanKey || polygonscanKey === "placeholder_optional") {
    console.log("  ⚠️  POLYGONSCAN_API_KEY not set (optional for verification)");
  } else {
    console.log("  ✅ POLYGONSCAN_API_KEY is set");
  }

  const initialSupply = process.env.INITIAL_SUPPLY || "1000000";
  console.log(`  ✅ INITIAL_SUPPLY: ${initialSupply} MTC`);

  console.log();

  // Check if wallet has funds
  if (privateKey && privateKey.startsWith("0x") && privateKey.length === 66 && alchemyKey && alchemyKey !== "placeholder_get_from_alchemy") {
    console.log("💰 Checking Wallet Balance...");
    try {
      const provider = new ethers.JsonRpcProvider(
        `https://polygon-amoy.g.alchemy.com/v2/${alchemyKey}`
      );
      const wallet = new ethers.Wallet(privateKey, provider);
      const balance = await provider.getBalance(wallet.address);
      const balanceInMatic = ethers.formatEther(balance);

      if (parseFloat(balanceInMatic) < 0.01) {
        console.log(`  ⚠️  Low balance: ${balanceInMatic} MATIC`);
        console.log("     Get testnet MATIC from: https://faucet.polygon.technology/");
        hasErrors = true;
      } else {
        console.log(`  ✅ Balance: ${balanceInMatic} MATIC`);
      }
    } catch (err: any) {
      console.log(`  ❌ Failed to check balance: ${err.message}`);
      hasErrors = true;
    }
    console.log();
  }

  // Summary
  console.log("📊 Summary:");
  if (hasErrors) {
    console.log("  ❌ Configuration has errors. Please fix them before deploying.");
    console.log("\n💡 Next steps:");
    console.log("  1. Update .env file with correct values");
    console.log("  2. Get testnet MATIC from https://faucet.polygon.technology/");
    console.log("  3. Run this check again: npx ts-node scripts/check-config.ts");
  } else {
    console.log("  ✅ Configuration looks good!");
    console.log("\n🚀 Ready to deploy!");
    console.log("  Run: pnpm deploy:amoy");
  }
}

checkConfig().catch((err) => {
  console.error("Error checking config:", err);
  process.exit(1);
});
