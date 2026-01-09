"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/formatMoney";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductInfo;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/client/products/product-detail/${product.id}`);
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image_url || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        
        <div className="p-3 space-y-1">
          <p className="text-xs text-muted-foreground capitalize">
            {product.category}
          </p>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm font-bold text-primary">
              {formatMoney(product.price)}
            </p>
            <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
