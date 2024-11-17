import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, TrendingUp, Loader2 } from 'lucide-react'
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { Slider } from "../components/ui/slider"
import { MiniKit, Tokens } from '@worldcoin/minikit-js'
import { useClient } from '../hooks/use-client'

export const Lend: React.FC = () => {
  const [availableUSDC, setAvailableUSDC] = useState(0)
  const [debug, setDebug] = useState<any>({});
  const [lendAmount, setLendAmount] = useState(0)
  const [isLending, setIsLending] = useState(false)
  const maxApy = 0.10

  const { client } = useClient();

  useEffect(() => {
    const fetchUSDCBalance = async () => {
      try {
        const data = await client.getBalance(`0x7e5aec2b002faca46a278025e0c27b4e481cff24`);
        const usdcHolding = data.find((item: { symbol: string }) => item.symbol === 'USDC');
        if (usdcHolding) {
          setAvailableUSDC(usdcHolding.amount);
          setLendAmount(0);
        }
      } catch (error) {
        console.error('Error fetching USDC balance:', error);
      }
    };

    fetchUSDCBalance();
  }, [client]);

  const handleLendChange = (value: number[]) => {
    setLendAmount(value[0])
  }

  const confirmLending = async () => {
    setIsLending(true);
    const referenceId = Math.random().toString(36).substring(2, 10);
    const amount = (Math.ceil(lendAmount) * 10 ** 6).toFixed(0);

    try {
      const result = await MiniKit.commandsAsync.pay({
        reference: referenceId,
        to: '0xeA5FF5250f5aFd7A7E8984a8516a0A5aBd1e16ce', // Lending pool address
        tokens: [
          {
            symbol: Tokens.USDCE,
            token_amount: amount,
          },
        ],
        description: `Lending USDC - Lending ID: ${referenceId}`,
      });
      setDebug(result);
      await client.reportLendingPayload(result.finalPayload);
      // Simulating a delay for the lending process
    //   setTimeout(() => {
    //     setIsLending(false);
    //   }, 5000);
    } catch (error) {
      console.error('Error during lending:', error);
      alert('Failed to lend USDC. Check console for details.');
      setIsLending(false);
    }
  };

  const estimatedApy = 0.1;
  const estimatedEarnings = lendAmount * estimatedApy
  const monthlyEarnings = estimatedEarnings / 12
  const dailyEarnings = estimatedEarnings / 365

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
          Lend
        </motion.h2>
        
        <AnimatePresence mode="wait">
          {isLending ? (
            <motion.div
              key="lending"
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
                Lending in progress
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
              key="lendingForm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col space-y-4 mb-4"
            >
              <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <DollarSign className="text-green-400 mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">Available USDC</span>
                </div>
                <div className="text-2xl font-bold">${availableUSDC.toLocaleString()} USDC</div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <DollarSign className="text-yellow-400 mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">Lend</span>
                </div>
                <div className="text-xs text-gray-400 mb-4">Up to 10% APY</div>
                <Slider
                  defaultValue={[lendAmount]}
                  max={availableUSDC}
                  step={5}
                  onValueChange={handleLendChange}
                  className="w-full"
                />
                <div className="text-2xl font-bold mt-4">${lendAmount.toLocaleString()} USDC</div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <TrendingUp className="text-green-400 mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold">Estimated Returns</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{(estimatedApy * 100).toFixed(2)}% APY</div>
                <div className="text-2xl font-bold mt-1">${estimatedEarnings.toLocaleString()} USDC</div>
                <div className="text-xs text-gray-400">After 1 year</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Monthly Earnings:</span>
                    <div className="font-semibold">${monthlyEarnings.toLocaleString()} USDC</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Daily Earnings:</span>
                    <div className="font-semibold">${dailyEarnings.toLocaleString()} USDC</div>
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
          onClick={confirmLending}
          disabled={isLending}
        >
          {isLending ? 'Lending in Progress...' : 'Start Lending'}
        </motion.button>
      </div>
    </div>
  )
}