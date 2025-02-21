"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react"

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

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(storedTasks)
  }, [])

  const saveTask = () => {
    if (!task.trim()) {
      alert("Please enter a task!")
      return
    }

    if (tasks.length >= MAX_TASKS) {
      alert("Maximum number of tasks reached!")
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
  }

  const toggleTaskStatus = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task,
    )
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const getEmoji = (flowType: string) => {
    const emojiMap: { [key: string]: string } = {
      frog: "🐸",
      summit: "🗻",
      burn: "🏃🏼",
    }
    return emojiMap[flowType] || ""
  }

  return (
    <div className="w-full max-w-4xl p-6 space-y-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Imaya
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
          className="flex-grow"
        />
        <Select onValueChange={(value) => setTaskType(value as "small" | "medium" | "large")} defaultValue={taskType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Task size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small 💧</SelectItem>
            <SelectItem value="medium">Medium 🏞️</SelectItem>
            <SelectItem value="large">Large 🌊</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setFlowType} defaultValue={flowType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Flow type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frog">Eat That Frog 🐸</SelectItem>
            <SelectItem value="summit">Climb The Summit 🗻</SelectItem>
            <SelectItem value="burn">Slow Burn 🏃🏼</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={saveTask}>
          <PlusCircle className="mr-2" /> Add Task
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`overflow-hidden transition-all duration-300 ${task.status === "completed" ? "opacity-50" : ""} bg-gray-100`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{task.date}</span>
                <span>{getEmoji(task.flowType)}</span>
              </div>
              <p className={`text-lg mb-2 text-gray-900 ${task.status === "completed" ? "line-through" : ""}`}>
                {task.taskValue}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">{task.taskType}</span>
                <Button variant="ghost" size="sm" onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === "pending" ? <Clock className="mr-2" /> : <CheckCircle2 className="mr-2" />}
                  <span className="text-gray-900">{task.status === "pending" ? "Pending" : "Completed"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

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
        className="text-center text-sm text-gray-500 mt-8"
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