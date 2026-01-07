"use client"

import { useState, useEffect } from "react"
import TaskModal from "./task-modal"
import TaskList from "./task-list"
import { useToast } from "@/contexts/toast-context"

interface Task {
  id: string
  title: string
  description: string
  createdDate: string
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/tasks", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      if (!res.ok) throw new Error("Failed to load tasks")
      const data = await res.json()
      // Filter out any tasks with invalid IDs (old mock data)
      const validTasks = data.tasks.filter((task: Task) => {
        // MongoDB ObjectId is 24 hex characters
        return task.id && task.id.match(/^[0-9a-fA-F]{24}$/)
      })
      setTasks(validTasks)
    } catch (err) {
      addToast("Failed to load tasks", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (title: string, description: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ title, description }),
      })

      if (!res.ok) throw new Error("Failed to create task")

      const data = await res.json()
      setTasks([data.task, ...tasks])
      setShowModal(false)
      addToast("Task created successfully", "success")
    } catch (err) {
      addToast("Failed to create task", "error")
    }
  }

  const handleUpdateTask = async (taskId: string, title: string, description: string) => {
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      addToast("Invalid task ID. Please refresh the page.", "error")
      // Remove invalid task from state
      setTasks(tasks.filter((t) => t.id !== taskId))
      setEditingTask(null)
      setShowModal(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        addToast("Please login again", "error")
        return
      }
      
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to update task")
      }

      setTasks(tasks.map((t) => (t.id === taskId ? data.task : t)))
      setEditingTask(null)
      setShowModal(false)
      addToast("Task updated successfully", "success")
    } catch (err: any) {
      console.error("Update task error:", err)
      addToast(err.message || "Failed to update task", "error")
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      addToast("Invalid task ID. Removing from list...", "error")
      // Remove invalid task from state
      setTasks(tasks.filter((t) => t.id !== taskId))
      return
    }

    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        addToast("Please login again", "error")
        return
      }
      
      const res = await fetch(`/api/tasks/${taskId}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete task")
      }

      setTasks(tasks.filter((t) => t.id !== taskId))
      addToast("Task deleted successfully", "success")
    } catch (err: any) {
      console.error("Delete task error:", err)
      addToast(err.message || "Failed to delete task", "error")
    }
  }

  // Filter out invalid task IDs before displaying
  const validTasks = tasks.filter((task) => {
    return task.id && task.id.match(/^[0-9a-fA-F]{24}$/)
  })

  const filteredTasks = validTasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime()
      const dateB = new Date(b.createdDate).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Your Tasks</h1>
        <button
          onClick={() => {
            setEditingTask(null)
            setShowModal(true)
          }}
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-smooth"
        >
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 bg-border text-foreground rounded-lg hover:bg-border-dark transition-smooth"
          >
            Clear
          </button>
        )}
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-xl text-secondary mb-4">No tasks yet</p>
          <p className="text-sm text-secondary mb-6">
            {searchQuery ? "Try adjusting your search filters" : "Create your first task to get started!"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setEditingTask(null)
                setShowModal(true)
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-smooth"
            >
              Create Task
            </button>
          )}
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditingTask(task)
            setShowModal(true)
          }}
          onDelete={handleDeleteTask}
        />
      )}

      {/* Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={(title, description) => {
            if (editingTask) {
              handleUpdateTask(editingTask.id, title, description)
            } else {
              handleAddTask(title, description)
            }
          }}
          onClose={() => {
            setShowModal(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}
