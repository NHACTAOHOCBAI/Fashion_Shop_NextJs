"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500">ID: {product.id}</p>
        </div>
        <Badge variant="secondary">{product.category?.name}</Badge>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="space-y-3">
          <div className="relative aspect-square w-full border rounded-xl overflow-hidden">
            <Image
              src={product.images[0]?.imageUrl || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img) => (
              <div
                key={img.id}
                className="relative w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0"
              >
                <Image
                  src={img.imageUrl}
                  alt={`Image ${img.id}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <h2 className="font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600">
              {product.description || "No description provided."}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <span className="font-semibold">Price:</span> {product.price}₫
            </div>
            <div>
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand?.name || "—"}
            </div>
            <div>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(product.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Tabs Section */}
      <Tabs defaultValue="variants" className="w-full">
        <TabsList className="border-b w-fit">
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="meta">Metadata</TabsTrigger>
        </TabsList>

        {/* Variants */}
        <TabsContent value="variants" className="space-y-4 mt-4">
          {product.variants.length === 0 ? (
            <p className="text-gray-500 text-sm">No variants available.</p>
          ) : (
            product.variants.map((variant) => (
              <Card
                key={variant.id}
                className="border rounded-xl hover:shadow-sm transition"
              >
                <CardContent className="flex items-center gap-5 p-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                    <Image
                      src={variant.imageUrl || "/placeholder.png"}
                      alt="variant"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="font-medium text-gray-700">
                      Variant #{variant.id}
                    </div>
                    <div>Quantity: {variant.quantity}</div>
                    <div>Remaining: {variant.remaining}</div>
                    <div>Public ID: {variant.publicId}</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {variant.variantAttributeValues.map((attr) => (
                        <Badge key={attr.id} variant="outline">
                          {attr.attributeCategory?.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Images */}
        <TabsContent
          value="images"
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {product.images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-lg overflow-hidden border"
            >
              <Image
                src={img.imageUrl}
                alt={`product-img-${img.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </TabsContent>

        {/* Metadata */}
        <TabsContent value="meta" className="mt-4 text-sm space-y-1">
          <div>
            <strong>Category:</strong> {product.category?.name || "—"}
          </div>
          <div>
            <strong>Brand:</strong> {product.brand?.name || "—"}
          </div>
          <div>
            <strong>ID:</strong> {product.id}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Updated:</strong>{" "}
            {new Date(product.updatedAt).toLocaleString()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
