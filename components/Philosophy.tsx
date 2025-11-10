"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Brain, Heart, Zap, Mountain } from "lucide-react"

interface PhilosophyProps {
  onClose: () => void
}

export default function Philosophy({ onClose }: PhilosophyProps) {
  const sections = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "The Science",
      titleJp: "科学 (Kagaku)",
      content:
        "Research shows that decision fatigue increases with the number of choices. By limiting yourself to 3 tasks per day, you preserve mental energy for execution rather than deliberation. This aligns with the principles of cognitive load theory.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "The Philosophy",
      titleJp: "哲学 (Tetsugaku)",
      content:
        "Inspired by Japanese minimalism and the concept of 'Ma' (間) - the appreciation of space and simplicity. Imaya embraces intentional limitation as a path to clarity and focus, not as a restriction but as liberation from overwhelming choice.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "The Practice",
      titleJp: "練習 (Renshū)",
      content:
        "Each morning, perform your daily ceremony. Select 3 tasks - one from each pool. This ritual transforms task management from a chore into a mindful practice. You're not just organizing work; you're setting intentions for the day.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "The Journey",
      titleJp: "旅 (Tabi)",
      content:
        "Remember: Imaya is a companion, not a taskmaster. Your main to-do list still exists. Imaya helps you extract what matters TODAY. Weekly resets prevent backlog accumulation. The journey of a thousand miles begins with a single, intentional step.",
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-4xl glass-card rounded-2xl shadow-2xl my-8"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>

          <motion.div
            className="text-6xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🌸
          </motion.div>

          <h2 className="text-4xl font-bold font-[family-name:var(--font-noto-sans-jp)] text-white mb-2">
            今や の哲学
          </h2>
          <p className="text-xl text-white/90">The Philosophy of Imaya</p>
          <p className="text-sm text-white/70 mt-4 max-w-2xl mx-auto">
            Understanding the "why" behind intentional task limitation
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-3 pb-6 border-b border-gray-700">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Why Only 3 Tasks?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              In a world of infinite to-do lists, Imaya asks a different question: "What if less is more?"
              The number 3 is deliberate - small enough to prevent overwhelm, large enough to feel accomplished.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl glass-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${section.color}`} />

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-white`}>
                    {section.icon}
                  </div>

                  <div className="flex-grow space-y-2">
                    <h4 className="text-xl font-semibold text-white">
                      {section.title}
                      <span className="text-sm font-normal text-gray-400 ml-3">{section.titleJp}</span>
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            className="mt-8 text-center p-6 glass rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg italic text-gray-300 mb-2">
              "Simplicity is the ultimate sophistication."
            </p>
            <p className="text-sm text-gray-500">— Leonardo da Vinci</p>
          </motion.div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 glass rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h5 className="text-sm font-semibold text-blue-400 mb-1">Focus</h5>
              <p className="text-xs text-gray-400">Do less, achieve more</p>
            </div>
            <div className="text-center p-4 glass rounded-lg">
              <div className="text-3xl mb-2">🧘</div>
              <h5 className="text-sm font-semibold text-purple-400 mb-1">Mindfulness</h5>
              <p className="text-xs text-gray-400">Intentional daily practice</p>
            </div>
            <div className="text-center p-4 glass rounded-lg">
              <div className="text-3xl mb-2">🌊</div>
              <h5 className="text-sm font-semibold text-cyan-400 mb-1">Flow</h5>
              <p className="text-xs text-gray-400">Work with your energy</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Return to Tasks
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
