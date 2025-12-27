"use client";

import ImageGallery from "react-image-gallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/lib/formatMoney";
import { Star, Package, TrendingUp } from "lucide-react";
import { calculateProductStats } from "../_utils/productHelpers";

interface ProductOverviewProps {
  product: Product;
  images: { original: string; thumbnail: string }[];
}

export function ProductOverview({ product, images }: ProductOverviewProps) {
  const stats = calculateProductStats(product);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Image Gallery */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="bottom"
              additionalClass="rounded-lg overflow-hidden"
            />
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {product.description ||
                "These sport shoes are designed for comfort, performance, and style. With lightweight cushioning and breathable materials, they keep your feet cool and supported during any activity. Perfect for running, training, or everyday wear."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Product Details */}
      <div className="space-y-6">
        {/* Price & Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing & Rating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-3xl font-bold text-primary">
                {formatMoney(Number(product.price))}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">Rating</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(Number(product.averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  {Number(product.averageRating).toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {product.reviewCount} reviews
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inventory Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-muted-foreground">Total Stock</span>
              </div>
              <span className="font-semibold text-lg">
                {stats.totalStock.toLocaleString()}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-muted-foreground">Total Sold</span>
              </div>
              <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                {stats.totalSold.toLocaleString()}
              </span>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{stats.variantCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Variants</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.lowStockCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category & Brand */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Product Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <Badge variant="secondary" className="text-sm">
                {product.category.name}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Brand</p>
              <Badge variant="secondary" className="text-sm">
                {product.brand.name}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Product ID</p>
              <p className="text-sm font-mono">{product.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
