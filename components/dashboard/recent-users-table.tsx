"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const RECENT_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Seller", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Buyer", status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Admin", status: "active" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Seller", status: "inactive" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Buyer", status: "active" },
]

export function RecentUsersTable() {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>Latest 5 registered users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="link" className="mt-4" onClick={() => router.push("/users")}>
          View all users →
        </Button>
      </CardContent>
    </Card>
  )
}
