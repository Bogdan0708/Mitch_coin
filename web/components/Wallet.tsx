"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonAmoy, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const config = getDefaultConfig({
  appName: "MitchCoin",
  projectId: "MitchCoin-Wallet", // WalletConnect Cloud optional; fine as is for dev
  chains: [polygonAmoy, sepolia],
  ssr: true
});

const queryClient = new QueryClient();

export default function Wallet({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
            <ConnectButton />
          </div>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
