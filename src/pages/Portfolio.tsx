import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import { BackgroundPattern } from '../components/layout/BackgroundPattern'
import { Link } from 'react-router-dom'
import { RouteEnums } from '../shared/enums/route.enums'

const holdingsData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 15000, change: 2.5 },
  { id: 2, name: 'Dollar', symbol: 'USDC', amount: 1000, value: 1000, change: 0 }
]

export const Portfolio: React.FC = () => {
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const total = holdingsData.reduce((sum, holding) => sum + holding.value, 0)
    setTotalValue(total)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <BackgroundPattern />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <motion.h2 
          className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Investments
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            className="text-5xl font-bold text-yellow-400 inline-flex items-center"
          >
            ${totalValue.toLocaleString()}
            <TrendingUp className="ml-4 text-yellow-500" size={32} />
          </motion.div>
          <p className="text-gray-400 mt-2">Total Portfolio Value</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-left text-yellow-300">Assets</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {holdingsData.map((holding, index) => (
                <motion.div
                    key={holding.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                >
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-yellow-400">{holding.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{holding.amount} {holding.symbol}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${holding.change >= 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {holding.change >= 0 ? (
                        <ArrowUpRight size={20} className="inline mr-1" aria-hidden="true" />
                        ) : (
                        <ArrowDownRight size={20} className="inline mr-1" aria-hidden="true" />
                        )}
                        <span className="font-semibold">{Math.abs(holding.change)}%</span>
                        <span className="sr-only">
                        {holding.change >= 0 ? 'Increase' : 'Decrease'} of {Math.abs(holding.change)}%
                        </span>
                    </div>
                    </div>
                    <div className="text-3xl font-bold text-white mt-2">${holding.value.toLocaleString()}</div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">24h Change</span>
                        <span className="font-medium text-yellow-400">+$1,234.56</span>
                    </div>
                    </div>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}