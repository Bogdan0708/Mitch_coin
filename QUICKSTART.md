# MitchCoin Quick Start Guide

Get MitchCoin deployed in 10 minutes! 🚀

## Prerequisites (5 minutes)

### 1. Get Alchemy API Key
- Visit https://www.alchemy.com/
- Sign up (free)
- Create new app: **Polygon Amoy**
- Copy your API key

### 2. Get Test Wallet & Funds
- Create a NEW MetaMask wallet (or use test wallet)
- Copy the private key (Settings → Show private key)
- Get free testnet MATIC: https://faucet.polygon.technology/
- Wait ~30 seconds for funds to arrive

## Setup (2 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Edit `.env` file:
```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ALCHEMY_API_KEY=your_alchemy_key_here
```

Edit `web/.env.local` file:
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key_here
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_TOKEN_ADDRESS=
```

### 3. Check Configuration
```bash
pnpm check
```

Should show: ✅ Configuration looks good!

## Deploy (1 minute)

### 1. Compile & Test
```bash
pnpm compile
pnpm test
```

### 2. Deploy to Polygon Amoy
```bash
pnpm deploy:amoy
```

Copy the contract address from the output!

### 3. Update Web Config
Edit `web/.env.local` and add your contract address:
```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourContractAddressHere
```

## Launch (1 minute)

### Start the dApp
```bash
pnpm web:dev
```

### Open in Browser
Visit: http://localhost:5173

### Connect Wallet
- Click "Connect Wallet"
- Select MetaMask
- Switch to Polygon Amoy
- See your 1,000,000 MTC balance! 🎉

## What's Next?

### Import Token to MetaMask
1. Open MetaMask
2. Click "Import tokens"
3. Paste your contract address
4. Click "Add Custom Token"

### Test Features

**Transfer Tokens:**
- Go to "Transfer" tab
- Send MTC to a friend

**Mint Tokens (Owner Only):**
- Go to "Mint" tab
- Mint rewards for customers

### Verify on Polygonscan (Optional)
```bash
# Set your contract address
export CONTRACT_ADDRESS=0xYourAddress  # Mac/Linux
set CONTRACT_ADDRESS=0xYourAddress     # Windows CMD
$env:CONTRACT_ADDRESS="0xYourAddress"  # Windows PowerShell

# Verify
pnpm verify
```

## Helpful Commands

```bash
pnpm check          # Check configuration
pnpm compile        # Compile contracts
pnpm test          # Run tests
pnpm deploy:amoy   # Deploy to testnet
pnpm verify        # Verify on Polygonscan
pnpm airdrop       # Bulk send tokens
pnpm web:dev       # Start dApp
```

## Troubleshooting

### "Insufficient funds"
- Get more MATIC: https://faucet.polygon.technology/

### "Invalid API key"
- Check `.env` file has correct Alchemy key
- Make sure you selected "Polygon Amoy" network

### Web dApp won't connect
- Clear browser cache
- Check MetaMask is on Polygon Amoy network
- Restart dev server

## Production Deployment

Ready for mainnet? See `DEPLOYMENT_CHECKLIST.md` for complete guide.

---

Need help? Check the full `README.md` and `SETUP.md` guides!
