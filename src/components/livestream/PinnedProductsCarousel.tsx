"use client";

import { useState, useEffect } from "react";
import { useGetPinnedProducts, useTrackProductClick } from "@/hooks/queries/useLivestream";
import { LivestreamSocket } from "@/hooks/useLivestreamSocket";
import { LivestreamPinnedProduct, ProductPinnedEvent, ProductUnpinnedEvent } from "@/interfaces/livestream";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PinnedProductsCarouselProps {
  livestreamId: number;
  socket?: LivestreamSocket | null;
}

export const PinnedProductsCarousel = ({ livestreamId, socket }: PinnedProductsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pinnedProducts, setPinnedProducts] = useState<LivestreamPinnedProduct[]>([]);

  const { data: initialPinned } = useGetPinnedProducts(livestreamId);
  const trackClick = useTrackProductClick();

  // Load initial pinned products
  useEffect(() => {
    if (initialPinned) {
      setPinnedProducts(initialPinned);
    }
  }, [initialPinned]);

  // Listen for product pin/unpin events
  useEffect(() => {
    if (!socket) return;

    const handleProductPinned = (data: ProductPinnedEvent) => {
      setPinnedProducts((prev) => [
        {
          id: data.id,
          livestream: { id: livestreamId },
          product: data.product,
          clickCount: 0,
          addToCartCount: 0,
          pinnedAt: data.pinnedAt,
          unpinnedAt: null,
          createdAt: data.pinnedAt,
        },
        ...prev,
      ]);
      setCurrentIndex(0);
    };

    const handleProductUnpinned = (data: ProductUnpinnedEvent) => {
      setPinnedProducts((prev) =>
        prev.filter((p) => p.product.id !== data.productId)
      );
    };

    socket.on("product_pinned", handleProductPinned);
    socket.on("product_unpinned", handleProductUnpinned);

    return () => {
      socket.off("product_pinned", handleProductPinned);
      socket.off("product_unpinned", handleProductUnpinned);
    };
  }, [socket, livestreamId]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? pinnedProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === pinnedProducts.length - 1 ? 0 : prev + 1
    );
  };

  const handleProductClick = (productId: number) => {
    trackClick.mutate({ livestreamId, productId });
  };

  if (pinnedProducts.length === 0) {
    return null;
  }

  const currentProduct = pinnedProducts[currentIndex];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="text-lg">📌</span>
          <span>Pinned Products</span>
        </h3>
        {pinnedProducts.length > 1 && (
          <span className="text-sm text-gray-500">
            {currentIndex + 1}/{pinnedProducts.length}
          </span>
        )}
      </div>

      {/* Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4"
          >
            {/* Product image */}
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              {currentProduct.product.images && currentProduct.product.images[0] ? (
                <Image
                  src={currentProduct.product.images[0].imageUrl}
                  alt={currentProduct.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  👕
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                {currentProduct.product.name}
              </h4>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg font-bold text-cyan-600">
                  {currentProduct.product.price.toLocaleString()}$
                </span>
                {currentProduct.product.price &&
                  currentProduct.product.price > currentProduct.product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {currentProduct.product.price.toLocaleString()}đ
                    </span>
                  )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/client/products/product-detail/${currentProduct.product.id}`}
                  onClick={() => handleProductClick(currentProduct.product.id)}
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Product
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {pinnedProducts.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {pinnedProducts.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {pinnedProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-cyan-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
