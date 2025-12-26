"use client";

import { useState, useEffect } from "react";
import { useCoupons } from "@/hooks/queries/useCoupon";
import { Progress } from "@/components/ui/progress";
import { LoadMore } from "@/components/ui/load-more";
import { ListSkeletons } from "@/components/skeletons/list-skeletons";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";

enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

interface CouponListProps {
  discountType?: DiscountType;
}

const formatDate = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
};

export function CouponList({ discountType }: CouponListProps) {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error } = useCoupons({
    page,
    limit,
    ...(discountType && { discountType }),
  });

  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Initialize or append coupons when data changes
  useEffect(() => {
    if (!data?.data) return;

    if (page === 1) {
      setAllCoupons(data.data);
    } else {
      setAllCoupons((prev) => [...prev, ...data.data]);
    }

    if (data.pagination) {
      const totalPages = Math.ceil(
        data.pagination.total / data.pagination.limit
      );
      setHasMore(data.pagination.page < totalPages);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [page, data]);

  // Reset pagination when filter changes
  useEffect(() => {
    setPage(1);
    setAllCoupons([]);
    setHasMore(true);
    setLoadingMore(false);
  }, [discountType]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (data?.data) {
      setAllCoupons(data.data);
    }
  }, [data]);

  // Initial loading
  if (isLoading && page === 1) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Loading coupons...
      </div>
    );
  }

  // Empty state
  if (allCoupons.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
          <Tag className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
          No coupons found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {discountType
            ? "No coupons available in this category"
            : "You don't have any coupons yet"}
        </p>
      </div>
    );
  }

  const renderCouponItem = (coupon: Coupon) => {
    const usedCount = coupon.usageCount || 0;
    const totalLimit = coupon.usageLimit || 1;
    const progressValue = totalLimit > 0 ? (usedCount / totalLimit) * 100 : 0;
    const remainingUsage =
      coupon.usageLimitPerUser > 0 ? `x${coupon.usageLimitPerUser}` : "∞";

    let discountDisplay: string;
    switch (coupon.discountType) {
      case DiscountType.PERCENTAGE:
        discountDisplay = `${coupon.discountValue}% OFF`;
        break;
      case DiscountType.FIXED_AMOUNT:
        discountDisplay = `SAVE $${Number(coupon.discountValue).toFixed(2)}`;
        break;
      case DiscountType.FREE_SHIPPING:
        discountDisplay = "FREE SHIPPING";
        break;
      default:
        discountDisplay = "DISCOUNT";
    }

    const opacityClass = coupon.status !== "active" ? "opacity-50" : "";

    return (
      <motion.div
        key={coupon.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`
          relative rounded-lg bg-white dark:bg-gray-800 border
          border-gray-200 dark:border-gray-700 flex overflow-hidden
          transition-all duration-200 hover:shadow-md hover:border-[#40BFFF]/30
          ${opacityClass}
        `}
      >
        <div className="bg-gradient-to-b from-[#40BFFF] to-[#33A0DD] text-white text-xs font-bold flex items-center w-12 justify-center relative py-2">
          <p className="-rotate-90 whitespace-nowrap absolute font-semibold">
            COUPON
          </p>
        </div>

        <div className="py-3 px-4 flex-1">
          <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
            {coupon.code}
          </p>
          <p className="text-xs text-[#FF4858] font-semibold mt-0.5">
            {coupon.name || discountDisplay}
          </p>

          {coupon.usageLimit > 0 && (
            <>
              <Progress className="mt-2.5 h-1.5" value={progressValue} />
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                Used {usedCount}/{totalLimit} times globally
              </p>
            </>
          )}

          <div className="flex gap-6 mt-2">
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Start: {formatDate(coupon.startDate)}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              End: {formatDate(coupon.endDate)}
            </p>
          </div>

          {parseFloat(coupon.minOrderAmount) > 0 && (
            <p className="text-[10px] font-medium text-[#40BFFF] mt-1.5">
              Min. Order: ${parseFloat(coupon.minOrderAmount).toFixed(2)}
            </p>
          )}
        </div>

        <div className="absolute right-2 top-2 h-fit px-2.5 py-1 text-xs font-semibold border border-[#40BFFF]/30 bg-[#40BFFF]/5 text-[#40BFFF] rounded">
          {remainingUsage}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Coupons Grid with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="sync">
          {allCoupons.map((coupon) => (
            <div key={coupon.id}>{renderCouponItem(coupon)}</div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ListSkeletons type="coupon" count={2} />
        </div>
      )}

      {/* Load More Button */}
      {allCoupons.length > 0 && (
        <LoadMore
          onLoadMore={handleLoadMore}
          isLoading={loadingMore}
          hasMore={hasMore}
          error={error?.message}
        />
      )}
    </div>
  );
}
