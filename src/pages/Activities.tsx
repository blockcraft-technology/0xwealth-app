import { BackgroundPattern } from "../components/layout/BackgroundPattern"
import { motion } from 'framer-motion'

export const Activities: React.FC = () => {
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
                    Activities
                </motion.h2>
            </div>
        </div>
    )
}