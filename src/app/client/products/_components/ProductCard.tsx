"use client";

import finalMoney from "@/lib/finalMoney";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { cardHover, badgeAppear } from "@/lib/animations";
import { useToggleWishlistItem } from "@/hooks/queries/useWishlist";
import { toast } from "sonner";

const NEW_TIME = 24 * 60 * 60 * 1000;

const isNewProduct = (createdAt: string): boolean => {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < NEW_TIME;
};

const FALLBACK_IMAGE = "/images/product-placeholder.png";

const ProductCard = ({ product }: { product: Product }) => {
  const { mutate: toggleWishlist } = useToggleWishlistItem();
  const handleToggleWishlist = () => {
    toggleWishlist(
      {
        productId: product.id,
      },
      {
        onSuccess: () => {
          toast.success(`${product?.name} has been added to cart`);
        },
        onError: (error) => {
          toast.error(`Ohh!!! ${error.message}`);
        },
      }
    );
  };
  const [isHovered, setIsHovered] = useState(false);
  const showNewTag = isNewProduct(product.createdAt);
  const imageUrl = product.images?.[0]?.imageUrl || FALLBACK_IMAGE;
  const rating = Number(product.averageRating) || 0;

  return (
    <motion.div
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
    >
      <div className="group relative h-full  dark:border-gray-700 bg-white dark:bg-gray-800 ">
        {/* IMAGE SECTION */}
        <Link
          href={`/client/products/product-detail/${product.id}`}
          className="block"
        >
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              priority={false}
            />

            {/* Quick Action Buttons - ONLY show on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[var(--cyan-400)] hover:text-white transition-colors"
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 20 }}
                    transition={{ delay: 0.05 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // TODO: Add to wishlist logic
                    }}
                  >
                    <Heart onClick={() => handleToggleWishlist()} size={20} />
                  </motion.button>
                  <motion.button
                    className="w-11 h-11 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[var(--cyan-400)] hover:text-white transition-colors"
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 20 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // TODO: Quick view modal
                    }}
                  >
                    <Eye size={20} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NEW TAG with gradient & animation */}
            {showNewTag && (
              <motion.span
                className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wide"
                variants={badgeAppear}
                initial="initial"
                animate="animate"
              >
                New
              </motion.span>
            )}
          </div>
        </Link>

        {/* CONTENT SECTION */}
        <Link href={`/client/products/product-detail/${product.id}`}>
          <div className="p-5 flex flex-col gap-3">
            {/* PRODUCT NAME */}
            <h6
              className=" min-h-[36px] transition-colors text-gray-800 dark:text-gray-100 group-hover:text-[var(--cyan-500)] dark:group-hover:text-[var(--cyan-400)] "
              title={product.name}
            >
              {product.name}
            </h6>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={cn(
                      "w-4 h-4 transition-colors",
                      star <= Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : star - 0.5 <= rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300 dark:text-gray-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                ({product.reviewCount || 0})
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-2xl font-bold text-[#40BFFF]">
                {finalMoney(Number(product.price))}
              </p>
            </div>
          </div>
        </Link>

        {/* Hover border glow effect */}
        <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export default ProductCard;
