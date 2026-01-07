"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LandingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">TaskFlow</div>
          <div className="flex gap-4">
            {!user ? (
              <>
                <Link href="/login" className="px-4 py-2 text-foreground hover:text-primary transition-smooth">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-smooth"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-smooth"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-background to-card">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Manage Your <span className="text-primary">Tasks</span> Effortlessly
          </h1>
          <p className="text-xl text-secondary mb-8 leading-relaxed">
            TaskFlow helps you organize, prioritize, and accomplish your goals with a clean, intuitive interface
            designed for productivity.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/signup"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-smooth"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-smooth"
            >
              Sign In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-smooth">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Simple Organization</h3>
              <p className="text-secondary text-sm">
                Create, edit, and manage tasks with ease using our intuitive interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-smooth">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Real-time Updates</h3>
              <p className="text-secondary text-sm">
                See changes instantly as you work, keeping your tasks always in sync.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-smooth">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Secure & Private</h3>
              <p className="text-secondary text-sm">
                Your data is protected with modern security practices and privacy controls.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-secondary text-sm">
          <p>&copy; 2025 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
