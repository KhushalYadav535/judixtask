"use client"

interface Task {
  id: string
  title: string
  description: string
  createdDate: string
}

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Helper to check if task ID is valid MongoDB ObjectId
  const isValidTaskId = (id: string) => {
    return id && id.match(/^[0-9a-fA-F]{24}$/)
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => {
        const isValid = isValidTaskId(task.id)
        return (
          <div key={task.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-smooth">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{task.title}</h3>
                <p className="text-secondary text-sm mb-3">{task.description}</p>
                <p className="text-xs text-secondary">Created {formatDate(task.createdDate)}</p>
                {!isValid && (
                  <p className="text-xs text-error mt-2">⚠️ Old task - Please refresh page</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(task)}
                  disabled={!isValid}
                  className="px-3 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-smooth text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  disabled={!isValid}
                  className="px-3 py-2 text-error border border-error rounded-lg hover:bg-error hover:text-white transition-smooth text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
