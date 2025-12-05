const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.symspacelabs.com"

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/admin/users`,
  products: `${API_BASE_URL}/admin/products`,
  auth: {
    login: `${API_BASE_URL}/admin/auth/login`,
  },
}

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")
  }
  return null
}

export async function authFetch(endpoint: string, options?: RequestInit) {
  try {
    const token = getAuthToken()

    if (!token) {
      throw new Error("No authentication token found. Please log in.")
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers || {}),
    }

    console.log("[v0] Auth fetch to:", endpoint)
    const response = await fetch(endpoint, {
      ...options,
      headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - clear and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken")
          window.location.href = "/login"
        }
      }
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Auth fetch response:", data)
    return data
  } catch (error) {
    console.error("[v0] Auth fetch error:", error)
    throw error
  }
}

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  try {
    console.log("[v0] Fetching:", endpoint)
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Response data:", data)
    return data
  } catch (error) {
    console.error("[v0] API fetch error:", error)
    throw error
  }
}
