"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { TOKEN_ADDRESS } from "@/lib/config";
import abi from "@/app/abi.json";
import { parseUnits, formatUnits } from "viem";

export default function TransferUI() {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Get user's balance
  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined };

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async (e: React.FormEvent) => {
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

      // Check if user has enough balance
      if (balance && amountInWei > balance) {
        setError("Insufficient balance");
        return;
      }

      writeContract({
        address: TOKEN_ADDRESS,
        abi,
        functionName: "transfer",
        args: [recipientAddress, amountInWei],
      });
    } catch (err: any) {
      setError(err.message || "Failed to transfer tokens");
    }
  };

  // Reset form on success
  if (isSuccess) {
    setTimeout(() => {
      setRecipientAddress("");
      setAmount("");
    }, 2000);
  }

  const formattedBalance = balance ? formatUnits(balance, 18) : "0";

  return (
    <div className="card">
      <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
        💸 Transfer MTC
      </h2>

      <div style={{
        background: "#0f0f15",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px",
      }}>
        <div style={{ fontSize: "0.85em", opacity: 0.7 }}>Your Balance</div>
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {formattedBalance} MTC
        </div>
      </div>

      <form onSubmit={handleTransfer} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="number"
              step="0.000001"
              placeholder="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setAmount(formattedBalance)}
              style={{
                background: "#242432",
                padding: "8px 16px",
              }}
            >
              Max
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming || !address || !TOKEN_ADDRESS}
          style={{
            opacity: isPending || isConfirming || !address || !TOKEN_ADDRESS ? 0.6 : 1,
            cursor: isPending || isConfirming || !address || !TOKEN_ADDRESS ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Confirming..." : isConfirming ? "Transferring..." : "Send MTC"}
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
            ✅ Transfer successful!
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

        {!TOKEN_ADDRESS && (
          <div style={{
            background: "#2a1a1a",
            border: "1px solid #8b0000",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "0.9em",
          }}>
            ⚠️ Token not deployed yet. Deploy contract and set NEXT_PUBLIC_TOKEN_ADDRESS in .env.local
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
        <strong>Use cases:</strong>
        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
          <li>Pay for gothic street food</li>
          <li>Send MTC to friends</li>
          <li>Tip content creators</li>
          <li>P2P payments</li>
        </ul>
      </div>
    </div>
  );
}
