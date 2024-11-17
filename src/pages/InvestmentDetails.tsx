import React, { useState, useMemo } from 'react'
import { useParams } from "react-router-dom"
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, BarChart2, Wallet, X } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import { Slider } from "../components/ui/slider"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

// Mock data for the asset
const assetData = {
  name: 'Bitcoin',
  symbol: 'BTC',
  currentPrice: 91724,
  change24h: 2.5,
  amount: 0.5,
  value: 45862,
  avgBuyPrice: 80000,
  history: [
    { date: '2024-11-11', price: 88740 },
    { date: '2023-11-12', price: 88070 },
    { date: '2023-11-13', price: 90499 },
    { date: '2023-11-14', price: 87316 },
    { date: '2023-11-15', price: 82316 },
    { date: '2023-11-16', price: 91724 },
  ]
}

const BottomDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-end justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-gray-800 rounded-t-xl p-6 w-full max-w-xl h-3/4 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export const InvestmentDetails: React.FC = () => {
  const { id } = useParams()
  const [isBuyDrawerOpen, setIsBuyDrawerOpen] = useState(false)
  const [isSellDrawerOpen, setIsSellDrawerOpen] = useState(false)
  const [amount, setAmount] = useState(0)

  const [minPrice, maxPrice] = useMemo(() => {
    const prices = assetData.history.map(item => item.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [])

  const profitLoss = assetData.value - (assetData.amount * assetData.avgBuyPrice)
  const profitLossPercentage = (profitLoss / (assetData.amount * assetData.avgBuyPrice)) * 100

  const handleTransaction = (type: 'buy' | 'sell') => {
    console.log(`${type.toUpperCase()} ${amount} ${assetData.symbol}`)
    setAmount(0)
    type === 'buy' ? setIsBuyDrawerOpen(false) : setIsSellDrawerOpen(false)
  }

  const handleAmountChange = (value: number) => {
    setAmount(Math.min(Math.max(value, 0), assetData.amount))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <BackgroundPattern />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 overflow-hidden">
        <motion.h2 
          className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {assetData.name} ({assetData.symbol})
        </motion.h2>

        <div className="mb-6 -mx-8 overflow-hidden" style={{ width: 'calc(100% + 6rem)', marginLeft: '-5rem' }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={assetData.history} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <YAxis 
                domain={[minPrice * 0.99, maxPrice * 1.01]} 
                tickFormatter={(value) => ``}
                visibility={0}
              />
              <Area 
                type="monotone"
                dataKey="price" 
                stroke="#FFD700" 
                fill="url(#colorPrice)"
                strokeWidth={2}
                baseLine={minPrice}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Wallet className="mr-2 text-yellow-400" />
              Your Holdings
            </h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="font-semibold">{assetData.amount} {assetData.symbol}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Current Value:</span>
                <span className="font-semibold">${assetData.value.toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Avg. Buy Price:</span>
                <span className="font-semibold">${assetData.avgBuyPrice.toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Profit/Loss:</span>
                <span className={`font-semibold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.abs(profitLoss).toLocaleString()} ({profitLossPercentage.toFixed(2)}%)
                </span>
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setIsBuyDrawerOpen(true)}
              >
                Buy
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setIsSellDrawerOpen(true)}
              >
                Sell
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BarChart2 className="mr-2 text-yellow-400" />
              Asset Performance
            </h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-400">Current Price:</span>
                <span className="font-semibold">${assetData.currentPrice.toLocaleString()}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-400">24h Change:</span>
                <span className={`flex items-center ${assetData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {assetData.change24h >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                  {Math.abs(assetData.change24h)}%
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">24h High:</span>
                <span className="font-semibold">${Math.max(...assetData.history.map(item => item.price)).toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">24h Low:</span>
                <span className="font-semibold">${Math.min(...assetData.history.map(item => item.price)).toLocaleString()}</span>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <DollarSign className="mr-2 text-yellow-400" />
            Market Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-400">Market Cap:</span>
                <span className="font-semibold">$800B</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">24h Volume:</span>
                <span className="font-semibold">$30B</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-400">Circulating Supply:</span>
                <span className="font-semibold">18.7M BTC</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">All-Time High:</span>
                <span className="font-semibold">$69,000 (Nov 10, 2021)</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomDrawer isOpen={isBuyDrawerOpen} onClose={() => setIsBuyDrawerOpen(false)} title={`Buy ${assetData.symbol}`}>
        <div className="space-y-6">
          <div>
            <label htmlFor="buyAmount" className="block text-lg font-medium text-gray-300 mb-2">
              Amount to buy
            </label>
            <Input
              type="number"
              id="buyAmount"
              value={amount}
              onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
              className="w-full text-lg"
              placeholder={`Enter amount in ${assetData.symbol}`}
            />
          </div>
          <div className="space-y-2">
            <Slider
              value={[amount]}
              onValueChange={(value) => handleAmountChange(value[0])}
              max={assetData.amount * 2}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>0 {assetData.symbol}</span>
              <span>{(assetData.amount * 2).toFixed(2)} {assetData.symbol}</span>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-lg text-gray-300 mb-2">Transaction Summary</p>
            <p className="flex justify-between">
              <span>Amount:</span>
              <span>{amount.toFixed(4)} {assetData.symbol}</span>
            </p>
            <p className="flex justify-between">
              <span>Price per {assetData.symbol}:</span>
              <span>${assetData.currentPrice.toLocaleString()}</span>
            </p>
            <p className="flex justify-between font-bold mt-2">
              <span>Total cost:</span>
              <span>${(amount * assetData.currentPrice).toLocaleString()}</span>
            </p>
          </div>
          <Button
            onClick={() => handleTransaction('buy')}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3"
          >
            Confirm Purchase
          </Button>
        </div>
      </BottomDrawer>

      <BottomDrawer isOpen={isSellDrawerOpen} onClose={() => setIsSellDrawerOpen(false)} title={`Sell ${assetData.symbol}`}>
        <div className="space-y-6">
          <div>
            <label htmlFor="sellAmount" className="block text-lg font-medium text-gray-300 mb-2">
              Amount to sell
            </label>
            <Input
              type="number"
              id="sellAmount"
              value={amount}
              onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
              className="w-full text-lg"
              placeholder={`Enter amount in ${assetData.symbol}`}
            />
          </div>
          <div className="space-y-2">
            <Slider
              value={[amount]}
              onValueChange={(value) => handleAmountChange(value[0])}
              max={assetData.amount}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>0 {assetData.symbol}</span>
              <span>{assetData.amount.toFixed(2)} {assetData.symbol}</span>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-lg text-gray-300 mb-2">Transaction Summary</p>
            <p className="flex justify-between">
              <span>Amount:</span>
              <span>{amount.toFixed(4)} {assetData.symbol}</span>
            </p>
            <p className="flex justify-between">
              <span>Price per {assetData.symbol}:</span>
              <span>${assetData.currentPrice.toLocaleString()}</span>
            </p>
            <p className="flex justify-between font-bold mt-2">
              <span>Total value:</span>
              <span>${(amount * assetData.currentPrice).toLocaleString()}</span>
            </p>
          </div>
          <Button
            onClick={() => handleTransaction('sell')}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-3"
          >
            Confirm Sale
          </Button>
        </div>
      </BottomDrawer>
    </div>
  )
}