# MitchCoin Deployment Checklist

Use this checklist to deploy MitchCoin step by step.

## Pre-Deployment Setup

### 1. Get Required Accounts & Keys

- [ ] **Alchemy Account** - [Sign up](https://www.alchemy.com/)
  - Create a new app for "Polygon Amoy" network
  - Copy your API key

- [ ] **Test Wallet**
  - Create a NEW wallet specifically for testing (NEVER use your main wallet!)
  - Save the private key securely
  - Get the wallet address

- [ ] **Testnet Funds**
  - Visit [Polygon Faucet](https://faucet.polygon.technology/)
  - Enter your test wallet address
  - Request testnet MATIC (you'll need ~0.1 MATIC for deployment)

- [ ] **PolygonScan API Key** (Optional, for verification)
  - [Get API key](https://polygonscan.com/apis)

### 2. Configure Environment Files

#### Backend Configuration (`.env`)

- [ ] Copy `.env.example` to `.env`
- [ ] Set `PRIVATE_KEY` (from your test wallet)
- [ ] Set `ALCHEMY_API_KEY` (from Alchemy dashboard)
- [ ] Set `POLYGONSCAN_API_KEY` (optional, for verification)
- [ ] Verify `INITIAL_SUPPLY` (default: 1,000,000 MTC)

**Example:**
```env
PRIVATE_KEY=0xabcd1234...your_test_wallet_private_key
ALCHEMY_API_KEY=abc123-def456-ghi789
POLYGONSCAN_API_KEY=XYZ123ABC456
INITIAL_SUPPLY=1000000
```

#### Frontend Configuration (`web/.env.local`)

- [ ] Copy `web/.env.local.example` to `web/.env.local`
- [ ] Set `NEXT_PUBLIC_ALCHEMY_API_KEY` (same as above)
- [ ] Set `NEXT_PUBLIC_CHAIN_ID=80002` (Polygon Amoy)
- [ ] Leave `NEXT_PUBLIC_TOKEN_ADDRESS` empty for now

**Example:**
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=abc123-def456-ghi789
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_TOKEN_ADDRESS=
```

## Deployment Process

### 3. Install Dependencies

- [ ] Run: `pnpm install`
- [ ] Wait for installation to complete (~30 seconds)

### 4. Compile Contracts

- [ ] Run: `pnpm compile`
- [ ] Verify output shows: "Compiled 7 Solidity files successfully"

### 5. Run Tests

- [ ] Run: `pnpm test`
- [ ] Verify all 4 tests pass:
  - ✓ mints initial supply to deployer
  - ✓ owner can mint
  - ✓ has correct name and symbol
  - ✓ owner can burn tokens

### 6. Deploy to Polygon Amoy

- [ ] Run: `pnpm deploy:amoy`
- [ ] Wait for deployment (~30-60 seconds)
- [ ] Copy the contract address from output
- [ ] Save the output for your records

**Expected Output:**
```
Deploying MitchCoin with initial supply: 1000000
MitchCoin deployed to: 0xAbC123...
--- FRONTEND ENV SNIPPET ---
NEXT_PUBLIC_TOKEN_ADDRESS=0xAbC123...
```

### 7. Update Frontend Configuration

- [ ] Edit `web/.env.local`
- [ ] Set `NEXT_PUBLIC_TOKEN_ADDRESS` to your deployed contract address
- [ ] Save the file

**Example:**
```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xAbC123YourDeployedContractAddress
```

### 8. Verify Contract (Optional but Recommended)

- [ ] Set environment variable:
  ```bash
  # Windows CMD
  set CONTRACT_ADDRESS=0xYourContractAddress

  # Windows PowerShell
  $env:CONTRACT_ADDRESS="0xYourContractAddress"

  # Mac/Linux
  export CONTRACT_ADDRESS=0xYourContractAddress
  ```

- [ ] Run: `pnpm verify`
- [ ] Wait for verification to complete
- [ ] Verify on [Polygonscan Amoy](https://amoy.polygonscan.com/)

### 9. Start the Web dApp

- [ ] Run: `pnpm web:dev`
- [ ] Wait for server to start
- [ ] Open browser to: http://localhost:5173
- [ ] Verify you see the MitchCoin interface

### 10. Test the dApp

- [ ] Click "Connect Wallet" button
- [ ] Select MetaMask (or your preferred wallet)
- [ ] Switch to Polygon Amoy network if prompted
- [ ] Verify your MTC balance is displayed
- [ ] Check that you see "You are the contract owner" message

### 11. Test Token Functionality

#### Test Transfer
- [ ] Go to "Transfer" tab
- [ ] Enter a recipient address (can use another wallet you own)
- [ ] Enter amount (e.g., 10 MTC)
- [ ] Click "Send MTC"
- [ ] Approve transaction in MetaMask
- [ ] Wait for confirmation
- [ ] Verify transaction on Polygonscan

#### Test Mint (Owner Only)
- [ ] Go to "Mint" tab
- [ ] Enter a recipient address
- [ ] Enter amount to mint
- [ ] Click "Mint Tokens"
- [ ] Approve transaction in MetaMask
- [ ] Wait for confirmation
- [ ] Verify new tokens were minted

## Post-Deployment

### 12. Import Token to MetaMask

- [ ] Open MetaMask
- [ ] Click "Import tokens"
- [ ] Select "Custom token"
- [ ] Paste your token contract address
- [ ] Token Symbol should auto-fill as "MTC"
- [ ] Token Decimal should auto-fill as "18"
- [ ] Click "Add Custom Token"
- [ ] Verify you see your MTC balance

### 13. Documentation & Backup

- [ ] Save your contract address in a safe place
- [ ] Save your deployment transaction hash
- [ ] Take screenshots of successful deployment
- [ ] Update README with your contract address
- [ ] Commit code to git (if using version control)

**Important to save:**
```
Contract Address: 0x...
Deployment TX: 0x...
Network: Polygon Amoy (ChainID: 80002)
Deployment Date: YYYY-MM-DD
Initial Supply: 1,000,000 MTC
Owner Address: 0x...
```

## Troubleshooting

### Common Issues

**"Insufficient funds" error**
- [ ] Check your wallet has testnet MATIC
- [ ] Get more from [Polygon Faucet](https://faucet.polygon.technology/)

**"Invalid API key" error**
- [ ] Verify `ALCHEMY_API_KEY` in `.env`
- [ ] Ensure you created an app for "Polygon Amoy" network
- [ ] Check for extra spaces or quotes in .env file

**"Cannot find module" errors**
- [ ] Run `pnpm install` again
- [ ] Delete `node_modules` and `pnpm-lock.yaml`
- [ ] Run `pnpm install` again

**Web dApp won't connect**
- [ ] Ensure MetaMask is installed
- [ ] Switch to Polygon Amoy network in MetaMask
- [ ] Clear browser cache and reload
- [ ] Check browser console for errors

**Contract verification fails**
- [ ] Wait 1-2 minutes after deployment before verifying
- [ ] Verify `POLYGONSCAN_API_KEY` is correct
- [ ] Check that `CONTRACT_ADDRESS` environment variable is set
- [ ] Ensure constructor arguments match deployment

## Next Steps After Deployment

### Production Deployment (When Ready)

To deploy to Polygon Mainnet:
- [ ] Get real MATIC for gas fees
- [ ] Update `hardhat.config.ts` to add Polygon mainnet
- [ ] Update `web/.env.local` to use Chain ID 137
- [ ] Run deployment on mainnet
- [ ] Verify contract
- [ ] Test thoroughly before public release

### Additional Features to Consider

- [ ] Create a faucet for users to get free MTC
- [ ] Add airdrop functionality
- [ ] Integrate with payment systems (Square, Stripe)
- [ ] Add staking/rewards mechanism
- [ ] Create NFT loyalty passes
- [ ] Build mobile app
- [ ] Add analytics dashboard

## Security Checklist

- [ ] Never commit `.env` files to git
- [ ] Use a dedicated test wallet (not your main wallet)
- [ ] Keep private keys secure
- [ ] Test all functions before mainnet deployment
- [ ] Consider getting a smart contract audit for production
- [ ] Set up monitoring for unusual transactions
- [ ] Have an emergency pause mechanism (for production)

---

## Support Resources

- **Hardhat Docs**: https://hardhat.org/docs
- **Polygon Docs**: https://docs.polygon.technology/
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **Alchemy Tutorials**: https://docs.alchemy.com/
- **Ethereum Stack Exchange**: https://ethereum.stackexchange.com/

---

**Deployment Date:** _____________

**Contract Address:** _____________

**Deployed By:** _____________

**Notes:**

_____________________________________________

_____________________________________________

_____________________________________________
