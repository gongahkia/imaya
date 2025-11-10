"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Clock, CheckCircle2 } from "lucide-react"

interface TaskData {
  id: string
  taskValue: string
  taskType: "small" | "medium" | "large"
  flowType: string
  status: "pending" | "completed"
}

interface FocusModeProps {
  tasks: TaskData[]
  onClose: () => void
  onToggleStatus: (id: string) => void
}

export default function FocusMode({ tasks, onClose, onToggleStatus }: FocusModeProps) {
  const pendingTasks = tasks.filter((t) => t.status === "pending")

  const getTaskEmoji = (type: string) => {
    return { small: "💧", medium: "🏞️", large: "🌊" }[type] || ""
  }

  const getFlowEmoji = (type: string) => {
    return { frog: "🐸", summit: "🗻", burn: "🏃🏼" }[type] || ""
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-2xl">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 text-white hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </Button>

        <motion.div
          className="text-center space-y-6"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div>
            <h2 className="text-4xl font-bold font-[family-name:var(--font-noto-sans-jp)] bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              集中モード (Shūchū M ōdo)
            </h2>
            <p className="text-gray-400">Focus Mode - Your 3 Tasks for Today</p>
          </div>

          {pendingTasks.length === 0 ? (
            <motion.div
              className="py-16 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl text-white">All Done!</h3>
              <p className="text-gray-400">お疲れ様でした! (Otsukaresama Deshita - Great work!)</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.slice(0, 3).map((task, index) => (
                <motion.div
                  key={task.id}
                  className="glass-card p-6 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onToggleStatus(task.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {getTaskEmoji(task.taskType)}
                      {getFlowEmoji(task.flowType)}
                    </div>
                    <div className="flex-grow text-left">
                      <p className="text-xl text-white mb-1">{task.taskValue}</p>
                      <p className="text-sm text-gray-500 capitalize">{task.taskType} Task</p>
                    </div>
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-600 pt-4">Click a task to mark as complete • ESC to exit</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
