"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-8 mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💧🏞️🌊
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-noto-sans-jp)] bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-4">
            今や
          </h1>

          <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-6">
            Imaya - Mindful Task Management
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Cut through the noise of endless to-do lists. Choose 3 tasks per day.
            Focus on what truly matters, now.
          </p>

          <div className="flex justify-center gap-4 pt-8">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg px-8 py-6"
              >
                Start Your Journey
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Sparkles className="mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Three Pools */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { emoji: "💧", title: "Stream", subtitle: "小さい (Chīsai)", desc: "Light, habitual tasks • 15-30 min", gradient: "from-blue-400 to-cyan-400" },
            { emoji: "🏞️", title: "River", subtitle: "中くらい (Chū-kurai)", desc: "Balanced, analytical work • 45-60 min", gradient: "from-cyan-500 to-blue-600" },
            { emoji: "🌊", title: "Ocean", subtitle: "大きい (Ōkii)", desc: "Deep, creative focus • 90+ min", gradient: "from-blue-600 to-indigo-700" },
          ].map((pool, i) => (
            <motion.div
              key={i}
              className="glass-card p-8 rounded-2xl text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-6xl mb-4">{pool.emoji}</div>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${pool.gradient} bg-clip-text text-transparent mb-2`}>
                {pool.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{pool.subtitle}</p>
              <p className="text-gray-300">{pool.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Three Flows */}
        <motion.div
          className="text-center space-y-12 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <h3 className="text-4xl font-bold mb-4">Three Flow Strategies</h3>
            <p className="text-gray-400">三つの流れ (Mittsu no Nagare)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "🐸", name: "Eat That Frog", order: "Large → Medium → Small", desc: "Tackle the hardest first" },
              { emoji: "🗻", name: "Climb The Summit", order: "Medium → Large → Small", desc: "Balanced approach" },
              { emoji: "🏃🏼", name: "Slow Burn", order: "Small → Medium → Large", desc: "Gradual warm-up" },
            ].map((flow, i) => (
              <div key={i} className="glass p-6 rounded-xl">
                <div className="text-5xl mb-3">{flow.emoji}</div>
                <h4 className="text-xl font-semibold text-white mb-2">{flow.name}</h4>
                <p className="text-sm text-cyan-400 mb-2">{flow.order}</p>
                <p className="text-xs text-gray-400">{flow.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          className="glass-card p-12 rounded-2xl text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold">The Philosophy</h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Inspired by Japanese minimalism and the concept of 'Ma' (間) - the appreciation of space and simplicity.
            Imaya embraces intentional limitation as a path to clarity, not as a restriction but as liberation.
          </p>
          <div className="flex justify-center gap-8 pt-6">
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-blue-400">Focus</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🧘</div>
              <p className="text-sm text-purple-400">Mindfulness</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🌊</div>
              <p className="text-sm text-cyan-400">Flow</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center pt-24 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-4xl font-bold">Ready to Focus on What Matters?</h3>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-xl px-12 py-8"
            >
              Begin Your Journey
              <Sparkles className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500">No signup required • Works offline • Free forever</p>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-24">
          <p>Made with ❤️ by <a href="https://github.com/gongahkia" className="underline hover:text-white transition-colors">@gongahkia</a></p>
        </div>
      </div>
    </div>
  )
}
