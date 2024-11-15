'use client' // Required for Next.js

import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export default function MiniKitProvider({ children }: { children: ReactNode }) {
    const appId = "app_a8533e587ab2fda886dc159e4b5acc04";
	useEffect(() => {
		MiniKit.install(appId)
	}, [])

	return <>{children}</>
}
