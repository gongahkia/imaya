"use client"

import { useState, useEffect } from "react"
import Welcome from "@/components/Welcome"
import TaskManager from "@/components/TaskManager"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {showWelcome ? <Welcome onFinish={() => setShowWelcome(false)} /> : <TaskManager />}
    </main>
  )
}