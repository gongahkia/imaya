"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, CheckCircle2, Clock, AlertCircle, Trash2, Edit2, X, Check } from "lucide-react"
import { toast } from "sonner"

const MAX_TASKS = 9

interface TaskData {
  id: string
  date: string
  flowType: string
  taskType: "small" | "medium" | "large"
  taskValue: string
  status: "pending" | "completed"
}

export default function TaskManager() {
  const [task, setTask] = useState("")
  const [taskType, setTaskType] = useState<"small" | "medium" | "large">("small")
  const [flowType, setFlowType] = useState("frog")
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(storedTasks)
  }, [])

  const saveTask = () => {
    if (!task.trim()) {
      toast.error("Please enter a task!")
      return
    }

    if (tasks.length >= MAX_TASKS) {
      toast.error("Maximum number of tasks reached!")
      return
    }

    const newTask: TaskData = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ja-JP"),
      flowType,
      taskType,
      taskValue: task.trim(),
      status: "pending",
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTask("")
    toast.success("Task added successfully!")
  }

  const toggleTaskStatus = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task,
    )
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    const task = tasks.find(t => t.id === id)
    if (task?.status === "pending") {
      toast.success("Task completed! 🎉")
    }
  }

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id)
    const updatedTasks = tasks.filter((t) => t.id !== id)
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    toast.success("Task deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          if (taskToDelete) {
            const restoredTasks = [...tasks]
            setTasks(restoredTasks)
            localStorage.setItem("tasks", JSON.stringify(restoredTasks))
            toast.success("Task restored")
          }
        },
      },
      duration: 5000,
    })
  }

  const startEditing = (id: string, value: string) => {
    setEditingTaskId(id)
    setEditingValue(value)
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditingValue("")
  }

  const saveEdit = (id: string) => {
    if (!editingValue.trim()) {
      toast.error("Task cannot be empty!")
      return
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, taskValue: editingValue.trim() } : task,
    )
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setEditingTaskId(null)
    setEditingValue("")
    toast.success("Task updated successfully!")
  }

  const getEmoji = (flowType: string) => {
    const emojiMap: { [key: string]: string } = {
      frog: "🐸",
      summit: "🗻",
      burn: "🏃🏼",
    }
    return emojiMap[flowType] || ""
  }

  const getTaskTypeEmoji = (taskType: string) => {
    const emojiMap: { [key: string]: string } = {
      small: "💧",
      medium: "🏞️",
      large: "🌊",
    }
    return emojiMap[taskType] || ""
  }

  return (
    <div className="w-full max-w-6xl p-4 md:p-6 space-y-6">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-8 font-[family-name:var(--font-noto-sans-jp)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        今や (Imaya)
      </motion.h1>

      <motion.div
        className="flex flex-col gap-3 md:gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && saveTask()}
          placeholder="Enter your task"
          className="w-full"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Select onValueChange={(value) => setTaskType(value as "small" | "medium" | "large")} defaultValue={taskType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Task size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small 💧</SelectItem>
              <SelectItem value="medium">Medium 🏞️</SelectItem>
              <SelectItem value="large">Large 🌊</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFlowType} defaultValue={flowType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Flow type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frog">Eat That Frog 🐸</SelectItem>
              <SelectItem value="summit">Climb The Summit 🗻</SelectItem>
              <SelectItem value="burn">Slow Burn 🏃🏼</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={saveTask} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  task.status === "completed" ? "opacity-60" : ""
                } bg-gray-100 dark:bg-gray-800`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{task.date}</span>
                    <div className="flex gap-1 items-center">
                      <span className="text-lg">{getTaskTypeEmoji(task.taskType)}</span>
                      <span className="text-lg">{getEmoji(task.flowType)}</span>
                    </div>
                  </div>

                  {editingTaskId === task.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && saveEdit(task.id)}
                        className="text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveEdit(task.id)} className="flex-1">
                          <Check className="h-3 w-3 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing} className="flex-1">
                          <X className="h-3 w-3 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p
                        className={`text-base mb-3 text-gray-900 dark:text-gray-100 break-words ${
                          task.status === "completed" ? "line-through" : ""
                        }`}
                      >
                        {task.taskValue}
                      </p>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{task.taskType}</span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(task.id, task.taskValue)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                            className="h-8 w-8 p-0 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTaskStatus(task.id)}
                            className="h-8 w-8 p-0"
                          >
                            {task.status === "pending" ? (
                              <Clock className="h-3 w-3" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {tasks.length >= MAX_TASKS && (
        <motion.div
          className="flex items-center justify-center text-yellow-400 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="mr-2" />
          <span>Maximum number of tasks reached!</span>
        </motion.div>
      )}

      <motion.div
        className="text-center text-xs md:text-sm text-gray-500 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Made with ❤️ by{" "}
        <a href="https://github.com/gongahkia" className="underline hover:text-white transition-colors">
          @gongahkia
        </a>
      </motion.div>
    </div>
  )
}