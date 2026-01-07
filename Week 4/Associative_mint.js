const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo
} = require("@solana/spl-token");

const {
    Keypair,
    Connection,
    clusterApiUrl,
    PublicKey
} = require("@solana/web3.js");

// hard-coded payer (kept as requested)
const payer = Keypair.fromSecretKey(
    Uint8Array.from([
       // private key
    ])
);

const mintAthority = payer;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

async function createMintForToken(payer, mintAuthority) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        6
    );

    // allow devnet RPC to finalize & index the mint
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Mint created at:", mint.toBase58());
    return mint;
}

async function mintNewTokens(mint, to, amount) {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to)
    );

    console.log(
        "Token account:",
        tokenAccount.address.toBase58()
    );

    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        mintAthority,
        amount
    );

    console.log(
        "Minted",
        amount,
        "base units to",
        tokenAccount.address.toBase58()
    );
}

async function main() {
    try {
        const mint = await createMintForToken(
            payer,
            mintAthority.publicKey
        );

        // decimals = 6 → 1 token = 1_000_000
        await mintNewTokens(
            mint,
            mintAthority.publicKey,
            100 * 1_000_000
        );

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
