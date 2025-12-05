"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { DashboardMetrics } from "@/components/dashboard/metrics"
import { UserGrowthChart } from "@/components/dashboard/user-growth-chart"
import { RecentUsersTable } from "@/components/dashboard/recent-users-table"
import { RecentProductsTable } from "@/components/dashboard/recent-products-table"

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your admin overview.</p>
        </div>

        <DashboardMetrics />
        <UserGrowthChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentUsersTable />
          <RecentProductsTable />
        </div>
      </div>
    </ProtectedLayout>
  )
}
