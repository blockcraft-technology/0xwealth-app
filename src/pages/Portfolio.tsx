import { MiniKit, Network, PayCommandInput, Tokens } from '@worldcoin/minikit-js';
import { useState } from 'react';

export const Portfolio = () => {
    const [result, setResult] = useState<any>({});
    // NOT WORKING!
    const [userInfo, setUserInfo] = useState<any>(null);

    const signMessage = async () => {
        const signMessagePayload = {
            message: "Hello world",
        };

        const { finalPayload } = await MiniKit.commandsAsync.signMessage(signMessagePayload);
        setResult(finalPayload);
    };

    // NOT WORKING!
    const getUserInfo = async () => {
        try {
            const user = await MiniKit.user?.username
            setUserInfo(user);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            setUserInfo({ error: "Unable to fetch user info." });
        }
    };

    const test = async () => {
        try {
            const payload: PayCommandInput = {
                to: "0x732005809d850667428A99ECeE59D90B497cbac3",
                reference: "1",
                network: Network.WorldChain,
                tokens: [{
                    symbol: Tokens.USDCE,
                    token_amount: "10",
                }],
                description: "test",
            }
            const result = await MiniKit.commandsAsync.pay(payload)
            setUserInfo(user);
        } catch (error) {
            console.error("Failed to pay :", error);
            setUserInfo({ error: "Unable to pay." });
        }
    };

    return (
        <>
            <h1 className="text-xl font-bold">Portfolio</h1>
            <button
                onClick={signMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Sign Message
            </button>
            <button
                onClick={test}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Get User Info
            </button>
            <pre className="mt-4 p-2 bg-gray-100 rounded text-sm">
                <strong>Signed Message:</strong> {JSON.stringify(result, null, 2)}
            </pre>
            <pre className="mt-4 p-2 bg-gray-100 rounded text-sm">
                <strong>User Info:</strong> {JSON.stringify(userInfo, null, 2)}
            </pre>
        </>
    );
};
