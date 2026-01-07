import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from 'react';

export function SendTokens() {
    const { publicKey, sendTransaction } = useWallet(); // Get publicKey to verify we are connected
    const { connection } = useConnection();
    const [status, setStatus] = useState(""); // To show status on screen

    async function sendTokens() {
        if (!publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;

        setStatus("Processing...");

        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(to),
                lamports: parseFloat(amount) * LAMPORTS_PER_SOL, // Use parseFloat to be safe
            }));

            // 1. Send the transaction
            // Note: This returns the "signature" (the Transaction ID)
            const signature = await sendTransaction(transaction, connection);
            console.log("Transaction Sent! Signature:", signature);
            setStatus(`Sent! Waiting for confirmation... (Tx: ${signature.slice(0, 8)}...)`);

            // 2. Wait for the network to actually confirm it
            // This is the step your previous code was missing!
            await connection.confirmTransaction(signature, 'confirmed');
            
            setStatus("Transaction Confirmed! ✅");
            alert("Success! Check your other account now.");

        } catch (error) {
            console.error("Transaction Failed:", error);
            setStatus("Failed! Check console for error.");
            
            // Common error: User rejected request
            if (error.message.includes("User rejected")) {
                alert("You cancelled the transaction.");
            }
        }
    }

    return (
        <div>
            <input id="to" type="text" placeholder="To Address" />
            <input id="amount" type="text" placeholder="Amount (SOL)" />
            <button onClick={sendTokens}>Send SOL</button>
            
            {/* Show status so you aren't guessing */}
            <p style={{ marginTop: '10px' }}>Status: {status}</p>
        </div>
    );
}