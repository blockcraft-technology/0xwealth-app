import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export default function MiniKitProvider({ children }: { children: ReactNode }) {
    const appId = "a8533e587ab2fda886dc159e4b5acc04";
	useEffect(() => {
		MiniKit.install(appId)
	}, [])

	return <>{children}</>
}