"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TOKEN_ADDRESS } from "@/lib/config";
import abi from "@/app/abi.json";
import { parseUnits } from "viem";

export default function MintUI() {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!recipientAddress || !amount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Validate address format
      if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        setError("Invalid Ethereum address");
        return;
      }

      // Parse amount (convert to wei with 18 decimals)
      const amountInWei = parseUnits(amount, 18);

      writeContract({
        address: TOKEN_ADDRESS,
        abi,
        functionName: "mint",
        args: [recipientAddress, amountInWei],
      });
    } catch (err: any) {
      setError(err.message || "Failed to mint tokens");
    }
  };

  // Reset form on success
  if (isSuccess) {
    setTimeout(() => {
      setRecipientAddress("");
      setAmount("");
    }, 2000);
  }

  return (
    <div className="card">
      <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
        🎁 Mint Tokens (Owner Only)
      </h2>

      <form onSubmit={handleMint} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
            Recipient Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
            Amount (MTC)
          </label>
          <input
            type="number"
            step="0.000001"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming || !address}
          style={{
            opacity: isPending || isConfirming || !address ? 0.6 : 1,
            cursor: isPending || isConfirming || !address ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Confirming..." : isConfirming ? "Minting..." : "Mint Tokens"}
        </button>

        {error && (
          <div style={{
            background: "#2a1a1a",
            border: "1px solid #8b0000",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "0.9em",
          }}>
            ❌ {error}
          </div>
        )}

        {isSuccess && (
          <div style={{
            background: "#1a2a1a",
            border: "1px solid #008b00",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "0.9em",
          }}>
            ✅ Tokens minted successfully!
            {hash && (
              <div style={{ marginTop: "8px" }}>
                <a
                  href={`https://amoy.polygonscan.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.85em" }}
                >
                  View on Polygonscan →
                </a>
              </div>
            )}
          </div>
        )}

        {!address && (
          <div style={{
            background: "#2a2a1a",
            border: "1px solid #6b6b00",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "0.9em",
          }}>
            ⚠️ Connect your wallet first
          </div>
        )}
      </form>

      <div style={{
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid var(--border)",
        fontSize: "0.85em",
        opacity: 0.7,
      }}>
        <strong>Note:</strong> Only the contract owner can mint tokens. Use this for:
        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
          <li>Loyalty rewards for customers</li>
          <li>Promotional airdrops</li>
          <li>Event bonuses</li>
        </ul>
      </div>
    </div>
  );
}
