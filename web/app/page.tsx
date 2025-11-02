"use client";

import { useState } from "react";
import Wallet from "@/components/Wallet";
import MintUI from "@/components/MintUI";
import TransferUI from "@/components/TransferUI";
import { TOKEN_ADDRESS } from "@/lib/config";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import abi from "./abi.json";

export default function Page() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"overview" | "transfer" | "mint">("overview");

  // Get user's balance
  const { data: balance, refetch } = useReadContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined; refetch: () => void };

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "totalSupply",
  }) as { data: bigint | undefined };

  // Get contract owner
  const { data: owner } = useReadContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "owner",
  }) as { data: string | undefined };

  const formattedBalance = balance ? formatUnits(balance, 18) : "0";
  const formattedTotalSupply = totalSupply ? formatUnits(totalSupply, 18) : "0";
  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  // Auto-refresh balance every 10 seconds
  useState(() => {
    const interval = setInterval(() => {
      if (isConnected && TOKEN_ADDRESS) {
        refetch();
      }
    }, 10000);
    return () => clearInterval(interval);
  });

  const tabs = [
    { id: "overview" as const, label: "📊 Overview", show: true },
    { id: "transfer" as const, label: "💸 Transfer", show: isConnected },
    { id: "mint" as const, label: "🎁 Mint", show: isOwner },
  ];

  return (
    <Wallet>
      <div className="container">
        {/* Header */}
        <div className="card">
          <h1>MitchCoin (MTC)</h1>
          <p style={{ fontSize: "1.1em", opacity: 0.9 }}>
            Gothic street food loyalty token from Transylvania 🧛
          </p>
        </div>

        {/* Token Not Deployed Warning */}
        {(!TOKEN_ADDRESS || TOKEN_ADDRESS === "") && (
          <div style={{
            background: "#2a1a1a",
            border: "1px solid #8b0000",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
          }}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>⚠️ Token Not Yet Deployed</h2>
            <p>Follow these steps to deploy your MitchCoin token:</p>
            <ol style={{ paddingLeft: "20px", marginTop: "12px" }}>
              <li>Get test funds from <a href="https://faucet.polygon.technology/" target="_blank">Polygon Faucet</a></li>
              <li>Get an API key from <a href="https://www.alchemy.com/" target="_blank">Alchemy</a></li>
              <li>Update <code>.env</code> with your private key and API key</li>
              <li>Run: <code>pnpm deploy:amoy</code></li>
              <li>Update <code>web/.env.local</code> with the deployed token address</li>
              <li>Restart the dev server: <code>pnpm web:dev</code></li>
            </ol>
          </div>
        )}

        {/* Tab Navigation */}
        {TOKEN_ADDRESS && TOKEN_ADDRESS !== "" && (
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}>
            {tabs.filter(tab => tab.show).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "var(--accent)" : "#242432",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: activeTab === tab.id ? "1px solid var(--accent)" : "1px solid #242432",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && TOKEN_ADDRESS && TOKEN_ADDRESS !== "" && (
          <>
            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}>
              {/* Your Balance */}
              <div className="card" style={{
                background: "linear-gradient(135deg, #1a1a24 0%, #141419 100%)",
              }}>
                <div style={{ fontSize: "0.85em", opacity: 0.7, marginBottom: "8px" }}>
                  Your Balance
                </div>
                <div style={{ fontSize: "2em", fontWeight: "bold", marginBottom: "4px" }}>
                  {formattedBalance}
                </div>
                <div style={{ fontSize: "0.9em", opacity: 0.7 }}>MTC</div>
              </div>

              {/* Total Supply */}
              <div className="card" style={{
                background: "linear-gradient(135deg, #241a1a 0%, #141419 100%)",
              }}>
                <div style={{ fontSize: "0.85em", opacity: 0.7, marginBottom: "8px" }}>
                  Total Supply
                </div>
                <div style={{ fontSize: "2em", fontWeight: "bold", marginBottom: "4px" }}>
                  {formattedTotalSupply}
                </div>
                <div style={{ fontSize: "0.9em", opacity: 0.7 }}>MTC</div>
              </div>

              {/* Contract Address */}
              <div className="card">
                <div style={{ fontSize: "0.85em", opacity: 0.7, marginBottom: "8px" }}>
                  Token Contract
                </div>
                <div style={{ fontSize: "0.75em", wordBreak: "break-all", marginBottom: "8px" }}>
                  <code>{TOKEN_ADDRESS}</code>
                </div>
                <a
                  href={`https://amoy.polygonscan.com/token/${TOKEN_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.85em" }}
                >
                  View on Polygonscan →
                </a>
              </div>
            </div>

            {/* Wallet Status */}
            <div className="card">
              <h2 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>👛 Wallet Status</h2>
              {isConnected ? (
                <>
                  <p><strong>Connected Address:</strong></p>
                  <p><code>{address}</code></p>
                  {isOwner && (
                    <div style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: "#1a2a1a",
                      border: "1px solid #008b00",
                      borderRadius: "8px",
                    }}>
                      ✅ <strong>You are the contract owner</strong> - You can mint new tokens!
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  padding: "16px",
                  background: "#2a2a1a",
                  border: "1px solid #6b6b00",
                  borderRadius: "8px",
                }}>
                  ⚠️ Connect your wallet using the button in the top-right corner
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>⚡ Quick Actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => setActiveTab("transfer")}
                  disabled={!isConnected}
                  style={{
                    opacity: !isConnected ? 0.6 : 1,
                    cursor: !isConnected ? "not-allowed" : "pointer",
                    textAlign: "left",
                  }}
                >
                  💸 Transfer MTC to another address
                </button>
                {isOwner && (
                  <button
                    onClick={() => setActiveTab("mint")}
                    style={{ textAlign: "left" }}
                  >
                    🎁 Mint new tokens (Owner only)
                  </button>
                )}
                <button
                  onClick={() => {
                    window.open(
                      `https://amoy.polygonscan.com/token/${TOKEN_ADDRESS}`,
                      "_blank"
                    );
                  }}
                  style={{ textAlign: "left", background: "#242432" }}
                >
                  🔍 View on Polygonscan
                </button>
              </div>
            </div>
          </>
        )}

        {/* Transfer Tab */}
        {activeTab === "transfer" && <TransferUI />}

        {/* Mint Tab */}
        {activeTab === "mint" && isOwner && <MintUI />}

        {/* Footer Info */}
        <div className="card" style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>🧛 About MitchCoin</h3>
          <p style={{ fontSize: "0.9em", lineHeight: "1.6" }}>
            MitchCoin (MTC) is a loyalty and payment token for Mitch from Transylvania's gothic street food empire.
            Earn MTC through purchases and loyalty programs, then spend it at participating locations or trade with friends.
          </p>
          <div style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
            fontSize: "0.85em",
            opacity: 0.7,
          }}>
            <strong>Network:</strong> Polygon Amoy Testnet (Chain ID: 80002)
          </div>
        </div>
      </div>
    </Wallet>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
