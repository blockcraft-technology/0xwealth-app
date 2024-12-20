import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bitcoin, DollarSign, Loader2 } from 'lucide-react'
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { Slider } from "../components/ui/slider"
import { MiniKit } from '@worldcoin/minikit-js'
import { useClient } from '../hooks/use-client'

export const Borrow: React.FC = () => {
  const [availableBitcoin, setAvailableBitcoin] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [debug, setDebug] = useState({});
  const [borrowAmount, setBorrowAmount] = useState(0)
  const [repayAmount, setRepayAmount] = useState(0)
  const [isBorrowing, setIsBorrowing] = useState(false)
  const collateralizationRatio = 0.7
  const apy = 0.12
  const { client } = useClient();
  
  useEffect(() => {
    client.getBalance(`0x7e5aec2b002faca46a278025e0c27b4e481cff24`).then(data => {
      const btcHolding = data.find((item: { symbol: string }) => item.symbol == 'BTC');
      setBitcoinPrice(btcHolding.assetPrice);
      setAvailableBitcoin(btcHolding.amount);
    });
  }, []);
  
  useEffect(() => {
    const maxBorrowAmount = availableBitcoin * bitcoinPrice * collateralizationRatio
    setBorrowAmount(maxBorrowAmount)
    setRepayAmount(maxBorrowAmount * (1 + apy))
  }, [availableBitcoin, bitcoinPrice])

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

  const calculateBtcToLock = (borrowAmount: number, bitcoinPrice: number, collateralizationRatio: number) => {
    return borrowAmount / (bitcoinPrice * collateralizationRatio);
  };

  const sendTransaction = async () => {
    setIsBorrowing(true);
    const btcToLock = calculateBtcToLock(borrowAmount, bitcoinPrice, collateralizationRatio);
    const btcToLockInUnits = (btcToLock * 10 ** 8).toFixed(0);
    
    if (!MiniKit.isInstalled()) {
      setIsBorrowing(false);
      return;
    }

    const tokenAddress = "0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3";
    try {
      await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: tokenAddress,
            abi: [
              {
                "inputs": [
                  { "internalType": "address", "name": "recipient", "type": "address" },
                  { "internalType": "uint256", "name": "amount", "type": "uint256" }
                ],
                "name": "transfer",
                "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ],
            functionName: "transfer",
            args: [
              "0xeA5FF5250f5aFd7A7E8984a8516a0A5aBd1e16ce",
              btcToLockInUnits
            ]
          },
        ]
      });
      // Simulating a delay for the borrowing process
      setTimeout(() => {
        setIsBorrowing(false);
        // Here you would typically update the UI to show the borrowing was successful
      }, 5000);
    } catch (e: any) {
      setDebug({ data: e.toString()});
      setIsBorrowing(false);
    }
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
        
        <AnimatePresence mode="wait">
          {isBorrowing ? (
            <motion.div
              key="borrowing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col items-center justify-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-16 h-16 text-yellow-400" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-center"
              >
                Borrowing in progress
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-400 text-center"
              >
                Waiting for confirmation
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="borrowForm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col space-y-4 mb-4"
            >
              <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Bitcoin className="text-yellow-400 mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">Available Bitcoin</span>
                </div>
                <div className="text-2xl font-bold">{availableBitcoin} BTC</div>
                <div className="text-xs text-gray-400">≈ ${(availableBitcoin * bitcoinPrice).toLocaleString()} USD</div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <DollarSign className="text-green-400 mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">Borrow</span>
                </div>
                <div className="text-xs text-gray-400 mb-4">70% of collateral</div>
                <Slider
                  defaultValue={[borrowAmount]}
                  max={availableBitcoin * bitcoinPrice * collateralizationRatio}
                  step={5}
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendTransaction}
          disabled={isBorrowing}
        >
          {isBorrowing ? 'Borrowing in Progress...' : 'Borrow'}
        </motion.button>
      </div>
    </div>
  )
}