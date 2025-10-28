"use client";

import ProductDetail from "@/app/admin/products/detail-product/product-detail";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);

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
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Không có dữ liệu sản phẩm
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProductDetail product={product} />
    </div>
  );
}
