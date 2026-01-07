import { ed25519 } from '@noble/curves/ed25519.js';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message); // converts into an array of bytes
        const signature = await signMessage(encodedMessage);//private key does some complex calculation on them giving a 64 charater long string, random looking numbers

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!'); // checks if the signature is valid using you private key

        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    return (
        <div>
            <input id="message" type="text" placeholder="Message" />
            <button onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
};