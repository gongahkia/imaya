"use client"
import { motion } from "framer-motion"

interface WelcomeProps {
  onFinish: () => void
}

export default function Welcome({ onFinish }: WelcomeProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onClick={onFinish}
    >
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
      >
        Imaya
      </motion.h1>
      <motion.p
        className="text-xl text-gray-400"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
      >
        Simplify your day, one task at a time
      </motion.p>
    </motion.div>
  )
}