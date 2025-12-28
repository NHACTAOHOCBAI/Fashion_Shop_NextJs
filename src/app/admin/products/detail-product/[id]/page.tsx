"use client";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductHeader } from "./_components/ProductHeader";
import { ProductOverview } from "./_components/ProductOverview";
import { ProductStatsCards } from "./_components/ProductStatsCards";
import { VariantsTable } from "./_components/VariantsTable";
import { VariantCardGrid } from "./_components/VariantCardGrid";
import { StockAnalytics } from "./_components/StockAnalytics";
import { VariantStockManager } from "./_components/VariantStockManager";
import { ReviewsTable } from "./_components/ReviewsTable";
import { LayoutGrid, Table as TableIcon, BarChart3, MessageSquare } from "lucide-react";
function getAllImageUrls(product: Product | undefined) {
  if (!product) return [];
  return [
    ...product.images.map((img) => ({
      original: img.imageUrl,
      thumbnail: img.imageUrl,
    })),
    ...product.variants
      .filter((v) => v.imageUrl)
      .map((v) => ({
        original: v.imageUrl,
        thumbnail: v.imageUrl,
      })),
  ];
}
export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product>();
  const images = useMemo(() => getAllImageUrls(product), [product]);
  useEffect(() => {
    const data = localStorage.getItem("detailProduct");
    if (!data) return;
    try {
      const parsed: Product = JSON.parse(data);
      setProduct(parsed);
    } catch (error) {
      console.error("Lỗi parse product từ localStorage", error);
    }
  }, []);
  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      {/* <ProductHeader product={product} /> */}

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="variants" className="gap-2">
            <TableIcon className="h-4 w-4" />
            Variants
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Stock
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <ProductOverview product={product} images={images} />
        </TabsContent>

        {/* Variants Tab */}
        <TabsContent value="variants" className="space-y-6">
          <ProductStatsCards product={product} />
          <VariantCardGrid variants={product.variants} />
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Table View</h3>
            <VariantsTable variants={product.variants} />
          </div>
        </TabsContent>

        {/* Stock Management Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <ProductStatsCards product={product} />
          <StockAnalytics product={product} />
          <VariantStockManager variants={product.variants} />
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <ReviewsTable productId={product.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
