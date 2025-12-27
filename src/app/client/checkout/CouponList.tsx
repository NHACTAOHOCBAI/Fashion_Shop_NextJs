"use client";

import { BaseModal } from "@/components/modals/BaseModal";
import { Progress } from "@/components/ui/progress";
import { Tag, Percent, DollarSign, Truck } from "lucide-react";
import NormalButton from "@/app/client/_components/NormalButton";
import MyTag from "@/app/client/_components/MyTag";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItemFast } from "@/lib/animations";

enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

interface CouponListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCouponId: number | undefined;
  handleCouponClick: (id: number) => void;
  availableCoupons: Coupon[] | undefined;
}

const formatDate = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
};

const CouponList = ({
  open,
  setOpen,
  handleCouponClick,
  selectedCouponId,
  availableCoupons,
}: CouponListProps) => {
  const allCoupons = availableCoupons || [];
  const activeCouponsCount = allCoupons.filter(
    (c) => c.status === "active"
  ).length;

  // Group coupons by type
  const freeShippingCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.FREE_SHIPPING
  );
  const percentageCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.PERCENTAGE
  );
  const fixedAmountCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.FIXED_AMOUNT
  );

  const renderCouponItem = (coupon: Coupon) => {
    const isSelected = selectedCouponId === coupon.id;
    const isActive = coupon.status === "active";

    const usedCount = coupon.usageCount || 0;
    const totalLimit = coupon.usageLimit || 1;
    const progressValue = (usedCount / totalLimit) * 100;
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

    let statusTag: React.ReactNode | null = null;
    let inactiveClasses = "";

    if (!isActive) {
      inactiveClasses = "opacity-50 cursor-not-allowed pointer-events-none";
      let tagValue: string;
      let tagColor = "text-red-500";

      if (coupon.status === "disabled") {
        tagValue = "disabled";
      } else if (coupon.status === "scheduled") {
        tagValue = "Upcoming";
        tagColor = "text-yellow-600";
      } else {
        tagValue = "Inactive";
      }

      statusTag = (
        <div className="absolute left-0 bottom-0 mb-[-1px]">
          <MyTag
            value={
              <p className={`text-[10px] font-semibold ${tagColor}`}>
                {tagValue}
              </p>
            }
          />
        </div>
      );
    }

    return (
      <motion.div
        key={coupon.id}
        variants={staggerItemFast}
        whileHover={isActive ? { scale: 1.02, y: -2 } : {}}
        transition={{ duration: 0.2 }}
        onClick={() => isActive && handleCouponClick(coupon.id)}
        className={`
          relative rounded-lg bg-white dark:bg-gray-800
          border-2 flex overflow-hidden transition-all duration-200
          ${isActive ? "cursor-pointer" : inactiveClasses}
          ${
            isSelected && isActive
              ? "border-[#40BFFF] shadow-md shadow-[#40BFFF]/20"
              : "border-gray-200 dark:border-gray-700 hover:border-[#40BFFF]/40"
          }
        `}
      >
        {/* Selected indicator */}
        {isSelected && isActive && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#40BFFF] flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}

        <div className="bg-gradient-to-b from-[#40BFFF] to-[#33A0DD] text-white text-xs font-bold flex items-center w-12 justify-center relative py-2">
          <p className="-rotate-90 whitespace-nowrap absolute font-semibold text-[10px]">
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
              <Progress
                className={`mt-2.5 h-1.5 ${isActive ? "" : "opacity-50"}`}
                value={progressValue}
              />
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                Used {usedCount}/{totalLimit} times
              </p>
            </>
          )}

          <div className="flex gap-4 mt-2">
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Start: {formatDate(coupon.startDate)}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              End: {formatDate(coupon.endDate)}
            </p>
          </div>
        </div>

        <div className="absolute right-2 top-2 px-2.5 py-1 text-xs font-semibold border border-[#40BFFF]/30 bg-[#40BFFF]/10 text-[#40BFFF] rounded">
          {remainingUsage}
        </div>

        {statusTag}
      </motion.div>
    );
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    coupons: Coupon[],
    color: string
  ) => {
    if (coupons.length === 0) return null;

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>{icon}</div>
          <h3 className={`font-semibold text-base ${color}`}>
            {title} ({coupons.length})
          </h3>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
        >
          {coupons.map(renderCouponItem)}
        </motion.div>
      </div>
    );
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Choose Coupon"
      description={`${activeCouponsCount} active coupon${
        activeCouponsCount !== 1 ? "s" : ""
      } available`}
      icon={<Tag size={20} />}
      maxWidth="max-w-2xl"
      footer={
        <NormalButton onClick={() => setOpen(false)}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Close</p>
        </NormalButton>
      }
      className="space-y-6"
    >
      {!availableCoupons ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          Loading coupons...
        </div>
      ) : allCoupons.length === 0 ? (
        <div className="py-12 text-center">
          <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            No coupons available
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {renderSection(
            "Free Shipping",
            <Truck className="w-5 h-5 text-[#40BFFF]" />,
            freeShippingCoupons,
            "text-[#40BFFF]"
          )}

          {renderSection(
            "Percentage Discount",
            <Percent className="w-5 h-5 text-[#FF4858]" />,
            percentageCoupons,
            "text-[#FF4858]"
          )}

          {renderSection(
            "Fixed Amount",
            <DollarSign className="w-5 h-5 text-[#38A169]" />,
            fixedAmountCoupons,
            "text-[#38A169]"
          )}
        </div>
      )}
    </BaseModal>
  );
};

export default CouponList;
