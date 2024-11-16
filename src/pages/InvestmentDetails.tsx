import { useParams } from "react-router-dom"
import { BackgroundPattern } from "../components/layout/BackgroundPattern";
import { motion } from 'framer-motion'

export const InvestmentDetails: React.FC = () => {
    const { id } = useParams();
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
                    {id}
                </motion.h2>
            </div>  
        </div>
    )
}