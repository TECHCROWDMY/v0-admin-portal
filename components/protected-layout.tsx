"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthed(true)
      setLoading(false)
    }
  }, [router])

  if (loading) return null
  if (!isAuthed) return null

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <span className="text-sm text-muted-foreground">{localStorage.getItem("admin_email")}</span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
