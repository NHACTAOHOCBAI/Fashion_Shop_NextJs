"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { staggerContainer, staggerItemFast } from "@/lib/animations";

/**
 * List Skeletons - Skeleton loaders for different list types
 *
 * Provides skeleton loaders for:
 * - Orders (with product items, status badge, actions)
 * - Coupons (with progress bar, dates, usage info)
 * - Notifications (with icon, title, description, time)
 *
 * @example
 * <ListSkeletons type="order" count={3} />
 */

interface ListSkeletonsProps {
  /** Type of skeleton to render */
  type: "order" | "coupon" | "notification";
  /** Number of skeletons to render (default: 3) */
  count?: number;
  /** Custom className */
  className?: string;
}

export function ListSkeletons({
  type,
  count = 3,
  className = "",
}: ListSkeletonsProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={`space-y-3 ${className}`}
    >
      {skeletons.map((index) => (
        <motion.div key={index} variants={staggerItemFast}>
          {type === "order" && <OrderSkeleton />}
          {type === "coupon" && <CouponSkeleton />}
          {type === "notification" && <NotificationSkeleton />}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * OrderSkeleton - Single order skeleton loader
 * Mimics the structure of OrderItem component
 */
export function OrderSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Product Item */}
      <div className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        {/* Product Image */}
        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />

        <div className="flex-1 space-y-2">
          {/* Product Name */}
          <Skeleton className="h-4 w-3/4" />

          {/* Variant Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      </div>

      {/* Order Actions */}
      <div className="flex gap-3 justify-end pt-4">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * CouponSkeleton - Single coupon skeleton loader
 * Mimics the structure of CouponItem component
 */
export function CouponSkeleton() {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex overflow-hidden">
      {/* Side Banner */}
      <Skeleton className="w-12 flex-shrink-0" />

      {/* Content */}
      <div className="py-3 px-4 flex-1 space-y-2">
        {/* Code */}
        <Skeleton className="h-4 w-32" />

        {/* Discount Display */}
        <Skeleton className="h-3 w-24" />

        {/* Progress Bar */}
        <Skeleton className="h-1.5 w-full rounded-full mt-2.5" />

        {/* Usage Count */}
        <Skeleton className="h-3 w-40" />

        {/* Dates */}
        <div className="flex gap-6 mt-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Min Order */}
        <Skeleton className="h-3 w-32" />
      </div>

      {/* Usage Badge */}
      <div className="absolute right-2 top-2">
        <Skeleton className="h-6 w-10 rounded" />
      </div>
    </div>
  );
}

/**
 * NotificationSkeleton - Single notification skeleton loader
 * Mimics the structure of NotificationItem component
 */
export function NotificationSkeleton() {
  return (
    <div className="px-3.5 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex gap-3">
        {/* Icon */}
        <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-4 w-3/4" />

          {/* Description */}
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />

          {/* Time */}
          <Skeleton className="h-3 w-20 mt-1" />
        </div>

        {/* Unread Indicator */}
        <Skeleton className="w-2 h-2 rounded-full flex-shrink-0 mt-2" />
      </div>
    </div>
  );
}
