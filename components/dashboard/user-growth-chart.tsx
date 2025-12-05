"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const CHART_DATA = [
  { month: "Jan", users: 400, products: 240 },
  { month: "Feb", users: 500, products: 300 },
  { month: "Mar", users: 620, products: 380 },
  { month: "Apr", users: 850, products: 450 },
  { month: "May", users: 1200, products: 600 },
  { month: "Jun", users: 1840, products: 847 },
]

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Overview</CardTitle>
        <CardDescription>User and product growth over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="hsl(var(--color-chart-1))" name="Total Users" />
            <Line type="monotone" dataKey="products" stroke="hsl(var(--color-chart-2))" name="Total Products" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
