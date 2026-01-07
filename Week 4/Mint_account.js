const { createMint } = require("@solana/spl-token");
const { Keypair, Connection, clusterApiUrl } = require("@solana/web3.js");

const payer = Keypair.fromSecretKey(
    Uint8Array.from(process.env.PRIVATE_KEY) //private key
);

const mintAuthority = payer;
const connection = new Connection(clusterApiUrl("devnet"));

async function createMintForToken(payer, mintAuthority) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        6
    );

    console.log("Mint created at:", mint.toBase58());
    return mint;
}

async function main() {
    try {
        await createMintForToken(payer, mintAuthority.publicKey);
    } catch (error) {
        console.error("Error creating mint:", error.message);
    }
}

main();
