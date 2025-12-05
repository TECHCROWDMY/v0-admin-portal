"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const USER_DETAIL = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "seller",
  status: "active",
  createdAt: "2024-01-15",
  lastLogin: "2024-12-02",
  products: 24,
}

export default function UserDetailPage() {
  const router = useRouter()

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
              <p className="text-muted-foreground mt-1">View user information</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push(`/users/${USER_DETAIL.id}/edit`)}>
            Edit User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg font-medium">{USER_DETAIL.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{USER_DETAIL.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-lg capitalize">{USER_DETAIL.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-lg">
                    <Badge variant={USER_DETAIL.status === "active" ? "default" : "secondary"}>
                      {USER_DETAIL.status}
                    </Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Created At</p>
                  <p className="text-sm font-medium">{USER_DETAIL.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Login</p>
                  <p className="text-sm font-medium">{USER_DETAIL.lastLogin}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Products Listed</p>
                  <p className="text-sm font-medium">{USER_DETAIL.products}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
