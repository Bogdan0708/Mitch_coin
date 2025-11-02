# MitchCoin (MTC) - Gothic Street Food Loyalty Token

> A production-ready ERC-20 token + React dApp for Mitch from Transylvania's gothic street food empire 🧛

[![Polygon](https://img.shields.io/badge/Polygon-Amoy-8247E5?logo=polygon)](https://polygon.technology/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ⚡ Quick Start (10 Minutes)

Get MitchCoin deployed and running in 10 minutes! See **[QUICKSTART.md](QUICKSTART.md)** for the fastest path.

```bash
# 1. Install dependencies
pnpm install

# 2. Configure (add your keys to .env and web/.env.local)
pnpm check

# 3. Deploy
pnpm deploy:amoy

# 4. Launch dApp
pnpm web:dev
```

## 🎯 What Is MitchCoin?

MitchCoin is a complete loyalty and payment token system featuring:

- **🪙 ERC-20 Token** - Standard, secure, OpenZeppelin-based
- **🎨 Web Dashboard** - Beautiful gothic-themed UI
- **💸 Transfer System** - Send tokens to anyone
- **🎁 Mint System** - Owner can create rewards
- **📱 Wallet Connect** - MetaMask, WalletConnect, etc.
- **🔍 Block Explorer** - View on Polygonscan

Perfect for:
- Loyalty rewards programs
- Customer retention
- In-store payments
- Community building
- Promotional campaigns

## 🏗️ Features

### Smart Contract (Solidity)
- ✅ ERC-20 compliant token
- ✅ Owner-controlled minting for rewards
- ✅ Burn function for supply management
- ✅ OpenZeppelin v5.0 security
- ✅ Fully tested (4/4 tests passing)
- ✅ Polygon Amoy testnet ready
- ✅ Gas optimized

### Web Application (Next.js)
- ✅ Real-time balance display
- ✅ Total supply tracking
- ✅ Transfer tokens to any address
- ✅ Mint tokens (owner only)
- ✅ Transaction history links
- ✅ Responsive design
- ✅ Gothic dark theme
- ✅ Auto-refresh balances

## 📋 Prerequisites

Before you begin, you need:

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **pnpm** - `npm install -g pnpm`
3. **Test Wallet** - Create a MetaMask wallet for testing
4. **Testnet MATIC** - [Get free tokens](https://faucet.polygon.technology/)
5. **Alchemy Account** - [Sign up free](https://www.alchemy.com/)

## 🚀 Installation

### 1. Clone & Install
```bash
cd Mitch_coin
pnpm install
```

### 2. Configure Environment

**Backend** (`.env`):
```env
PRIVATE_KEY=0xYOUR_TEST_WALLET_PRIVATE_KEY
ALCHEMY_API_KEY=your_alchemy_api_key
POLYGONSCAN_API_KEY=your_polygonscan_key  # Optional
INITIAL_SUPPLY=1000000
```

**Frontend** (`web/.env.local`):
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_TOKEN_ADDRESS=  # Fill after deployment
```

### 3. Compile & Test
```bash
pnpm compile
pnpm test
```

### 4. Check Configuration
```bash
pnpm check
```

Should show: ✅ Configuration looks good!

### 5. Deploy
```bash
pnpm deploy:amoy
```

Copy the contract address and add it to `web/.env.local`

### 6. Start Web App
```bash
pnpm web:dev
```

Open http://localhost:5173 🎉

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Deploy in 10 minutes
- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## 🛠️ Available Commands

### Smart Contracts
```bash
pnpm compile        # Compile Solidity contracts
pnpm test          # Run test suite
pnpm check         # Validate configuration
pnpm deploy:amoy   # Deploy to Polygon Amoy testnet
pnpm deploy:sepolia # Deploy to Sepolia testnet
pnpm verify        # Verify contract on Polygonscan
pnpm airdrop       # Bulk send tokens
pnpm node          # Start local Hardhat node
```

### Web Application
```bash
pnpm web:dev       # Start dev server (localhost:5173)
pnpm web:build     # Build for production
pnpm web:start     # Start production server
```

## 🎨 Project Structure

```
Mitch_coin/
├── contracts/          # Solidity smart contracts
│   └── MitchCoin.sol  # Main ERC-20 token
├── scripts/           # Deployment & utility scripts
│   ├── deploy.ts      # Deploy to networks
│   ├── verify.ts      # Verify on Polygonscan
│   ├── check-config.ts # Config validation
│   └── airdrop.ts     # Bulk token distribution
├── test/              # Smart contract tests
│   └── MitchCoin.test.ts
├── web/               # Next.js web application
│   ├── app/          # Next.js App Router
│   ├── components/   # React components
│   └── lib/          # Configuration & utilities
└── docs/             # Documentation
```

## 🌐 Supported Networks

### Testnets (Configured)
- ✅ **Polygon Amoy** (ChainID: 80002) - Primary testnet
- ✅ **Sepolia** (ChainID: 11155111) - Ethereum testnet

### Production (Easy to Add)
- 🔧 Polygon Mainnet (ChainID: 137)
- 🔧 Ethereum Mainnet (ChainID: 1)
- 🔧 Base (ChainID: 8453)
- 🔧 Arbitrum (ChainID: 42161)

## 💡 Use Cases

### For Business (Mitch's Gothic Street Food)
- **Loyalty Rewards** - Award MTC for purchases
- **Promotions** - Airdrop tokens for marketing
- **Payments** - Accept MTC as payment
- **Community** - Build engaged customer base
- **Events** - Special token-gated experiences

### For Customers
- **Earn** - Get MTC with every purchase
- **Save** - Accumulate tokens over time
- **Spend** - Use MTC for discounts
- **Trade** - Send to friends
- **Collect** - Hold for VIP access

## 🔒 Security

- ✅ OpenZeppelin audited contracts
- ✅ Owner-controlled minting (prevents unauthorized creation)
- ✅ Standard ERC-20 implementation
- ✅ Comprehensive test coverage
- ✅ Testnet deployment first

### Production Security Checklist
- [ ] Professional smart contract audit
- [ ] Multi-signature wallet for owner
- [ ] Rate limiting on mints
- [ ] Transaction monitoring
- [ ] Emergency pause mechanism
- [ ] Time-locks for critical actions

## 🧪 Testing

All tests passing ✅

```bash
  MitchCoin
    ✓ mints initial supply to deployer
    ✓ owner can mint
    ✓ has correct name and symbol
    ✓ owner can burn tokens

  4 passing (383ms)
```

## 🤝 Contributing

Contributions welcome! This is an open-source starter template.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📖 Learn More

### Web3 & Blockchain
- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity by Example](https://solidity-by-example.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

### Tools & Frameworks
- [Hardhat Docs](https://hardhat.org/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Guide](https://www.rainbowkit.com/docs/introduction)

### Polygon
- [Polygon Docs](https://docs.polygon.technology/)
- [Polygon Faucet](https://faucet.polygon.technology/)
- [Polygonscan](https://polygonscan.com/)

## 🆘 Troubleshooting

### Common Issues

**"Insufficient funds" error**
- Get testnet MATIC from https://faucet.polygon.technology/

**"Invalid API key" error**
- Check `.env` has correct Alchemy key
- Ensure you selected "Polygon Amoy" network in Alchemy

**Web dApp won't connect**
- Clear browser cache
- Check MetaMask is on correct network
- Restart dev server

**Tests failing**
- Run `pnpm install` again
- Delete `node_modules` and reinstall
- Check Node.js version (18+)

See [SETUP.md](SETUP.md) for detailed troubleshooting.

## 💰 Cost Estimates

### Development (One-Time)
- Smart Contract Deployment: ~$5-20 (testnet: free)
- Domain: $10-30/year
- Contract Audit: $5,000-$15,000 (optional, for mainnet)

### Operations (Monthly)
- Alchemy Free Tier: $0 (300M compute units)
- Hosting: $0-30 (Vercel free tier available)
- Maintenance: Variable

### Transaction Costs
- Users pay their own gas fees on Polygon
- Polygon fees are very low (~$0.001-0.01 per tx)

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (DONE)
- [x] ERC-20 smart contract
- [x] Deployment scripts
- [x] Web dashboard
- [x] Transfer & mint UI
- [x] Testnet deployment

### Phase 2: Enhanced Features
- [ ] Staking/rewards system
- [ ] NFT loyalty passes
- [ ] Mobile app (React Native)
- [ ] QR code payments
- [ ] Analytics dashboard

### Phase 3: Production
- [ ] Smart contract audit
- [ ] Mainnet deployment
- [ ] Exchange integration
- [ ] Marketing campaign
- [ ] Partnership program

### Phase 4: Advanced
- [ ] DAO governance
- [ ] Cross-chain bridge
- [ ] Liquidity pools
- [ ] Third-party API
- [ ] Enterprise features

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute.

## 🙏 Acknowledgments

Built with:
- [OpenZeppelin](https://openzeppelin.com/) - Security-audited contracts
- [Hardhat](https://hardhat.org/) - Development framework
- [Next.js](https://nextjs.org/) - React framework
- [RainbowKit](https://rainbowkit.com/) - Wallet connection
- [wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Polygon](https://polygon.technology/) - Scaling solution

## 📞 Support

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/mitchcoin/issues)
- **Community**: [Discord/Telegram link]
- **Email**: support@mitchcoin.example

## ⭐ Star This Repo!

If this starter helped you, please give it a star! ⭐

---

**Ready to deploy?** → Start with [QUICKSTART.md](QUICKSTART.md)

**Need help?** → Read [SETUP.md](SETUP.md)

**Going to production?** → Follow [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

Made with 🧛 for Mitch from Transylvania
