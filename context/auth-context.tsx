"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { API_ENDPOINTS, fetchAPI } from "@/lib/api"

interface AuthContextType {
  accessToken: string | null
  isAuthenticated: boolean
  authLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getToken: () => string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    if (storedToken) {
      setAccessToken(storedToken)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    setAuthLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetchAPI(API_ENDPOINTS.auth, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (response.access_token) {
        localStorage.setItem("accessToken", response.access_token)
        setAccessToken(response.access_token)
        setIsAuthenticated(true)
        router.push("/dashboard")
      } else {
        throw new Error("No access token in response")
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAccessToken(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  const getToken = () => accessToken

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, authLoading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
