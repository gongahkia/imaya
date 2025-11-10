"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Sun, Sunrise } from "lucide-react"

interface TaskData {
  id: string
  date: string
  flowType: string
  taskType: "small" | "medium" | "large"
  taskValue: string
  status: "pending" | "completed"
}

interface DailyCeremonyProps {
  tasks: TaskData[]
  onComplete: (selectedTasks: string[]) => void
  onSkip: () => void
}

export default function DailyCeremony({ tasks, onComplete, onSkip }: DailyCeremonyProps) {
  const [selectedTasks, setSelectedTasks] = useState<{ [key: string]: string | null }>({
    small: null,
    medium: null,
    large: null,
  })

  const smallTasks = tasks.filter((t) => t.taskType === "small" && t.status === "pending")
  const mediumTasks = tasks.filter((t) => t.taskType === "medium" && t.status === "pending")
  const largeTasks = tasks.filter((t) => t.taskType === "large" && t.status === "pending")

  const handleTaskSelect = (taskType: "small" | "medium" | "large", taskId: string) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [taskType]: prev[taskType] === taskId ? null : taskId,
    }))
  }

  const handleComplete = () => {
    const selected = Object.values(selectedTasks).filter((id) => id !== null) as string[]
    onComplete(selected)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: "Good Morning", jp: "おはようございます (Ohayō Gozaimasu)", icon: <Sunrise /> }
    if (hour < 18) return { text: "Good Afternoon", jp: "こんにちは (Konnichiwa)", icon: <Sun /> }
    return { text: "Good Evening", jp: "こんばんは (Konbanwa)", icon: <Sparkles /> }
  }

  const greeting = getGreeting()
  const selectedCount = Object.values(selectedTasks).filter((id) => id !== null).length

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-4xl glass-card rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center space-y-3">
          <motion.div
            className="text-5xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {greeting.icon}
          </motion.div>
          <h2 className="text-3xl font-bold font-[family-name:var(--font-noto-sans-jp)] text-white">
            {greeting.jp}
          </h2>
          <p className="text-blue-100">{greeting.text}</p>
          <p className="text-sm text-blue-200 mt-4">
            Today's Daily Selection Ceremony
            <br />
            <span className="text-xs">一日の儀式 (Ichinichi no Gishiki)</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2 mb-6">
            <p className="text-gray-300">
              Choose your 3 tasks for today - one from each pool
            </p>
            <div className="flex justify-center gap-2 text-sm">
              <span className={selectedTasks.small ? "text-blue-400" : "text-gray-600"}>💧 Stream</span>
              <span className="text-gray-600">•</span>
              <span className={selectedTasks.medium ? "text-blue-400" : "text-gray-600"}>🏞️ River</span>
              <span className="text-gray-600">•</span>
              <span className={selectedTasks.large ? "text-blue-400" : "text-gray-600"}>🌊 Ocean</span>
            </div>
          </div>

          {/* Task Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Small Tasks */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-xl">💧</span> Stream (Small)
              </h3>
              <div className="space-y-2">
                {smallTasks.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No small tasks available</p>
                ) : (
                  smallTasks.map((task) => (
                    <Card
                      key={task.id}
                      onClick={() => handleTaskSelect("small", task.id)}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTasks.small === task.id
                          ? "ring-2 ring-blue-500 bg-blue-950/50"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <CardContent className="p-3">
                        <p className="text-sm text-gray-300 line-clamp-2">{task.taskValue}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Medium Tasks */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-xl">🏞️</span> River (Medium)
              </h3>
              <div className="space-y-2">
                {mediumTasks.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No medium tasks available</p>
                ) : (
                  mediumTasks.map((task) => (
                    <Card
                      key={task.id}
                      onClick={() => handleTaskSelect("medium", task.id)}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTasks.medium === task.id
                          ? "ring-2 ring-blue-500 bg-blue-950/50"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <CardContent className="p-3">
                        <p className="text-sm text-gray-300 line-clamp-2">{task.taskValue}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Large Tasks */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-xl">🌊</span> Ocean (Large)
              </h3>
              <div className="space-y-2">
                {largeTasks.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No large tasks available</p>
                ) : (
                  largeTasks.map((task) => (
                    <Card
                      key={task.id}
                      onClick={() => handleTaskSelect("large", task.id)}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTasks.large === task.id
                          ? "ring-2 ring-blue-500 bg-blue-950/50"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <CardContent className="p-3">
                        <p className="text-sm text-gray-300 line-clamp-2">{task.taskValue}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <Button onClick={onSkip} variant="ghost" className="text-gray-400">
              Skip for today
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {selectedCount}/3 selected
              </span>
              <Button
                onClick={handleComplete}
                disabled={selectedCount === 0}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start Your Day
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
