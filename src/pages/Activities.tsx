import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, Clock } from 'lucide-react'
import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { Button } from "../components/ui/button"

const MIN_SATOSHIS = 50
const MAX_SATOSHIS = 400

export const Activities: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [reward, setReward] = useState(0)
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    localStorage.removeItem("nextSpinTime");
    const storedNextSpinTime = localStorage.getItem('nextSpinTime')
    if (storedNextSpinTime) {
      setNextSpinTime(new Date(storedNextSpinTime))
    }

    const interval = setInterval(() => {
      if (nextSpinTime) {
        const now = new Date()
        const difference = nextSpinTime.getTime() - now.getTime()
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        } else {
          setTimeLeft('')
          setNextSpinTime(null)
          localStorage.removeItem('nextSpinTime')
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [nextSpinTime])

  const spinWheel = () => {
    if (isSpinning || nextSpinTime) return

    setIsSpinning(true)
    const randomDegrees = Math.floor(Math.random() * 360) + 720 
    const wheel = document.getElementById('satoshi-wheel')
    if (wheel) {
      wheel.style.transform = `rotate(${randomDegrees}deg)`
    }

    setTimeout(() => {
      const newReward = Math.floor(Math.random() * (MAX_SATOSHIS - MIN_SATOSHIS + 1)) + MIN_SATOSHIS
      setReward(newReward)
      setIsSpinning(false)
      const newNextSpinTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
      setNextSpinTime(newNextSpinTime)
      localStorage.setItem('nextSpinTime', newNextSpinTime.toISOString())
    }, 5000)
  }

  return (
    <div className="h-[calc(100vh-70px)] bg-gray-900 text-gray-100 font-sans">
      <BackgroundPattern />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 overflow-hidden h-full flex flex-col">
        <motion.h2 
          className="text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Spin & Win
        </motion.h2>
        
        <div className="flex-grow flex flex-col items-center justify-center space-y-6">
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div
              id="satoshi-wheel"
              className="w-full h-full rounded-full border-8 border-yellow-400 relative"
              style={{ 
                backgroundImage: `conic-gradient(
                  from 0deg,
                  #FCD34D 0deg 45deg,
                  #FBBF24 45deg 90deg,
                  #F59E0B 90deg 135deg,
                  #D97706 135deg 180deg,
                  #B45309 180deg 225deg,
                  #92400E 225deg 270deg,
                  #78350F 270deg 315deg,
                  #B45309 315deg 360deg
                )`,
                transition: 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
            </div>
          </motion.div>

          {reward > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-yellow-400"
            >
              You won {reward} satoshis!
            </motion.div>
          )}

          {timeLeft ? (
            <div className="flex items-center space-x-2 text-gray-400 text-xl">
              <Clock className="w-6 h-6" />
              <span>Next spin in: {timeLeft}</span>
            </div>
          ) : (
            <Button
              onClick={spinWheel}
              disabled={isSpinning || !!nextSpinTime}
              className="bg-yellow-500 text-gray-900 text-xl font-bold py-6 px-8 hover:bg-yellow-400 transition-colors"
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}