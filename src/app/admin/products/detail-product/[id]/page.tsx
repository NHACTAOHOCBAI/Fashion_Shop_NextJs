"use client";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductHeader } from "./_components/ProductHeader";
import { ProductOverview } from "./_components/ProductOverview";
import { ProductStatsCards } from "./_components/ProductStatsCards";
import { VariantsTable } from "./_components/VariantsTable";
import { VariantCardGrid } from "./_components/VariantCardGrid";
import { LayoutGrid, Table as TableIcon, BarChart3 } from "lucide-react";
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
      <ProductHeader product={product} />

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
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
            Analytics
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

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <ProductStatsCards product={product} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground font-medium">
                  Sales Analytics Chart
                </p>
                <p className="text-sm text-muted-foreground">
                  Coming soon...
                </p>
              </div>
            </div>
            <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground font-medium">
                  Stock Trends Chart
                </p>
                <p className="text-sm text-muted-foreground">
                  Coming soon...
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
