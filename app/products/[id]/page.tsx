"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"

const PRODUCT_DETAIL = {
  id: 1,
  name: "Laptop Pro",
  category: "Electronics",
  price: 999,
  description: "High-performance laptop with advanced features for professionals",
  stock: 45,
  sku: "LP-2024-001",
  status: "active",
  createdAt: "2024-01-15",
  updatedAt: "2024-12-02",
  seller: "John Doe",
}

export default function ProductDetailPage() {
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
              <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
              <p className="text-muted-foreground mt-1">View product information</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push(`/products/${PRODUCT_DETAIL.id}/edit`)}>
            Edit Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{PRODUCT_DETAIL.name}</CardTitle>
                    <CardDescription className="mt-2">{PRODUCT_DETAIL.description}</CardDescription>
                  </div>
                  <Badge variant={PRODUCT_DETAIL.status === "active" ? "default" : "secondary"}>
                    {PRODUCT_DETAIL.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold">${PRODUCT_DETAIL.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stock</p>
                    <p className="text-2xl font-bold">
                      {PRODUCT_DETAIL.stock} <span className="text-base text-muted-foreground">units</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-sm">{PRODUCT_DETAIL.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SKU</p>
                  <p className="text-sm">{PRODUCT_DETAIL.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Seller</p>
                  <p className="text-sm">{PRODUCT_DETAIL.seller}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">{PRODUCT_DETAIL.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{PRODUCT_DETAIL.updatedAt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
