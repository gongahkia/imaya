"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated water drops */}
      <div className="relative w-48 h-48">
        <motion.div
          className="absolute top-0 left-1/4 text-6xl"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💧
        </motion.div>
        <motion.div
          className="absolute top-1/4 left-1/2 text-6xl"
          animate={{
            y: [0, -25, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          🏞️
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 text-6xl"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          🌊
        </motion.div>
      </div>

      {/* Empty state text */}
      <motion.div
        className="text-center space-y-3 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-[family-name:var(--font-noto-sans-jp)]">
          空白のキャンバス (Kūhaku no Kyanbasu)
        </h3>
        <p className="text-gray-400 text-lg">A blank canvas awaits</p>
        <motion.div
          className="text-sm text-gray-500 space-y-2 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            Choose one task from each pool
          </p>
          <p className="text-xs">Maximum 9 tasks, but select only 3 per day</p>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </motion.div>
    </motion.div>
  )
}
