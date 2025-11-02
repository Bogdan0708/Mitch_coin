# MitchCoin Setup Guide

Complete setup instructions for deploying and running the MitchCoin project.

## Prerequisites

Before starting, make sure you have:

1. **Node.js 18+** installed
2. **pnpm** package manager: `npm install -g pnpm`
3. **Test wallet** with some testnet funds:
   - For Polygon Amoy: Get free MATIC from [Polygon Faucet](https://faucet.polygon.technology/)
   - For Sepolia: Get free ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. **Alchemy account** (free): [Sign up at Alchemy](https://www.alchemy.com/)
5. **Polygonscan API key** (optional, for verification): [Get from Polygonscan](https://polygonscan.com/apis)

## Step 1: Install Dependencies

```bash
# Install all project dependencies
pnpm install
```

This will install dependencies for both the smart contract project and the web dApp.

## Step 2: Configure Environment Variables

### Backend (Smart Contracts)

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```env
PRIVATE_KEY=0xYOUR_TEST_WALLET_PRIVATE_KEY
ALCHEMY_API_KEY=your_alchemy_api_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
INITIAL_SUPPLY=1000000
```

⚠️ **Security Warning**: Never use your main wallet's private key! Create a new test wallet specifically for development.

### Frontend (Web dApp)

1. Copy the web environment template:
```bash
cd web
cp .env.local.example .env.local
cd ..
```

2. Edit `web/.env.local`:
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_TOKEN_ADDRESS=
```

Leave `NEXT_PUBLIC_TOKEN_ADDRESS` empty for now - you'll fill it in after deployment.

## Step 3: Compile Smart Contracts

```bash
pnpm compile
```

This will:
- Compile the MitchCoin.sol contract
- Generate TypeScript types
- Create ABI files in `artifacts/`

## Step 4: Run Tests

```bash
pnpm test
```

You should see all tests passing:
- ✓ mints initial supply to deployer
- ✓ owner can mint
- ✓ has correct name and symbol
- ✓ owner can burn tokens

## Step 5: Deploy to Polygon Amoy Testnet

```bash
pnpm deploy:amoy
```

After successful deployment, you'll see output like:
```
Deploying MitchCoin with initial supply: 1000000
MitchCoin deployed to: 0xAbC123...

--- FRONTEND ENV SNIPPET ---
NEXT_PUBLIC_TOKEN_ADDRESS=0xAbC123...
```

**Important**: Copy the token address!

## Step 6: Update Web Configuration

1. Edit `web/.env.local` and add the deployed token address:
```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xAbC123YourTokenAddress
```

## Step 7: (Optional) Verify Contract on Polygonscan

```bash
# Set the contract address
export CONTRACT_ADDRESS=0xYourTokenAddress

# Or on Windows:
set CONTRACT_ADDRESS=0xYourTokenAddress

# Run verification
pnpm verify
```

This makes your contract source code publicly viewable on Polygonscan.

## Step 8: Start the Web dApp

```bash
pnpm web:dev
```

Open http://localhost:5173 in your browser.

## Step 9: Connect Your Wallet

1. Click "Connect Wallet" in the top-right
2. Select your wallet (MetaMask, WalletConnect, etc.)
3. Switch to Polygon Amoy network (chainId 80002)
4. You should see your MTC balance!

## Next Steps

### Test the Token

1. **Import token to MetaMask**:
   - Open MetaMask
   - Click "Import tokens"
   - Paste your token address
   - Token symbol: MTC
   - Decimals: 18

2. **Mint tokens** (owner only):
   ```typescript
   // You can add a mint UI or use Hardhat console
   npx hardhat console --network polygonAmoy

   const MitchCoin = await ethers.getContractFactory("MitchCoin");
   const token = MitchCoin.attach("0xYourTokenAddress");
   await token.mint("0xRecipientAddress", ethers.parseEther("100"));
   ```

3. **Send tokens**:
   - Use MetaMask to send MTC to another address
   - Or use the transfer function in your dApp

### Deploy to Production (Polygon Mainnet)

When ready for production:

1. **Update Hardhat config** to add Polygon mainnet:
```typescript
polygon: {
  url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  accounts: [PRIVATE_KEY]
}
```

2. **Get real MATIC** for gas fees

3. **Deploy**:
```bash
pnpm hardhat run scripts/deploy.ts --network polygon
```

4. **Update web config** with mainnet settings:
```env
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourMainnetAddress
```

## Troubleshooting

### "Insufficient funds" error
- Make sure your wallet has testnet MATIC/ETH
- Get free tokens from faucets (see Prerequisites)

### "Cannot find module" errors
- Run `pnpm install` again
- Delete `node_modules` and `pnpm-lock.yaml`, then reinstall

### Web dApp won't connect
- Check that MetaMask is on the correct network (Polygon Amoy)
- Clear browser cache and reload
- Check browser console for errors

### Contract verification fails
- Make sure `POLYGONSCAN_API_KEY` is set in `.env`
- Verify you're using the correct constructor arguments
- Wait a few minutes after deployment before verifying

## Development Workflow

Typical development cycle:

1. **Make changes** to `contracts/MitchCoin.sol`
2. **Compile**: `pnpm compile`
3. **Test**: `pnpm test`
4. **Deploy**: `pnpm deploy:amoy`
5. **Update web config** with new address
6. **Restart dev server**: `pnpm web:dev`

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Polygon Documentation](https://docs.polygon.technology/)
- [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)

## Support

Need help? Check:
- [Polygon Discord](https://discord.gg/polygon)
- [Hardhat Discord](https://discord.gg/hardhat)
- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
