import React from 'react'
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { Bitcoin } from 'lucide-react'

export const Activities: React.FC = () => {
  return (
    <div className="h-[calc(100vh-70px)] bg-gray-900 text-gray-100 font-sans">
      <BackgroundPattern />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 overflow-hidden h-full flex flex-col">
        <h2 className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          Spin & Win
        </h2>
        
        <div className="flex-grow flex flex-col items-center justify-center space-y-6">
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gray-700 rounded-full border-8 border-yellow-400"></div>

          <div className="text-xl text-gray-500">
            Spin the wheel to win rewards
          </div>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Bitcoin className="text-yellow-400 mr-2 h-6 w-6" />
            <span className="text-xl font-semibold">Your Satoshi Balance</span>
          </div>
          <div className="text-3xl font-bold">sats</div>
          <div className="text-sm text-gray-400">≈ USD</div>
        </div>
      </div>
    </div>
  )
}
