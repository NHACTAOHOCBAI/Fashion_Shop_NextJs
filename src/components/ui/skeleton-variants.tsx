import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Skeleton Variants Library
 * Specialized skeleton loading components for different UI elements
 * Replace traditional loading spinners with smooth skeleton screens
 */

// ============================================
// PRODUCT CARD SKELETON
// ============================================

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden",
        className
      )}
    >
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Price and action */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// PRODUCT LIST SKELETON (GRID)
// ============================================

interface ProductListSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

export function ProductListSkeleton({
  count = 8,
  columns = 4,
}: ProductListSkeletonProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// BANNER / HERO SKELETON
// ============================================

export function BannerSkeleton() {
  return (
    <div className="w-full h-80 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-between px-24">
        {/* Left content */}
        <div className="space-y-6 flex-1">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Right image placeholder */}
        <Skeleton className="w-[400px] h-[400px] rounded-full" />
      </div>
    </div>
  );
}

// ============================================
// REVIEW / TESTIMONIAL SKELETON
// ============================================

export function ReviewSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      {/* User info */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Stars */}
      <Skeleton className="h-4 w-24 mb-3" />

      {/* Review text */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function ReviewListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ReviewSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// ORDER ITEM SKELETON
// ============================================

export function OrderItemSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Order items */}
      <div className="space-y-3 mb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Footer actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}

export function OrderListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <OrderItemSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// CART ITEM SKELETON
// ============================================

export function CartItemSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex gap-6">
      {/* Checkbox */}
      <Skeleton className="w-5 h-5 rounded" />

      {/* Image */}
      <Skeleton className="w-24 h-24 rounded-lg" />

      {/* Content */}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      {/* Price and quantity */}
      <div className="flex flex-col items-end justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

export function CartListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// POST / COMMUNITY CARD SKELETON
// ============================================

export function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Image */}
      <Skeleton className="w-full h-64 rounded-none" />

      {/* Actions */}
      <div className="px-6 py-4 flex items-center gap-6">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16 ml-auto" />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// CATEGORY / FILTER SKELETON
// ============================================

export function FilterGroupSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
      <Skeleton className="h-5 w-24 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <FilterGroupSkeleton />
      <FilterGroupSkeleton />
      <FilterGroupSkeleton />
    </div>
  );
}

// ============================================
// PRODUCT DETAIL SKELETON
// ============================================

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-12">
      {/* Left: Image gallery */}
      <div className="space-y-4">
        <Skeleton className="w-full aspect-square rounded-2xl" />
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>

      {/* Right: Product info */}
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-full" />
        </div>

        {/* Rating */}
        <Skeleton className="h-5 w-32" />

        {/* Price */}
        <Skeleton className="h-10 w-40" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Variants */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-20 rounded-xl" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-16 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-4 pt-6">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// TABLE SKELETON
// ============================================

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="grid gap-4 p-4 border-b border-gray-100 dark:border-gray-700" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4" />
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 p-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FULL PAGE SKELETON
// ============================================

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
