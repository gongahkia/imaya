"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

interface TutorialStep {
  title: string
  titleJp: string
  description: string
  icon: string
  position: "center" | "top" | "bottom"
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Imaya",
    titleJp: "ようこそ (Yōkoso)",
    description: "今や (Imaya) means 'now' in Japanese. This app helps you focus on what matters today, cutting through the noise of endless to-do lists.",
    icon: "🌸",
    position: "center"
  },
  {
    title: "The Problem",
    titleJp: "問題 (Mondai)",
    description: "Ever opened your to-do list and felt overwhelmed by 46+ items? Task overload leads to anxiety, poor time management, and burnout. We're here to change that.",
    icon: "😰",
    position: "center"
  },
  {
    title: "Three Pools of Water",
    titleJp: "三つの水 (Mittsu no Mizu)",
    description: "Tasks are categorized by time and focus:\n\n💧 Stream (Small): 15-30 min - Light, habitual tasks\n🏞️ River (Medium): 45-60 min - Balanced, analytical work\n🌊 Ocean (Large): 90+ min - Deep, creative focus",
    icon: "💧",
    position: "center"
  },
  {
    title: "The Golden Rule",
    titleJp: "黄金律 (Ōgonritsu)",
    description: "Choose only 3 tasks per day - ONE from each pool. This intentional limitation forces prioritization and prevents overcommitment.",
    icon: "✨",
    position: "center"
  },
  {
    title: "Three Flow Strategies",
    titleJp: "三つの流れ (Mittsu no Nagare)",
    description: "🐸 Eat That Frog: Large → Medium → Small (Hardest first)\n🗻 Climb The Summit: Medium → Large → Small (Balanced)\n🏃 Slow Burn: Small → Medium → Large (Gradual warm-up)",
    icon: "🐸",
    position: "center"
  },
  {
    title: "You're Ready!",
    titleJp: "準備完了 (Junbi Kanryō)",
    description: "Start by creating your first task. Remember: this is a companion to your existing to-do app, not a replacement. Focus on today, and let tomorrow worry about itself.",
    icon: "🚀",
    position: "center"
  }
]

interface TutorialProps {
  onComplete: () => void
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skip = () => {
    onComplete()
  }

  const step = tutorialSteps[currentStep]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="relative w-full max-w-2xl mx-4 p-8 glass-card rounded-2xl shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <Button
            onClick={skip}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Progress indicator */}
          <div className="flex gap-2 mb-6">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-blue-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <motion.div
            className="text-7xl text-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.1 }}
          >
            {step.icon}
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center space-y-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-noto-sans-jp)] bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {step.titleJp}
            </h2>
            <h3 className="text-xl text-gray-300">{step.title}</h3>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-center leading-relaxed mb-8 whitespace-pre-line"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {step.description}
          </motion.p>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={prevStep}
              variant="ghost"
              disabled={currentStep === 0}
              className="disabled:opacity-30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <span className="text-sm text-gray-400">
              {currentStep + 1} / {tutorialSteps.length}
            </span>

            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  Start
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
