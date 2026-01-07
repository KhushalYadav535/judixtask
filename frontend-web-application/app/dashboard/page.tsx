"use client"

import { ProtectedRoute } from "@/components/protected-route"
import DashboardLayout from "@/components/dashboard-layout"
import TaskManagement from "@/components/task-management"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TaskManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
