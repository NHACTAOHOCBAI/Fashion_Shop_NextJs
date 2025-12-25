"use client";

// Giả định imports
import TabbedContent from "@/app/client/products/_components/TabContent";
import { Progress } from "@/components/ui/progress";
// Giả định MyTag component đã tồn tại
import MyTag from "@/app/client/_components/MyTag";
import { useCoupons, useMyCoupons } from "@/hooks/queries/useCoupon";
import { Tag } from "lucide-react";

// Giả định Coupon interface và useCoupons/useMyCoupons hook từ câu trả lời trước
// (Cần định nghĩa lại Coupon interface ở đây để đảm bảo kiểu dữ liệu)

enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

// Hàm format ngày (lặp lại ở đây để đảm bảo CouponItem hoạt động độc lập)
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

// ===============================================
// 1. COUPON ITEM (SỬA DỤNG DỮ LIỆU ĐỘNG)
// ===============================================

interface CouponItemProps {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: CouponItemProps) => {
  const usedCount = coupon.usageCount || 0;
  const totalLimit = coupon.usageLimit || 1;
  // Đảm bảo không chia cho 0
  const progressValue = totalLimit > 0 ? (usedCount / totalLimit) * 100 : 0;

  const remainingUsage =
    coupon.usageLimitPerUser > 0 ? `x${coupon.usageLimitPerUser}` : "∞";

  // Định dạng hiển thị giảm giá dựa trên DiscountType
  let discountDisplay: string;
  let mainDiscountText: string;
  let tag: React.ReactNode | null = null;
  let opacityClass = "";

  switch (coupon.discountType) {
    case DiscountType.PERCENTAGE:
      discountDisplay = `${coupon.discountValue}% OFF`;
      mainDiscountText = `Save ${coupon.discountValue}%`;
      break;
    case DiscountType.FIXED_AMOUNT:
      discountDisplay = `SAVE $${Number(coupon.discountValue).toFixed(2)}`;
      mainDiscountText = `Save $${Number(coupon.discountValue).toFixed(
        2
      )} Fixed`;
      break;
    case DiscountType.FREE_SHIPPING:
      discountDisplay = "FREE SHIPPING";
      mainDiscountText = "Free Standard Shipping";
      break;
    default:
      discountDisplay = "DISCOUNT";
      mainDiscountText = "Special Offer";
  }

  if (coupon.status !== "active") {
    opacityClass = "opacity-50 pointer-events-none"; // Làm mờ và vô hiệu hóa click

    tag = (
      <div className="absolute top-0 right-0 z-10 translate-x-[50%] translate-y-[-50%]"></div>
    );
  }

  return (
    <div
      className={`
                relative
                rounded-lg
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                flex
                overflow-hidden
                cursor-pointer
                transition-all duration-200
                hover:shadow-md
                hover:border-[#40BFFF]/30
                ${opacityClass}
            `}
    >
      {/* Tag trạng thái */}
      {tag}

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

        {/* Progress Bar (chỉ hiển thị nếu có giới hạn tổng thể) */}
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
        {/* Điều kiện Min Order */}
        {parseFloat(coupon.minOrderAmount) > 0 && (
          <p className="text-[10px] font-medium text-[#40BFFF] mt-1.5">
            Min. Order: ${parseFloat(coupon.minOrderAmount).toFixed(2)}
          </p>
        )}
      </div>
      <div className="absolute right-2 top-2 h-fit px-2.5 py-1 text-xs font-semibold border border-[#40BFFF]/30 bg-[#40BFFF]/5 text-[#40BFFF] rounded">
        {/* Giới hạn sử dụng cá nhân */}
        {remainingUsage}
      </div>
    </div>
  );
};

// ===============================================
// 2. MAIN PAGE COMPONENT (SỬ DỤNG HOOK)
// ===============================================

const Coupons = () => {
  const { data: allCoupons, isLoading } = useCoupons({});

  // Phân loại coupons để tạo nội dung cho các tab
  const filteredCoupons = allCoupons?.data || [];

  const percentageCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.PERCENTAGE
  );
  const amountOffCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.FIXED_AMOUNT
  );
  const freeShippingCoupons = filteredCoupons.filter(
    (c) => c.discountType === DiscountType.FREE_SHIPPING
  );

  // Hàm render nội dung tab
  const renderCouponList = (coupons: Coupon[]) => (
    <div className="flex flex-col gap-[20px]  overflow-y-auto ">
      {coupons.length > 0 ? (
        coupons.map((coupon) => (
          <div key={coupon.id}>
            <CouponItem coupon={coupon} />
          </div>
        ))
      ) : (
        <p className="text-[#9098B1] py-8 text-center">
          No coupons available in this category.
        </p>
      )}
    </div>
  );

  // Xây dựng cấu trúc tabs
  const productTabs = [
    {
      title: `All (${filteredCoupons.length})`,
      content: renderCouponList(filteredCoupons),
    },
    {
      title: `Percentage (${percentageCoupons.length})`,
      content: renderCouponList(percentageCoupons),
    },
    {
      title: `Amount Off (${amountOffCoupons.length})`,
      content: renderCouponList(amountOffCoupons),
    },
    {
      title: `Free Shipping (${freeShippingCoupons.length})`,
      content: renderCouponList(freeShippingCoupons),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#40BFFF]/5 to-transparent rounded-lg p-4 border border-[#40BFFF]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#40BFFF] flex items-center justify-center shadow-sm">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h6 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                My Coupons
                {filteredCoupons.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#40BFFF] text-white rounded-full">
                    {filteredCoupons.length}
                  </span>
                )}
              </h6>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your coupons to get more discounts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div>
        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-20">
            Loading coupons...
          </p>
        ) : (
          <TabbedContent
            tabs={productTabs}
            defaultTabTitle={`All (${filteredCoupons.length})`}
          />
        )}
      </div>
    </div>
  );
};

export default Coupons;
