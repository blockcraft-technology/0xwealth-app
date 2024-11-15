import { MiniKit, SignMessageInput } from '@worldcoin/minikit-js'
import { useState } from 'react';

export const Portfolio = () => {
    const [result, setResult] = useState<any>({});
    const signMessage = async() => {
        const signMessagePayload: SignMessageInput = {
            message: "Hello world",
          };
        
        const {finalPayload} = await MiniKit.commandsAsync.signMessage(signMessagePayload);
        setResult(finalPayload);
    }
            
    return (
        <>
        <h1>Portfolio</h1>
        <button onClick={()=>signMessage()}>Sign Message</button>
        <pre>{JSON.stringify(result)}</pre>
        </>
    )
}