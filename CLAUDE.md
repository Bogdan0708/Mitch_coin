# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MitchCoin is a complete ERC-20 loyalty token system with a monorepo structure containing:
- **Smart contracts** (Hardhat + Solidity) - ERC-20 token with owner-controlled minting
- **Web application** (Next.js 14 + wagmi + RainbowKit) - Token dashboard and interaction UI

The project uses pnpm workspaces with two main components that must stay in sync via the contract ABI.

## Essential Commands

### Development Workflow
```bash
# Install all dependencies (root + web)
pnpm install

# Validate configuration before deploying
pnpm check

# Compile contracts (generates ABI + TypeScript types)
pnpm compile

# Run contract tests
pnpm test

# Deploy to Polygon Amoy testnet
pnpm deploy:amoy

# Deploy to Sepolia testnet
pnpm deploy:sepolia

# Verify deployed contract on Polygonscan
pnpm verify

# Start web development server (port 5173)
pnpm web:dev

# Build web app for production
pnpm web:build
```

### Bulk Operations
```bash
# Airdrop tokens to multiple addresses
# Requires: airdrop.csv file (see airdrop.csv.example)
pnpm airdrop
```

## Architecture

### Two-Layer Architecture

**Smart Contract Layer** (root directory):
- `contracts/MitchCoin.sol` - ERC-20 with owner-controlled mint/burn
- `scripts/deploy.ts` - Deployment with environment-based network selection
- `scripts/verify.ts` - Polygonscan/Etherscan verification
- `scripts/check-config.ts` - Configuration validation (checks wallet balance, API keys)
- `scripts/airdrop.ts` - Bulk token distribution from CSV
- Uses Hardhat for compilation, testing, deployment

**Web Application Layer** (`web/` directory):
- Next.js 14 App Router (not Pages Router)
- `web/app/page.tsx` - Main dashboard with tab-based UI (Overview/Transfer/Mint)
- `web/components/MintUI.tsx` - Owner-only token minting interface
- `web/components/TransferUI.tsx` - Token transfer interface with balance validation
- `web/components/Wallet.tsx` - RainbowKit wallet connection wrapper
- `web/lib/config.ts` - Centralized environment variable access
- Uses wagmi v2 + viem (NOT ethers.js on frontend)

### Critical Dependencies Between Layers

**The ABI acts as the contract between layers:**
1. `pnpm compile` generates `artifacts/contracts/MitchCoin.sol/MitchCoin.json`
2. The ABI array from this file MUST be manually copied to `web/app/abi.json`
3. Web app imports this ABI for all contract interactions
4. **If you modify the contract, you MUST recompile AND update web/app/abi.json**

### Network Configuration

The project is configured for two testnets (hardhat.config.ts):
- **Polygon Amoy** (chainId: 80002) - Primary testnet, lower fees
- **Sepolia** (chainId: 11155111) - Ethereum testnet

To add networks:
1. Add network config to `hardhat.config.ts`
2. Add chain import to `web/components/Wallet.tsx` from `wagmi/chains`
3. Add chain to RainbowKit config in Wallet component
4. Update `web/lib/config.ts` CHAIN_ID if changing default

### Environment Variables Architecture

**Two separate .env files that must be kept in sync:**

`.env` (root - backend/deployment):
- `PRIVATE_KEY` - Deployer wallet (must have testnet funds)
- `ALCHEMY_API_KEY` - RPC provider for contract deployment
- `POLYGONSCAN_API_KEY` - For contract verification (optional)
- `INITIAL_SUPPLY` - Token supply on deployment (whole tokens, not wei)

`web/.env.local` (frontend):
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Same Alchemy key (must match backend)
- `NEXT_PUBLIC_CHAIN_ID` - 80002 for Polygon Amoy, 11155111 for Sepolia
- `NEXT_PUBLIC_TOKEN_ADDRESS` - Filled AFTER deployment (from deploy script output)

**Configuration validation:** Run `pnpm check` to validate all environment variables and check wallet balance before deploying.

### State Management Pattern

The web app uses a **tabbed architecture with conditional rendering:**
- Three tabs: Overview, Transfer, Mint (Mint only visible to contract owner)
- Owner detection via `useReadContract` comparing connected address to contract's `owner()` function
- Tab visibility driven by `isConnected` and `isOwner` boolean flags
- Each tab is a separate component imported and conditionally rendered

### Web3 Integration Pattern

**wagmi v2 + viem approach (NOT ethers.js):**
- Use `useReadContract` for reading contract state (balance, totalSupply, owner)
- Use `useWriteContract` + `useWaitForTransactionReceipt` for transactions
- All amount conversions use viem's `parseUnits` (to wei) and `formatUnits` (from wei)
- Contract interactions via ABI imported from `web/app/abi.json`
- TOKEN_ADDRESS imported from centralized `web/lib/config.ts`

**Example pattern (see MintUI.tsx and TransferUI.tsx):**
```typescript
const { data: hash, writeContract, isPending } = useWriteContract();
const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

// For minting/transferring
writeContract({
  address: TOKEN_ADDRESS,
  abi,
  functionName: "mint", // or "transfer"
  args: [recipientAddress, amountInWei]
});
```

## Deployment Flow

1. **Pre-deployment:**
   - Run `pnpm check` to validate environment variables and wallet balance
   - Ensure test wallet has testnet MATIC (get from https://faucet.polygon.technology/)

2. **Deploy contract:**
   - Run `pnpm deploy:amoy` (or `deploy:sepolia`)
   - Script outputs: deployed contract address + frontend env snippet
   - Copy the `NEXT_PUBLIC_TOKEN_ADDRESS` value

3. **Update frontend:**
   - Edit `web/.env.local` and set `NEXT_PUBLIC_TOKEN_ADDRESS`
   - Restart dev server if running

4. **Verify contract (optional):**
   - Set `CONTRACT_ADDRESS` environment variable to deployed address
   - Run `pnpm verify`

5. **Test web app:**
   - Run `pnpm web:dev`
   - Connect wallet via RainbowKit
   - Should see deployed token balance

## Testing

**Contract tests** (test/MitchCoin.test.ts):
- All 4 tests must pass before deployment
- Tests cover: initial supply, minting, token metadata, burning
- Use `pnpm test` to run full suite

**Manual web testing checklist:**
- Token not deployed state (warning display)
- Wallet connection (MetaMask, WalletConnect)
- Balance display and auto-refresh
- Transfer functionality with validation
- Mint functionality (owner only)
- Transaction confirmation flows
- Polygonscan links

## Common Modifications

### Adding a New Network
1. Add to `hardhat.config.ts` networks object
2. Add etherscan API key if verifying
3. Import chain from wagmi/chains in `web/components/Wallet.tsx`
4. Add to RainbowKit chains array
5. Create new deploy script: `pnpm deploy:networkname`

### Modifying the Contract
1. Edit `contracts/MitchCoin.sol`
2. Run `pnpm compile`
3. **CRITICAL:** Copy ABI from `artifacts/contracts/MitchCoin.sol/MitchCoin.json` to `web/app/abi.json`
4. Run `pnpm test` to verify changes
5. Redeploy to testnet
6. Update `NEXT_PUBLIC_TOKEN_ADDRESS` in `web/.env.local`

### Adding New Web Features
- New components go in `web/components/`
- Use `useReadContract` for reading, `useWriteContract` for transactions
- Import TOKEN_ADDRESS from `@/lib/config`
- Import abi from `@/app/abi.json`
- Follow the MintUI/TransferUI pattern for transaction flows
- Add new tabs to page.tsx by extending the tabs array

## Gothic Theme

The UI uses a custom gothic dark theme matching Mitch from Transylvania's brand:
- CSS variables in `web/app/globals.css`:
  - `--bg: #0b0b0f` (dark background)
  - `--fg: #f4f1f0` (light text)
  - `--accent: #8b0000` (dark red accent)
  - `--card-bg: #141419` (card background)
  - `--border: #242432` (border color)
- Vampire/gothic emojis (🧛, 🎁, 💸) in UI text
- Gradient backgrounds on stat cards

## Important Files

**Must read before modifying:**
- `hardhat.config.ts` - Network configuration, crucial for deployments
- `web/lib/config.ts` - Single source of truth for environment variables
- `web/app/abi.json` - Contract interface, must match deployed contract

**Helper documentation:**
- `QUICKSTART.md` - 10-minute deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step deployment process
- `PROJECT_SUMMARY.md` - Complete technical architecture

## Troubleshooting

**"Insufficient funds" errors:**
- Check wallet has testnet MATIC via `pnpm check`
- Get testnet funds from faucet

**ABI mismatch errors:**
- Recompile contracts with `pnpm compile`
- Copy updated ABI to `web/app/abi.json`

**Web app shows "Token not deployed":**
- Verify `NEXT_PUBLIC_TOKEN_ADDRESS` is set in `web/.env.local`
- Restart dev server after changing env files

**Owner functions not visible:**
- Contract owner is set during deployment to deployer address
- Check connected wallet matches deployer wallet
- Owner detection compares addresses case-insensitively

**Transaction failures:**
- Check correct network in MetaMask (Polygon Amoy = chainId 80002)
- Verify sufficient balance for gas + transfer amount
- Check transaction on Polygonscan for specific error
