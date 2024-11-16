import React from 'react'
import { motion } from 'framer-motion'

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="20"
              cy="20"
              r="0.5"
              fill="#FFD700"
              fillOpacity="0.1"
              animate={{
                r: [0.5, 0.7, 0.5],
                fillOpacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {[...Array(5)].map((_, i) => (
          <React.Fragment key={`horizontal-wave-${i}`}>
            <motion.path
              d={`M 0 ${50 + i * 200} C 250 ${20 + i * 200}, 350 ${80 + i * 200}, 500 ${50 + i * 200} S 750 ${20 + i * 200}, 1000 ${50 + i * 200}`}
              stroke="#FFD700"
              strokeOpacity="0.05"
              strokeWidth="1"
              fill="none"
              animate={{
                d: [
                  `M 0 ${50 + i * 200} C 250 ${20 + i * 200}, 350 ${80 + i * 200}, 500 ${50 + i * 200} S 750 ${20 + i * 200}, 1000 ${50 + i * 200}`,
                  `M 0 ${60 + i * 200} C 250 ${30 + i * 200}, 350 ${90 + i * 200}, 500 ${60 + i * 200} S 750 ${30 + i * 200}, 1000 ${60 + i * 200}`,
                  `M 0 ${50 + i * 200} C 250 ${20 + i * 200}, 350 ${80 + i * 200}, 500 ${50 + i * 200} S 750 ${20 + i * 200}, 1000 ${50 + i * 200}`,
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.g animate={{ y: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
              {[0, 250, 500, 750, 1000].map((x) => (
                <motion.circle
                  key={`horizontal-dot-${i}-${x}`}
                  cx={x}
                  cy={50 + i * 200}
                  r="2"
                  fill="#FFD700"
                  fillOpacity="0.2"
                />
              ))}
            </motion.g>
          </React.Fragment>
        ))}
        {[...Array(5)].map((_, i) => (
          <React.Fragment key={`vertical-wave-${i}`}>
            <motion.path
              d={`M ${50 + i * 200} 0 C ${20 + i * 200} 250, ${80 + i * 200} 350, ${50 + i * 200} 500 S ${20 + i * 200} 750, ${50 + i * 200} 1000`}
              stroke="#FFD700"
              strokeOpacity="0.05"
              strokeWidth="1"
              fill="none"
              animate={{
                d: [
                  `M ${50 + i * 200} 0 C ${20 + i * 200} 250, ${80 + i * 200} 350, ${50 + i * 200} 500 S ${20 + i * 200} 750, ${50 + i * 200} 1000`,
                  `M ${60 + i * 200} 0 C ${30 + i * 200} 250, ${90 + i * 200} 350, ${60 + i * 200} 500 S ${30 + i * 200} 750, ${60 + i * 200} 1000`,
                  `M ${50 + i * 200} 0 C ${20 + i * 200} 250, ${80 + i * 200} 350, ${50 + i * 200} 500 S ${20 + i * 200} 750, ${50 + i * 200} 1000`,
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.g animate={{ x: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
              {[0, 250, 500, 750, 1000].map((y) => (
                <motion.circle
                  key={`vertical-dot-${i}-${y}`}
                  cx={50 + i * 200}
                  cy={y}
                  r="2"
                  fill="#FFD700"
                  fillOpacity="0.2"
                />
              ))}
            </motion.g>
          </React.Fragment>
        ))}
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>
    </div>
  )
}