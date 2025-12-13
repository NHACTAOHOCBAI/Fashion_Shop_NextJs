import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import NormalButton from "@/app/client/_components/NormalButton";
import MyTag from "@/app/client/_components/MyTag"; // Giả định MyTag được import

// ===============================================
// INTERFACE VÀ ENUM MỚI
// ===============================================
enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

interface CouponListProps {
  selectedCouponId: number | undefined;
  handleCouponClick: (id: number) => void;
  availableCoupons: Coupon[] | undefined; // Dữ liệu coupons thực tế (Bao gồm cả inactive)
}

// Hàm format ngày
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
  handleCouponClick,
  selectedCouponId,
  availableCoupons,
}: CouponListProps) => {
  // SỬ DỤNG TẤT CẢ COUPONS (không chỉ active) để hiển thị
  const allCoupons = availableCoupons || [];
  const activeCouponsCount = allCoupons.filter(
    (c) => c.status === "active"
  ).length;

  // Phân loại Coupons thành 3 nhóm rõ ràng (vẫn dựa trên TẤT CẢ coupons)
  const freeShippingCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.FREE_SHIPPING
  );
  const percentageCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.PERCENTAGE
  );
  const fixedAmountCoupons = allCoupons.filter(
    (c) => c.discountType === DiscountType.FIXED_AMOUNT
  );

  // Hàm render từng coupon
  const renderCouponItem = (coupon: Coupon) => {
    const isSelected = selectedCouponId === coupon.id;
    const isActive = coupon.status === "active";

    // Dữ liệu sử dụng
    const usedCount = coupon.usageCount || 0;
    const totalLimit = coupon.usageLimit || 1;
    const progressValue = (usedCount / totalLimit) * 100;
    const remainingUsage =
      coupon.usageLimitPerUser > 0 ? `x${coupon.usageLimitPerUser}` : "∞";

    // Định dạng hiển thị giảm giá dựa trên DiscountType
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

    // Xác định Tag và Class cho trạng thái Inactive
    let statusTag: React.ReactNode | null = null;
    let inactiveClasses = "";

    if (!isActive) {
      inactiveClasses = "opacity-50 cursor-not-allowed pointer-events-none";
      let tagValue: string;
      let tagColor = "text-red-500";

      if (coupon.status === "expired") {
        tagValue = "Expired";
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
      <div
        key={coupon.id}
        // Chỉ cho phép click nếu coupon đang active
        onClick={() => isActive && handleCouponClick(coupon.id)}
        className={`
                    relative
                    rounded-[20px] 
                    bg-[#F6F7F8] 
                    flex 
                    overflow-hidden 
                    transition-all duration-200
                    ${isActive ? "cursor-pointer" : inactiveClasses}
                    ${
                      isSelected && isActive // Chỉ highlight khi chọn và active
                        ? "border-[2px] border-[#40BFFF]"
                        : "border-[2px] border-transparent"
                    }
                `}
      >
        <div className="bg-[#40BFFF] text-white text-[14px] font-bold flex items-center w-[50px] justify-center relative py-2">
          <p className="-rotate-90 whitespace-nowrap absolute font-medium">
            DISCOUNT
          </p>
        </div>
        <div className="py-[9px] px-[15px] flex-1">
          <p className="font-semibold text-base">{coupon.code}</p>
          {/* Hiển thị chi tiết giảm giá/tên coupon */}
          <p className="text-[12px] text-[#FF4858] font-semibold">
            {coupon.name || discountDisplay}
          </p>
          {/* Hiển thị Tiến độ sử dụng */}
          {coupon.usageLimit > 0 && (
            <>
              {/* Dùng màu xám nếu inactive */}
              <Progress
                className={`mt-[10px] h-1.5 ${
                  isActive ? "bg-[#40BFFF]" : "bg-gray-300"
                }`}
                value={progressValue}
              />
              <p className="text-[10px] text-gray-500 mt-[4px]">
                Used {usedCount}/{totalLimit} times
              </p>
            </>
          )}

          <div className="flex gap-[20px] mt-[7px]">
            <p className="text-[10px] font-light ">
              Start date: {formatDate(coupon.startDate)}
            </p>
            <p className="text-[10px] font-light">
              End date: {formatDate(coupon.endDate)}
            </p>
          </div>
        </div>

        {/* Giới hạn sử dụng cá nhân */}
        <div className="absolute right-0 top-0 h-fit px-[10px] py-[4px] text-[14px] font-semibold border-[2px] border-[#BCDDFE] bg-white">
          {remainingUsage}
        </div>

        {/* 🌟 Hiển thị Tag trạng thái Inactive/Expired/Upcoming */}
        {statusTag}
      </div>
    );
  };

  return (
    <AlertDialogContent className="w-[600px] max-h-[600px] flex flex-col">
      <div className="flex justify-between ">
        <p className="font-medium">
          Choose Coupon ({activeCouponsCount} Active)
        </p>
        <AlertDialogPrimitive.Cancel>
          <X />
        </AlertDialogPrimitive.Cancel>
      </div>
      <div className="bg-[#FAFAFB] h-[2px] w-full" />

      {/* KIỂM TRA LOADING HOẶC KHÔNG CÓ COUPON */}
      {!availableCoupons ? (
        <div className="flex-1 py-10 text-center text-gray-500">
          Loading coupons list...
        </div>
      ) : allCoupons.length === 0 ? (
        <div className="flex-1 py-10 text-center text-gray-500">
          You have no coupons available.
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 space-y-8 py-4">
          {/* Mục 1: Free Shipping */}
          {freeShippingCoupons.length > 0 && (
            <div>
              <p className="mb-[16px] font-medium text-lg text-[#40BFFF]">
                Free Shipping ({freeShippingCoupons.length})
              </p>
              <div className="flex flex-col gap-[20px]">
                {freeShippingCoupons.map(renderCouponItem)}
              </div>
            </div>
          )}

          {/* Mục 2: Percentage Discount */}
          {percentageCoupons.length > 0 && (
            <div>
              <p className="mb-[16px] font-medium text-lg text-[#FF4858]">
                Percentage Discount ({percentageCoupons.length})
              </p>
              <div className="flex flex-col gap-[20px]">
                {percentageCoupons.map(renderCouponItem)}
              </div>
            </div>
          )}

          {/* Mục 3: Fixed Amount Discount */}
          {fixedAmountCoupons.length > 0 && (
            <div>
              <p className="mb-[16px] font-medium text-lg text-[#38A169]">
                Fixed Amount Discount ({fixedAmountCoupons.length})
              </p>
              <div className="flex flex-col gap-[20px]">
                {fixedAmountCoupons.map(renderCouponItem)}
              </div>
            </div>
          )}
        </div>
      )}

      <AlertDialogFooter className="pt-4">
        <AlertDialogCancel asChild>
          <NormalButton>
            <p className="text-[14px] text-gray-500">Close</p>
          </NormalButton>
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export default CouponList;
