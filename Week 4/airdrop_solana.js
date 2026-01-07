const {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));

async function airdrop(publicKey, amount) {
    const signature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        amount
    );

    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    return signature;
}

airdrop(
    "8aLb5yok5SJYCTwVVdpAzwnaEbDAVYNebBcwwrkKigNr",
    LAMPORTS_PER_SOL
).then((signature) => {
    console.log("Airdrop signature:", signature);
});
