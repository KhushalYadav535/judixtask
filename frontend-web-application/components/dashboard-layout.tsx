"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import ProfileDropdown from "./profile-dropdown"
import SearchBar from "./search-bar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">TaskFlow</div>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <ProfileDropdown user={user} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
              <p className="text-secondary">{user?.email}</p>
              <p className="text-xs text-secondary mt-1">Member since {user?.memberSince}</p>
            </div>
            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-smooth font-medium">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content */}
        {children}
      </main>
    </div>
  )
}
