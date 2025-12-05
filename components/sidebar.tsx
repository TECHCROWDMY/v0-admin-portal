"use client"

import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAVIGATION = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Products", href: "/products", icon: Package },
]

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_email")
    router.push("/login")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:relative md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <button onClick={onClose} className="md:hidden text-white hover:bg-slate-800 p-1 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {NAVIGATION.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href)
                    onClose()
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-700">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-slate-300 border-slate-700 hover:bg-slate-800 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
