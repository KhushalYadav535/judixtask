"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface ProfileDropdownProps {
  user: { name: string; email: string } | null
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold hover:bg-primary-dark transition-smooth"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg border border-border shadow-lg z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-secondary">{user.email}</p>
          </div>
          <button
            onClick={() => {
              router.push("/dashboard/profile")
              setOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-foreground hover:bg-background transition-smooth text-sm"
          >
            View Profile
          </button>
          <button
            onClick={() => {
              logout()
              setOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-error hover:bg-background transition-smooth text-sm border-t border-border"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
