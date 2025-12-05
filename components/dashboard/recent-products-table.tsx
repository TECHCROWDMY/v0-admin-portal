"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const RECENT_PRODUCTS = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: "$999", status: "active" },
  { id: 2, name: "Coffee Maker", category: "Appliances", price: "$79", status: "active" },
  { id: 3, name: "Office Chair", category: "Furniture", price: "$299", status: "draft" },
  { id: 4, name: "USB Hub", category: "Electronics", price: "$49", status: "active" },
  { id: 5, name: "Desk Lamp", category: "Furniture", price: "$39", status: "active" },
]

export function RecentProductsTable() {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Products</CardTitle>
        <CardDescription>Latest 5 added products</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_PRODUCTS.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="link" className="mt-4" onClick={() => router.push("/products")}>
          View all products →
        </Button>
      </CardContent>
    </Card>
  )
}
