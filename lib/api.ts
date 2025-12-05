const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.symspacelabs.com"

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  products: `${API_BASE_URL}/products`,
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
