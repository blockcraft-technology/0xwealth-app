'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, DollarSign } from 'lucide-react'
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { Slider } from "../components/ui/slider"

export const Borrow: React.FC = () => {
  const [availableBitcoin, setAvailableBitcoin] = useState(1)
  const [borrowAmount, setBorrowAmount] = useState(0)
  const [repayAmount, setRepayAmount] = useState(0)
  const collateralizationRatio = 0.7
  const apy = 0.12

  useEffect(() => {
    const maxBorrowAmount = availableBitcoin * 50000 * collateralizationRatio
    setBorrowAmount(maxBorrowAmount)
    setRepayAmount(maxBorrowAmount * (1 + apy))
  }, [availableBitcoin])

  const handleBorrowChange = (value: number[]) => {
    const newBorrowAmount = value[0]
    setBorrowAmount(newBorrowAmount)
    setRepayAmount(newBorrowAmount * (1 + apy))
  }

  const dailyInterest = (borrowAmount * apy) / 365
  const monthlyInterest = (borrowAmount * apy) / 12

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="h-[calc(100vh-70px)] bg-gray-900 text-gray-100 font-sans overflow-hidden">
      <BackgroundPattern />
      <div className="relative z-10 h-full flex flex-col px-4 py-6">
        <motion.h2 
                className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                    Borrow
         </motion.h2>
        
        <div className="flex-grow flex flex-col space-y-4 mb-4">
          <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Bitcoin className="text-yellow-400 mr-2 h-5 w-5" />
              <span className="text-lg font-semibold">Available Bitcoin</span>
            </div>
            <div className="text-2xl font-bold">{availableBitcoin} BTC</div>
            <div className="text-xs text-gray-400">≈ ${(availableBitcoin * 50000).toLocaleString()} USD</div>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center mb-3">
              <DollarSign className="text-green-400 mr-2 h-5 w-5" />
              <span className="text-lg font-semibold">Borrow</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">70% of collateral</div>
            <Slider
              defaultValue={[borrowAmount]}
              max={availableBitcoin * 50000 * collateralizationRatio}
              step={100}
              onValueChange={handleBorrowChange}
              className="w-full"
            />
            <div className="text-2xl font-bold mt-4">${borrowAmount.toLocaleString()}</div>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <DollarSign className="text-red-400 mr-2 h-5 w-5" />
              <span className="text-lg font-semibold">Repayment</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">12% APY</div>
            <div className="text-2xl font-bold mt-1">${repayAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">After 1 year</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Monthly Interest:</span>
                <div className="font-semibold">${monthlyInterest.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400">Daily Interest:</span>
                <div className="font-semibold">${dailyInterest.toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button 
          className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Confirm Borrow
        </motion.button>
      </div>
    </div>
  )
}