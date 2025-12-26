"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface ProductSearchResultItemProps {
  product: Product;
  index?: number;
}

export function ProductSearchResultItem({
  product,
  index = 0,
}: ProductSearchResultItemProps) {
  const imageUrl = product.images?.[0]?.imageUrl || "/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Link
        href={`/client/products/product-detail/${product.id}`}
        className="group flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl  hover:border-[#40BFFF]/30 transition-all duration-200 bg-white dark:bg-gray-800"
      >
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={product.name}
            width={120}
            height={120}
            className="w-[120px] h-[120px] object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors duration-200" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="space-y-2">
            <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-[#40BFFF] transition-colors">
              {product.name}
            </h5>

            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">{product.brand.name}</span>
              <span>•</span>
              <span>{product.category.name}</span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-[#40BFFF]">
              ${Number(product.price).toFixed(2)}
            </p>

            <div className="flex items-center gap-1.5 text-xs font-medium text-[#40BFFF] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Details</span>
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
