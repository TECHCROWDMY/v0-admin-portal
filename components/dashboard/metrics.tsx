"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Package, Clock } from "lucide-react"

const METRICS = [
  {
    title: "Total Users",
    value: "2,451",
    icon: Users,
    change: "+12.5%",
    positive: true,
  },
  {
    title: "Active Users",
    value: "1,840",
    icon: CheckCircle,
    change: "+8.2%",
    positive: true,
  },
  {
    title: "Total Products",
    value: "847",
    icon: Package,
    change: "+4.3%",
    positive: true,
  },
  {
    title: "Pending Review",
    value: "23",
    icon: Clock,
    change: "+2.1%",
    positive: false,
  },
]

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.positive ? "text-green-600" : "text-orange-600"}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
