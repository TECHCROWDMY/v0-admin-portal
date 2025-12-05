"use client"

import { useState, useMemo } from "react"
import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/pagination"
import { useRouter } from "next/navigation"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 999,
    stock: 45,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Appliances",
    price: 79,
    stock: 120,
    status: "active",
    createdAt: "2024-01-18",
  },
  {
    id: 3,
    name: "Office Chair",
    category: "Furniture",
    price: 299,
    stock: 0,
    status: "draft",
    createdAt: "2024-01-20",
  },
  { id: 4, name: "USB Hub", category: "Electronics", price: 49, stock: 200, status: "active", createdAt: "2024-01-25" },
  { id: 5, name: "Desk Lamp", category: "Furniture", price: 39, stock: 85, status: "active", createdAt: "2024-02-01" },
  {
    id: 6,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29,
    stock: 150,
    status: "active",
    createdAt: "2024-02-05",
  },
  {
    id: 7,
    name: "Standing Desk",
    category: "Furniture",
    price: 499,
    stock: 10,
    status: "draft",
    createdAt: "2024-02-10",
  },
  {
    id: 8,
    name: "Webcam 4K",
    category: "Electronics",
    price: 149,
    stock: 60,
    status: "active",
    createdAt: "2024-02-15",
  },
]

const ITEMS_PER_PAGE = 5

export default function ProductsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, categoryFilter, statusFilter])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground mt-2">Manage all products in your catalog</p>
          </div>
          <Button onClick={() => router.push("/products/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Product
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={(v) => {
                  setCategoryFilter(v)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Appliances">Appliances</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <CardDescription>
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock > 50 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                        >
                          {product.stock} units
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{product.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/products/${product.id}`)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/products/${product.id}/edit`)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => alert(`Delete product: ${product.name}`)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}
