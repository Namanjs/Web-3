import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { AlphaWalletAdapter } from "@solana/wallet-adapter-wallets";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function Airdrop() {

    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirDrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }
    return(
        <>
            <div>
                <input type="text" id="amount" placeholder="Amount"/>
                <button onClick={requestAirDrop}>Request AirDrop</button>
            </div>
        </>
    )
}